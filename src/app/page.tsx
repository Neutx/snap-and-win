import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Timeline } from "@/components/landing/timeline";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <Timeline />
      <FAQ />
      <Footer />
    </main>
  );
}
