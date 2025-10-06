import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Banknote, Truck } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Comprehensive Protection",
    description: "R10,000 funeral benefit - choose cash payout or full burial service",
  },
  {
    icon: Users,
    title: "Family Coverage",
    description: "Cover your spouse and dependents up to 21 years of age",
  },
  {
    icon: Truck,
    title: "Complete Service",
    description: "Body collection, storage, and transportation anywhere in South Africa",
  },
  {
    icon: Banknote,
    title: "Affordable Premium",
    description: "Just R35 per member per month - protection that fits your budget",
  },
];

const Benefits = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 md:text-5xl">
            Why Choose Our Coverage?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Designed specifically for eHailing drivers and their families
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={index}
                className="group border-2 hover:border-accent hover:shadow-elegant transition-all duration-300 bg-card"
              >
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-card-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
