import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { FloatingBar } from "@/components/site/floating-bar";
import { MenuHero } from "@/components/site/menu-hero";
import { AboutCard } from "@/components/site/about-card";
import { ServiceFilters } from "@/components/site/service-filters";
import { ServiceGrid } from "@/components/site/service-grid";
import { MenuCta } from "@/components/site/menu-cta";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pb-40 md:pb-48 bg-background min-h-screen">
        <MenuHero
          enabled={true}
          videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        />
<div className="container mx-auto px-4 md:px-6 relative z-10 pt-6 md:pt-8">          <AboutCard />
          <ServiceFilters />
          <ServiceGrid />
        </div>
      </main>
      <Footer />
      <FloatingBar />
      <MenuCta />
    </>
  );
}