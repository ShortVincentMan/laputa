// app/(main)/layout.tsx

import SiteMenu from "@/components/SiteMenu";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteMenu />
      {children}
    </>
  );
}