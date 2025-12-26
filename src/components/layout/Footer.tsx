import Link from 'next/link';
import Image from 'next/image';

const footerLinks = [
    { name: 'About', subLinks: [
        { name: 'Organisers', href: '/about/organisers' },
        { name: 'About Arogya Expo', href: '/about/arogya-expo' },
        { name: 'About Ayush Conclave', href: '/about/ayush-conclave' },
      ] 
    },
    { name: 'Abstract', subLinks: [
        { name: 'Call for Papers', href: '/abstract/call-for-papers' },
      ]
    },
    { name: 'Scientific Session', href: '/scientific-session' },
    { name: 'Speakers', href: '/speakers' },
    { name: 'Registration', href: '/register' },
    { name: 'Venue', href: '/venue' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Tourist Attractions', href: '/tourist-attractions' },
    { name: 'Map', href: '/map' },
];

const socialLinks = [
  { name: 'Facebook', href: '#' },
  { name: 'Twitter', href: '#' },
  { name: 'Instagram', href: '#' },
];

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-8">
            {footerLinks.map((section) => (
                <div key={section.name}>
                    <h3 className="font-semibold mb-4">{section.name}</h3>
                    <ul className="space-y-2">
                        {section.subLinks ? section.subLinks.map(link => (
                            <li key={link.name}>
                                <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    {link.name}
                                </Link>
                            </li>
                        )) : (
                            section.href && <li>
                                <Link href={section.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    {section.name}
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            ))}
        </div>
        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between">
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
