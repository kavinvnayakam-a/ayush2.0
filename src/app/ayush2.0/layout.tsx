import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "World Ayurveda Congress Satellite Seminar | Dr. Shreevarma",
  description: "Register for the World Ayurveda Congress Satellite Seminar: A Day of Knowledge, Tradition, and Wellness. Join us on November 21, 2026, at Casa De Gomez, Puducherry.",
  openGraph: {
    title: "World Ayurveda Congress Satellite Seminar",
    description: "Register for the World Ayurveda Congress Satellite Seminar: A Day of Knowledge, Tradition, and Wellness. November 21, 2026.",
    type: "website",
  }
};

export default function Ayush20Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}