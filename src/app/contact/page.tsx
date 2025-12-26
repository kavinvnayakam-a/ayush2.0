'use client';

import React from 'react';
import { Phone, Mail, MapPin, Users, MessageSquare, HeartHandshake, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const COORDINATORS = [
  {
    region: "Telangana & Andhra Pradesh",
    contacts: [
      { name: "DR. G. Ramachandra Reddy", role: "Chief Superintendent GOVT Pharmacy, Katedan", phone: "+91 88855 58685" },
      { name: "DR. Bargav", role: "Basava Ayurveda, Kakinada", phone: "+91 96664 50555" },
      { name: "Dr. Bhanu Prakash", role: "Director – IMPCOPS, GEN. SEC, CHAI", phone: "+91 99122 61434" }
    ]
  },
  {
    region: "Gujarat",
    contacts: [
      { name: "Dr. Vidhi Bafna", role: "Nadiad J.S. Ayurveda Mahavidhyalay", phone: "+91 94289 72618" },
      { name: "Dr. Riddhi Mehta", role: "Sardar Ayurved College, Piludara, Mehsana", phone: "+91 81287 93124" }
    ]
  },
  {
    region: "Haryana & Punjab",
    contacts: [
      { name: "Vd. Rajguru Saggu", email: "rajgurusaggu@gmail.com", phone: "+91 89302 75372" },
      { name: "Vd. Poonam Kausha", email: "poonamkaushal82@gmail.com", phone: "+91 96690 34497" }
    ]
  },
  {
    region: "Karnataka",
    contacts: [
      { name: "Dr. Sanjeev Reddy", role: "Principal Shri Bidarur Institute Ayurveda, Gadag", phone: "+91 99867 76372" },
      { name: "Dr. Sharon Samuel", role: "Bengaluru", phone: "+91 97406 32050" },
      { name: "Dr. Brahmanada Nayak MD", role: "Ayurvedism, Bengaluru", phone: "+91 96111 01855" }
    ]
  },
  {
    region: "Kerala & Maharashtra",
    contacts: [
      { name: "Dr. Purushotthaman", role: "Medical Superintendent, Ashtanga Ayurveda", phone: "+91 90486 13096" },
      { name: "Dr. Nitin Chandurkar", role: "Maharashtra Coordinator", phone: "+91 94210 19864" }
    ]
  },
  {
    region: "Uttar Pradesh & MP",
    contacts: [
      { name: "Dr. Ashutosh Pande", role: "UP, NASYA", phone: "+91 86007 59488" },
      { name: "Dr. Chandramouli Yadav", role: "MP Coordinator", phone: "+91 89629 33131" }
    ]
  },
  {
    region: "Pondicherry",
    contacts: [
      { name: "Dr. Raman", role: "AMO, Govt. of Pondicherry", phone: "+91 94437 90356" },
      { name: "Dr. B.B. Kannan", role: "CMO Santhigiri Hospital", phone: "+91 99629 98209" }
    ]
  },
  {
    region: "West Bengal",
    contacts: [
      { name: "Dr. Tushar Kanti Manda", email: "drmandaltk@gmail.com", phone: "+91 94347 37577" },
      { name: "Dr. Sumit Sur", email: "sumitsur96@gmail.com", phone: "+91 90511 56639" }
    ]
  }
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[hsl(93,45%,44%)] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="pt-40 pb-20 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full border border-slate-200 text-[hsl(93,45%,44%)] font-black text-[10px] tracking-[0.3em] uppercase mb-8 shadow-sm">
              <Users size={14} /> Official Directory
            </div>
            <h1 className="text-6xl md:text-8xl font-[1000] text-[hsl(93,20%,15%)] uppercase tracking-tighter mb-6 leading-none">
              Get in <span className="text-[hsl(93,45%,44%)] italic">Touch</span>
            </h1>
            <p className="text-xl font-bold text-slate-400 italic max-w-2xl leading-relaxed">
              Our national network of coordinators is ready to assist you. Reach out for registration, accommodation, or regional support.
            </p>
          </div>
        </div>
      </section>

      {/* 2. TOP HELPLINE CARDS */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          
          {/* Main Helpline - Updated White/Green Theme */}
          <div className="p-10 bg-white rounded-[3.5rem] border-4 border-[hsl(93,45%,44%)] shadow-2xl relative overflow-hidden group">
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[hsl(93,45%,44%)] rounded-xl flex items-center justify-center text-white">
                        <Phone size={20} />
                    </div>
                    <h4 className="text-[hsl(93,20%,15%)] text-xs font-black uppercase tracking-[0.2em]">General Enquiries</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    {["+91 95855 67891", "+91 88388 74918", "+91 80728 46645"].map((num) => (
                        <a key={num} href={`tel:${num.replace(/\s/g, '')}`} className="text-3xl md:text-4xl font-black text-[hsl(93,20%,15%)] hover:text-[hsl(93,45%,44%)] transition-colors tracking-tighter">
                            {num}
                        </a>
                    ))}
                </div>
             </div>
             <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                <MessageSquare size={180} />
             </div>
          </div>

          {/* Accommodations - Signature Green Theme */}
          <div className="p-10 bg-[hsl(93,45%,44%)] text-white rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                        <ShieldCheck size={20} />
                    </div>
                    <h4 className="text-white/70 text-xs font-black uppercase tracking-[0.2em]">Accommodations Support</h4>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#ffa62f] mb-2">Coordinator: Jayakar</p>
                <a href="tel:+917904595671" className="text-4xl md:text-6xl font-black tracking-tighter hover:text-[#ffa62f] transition-colors">
                    +91 79045 95671
                </a>
                <p className="mt-8 text-sm font-bold opacity-70 italic">Reach out for stay arrangements and venue lodging queries.</p>
             </div>
             <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <MapPin size={240} />
             </div>
          </div>
        </div>

        {/* 3. COORDINATORS DIRECTORY */}
        <div className="mb-12">
            <h3 className="text-xs font-black text-[#ffa62f] uppercase tracking-[0.4em] mb-12 text-center">State-wise Coordinators</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {COORDINATORS.map((group, idx) => (
                <div key={idx} className="space-y-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-4">
                    <div className="w-2 h-2 rounded-full bg-[hsl(93,45%,44%)]" />
                    <h3 className="text-xl font-black uppercase tracking-tight text-[hsl(93,20%,15%)]">{group.region}</h3>
                </div>
                <div className="space-y-6">
                    {group.contacts.map((contact, cIdx) => (
                    <div key={cIdx} className="group p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:border-[hsl(93,45%,44%)] hover:shadow-xl transition-all duration-500">
                        <h4 className="font-black text-lg text-[hsl(93,20%,15%)] uppercase leading-tight mb-1 group-hover:text-[hsl(93,45%,44%)] transition-colors">
                            {contact.name}
                        </h4>
                        {contact.role && (
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4 leading-relaxed">
                                {contact.role}
                            </p>
                        )}
                        <div className="space-y-3 pt-2">
                        <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-sm font-black text-[hsl(93,20%,15%)] hover:text-[hsl(93,45%,44%)] transition-colors">
                            <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-[hsl(93,45%,44%)] group-hover:bg-[hsl(93,45%,44%)] group-hover:text-white transition-all">
                                <Phone size={14} />
                            </div>
                            {contact.phone}
                        </a>
                        {contact.email && (
                            <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-sm font-bold text-slate-500 hover:text-[hsl(93,45%,44%)] transition-colors">
                                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-[hsl(93,45%,44%)] transition-all">
                                    <Mail size={14} />
                                </div>
                                {contact.email}
                            </a>
                        )}
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            ))}
            </div>
        </div>
      </section>

      {/* 4. RAISE FUNDS & EMAIL CTA (GREEN) */}
      <section className="mt-20 py-24 bg-[hsl(93,45%,44%)] rounded-t-[4rem] text-white overflow-hidden relative">
        <div className="container mx-auto px-6 text-center relative z-10">
          <HeartHandshake size={64} className="mx-auto text-[#ffa62f] mb-8" />
          <h2 className="text-5xl md:text-7xl font-[1000] uppercase tracking-tighter mb-8">Raise <span className="text-[hsl(93,20%,15%)] italic text-stroke-white">Funds</span> & Support</h2>
          <p className="text-xl font-bold opacity-80 italic mb-16 max-w-2xl mx-auto">
            For financial contributions or technical help, please reach out to our dedicated desks.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
             {["registration", "helpdesk", "presenation"].map((prefix) => (
               <a 
                key={prefix} 
                href={`mailto:${prefix}@arogyaayurconclave.org`} 
                className="bg-white/10 backdrop-blur-md px-8 py-5 rounded-2xl border border-white/20 font-black uppercase tracking-widest text-xs hover:bg-white hover:text-[hsl(93,45%,44%)] transition-all shadow-xl"
               >
                 {prefix}@arogyaayurconclave.org
               </a>
             ))}
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[hsl(93,20%,15%)]/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
      </section>

    </main>
  );
}
