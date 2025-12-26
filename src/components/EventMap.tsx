'use client';

import React from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 12.9934,
  lng: 80.1706,
};

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#7c939d' }, { lightness: '-20' }],
    },
    {
      featureType: 'all',
      elementType: 'labels.text.stroke',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'all',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [{ color: '#f0f0f0' }],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#e0e0e0' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#ffffff' }],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#e0e0e0' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#c0d8d8' }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [{ color: "#d8d8d8" }]
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ "color": "#d8d8d8" }, { "weight": 0.5 }]
    },
  ],
};

const libraries: ('marker' | 'places')[] = ['marker', 'places'];

export function EventMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  if (loadError) return <div className="flex items-center justify-center h-full bg-destructive/10 text-destructive">Error loading map</div>;
  if (!isLoaded) return <div className="flex items-center justify-center h-full bg-muted">Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={center}
      options={mapOptions}
    >
      <MarkerF position={center} title="Babuji Memorial Ashram, Manapakkam, Chennai" />
    </GoogleMap>
  );
}
