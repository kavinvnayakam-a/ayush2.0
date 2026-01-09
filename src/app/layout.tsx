

import type { Metadata } from 'next';
import { Cabin } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import Link from 'next/link';

const cabin = Cabin({
  subsets: ['latin'],
  variable: '--font-cabin',
});

// 1. Enhanced Metadata for SEO
export const metadata: Metadata = {
  title: 'National Ayush Conclave 2026 | Arogya Expo Chennai',
  description: 'Join the National Ayush Conclave 2026 and Arogya Expo at Heartfulness, Chennai. Exploring Ancient Wisdom, Modern Care, and Holistic Health from Jan 09-12, 2026. Organized by Ministry of Ayush, Vijnana Bharati (VIBHA), and NASYA.',
  keywords: ['Ayush Conclave', 'Arogya Expo', 'Ayush Conclave 2026', 'Arogya Expo 2026', 'Expo 2026', 'Ministry of Ayush', 'Shreevarma', 'Nasya', 'Vijnana Bharati', 'Ayurveda Conference India', 'Holistic Health Expo Chennai'],
  icons: {
    icon: 'https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FArogya%202026%20logo.webp?alt=media&token=0ee2306d-e44e-4c15-b748-69491434e0f5',
    apple: 'https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FArogya%202026%20logo.webp?alt=media&token=0ee2306d-e44e-4c15-b748-69491434e0f5',
  },
  openGraph: {
    title: 'National Ayush Conclave & Arogya Expo 2026',
    description: 'Bridging Tradition, Innovation and Well-being in Chennai.',
    images: ['https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2F1000157891%20(1).webp?alt=media&token=f13fc097-13b6-4af3-bb0e-2788a1fb4b73'],
    type: 'website',
    url: 'https://ayushconclave.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'National Ayush Conclave & Arogya Expo 2026',
    description: 'India\'s premier event for holistic health, bridging ancient wisdom with modern innovation.',
    images: ['https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2F1000157891%20(1).webp?alt=media&token=f13fc097-13b6-4af3-bb0e-2788a1fb4b73'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // 2. Google Structured Data (JSON-LD) for the Event
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    'name': 'National Ayush Conclave & Arogya Expo 2026',
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
    'description': 'The National Ayush Conclave and Arogya Expo is a premier event for traditional and holistic health systems. Join us to explore Ayurveda, Yoga, Unani, Siddha, and Homoeopathy.',
    'organizer': {
      '@type': 'Organization',
      'name': 'Vijnana Bharati (VIBHA) with Ministry of AYUSH',
      'url': 'https://ayushconclave.com'
    },
    'offers': {
      '@type': 'Offer',
      'name': 'Delegate Registration',
      'url': 'https://ayushconclave.com/register',
      'price': '2000',
      'priceCurrency': 'INR',
      'availability': 'https://schema.org/InStock',
      'validFrom': '2024-01-01',
    },
    'performer': [
        {
            '@type': 'PerformingGroup',
            'name': 'Ministry of Ayush'
        },
        {
            '@type': 'PerformingGroup',
            'name': 'Shreevarma'
        },
        {
            '@type': 'PerformingGroup',
            'name': 'Nasya'
        }
    ]
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

        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-TR5TZW4DTF"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TR5TZW4DTF');
            `,
          }}
        />

        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1854458242101440');
              fbq('track', 'PageView');
            `,
          }}
        />
        {/* End Meta Pixel Code */}

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
        
        {/* Meta Pixel Code (noscript) */}
        <noscript>
          <img height="1" width="1" style={{display: 'none'}}
          src="https://www.facebook.com/tr?id=1854458242101440&ev=PageView&noscript=1"
        /></noscript>
        {/* End Meta Pixel Code */}

        <FirebaseClientProvider>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </FirebaseClientProvider>
        
        <Link href="/visitor-pass" className="md:hidden fixed top-1/2 -right-14 z-50 -translate-y-1/2 rotate-90 origin-bottom-right bg-primary text-primary-foreground px-4 py-2 rounded-t-lg font-bold text-sm uppercase tracking-widest shadow-lg hover:bg-accent transition-colors">
          Visitor Pass
        </Link>
      </body>
    </html>
  );
}
