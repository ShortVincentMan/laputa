import type {
  Metadata,
  Viewport,
} from "next";
import "./globals.css";

const SITE_URL = new URL("https://laputa-os.vercel.app");
const SITE_DESCRIPTION =
  "Vincent Le's interactive engineering portfolio, presented as the Cyberpunk-inspired Laputa OS.";

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    default: "Laputa OS",
    template: "%s | Laputa OS",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Laputa OS",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Laputa OS",
    description: SITE_DESCRIPTION,
    siteName: "Laputa OS",
    images: [
      {
        url: "/assets/projects/laputa/laputa.jpeg",
        width: 3438,
        height: 1714,
        alt: "Laputa OS interactive engineering portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Laputa OS",
    description: SITE_DESCRIPTION,
    images: ["/assets/projects/laputa/laputa.jpeg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#05090d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
