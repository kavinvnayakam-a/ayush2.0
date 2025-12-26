import Image from 'next/image';

export default function ArogyaExpoPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl font-bold text-primary">About Arogya Expo</h1>
      <div className="relative w-full max-w-sm mx-auto aspect-square my-8">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FAYUSH%20for%20One%20Health.webp?alt=media&token=79f49573-f5a2-4206-9b42-9bedecd093ff"
          alt="Arogya Expo Logo"
          fill
          className="object-contain"
        />
      </div>
      <p className="mt-4 text-lg text-muted-foreground">Content coming soon.</p>
    </div>
  );
}
