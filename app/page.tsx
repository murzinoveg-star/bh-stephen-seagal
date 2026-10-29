import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutShortSection from "@/components/sections/AboutShortSection";
import ProgramsCardsSection from "@/components/sections/ProgramsCardsSection";
import TransparencySection from "@/components/sections/TransparencySection";
import VideoSection from "@/components/sections/VideoSection";
import HelpBlockSection from "@/components/sections/HelpBlockSection";
// import FinalCtaSection from "@/components/sections/FinalCtaSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutShortSection />
        <ProgramsCardsSection />
        <TransparencySection />
        <VideoSection />
        <HelpBlockSection />
        {/* <FinalCtaSection /> */}
      </main>
      <Footer />
    </>
  );
}