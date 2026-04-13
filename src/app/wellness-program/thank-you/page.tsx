'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowLeft, Calendar, MapPin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WellnessThankYouPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 pt-32">
      <div className="max-w-2xl w-full bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl text-center space-y-8">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
          <CheckCircle2 size={48} />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">Registration <span className="text-[hsl(93,45%,44%)]">Successful!</span></h1>
          <p className="text-lg text-slate-500 font-bold italic">Thank you for registering for the Corporate Wellness Program.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8 border-y border-slate-100">
          <div className="flex items-center justify-center gap-3 text-slate-600">
            <Calendar className="text-[hsl(93,45%,44%)]" size={20} />
            <span className="font-bold">April 19, 2026</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-slate-600">
            <MapPin className="text-[hsl(93,45%,44%)]" size={20} />
            <span className="font-bold">Babuji Memorial Ashram</span>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-2xl flex items-center gap-4 text-left border border-blue-100">
          <Mail className="text-blue-500 shrink-0" />
          <p className="text-sm font-bold text-blue-700">A confirmation email has been sent to your registered mail ID. Please check your inbox (and spam folder) for further details.</p>
        </div>

        <div className="pt-8">
          <Button asChild className="h-14 px-8 rounded-full bg-slate-900 text-white font-bold hover:bg-[hsl(93,45%,44%)] transition-all">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Homepage
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
