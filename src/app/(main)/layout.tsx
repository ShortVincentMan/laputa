// app/(main)/layout.tsx

import SiteMenu from "@/components/navigation/MainMenu";

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