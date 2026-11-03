import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutShortSection from "@/components/sections/AboutShortSection";
import FoundersSection from "@/components/sections/FoundersSection";
import ProgramsCardsSection from "@/components/sections/ProgramsCardsSection";
import HelpBlockSection from "@/components/sections/HelpBlockSection";
import TransparencySection from "@/components/sections/TransparencySection";
import VideoSection from "@/components/sections/VideoSection";

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
        <TransparencySection />
        <VideoSection />
      </main>
      <Footer />
    </>
  );
}