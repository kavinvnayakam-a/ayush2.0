'use client';

import React from 'react';
import { Ticket, UserCheck, ShieldCheck, Play, Video } from 'lucide-react';
import { VisitorForm } from '@/components/forms/VisitorForm';
import { VideoReelItem } from '@/components/VideoReelItem';


export default function VisitorPassPage() {

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    'name': 'Arogya Expo 2026 (Part of National Ayush Conclave)',
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
    'description': 'Get your free visitor pass for the Arogya Expo 2026. Explore over 100 stalls, live demonstrations, and open sessions on holistic health and wellness.',
    'offers': {
      '@type': 'Offer',
      'name': 'Free Visitor Pass',
      'price': '0',
      'priceCurrency': 'INR',
      'availability': 'https://schema.org/InStock',
      'url': 'https://ayushconclave.com/visitor-pass',
      'validFrom': '2024-01-01',
    },
    'organizer': {
      '@type': 'Organization',
      'name': 'Vijnana Bharati (VIBHA)',
      'url': 'https://ayushconclave.com'
    }
  };


  return (
    <main className="min-h-screen bg-white selection:bg-[hsl(93,45%,44%)] selection:text-white">
      {/* Add JSON-LD to the head of the document */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-[hsl(91,30%,96%)]">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full border border-slate-200 text-[hsl(93,45%,44%)] font-black text-[10px] tracking-[0.3em] uppercase mb-8 shadow-sm">
            <Ticket size={14} /> Arogya Expo 2026
          </div>
          <h1 className="text-6xl md:text-9xl font-[1000] text-[hsl(93,20%,15%)] uppercase tracking-tighter mb-6">
            Visitor <span className="text-[hsl(93,45%,44%)] italic">Pass</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold text-[hsl(93,20%,15%)]/60 max-w-4xl mx-auto leading-relaxed italic">
            "Your complimentary ticket to explore the future of holistic health and wellness."
          </p>
        </div>
      </section>

      {/* 2. FORM SECTION */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-xl mx-auto">
          <div className="bg-white border border-slate-100 shadow-2xl shadow-slate-100 rounded-[3rem] p-10">
             <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[hsl(93,45%,44%)]/10 rounded-2xl flex items-center justify-center text-[hsl(93,45%,44%)] mx-auto mb-4">
                <Ticket size={32} />
              </div>
              <h2 className="text-3xl font-black text-[hsl(93,20%,15%)] uppercase">Register for Free</h2>
              <p className="text-slate-500 font-bold italic">Fill in your details to receive your pass via email.</p>
            </div>
            <VisitorForm buttonText="Confirm Your Free Pass" />
          </div>
        </div>
      </section>

      {/* 3. VIDEO REEL SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest">
              <Video size={18} />
              <span>Event Highlights</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight mt-2">
              Catch a Glimpse of the Expo
            </h2>
          </div>
          <div className="relative max-w-sm mx-auto">
            <div className="absolute inset-0 bg-slate-200 rounded-[3.5rem] transform -rotate-2"></div>
            <div className="relative h-[600px] overflow-y-auto snap-y snap-mandatory rounded-[3rem] border-8 border-white shadow-2xl scrollbar-hide">
              {Array.from({ length: 4 }).map((_, i) => (
                <VideoReelItem
                  key={i}
                  // You can replace these with actual video sources later
                  videoSrc="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FVideo%20BG%2FHon'ble%20Chief%20Minister%20of%20Goa%2C%20Dr.%20Pramod%20Sawant.mp4?alt=media&token=c11c15f4-3d71-46f9-a359-57b98a39a7b7"
                  link="#" // Replace with your navigation link
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      
      {/* 4. INFO SECTION */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-xl mx-auto space-y-10">
          <div>
              <h2 className="text-3xl font-black text-[hsl(93,20%,15%)] uppercase tracking-tight mb-4">What's Included?</h2>
              <p className="text-slate-500 font-bold italic leading-relaxed">Your free visitor pass grants you access to key areas of the Arogya Expo. Immerse yourself in the world of AYUSH and discover innovations in wellness.</p>
          </div>

          <div className="space-y-4">
               <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <UserCheck className="text-[hsl(93,45%,44%)] shrink-0 mt-0.5" size={24} />
                  <div>
                      <h4 className="font-black text-slate-800 uppercase">Expo Hall Access</h4>
                      <p className="text-sm font-bold text-slate-400">Explore over 100 stalls from leading AYUSH brands and startups.</p>
                  </div>
               </div>
               <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <ShieldCheck className="text-[hsl(93,45%,44%)] shrink-0 mt-0.5" size={24} />
                  <div>
                      <h4 className="font-black text-slate-800 uppercase">Open Sessions & Demos</h4>
                      <p className="text-sm font-bold text-slate-400">Attend public talks, product launches, and live demonstrations.</p>
                  </div>
               </div>
          </div>
          <div className="bg-[hsl(93,20%,15%)] text-white p-8 rounded-[2.5rem] shadow-xl">
              <h4 className="font-black text-white uppercase text-lg mb-2">Please Note</h4>
              <p className="text-white/70 text-sm font-medium leading-relaxed">This pass does not include access to the paid scientific sessions, delegate lunches, or workshops. To attend these, please register as a delegate.</p>
          </div>
        </div>
      </section>

    </main>
  );
}
