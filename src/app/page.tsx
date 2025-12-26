'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { eventHighlights, featuredExhibitors } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { CountdownTimer } from '@/components/CountdownTimer';
import { LogoIcon } from '@/components/icons';


export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'about');
  const eventDate = new Date('2026-01-09T00:00:00');

  return (
    <div className="flex flex-col">
      <section className="relative w-full flex items-center justify-center text-center text-white bg-[#E6F0E4]">
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
      </section>

      <section id="about" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary">About the Expo</h2>
              <p className="text-lg text-muted-foreground">
                The Arogya Expo is a premier event dedicated to showcasing the vast potential of AYUSH systems of medicine - Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homoeopathy.
              </p>
              <p className="text-muted-foreground">
                Our mission is to foster a holistic approach to health and wellness, bringing together practitioners, researchers, manufacturers, and the public to explore, learn, and collaborate.
              </p>
              <Button asChild variant="link" className="p-0 h-auto text-primary text-lg">
                <Link href="/info/about-ayush">Learn more about AYUSH <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-xl">
              {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={aboutImage.imageHint}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="highlights" className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold">Event Highlights</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience a rich program of activities designed to enlighten and inspire.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {eventHighlights.map((highlight) => (
              <Card key={highlight.title} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                       <highlight.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl font-headline">{highlight.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="exhibitors" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary">Featured Exhibitors</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with leading brands and practitioners in the wellness industry.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredExhibitors.map((exhibitor) => {
              const exhibitorImage = PlaceHolderImages.find(img => img.id === exhibitor.imageId);
              return (
                <Card key={exhibitor.name} className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    {exhibitorImage && (
                       <Image
                          src={exhibitorImage.imageUrl}
                          alt={exhibitor.name}
                          fill
                          className="object-cover"
                          data-ai-hint={exhibitorImage.imageHint}
                        />
                    )}
                  </div>
                  <CardContent className="p-6 text-left">
                    <h3 className="text-xl font-headline font-semibold">{exhibitor.name}</h3>
                    <p className="text-muted-foreground mt-2">{exhibitor.description}</p>
                    <Badge variant="secondary" className="mt-4">{exhibitor.category}</Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <Button asChild variant="outline" size="lg" className="mt-12">
            <Link href="/map">
              View All Exhibitors <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
