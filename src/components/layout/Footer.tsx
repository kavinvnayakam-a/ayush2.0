'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Facebook, Twitter, Instagram, ArrowUpRight, Mail } from 'lucide-react';

const footerLinks = [
  { 
    name: 'About', 
    subLinks: [
      { name: 'Organisers', href: '/about/organisers' },
      { name: 'About Arogya Expo', href: '/about/arogya-expo' },
      { name: 'About Ayush Conclave', href: '/about/ayush-conclave' },
    ] 
  },
  { 
    name: 'Scientific', 
    subLinks: [
      { name: 'Call for Papers', href: '/abstract/call-for-papers' },
      { name: 'Scientific Session', href: '/scientific-session' },
      { name: 'Speakers', href: '/speakers' },
    ]
  },
  { 
    name: 'Information', 
    subLinks: [
      { name: 'Registration', href: '/register' },
      { name: 'Venue', href: '/venue' },
      { name: 'Tourist Attractions', href: '/tourist-attractions' },
    ]
  },
  { 
    name: 'Quick Links', 
    subLinks: [
      { name: 'Contact Us', href: '/contact' },
    ]
  },
];

const socialLinks = [
  { name: 'Facebook', href: 'https://www.facebook.com/shreevarmaindia/', icon: <Facebook size={18} /> },
  { name: 'Instagram', href: 'https://www.instagram.com/shreevarma_tamil', icon: <Instagram size={18} /> },
];

export function Footer() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return consistent structural placeholder during hydration
  if (!mounted) {
    return <div className="h-20 bg-[hsl(91,30%,96%)]" />;
  }

  // Hide footer on wellness program standalone pages
  if (pathname && pathname.startsWith('/wellness-program')) {
    return null;
  }

  return (
    <footer className="relative bg-[hsl(91,30%,96%)] border-t border-[hsl(93,45%,44%)]/10 pt-20 pb-10 overflow-hidden">
      {/* Background Decor Orbs */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[hsl(93,45%,44%)]/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#ffa62f]/5 blur-[80px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Main Grid: Centered on Mobile, Left-aligned on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20 text-center lg:text-left">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-8">
            <Image 
              src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FArogya%202026%20logo.webp?alt=media&token=0ee2306d-e44e-4c15-b748-69491434e0f5" 
              alt="AyushConclave Logo" 
              width={180} 
              height={60}
              loading="lazy"
              className="object-contain" 
            />
            <p className="text-[hsl(93,20%,15%)]/60 font-medium leading-relaxed max-w-sm italic mx-auto lg:mx-0">
              "AYUSH for One Health: Bridging Tradition, Innovation and Well-being for a sustainable future."
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link 
                  key={social.name} 
                  href={social.href} 
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[hsl(93,45%,44%)] shadow-sm hover:bg-[hsl(93,45%,44%)] hover:text-white transition-all duration-300"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns: 2 columns on mobile, 4 on tablet/desktop */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerLinks.map((section) => (
                <div key={section.name} className="flex flex-col items-center lg:items-start">
                  <h3 className="text-[hsl(93,20%,15%)] font-black uppercase text-xs tracking-[0.2em] mb-6">
                    {section.name}
                  </h3>
                  <ul className="space-y-4">
                    {section.subLinks.map((link) => (
                      <li key={link.name}>
                        <Link 
                          href={link.href} 
                          className="group text-sm font-bold text-[hsl(93,20%,15%)]/50 hover:text-[hsl(93,45%,44%)] transition-colors flex items-center justify-center lg:justify-start gap-1"
                        >
                          {link.name}
                          <ArrowUpRight size={12} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Centered on Mobile */}
        <div className="pt-8 border-t border-[hsl(93,45%,44%)]/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(93,20%,15%)]/40">
            &copy; {new Date().getFullYear()} National Ayush Conclave. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(93,20%,15%)]/40 hover:text-[hsl(93,45%,44%)] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(93,20%,15%)]/40 hover:text-[hsl(93,45%,44%)] transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
