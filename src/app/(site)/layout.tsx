"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { FloatingBar } from "@/components/site/floating-bar";
import { MenuCta } from "@/components/site/menu-cta";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isBookingPage = pathname === "/booking";
  const isServiceDetailPage = pathname?.startsWith("/services/") && pathname !== "/services";

  // توی صفحه‌ی رزرو و جزئیات خدمت، CTA جداگانه‌ست، پس MenuCta لازم نیست
  const showMenuCta = !isBookingPage && !isServiceDetailPage;

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingBar />
      {showMenuCta && <MenuCta />}
    </>
  );
}