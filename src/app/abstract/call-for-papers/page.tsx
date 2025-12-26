'use client';

import React from 'react';
import { 
  FileText, 
  GraduationCap, 
  BookOpen, 
  Stethoscope, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  Send,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CallForPapersPage() {
  return (
    <main className="min-h-screen bg-[hsl(91,30%,96%)] selection:bg-[hsl(93,45%,44%)] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[hsl(93,45%,44%)]/5 blur-[120px] rounded-full animate-float" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ffa62f]/5 blur-[100px] rounded-full animate-float [animation-duration:15s]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full border border-slate-200 text-[hsl(93,45%,44%)] font-black text-xs tracking-[0.3em] uppercase mb-8 shadow-sm">
            <FileText size={16} /> Academic Submissions
          </div>
          <h1 className="text-6xl md:text-8xl font-[1000] text-[hsl(93,20%,15%)] uppercase tracking-tighter mb-6">
            Call for <span className="text-[hsl(93,45%,44%)] italic font-black">Papers</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold text-[hsl(93,20%,15%)]/60 max-w-4xl mx-auto leading-relaxed">
            Share Your Research, Insights & Innovations at <br/>
            <span className="text-[hsl(93,20%,15%)]">National AyushConclave – 2026</span>
          </p>
        </div>
      </section>

      {/* 2. SUBMISSION CATEGORIES */}
      <section className="pb-32 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* UG Category */}
          <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col group hover:border-[hsl(93,45%,44%)]/30 transition-all">
            <div className="w-16 h-16 bg-[hsl(93,45%,44%)]/10 rounded-2xl flex items-center justify-center text-[hsl(93,45%,44%)] mb-8">
              <GraduationCap size={32} />
            </div>
            <h3 className="text-2xl font-black text-[hsl(93,20%,15%)] uppercase tracking-tight mb-4">UG Student <br/>Presentations</h3>
            <p className="text-sm font-bold text-slate-500 mb-8 leading-relaxed">Encouraging undergraduates to explore integrative approaches and contemporary applications.</p>
            
            <div className="space-y-3 mt-auto">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Core Topics</h4>
              {["Integrative Healthcare", "Herbal Drug Dev", "Sustainability in Ayush", "Public Health & Wellness"].map((t) => (
                <div key={t} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ffa62f]" /> {t}
                </div>
              ))}
            </div>
          </div>

          {/* PG / PhD Category */}
          <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col group hover:border-[hsl(93,45%,44%)]/30 transition-all">
            <div className="w-16 h-16 bg-[#ffa62f]/10 rounded-2xl flex items-center justify-center text-[#ffa62f] mb-8">
              <BookOpen size={32} />
            </div>
            <h3 className="text-2xl font-black text-[hsl(93,20%,15%)] uppercase tracking-tight mb-4">PG / Ph.D. <br/>Presentations</h3>
            <p className="text-sm font-bold text-slate-500 mb-8 leading-relaxed">For doctoral scholars presenting high-quality research across diverse domains of Ayurveda.</p>
            
            <div className="space-y-3 mt-auto">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Core Topics</h4>
              {["Basic Medical Sciences", "Clinical Case Studies", "Shalya Tantra", "Regulatory Affairs"].map((t) => (
                <div key={t} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-[hsl(93,45%,44%)]" /> {t}
                </div>
              ))}
            </div>
          </div>

          {/* Practitioner Category */}
          <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col group hover:border-[hsl(93,45%,44%)]/30 transition-all">
            <div className="w-16 h-16 bg-[hsl(93,20%,15%)]/10 rounded-2xl flex items-center justify-center text-[hsl(93,20%,15%)] mb-8">
              <Stethoscope size={32} />
            </div>
            <h3 className="text-2xl font-black text-[hsl(93,20%,15%)] uppercase tracking-tight mb-4">Practitioner / <br/>Academician</h3>
            <p className="text-sm font-bold text-slate-500 mb-8 leading-relaxed">Dedicated to sharing real-world experiences, clinical insights, and innovative practices.</p>
            
            <div className="space-y-3 mt-auto">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Core Topics</h4>
              {["Clinical Innovations", "Practice Insights", "Integrative Models", "Evidence-based Sharing"].map((t) => (
                <div key={t} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300" /> {t}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. GUIDELINES SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[hsl(93,20%,15%)] uppercase tracking-tight mb-10">
                Submission <br/><span className="text-[hsl(93,45%,44%)] italic">Guidelines</span>
              </h2>
              <div className="space-y-6">
                {[
                  "Abstracts must be submitted in English",
                  "Word limit: 250–300 words",
                  "Font: Times New Roman, Size: 12, Spacing: 1.5",
                  "Keywords: Include 5 to 6 relevant keywords",
                  "Structured abstracts: (Objective, Methods, Results, Conclusion)",
                  "Authors must indicate category during submission"
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-[hsl(91,30%,96%)] border border-white">
                    <CheckCircle className="text-[hsl(93,45%,44%)] shrink-0 mt-0.5" size={20} />
                    <span className="text-sm font-bold text-slate-700 uppercase tracking-tight">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[hsl(93,20%,15%)] text-white p-10 md:p-14 rounded-[3.5rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Send size={120} />
              </div>
              <h3 className="text-3xl font-black uppercase mb-8 leading-tight">Why Submit <br/>Your Work?</h3>
              <ul className="space-y-8">
                {[
                  "Present your work to an international audience",
                  "Gain recognition through official certificates",
                  "Network with industry & policymakers",
                  "Contribute to building an evidence-based narrative"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[hsl(93,45%,44%)] flex items-center justify-center text-xs font-black italic">
                      {i + 1}
                    </div>
                    <p className="text-lg font-bold opacity-80">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA / HOW TO SUBMIT */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-white border border-slate-100 p-10 md:p-20 rounded-[4rem] shadow-2xl shadow-slate-200 text-center relative">
            <div className="absolute top-10 left-10 text-[hsl(93,45%,44%)]/10">
              <Info size={100} />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-[1000] text-[hsl(93,20%,15%)] uppercase tracking-tighter mb-8">
              Ready to Share <br/>Your <span className="text-[hsl(93,45%,44%)]">Research?</span>
            </h2>
            
            <div className="flex flex-col items-center gap-6 mb-12">
               <div className="flex items-center gap-3 bg-red-50 text-red-600 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest border border-red-100">
                <AlertCircle size={14} /> Only registered participants can present
              </div>
              <p className="text-slate-500 font-bold max-w-2xl leading-relaxed">
                Please note that you must <span className="text-[hsl(93,20%,15%)] font-black">sign in using your registered email address</span> to access the Abstract form. Navigate to Abstract → Abstract Submissions to begin.
              </p>
            </div>

            <Button size="lg" className="h-20 px-16 rounded-full bg-[hsl(93,45%,44%)] text-white font-black hover:scale-105 transition-all text-xl shadow-2xl shadow-[hsl(93,45%,44%)]/30 group">
              Submit Your Abstract <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
            </Button>
            
            <p className="mt-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
              Submit your work before the deadline to be considered for oral presentation
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
