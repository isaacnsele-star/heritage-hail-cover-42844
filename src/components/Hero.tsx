import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="EHailing funeral driver benefit"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <div className="mb-6 inline-block rounded-full bg-accent/20 px-6 py-2 backdrop-blur-sm">
            <p className="text-sm font-semibold text-accent">For EHailing Drivers</p>
          </div>
          
          <h1 className="mb-6 text-5xl font-bold leading-tight text-primary-foreground md:text-6xl lg:text-7xl">
            Peace of Mind Coverage from Only{" "}
            <span className="text-accent">R35/Month</span>
          </h1>
          
          <p className="mb-8 text-xl text-primary-foreground/90 md:text-2xl">
            Comprehensive funeral cover that pays cash or provides burial services. Protect yourself and your loved ones with Heritage Ad Solutions.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow text-lg px-8 py-6"
            >
              Get Covered Today
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6"
              asChild
            >
              <a href="tel:0677997447">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
