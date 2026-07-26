import type {
  Metadata,
  Viewport,
} from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Laputa OS",
    template: "%s | Laputa OS",
  },
  description: "Engineering portfolio of Vincent Le.",
  applicationName: "Laputa OS",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
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
