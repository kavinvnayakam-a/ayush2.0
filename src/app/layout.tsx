import type { Metadata } from 'next';
import { Cabin } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';

const cabin = Cabin({
  subsets: ['latin'],
  variable: '--font-cabin',
});

// 1. Enhanced Metadata for SEO
export const metadata: Metadata = {
  title: 'National Ayush Conclave 2026 | Arogya Expo Chennai',
  description: 'Join the National Ayush Conclave 2026 at Heartfulness, Chennai. Exploring Ancient Wisdom, Modern Care, and Holistic Health from Jan 09-12, 2026.',
  keywords: ['Ayush Conclave 2026', 'Arogya Expo', 'Ayurveda Exhibition Chennai', 'Holistic Health Conclave', 'Heartfulness Manapakkam Event'],
  icons: {
    icon: 'https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FArogya%202026%20logo.webp?alt=media&token=0ee2306d-e44e-4c15-b748-69491434e0f5',
    apple: 'https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FArogya%202026%20logo.webp?alt=media&token=0ee2306d-e44e-4c15-b748-69491434e0f5',
  },
  openGraph: {
    title: 'National Ayush Conclave 2026',
    description: 'Bridging Tradition, Innovation and Well-being.',
    images: ['https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2F1000157891%20(1).webp?alt=media&token=f13fc097-13b6-4af3-bb0e-2788a1fb4b73'],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // 2. Google Structured Data (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    'name': 'National Ayush Conclave 2026',
    'startDate': '2026-01-09T09:00:00+05:30',
    'endDate': '2026-01-12T18:00:00+05:30',
    'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode',
    'eventStatus': 'https://schema.org/EventScheduled',
    'location': {
      '@type': 'Place',
      'name': 'Heartfulness (Babuji Memorial Ashram)',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Manapakkam',
        'addressLocality': 'Chennai',
        'addressRegion': 'TN',
        'postalCode': '600125',
        'addressCountry': 'IN',
      },
    },
    'image': [
      'https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2F1000157891%20(1).webp?alt=media&token=f13fc097-13b6-4af3-bb0e-2788a1fb4b73'
    ],
    'description': 'A spiritual sanctuary for holistic growth and community well-being. Bridging Tradition, Innovation and Well-being.',
    'organizer': {
      '@type': 'Organization',
      'name': 'Vijnana Bharati (VIBHA)',
      'url': 'https://ayushconclave.com'
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W5XCRKRJ');`,
          }}
        />
        {/* End Google Tag Manager */}

        {/* Structured Data Script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased', cabin.variable)}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W5XCRKRJ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <FirebaseClientProvider>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
