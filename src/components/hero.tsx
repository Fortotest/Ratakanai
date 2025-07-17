import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="hero" className="w-full text-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl md:text-6xl">
          Uji Strategi Bisnismu, Bukan Uangmu.
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Gunakan Simulasi AI untuk melihat proyeksi untung-rugi sebelum mengambil risiko. Gratis, cepat, dan akurat.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg">
            Mulai Simulasi Gratis
          </Button>
        </div>
      </div>
    </section>
  );
}
