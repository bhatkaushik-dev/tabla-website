import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Bio from "@/components/Bio";
import TechSection from "@/components/TechSection";
import Videos from "@/components/Videos";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Bio />
      <TechSection />
      <Videos />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
