import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="hero" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline">
                Petakan Strategi Bisnismu.
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Gunakan AI untuk memvalidasi ide, merencanakan keuangan, dan menyusun strategi aksi yang solid untuk pasar e-commerce Indonesia.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <a href="#strategy-lab">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Mulai Simulasi
                </Button>
              </a>
            </div>
          </div>
          <Image
            alt="3D Illustration of e-commerce logistics"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-lg sm:w-full lg:order-last"
            data-ai-hint="ecommerce logistics"
            height="310"
            src="https://placehold.co/550x310.png"
            width="550"
          />
        </div>
      </div>
    </section>
  );
}
