'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowLeft, Calendar, MapPin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AyushThankYouPage() {
  return (
    <main className="min-h-screen bg-[#f5f2eb] flex items-center justify-center p-6 font-sans">
      
      {/* Hide global header/footer to maintain the landing page feel */}
      <style dangerouslySetInnerHTML={{ __html: `
        header, footer, nav, [data-testid="global-header"], [data-testid="global-footer"] { 
          display: none !important; 
        }
      `}} />

      <div className="max-w-2xl w-full bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-slate-100 text-center space-y-8 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2c5340]/5 rounded-full blur-[80px] -z-10 pointer-events-none" />

        <div className="w-24 h-24 bg-[#2c5340]/10 text-[#2c5340] rounded-full flex items-center justify-center mx-auto animate-bounce shadow-sm">
          <CheckCircle2 size={48} />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">
            Registration <span className="text-[#c4643c]">Successful!</span>
          </h1>
          <p className="text-lg text-slate-600 font-medium">
            Thank you for registering for the <strong className="text-[#2c5340]">World Ayurveda Congress Satellite Seminar</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8 border-y border-slate-100">
          <div className="flex items-center justify-center gap-3 text-slate-700">
            <Calendar className="text-[#c4643c]" size={20} />
            <span className="font-bold">21-NOV-2026</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-slate-700">
            <MapPin className="text-[#c4643c]" size={20} />
            <span className="font-bold">Casa de gomez pondy</span>
          </div>
        </div>

        <div className="bg-[#2c5340]/5 p-6 rounded-2xl flex items-center gap-4 text-left border border-[#2c5340]/10">
          <Mail className="text-[#2c5340] shrink-0" size={24} />
          <p className="text-sm font-medium text-slate-700">
            A confirmation email has been sent to your registered email address. Please check your inbox (and spam folder) for further details.
          </p>
        </div>

        <div className="pt-8">
          <Button asChild className="h-14 px-8 rounded-full bg-[#2c5340] text-white font-bold hover:bg-[#1a3528] transition-all shadow-md hover:shadow-lg">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Homepage
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}