'use client';

import React, { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
                <ShieldCheck className="w-10 h-10 text-[hsl(93,45%,44%)]" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-[hsl(93,20%,15%)] uppercase tracking-tighter">
              Privacy Policy
            </h1>
            <p className="text-lg text-slate-500 font-bold mt-2">Last updated: {currentDate || '...'}</p>
          </div>

          <div className="prose prose-lg max-w-none bg-white p-8 md:p-12 rounded-3xl border shadow-xl shadow-slate-100">
            <p>
              Welcome to the National Ayush Conclave 2026. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and register for our event.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We may collect personal information from you in a variety of ways, including when you register for the event, subscribe to our newsletter, or fill out a form. The information we may collect includes:
            </p>
            <ul>
              <li><strong>Personal Data:</strong> Name, email address, phone number, location, and professional details.</li>
              <li><strong>Derivative Data:</strong> Information our servers automatically collect, such as your IP address, browser type, and operating system.</li>
            </ul>

            <h2>Use of Your Information</h2>
            <p>
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul>
              <li>Manage your registration and participation in the AyushConclave.</li>
              <li>Email you with updates, security alerts, and support messages.</li>
              <li>Analyze usage to improve our website and event offerings.</li>
              <li>Comply with legal and regulatory requirements.</li>
            </ul>

            <h2>Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at helpdesk@arogyaayurconclave.org.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
