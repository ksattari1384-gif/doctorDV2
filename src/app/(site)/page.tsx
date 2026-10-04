import { MenuHero } from "@/components/site/menu-hero";
import { AboutCard } from "@/components/site/about-card";
import { ServicesSection } from "@/components/site/services-section";

export default function HomePage() {
  return (
    <main className="pb-72 md:pb-80 bg-background min-h-screen">
      <MenuHero />
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-6 md:pt-8">
        <AboutCard />
        <ServicesSection />
      </div>
    </main>
  );
}