'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, MapPin, Sparkles, Navigation, ShieldCheck, Heart } from 'lucide-react';
import { WellnessProgramForm } from '@/components/forms/WellnessProgramForm';
import { Button } from '@/components/ui/button';

export default function WellnessProgramPage() {
  const mapUrl = "https://maps.app.goo.gl/FwDdr1mgzz7KbJzR9";
  const heroImageUrl = "https://firebasestorage.googleapis.com/v0/b/shreevarma-india-location.firebasestorage.app/o/wellnessprogram%2FWELLNESS%20PROGRAM_1.webp?alt=media&token=630bca3d-dbc0-400f-88ee-02476dafc330";

  return (
    <main className="min-h-screen bg-white selection:bg-[hsl(93,45%,44%)] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-[hsl(91,30%,96%)]">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] bg-[hsl(93,45%,44%)]/10 blur-[120px] rounded-full animate-float" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#ffa62f]/10 blur-[100px] rounded-full animate-float [animation-duration:20s]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 bg-white px-6 py-2.5 rounded-full border border-[hsl(93,45%,44%)]/10 text-[hsl(93,45%,44%)] font-black text-xs tracking-[0.3em] uppercase mb-2 shadow-sm">
                <Sparkles size={16} /> Transform Your Workplace
              </div>
              <h1 className="text-5xl md:text-7xl xl:text-8xl font-[1000] text-[hsl(93,20%,15%)] uppercase tracking-tighter leading-none">
                Corporate <br/><span className="text-[hsl(93,45%,44%)] italic">Wellness</span> Program
              </h1>
              <p className="text-xl md:text-2xl font-bold text-[hsl(93,20%,15%)]/60 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Enhance productivity, reduce stress, and foster a healthier organizational culture through ancient wisdom and modern wellness.
              </p>
            </div>

            {/* Image Content */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] aspect-square rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl transition-transform hover:scale-[1.02] duration-500">
                <Image 
                  src={heroImageUrl} 
                  alt="Corporate Wellness Program" 
                  fill 
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EVENT INFO & FORM SECTION */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-5 space-y-12">
              <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-100 relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-xs font-black text-[#ffa62f] uppercase tracking-[0.3em] mb-10">Program Highlights</h3>
                  
                  <div className="space-y-8">
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-[hsl(93,45%,44%)]/10 flex items-center justify-center text-[hsl(93,45%,44%)] shrink-0">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <h4 className="font-black text-[hsl(93,20%,15%)] uppercase text-sm mb-1">Date</h4>
                        <p className="text-lg font-bold text-slate-500">April 12, 2026</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-[hsl(93,45%,44%)]/10 flex items-center justify-center text-[hsl(93,45%,44%)] shrink-0">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h4 className="font-black text-[hsl(93,20%,15%)] uppercase text-sm mb-1">Location</h4>
                        <p className="text-lg font-bold text-slate-500">Babuji Memorial Ashram</p>
                        <p className="text-sm font-medium text-slate-400 italic">Manapakkam, Chennai</p>
                      </div>
                    </div>

                    <div className="pt-6">
                      <Button asChild variant="outline" className="h-14 px-8 rounded-2xl border-2 border-[hsl(93,45%,44%)] text-[hsl(93,45%,44%)] font-bold hover:bg-[hsl(93,45%,44%)] hover:text-white transition-all w-full md:w-auto">
                        <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                          <Navigation className="mr-2 h-4 w-4" /> View on Google Maps
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  <Heart size={200} />
                </div>
              </div>

              <div className="p-10 rounded-[3rem] bg-[hsl(93,20%,15%)] text-white relative overflow-hidden">
                <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-3">
                  <ShieldCheck className="text-[#ffa62f]" /> Why Join?
                </h3>
                <ul className="space-y-4 text-white/70 font-medium">
                  <li>• Customized yoga and meditation sessions</li>
                  <li>• Ayurvedic stress management workshops</li>
                  <li>• Nutrition counseling for high-performance</li>
                  <li>• Holistic lifestyle ergonomics</li>
                </ul>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-7 bg-white rounded-[4rem] p-10 md:p-16 border border-slate-100 shadow-2xl relative">
              <div className="mb-10">
                <h2 className="text-3xl font-black text-[hsl(93,20%,15%)] uppercase tracking-tight">Registration Form</h2>
                <p className="text-slate-500 font-bold italic mt-2">Secure your spot for the Corporate Wellness Program.</p>
              </div>
              <WellnessProgramForm />
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
