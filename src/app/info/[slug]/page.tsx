import { infoPages } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type InfoPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return infoPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: InfoPageProps) {
  const page = infoPages.find((p) => p.slug === params.slug);

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: `${page.title} | AyushConclave`,
    description: page.content.substring(0, 150) + '...',
  };
}

export default function InfoPage({ params }: InfoPageProps) {
  const page = infoPages.find((p) => p.slug === params.slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-8">
            <Link href="/#highlights">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to all topics
            </Link>
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl font-headline text-primary">{page.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none text-foreground/90">
              <p>{page.content}</p>
              {/* You can expand this to support full markdown or more complex content structures */}
              <p className="mt-6 text-muted-foreground">
                This page provides a brief overview of {page.title}. For more detailed information, we recommend attending our expert workshops and seminars at the Arogya Expo.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
