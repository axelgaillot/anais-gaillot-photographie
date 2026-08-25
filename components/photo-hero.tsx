'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { subscribeHeroProgress } from '@/lib/hero-progress';

interface HeroPhoto {
  src: string;
  alt: string;
}

type Range = [number, number];

function applyReveal(el: HTMLElement | null, p: number, [start, end]: Range) {
  if (!el) return;
  const local = Math.max(0, Math.min((p - start) / (end - start), 1));
  const eased = 1 - Math.pow(1 - local, 4);
  el.style.opacity = String(eased);
  el.style.transform = `translateY(${(1 - eased) * 26}px)`;
}

const RANGES: Record<'eyebrow' | 'title' | 'subtitle' | 'link' | 'capsuleA' | 'capsuleB', Range> = {
  eyebrow: [0, 0.35],
  title: [0.1, 0.45],
  subtitle: [0.2, 0.55],
  link: [0.3, 0.65],
  capsuleA: [0.35, 0.8],
  capsuleB: [0.5, 1],
};

export function PhotoHero({
  eyebrow,
  title,
  subtitle,
  photos,
  sky = false,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  photos: [HeroPhoto, HeroPhoto];
  sky?: boolean;
}) {
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const linkRef = useRef<HTMLDivElement | null>(null);
  const capsuleARef = useRef<HTMLDivElement | null>(null);
  const capsuleBRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return subscribeHeroProgress((p) => {
      applyReveal(eyebrowRef.current, p, RANGES.eyebrow);
      applyReveal(titleRef.current, p, RANGES.title);
      applyReveal(subtitleRef.current, p, RANGES.subtitle);
      applyReveal(linkRef.current, p, RANGES.link);
      applyReveal(capsuleARef.current, p, RANGES.capsuleA);
      applyReveal(capsuleBRef.current, p, RANGES.capsuleB);
    });
  }, []);

  return (
    <section className={`hero-photo ${sky ? 'hero-photo-sky' : ''}`}>
      {sky && (
        <div className="hero-sky" aria-hidden="true">
          <div className="hero-sky-clouds" />
        </div>
      )}
      <div className="wrap hero-photo-grid">
        <div className="hero-photo-copy">
          <p ref={eyebrowRef} className="hero-photo-eyebrow" style={{ opacity: 0 }}>
            {eyebrow}
          </p>
          <h1 ref={titleRef} style={{ opacity: 0 }}>
            {title}
          </h1>
          <p ref={subtitleRef} className="hero-photo-sub" style={{ opacity: 0 }}>
            {subtitle}
          </p>
          <div ref={linkRef} style={{ display: 'inline-block', opacity: 0 }}>
            <Link href="/portfolio" className="dash-link">
              <span className="dash" /> Voir mon portfolio
            </Link>
          </div>
        </div>

        <div className="hero-photo-visual">
          <div ref={capsuleARef} className="hero-capsule-a" style={{ opacity: 0 }}>
            <div className="hero-capsule">
              <Image
                src={photos[0].src}
                alt={photos[0].alt}
                fill
                sizes="(max-width: 860px) 60vw, 320px"
                priority
                className="object-cover"
                style={{ objectPosition: '50% 22%' }}
              />
            </div>
          </div>
          <div ref={capsuleBRef} className="hero-capsule-b" style={{ opacity: 0 }}>
            <div className="hero-capsule">
              <Image
                src={photos[1].src}
                alt={photos[1].alt}
                fill
                sizes="(max-width: 860px) 60vw, 320px"
                priority
                className="object-cover"
                style={{ objectPosition: '50% 22%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
