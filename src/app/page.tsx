'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { CountdownTimer } from '@/components/CountdownTimer';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const PersonCard = ({ name, title, imageUrl }: { name: string, title: string, imageUrl?: string }) => (
  <div className="text-center">
    <div className="relative aspect-square w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
      {imageUrl ? (
        <Image 
          src={imageUrl} 
          alt={name} 
          fill 
          className="object-cover" 
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">No Image</div>
      )}
    </div>
    <h3 className="font-bold text-lg text-primary">{name}</h3>
    <p className="text-sm text-muted-foreground">{title}</p>
  </div>
);


export default function HomePage() {
  const eventDate = new Date('2026-01-09T00:00:00');
  const supportedByLogos = [
    "https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FSupported%20by%20logos%2Fpreview.webp?alt=media&token=3dc567d4-b3da-4f76-b4cd-dfc8e935049a",
    "https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FSupported%20by%20logos%2FNasya.webp?alt=media&token=e71b53e2-130a-41f1-87e4-e8e6d51938bc",
    "https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FSupported%20by%20logos%2FHeartfulness.webp?alt=media&token=dae70f60-e8cc-48cd-8317-8379e6ef818c",
    "https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FSupported%20by%20logos%2FVibha.webp?alt=media&token=19ef4dd0-2d8c-4fea-a2da-1aa0c8fefd0c"
  ];

  return (
    <div>
      <section className="relative w-full overflow-hidden">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            <CarouselItem>
              <div className="relative h-[600px] w-full">
                <div className="absolute inset-0 bg-primary/80 z-10" />
                <Image
                  src="https://picsum.photos/seed/1/1800/600"
                  alt="AyushConclave Banner"
                  fill
                  className="object-cover"
                  data-ai-hint="holistic health conference"
                />
                <div className="relative z-20 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white">
                  <div className="bg-white/70 p-8 rounded-full mb-6 w-48 h-48 flex items-center justify-center">
                    <Image src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2F1000157891.webp?alt=media&token=4be2587a-1605-40c6-8bff-dc1472ecfe22" alt="AyushConclave Logo" width={150} height={150} className="object-contain"/>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold uppercase">
                    AyushConclave
                  </h1>
                  <p className="mt-4 text-xl md:text-2xl max-w-3xl">
                    Holistic Health & One Vision
                  </p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative h-[600px] w-full">
                <div className="absolute inset-0 bg-primary/80 z-10" />
                <Image
                  src="https://picsum.photos/seed/2/1800/600"
                  alt="Arogya Expo Banner"
                  fill
                  className="object-cover"
                  data-ai-hint="wellness expo banner"
                />
                <div className="relative z-20 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white">
                   <div className="bg-white/70 p-8 rounded-full mb-6 w-48 h-48 flex items-center justify-center">
                    <Image src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FArogya%202026%20logo.webp?alt=media&token=0ee2306d-e44e-4c15-b748-69491434e0f5" alt="Arogya 2026 Logo" width={150} height={150} className="object-contain"/>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold uppercase">
                    National
                    <br />
                    Arogya
                    <br />
                    Expo
                  </h1>
                  <p className="mt-4 text-xl md:text-2xl max-w-3xl">
                    & Ayush Conclave 2026
                  </p>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-30" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-30" />
        </Carousel>
      </section>

      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join us to explore integrative medicine and collectively shape the future of AYUSH for global wellness.
          </h2>
          <p className="max-w-4xl mx-auto">
            NASYA is a vibrant national network of Ayurveda students and youth, connecting 100+ institutions and over 6000 members across India. Established to empower the next generation, NASYA promotes leadership, research, innovation, and collaborative learning, nurturing skilled Ayurvedic professionals committed to advancing holistic health and strengthening the AYUSH ecosystem.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary">About national AyushConclave</h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">International AyushConclave - 2026: Transforming Ayurveda through Research, Innovation & Integration</h3>
              <p>International AyushConclave - 2026 is the first international conference dedicated to advancing Ayurveda through contemporary science. Themed "Transforming Ayurveda: Through Research, Innovation & Integration", this landmark event will bring together global experts, researchers, and practitioners to explore cutting-edge developments in Ayurvedic sciences. With eight focused scientific sessions spanning from AI and microbiome research to clinical validation and education, AyushConclave aims to bridge traditional wisdom with modern innovation.</p>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
                <div className="w-full max-w-sm flex items-center justify-center">
                    <Image src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2F1000157891.webp?alt=media&token=4be2587a-1605-40c6-8bff-dc1472ecfe22" alt="About AyushConclave" width={300} height={300} className="object-contain" />
                </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary">AYUSH for One Health</h2>
          </div>
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Bridging Tradition, Innovation and Well-being</h3>
              <p>highlights the harmony between ancient healing wisdom and modern scientific advances. The theme emphasizes holistic health for humans, animals, and the environment, promoting integrative solutions that ensure sustainable wellness, evidence-based practices, and a unified approach to global well-being.</p>
            </div>
             <div className="w-full md:w-1/2 flex justify-center">
                <div className="w-full max-w-sm flex items-center justify-center">
                    <Image src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FAYUSH%20for%20One%20Health.webp?alt=media&token=79f49573-f5a2-4206-9b42-9bedecd093ff" alt="AYUSH for One Health" width={300} height={300} className="object-contain"/>
                </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary">Our Vision</h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <p>Our vision is to harmonize ancient Ayurvedic wisdom with modern scientific care, creating a healthcare ecosystem that is safe, evidence-based, accessible, and compassionate. By placing the patient at the center of every decision, we aim to advance holistic well-being and promote a future where tradition and innovation thrive together.</p>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
               <div className="w-full max-w-sm flex items-center justify-center">
                 <Image src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FOur%20vision.webp?alt=media&token=c568e396-21f1-4771-a361-3efaff9cb909" alt="Our vision" width={300} height={300} className="object-contain"/>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary">National Arogya Expo 2026</h2>
          </div>
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="w-full md:w-1/2">
              <p>The National Arogya Expo 2026 will showcase India’s rich AYUSH heritage through medicinal products, wellness therapies, healthcare technologies, and interactive demonstrations. Bringing together practitioners, industries, startups, researchers, and the public, the expo promotes evidence-based traditional medicine, holistic well-being, innovative solutions, and opportunities for collaboration in the growing AYUSH sector.</p>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
                 <div className="w-full max-w-sm flex items-center justify-center">
                    <Image src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FArogya%202026%20logo.webp?alt=media&token=0ee2306d-e44e-4c15-b748-69491434e0f5" alt="Arogya 2026 logo" width={300} height={300} className="object-contain"/>
                </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary">Expected Footfall</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            <div><p className="text-4xl font-bold text-accent">15,000+</p><p>Expected visitors per day</p></div>
            <div><p className="text-4xl font-bold text-accent">1,500</p><p>Delegates from across India</p></div>
            <div><p className="text-4xl font-bold text-accent">150+</p><p>Research Scholars & Experts</p></div>
            <div><p className="text-4xl font-bold text-accent">40+</p><p>National and International Eminent personalities</p></div>
            <div><p className="text-4xl font-bold text-accent">50+</p><p>Scientific Sessions on AYUSH System</p></div>
            <div><p className="text-4xl font-bold text-accent">30+</p><p>Curtain raisers across India and Associate events</p></div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary">Our Team</h2>
          </div>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold">Chief Patron</h3>
            <div className="flex justify-center mt-4">
              <PersonCard name="Hon'ble Shri Prataprao Jadhav" title="Union Minister, Ministry of AYUSH, Government of India" imageUrl="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FBoard%20Members%20Images%2FHon'ble%20Shri%20Prataprao%20Jadhav.webp?alt=media&token=f5cb4292-512c-4906-8528-a466b1706edb" />
            </div>
          </div>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold">Patrons</h3>
            <div className="flex flex-wrap justify-center gap-8 mt-4">
              <PersonCard name="Vaidya Rajesh Kotecha" title="Secretary, Ministry of AYUSH, GOI" imageUrl="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FBoard%20Members%20Images%2FVaidya%20Rajesh%20Kotecha.webp?alt=media&token=47c73bff-410c-4934-95f7-f1ba2081e869" />
              <PersonCard name="Dr Shekhar C. Mande" title="National President, VIBHA" imageUrl="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FBoard%20Members%20Images%2FDr%20Shekhar%20C.%20Mande.webp?alt=media&token=601c27ea-cb6b-4af7-85f8-099a344f3125" />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-8">National Advisory Board</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <PersonCard name="Prof (Dr) Rabinarayan Acharya" title="DG, CCRAS, New Delhi" imageUrl="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FBoard%20Members%20Images%2FProf%20(Dr)%20Rabinarayan%20Acharya.webp?alt=media&token=7034e1c3-af74-4d01-8b32-0e3ef0482004" />
              <PersonCard name="Prof (Dr) N. J. Muthukumar" title="DG, CCRS, Chennai" imageUrl="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FBoard%20Members%20Images%2FProf%20(Dr)%20N.%20J.%20Muthukumar.webp?alt=media&token=031f9166-3c63-4a4f-a17c-3cba85443f7c" />
              <PersonCard name="Prof (Vd) P. K. Prajapati" title="Director, AIIA, New Delhi" imageUrl="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FBoard%20Members%20Images%2FProf%20(Vd)%20P.%20K.%20Prajapati.webp?alt=media&token=88b9c3ea-38b7-4396-a499-669fc2ca44d5" />
              <PersonCard name="Prof Sanjeev Sharma" title="Vice Chancellor, NIA, Jaipur" imageUrl="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FBoard%20Members%20Images%2FProf%20Sanjeev%20Sharma.webp?alt=media&token=dedff5d1-b8e7-4255-8fa7-16daf7a3b422" />
              <PersonCard name="Prof (Dr) B. L. Mehra" title="Former Chairman, NCISM, New Delhi" imageUrl="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FBoard%20Members%20Images%2FProf%20(Dr)%20B.%20L.%20Mehra.webp?alt=media&token=e56e63b0-a201-4bb2-9d98-ad5994e2a5bd" />
              <PersonCard name="Prof (Dr) Tanuja Nesari" title="Director, ITRA, Jamnagar" imageUrl="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FBoard%20Members%20Images%2FProf%20(Dr)%20Tanuja%20Nesari.webp?alt=media&token=4b1badf5-a60d-433c-b122-306181dd2574" />
              <PersonCard name="Prof (Dr) Sujata Kadam" title="Director I/C, AIIA, Goa" imageUrl="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FBoard%20Members%20Images%2FProf%20(Dr)%20Sujata%20Kadam.webp?alt=media&token=b15ee02b-d383-41bc-8c22-ddfa82abf838" />
              <PersonCard name="Dr Shivkumar Sharma" title="National Organizing Secretary, VIBHA" imageUrl="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FBoard%20Members%20Images%2FDr%20Shivkumar%20Sharma.webp?alt=media&token=2ca44caf-7b10-4c1b-876a-abb228554b22" />
              <PersonCard name="Shri Praveen Ramadas" title="National Jt. Organizing Secretary, VIBHA" imageUrl="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FBoard%20Members%20Images%2FShri%20Praveen%20Ramadas.webp?alt=media&token=32d9aeba-0a06-43b8-b619-02a464c13d69" />
              <PersonCard name="Shri Vivekananda Pai" title="Secretary General, VIBHA" imageUrl="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FBoard%20Members%20Images%2FShri%20Vivekananda%20Pai.webp?alt=media&token=e1d841aa-56e6-47c0-b0c6-04167e848e44" />
              <PersonCard name="Shri Abga R. Babu" title="South India Organizing Secretary, VIBHA" imageUrl="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FBoard%20Members%20Images%2FShri%20Abga%20R.%20Babu.webp?alt=media&token=9646ff38-bc5e-4cb3-8be3-a25e7fe43a76" />
              <PersonCard name="Dr Manasi Malgaonkar" title="Governing Council Member, Vijnana Bharati" imageUrl="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FBoard%20Members%20Images%2FDr%20Manasi%20Malgaonkar.webp?alt=media&token=a3d64718-018e-46dd-ba14-3876074cec8d" />
              <PersonCard name="Aacharya Dr Shreevarma" title="Founder & Chairman - PCR Herbals" imageUrl="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/AyushConclave%20images%2FBoard%20Members%20Images%2FAacharya%20Dr%20Shreevarma.webp?alt=media&token=bad10147-6181-467d-a51b-5eb038393f47" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-8">Supported by</h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {supportedByLogos.map((logo, i) => (
              <div key={i} className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center bg-muted">
                <Image src={logo} alt={`Supported by logo ${i+1}`} width={100} height={100} className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-4">Submit your Abstracts!</h2>
          <p className="mb-4">Only registered participants can present their papers</p>
          <p className="mb-8">Please note that you must sign in using your registered email address to access the Abstract form.<br/>Once signed in, navigate to Abstract → Abstract Submissions to submit your abstracts.</p>
          <Button asChild>
            <Link href="/abstract/call-for-papers">Submit now</Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-4">Our Speakers</h2>
          <p className="text-muted-foreground mb-8">Our exciting speaker lineup will be announced soon</p>
          <Button asChild variant="outline">
            <Link href="/speakers">View Speakers</Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-4">Venue</h2>
          <p className="text-muted-foreground mb-2">Our location and how you can get here</p>
          <p className="font-bold mb-4">Address</p>
          <p>Heartfulness, Babuji Memorial Ashram, Manapakkam, Chennai</p>
          <p className="text-sm text-muted-foreground mb-8">Babuji Memorial Ashram, SRCM World Headquarters, Lalithamba Nagar, Manapakkam, Chennai, Tamil Nadu 600089, India, Chennai, Tamil Nadu - 600089 India</p>
          <Button asChild>
            <Link href="https://maps.app.goo.gl/3Qx2Z7ZzY5s7Y6Z1A" target="_blank">Get Directions</Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-4">Get in touch</h2>
          <p className="text-muted-foreground mb-8">Got questions? Write to us.</p>
          <Button asChild variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
