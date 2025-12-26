'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { navLinks } from '@/lib/data';

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger the transition slightly later for a smoother feel
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeSheet = () => setSheetOpen(false);

  return (
    <header 
      className={cn(
        "fixed top-0 z-[100] w-full transition-all duration-700 ease-in-out px-6",
        isScrolled ? "pt-4" : "pt-2"
      )}
    >
      <div 
        className={cn(
          "container mx-auto max-w-7xl transition-all duration-500 rounded-[2.5rem] border",
          isScrolled 
            ? "bg-white/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] py-2 px-8 border-white/20" 
            : "bg-transparent py-6 px-4 border-transparent"
        )}
      >
        <div className="flex h-16 items-center justify-between">
          
          {/* LOGO - Scaled for 554x450 ratio */}
          <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-105">
            <div className="relative w-[74px] h-[60px]">
              <Image 
                src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FArogya%202026%20logo.webp?alt=media&token=0ee2306d-e44e-4c15-b748-69491434e0f5" 
                alt="AyushConclave Logo" 
                fill
                priority
                className={cn(
                  "object-contain transition-all duration-500",
                  !isScrolled && "brightness-110 drop-shadow-md"
                )}
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className={cn(
                "text-xl font-black tracking-tighter transition-colors duration-500",
                isScrolled ? "text-[hsl(93,20%,15%)]" : "text-[hsl(93,20%,15%)]"
              )}>
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.subLinks ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className={cn(
                          "h-10 px-4 rounded-full font-bold text-sm transition-all flex items-center gap-1",
                          isScrolled 
                            ? "text-[hsl(93,20%,15%)]/70 hover:text-[hsl(93,45%,44%)] hover:bg-[hsl(93,45%,44%)]/5" 
                            : "text-[hsl(93,20%,15%)] hover:bg-white/10"
                        )}
                      >
                        {link.name}
                        <ChevronDown size={14} className="opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="p-2 rounded-2xl border-white/20 bg-white/95 backdrop-blur-xl shadow-2xl min-w-[200px]">
                      {link.subLinks.map((subLink) => (
                        <DropdownMenuItem key={subLink.name} asChild className="rounded-xl focus:bg-[hsl(93,45%,44%)] focus:text-white cursor-pointer">
                          <Link href={subLink.href} className="w-full font-semibold py-2">
                            {subLink.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  link.href && (
                    <Link
                      href={link.href}
                      className={cn(
                        "relative h-10 px-4 flex items-center text-sm font-bold transition-all rounded-full",
                        pathname === link.href 
                          ? (isScrolled ? "text-[hsl(93,45%,44%)]" : "text-[hsl(93,45%,44%)] font-black")
                          : (isScrolled ? "text-[hsl(93,20%,15%)]/70 hover:text-[hsl(93,45%,44%)]" : "text-[hsl(93,20%,15%)] hover:bg-white/10")
                      )}
                    >
                      {link.name}
                    </Link>
                  )
                )}
              </div>
            ))}
            
            <div className={cn(
              "ml-4 pl-4 border-l transition-colors duration-500",
              isScrolled ? "border-[hsl(93,45%,44%)]/10" : "border-white/20"
            )}>
              <Button asChild className={cn(
                "rounded-full px-8 font-black transition-all shadow-xl hover:scale-105 active:scale-95",
                isScrolled 
                  ? "bg-[hsl(93,45%,44%)] text-white shadow-[hsl(93,45%,44%)]/20" 
                  : "bg-white text-[hsl(93,45%,44%)] hover:bg-[hsl(39,96%,66%)] hover:text-black"
              )}>
                <Link href="/register">REGISTER</Link>
              </Button>
            </div>
          </nav>

          {/* MOBILE TOGGLE */}
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden rounded-full hover:bg-white/10">
                <Menu size={28} className={isScrolled ? "text-[hsl(93,45%,44%)]" : "text-[hsl(93,20%,15%)]"} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] bg-[hsl(91,30%,95%)] p-0 border-none">
              <div className="flex flex-col h-full">
                <div className="p-8 flex items-center justify-between bg-white border-b">
                  <Image 
                    src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FArogya%202026%20logo.webp?alt=media&token=0ee2306d-e44e-4c15-b748-69491434e0f5" 
                    alt="Logo" width={62} height={50} 
                  />
                  <Button variant="ghost" size="icon" onClick={closeSheet} className="rounded-full"><X /></Button>
                </div>
                <div className="flex-1 p-8 space-y-4">
                  {navLinks.map((link) => (
                    <Link key={link.name} href={link.href || '#'} onClick={closeSheet} className="block text-2xl font-black text-[hsl(93,20%,15%)]">
                      {link.name}
                    </Link>
                  ))}
                </div>
                <div className="p-8 mt-auto">
                  <Button asChild className="w-full h-16 rounded-2xl bg-[hsl(93,45%,44%)] text-white font-black text-xl">
                    <Link href="/register" onClick={closeSheet}>REGISTER NOW</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
