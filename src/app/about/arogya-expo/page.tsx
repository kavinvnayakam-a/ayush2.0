'use client';

import React from 'react';
import { Sparkles, BarChart3, Globe2, Lightbulb, Users2, ShieldCheck, Microscope, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Arogya Expo 2026 | National Ayush Conclave',
    description: 'Explore the Arogya Expo 2026, a parallel event to the Ayush Conclave in Chennai. Discover 100+ stalls on Ayurvedic medicines, wellness tech, and holistic health products.',
    keywords: ['Arogya Expo', 'Arogya Expo 2026', 'Ayurveda Exhibition', 'Wellness Expo Chennai', 'Holistic Health Fair', 'Ministry of Ayush'],
};


export default function ArogyaExpoPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[hsl(93,45%,44%)] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] bg-[hsl(93,45%,44%)]/10 blur-[120px] rounded-full animate-float" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#ffa62f]/10 blur-[100px] rounded-full animate-float [animation-duration:20s]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[hsl(93,45%,44%)]/5 backdrop-blur-md px-6 py-2.5 rounded-full border border-[hsl(93,45%,44%)]/10 text-[hsl(93,45%,44%)] font-black text-xs tracking-[0.3em] uppercase mb-8 shadow-sm">
            <Sparkles size={16} /> Experiential & Evolutionary
          </div>
          <h1 className="text-6xl md:text-9xl font-[1000] text-[hsl(93,20%,15%)] uppercase tracking-tighter mb-6">
            Arogya <span className="text-[hsl(93,45%,44%)] italic">Expo</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold text-[hsl(93,20%,15%)]/60 max-w-5xl mx-auto leading-relaxed italic">
            "A moment for ancient wisdom and modern innovation to enhance personal and planetary well-being."
          </p>
        </div>
      </section>

      {/* 2. INTRODUCTION & FEATURES */}
      <section className="pb-24 px-6">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-xl shadow-[hsl(93,45%,44%)]/5">
              <p className="text-lg md:text-xl text-[hsl(93,20%,15%)]/70 font-medium leading-relaxed mb-8">
                <span className="text-[hsl(93,45%,44%)] font-black">Arogya Fair - 2026</span> is an immersive and inclusive exhibition that brings together the worlds of traditional healing, modern wellness, and sustainable living. As a parallel event to AyushConclave - 2026, it serves as a dynamic platform for industry leaders, practitioners, entrepreneurs, researchers, and wellness enthusiasts to connect, collaborate, and celebrate the transformative power of Ayurveda and holistic health.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <h3 className="col-span-full text-2xl font-black text-[hsl(93,20%,15%)] uppercase tracking-tight flex items-center gap-3">
                  <div className="w-10 h-1 bg-[#ffa62f] rounded-full" />
                  Featuring Over 100+ Stalls
                </h3>
                {[
                  "Ayurvedic medicines & nutraceuticals",
                  "Organic & herbal lifestyle products",
                  "Panchakarma, yoga & naturopathy",
                  "Innovative startups & wellness tech",
                  "Educational & training programs",
                  "Government & regulatory bodies"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-[hsl(91,30%,96%)] border border-white">
                    <CheckCircle2 className="text-[hsl(93,45%,44%)] shrink-0" size={20} />
                    <span className="text-sm font-bold text-[hsl(93,20%,15%)]/80 uppercase tracking-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <p className="text-[hsl(93,20%,15%)]/70 font-medium leading-relaxed">
                This fair is not only a marketplace but also a learning and engagement hub, offering live demonstrations, interactive sessions, product launches, and expert consultations. Whether you're a delegate, a member of the general public, or a wellness stakeholder, <strong>Arogya Fair – 2026</strong> promises something for everyone.
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-xl font-black text-[hsl(93,45%,44%)] uppercase tracking-widest mb-4">
                Don’t miss this celebration of health, nature, and tradition
              </p>
              <p className="text-lg font-bold text-[hsl(93,20%,15%)]/40 italic">
                Join us at Arogya Fair – 2026 to be inspired, informed, and transformed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE STRATEGIC OPPORTUNITY */}
      <section className="py-24 bg-[hsl(91,30%,96%)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-[hsl(93,20%,15%)] leading-none uppercase">
                A Strategic <br/><span className="text-[#ffa62f]">Opportunity</span>
              </h2>
              <div className="space-y-6 text-lg font-medium text-[hsl(93,20%,15%)]/70">
                <p>
                  India’s wellness economy is projected to hit <span className="text-[hsl(93,20%,15%)] font-black italic underline decoration-[#ffa62f]">USD 72B by 2025</span>. 
                  Yet, AYUSH systems and Allopathy serve the same patient but rarely speak.
                </p>
                <p>
                  Arogya Expo is the neutral table where these systems meet. It is the first-ever platform to present traditional wisdom alongside modern analytics and diagnostics.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Globe2 />, title: "Global Scale", text: "Attracting overseas stakeholders and interests." },
                { icon: <BarChart3 />, title: "Market Growth", text: "Making traditional health scalable and investable." },
                { icon: <ShieldCheck />, title: "Credible Truth", text: "A single narrative backed by national institutions." },
                { icon: <Lightbulb />, title: "Innovation", text: "Ayurveda beside analytics. Yoga beside diagnostics." }
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 transition-transform hover:-translate-y-2">
                  <div className="text-[hsl(93,45%,44%)] mb-4">{item.icon}</div>
                  <h4 className="font-black text-[hsl(93,20%,15%)] uppercase text-sm mb-2">{item.title}</h4>
                  <p className="text-xs font-bold text-[hsl(93,20%,15%)]/50 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHO IS IT BUILT FOR? */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-[1000] text-[hsl(93,20%,15%)] uppercase tracking-tighter">
              Who is it <span className="text-[hsl(93,45%,44%)] italic">Built For?</span>
            </h2>
            <div className="w-24 h-2 bg-[#ffa62f] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Ayush Practitioners", desc: "To showcase expertise, network, and explore innovations in practice." },
              { title: "Pharma Companies", desc: "To launch products, meet suppliers, and connect with global buyers." },
              { title: "Wellness Centers", desc: "Promote Panchakarma, Yoga, Naturopathy, and holistic services." },
              { title: "Research & Academia", desc: "To present findings, collaborate, and explore partnerships." },
              { title: "Govt & Regulatory", desc: "Promote policies, standards, and integrative initiatives." },
              { title: "Foreign Investors", desc: "Explore market opportunities in India's booming wellness sector." },
              { title: "Startups & Tech", desc: "Showcase tools, apps, and technologies enhancing delivery." },
              { title: "Retailers & Media", desc: "Source new products and spread awareness of holistic trends." },
              { title: "General Public", desc: "Explore holistic health solutions and attend live consultations." }
            ].map((item, i) => (
              <div key={i} className="group p-8 rounded-[2rem] border border-slate-100 bg-white hover:bg-[hsl(93,45%,44%)] transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-[hsl(93,45%,44%)]/20">
                <h4 className="text-xl font-black text-[hsl(93,20%,15%)] group-hover:text-white transition-colors uppercase mb-3">
                  {item.title}
                </h4>
                <p className="text-sm font-bold text-[hsl(93,20%,15%)]/50 group-hover:text-white/80 transition-colors leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ENGAGEMENT, EXPERIENCE, EVOLUTION */}
      <section className="py-32 bg-[hsl(91,30%,96%)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            <div className="bg-white p-10 rounded-[3rem] space-y-6 shadow-sm">
              <div className="w-16 h-16 bg-[hsl(93,45%,44%)]/10 rounded-2xl flex items-center justify-center text-[hsl(93,45%,44%)]">
                <Users2 size={32} />
              </div>
              <h3 className="text-3xl font-black uppercase text-[hsl(93,20%,15%)] tracking-tighter leading-none">Engagement</h3>
              <p className="text-base font-bold text-[hsl(93,20%,15%)]/60 leading-relaxed italic">
                "Interaction with thought leaders and public discourse. A spark is all it takes to ignite your ideas and convert them into success."
              </p>
            </div>

            <div className="bg-white p-10 rounded-[3rem] space-y-6 shadow-sm">
              <div className="w-16 h-16 bg-[#ffa62f]/10 rounded-2xl flex items-center justify-center text-[#ffa62f]">
                <Microscope size={32} />
              </div>
              <h3 className="text-3xl font-black uppercase text-[hsl(93,20%,15%)] tracking-tighter leading-none">Experience</h3>
              <p className="text-base font-bold text-[hsl(93,20%,15%)]/60 leading-relaxed italic">
                "Technology for traditional systems. Sourcing for or contributing to foundations that reshape and transform this world."
              </p>
            </div>

            <div className="bg-white p-10 rounded-[3rem] space-y-6 shadow-sm">
              <div className="w-16 h-16 bg-[hsl(93,20%,15%)]/10 rounded-2xl flex items-center justify-center text-[hsl(93,20%,15%)]">
                <Compass size={32} />
              </div>
              <h3 className="text-3xl font-black uppercase text-[hsl(93,20%,15%)] tracking-tighter leading-none">Evolution</h3>
              <p className="text-base font-bold text-[hsl(93,20%,15%)]/60 leading-relaxed italic">
                "Partnership between systems and expanding knowledge to reach integrated healthcare for patients."
              </p>
            </div>

          </div>

          {/* FINAL CTA */}
          <div className="mt-32 p-12 md:p-20 rounded-[4rem] bg-white text-center border border-slate-100 shadow-2xl relative overflow-hidden">
            <h2 className="text-4xl md:text-6xl font-[1000] text-[hsl(93,20%,15%)] uppercase mb-8">
              Register for <span className="text-[hsl(93,45%,44%)]">Arogya Expo</span>
            </h2>
            <Button size="lg" className="h-20 px-16 rounded-full bg-[hsl(93,45%,44%)] text-white font-black hover:scale-105 transition-all text-xl shadow-2xl shadow-[hsl(93,45%,44%)]/30 group">
              Register Now <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
            </Button>
          </div>
        </div>
      </section>

    </main>
  );
}
