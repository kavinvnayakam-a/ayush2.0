'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Sparkles, Clock, ShieldCheck, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Ayush20Page() {
  const router = useRouter();
  const firestore = useFirestore();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({ name: '', working: '', mobile: '', email: '' });
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!selectedMedicine) {
      setErrorMsg('Please select a system of medicine.');
      return;
    }
    
    if (selectedInterests.length === 0) {
      setErrorMsg('Please select at least one area of interest.');
      return;
    }

    if (!firestore) {
      setErrorMsg('Database connection not available.');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Write registration data to Firestore
      await addDoc(collection(firestore, 'ayush_registrations'), {
        name: formData.name,
        working: formData.working,
        mobile: formData.mobile,
        email: formData.email,
        systemOfMedicine: selectedMedicine,
        areasOfInterest: selectedInterests,
        createdAt: serverTimestamp()
      });

      // 2. Trigger the Firebase Email Extension by writing to the 'mail' collection
      await addDoc(collection(firestore, 'mail'), {
        to: formData.email,
        message: {
          subject: "Registration Confirmed - AYUSH 2.0",
          html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
              <div style="background-color: #2c5340; padding: 32px 24px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 1px;">AYUSH <span style="color: #c4643c; font-style: italic;">2.0</span></h1>
                <p style="color: #ffffff; opacity: 0.9; margin-top: 8px; font-size: 14px;">Registration Successful</p>
              </div>
              <div style="padding: 32px 24px; background-color: #ffffff;">
                <p style="font-size: 16px; font-weight: bold; margin-bottom: 16px;">Dear ${formData.name},</p>
                <p style="font-size: 15px; line-height: 1.6; color: #475569;">Thank you for registering for the <strong>AYUSH 2.0</strong> seminar. Your registration has been successfully confirmed. Below are the details for the event:</p>
                
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: bold; width: 80px;">DATE</td>
                      <td style="padding: 8px 0; color: #1e293b; font-size: 15px; font-weight: bold;">21-OCT-2026</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: bold;">TIME</td>
                      <td style="padding: 8px 0; color: #1e293b; font-size: 15px; font-weight: bold;">10.00 AM - 4.30 PM</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: bold;">VENUE</td>
                      <td style="padding: 8px 0; color: #1e293b; font-size: 15px; font-weight: bold;">Casa de gomez pondy</td>
                    </tr>
                  </table>
                </div>
                
                <p style="font-size: 15px; line-height: 1.6; color: #475569;">We look forward to redefining holistic wellness together.</p>
                
                <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
                  <p style="font-size: 14px; color: #64748b; margin: 0;">Warm Regards,</p>
                  <p style="font-size: 14px; font-weight: bold; color: #2c5340; margin: 4px 0 0 0;">Dr. Shreevarma's Wellness Team</p>
                </div>
              </div>
            </div>
          `
        }
      });

      // 3. Navigate to the Thank You page
      router.push('/ayush2.0/thank-you');
    } catch (error: any) {
      console.error("Error adding document: ", error);
      setErrorMsg(error.message || 'Failed to submit registration. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f2eb] selection:bg-[#2c5340] selection:text-white font-sans">
      {/* HERO SECTION */}
      <section className="relative pt-24 pb-12 overflow-hidden bg-white rounded-b-[4rem] shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-2.5 rounded-full border border-[#2c5340]/10 text-[#2c5340] font-black text-xs tracking-[0.3em] uppercase mb-8 shadow-sm">
            <Sparkles size={16} /> Dr. Shreevarma's Wellness
          </div>
          
          <h1 className="text-5xl md:text-7xl xl:text-8xl font-[1000] text-[#2c5340] uppercase tracking-tighter leading-none mb-6">
            AYUSH <span className="text-[#c4643c] italic">2.0</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold text-slate-600 max-w-4xl mx-auto leading-relaxed uppercase tracking-wide">
            Redefining Holistic Wellness Through Ayurveda Yoga, Nutrition and Preventive Healthcare
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="pt-12 md:pt-20 pb-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT COLUMN: Registration Form */}
            <div className="order-1 lg:order-2 lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden sticky top-8">
              <div className="bg-[#2c5340] p-10 text-white">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-[#c4643c]">Registration</h4>
                <h2 className="text-3xl font-serif mb-2">Tell us about yourself</h2>
                <p className="text-white/80 text-sm">Share your details and areas of interest. It takes less than a minute.</p>
              </div>

              <form onSubmit={handleSubmit} className="p-10 space-y-6">
                {errorMsg && (
                  <div className="p-4 bg-red-50 text-red-600 font-semibold text-sm rounded-lg border border-red-100">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Name *</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your full name" className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c5340]/20" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">System of medicine *</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['Ayurveda', 'Siddha', 'Homeopathy', 'Naturopathy'].map((sys) => (
                      <label key={sys} className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${selectedMedicine === sys ? 'border-[#2c5340] bg-[#2c5340]/5' : 'border-slate-200 hover:border-[#2c5340]/50'}`}>
                        <input type="radio" name="medicine" className="w-4 h-4 text-[#2c5340]" onChange={() => setSelectedMedicine(sys)} checked={selectedMedicine === sys} />
                        <span className="text-sm font-medium text-slate-700">{sys}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Currently working *</label>
                  <input required type="text" name="working" value={formData.working} onChange={handleInputChange} placeholder="Hospital, clinic or institution name" className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c5340]/20" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Mobile number *</label>
                  <div className="flex gap-2">
                    <div className="border border-slate-200 rounded-lg px-4 py-3 bg-slate-50 text-slate-500 font-medium">+91</div>
                    <input required type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="98765 43210" className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c5340]/20" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email ID *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="name@example.com" className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c5340]/20" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Area of interest *</label>
                  <div className="flex flex-wrap gap-3 mb-2">
                    {['General Practice', 'Surgery', 'OG', 'Panchakarma', 'Varmam'].map((interest) => (
                      <button 
                        key={interest} type="button" onClick={() => toggleInterest(interest)}
                        className={`px-4 py-2 border rounded-full text-sm font-medium transition-all ${selectedInterests.includes(interest) ? 'border-[#2c5340] bg-[#2c5340] text-white' : 'border-slate-200 text-slate-600 hover:border-[#2c5340]/50'}`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400">Select all that apply.</p>
                </div>

                <div className="pt-4">
                  <Button disabled={isLoading} type="submit" className="w-full h-12 bg-[#c4643c] hover:bg-[#a65230] text-white font-bold rounded-lg text-lg transition-all">
                    {isLoading ? "Submitting..." : "Submit"}
                  </Button>
                  <p className="text-center text-xs text-slate-400 mt-4">Fields marked * are required.</p>
                </div>
              </form>
            </div>

            {/* RIGHT COLUMN: Event Full Details */}
            <div className="order-2 lg:order-1 lg:col-span-5 space-y-8">
              
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
                <h3 className="text-xs font-black text-[#c4643c] uppercase tracking-[0.3em] mb-6">Event Details</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#2c5340]/10 flex items-center justify-center text-[#2c5340] shrink-0">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 uppercase text-xs mb-1">Date</h4>
                      <p className="text-base font-bold text-slate-600">21-OCT-2026</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#2c5340]/10 flex items-center justify-center text-[#2c5340] shrink-0">
                      <Clock size={18} />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 uppercase text-xs mb-1">Time</h4>
                      <p className="text-base font-bold text-slate-600">10.00 AM - 4.30 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#2c5340]/10 flex items-center justify-center text-[#2c5340] shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 uppercase text-xs mb-1">Location</h4>
                      <p className="text-base font-bold text-slate-600">Casa de gomez pondy</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#2c5340] p-8 rounded-3xl text-white shadow-xl">
                <h3 className="text-sm font-black uppercase mb-6 flex items-center gap-2 text-[#c4643c] tracking-widest">
                  <Users size={18} /> Directors & Speakers
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-lg">Dr Karima Mubeen B.A.M.S</h4>
                    <p className="text-sm text-white/70 mt-1 uppercase tracking-wide">Director, VK Ayurveda Hospital & VK Herbal Formulations</p>
                  </div>
                  <div className="w-12 h-px bg-white/20"></div>
                  <div>
                    <h4 className="font-bold text-lg">Dr. Padmavathi Amma MD</h4>
                    <p className="text-sm text-white/70 mt-1 uppercase tracking-wide">Ayurveda Nodal Officer, Govt of Pondicherry</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
                <h3 className="text-xs font-black text-[#c4643c] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                  <ShieldCheck size={16} /> Organizers & Patrons
                </h3>
                <div className="grid grid-cols-1 gap-4 text-sm font-bold text-slate-700">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">Ministry of Ayurved, Govt of India</div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">Govt of Odisha</div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">World Ayurveda Foundation (WAF) <br/><span className="text-xs text-slate-500 font-medium">An initiative of Vijnana Bharati</span></div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">NASYA <br/><span className="text-xs text-slate-500 font-medium">National Ayurveda Students & Youth Association</span></div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Institutional Patrons</p>
                    <ul className="list-disc pl-4 space-y-2 text-slate-600 font-medium">
                      <li>Vijnana Bharati</li>
                      <li>AyushExcil</li>
                      <li>NCISM</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
                <h3 className="text-xs font-black text-[#c4643c] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                  <Award size={16} /> Prime Sponsors & Partners
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Dhootapapeshwar', 'Kottakkal', 'Vaidyaratnam', 'Dabur', 'Mansarova Ayurvedic Medical College'].map((sponsor) => (
                    <span key={sponsor} className="px-3 py-1.5 bg-[#f5f2eb] text-[#2c5340] text-sm font-bold rounded-lg border border-[#2c5340]/10">
                      {sponsor}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}