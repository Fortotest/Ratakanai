import { Hero } from "@/components/hero";
import { MarketInsights } from "@/components/market-insights";
import { StrategyLab } from "@/components/strategy-lab";
import { Faq } from "@/components/faq";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MarketplaceArena } from "@/components/marketplace-arena";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-24">
        <div className="flex flex-col gap-12">
          <Hero />
          <MarketInsights />
          <MarketplaceArena />
          <StrategyLab />
          <Faq />
        </div>
      </main>
      <Footer />
    </div>
  );
}
