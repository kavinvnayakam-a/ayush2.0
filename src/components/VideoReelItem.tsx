'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface VideoReelItemProps {
  videoSrc: string;
  link: string;
}

export function VideoReelItem({ videoSrc, link }: VideoReelItemProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.8 } // Start playing when 80% of the video is visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isIntersecting) {
      videoRef.current?.play();
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isIntersecting]);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation when clicking the button
    e.stopPropagation(); // Stop event from bubbling up to the Link component
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="h-full w-full snap-start relative flex items-center justify-center bg-black">
      <Link href={link} className="w-full h-full">
        <video
          ref={videoRef}
          src={videoSrc}
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          onClick={(e) => {
             e.preventDefault();
             togglePlay(e);
          }}
        />
      </Link>
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      <button
        onClick={togglePlay}
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-4 bg-white/20 backdrop-blur-md rounded-full text-white transition-opacity",
          isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
        )}
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
      </button>
    </div>
  );
}
