'use client';

import React from 'react';
import { 
  Calendar, 
  ChevronRight, 
  Microscope, 
  Stethoscope, 
  FlaskConical, 
  GraduationCap, 
  TrendingUp, 
  HeartPulse, 
  Brain, 
  Rocket,
  CheckCircle2,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const sessions = [
  {
    icon: <Stethoscope size={28} />,
    title: "Integrative Healthcare",
    subtitle: "Bridging AYUSH and Modern Medicine",
    desc: "Exploring collaborative models, clinical integration, and multidisciplinary approaches for holistic and patient-centered care."
  },
  {
    icon: <Microscope size={28} />,
    title: "Advancing AYUSH Research",
    subtitle: "Modern Science & Technology",
    desc: "Focusing on Multi-Omics, AI, Data Analytics, and Model Systems to scientifically validate and innovate within AYUSH."
  },
  {
    icon: <FlaskConical size={28} />,
    title: "Pharmacognosy & Pharmacology",
    subtitle: "Drug Development from Herbs",
    desc: "Harnessing traditional materia medica and natural product research for drug discovery and therapeutic innovations."
  },
  {
    icon: <GraduationCap size={28} />,
    title: "Education & Policy",
    subtitle: "Global Competence",
    desc: "Strengthening curriculum, capacity building, and regulatory frameworks for a globally respected health system."
  },
  {
    icon: <TrendingUp size={28} />,
    title: "Sustainability & Economics",
    subtitle: "Economic Opportunities",
    desc: "Promoting herbal entrepreneurship, nutraceuticals, and AYUSH-based wellness tourism for socio-economic growth."
  },
  {
    icon: <HeartPulse size={28} />,
    title: "Public Health & Lifestyle",
    subtitle: "Preventive Wellness",
    desc: "Integrating traditional systems into national health missions, addressing NCDs, and community-based healthcare."
  },
  {
    icon: <Brain size={28} />,
    title: "Spirituality & Consciousness",
    subtitle: "Mental Well-being",
    desc: "Emphasizing Yoga, Meditation, and Heartfulness practices for enhancing emotional balance and inner harmony."
  },
  {
    icon: <Rocket size={28} />,
    title: "Future of AYUSH",
    subtitle: "Innovation & Global Outreach",
    desc: "Showcasing startups, digital health technologies, and the global impact of India's traditional knowledge systems."
  }
];

export default function ScientificSessionsPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[hsl(93,45%,44%)] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-[hsl(91,30%,96%)]">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full border border-slate-200 text-[hsl(93,45%,44%)] font-black text-[10px] tracking-[0.3em] uppercase mb-8 shadow-sm">
            <Calendar size={14} /> Scientific Program 2026
          </div>
          <h1 className="text-6xl md:text-8xl font-[1000] text-[hsl(93,20%,15%)] uppercase tracking-tighter mb-6 leading-tight">
            Scientific <span className="text-[hsl(93,45%,44%)] italic">Sessions</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold text-[hsl(93,20%,15%)]/60 max-w-4xl mx-auto leading-relaxed italic">
            "Transforming Ayurveda: Through Research, Innovation & Integration"
          </p>
        </div>
      </section>

      {/* 2. CORE THEMES GRID */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sessions.map((session, i) => (
              <div key={i} className="group p-8 rounded-[2.5rem] border border-slate-100 bg-white hover:bg-[hsl(93,20%,15%)] transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-[hsl(93,45%,44%)]/20 hover:-translate-y-2">
                <div className="w-14 h-14 rounded-2xl bg-[hsl(93,45%,44%)]/10 flex items-center justify-center text-[hsl(93,45%,44%)] mb-6 group-hover:bg-[hsl(93,45%,44%)] group-hover:text-white transition-colors">
                  {session.icon}
                </div>
                <h3 className="text-lg font-black text-[hsl(93,20%,15%)] group-hover:text-white uppercase leading-tight mb-1">
                  {session.title}
                </h3>
                <p className="text-[10px] font-black text-[#ffa62f] uppercase tracking-widest mb-4">
                  {session.subtitle}
                </p>
                <p className="text-sm font-bold text-slate-400 group-hover:text-white/60 leading-relaxed">
                  {session.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY THESE AREAS & BENEFITS */}
      <section className="py-24 bg-[hsl(93,20%,15%)] text-white overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 leading-tight">
                Strategic <span className="text-[hsl(93,45%,44%)] italic">Exploration</span>
              </h2>
              <p className="text-lg font-medium text-white/60 mb-10 leading-relaxed">
                These eight thematic areas reflect the most promising intersections between contemporary science and Ayurvedic principles, supporting innovation in diagnostics, therapeutics, and education.
              </p>
              <div className="space-y-4">
                {["Encourage evidence-based exploration", "Support diagnostic innovation", "Promote mainstream integration", "Foster global collaboration"].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                    <CheckCircle2 className="text-[hsl(93,45%,44%)]" size={20} />
                    <span className="text-sm font-black uppercase tracking-widest">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[3.5rem] p-10 md:p-14 text-[hsl(93,20%,15%)]">
              <div className="flex items-center gap-4 mb-8">
                <Users className="text-[hsl(93,45%,44%)]" size={32} />
                <h3 className="text-3xl font-black uppercase tracking-tighter">Who will Benefit?</h3>
              </div>
              <div className="space-y-8">
                {[
                  { role: "Researchers", text: "Gain exposure to translational frameworks." },
                  { role: "Clinicians", text: "Discover tools for diagnostic accuracy." },
                  { role: "Students", text: "Learn about new frontiers in integrative health." },
                  { role: "Policy Makers", text: "Understand standardization & global integration." }
                ].map((item, i) => (
                  <div key={i} className="border-b border-slate-100 pb-4 last:border-0">
                    <h4 className="font-black uppercase text-[hsl(93,45%,44%)] text-xs mb-1">{item.role}</h4>
                    <p className="text-sm font-bold text-slate-500">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-[hsl(91,30%,96%)] p-12 md:p-24 rounded-[4rem] text-center border border-white shadow-2xl relative">
             <div className="absolute top-0 right-0 p-12 opacity-5 scale-150">
               <Rocket size={200} />
             </div>
             
            <h2 className="text-4xl md:text-7xl font-[1000] text-[hsl(93,20%,15%)] uppercase tracking-tighter mb-8 leading-none">
              Be Part of the <br/><span className="text-[hsl(93,45%,44%)]">Movement</span>
            </h2>
            <p className="text-lg md:text-xl font-bold text-slate-500 max-w-2xl mx-auto mb-12 italic">
              AyushConclave – 2026 is more than a conference. It’s a global transformation of Ayurveda. Don’t miss this rare opportunity to engage in cross-disciplinary dialogue.
            </p>
            <Button size="lg" className="h-20 px-16 rounded-full bg-[hsl(93,45%,44%)] text-white font-black hover:scale-105 transition-all text-xl shadow-2xl shadow-[hsl(93,45%,44%)]/30 group">
              Register for Sessions <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

    </main>
  );
}
