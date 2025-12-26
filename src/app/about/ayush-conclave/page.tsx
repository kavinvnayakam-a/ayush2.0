import Image from 'next/image';

export default function AyushConclavePage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl font-bold text-primary">About Ayush Conclave</h1>
       <div className="relative w-full max-w-sm mx-auto aspect-square my-8">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2F1000157891.webp?alt=media&token=4be2587a-1605-40c6-8bff-dc1472ecfe22"
          alt="Ayush Conclave Logo"
          fill
          className="object-contain"
        />
      </div>
      <p className="mt-4 text-lg text-muted-foreground">Content coming soon.</p>
    </div>
  );
}
