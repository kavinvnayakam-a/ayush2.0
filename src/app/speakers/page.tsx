'use client';

import React from 'react';
import Image from 'next/image';
import { Mic2, Sparkles, BookOpen } from 'lucide-react';

const speakers = [
  {
    name: "Dr. Bala Pesala",
    role: "Founder & CEO, Ayur.AI; Adjunct Prof. at IIT Jodhpur & SRM",
    topic: "Integrating Ayurveda, AI & IoT",
    image: "https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FSpeakers%2FDr.%20Bala%20Pesala.webp?alt=media&token=3816daaf-1177-4161-b220-77bb38ef3f23"
  },
  {
    name: "Prof. V. Srinivasa Chakravarthy",
    role: "Professor, Indian Institute of Technology, Madras, India",
    topic: "Rethinking the Tridosha Theory: A Bio-Thermodynamic Perspective",
    image: "https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FSpeakers%2FProf.%20V.%20Srinivasa%20Chakravarthy.webp?alt=media&token=f49ad9ba-3c2d-438f-9822-5c204a0e565c"
  },
  {
    name: "Dr. Aswini Godbole",
    role: "Associate Professor, TDU",
    topic: "C. elegans Model for Deciphering Ayurvedic Nootropics",
    image: "https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FSpeakers%2FDr.%20Aswini%20Godbole.webp?alt=media&token=35999bf3-1deb-4fa1-97cc-201df3f3494c"
  },
  {
    name: "Dr. Mamta K. V.",
    role: "SDM College, Udupi; Kerala Ayurveda Ltd., Bengaluru",
    topic: "Microbiome Dynamics in Stree Roga: An Ayurvedic Perspective",
    image: "https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FSpeakers%2FDr.%20Mamta%20K.%20V..webp?alt=media&token=46557617-b84d-490b-9289-b8129319d5df"
  },
  {
    name: "Mr. J. Sreenivasa Rao",
    role: "Scientist‑E, ICMR‑NIN, Hyderabad",
    topic: "Food Chemistry, Traditional Diet Research & Food Safety",
    image: "https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FSpeakers%2FMr.%20J.%20Sreenivasa%20Rao.webp?alt=media&token=648dadec-7bf4-4a1c-8244-c9cd1e715947"
  },
  {
    name: "Dr. Narayanan Nambi",
    role: "Principal & Chief Physician, Ashtamgam Ayurveda",
    topic: "Decoding Keraliya Panchakarma through Guna-Siddhantha",
    image: "https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FSpeakers%2FDr.%20Narayanan%20Nambi.webp?alt=media&token=02f55568-6679-4543-949b-d369c80acfff"
  },
  {
    name: "Dr. J. L. N. Sastry",
    role: "Former CEO, NMPB; Advisor To Govt. Bodies",
    topic: "Certified Quality Raw Material: Key Success Tool for Growth",
    image: "https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FSpeakers%2FDr.%20J.%20L.%20N.%20Sastry.webp?alt=media&token=244991a7-9a78-4b3a-bd64-2281e8f4c6d1"
  },
  {
    name: "Dr. Chandrakumar Deshmukh",
    role: "Viddhakarma Agnikarma & ICU Ayurveda Specialist",
    topic: "The Art and Science of Agnikarma & Viddha Karma",
    image: "https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FSpeakers%2FDr%E2%80%AFChandrakumar%20Deshmukh.webp?alt=media&token=eba6f472-6f87-4577-b464-5e2d8b536848"
  },
  {
    name: "Dr. Harsha Simha",
    role: "Associate Professor, IIST",
    topic: "Rediscovering Bharatiya Vidya: IKS for Modern Times",
    image: "https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FSpeakers%2FDr.%20Harsha%20Simha.webp?alt=media&token=62dabb02-1663-439d-b9ce-86df9d3d81fa"
  },
];

export default function SpeakersPage() {
  return (
    <main className="min-h-screen bg-[hsl(91,30%,96%)] selection:bg-[hsl(93,45%,44%)] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-6 py-2 rounded-full border border-slate-200 text-[hsl(93,45%,44%)] font-black text-xs tracking-[0.3em] uppercase mb-8 shadow-sm">
            <Mic2 size={16} /> Keynote Speakers
          </div>
          <h1 className="text-6xl md:text-9xl font-[1000] text-[hsl(93,20%,15%)] uppercase tracking-tighter mb-4">
            Our <span className="text-[hsl(93,45%,44%)] italic">Speakers</span>
          </h1>
          <p className="text-xl font-bold text-[hsl(93,20%,15%)]/40 max-w-2xl mx-auto italic">
            Meet the luminaries bridging the gap between ancient healing and modern scientific rigor.
          </p>
        </div>
      </section>

      {/* 2. SPEAKERS GRID */}
      <section className="container mx-auto px-6 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {speakers.map((speaker, i) => (
            <div 
              key={i} 
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-white shadow-xl shadow-slate-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Image Box */}
              <div className="relative aspect-square overflow-hidden bg-slate-100">
                <Image 
                  src={speaker.image} 
                  alt={speaker.name} 
                  fill 
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(93,20%,15%)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                   <div className="text-white">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#ffa62f] mb-2 flex items-center gap-2">
                        <BookOpen size={12}/> Session Topic
                      </p>
                      <p className="text-sm font-bold leading-tight">{speaker.topic}</p>
                   </div>
                </div>
              </div>

              {/* Content Box */}
              <div className="p-8">
                <h3 className="text-2xl font-black text-[hsl(93,20%,15%)] uppercase leading-tight mb-3 group-hover:text-[hsl(93,45%,44%)] transition-colors">
                  {speaker.name}
                </h3>
                <div className="h-px w-12 bg-[#ffa62f] mb-4" />
                <p className="text-sm font-bold text-slate-500 leading-relaxed italic">
                  {speaker.role}
                </p>
                
                {/* Topic for Mobile (visible without hover) */}
                <div className="mt-6 pt-6 border-t border-slate-50 lg:hidden">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#ffa62f] mb-1">Topic</p>
                  <p className="text-sm font-black text-[hsl(93,20%,15%)]">{speaker.topic}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-32 text-center p-16 rounded-[4rem] bg-[hsl(93,20%,15%)] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[hsl(93,45%,44%)]/20 blur-[100px] rounded-full" />
          <h2 className="text-4xl md:text-5xl font-[1000] uppercase tracking-tighter mb-6">
            Join the <span className="text-[hsl(93,45%,44%)]">Discussion</span>
          </h2>
          <p className="text-lg font-bold opacity-60 mb-10 max-w-xl mx-auto">
            Witness groundbreaking presentations and engage in live Q&A sessions with these global experts.
          </p>
          <button className="bg-[hsl(93,45%,44%)] hover:bg-[#ffa62f] text-white px-12 py-5 rounded-full font-black uppercase tracking-widest transition-all hover:scale-105">
            Register as Delegate
          </button>
        </div>
      </section>
    </main>
  );
}
