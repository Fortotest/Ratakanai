import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { StrategyLab } from "@/components/strategy-lab";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Hero />
        <StrategyLab />
        <Faq />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
