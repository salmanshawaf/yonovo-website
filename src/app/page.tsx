import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <HeroSection />
      </main>
    </>
  );
}
