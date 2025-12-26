'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Target, Zap, Heart } from 'lucide-react';

/** --- SUB-COMPONENT: ORGANISER DETAIL CARD --- **/
function OrganiserDescription({ 
  id, 
  title, 
  content, 
  vision, 
  mission,
  logoUrl 
}: { 
  id: string, 
  title: string, 
  content: string, 
  vision?: string, 
  mission?: string,
  logoUrl: string
}) {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-xl shadow-[hsl(93,45%,44%)]/5 mb-10 md:mb-16 transition-all hover:shadow-2xl group">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 mb-8 md:mb-10">
        <div className="flex items-center gap-4">
          <span className="text-4xl md:text-5xl font-black text-[hsl(93,45%,44%)]/20">0{id}</span>
          <h2 className="text-2xl md:text-4xl font-black text-[hsl(93,20%,15%)] uppercase tracking-tight">
            {title}
          </h2>
        </div>
        <div className="relative w-32 h-20 md:w-48 md:h-24 bg-white rounded-2xl p-2 shadow-inner border border-slate-50 transition-transform group-hover:scale-105 duration-500 mx-auto md:mx-0">
          <Image src={logoUrl} alt={`${title} Logo`} fill className="object-contain p-2" />
        </div>
      </div>
      
      <div className="prose prose-slate max-w-none mb-8 md:mb-10 text-center md:text-left">
        <p className="text-base md:text-lg text-[hsl(93,20%,15%)]/70 font-medium leading-relaxed">
          {content}
        </p>
      </div>

      {(vision || mission) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[hsl(93,45%,44%)]/10">
          {vision && (
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[hsl(93,45%,44%)] font-black uppercase text-[10px] md:text-xs tracking-widest">
                <Target size={16} /> Vision
              </div>
              <p className="text-sm font-bold text-[hsl(93,20%,15%)]/60 leading-relaxed italic text-center md:text-left">
                "{vision}"
              </p>
            </div>
          )}
          {mission && (
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#ffa62f] font-black uppercase text-[10px] md:text-xs tracking-widest">
                <Zap size={16} /> Mission
              </div>
              <p className="text-sm font-bold text-[hsl(93,20%,15%)]/60 leading-relaxed italic text-center md:text-left">
                "{mission}"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** --- MAIN PAGE --- **/
export default function OrganisersPage() {
  return (
    <main className="min-h-screen bg-[hsl(91,30%,96%)] overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 px-6 text-center overflow-hidden">
         <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[hsl(93,45%,44%)]/10 blur-[80px] md:blur-[120px] rounded-full animate-float" />
          <div className="absolute bottom-0 right-1/4 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-[#ffa62f]/10 blur-[60px] md:blur-[100px] rounded-full animate-float [animation-duration:20s]" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 md:px-6 py-2 md:py-2.5 rounded-full border border-white text-[hsl(93,45%,44%)] font-black text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase mb-6 md:mb-8 shadow-sm">
            <Sparkles size={14} /> The Visionaries
          </div>
          <h1 className="text-5xl md:text-8xl font-[1000] text-[hsl(93,20%,15%)] uppercase tracking-tighter mb-4 leading-[0.9]">
            Organisers
          </h1>
          <div className="w-16 md:w-24 h-1.5 md:h-2 bg-[#ffa62f] mx-auto rounded-full mb-8 md:mb-12" />
        </div>
      </section>

      {/* 2. CHIEF LEADERSHIP SECTION */}
      <section className="container mx-auto px-6 pb-20 md:pb-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          
          {/* Shri Narendra Modi */}
          <div className="flex flex-col items-center text-center group">
            <div className="relative w-64 md:w-72 h-[380px] md:h-[420px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border-8 border-white shadow-2xl mb-6 md:mb-8 transition-transform group-hover:-translate-y-4 duration-500">
              <Image 
                src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FOrganisers%2FModi.webp?alt=media&token=86eb1f00-0bc0-4b76-ba74-2e2c62fa4ebd" 
                alt="Shri Narendra Modi" fill className="object-cover" 
              />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-[hsl(93,20%,15%)] uppercase">Shri Narendra Modi</h3>
            <p className="text-xs md:text-sm font-black text-[hsl(93,45%,44%)] uppercase tracking-widest mt-2">Hon'ble Prime Minister</p>
          </div>

          {/* Shri Prataprao Jadhav */}
          <div className="flex flex-col items-center text-center group md:mt-20">
            <div className="relative w-64 md:w-72 h-[380px] md:h-[420px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border-8 border-white shadow-2xl mb-6 md:mb-8 transition-transform group-hover:-translate-y-4 duration-500">
              <Image 
                src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FOrganisers%2FShri%20Prataprao%20Jadhav.webp?alt=media&token=14f151ae-7c25-4c47-8875-0176df5f8b38" 
                alt="Shri Prataprao Jadhav" fill className="object-cover" 
              />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-[hsl(93,20%,15%)] uppercase">Shri Prataprao Jadhav</h3>
            <p className="text-[10px] md:text-xs font-black text-[#ffa62f] uppercase tracking-widest mt-2 leading-relaxed">
              Hon'ble Minister of State (IC)<br/>Ministry of Ayush
            </p>
          </div>

          {/* Rajesh Kotecha */}
          <div className="flex flex-col items-center text-center group">
            <div className="relative w-64 md:w-72 h-[380px] md:h-[420px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border-8 border-white shadow-2xl mb-6 md:mb-8 transition-transform group-hover:-translate-y-4 duration-500">
              <Image 
                src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FOrganisers%2FPadmashree%20Vaidya%20%20_Rajesh%20Kotecha.webp?alt=media&token=b16b78e9-9b1f-4fc1-88cc-3ed4ac2c97f8" 
                alt="Rajesh Kotecha" fill className="object-cover" 
              />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-[hsl(93,20%,15%)] uppercase px-4">Padmashree Vaidya Rajesh Kotecha</h3>
            <p className="text-xs md:text-sm font-black text-[hsl(93,45%,44%)] uppercase tracking-widest mt-2">Secretary, Ministry of AYUSH</p>
          </div>

        </div>
      </section>

      {/* 3. DETAILED ORGANISATIONS SECTION */}
      <section className="container mx-auto px-6 pb-20 md:pb-40 max-w-6xl">
        
        {/* Ministry of AYUSH */}
        <OrganiserDescription 
          id="1"
          title="Ministry of AYUSH"
          logoUrl="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FOrganisers%2Fpreview.webp?alt=media&token=0cfd10a9-5b0c-4db0-8cb0-2217544b4151"
          content="Established in 1995 and elevated to a full-fledged Ministry in 2014, the Ministry of AYUSH is dedicated to promoting and developing education, research, and healthcare delivery through time-tested systems of medicine deeply rooted in India’s cultural heritage."
          vision="To position AYUSH systems as a vital part of global healthcare by blending tradition with innovation, ensuring holistic well-being for all."
          mission="To promote the growth and sustainability of AYUSH systems through education, research, standardization, and outreach, while preserving the integrity and authenticity of ancient healing traditions."
        />

        {/* Vijnana Bharati */}
        <OrganiserDescription 
          id="2"
          title="Vijnana Bharati (VIBHA)"
          logoUrl="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FOrganisers%2FVibha.webp?alt=media&token=fc6db0dd-9e7c-4abc-90b9-b7c06e5c23a7"
          content="Vijnana Bharati is a science movement rooted in the spirit of swadeshi. Initiated at the IISc, Bengaluru, it bridges traditional and modern scientific knowledge. Today, VIBHA has active units in 22 states, adapting modern science to meet India's unique national needs."
          mission="Rejuvenating the Swadeshi spirit in the modern era of science and technology, fostering a harmonious integration of physical and spiritual sciences."
        />

        {/* NASYA */}
        <OrganiserDescription 
          id="3"
          title="NASYA"
          logoUrl="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FOrganisers%2FNasya.webp?alt=media&token=d664f94f-fdac-413b-9f1f-7ee040141a7a"
          content="The National Ayurveda Students and Youth Association (NASYA) is an initiative aimed at promoting Ayurveda at the grassroots level. Since 2008, it has empowered students and youth to build a healthier India, helping reduce the country's overall healthcare burden."
          mission="To make Ayurveda a vital part of India’s health system and cultural identity through research, entrepreneurship, and international collaborations."
        />

        {/* Heartfulness */}
        <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-xl shadow-[#ffa62f]/5 transition-all hover:shadow-2xl group">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 mb-8">
            <div className="flex items-center gap-4">
              <span className="text-4xl md:text-5xl font-black text-[#ffa62f]/20">04</span>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl md:text-4xl font-black text-[hsl(93,20%,15%)] uppercase tracking-tight">Heartfulness</h2>
                <Heart className="text-[#ffa62f] fill-[#ffa62f]" size={24} />
              </div>
            </div>
            <div className="relative w-32 h-20 md:w-48 md:h-24 bg-white rounded-2xl p-2 shadow-inner border border-slate-50 transition-transform group-hover:scale-105 duration-500 mx-auto md:mx-0">
              <Image 
                src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FOrganisers%2FHeartfulness.webp?alt=media&token=f08090fa-6239-464a-8ce5-eae869f38071" 
                alt="Heartfulness Logo" fill className="object-contain p-2" 
              />
            </div>
          </div>
          <p className="text-base md:text-lg text-[hsl(93,20%,15%)]/70 font-medium leading-relaxed mb-6 italic border-l-4 border-[#ffa62f] pl-4 md:pl-6 text-center md:text-left">
            "Heartfulness is about feeling. Our entire life is led by feelings and inspirations, and that is the role of the heart."
          </p>
          <p className="text-base md:text-lg text-[hsl(93,20%,15%)]/70 font-medium leading-relaxed text-center md:text-left">
            The whole exercise of fine-tuning the heart with the mind is through meditation on the heart. When we manage to listen to the heart and capture the inspiration that comes from within, we learn to master our life.
          </p>
        </div>

      </section>
    </main>
  );
}
