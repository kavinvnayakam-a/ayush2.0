'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { 
  Sparkles, 
  Globe, 
  ArrowRight, 
  Target, 
  ShieldCheck, 
  Microscope, 
  Users, 
  MapPin, 
  Navigation, 
  X, 
  Ticket,
  CalendarDays,
  Youtube
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CountdownTimer } from '@/components/CountdownTimer';
import { EventMap } from '@/components/EventMap';
import { VisitorForm } from '@/components/forms/VisitorForm';


/** --- CONSTANTS --- **/
const REGISTRATION_LINK = "https://www.arogyaayurconclave.org/#/buyTickets/selectTickets?day=1&lang=en";

/** --- SUB-COMPONENTS --- **/

function PersonCard({ name, title, imageUrl }: { name: string; title: string; imageUrl: string }) {
  return (
    <div className="group relative flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2">
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-[2rem] mb-6 border-4 border-white shadow-xl transition-all duration-500 group-hover:border-[hsl(93,45%,44%)]">
        <Image src={imageUrl} alt={name} fill loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(93,20%,15%)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <h3 className="text-lg font-black text-[hsl(93,20%,15%)] leading-tight mb-2">{name}</h3>
      <p className="text-xs font-bold text-[hsl(93,45%,44%)] uppercase tracking-wider opacity-80 px-4">{title}</p>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-16">
      <div className="h-[1px] flex-1 bg-[hsl(93,45%,44%)]/20" />
      <span className="px-8 py-3 rounded-full bg-white border border-[hsl(93,45%,44%)]/10 text-[hsl(93,45%,44%)] text-[10px] font-black uppercase tracking-[0.4em] shadow-sm">{children}</span>
      <div className="h-[1px] flex-1 bg-[hsl(93,45%,44%)]/20" />
    </div>
  );
}

/** --- MAIN PAGE --- **/

