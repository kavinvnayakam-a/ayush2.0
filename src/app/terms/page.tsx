'use client';

import React, { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';

export default function TermsOfUsePage() {
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    // Set date only on the client to avoid hydration mismatch
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-[hsl(93,45%,44%)] selection:text-white">
      <div className="container mx-auto px-6 py-32 md:py-40">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white border shadow-sm mb-6">
                <FileText className="w-10 h-10 text-[hsl(93,45%,44%)]" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-[hsl(93,20%,15%)] uppercase tracking-tighter">
              Terms of Use
            </h1>
            <p className="text-lg text-slate-500 font-bold mt-2">Last updated: {currentDate || '...'}</p>
          </div>

          <div className="prose prose-lg max-w-none bg-white p-8 md:p-12 rounded-3xl border shadow-xl shadow-slate-100">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing our website and registering for the National Ayush Conclave 2026, you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, you are prohibited from using or accessing this site.
            </p>

            <h2>2. Registration</h2>
            <p>
              When you register for the event, you agree to provide information that is accurate, complete, and current. All registrations are subject to acceptance by the event organizers. Registration fees are non-refundable unless otherwise stated.
            </p>

            <h2>3. Intellectual Property</h2>
            <p>
              The Site and its original content, features, and functionality are owned by the event organizers and are protected by international copyright, trademark, and other intellectual property laws.
            </p>

            <h2>4. User Conduct</h2>
            <p>
              You agree not to use the website for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the Site in any way that could damage the Site, the services, or the general business of the National Ayush Conclave.
            </p>
            
            <h2>5. Limitation of Liability</h2>
            <p>
              In no event shall the organizers of the National Ayush Conclave, nor its partners, be liable for any indirect, incidental, or consequential damages.
            </p>

            <h2>6. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new Terms of Use on this page.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
