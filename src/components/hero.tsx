import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section id="hero" className="w-full text-center py-20">
      <div className="container mx-auto flex flex-col items-center gap-6">
        <div className="max-w-4xl mx-auto">
          <Image 
            src="https://placehold.co/600x400.png"
            alt="Ilustrasi truk pengiriman di atas peta dengan pin lokasi"
            width={400}
            height={250}
            className="mx-auto mb-8 opacity-80"
            data-ai-hint="logistics map"
          />
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Uji Strategi Bisnismu, <span className="text-primary">Bukan Uangmu.</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-foreground/80 md:text-xl">
            Gunakan Simulasi AI untuk melihat proyeksi untung-rugi sebelum mengambil risiko. Gratis, cepat, dan akurat.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" className="rounded-full px-10 py-6 text-lg">
            Mulai Simulasi Gratis
          </Button>
        </div>
      </div>
    </section>
  );
}
