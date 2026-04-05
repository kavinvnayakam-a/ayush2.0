"use client";

import React, { useState } from 'react';
import { 
  MessageSquare, 
  Phone, 
  Filter, 
  Zap, 
  BarChart3, 
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Users
} from 'lucide-react';

const RecruiterLandingPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const roles = [
    'Customer Support', 'Sales', 'Front Office', 'Retail', 
    'Hospitality', 'Healthcare', 'Manufacturing', 'Warehouse'
  ];

  const locations = [
    'Chennai', 'Tiruvallur', 'Vellore', 'Tiruchirappalli', 'Madurai', 
    'Coimbatore', 'Erode', 'Tiruppur', 'Namakkal', 'Kanchipuram'
  ];

  const faqs = [
    "Are there any charges for creating a Recruiter profile and posting jobs?",
    "How do I create a Recruiter profile on the website?",
    "Do I need to verify my account before posting the job?",
    "How do I post Jobs on the website?",
    "Why is my job under review?",
    "Which cities and states do we serve currently?"
  ];

  return (
    <div className="font-sans text-gray-900 bg-white">
      {/* --- SECTION 1: HERO --- */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Entry level Sales, Service and Manufacturing jobs
          </h1>
          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-purple-600 p-2 rounded-lg text-white shadow-md">
                <Users size={20} />
              </div>
              <p className="text-sm font-medium text-gray-700">Get access to a large pool of candidates</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 p-2 rounded-lg text-white shadow-md">
                <Zap size={20} />
              </div>
              <p className="text-sm font-medium text-gray-700">Reduce hiring time & employ the best</p>
            </div>
          </div>
          
          <div className="bg-white border rounded-xl p-2 shadow-sm flex flex-col sm:flex-row gap-2 max-w-lg mb-4">
            <input 
              type="tel" 
              placeholder="Enter your mobile number" 
              className="flex-1 px-4 py-3 outline-none"
            />
            <button className="bg-[#7c74bc] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#6a62a8] transition">
              Register Now
            </button>
          </div>
          <div className="space-y-1">
            <a href="#" className="text-[#3b3584] font-bold underline flex items-center gap-2 text-sm">
              <Briefcase size={14} /> Click here for Enterprise login
            </a>
            <p className="text-sm text-gray-500 italic">We are currently live only in Tamil Nadu</p>
          </div>
        </div>

        {/* Hero Visuals */}
        <div className="relative flex justify-center items-center h-[500px]">
          <div className="absolute top-0 right-10 bg-white rounded-2xl shadow-xl border p-2 w-48 z-10">
             <div className="bg-gray-200 h-40 rounded-xl mb-2 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
             </div>
             <p className="font-bold text-sm">Vijay kumar</p>
             <p className="text-[10px] text-gray-500 uppercase tracking-tighter font-semibold">Sales Executive</p>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl border p-2 w-64 z-20">
             <div className="bg-gray-200 h-64 rounded-xl mb-3 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500" />
             </div>
             <p className="font-bold">Janani</p>
             <p className="text-xs text-gray-500">Customer Support</p>
          </div>
          <div className="absolute bottom-10 left-0 bg-white rounded-2xl shadow-xl border p-2 w-48 z-10">
             <div className="bg-gray-200 h-40 rounded-xl mb-2 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
             </div>
             <p className="font-bold text-sm">Ranjith Manohar</p>
             <p className="text-[10px] text-gray-500 uppercase tracking-tighter font-semibold">Retail</p>
          </div>
          <div className="absolute bottom-20 right-0 bg-white rounded-full shadow-lg border px-4 py-2 flex items-center gap-2">
            <span className="font-bold text-indigo-600">15k+</span>
            <span className="text-[10px] text-gray-500 leading-none">Candidates</span>
          </div>
        </div>
      </section>

      {/* --- HIRING PARTNERS --- */}
      <section className="bg-gray-50 py-10 border-y">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-2xl font-bold mb-8 italic">Our Hiring Partners</p>
          <div className="flex flex-wrap justify-center gap-10 grayscale opacity-70">
            {['ICICI', 'HDFC', 'JIO', 'ZUDIO', 'RELIANCE', 'ROYAL ENFIELD'].map((brand) => (
              <span key={brand} className="text-xl font-black text-gray-400">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURE HIGHLIGHTS --- */}
      <section className="py-20 space-y-32">
        {/* Locality */}
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 order-2 md:order-1">
             <div className="bg-blue-50 h-80 rounded-3xl flex items-center justify-center">
                <Filter size={80} className="text-blue-500 opacity-20" />
             </div>
          </div>
          <div className="flex-1 order-1 md:order-2">
            <h2 className="text-4xl font-bold mb-4">Hire candidates based on their location</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Want to hire candidates from a particular locality? Our advanced filters can help you find candidates suiting your requirements in any specific locality.
            </p>
          </div>
        </div>

        {/* Direct Contact */}
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-4">Candidates can contact you directly</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We prompt the users to connect with you directly over call allowing for a faster screening & hiring process.
            </p>
          </div>
          <div className="flex-1 bg-indigo-600 rounded-3xl p-12 text-white flex justify-center gap-12">
            <Phone size={60} />
            <MessageSquare size={60} />
          </div>
        </div>

        {/* Vernacular */}
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 order-2 md:order-1 flex justify-center">
            <div className="flex gap-4">
              <div className="bg-white border-4 border-gray-100 shadow-xl px-8 py-4 rounded-xl text-xl font-bold">English</div>
              <div className="bg-white border-4 border-gray-100 shadow-xl px-8 py-4 rounded-xl text-xl font-bold text-indigo-600">தமிழ்</div>
            </div>
          </div>
          <div className="flex-1 order-1 md:order-2">
            <h2 className="text-4xl font-bold mb-4">Easy-to-use vernacular app, more local candidates</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our easy-to-use vernacular app helps more regional job seekers to register, thereby giving you a larger database of candidates to choose from.
            </p>
          </div>
        </div>
      </section>

      {/* --- BENEFITS CARDS --- */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            We help you find the best candidates who fit your requirements
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Easier & faster screening", desc: "Candidate Match Score can help you easily find the best candidates for your requirement." },
              { title: "2x faster hiring", desc: "Directly contact the best talent through our various communication channels to complete your hiring 2x faster." },
              { title: "Filters to find the best candidates", desc: "Filters based on skills, education & salary expectation can help you find candidates." }
            ].map((benefit, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border hover:shadow-lg transition">
                <div className="bg-indigo-50 w-12 h-12 rounded-lg flex items-center justify-center text-indigo-600 mb-6">
                  <BarChart3 size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ROLES & LOCATION CLOUD --- */}
      <section className="py-20 bg-[#1c144c] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8">Hire for 50+ different roles</h2>
            <div className="flex flex-wrap gap-3">
              {roles.map(role => (
                <span key={role} className="bg-white/10 px-6 py-2 rounded-full border border-white/20 text-sm font-medium hover:bg-white hover:text-indigo-900 transition cursor-default">
                  {role}
                </span>
              ))}
            </div>
            <button className="mt-10 bg-white text-[#1c144c] px-8 py-3 rounded-xl font-bold text-sm">
                REGISTER FOR FREE
            </button>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">Hire from any locality</h2>
            <p className="text-indigo-200 mb-8 max-w-2xl">
              Our platform provide you with the opportunity to search for professional talent in any specific locality and hire the best candidates.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {locations.map(loc => (
                <span key={loc} className="text-lg font-bold border-b-2 border-white/30 hover:border-white transition cursor-pointer">
                  {loc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 italic">Our Happy Clients</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: "Bala pruthvi", co: "Netambit", text: "The job portal seems user friendly. Candidates are applying all over the region. Outstanding service! I have hired 5 exceptional candidates through this portal." },
              { name: "Sandhiya", co: "Paytm Services", text: "The portal is very useful to find relevant candidates in relevant locations and I received great support from the team." }
            ].map((t, i) => (
              <div key={i} className="bg-gray-50 p-10 rounded-3xl relative">
                <span className="text-8xl text-indigo-100 absolute top-4 left-4 font-serif leading-none">“</span>
                <p className="text-gray-700 mb-8 relative z-10 text-lg leading-relaxed italic">{t.text}</p>
                <div>
                  <p className="font-bold text-indigo-900">{t.name},</p>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{t.co}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between py-6 text-left font-bold text-lg hover:text-indigo-600 transition"
              >
                {faq}
                {openFaq === idx ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              {openFaq === idx && (
                <div className="pb-6 text-gray-600 leading-relaxed">
                  Answers to these questions are available in our recruiter help documentation. Generally, registration is free and involves mobile verification.
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 bg-indigo-50 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-indigo-600 font-bold mb-4">Looking for best professionals to join your company?</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Post a job and get applications from the best candidates</h2>
          <p className="text-gray-600 text-lg mb-10">Our platform has an extensive pool of registered talent looking for job opportunities.</p>
          <button className="bg-[#7c74bc] text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-[#6a62a8] shadow-xl transform hover:-translate-y-1 transition">
            REGISTER FOR FREE
          </button>
        </div>
      </section>
    </div>
  );
};

export default RecruiterLandingPage;