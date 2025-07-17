import { Target } from "lucide-react";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center shadow-sm bg-card sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <a className="flex items-center justify-center" href="#">
          <Target className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">Petakan.ai Simulator</span>
        </a>
        <nav className="hidden md:flex gap-4 sm:gap-6">
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#strategy-lab">
            Simulator
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#faq">
            FAQ
          </a>
        </nav>
      </div>
    </header>
  );
}
