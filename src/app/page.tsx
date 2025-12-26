'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, Users, Award, Mic, BarChart, BookUser, ChevronLeft, ChevronRight } from 'lucide-react';
import { CountdownTimer } from '@/components/CountdownTimer';
import { LogoIcon } from '@/components/icons';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


const StatCard = ({ icon, value, label }: { icon: React.ElementType, value: string, label: string }) => {
    const Icon = icon;
    return (
        <Card className="text-center">
            <CardContent className="pt-6">
                <Icon className="h-12 w-12 mx-auto text-primary mb-4" />
                <div className="text-4xl font-bold text-primary">{value}</div>
                <p className="text-muted-foreground mt-2">{label}</p>
            </CardContent>
        </Card>
    )
};

const PersonCard = ({ name, title, imageUrl }: { name: string, title: string, imageUrl?: string }) => (
    <div className="text-center">
        <div className="relative w-32 h-32 mx-auto bg-muted rounded-full mb-4 flex items-center justify-center">
             {/* Placeholder for image */}
        </div>
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-muted-foreground text-sm">{title}</p>
    </div>
);


export default function Home() {
  const eventDate = new Date('2026-01-09T00:00:00');
  const eventDateWithTime = new Date('2026-01-09T08:00:00');

  return (
    <div className="flex flex-col">
      <section className="relative w-full flex items-center justify-center text-center text-white bg-[#E6F0E4]">
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            <CarouselItem>
                <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
                  <div className="text-left text-primary space-y-4">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-green-900">
                      National Arogya Expo 2026
                    </h1>
                    <p className="text-lg md:text-xl text-green-800">
                      AYUSH for One Health: Bridging Tradition, Innovation and Well-being
                    </p>
                    <p className="font-semibold text-green-800">
                      Ancient Wisdom | Modern Care | Patient First
                    </p>
                    <div className="space-y-2 text-green-800">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <span>Jan 09 - 12, 2026</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span>Heartfulness, Babuji Memorial Ashram, Manapakkam, Chennai</span>
                      </div>
                    </div>
                    <CountdownTimer targetDate={eventDate} />
                    <Button size="lg" className="bg-orange-500 text-white hover:bg-orange-600">
                      Register Now
                    </Button>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="bg-white/70 p-8 rounded-full">
                      <div className="flex flex-col items-center justify-center text-primary">
                          <LogoIcon className="h-24 w-24 text-blue-500" />
                          <span className="text-2xl font-bold font-headline mt-2 text-blue-500">AyushConclave</span>
                          <p className="text-sm text-center mt-2 text-green-800">Holistic Health & One Vision</p>
                      </div>
                    </div>
                  </div>
                </div>
            </CarouselItem>
            <CarouselItem>
                <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
                  <div className="text-left text-primary space-y-4">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-green-900">
                      Arogya Expo 2026
                    </h1>
                     <div className="space-y-2 text-green-800">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <span>Jan 09 - 12, 2026</span>
                        <span className="ml-2">08:00 AM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span>Heartfulness, Babuji Memorial Ashram, Manapakkam, Chennai</span>
                      </div>
                    </div>
                    <CountdownTimer targetDate={eventDateWithTime} />
                    <Button size="lg" className="bg-orange-500 text-white hover:bg-orange-600">
                      Register Now
                    </Button>
                  </div>
                  <div className="hidden md:flex items-center justify-center">
                     <div className="bg-white/70 p-8 rounded-full">
                      <div className="flex flex-col items-center justify-center text-primary">
                          <h2 className="text-3xl font-bold font-headline text-green-900">National</h2>
                          <h1 className="text-5xl font-bold font-headline text-green-800">Arogya</h1>
                          <h2 className="text-3xl font-bold font-headline text-green-900">Expo</h2>
                          <p className="text-lg text-center mt-2 text-green-800">& Ayush Conclave 2026</p>
                      </div>
                    </div>
                  </div>
                </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/20 hover:bg-black/50 border-none" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/20 hover:bg-black/50 border-none" />
        </Carousel>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-headline text-primary mb-6">Join us to explore integrative medicine and collectively shape the future of AYUSH for global wellness.</h2>
                <p className="text-muted-foreground">NASYA is a vibrant national network of Ayurveda students and youth, connecting 100+ institutions and over 6000 members across India. Established to empower the next generation, NASYA promotes leadership, research, innovation, and collaborative learning, nurturing skilled Ayurvedic professionals committed to advancing holistic health and strengthening the AYUSH ecosystem.</p>
            </div>
            <div className="mt-12">
                <div className="aspect-video bg-muted rounded-lg w-full max-w-4xl mx-auto flex items-center justify-center">
                    <p className="text-muted-foreground">Image placeholder</p>
                </div>
            </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
              <div>
                  <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary">About national AyushConclave</h2>
                  <h3 className="text-xl md:text-2xl font-headline text-primary/80 mt-2">International AyushConclave - 2026: Transforming Ayurveda through Research, Innovation & Integration</h3>
                  <p className="mt-4 text-muted-foreground">International AyushConclave - 2026 is the first international conference dedicated to advancing Ayurveda through contemporary science. Themed "Transforming Ayurveda: Through Research, Innovation & Integration", this landmark event will bring together global experts, researchers, and practitioners to explore cutting-edge developments in Ayurvedic sciences. With eight focused scientific sessions spanning from AI and microbiome research to clinical validation and education, AyushConclave aims to bridge traditional wisdom with modern innovation.</p>
              </div>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Image placeholder</p>
              </div>
          </div>
      </section>

       <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
               <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Image placeholder</p>
              </div>
              <div>
                  <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary">AYUSH for One Health</h2>
                  <p className="mt-4 text-muted-foreground">Bridging Tradition, Innovation and Well-being” highlights the harmony between ancient healing wisdom and modern scientific advances. The theme emphasizes holistic health for humans, animals, and the environment, promoting integrative solutions that ensure sustainable wellness, evidence-based practices, and a unified approach to global well-being.</p>
              </div>
          </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
              <div>
                  <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary">Our vision</h2>
                  <p className="mt-4 text-muted-foreground">Our vision is to harmonize ancient Ayurvedic wisdom with modern scientific care, creating a healthcare ecosystem that is safe, evidence-based, accessible, and compassionate. By placing the patient at the center of every decision, we aim to advance holistic well-being and promote a future where tradition and innovation thrive together.</p>
              </div>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Image placeholder</p>
              </div>
          </div>
      </section>

      <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Image placeholder</p>
                </div>
                <div>
                    <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary">National Arogya Expo 2026</h2>
                    <p className="mt-4 text-muted-foreground">The National Arogya Expo 2026 will showcase India’s rich AYUSH heritage through medicinal products, wellness therapies, healthcare technologies, and interactive demonstrations. Bringing together practitioners, industries, startups, researchers, and the public, the expo promotes evidence-based traditional medicine, holistic well-being, innovative solutions, and opportunities for collaboration in the growing AYUSH sector.</p>
                </div>
              </div>

              <div className="mt-16 text-center">
                <h3 className="text-2xl font-headline font-semibold text-primary">EXPECTED FOOTFALL</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 mt-8">
                    <StatCard icon={Users} value="15,000+" label="Expected visitors per day" />
                    <StatCard icon={Users} value="1,500" label="Delegates from across India" />
                    <StatCard icon={Award} value="150+" label="Research Scholars & Experts" />
                    <StatCard icon={Award} value="40+" label="National and International Eminent personalities" />
                    <StatCard icon={Mic} value="50+" label="Scientific Sessions on AYUSH System" />
                    <StatCard icon={BarChart} value="30+" label="Curtain raisers across India and Associate events" />
                </div>
              </div>
          </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary mb-12">Leadership</h2>
            <div className="mb-12">
                <h3 className="text-2xl font-headline text-primary/90 mb-8">Chief Patron</h3>
                <PersonCard name="Hon'ble Shri Prataprao Jadhav" title="Union Minister, Ministry of AYUSH, Government of India" />
            </div>

            <div className="mb-12">
                <h3 className="text-2xl font-headline text-primary/90 mb-8">Patron</h3>
                <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
                    <PersonCard name="Vaidya Rajesh Kotecha" title="Secretary, Ministry of AYUSH, GOI" />
                    <PersonCard name="Dr Shekhar C. Mande" title="National President, VIBHA" />
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-headline text-primary/90 mb-8">National Advisory Board</h3>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12">
                    <PersonCard name="Prof (Dr) Rabinarayan Acharya" title="DG, CCRAS, New Delhi" />
                    <PersonCard name="Prof (Dr) N. J. Muthukumar" title="DG, CCRS, Chennai" />
                    <PersonCard name="Prof (Vd) P. K. Prajapati" title="Director, AIIA, New Delhi" />
                    <PersonCard name="Prof Sanjeev Sharma" title="Vice Chancellor, NIA, Jaipur" />
                    <PersonCard name="Prof (Dr) B. L. Mehra" title="Former Chairman, NCISM, New Delhi" />
                    <PersonCard name="Prof (Dr) Tanuja Nesari" title="Director, ITRA, Jamnagar" />
                    <PersonCard name="Prof (Dr) Sujata Kadam" title="Director I/C, AIIA, Goa" />
                    <PersonCard name="Dr Shivkumar Sharma" title="National Organizing Secretary, VIBHA" />
                    <PersonCard name="Shri Praveen Ramadas" title="National Jt. Organizing Secretary, VIBHA" />
                    <PersonCard name="Shri Vivekananda Pai" title="Secretary General, VIBHA" />
                    <PersonCard name="Shri Abga R. Babu" title="South India Organizing Secretary, VIBHA" />
                    <PersonCard name="Dr Manasi Malgaonkar" title="Governing Council Member, Vijnana Bharati" />
                    <PersonCard name="Aacharya Dr Shreevarma" title="Founder & Chairman - PCR Herbals CMD - Wellness by Heartfulness" />
                </div>
            </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary">Supported by</h2>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-24 bg-muted rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Logo</p>
                    </div>
                ))}
            </div>
          </div>
      </section>
      
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-primary font-headline text-3xl">Submit your Abstracts!</CardTitle>
              <CardDescription>Only registered participants can present their papers</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Please note that you must sign in using your registered email address to access the Abstract form. Once signed in, navigate to Abstract → Abstract Submissions to submit your abstracts.</p>
              <Button size="lg" className="mt-6">Submit now</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary">Our Speakers</h2>
            <p className="mt-2 text-lg text-muted-foreground">Exciting speakers to follow at the event</p>
             <div className="mt-12 max-w-md mx-auto text-center p-8 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Our exciting speaker lineup will be announced soon</p>
             </div>
            <Button variant="outline" size="lg" className="mt-8">
                View Speakers
            </Button>
          </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary">Venue</h2>
                <p className="mt-2 text-lg text-muted-foreground">Our location and how you can get here</p>

                <div className="mt-6 space-y-4">
                    <div>
                        <h3 className="font-semibold">Address</h3>
                        <p className="text-muted-foreground">Heartfulness, Babuji Memorial Ashram, Manapakkam, Chennai</p>
                        <p className="text-muted-foreground text-sm">Babuji Memorial Ashram, SRCM World Headquarters, Lalithamba Nagar, Manapakkam, Chennai, Tamil Nadu 600089, India, Chennai, Tamil Nadu - 600089 India</p>
                    </div>
                    <Button variant="link" className="p-0 h-auto">Get Directions <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </div>
            </div>
             <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Map placeholder</p>
            </div>
          </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary">Get in touch</h2>
            <p className="mt-2 text-lg text-muted-foreground">Got questions? Write to us.</p>
             <Button size="lg" className="mt-8">Contact Us</Button>
        </div>
      </section>

    </div>
  );
}
