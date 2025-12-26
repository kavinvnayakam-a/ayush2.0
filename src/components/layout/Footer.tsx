import Link from 'next/link';
import Image from 'next/image';

const socialLinks = [
  { name: 'Facebook', href: '#' },
  { name: 'Twitter', href: '#' },
  { name: 'Instagram', href: '#' },
];

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
             <Image src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FArogya%202026%20logo.webp?alt=media&token=0ee2306d-e44e-4c15-b748-69491434e0f5" alt="AyushConclave Logo" width={120} height={40} className="object-contain" />
          </div>
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} AyushConclave. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
