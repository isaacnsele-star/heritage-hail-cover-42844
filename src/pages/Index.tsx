import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Coverage from "@/components/Coverage";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Benefits />
      <Coverage />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
