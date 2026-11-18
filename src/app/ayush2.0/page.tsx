'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Sparkles, Clock, ShieldCheck, Award, Users, Mic, ListChecks } from 'lucide-react';
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

      // 2. Trigger Email with updated event details
      await addDoc(collection(firestore, 'mail'), {
        to: formData.email,
        message: {
          subject: "Registration Confirmed - World Ayurveda Congress Satellite Seminar",
          html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
              <div style="background-color: #2c5340; padding: 32px 24px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 1px;">WORLD AYURVEDA CONGRESS</h1>
                <p style="color: #c4643c; font-style: italic; margin-top: 4px; font-size: 18px; font-weight: bold;">SATELLITE SEMINAR</p>
                <p style="color: #ffffff; opacity: 0.9; margin-top: 12px; font-size: 14px;">Registration Successful</p>
              </div>
              <div style="padding: 32px 24px; background-color: #ffffff;">
                <p style="font-size: 16px; font-weight: bold; margin-bottom: 16px;">Dear ${formData.name},</p>
                <p style="font-size: 15px; line-height: 1.6; color: #475569;">Thank you for registering. Your spot has been successfully confirmed. Below are the details for the event:</p>
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: bold; width: 80px; vertical-align: top;">DATE</td>
                      <td style="padding: 8px 0; color: #1e293b; font-size: 15px; font-weight: bold;">21 November 2026 (Saturday)</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: bold; vertical-align: top;">TIME</td>
                      <td style="padding: 8px 0; color: #1e293b; font-size: 15px; font-weight: bold;">9:30 AM - 4:00 PM</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: bold; vertical-align: top;">VENUE</td>
                      <td style="padding: 8px 0; color: #1e293b; font-size: 15px; font-weight: bold;">Casa De Gomez<br/><span style="font-size: 13px; font-weight: normal; color: #475569;">3rd Cross Street, Jagaraj Nagar, Karuvadikuppam, Puducherry – 605003</span></td>
                    </tr>
                  </table>
                </div>
                <p style="font-size: 15px; line-height: 1.6; color: #475569;">We look forward to a day of knowledge, tradition, and wellness.</p>
                <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
                  <p style="font-size: 14px; color: #64748b; margin: 0;">Warm Regards,</p>
                  <p style="font-size: 14px; font-weight: bold; color: #2c5340; margin: 4px 0 0 0;">Dr. Shreevarma's Wellness Team</p>
                </div>
              </div>
            </div>
          `
        }
      });

      // 3. Navigate to Thank You page
      router.push('/ayush2.0/thank-you');
    } catch (error: any) {
      console.error("Error adding document: ", error);
      setErrorMsg(error.message || 'Failed to submit registration. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f2eb] selection:bg-[#2c5340] selection:text-white font-sans">
      
      {/* Hide global header/footer */}
      <style dangerouslySetInnerHTML={{ __html: `
        header, footer, nav, [data-testid="global-header"], [data-testid="global-footer"] { 
          display: none !important; 
        }
      `}} />

      {/* HERO SECTION */}
      <section className="relative pt-10 md:pt-24 pb-12 overflow-hidden bg-white rounded-b-[3rem] md:rounded-b-[4rem] shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-[#2c5340]/10 text-[#2c5340] font-black text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-6 sm:mb-8 shadow-sm">
            <Sparkles size={14} className="sm:w-4 sm:h-4" /> World Ayurveda Congress
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-[1000] text-[#2c5340] uppercase tracking-tighter leading-tight md:leading-none mb-4">
            Satellite <span className="text-[#c4643c] italic">Seminar</span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl font-bold text-slate-600 max-w-4xl mx-auto leading-relaxed uppercase tracking-wider px-2">
            A Day of Knowledge • Tradition • Wellness
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="pt-10 md:pt-16 pb-20 md:pb-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            
            {/* LEFT COLUMN: Registration Form - ordered first on mobile */}
            <div className="order-1 lg:order-2 lg:col-span-6 xl:col-span-5 bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden lg:sticky lg:top-8">
              <div className="bg-[#2c5340] p-6 sm:p-8 text-white">
                <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-2 text-[#c4643c]">Registration</h4>
                <h2 className="text-2xl sm:text-3xl font-serif mb-1">Tell us about yourself</h2>
                <p className="text-white/80 text-xs sm:text-sm">Share your details and areas of interest. It takes less than a minute.</p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
                {errorMsg && (
                  <div className="p-4 bg-red-50 text-red-600 font-semibold text-sm rounded-xl border border-red-100">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Name *</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your full name" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c5340]/20" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">System of medicine *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['Ayurveda', 'Siddha', 'Homeopathy', 'Naturopathy'].map((sys) => (
                      <label key={sys} className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all ${selectedMedicine === sys ? 'border-[#2c5340] bg-[#2c5340]/5' : 'border-slate-200 hover:border-[#2c5340]/50'}`}>
                        <input type="radio" name="medicine" className="w-4 h-4 text-[#2c5340]" onChange={() => setSelectedMedicine(sys)} checked={selectedMedicine === sys} />
                        <span className="text-sm font-medium text-slate-700">{sys}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Currently working *</label>
                  <input required type="text" name="working" value={formData.working} onChange={handleInputChange} placeholder="Hospital, clinic or institution name" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c5340]/20" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Mobile number *</label>
                  <div className="flex gap-2">
                    <div className="border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 text-slate-500 font-medium">+91</div>
                    <input required type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="98765 43210" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c5340]/20" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email ID *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="name@example.com" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c5340]/20" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Area of interest *</label>
                  <div className="flex flex-wrap gap-2 mb-1">
                    {['General Practice', 'Surgery', 'OG', 'Panchakarma', 'Varmam'].map((interest) => (
                      <button 
                        key={interest} type="button" onClick={() => toggleInterest(interest)}
                        className={`px-4 py-2 border rounded-full text-xs font-medium transition-all ${selectedInterests.includes(interest) ? 'border-[#2c5340] bg-[#2c5340] text-white' : 'border-slate-200 text-slate-600 hover:border-[#2c5340]/50'}`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Select all that apply.</p>
                </div>

                <div className="pt-4">
                  <Button disabled={isLoading} type="submit" className="w-full h-14 bg-[#c4643c] hover:bg-[#a65230] text-white font-bold rounded-xl text-lg transition-all shadow-md">
                    {isLoading ? "Submitting..." : "Submit Registration"}
                  </Button>
                  <p className="text-center text-xs text-slate-400 mt-3">Fields marked * are required.</p>
                </div>
              </form>
            </div>

            {/* RIGHT COLUMN: Detailed Event Information - ordered second on mobile */}
            <div className="order-2 lg:order-1 lg:col-span-6 xl:col-span-7 space-y-6 sm:space-y-8">
              
              {/* Event Logistics */}
              <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-200 shadow-xl">
                <h3 className="text-[10px] sm:text-xs font-black text-[#c4643c] uppercase tracking-[0.3em] mb-6">Event Details</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#2c5340]/10 flex items-center justify-center text-[#2c5340] shrink-0">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 uppercase text-xs mb-1">Date</h4>
                      <p className="text-sm sm:text-base font-bold text-slate-600">21 November 2026 (Saturday)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#2c5340]/10 flex items-center justify-center text-[#2c5340] shrink-0">
                      <Clock size={18} />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 uppercase text-xs mb-1">Time</h4>
                      <p className="text-sm sm:text-base font-bold text-slate-600">9:30 AM - 4:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#2c5340]/10 flex items-center justify-center text-[#2c5340] shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 uppercase text-xs mb-1">Venue & Address</h4>
                      <p className="text-sm sm:text-base font-bold text-slate-800">Casa De Gomez</p>
                      <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1 leading-relaxed">3rd Cross Street, Jagaraj Nagar, Karuvadikuppam,<br/>Puducherry – 605003</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dignitaries */}
              <div className="bg-[#2c5340] p-6 sm:p-8 rounded-[2rem] text-white shadow-xl">
                <h3 className="text-xs sm:text-sm font-black uppercase mb-6 flex items-center gap-2 text-[#c4643c] tracking-widest">
                  <Award size={18} /> Dignitaries
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] sm:text-xs text-[#c4643c] font-black uppercase tracking-wider mb-1">Chief Guest</h4>
                    <p className="font-bold text-base sm:text-lg">Thiru. Ashok Anand</p>
                    <p className="text-xs sm:text-sm text-white/70 mt-1">MLA, Tattanchavadi Constituency, Puducherry</p>
                  </div>
                  <div className="w-12 h-px bg-white/20"></div>
                  <div>
                    <h4 className="text-[10px] sm:text-xs text-[#c4643c] font-black uppercase tracking-wider mb-1">Guest of Honour</h4>
                    <p className="font-bold text-base sm:text-lg">Dr. Padmavathi Amma</p>
                    <p className="text-xs sm:text-sm text-white/70 mt-1">MD (Ayurveda) • Nodal Officer – Ayurveda, Government of Puducherry</p>
                  </div>
                  <div className="w-12 h-px bg-white/20"></div>
                  <div>
                    <h4 className="text-[10px] sm:text-xs text-[#c4643c] font-black uppercase tracking-wider mb-1">Special Guest</h4>
                    <p className="font-bold text-base sm:text-lg">Dr. Jayaroopa</p>
                    <p className="text-xs sm:text-sm text-white/70 mt-1">Medical Director, Dr. Shreevarma Wellness Pvt. Ltd.</p>
                  </div>
                </div>
              </div>

              {/* Scientific Speakers */}
              <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-200 shadow-xl">
                <h3 className="text-[10px] sm:text-xs font-black text-[#c4643c] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                  <Mic size={16} /> Scientific Speakers
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-[#2c5340] text-white flex items-center justify-center font-black text-sm shrink-0">1</div>
                    <div>
                      <p className="font-bold text-sm sm:text-base text-slate-800">Dr. J. Roshan Zameer, MS (Ayu)</p>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">Assistant Medical Officer, ESI Hospital, Hosur</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-[#2c5340] text-white flex items-center justify-center font-black text-sm shrink-0">2</div>
                    <div>
                      <p className="font-bold text-sm sm:text-base text-slate-800">Dr. K. Raman</p>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">Medical Officer, Ayurveda, Puducherry</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-[#2c5340] text-white flex items-center justify-center font-black text-sm shrink-0">3</div>
                    <div>
                      <p className="font-bold text-sm sm:text-base text-slate-800">Dr. Prasana Lakshmi</p>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">RMO, AYUSH Hospital, Villianur, Puducherry</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Programme Schedule */}
              <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden">
                <h3 className="text-[10px] sm:text-xs font-black text-[#c4643c] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                  <ListChecks size={16} /> Programme Schedule
                </h3>
                <div className="relative border-l-2 border-[#2c5340]/20 ml-2 sm:ml-3 space-y-6">
                  
                  {[
                    { time: '9:30 – 10:00 am', event: 'Registration' },
                    { time: '10:00 – 10:05 am', event: 'Inviting the guests to the stage' },
                    { time: '10:05 – 10:10 am', event: 'Prayer' },
                    { time: '10:10 – 10:15 am', event: 'Lighting of the lamp' },
                    { time: '10:15 – 10:20 am', event: 'Introduction of the Chief Guest and honouring of the guests' },
                    { time: '10:20 – 10:25 am', event: 'Welcome address – Dr. Priya R, Medical Officer, Ayurveda, Puducherry' },
                    { time: '10:25 – 10:35 am', event: 'Address by the Chief Guest' },
                    { time: '10:35 – 10:45 am', event: 'Address by the Guest of Honour' },
                    { time: '10:45 – 10:55 am', event: 'Address by the Special Guest' },
                    { time: '11:00 – 11:15 am', event: 'Tea break', highlight: true },
                    { time: '11:15 am – 12:15 pm', event: 'First scientific session' },
                    { time: '12:15 – 1:00 pm', event: 'Second scientific session' },
                    { time: '1:00 – 2:00 pm', event: 'Lunch', highlight: true },
                    { time: '2:00 – 3:00 pm', event: 'Third scientific session' },
                    { time: '3:00 – 3:30 pm', event: 'Product explanation' },
                    { time: '3:30 – 3:45 pm', event: 'Question & Answer session' },
                    { time: '3:45 – 4:00 pm', event: 'Vote of thanks – Dr. Joy Emmanuel, followed by the National Anthem and High Tea' },
                  ].map((item, i) => (
                    <div key={i} className="relative pl-5 sm:pl-6">
                      <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white ${item.highlight ? 'bg-[#c4643c]' : 'bg-[#2c5340]'}`}></div>
                      <p className="text-[10px] sm:text-xs font-black text-[#c4643c] mb-0.5">{item.time}</p>
                      <p className="text-sm font-bold text-slate-700 leading-snug">{item.event}</p>
                    </div>
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