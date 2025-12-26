import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { eventHighlights, featuredExhibitors } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'about');

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl p-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter text-shadow-lg">
            Welcome to AyushConclave - Arogya Expo
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-shadow">
            Discover the synergy of traditional wisdom and modern wellness.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/register">
              Register Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
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
