import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutShortSection from "@/components/sections/AboutShortSection";
import FoundersSection from "@/components/sections/FoundersSection";
import ProgramsCardsSection from "@/components/sections/ProgramsCardsSection";
import HelpBlockSection from "@/components/sections/HelpBlockSection";
import FaqSection from "@/components/sections/FaqSection";
import HelpRequestSection from "@/components/sections/HelpRequestSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutShortSection />
        <FoundersSection />
        <ProgramsCardsSection />
        <HelpBlockSection />
        <FaqSection />
        <HelpRequestSection />
      </main>
      <Footer />
    </>
  );
}
