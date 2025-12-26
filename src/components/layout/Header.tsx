'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ChevronDown, Menu } from 'lucide-react';
import { navLinks } from '@/lib/data';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import Image from 'next/image';

export function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setSheetOpen] = useState(false);

  const closeSheet = () => setSheetOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FArogya%202026%20logo.webp?alt=media&token=0ee2306d-e44e-4c15-b748-69491434e0f5" alt="AyushConclave Logo" width={120} height={40} className="object-contain" />
        </Link>

        <div className="flex flex-1 items-center justify-end">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) =>
              link.subLinks ? (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-1">
                      {link.name}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {link.subLinks.map((subLink) => (
                      <DropdownMenuItem key={subLink.name} asChild>
                        <Link href={subLink.href}>{subLink.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                link.href && <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'transition-colors hover:text-foreground/80',
                    pathname === link.href ? 'text-foreground' : 'text-foreground/60'
                  )}
                >
                  {link.name}
                </Link>
              )
            )}
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/register">Register</Link>
            </Button>
          </nav>

          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col h-full">
                <div className="flex items-center border-b pb-4 mb-4">
                  <Link href="/" className="flex items-center space-x-2" onClick={closeSheet}>
                     <Image src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FArogya%202026%20logo.webp?alt=media&token=0ee2306d-e44e-4c15-b748-69491434e0f5" alt="AyushConclave Logo" width={120} height={40} className="object-contain" />
                  </Link>
                </div>
                <div className="flex flex-col space-y-4 text-lg">
                  {navLinks.map((link) => (
                    <div key={link.name}>
                       {link.subLinks ? (
                         <>
                          <h3 className="font-semibold text-foreground/60 px-4 mb-2">{link.name}</h3>
                          <div className="flex flex-col space-y-2 pl-4">
                            {link.subLinks.map((subLink) => (
                              <Link key={subLink.name} href={subLink.href} onClick={closeSheet} className="text-foreground/80 hover:text-foreground">{subLink.name}</Link>
                            ))}
                          </div>
                         </>
                       ) : (
                        link.href && <Link href={link.href} onClick={closeSheet} className={cn("px-4 py-2 rounded-md hover:bg-muted", pathname === link.href && "bg-muted")}>{link.name}</Link>
                       )}
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-4 border-t">
                  <Button asChild className="w-full" size="lg">
                    <Link href="/register" onClick={closeSheet}>Register</Link>
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