export default function HomePage() {
  const eventDate = new Date('2026-01-09T08:00:00');
  const [isVisitorModalOpen, setIsVisitorModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white selection:bg-[hsl(93,45%,44%)] selection:text-white">
      
      {/* 1. HERO SECTION - VIDEO / IMAGE BACKGROUND */}
      <section className="relative h-auto md:h-[800px] flex items-center justify-center overflow-hidden pt-20 pb-20 md:py-24">
        
        {/* Background images/videos */}
        <div className="absolute inset-0 z-0">
          {/* Mobile: Static Image Background */}
           <div 
            className="md:hidden absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FVideo%20BG%2FHero%20Background.webp?alt=media&token=35b2dc1e-03d6-40e6-baff-34369349f106')` }}
          />
          
          {/* Desktop: Static Image Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
            style={{ backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FVideo%20BG%2FHero%20image%20Desktop%20with%20anie.webp?alt=media&token=0984a59a-b707-4ad2-8c22-35322cb2e77b')` }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 flex items-center h-full">
            <div className="flex flex-col md:grid md:grid-cols-2 gap-8 items-center w-full">
                {/* Left Column: Text Content */}
                <div className="text-center md:text-left space-y-4 order-2 md:order-1 pt-12 md:pt-0">
                    <h1 className="text-4xl lg:text-6xl font-black text-[hsl(93,88.50%,27.30%)] md:text-[hsl(93,88.50%,27.30%)] uppercase tracking-tight">
                        National Arogya Expo 2026
                    </h1>
                    <p className="text-lg font-bold text-[hsl(93,20%,35%)] md:text-[hsl(93,20%,35%)]">
                        AYUSH for One Health: Bridging Tradition, Innovation and Well-being
                    </p>
                    <p className="font-bold text-[hsl(93,20%,35%)] md:text-[hsl(93,20%,35%)] text-sm uppercase tracking-wider">
                        Ancient Wisdom | Modern Care | Patient First
                    </p>
                    <div className="space-y-3 pt-4">
                        <div className="flex items-center justify-center md:justify-start gap-3 text-[hsl(93,20%,35%)] md:text-[hsl(93,20%,35%)] font-semibold">
                            <CalendarDays size={18} className="text-[hsl(93,45%,44%)]"/>
                            <span>Jan 09 – 12, 2026</span>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-3 text-[hsl(93,20%,35%)] md:text-[hsl(93,20%,35%)] font-semibold">
                            <MapPin size={18} className="text-[hsl(93,45%,44%)]"/>
                            <span>Heartfulness, Babuji Memorial Ashram, Manapakkam, Chennai</span>
                        </div>
                    </div>
                    
                    {/* Desktop-only CTAs and Countdown */}
                    <div className="hidden md:block">
                      <div className="pt-6 flex justify-center md:justify-start">
                          <CountdownTimer targetDate={eventDate} />
                      </div>
                      <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
                          <Button 
                              onClick={() => setIsVisitorModalOpen(true)}
                              size="lg"
                              className="h-20 w-60 text-lg rounded-lg bg-[#ffa62f] text-white font-black hover:bg-[hsl(93,45%,44%)] transition-colors px-8 animate-pulse"
                          >
                              Free Visitor Pass
                          </Button>
                          <Button 
                              asChild
                              size="lg"
                              variant="outline"
                              className="h-14 rounded-lg border-2 border-[hsl(93,45%,44%)] text-[hsl(93,45%,44%)] bg-white/80 md:bg-transparent font-bold hover:bg-[hsl(93,45%,44%)] hover:text-white transition-colors px-6"
                          >
                              <a href={REGISTRATION_LINK} target="_blank" rel="noopener noreferrer">Register as Delegate</a>
                          </Button>
                      </div>
                      <p className="text-lg text-center md:text-left text-white md:text-[hsl(93,20%,35%)] font-black pt-2">Note: Free pass Only for Public.</p>
                    </div>

                </div>

                {/* Right Column: Logo on Desktop, Video on Mobile */}
                <div className="relative w-full h-auto md:h-full flex flex-col items-center justify-center order-1 md:order-2 pt-12 md:pt-0">
                    {/* Desktop Logo */}
                    <div className="hidden md:block">
                        <Image 
                            src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2F1000157891%20(1).webp?alt=media&token=f13fc097-13b6-4af3-bb0e-2788a1fb4b73"
                            alt="AyushConclave Logo"
                            width={400}
                            height={400}
                            priority
                            className="object-contain drop-shadow-2xl"
                        />
                    </div>
                    
                    {/* Mobile: Logo and Video Embed */}
                    <div className="md:hidden w-full flex flex-col items-center">
                        <Image
                            src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2F1000157891.webp?alt=media&token=4be2587a-1605-40c6-8bff-dc1472ecfe22"
                            alt="AyushConclave Logo Mobile"
                            width={150}
                            height={150}
                            className="object-contain mb-4"
                        />
                        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/c4-k1CuCS8A?autoplay=1&mute=1&loop=1&playlist=c4-k1CuCS8A&controls=1&showinfo=0&autohide=1"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* YOUTUBE LIVE STREAM - DESKTOP ONLY */}
      <section className="hidden md:block py-24 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-4 mb-12">
                <div className="w-16 h-1 bg-[hsl(93,45%,44%)]/20 rounded-full" />
                <div className='flex items-center gap-3 text-red-600'>
                    <Youtube size={32} />
                    <h2 className="text-4xl font-black uppercase tracking-tight text-slate-800">Live Streaming</h2>
                </div>
                <div className="w-16 h-1 bg-[hsl(93,45%,44%)]/20 rounded-full" />
            </div>
            <div className="w-full max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl border-8 border-white/80">
                <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/c4-k1CuCS8A"
                    title="YouTube live player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
      </section>

      {/* 2. OBJECTIVES */}
      <section className="py-24 bg-white relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <ShieldCheck size={32} />, title: "Holistic Health", desc: "Integrating AYUSH systems for complete physical and mental well-being." },
              { icon: <Microscope size={32} />, title: "Innovation", desc: "Showcasing modern research and evidence-based traditional medicine." },
              { icon: <Users size={32} />, title: "Global Access", desc: "Making traditional healthcare affordable and accessible to all." },
              { icon: <Target size={32} />, title: "One Health", desc: "Uniting humans, animals, and the environment in a single health vision." }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-[hsl(93,45%,44%)]/40 transition-all">
                <div className="text-[hsl(93,45%,44%)] mb-6">{item.icon}</div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{item.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. LEADERSHIP SECTION */}
      <section className="py-32 bg-slate-50 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-8xl font-[1000] tracking-tighter italic text-slate-900 uppercase">Leadership</h2>
            <div className="w-24 h-2 bg-[hsl(28,90%,45%)] mx-auto mt-4 rounded-full" />
          </div>

          <SectionLabel>Chief Patron</SectionLabel>
          <div className="flex justify-center mb-32">
            <div className="w-full max-w-[320px]">
              <PersonCard 
                name="Hon'ble Shri Prataprao Jadhav" 
                title="Union Minister, Ministry of AYUSH, Government of India" 
                imageUrl="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FBoard%20Members%20Images%2FHon'ble%20Shri%20Prataprao%20Jadhav.webp?alt=media&token=f5cb4292-512c-4906-8528-a466b1706edb" 
              />
            </div>
          </div>

          <SectionLabel>Patrons</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-3xl mx-auto mb-32">
            <PersonCard 
              name="Vaidya Rajesh Kotecha" 
              title="Secretary, Ministry of AYUSH, GOI" 
              imageUrl="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FBoard%20Members%20Images%2FVaidya%20Rajesh%20Kotecha.webp?alt=media&token=47c73bff-410c-4934-95f7-f1ba2081e869" 
            />
            <PersonCard 
              name="Dr Shekhar C. Mande" 
              title="National President, VIBHA" 
              imageUrl="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FBoard%20Members%20Images%2FDr%20Shekhar%20C.%20Mande.webp?alt=media&token=601c27ea-cb6b-4af7-85f8-099a344f3125" 
            />
          </div>

          <SectionLabel>National Advisory Board</SectionLabel>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-16">
            {[
              { name: "Prof (Dr) Rabinarayan Acharya", title: "DG, CCRAS, New Delhi", id: "7034e1c3-af74-4d01-8b32-0e3ef0482004", img: "Prof%20(Dr)%20Rabinarayan%20Acharya" },
              { name: "Prof (Dr) N. J. Muthukumar", title: "DG, CCRS, Chennai", id: "031f9166-3c63-4a4f-a17c-3cba85443f7c", img: "Prof%20(Dr)%20N.%20J.%20Muthukumar" },
              { name: "Prof (Vd) P. K. Prajapati", title: "Director, AIIA, New Delhi", id: "88b9c3ea-38b7-4396-a499-669fc2ca44d5", img: "Prof%20(Vd)%20P.%20K.%20Prajapati" },
              { name: "Prof Sanjeev Sharma", title: "Vice Chancellor, NIA, Jaipur", id: "dedff5d1-b8e7-4255-8fa7-16daf7a3b422", img: "Prof%20Sanjeev%20Sharma" },
              { name: "Prof (Dr) B. L. Mehra", title: "Former Chairman, NCISM, New Delhi", id: "e56e63b0-a201-4bb2-9d98-ad5994e2a5bd", img: "Prof%20(Dr)%20B.%20L.%20Mehra" },
              { name: "Prof (Dr) Tanuja Nesari", title: "Director, ITRA, Jamnagar", id: "4b1badf5-a60d-433c-b122-306181dd2574", img: "Prof%20(Dr)%20Tanuja%20Nesari" },
              { name: "Prof (Dr) Sujata Kadam", title: "Director I/C, AIIA, Goa", id: "b15ee02b-d383-41bc-8c22-ddfa82abf838", img: "Prof%20(Dr)%20Sujata%20Kadam" },
              { name: "Dr Shivkumar Sharma", title: "National Organizing Secretary, VIBHA", id: "2ca44caf-7b10-4c1b-876a-abb228554b22", img: "Dr%20Shivkumar%20Sharma" },
              { name: "Shri Praveen Ramadas", title: "National Jt. Organizing Secretary, VIBHA", id: "32d9aeba-0a06-43b8-b619-02a464c13d69", img: "Shri%20Praveen%20Ramadas" },
              { name: "Shri Vivekananda Pai", title: "Secretary General, VIBHA", id: "e1d841aa-56e6-47c0-b0c6-04167e848e44", img: "Shri%20Vivekananda%20Pai" },
              { name: "Shri Abga R. Babu", title: "South India Organizing Secretary, VIBHA", id: "9646ff38-bc5e-4cb3-8be3-a25e7fe43a76", img: "Shri%20Abga%20R.%20Babu" },
              { name: "Dr Manasi Malgaonkar", title: "GC Member, Vijnana Bharati", id: "a3d64718-018e-46dd-ba14-3876074cec8d", img: "Dr%20Manasi%20Malgaonkar" },
              { name: "Aacharya Dr Shreevarma", title: "Founder & Chairman - PCR Herbals", id: "bad10147-6181-467d-a51b-5eb038393f47", img: "Aacharya%20Dr%20Shreevarma" }
            ].map((person, idx) => (
              <div key={idx} className="w-[45%] sm:w-[30%] lg:w-[18%] max-w-[220px]">
                <PersonCard 
                  name={person.name} 
                  title={person.title} 
                  imageUrl={`https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FBoard%20Members%20Images%2F${person.img}.webp?alt=media&token=${person.id}`} 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SUPPORTED BY - RESTORED SECTION */}
      <section className="py-24 bg-white relative z-10">
        <div className="container mx-auto px-6">
          <SectionLabel>Supported By</SectionLabel>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 items-center justify-center">
            {[
              { img: "MINISTRY%20OF%20AYUSH", token: "38e912a4-940b-4571-9f97-b24a22ea96a0", label: "Ministry of AYUSH" },
              { img: "NASYA%20(1)", token: "1537925f-0428-498a-8015-34e119872093", label: "NASYA" },
              { img: "Supported%20by%20logos%2FVibha", token: "19ef4dd0-2d8c-4fea-a2da-1aa0c8fefd0c", label: "VIBHA" },
              { img: "HEARTFULNESS", token: "59bf8c0a-5083-436a-b0d2-6bd746e2583f", label: "Wellness by Heartfulness" }
            ].map((logo, i) => (
              <div key={i} className="group flex flex-col items-center justify-center space-y-4 p-8 rounded-[2.5rem] bg-white border border-slate-50 hover:border-[hsl(93,45%,44%)]/20 transition-all">
                <div className="relative w-full h-24 transition-transform group-hover:scale-110">
                  <Image src={`https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2F${logo.img}.webp?alt=media&token=${logo.token}`} alt={logo.label} fill loading="lazy" className="object-contain" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{logo.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VENUE */}
      <section className="py-24 relative overflow-hidden z-10 bg-slate-900">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
                The <span className="text-[hsl(93,45%,44%)] italic">Venue</span>
              </h2>
              <div className="p-8 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10">
                <h4 className="font-black text-white uppercase text-lg mb-1 tracking-tight">Heartfulness Institute</h4>
                <p className="text-sm text-white/50 leading-relaxed">
                  Babuji Memorial Ashram, Manapakkam, Chennai, Tamil Nadu 600125
                </p>
              </div>
              <Button asChild className="h-14 px-8 rounded-full bg-[hsl(93,45%,44%)] text-white font-bold hover:bg-[#ffa62f] transition-colors">
                  <a 
                    href="https://www.google.com/maps/dir/?api=1&destination=Babuji+Memorial+Ashram,+Manapakkam,+Chennai"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                      <Navigation className="mr-2 h-4 w-4" />
                      Get Directions
                  </a>
              </Button>
            </div>
            <div className="lg:w-1/2 w-full h-[500px] relative rounded-[3rem] border-4 border-white/10 shadow-2xl overflow-hidden">
               <EventMap />
            </div>
          </div>
        </div>
      </section>

      {/* VISITOR MODAL */}
      {isVisitorModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setIsVisitorModalOpen(false)} />
          <div className="relative bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl">
            <button onClick={() => setIsVisitorModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full">
              <X size={24} />
            </button>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[hsl(93,45%,44%)]/10 rounded-2xl flex items-center justify-center text-[hsl(93,45%,44%)] mx-auto mb-4">
                <Ticket size={32} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 uppercase">Visitor Pass</h2>
            </div>
            <VisitorForm closeModal={() => setIsVisitorModalOpen(false)} />
          </div>
        </div>
      )}

    </main>
  );
}
