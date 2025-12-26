'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// Import SheetTitle and SheetDescription to fix the error
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { navLinks } from '@/lib/data';

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
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
          
          {/* LOGO */}
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
          </Link>

          {/* DESKTOP NAVIGATION (Unchanged) */}
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
                          ? "text-[hsl(93,45%,44%)] font-black"
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

          {/* MOBILE TOGGLE & SHEET */}
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden rounded-full hover:bg-white/10">
                <Menu size={28} className={isScrolled ? "text-[hsl(93,45%,44%)]" : "text-[hsl(93,20%,15%)]"} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] bg-white p-0 border-none">
              
              {/* HIDDEN TITLES FOR ACCESSIBILITY (Fixes the Error) */}
              <div className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
                <SheetDescription>Explore Arogya Ayur Conclave pages and registration.</SheetDescription>
              </div>

              <div className="flex flex-col h-full bg-slate-50">
                {/* Mobile Header */}
                <div className="p-8 flex items-center justify-between bg-white border-b border-slate-100">
                  <Image 
                    src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FArogya%202026%20logo.webp?alt=media&token=0ee2306d-e44e-4c15-b748-69491434e0f5" 
                    alt="Logo" width={62} height={50} 
                  />
                  <Button variant="ghost" size="icon" onClick={closeSheet} className="rounded-full bg-slate-100 text-slate-500 hover:bg-[hsl(93,45%,44%)] hover:text-white transition-all">
                    <X size={20}/>
                  </Button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto py-8 px-6 space-y-2">
                  {navLinks.map((link) => (
                    <div key={link.name} className="space-y-1">
                      {link.subLinks ? (
                         <div className="py-2">
                            <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{link.name}</p>
                            {link.subLinks.map((sub) => (
                              <Link 
                                key={sub.name} 
                                href={sub.href} 
                                onClick={closeSheet}
                                className="flex items-center justify-between px-4 py-4 rounded-2xl text-lg font-bold text-[hsl(93,20%,15%)] hover:bg-[hsl(93,45%,44%)]/5 hover:text-[hsl(93,45%,44%)] transition-all"
                              >
                                {sub.name}
                                <ArrowRight size={16} className="opacity-20" />
                              </Link>
                            ))}
                         </div>
                      ) : (
                        <Link 
                          href={link.href || '#'} 
                          onClick={closeSheet} 
                          className={cn(
                            "flex items-center justify-between px-4 py-4 rounded-2xl text-xl font-black uppercase tracking-tighter transition-all",
                            pathname === link.href ? "bg-[hsl(93,45%,44%)] text-white" : "text-[hsl(93,20%,15%)] hover:bg-[hsl(93,45%,44%)]/5 hover:text-[hsl(93,45%,44%)]"
                          )}
                        >
                          {link.name}
                          {pathname !== link.href && <ArrowRight size={18} className="opacity-20" />}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer Action */}
                <div className="p-8 bg-white border-t border-slate-100">
                  <Button asChild className="w-full h-16 rounded-[1.5rem] bg-[hsl(93,45%,44%)] text-white font-black text-xl shadow-xl shadow-[hsl(93,45%,44%)]/20 hover:bg-[#ffa62f] transition-all">
                    <Link href="/register" onClick={closeSheet}>REGISTER NOW</Link>
                  </Button>
                  <p className="text-center text-[10px] font-bold text-slate-400 mt-4 uppercase tracking-[0.1em]">Arogya Ayur Conclave 2026</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
