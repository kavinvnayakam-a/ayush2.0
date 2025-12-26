'use client';

import React from 'react';
import { Navigation, Compass, Info, Camera, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ATTRACTIONS = [
  {
    name: "Marina Beach",
    description: "India’s longest natural urban beach. It stretches 13 km along the Bay of Bengal, known for sunrises and street food.",
    placeId: "ChIJuzIBtptoUjoRCrZi347PSQU",
    tag: "Coastal",
    meta: "13 KM Stretch"
  },
  {
    name: "Government Museum",
    description: "Established in 1851, it’s India’s second-oldest museum. Famous for Indo-Saracenic architecture and rare South Indian bronzes.",
    placeId: "ChIJ-4qb8w5mUjoRNhwcE3v6B5U",
    tag: "Heritage",
    meta: "Egmore"
  },
  {
    name: "MGR & Jayalalitha Memorial",
    description: "A lotus-shaped memorial for M.G. Ramachandran and Jayalalithaa on Marina Beach featuring an eternal flame.",
    placeId: "ChIJEffDdKNoUjoRHl8gITmyAbM",
    tag: "Landmark",
    meta: "Marina Beach"
  },
  {
    name: "Santhome Cathedral Basilica",
    description: "Built over the tomb of Saint Thomas the Apostle. Features stunning neo-Gothic architecture and stained glass windows.",
    placeId: "ChIJH7hVUn9oUjoR3pS3Si7dSKE",
    tag: "Religious",
    meta: "Historic"
  },
  {
    name: "Mamallapuram",
    description: "UNESCO World Heritage site famous for its ancient rock-cut temples, Shore Temple, and Arjuna’s Penance.",
    placeId: "ChIJb_2RS66sUzoRQRGblYqNEqo",
    tag: "UNESCO Site",
    meta: "Ancient"
  },
  {
    name: "Kapaleeshwarar Temple",
    description: "Dedicated to Lord Shiva, featuring classic Dravidian architecture with a tall, ornate gopuram.",
    placeId: "ChIJM-WyVNJnUjoRidu8sHTZJ8s",
    tag: "Temple",
    meta: "Mylapore"
  },
  {
    name: "Valluvar Kottam",
    description: "Dedicated to the poet Thiruvalluvar. Features a grand chariot-shaped structure housing all 1,330 Thirukkural verses.",
    placeId: "ChIJS7wpbgBnUjoRXO71BeBzG6E",
    tag: "Culture",
    meta: "Nungambakkam"
  },
  {
    name: "DakshinaChitra",
    description: "A cultural museum showcasing South Indian heritage through traditional houses, crafts, and performances.",
    placeId: "ChIJj3-0K45aUjoRM_ZN_4kjp1g",
    tag: "Living Museum",
    meta: "ECR Road"
  },
  {
    name: "Arignar Anna Zoo",
    description: "One of the largest zoos in South Asia with over 170 species, safaris, and a butterfly house.",
    placeId: "ChIJzdR_sAT2UjoRhpxs68kL8LI",
    tag: "Wildlife",
    meta: "Vandalur"
  },
  {
    name: "Vivekananda House",
    description: "A historic building where Swami Vivekananda stayed in 1897. Now houses exhibits on his life.",
    placeId: "ChIJ3WSdxJxoUjoRMZCq-sm2iAQ",
    tag: "Spiritual",
    meta: "Triplicane"
  }
];

export default function AttractionsPage() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <main className="min-h-screen bg-white selection:bg-[hsl(93,45%,44%)] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-12 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 text-[hsl(93,45%,44%)] font-black text-[10px] tracking-widest uppercase mb-6 shadow-sm">
            <Compass size={14} /> Local Explorations
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-[hsl(93,20%,15%)] uppercase tracking-tighter mb-4 leading-none">
            City <span className="text-[hsl(93,45%,44%)] italic">Attractions</span>
          </h1>
          <p className="text-lg font-bold text-slate-400 italic max-w-xl mx-auto">
            Discover the vibrant landmarks and rich heritage of Chennai.
          </p>
        </div>
      </section>

      {/* 2. ATTRACTIONS LIST */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 gap-32">
          {ATTRACTIONS.map((place, i) => (
            <div key={i} className={`flex flex-col lg:flex-row gap-16 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Content Side */}
              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="bg-[#ffa62f] text-white text-[9px] font-black px-3 py-1 rounded uppercase tracking-widest">
                    {place.tag}
                  </span>
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                    {place.meta}
                  </span>
                </div>
                <h2 className="text-4xl font-black text-[hsl(93,20%,15%)] uppercase tracking-tight">
                  {place.name}
                </h2>
                <p className="text-lg font-bold text-slate-500 italic leading-relaxed">
                  {place.description}
                </p>
                
                <Button 
                  asChild
                  className="h-16 px-10 rounded-2xl bg-[hsl(93,45%,44%)] hover:bg-[#ffa62f] text-white font-black uppercase tracking-widest transition-all shadow-lg"
                >
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}&query_place_id=${place.placeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation className="mr-2" size={18} /> Navigate to Place
                  </a>
                </Button>
              </div>

              {/* Map Side (FIXED IFRAME CONNECTION) */}
              <div className="lg:w-1/2 w-full">
                <div className="aspect-video bg-slate-50 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl relative">
                  {apiKey ? (
                    <iframe
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${place.placeId}&zoom=15`}
                    ></iframe>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-300 p-8 text-center">
                      <MapPin size={48} className="mb-4 opacity-20" />
                      <p className="font-bold text-sm uppercase tracking-widest">API Key required for Map</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 3. FOOTER TIPS (GREEN BACKGROUND) */}
      <section className="bg-[hsl(93,45%,44%)] text-white py-20 px-6 rounded-t-[4rem]">
        <div className="container mx-auto max-w-4xl text-center">
          <Info className="mx-auto text-[#ffa62f] mb-6" size={48} />
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">Pro Travel Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-white/10 p-8 rounded-3xl border border-white/10">
              <h4 className="font-black uppercase text-[#ffa62f] mb-2">Transport</h4>
              <p className="text-sm font-bold italic opacity-80 leading-relaxed">We recommend using Uber or Ola for easy movement. Most sites are within 10-15km of the venue.</p>
            </div>
            <div className="bg-white/10 p-8 rounded-3xl border border-white/10">
              <h4 className="font-black uppercase text-[#ffa62f] mb-2">Etiquette</h4>
              <p className="text-sm font-bold italic opacity-80 leading-relaxed">Temples like Kapaleeshwarar require modest dress codes (no shorts). Early mornings are best for the beach.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
