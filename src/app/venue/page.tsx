'use client';

import React from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Phone, 
  Plane, 
  Train, 
  Car, 
  BusFront,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function VenuePage() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const venueName = "Babuji Memorial Ashram, Manapakkam";
  const googleMapsAppUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueName)}&query_place_id=ChIJuVsroc9gUjoRAXBf489zoMU`;

  return (
    <main className="min-h-screen bg-white selection:bg-[hsl(93,45%,44%)] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-20 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full border border-slate-200 text-[hsl(93,45%,44%)] font-black text-[10px] tracking-[0.3em] uppercase mb-8 shadow-sm">
              <MapPin size={14} /> Location Details
            </div>
            <h1 className="text-6xl md:text-8xl font-[1000] text-[hsl(93,20%,15%)] uppercase tracking-tighter mb-6 leading-tight">
              Babuji Memorial <span className="text-[hsl(93,45%,44%)] italic text-stroke">Ashram</span>
            </h1>
            <p className="text-xl font-bold text-slate-500 italic max-w-2xl leading-relaxed">
              SRCM World Headquarters, Lalithamba Nagar, Manapakkam, Chennai, Tamil Nadu - 600089
            </p>
          </div>
        </div>
      </section>

      {/* 2. COLOURED MAP SECTION */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Map Interaction Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-10 rounded-[3rem] bg-[hsl(93,20%,15%)] text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xs font-black text-[#ffa62f] uppercase tracking-[0.3em] mb-4">Navigation</h3>
                  <h2 className="text-3xl font-black uppercase mb-6 leading-tight">Find Your <br/>Way Here</h2>
                  <p className="text-white/60 font-bold italic mb-10 text-sm">Click the map or the button below to launch GPS navigation directly in your maps app.</p>
                  
                  <Button 
                    asChild
                    className="w-full h-16 rounded-2xl bg-[hsl(93,45%,44%)] hover:bg-[#ffa62f] text-white font-black uppercase tracking-widest transition-all"
                  >
                    <a href={googleMapsAppUrl} target="_blank" rel="noopener noreferrer">
                      <Navigation className="mr-2" size={18} /> Start Navigation
                    </a>
                  </Button>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
              </div>

              <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 space-y-4">
                <div className="flex items-center gap-4 text-[hsl(93,20%,15%)]">
                  <Clock size={20} className="text-[hsl(93,45%,44%)]" />
                  <span className="text-sm font-black uppercase tracking-tight">06:00 AM - 06:30 PM</span>
                </div>
                <div className="flex items-center gap-4 text-[hsl(93,20%,15%)]">
                  <Phone size={20} className="text-[hsl(93,45%,44%)]" />
                  <span className="text-sm font-black uppercase tracking-tight">+91 44 4217 1111</span>
                </div>
              </div>
            </div>

            {/* The Coloured Map Embed */}
            <div className="lg:col-span-8">
              <div className="aspect-[16/10] bg-slate-200 rounded-[3.5rem] overflow-hidden border-8 border-white shadow-2xl relative group">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="brightness-110 contrast-125 saturate-50 hover:saturate-100 transition-all duration-700 cursor-pointer"
                  src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:ChIJuVsroc9gUjoRAXBf489zoMU&zoom=15`}
                ></iframe>
                
                {/* App Redirect Overlay */}
                <a 
                  href={googleMapsAppUrl} 
                  target="_blank" 
                  className="absolute inset-0 z-10 flex items-center justify-center bg-[hsl(93,20%,15%)]/0 group-hover:bg-[hsl(93,20%,15%)]/10 transition-all"
                >
                  <div className="bg-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <span className="text-xs font-black uppercase tracking-widest text-[hsl(93,20%,15%)]">Open in Maps</span>
                    <ArrowUpRight size={16} className="text-[hsl(93,45%,44%)]" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW TO REACH SECTION (GREEN BACKGROUND) */}
      <section className="py-24 bg-[hsl(93,45%,44%)] text-white rounded-t-[4rem] relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[150px] rounded-full translate-x-1/2 translate-y-1/2" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-5xl md:text-7xl font-[1000] uppercase tracking-tighter mb-6">
              How to <span className="text-[#ffa62f] italic">Reach</span>
            </h2>
            <p className="text-lg font-bold opacity-80 italic">Detailed travel guide for domestic and international delegates.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: <Plane size={32} />, 
                title: "By Air", 
                dist: "12 KM", 
                desc: "Chennai International Airport (MAA) is the closest. Taxis & app-cabs (Uber/Ola) are highly recommended." 
              },
              { 
                icon: <Train size={32} />, 
                title: "By Rail", 
                dist: "15-20 KM", 
                desc: "Chennai Central (MAS) or Egmore (MS) are the main hubs. Local trains stop at Guindy/Palavanthangal." 
              },
              { 
                icon: <BusFront size={32} />, 
                title: "By Bus", 
                dist: "Frequent", 
                desc: "MTC buses to 'Manapakkam Ashram' or 'Ramapuram Signal'. Routes 54B, S21, and 88C stop nearby." 
              },
              { 
                icon: <Car size={32} />, 
                title: "By Road", 
                dist: "Easy Access", 
                desc: "Located off Mount-Poonamallee Road near MIOT Hospital. Ample parking is available on-site." 
              }
            ].map((item, i) => (
              <div key={i} className="group bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-[3rem] hover:bg-white/20 transition-all flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#ffa62f] transition-all duration-500">
                  {item.icon}
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-2xl font-black uppercase tracking-tight">{item.title}</h3>
                    <span className="text-[10px] font-black bg-white/20 px-2 py-1 rounded text-white">{item.dist}</span>
                  </div>
                </div>
                <p className="text-sm font-bold opacity-70 leading-relaxed italic mt-auto">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
