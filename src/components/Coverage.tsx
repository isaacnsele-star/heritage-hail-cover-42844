import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const services = [
  "Collection and storage of the body",
  "Transportation from storage to home within South Africa",
  "Transportation of body to the cemetery",
  "Choice of R10,000 cash payout or burial service",
  "Coverage for spouse and dependents up to 21 years",
];

const Coverage = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6 md:text-5xl">
              Complete Funeral Coverage
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our EHailing funeral driver benefit provides comprehensive coverage with the flexibility to choose what works best for your family.
            </p>
            
            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <p className="text-lg text-foreground">{service}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-muted/50 rounded-lg border-l-4 border-accent">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Please note:</span> A 3-month waiting period applies to all new policies.
              </p>
            </div>
          </div>

          <Card className="shadow-elegant border-2">
            <CardHeader className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
              <CardTitle className="text-3xl">Pricing</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <p className="text-muted-foreground mb-2">From only</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-6xl font-bold text-foreground">R35</span>
                  <span className="text-2xl text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground mt-2">per member</p>
              </div>

              <div className="space-y-4 pt-6 border-t">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Coverage Value</span>
                  <span className="font-semibold text-foreground">R10,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Waiting Period</span>
                  <span className="font-semibold text-foreground">3 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Coverage Area</span>
                  <span className="font-semibold text-foreground">South Africa</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Coverage;
