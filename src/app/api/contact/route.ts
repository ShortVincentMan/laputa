import React from "react";
import { NextResponse } from "next/server";
import { Resend } from "resend";

import ContactEmail from "@/emails/ContactEmail";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_REQUEST_BYTES = 32 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MAX_CLIENTS = 10_000;

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

const rateLimits = new Map<string, RateLimitRecord>();

class RequestBodyTooLargeError extends Error {}

function getClientKey(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

function checkRateLimit(request: Request) {
  const now = Date.now();

  if (rateLimits.size >= RATE_LIMIT_MAX_CLIENTS) {
    for (const [key, record] of rateLimits) {
      if (record.resetAt <= now) {
        rateLimits.delete(key);
      }
    }
  }

  const key = getClientKey(request);
  const existing = rateLimits.get(key);

  if (!existing || existing.resetAt <= now) {
    rateLimits.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });

    return null;
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
  }

  existing.count += 1;
  return null;
}

async function readContactPayload(request: Request): Promise<ContactPayload> {
  const declaredLength = Number(
    request.headers.get("content-length")
  );

  if (
    Number.isFinite(declaredLength) &&
    declaredLength > MAX_REQUEST_BYTES
  ) {
    throw new RequestBodyTooLargeError();
  }

  if (!request.body) {
    return {};
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let receivedBytes = 0;

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    receivedBytes += value.byteLength;

    if (receivedBytes > MAX_REQUEST_BYTES) {
      await reader.cancel();
      throw new RequestBodyTooLargeError();
    }

    chunks.push(value);
  }

  const body = new Uint8Array(receivedBytes);
  let offset = 0;

  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return JSON.parse(new TextDecoder().decode(body)) as ContactPayload;
}

function cleanText(
  value: unknown,
  maxLength: number
): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  const retryAfter = checkRateLimit(request);

  if (retryAfter !== null) {
    return NextResponse.json(
      {
        success: false,
        error: "Transmission rate limit exceeded. Retry later.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
        },
      }
    );
  }

  try {
    const body = await readContactPayload(request);

    const name = cleanText(body.name, 100);
    const email = cleanText(body.email, 254);
    const subject = cleanText(body.subject, 150);
    const message = cleanText(body.message, 5000);
    const website = cleanText(body.website, 200);

    // Honeypot: silently accept likely bot submissions.
    if (website) {
      return NextResponse.json({
        success: true,
      });
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "All transmission fields are required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Return channel is invalid.",
        },
        {
          status: 400,
        }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: "Transmission is too short.",
        },
        {
          status: 400,
        }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ??
      "Laputa OS <onboarding@resend.dev>";

    if (!apiKey || !contactEmail) {
      console.error(
        "Contact route configuration error:",
        {
          hasApiKey: Boolean(apiKey),
          hasContactEmail: Boolean(contactEmail),
          hasCustomFromEmail: Boolean(process.env.CONTACT_FROM_EMAIL),
        }
      );

      return NextResponse.json(
        {
          success: false,
          error: "Message relay is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [contactEmail],
      replyTo: email,
      subject: `[Laputa OS] ${subject}`,
      react: React.createElement(ContactEmail, {
        name,
        email,
        subject,
        message,
      }),
      text: [
        "LAPUTA OS CONTACT TRANSMISSION",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        "",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend send error:", {
        name: error.name,
        ...(process.env.NODE_ENV === "development"
          ? { message: error.message }
          : {}),
      });

      return NextResponse.json(
        {
          success: false,
          error:
            process.env.NODE_ENV === "development"
              ? error.message
              : "Message relay rejected the transmission.",
        },
        {
          status: 502,
        }
      );
    }

    console.info("Contact transmission accepted:", {
      resendId: data?.id,
    });

    return NextResponse.json({
      success: true,
      id: data?.id,
    });
  } catch (error) {
    if (error instanceof RequestBodyTooLargeError) {
      return NextResponse.json(
        {
          success: false,
          error: "Transmission packet exceeds the 32 KiB limit.",
        },
        {
          status: 413,
        }
      );
    }

    console.error("Contact route error:", {
      name: error instanceof Error ? error.name : "UnknownError",
      ...(process.env.NODE_ENV === "development" &&
      error instanceof Error
        ? { message: error.message }
        : {}),
    });

    return NextResponse.json(
      {
        success: false,
        error:
          process.env.NODE_ENV === "development" &&
          error instanceof Error
            ? error.message
            : "Invalid transmission packet.",
      },
      {
          status: 400,
        }
      );
  }
}
