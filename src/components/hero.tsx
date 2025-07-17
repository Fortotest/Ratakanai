import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="hero" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-headline">
                Optimize Your Business Strategy with AI
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Petakan.ai Simulator helps you analyze market scenarios, optimize budget allocation, and maximize profitability with data-driven insights.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <a href="#strategy-lab">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Start Simulating
                </Button>
              </a>
            </div>
          </div>
          <Image
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-md sm:w-full lg:order-last"
            data-ai-hint="delivery truck map location"
            height="310"
            src="https://placehold.co/550x310.png"
            width="550"
          />
        </div>
      </div>
    </section>
  );
}
