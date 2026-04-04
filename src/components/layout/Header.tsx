'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { navLinks } from '@/lib/data';

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeSheet = () => setSheetOpen(false);

  // Return null during hydration to ensure server/client HTML match exactly.
  // The server and initial client render will both see 'null'.
  if (!mounted) {
    return null;
  }

  // Hide header on wellness program standalone pages
  if (pathname && pathname.startsWith('/wellness-program')) {
    return null;
  }

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 w-full transition-all duration-500 ease-in-out px-4 md:px-6 z-[100]",
        isScrolled ? "pt-2" : "pt-4"
      )}
    >
      <div 
        className={cn(
          "container mx-auto max-w-7xl transition-all duration-500 rounded-[2rem] md:rounded-[2.5rem] border",
          isScrolled 
            ? "bg-white/90 backdrop-blur-md shadow-lg py-1 px-6 border-white/40" 
            : "bg-transparent py-4 px-4 border-transparent"
        )}
      >
        <div className="flex h-16 items-center justify-between">
          
          {/* LOGO */}
          <div className="flex-none">
            <Link href="/" className="relative z-[110] flex items-center gap-3 group transition-transform hover:scale-105">
              <div className="relative w-[60px] h-[50px] md:w-[74px] md:h-[60px]">
                <Image 
                  src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FArogya%202026%20logo.webp?alt=media&token=0ee2306d-e44e-4c15-b748-69491434e0f5" 
                  alt="Logo" 
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center gap-1 justify-end flex-1">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.subLinks ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="h-10 px-4 rounded-full font-bold text-sm text-[hsl(93,20%,15%)] hover:bg-[hsl(93,45%,44%)]/10 flex items-center gap-1"
                      >
                        {link.name}
                        <ChevronDown size={14} className="opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="p-2 rounded-2xl border-white/20 bg-white shadow-2xl min-w-[200px] z-[120]">
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
                        "h-10 px-4 flex items-center text-sm font-bold transition-all rounded-full",
                        pathname === link.href 
                          ? "text-[hsl(93,45%,44%)]"
                          : "text-[hsl(93,20%,15%)] hover:bg-[hsl(93,45%,44%)]/10"
                      )}
                    >
                      {link.name}
                    </Link>
                  )
                )}
              </div>
            ))}
            
            <Button asChild className="ml-4 rounded-full px-8 font-black bg-[hsl(93,45%,44%)] text-white hover:bg-[#ffa62f] transition-all">
              <Link href="/register">REGISTER</Link>
            </Button>
          </nav>

          {/* MOBILE TOGGLE (Right aligned on mobile) */}
          <div className="flex justify-end md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative z-[110] rounded-full">
                  <Menu size={28} className="text-[hsl(93,20%,15%)]" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] bg-white p-0 border-none z-[150]">
                <div className="sr-only">
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>Navigation</SheetDescription>
                </div>
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b">
                    <Image 
                      src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FArogya%202026%20logo.webp?alt=media&token=0ee2306d-e44e-4c15-b748-69491434e0f5" 
                      alt="Logo" width={50} height={40}
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {navLinks.map((link) => (
                      <div key={link.name} className="space-y-3">
                        {link.subLinks ? (
                          <>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-4">{link.name}</p>
                            {link.subLinks.map((sub) => (
                              <Link 
                                key={sub.name} 
                                href={sub.href} 
                                onClick={closeSheet}
                                className="flex items-center justify-between px-4 py-3 rounded-xl text-lg font-bold text-slate-700 hover:bg-slate-50"
                              >
                                {sub.name}
                                <ArrowRight size={16} className="text-slate-300" />
                              </Link>
                            ))}
                          </>
                        ) : (
                          link.href && (
                            <Link 
                              href={link.href} 
                              onClick={closeSheet} 
                              className={cn(
                                "flex items-center justify-between px-4 py-4 rounded-xl text-xl font-black uppercase tracking-tighter transition-all",
                                pathname === link.href ? "bg-[hsl(93,45%,44%)] text-white" : "text-slate-800 hover:bg-slate-50"
                              )}
                            >
                              {link.name}
                            </Link>
                          )
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="p-6 border-t">
                     <Button asChild className="w-full h-16 rounded-2xl bg-[hsl(93,45%,44%)] text-white font-black text-xl shadow-lg shadow-[hsl(93,45%,44%)]/20">
                        <Link href="/register">REGISTER NOW</Link>
                     </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
