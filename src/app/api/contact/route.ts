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
  try {
    const body = (await request.json()) as ContactPayload;

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
          fromEmail,
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
        message: error.message,
        fromEmail,
        contactEmail,
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
      subject,
      replyTo: email,
    });

    return NextResponse.json({
      success: true,
      id: data?.id,
    });
  } catch (error) {
    console.error("Contact route error:", error);

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
        status: 500,
      }
    );
  }
}