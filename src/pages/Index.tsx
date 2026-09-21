import { ArrowDown, ArrowUpRight, Check, Code2, Globe2, Mail, Server, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/zino-consulting-logo.png.asset.json";
import studioImage from "@/assets/zino-studio.jpg";

const services = [
  {
    number: "01",
    icon: Code2,
    title: "Website Design",
    description: "Purpose-built websites that turn your business into a clear, credible digital experience.",
    details: ["Responsive design", "Clear user journeys", "Content-led structure"],
  },
  {
    number: "02",
    icon: Server,
    title: "Web Hosting",
    description: "Dependable hosting and ongoing care that keeps your website available, maintained and ready for business.",
    details: ["Managed setup", "Website maintenance", "Practical support"],
  },
  {
    number: "03",
    icon: Globe2,
    title: "Digital Foundations",
    description: "The essentials your organisation needs to present a consistent and professional presence online.",
    details: ["Domain guidance", "Business email setup", "Launch support"],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="absolute inset-x-0 top-0 z-30 border-b border-primary-foreground/15">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:h-24 md:px-10 lg:px-16">
          <a href="#top" aria-label="Zino Digital home" className="block w-44 md:w-56">
            <img src={logoAsset.url} alt="Zino Consulting" className="h-auto w-full" />
          </a>
          <nav className="hidden items-center gap-9 text-sm text-primary-foreground/75 md:flex" aria-label="Main navigation">
            <a className="transition-colors hover:text-primary" href="#services">Services</a>
            <a className="transition-colors hover:text-primary" href="#approach">Approach</a>
            <a className="transition-colors hover:text-primary" href="#contact">Contact</a>
          </nav>
          <Button asChild size="sm" className="border border-primary bg-primary text-primary-foreground hover:bg-primary/85">
            <a href="mailto:sales@zinoconsulting.co.za">Start a project <ArrowUpRight /></a>
          </Button>
        </div>
      </header>

      <main>
        <section id="top" className="relative flex min-h-[92vh] items-end overflow-hidden bg-ink">
          <img
            src={studioImage}
            alt="Refined digital design studio workspace"
            className="absolute inset-0 h-full w-full object-cover object-center"
            width={1200}
            height={1500}
          />
          <div className="absolute inset-0 bg-hero-overlay" />
          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-16 pt-40 md:px-10 md:pb-20 lg:px-16">
            <div className="mb-7 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-primary">
              <span className="h-px w-10 bg-primary" />
              A subsidiary of Zino Consulting
            </div>
            <h1 className="max-w-5xl font-display text-7xl leading-[0.84] text-primary-foreground sm:text-8xl md:text-[8.5rem] lg:text-[10rem]">
              Zino <span className="italic text-primary">Digital.</span>
            </h1>
            <div className="mt-9 grid gap-8 border-t border-primary-foreground/20 pt-7 md:grid-cols-[1fr_1.2fr_auto] md:items-end">
              <p className="text-sm uppercase tracking-[0.18em] text-primary-foreground/55">Web design · Hosting</p>
              <p className="max-w-xl text-xl leading-relaxed text-primary-foreground/80 md:text-2xl">
                Digital foundations made with intent—for businesses ready to be seen, understood and remembered.
              </p>
              <a href="#services" aria-label="Explore services" className="flex h-12 w-12 items-center justify-center border border-primary-foreground/30 text-primary-foreground transition-colors hover:border-primary hover:text-primary">
                <ArrowDown className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>

        <section id="services" className="bg-surface py-24 md:py-32">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
            <div className="mb-16 grid gap-6 md:grid-cols-[0.8fr_2fr] md:items-end">
              <p className="eyebrow">What we do</p>
              <h2 className="max-w-4xl font-display text-5xl leading-[0.95] md:text-7xl">
                Building the digital space your <span className="italic text-primary">business deserves.</span>
              </h2>
            </div>

            <div className="border-t border-border">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article key={service.number} className="group grid gap-7 border-b border-border py-10 md:grid-cols-[0.35fr_0.8fr_1.2fr_1fr] md:items-start md:py-14">
                    <span className="font-display text-2xl text-primary">{service.number}</span>
                    <Icon className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary" strokeWidth={1.4} />
                    <div>
                      <h3 className="font-display text-4xl md:text-5xl">{service.title}</h3>
                      <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">{service.description}</p>
                    </div>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      {service.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-3"><Check className="h-4 w-4 text-primary" />{detail}</li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="approach" className="bg-background py-24 md:py-32">
          <div className="mx-auto grid max-w-[1440px] gap-16 px-5 md:px-10 lg:grid-cols-[1fr_1.25fr] lg:px-16">
            <div>
              <p className="eyebrow">Our approach</p>
              <h2 className="mt-7 font-display text-5xl leading-none md:text-7xl">Clarity before complexity.</h2>
            </div>
            <div className="grid gap-px bg-border sm:grid-cols-2">
              {[
                ["01", "Discover", "We begin with your business, your audience and the result the website must deliver."],
                ["02", "Design", "We shape a distinctive experience with strong hierarchy, considered content and responsive layouts."],
                ["03", "Build", "We turn the approved direction into a fast, polished website that works across devices."],
                ["04", "Launch", "We put your website online, connect the essentials and remain available for ongoing care."],
              ].map(([number, title, copy]) => (
                <div key={number} className="min-h-64 bg-background p-8 md:p-10">
                  <span className="text-xs text-primary">{number}</span>
                  <h3 className="mt-10 font-display text-4xl">{title}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-20 text-primary-foreground md:py-24">
          <div className="mx-auto grid max-w-[1440px] gap-8 px-5 md:grid-cols-[auto_1fr] md:px-10 lg:px-16">
            <Sparkles className="h-8 w-8" strokeWidth={1.4} />
            <p className="max-w-5xl font-display text-4xl leading-tight md:text-6xl">
              Good digital work is not decoration. It is how your business earns attention, builds trust and creates opportunity.
            </p>
          </div>
        </section>

        <section id="contact" className="bg-ink py-24 text-primary-foreground md:py-32">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
            <p className="eyebrow">Start a conversation</p>
            <div className="mt-10 grid gap-12 border-b border-primary-foreground/15 pb-16 lg:grid-cols-[1.5fr_1fr] lg:items-end">
              <h2 className="font-display text-6xl leading-[0.9] md:text-8xl">Have a project<br />in <span className="italic text-primary">mind?</span></h2>
              <div>
                <p className="mb-7 max-w-md text-lg leading-relaxed text-primary-foreground/65">Tell us what you are building. We will help you shape the right website and hosting foundation.</p>
                <Button asChild size="lg" className="h-14 bg-primary px-7 text-primary-foreground hover:bg-primary/85">
                  <a href="mailto:sales@zinoconsulting.co.za"><Mail /> sales@zinoconsulting.co.za</a>
                </Button>
              </div>
            </div>
            <footer className="grid gap-8 pt-10 text-sm text-primary-foreground/55 md:grid-cols-3">
              <div>
                <img src={logoAsset.url} alt="Zino Consulting" className="w-52" loading="lazy" />
                <p className="mt-4">Zino Digital — a subsidiary of Zino Consulting (Pty) Ltd</p>
              </div>
              <address className="not-italic leading-relaxed md:justify-self-center">
                908 Sangro House<br />417 Anton Lembede<br />Durban, 4001
              </address>
              <div className="md:text-right">
                <p>Reg. 2025/626542/07</p>
                <p className="mt-2">© {new Date().getFullYear()} Zino Consulting (Pty) Ltd</p>
              </div>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
