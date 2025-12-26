'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { mapExhibitors } from '@/lib/data';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

export default function MapPage() {
  const mapImage = PlaceHolderImages.find((img) => img.id === 'map');

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Expo Interactive Map</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore the Arogya Expo floor plan. Click on any pin to see details about exhibitors and key locations.
        </p>
      </div>

      <div className="relative w-full max-w-6xl mx-auto aspect-[3/2] rounded-lg shadow-xl overflow-hidden border">
        {mapImage && (
          <Image
            src={mapImage.imageUrl}
            alt={mapImage.description}
            fill
            className="object-cover"
            data-ai-hint={mapImage.imageHint}
          />
        )}
        {mapExhibitors.map((exhibitor) => (
          <Popover key={exhibitor.id}>
            <PopoverTrigger asChild>
              <button
                className="absolute transform -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                style={{ top: exhibitor.y, left: exhibitor.x }}
                aria-label={`Location of ${exhibitor.name}`}
              >
                <MapPin
                  className={`h-8 w-8 drop-shadow-lg transition-transform hover:scale-125 ${
                    exhibitor.category === 'Key Location'
                      ? 'text-accent'
                      : 'text-primary'
                  }`}
                  strokeWidth={2}
                  fill="white"
                />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="space-y-2">
                <h3 className="font-semibold font-headline">{exhibitor.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Booth: <span className="font-medium text-foreground">{exhibitor.booth}</span>
                </p>
                <Badge variant={exhibitor.category === 'Key Location' ? 'default' : 'secondary'}>
                  {exhibitor.category}
                </Badge>
              </div>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  );
}
