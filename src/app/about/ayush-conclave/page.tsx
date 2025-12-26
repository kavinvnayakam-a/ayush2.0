'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Microscope, Dna, BrainCircuit, Lightbulb, Users, ArrowRight, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AyushConclavePage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[hsl(93,45%,44%)] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-5%] left-[-5%] w-[60%] h-[60%] bg-[hsl(93,45%,44%)]/5 blur-[120px] rounded-full animate-float" />
          <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] bg-[#ffa62f]/5 blur-[100px] rounded-full animate-float [animation-duration:25s]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <Image 
            src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FArogya%202026%20logo.webp?alt=media&token=0ee2306d-e44e-4c15-b748-69491434e0f5" 
            alt="Ayush Conclave Logo" 
            width={240} 
            height={80} 
            className="mx-auto mb-12 object-contain"
          />
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-6 py-2 rounded-full border border-slate-200 text-[hsl(93,45%,44%)] font-black text-xs tracking-[0.3em] uppercase mb-8 shadow-sm">
            <Sparkles size={16} /> Research • Innovation • Integration
          </div>
          <h1 className="text-5xl md:text-8xl font-[1000] text-[hsl(93,20%,15%)] uppercase tracking-tighter mb-6 leading-none">
            International <br/>
            <span className="text-[hsl(93,45%,44%)] italic font-black">Ayush Conclave</span>
          </h1>
          <p className="text-lg md:text-2xl font-bold text-[hsl(93,20%,15%)]/50 max-w-3xl mx-auto leading-relaxed">
            "Transforming Ayurveda: Through Research, Innovation & Integration"
          </p>
        </div>
      </section>

      {/* 2. THE LANDMARK VISION */}
      <section className="pb-32 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-[hsl(91,30%,96%)] p-8 md:p-12 rounded-[3.5rem] border border-white shadow-xl shadow-[hsl(93,45%,44%)]/5">
                <p className="text-xl md:text-2xl text-[hsl(93,20%,15%)] font-bold leading-relaxed mb-6">
                  National AyushConclave – 2026 is proud to present the inaugural edition of what promises to become a premier global forum for advancing Ayurvedic sciences.
                </p>
                <div className="space-y-6 text-lg text-[hsl(93,20%,15%)]/70 font-medium leading-relaxed">
                  <p>
                    This landmark international conference aims to create a dynamic platform where scientists, clinicians, academicians, and industry leaders can converge to explore new frontiers in Ayurveda.
                  </p>
                  <p>
                    We seek to foster meaningful dialogue between traditional Ayurvedic knowledge and contemporary scientific methodologies, highlighting how emerging technologies are helping to validate and scale Ayurvedic principles for the 21st century.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Pillars */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-4">
              {[
                { icon: <BrainCircuit />, title: "Bioinformatics & AI", text: "Scaling principles through advanced diagnostics." },
                { icon: <Dna />, title: "Microbiome Science", text: "Validating ancient wisdom with systems biology." },
                { icon: <Microscope />, title: "Clinical Research", text: "Evidence-based approaches for global recognition." },
                { icon: <FlaskConical />, title: "Drug Development", text: "Standardizing herbal formulations for modern use." }
              ].map((pillar, i) => (
                <div key={i} className="flex items-center gap-6 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md group">
                  <div className="w-14 h-14 rounded-2xl bg-[hsl(93,45%,44%)]/10 flex items-center justify-center text-[hsl(93,45%,44%)] group-hover:bg-[hsl(93,45%,44%)] group-hover:text-white transition-colors">
                    {pillar.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-[hsl(93,20%,15%)] uppercase text-sm tracking-tight">{pillar.title}</h4>
                    <p className="text-xs font-bold text-[hsl(93,20%,15%)]/40 italic">{pillar.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERDISCIPLINARY COLLABORATION */}
      <section className="py-24 bg-[hsl(93,20%,15%)] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(93,45%,44%)]/20 blur-[100px] rounded-full" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-[1000] uppercase tracking-tighter mb-10 leading-none">
              Interdisciplinary <br/><span className="text-[hsl(93,45%,44%)] italic">Collaboration</span>
            </h2>
            <p className="text-xl md:text-2xl font-medium text-white/70 leading-relaxed mb-12">
              The conference will emphasize collaboration across diverse domains including basic research, personalized medicine, and education in integrative health sciences.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4 p-6 rounded-[2rem] bg-white/5 border border-white/10">
                <Users className="text-[#ffa62f] shrink-0" />
                <span className="text-sm font-bold uppercase tracking-widest text-white/80">Mainstream Healthcare Integration</span>
              </div>
              <div className="flex gap-4 p-6 rounded-[2rem] bg-white/5 border border-white/10">
                <Lightbulb className="text-[#ffa62f] shrink-0" />
                <span className="text-sm font-bold uppercase tracking-widest text-white/80">Innovative Best Practices</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE CALL TO JOURNEY */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-3xl md:text-5xl font-black text-[hsl(93,20%,15%)] uppercase tracking-tight">
              A Unique Opportunity for <span className="text-[hsl(93,45%,44%)] underline decoration-[#ffa62f] decoration-4">Stakeholders</span>
            </h2>
            <p className="text-lg md:text-xl font-bold text-[hsl(93,20%,15%)]/60 leading-relaxed italic">
              Whether you are a researcher, practitioner, student, or stakeholder in the healthcare industry, National AyushConclave – 2026 offers a unique opportunity to engage with cutting-edge developments.
            </p>
            <div className="pt-12">
              <p className="text-2xl font-black text-[hsl(93,20%,15%)] uppercase tracking-[0.2em] mb-8">
                Ancient Healing meets Modern Science
              </p>
              <Button size="lg" className="h-20 px-16 rounded-full bg-[hsl(93,45%,44%)] text-white font-black hover:scale-105 transition-all text-xl shadow-2xl shadow-[hsl(93,45%,44%)]/30 group">
                Register as a Delegate <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
