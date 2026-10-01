import { MenuHero } from "@/components/site/menu-hero";
import { AboutCard } from "@/components/site/about-card";
import { ServicesSection } from "@/components/site/services-section";
import { MenuCta } from "@/components/site/menu-cta";

export default function HomePage() {
  return (
    <>
      <main className="pb-64 md:pb-72 bg-background min-h-screen">
        <MenuHero
          enabled={true}
          videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        />
        <div className="container mx-auto px-4 md:px-6 relative z-10 pt-6 md:pt-8">
          <AboutCard />
          <ServicesSection />
        </div>
      </main>
      <MenuCta />
    </>
  );
}