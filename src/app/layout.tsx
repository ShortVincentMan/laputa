import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">
        {children}
        </body>
    </html>
  );
}
