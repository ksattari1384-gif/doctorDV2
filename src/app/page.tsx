import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { FloatingBar } from "@/components/site/floating-bar";
import { Hero } from "@/components/site/hero";
import { DoctorIntro } from "@/components/site/doctor-intro";
import { FeaturedServices } from "@/components/site/featured-services";
import { Advantages } from "@/components/site/advantages";
import { BookingSteps } from "@/components/site/booking-steps";
import { Testimonials } from "@/components/site/testimonials";
import { WorkingHours } from "@/components/site/working-hours";
import { FinalCta } from "@/components/site/final-cta";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero enabled={false} />
        <DoctorIntro />
        <FeaturedServices />
        <Advantages />
        <BookingSteps />
        <Testimonials />
        <WorkingHours />
        <FinalCta />
      </main>
      <Footer />
      <FloatingBar />
    </>
  );
}