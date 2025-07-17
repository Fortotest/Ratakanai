import { Target } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center shadow-sm bg-white sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <a className="flex items-center justify-center" href="#">
          <Target className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">SiapJual.ai</span>
        </a>
        <nav className="hidden md:flex gap-6 items-center">
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#hero">
            Simulator
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#faq">
            FAQ
          </a>
          <Button>Mulai Simulasi Gratis</Button>
        </nav>
      </div>
    </header>
  );
}
