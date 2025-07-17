"use client";

import { Target } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white/50 dark:bg-black/20 backdrop-blur-md shadow-lg" : "bg-transparent"
    )}>
      <div className="container mx-auto flex items-center justify-between h-20 px-4 lg:px-6">
        <a className="flex items-center justify-center gap-2" href="#">
          <Target className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold">Petakan.ai</span>
        </a>
        <nav className="hidden md:flex gap-8 items-center">
          <a className="text-sm font-medium hover:text-primary transition-colors" href="#hero">
            Simulator
          </a>
          <a className="text-sm font-medium hover:text-primary transition-colors" href="#faq">
            FAQ
          </a>
          <Button size="lg" className="rounded-full">Mulai Simulasi Gratis</Button>
        </nav>
      </div>
    </header>
  );
}
