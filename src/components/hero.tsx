import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="hero" className="w-full text-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl md:text-6xl">
          Simulasikan Strategi Bisnismu.
        </h1>
        <Image
          alt="Illustration of a delivery truck on a map with location pins"
          className="mx-auto my-4 aspect-video overflow-hidden rounded-xl object-contain shadow-lg sm:w-full max-w-md"
          data-ai-hint="ecommerce logistics"
          height="310"
          src="https://placehold.co/550x310.png"
          width="550"
        />
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Mulai Sekarang
          </Button>
          <Button size="lg" variant="outline">
            Pelajari Dulu
          </Button>
        </div>
      </div>
    </section>
  );
}
