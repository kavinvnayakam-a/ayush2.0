import type { Metadata } from 'next';
import { Cabin } from 'next/font/google';
import Script from 'next/script'; // Import Script component
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import Link from 'next/link';
import { TooltipProvider } from '@/components/ui/tooltip';

const cabin = Cabin({
  subsets: ['latin'],
  variable: '--font-cabin',
});

// JSON-LD moved outside to stay static
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
  'image': ['https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2F1000157891%20(1).webp?alt=media&token=f13fc097-13b6-4af3-bb0e-2788a1fb4b73'],
  'description': 'The National Ayush Conclave and Arogya Expo is a premier event for traditional and holistic health systems.',
  'organizer': {
    '@type': 'Organization',
    'name': 'Vijnana Bharati (VIBHA) with Ministry of AYUSH',
    'url': 'https://ayushconclave.com'
  },
};

export const metadata: Metadata = {
  title: 'National Ayush Conclave 2026 | Arogya Expo Chennai',
  description: 'Join the National Ayush Conclave 2026 and Arogya Expo at Heartfulness, Chennai.',
  // ... rest of your metadata
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased', cabin.variable)}>
        
        {/* Google Tag Manager - Using Next.js Script */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-W5XCRKRJ');`}
        </Script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TR5TZW4DTF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TR5TZW4DTF');
          `}
        </Script>

        {/* Facebook Pixel */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
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
          `}
        </Script>

        <FirebaseClientProvider>
          <TooltipProvider>
            <div className="relative flex min-h-dvh flex-col bg-background">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              
              <Link 
                href="/visitor-pass" 
                className="md:hidden fixed top-1/2 -right-12 z-50 -translate-y-1/2 -rotate-90 origin-bottom-right bg-primary text-primary-foreground px-4 py-2 rounded-t-lg font-bold text-sm uppercase tracking-widest shadow-lg hover:bg-accent transition-colors"
              >
                Visitor Pass
              </Link>
            </div>
          </TooltipProvider>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}