import Image from "next/image";

export default function OrganisersPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl font-bold text-primary">Organisers</h1>
      <p className="mt-4 text-lg text-muted-foreground">Content coming soon.</p>

      <section className="py-8 bg-transparent">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-primary">Supported By</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="flex justify-center">
              <div className="w-32 h-32 relative">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FSupported%20by%20logos%2Fpreview.webp?alt=media&token=3dc567d4-b3da-4f76-b4cd-dfc8e935049a"
                  alt="Partner 1"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-32 h-32 relative">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FSupported%20by%20logos%2FNasya.webp?alt=media&token=e71b53e2-130a-41f1-87e4-e8e6d51938bc"
                  alt="Partner 2"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-32 h-32 relative">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FSupported%20by%20logos%2FHeartfulness.webp?alt=media&token=dae70f60-e8cc-48cd-8317-8379e6ef818c"
                  alt="Partner 3"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-32 h-32 relative">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FSupported%20by%20logos%2FVibha.webp?alt=media&token=19ef4dd0-2d8c-4fea-a2da-1aa0c8fefd0c"
                  alt="Partner 4"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-[hsl(93,45%,44%)] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">NASYA</h2>
          <p className="max-w-4xl mx-auto">
            NASYA is a vibrant national network of Ayurveda students and youth, connecting 100+ institutions and over 6000 members across India. Established to empower the next generation, NASYA promotes leadership, research, innovation, and collaborative learning, nurturing skilled Ayurvedic professionals committed to advancing holistic health and strengthening the AYUSH ecosystem.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 text-center">
        <h2 className="text-3xl font-bold mb-8 text-primary">Our Vision</h2>
        <div className="relative w-full max-w-xs mx-auto aspect-square">
            <Image 
                src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FOur%20vision.webp?alt=media&token=c568e396-21f1-4771-a361-3efaff9cb909"
                alt="Our Vision"
                fill
                className="object-contain"
            />
        </div>
        <p className="mt-8 text-lg text-muted-foreground max-w-3xl mx-auto">
          Join us to explore integrative medicine and collectively shape the future of AYUSH for global wellness.
        </p>
      </section>
    </div>
  );
}
