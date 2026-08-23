'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface HeroPhoto {
  src: string;
  alt: string;
}

export function PhotoHero({
  eyebrow,
  title,
  subtitle,
  photos,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  photos: [HeroPhoto, HeroPhoto];
}) {
  return (
    <section className="hero-photo">
      <div className="wrap hero-photo-grid">
        <motion.div
          className="hero-photo-copy"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="hero-photo-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="hero-photo-sub">{subtitle}</p>
          <Link href="/portfolio" className="dash-link">
            <span className="dash" /> Voir mon portfolio
          </Link>
        </motion.div>

        <motion.div
          className="hero-photo-visual"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-capsule hero-capsule-a">
            <Image src={photos[0].src} alt={photos[0].alt} fill sizes="(max-width: 860px) 60vw, 320px" priority className="object-cover" style={{ objectPosition: '50% 22%' }} />
          </div>
          <div className="hero-capsule hero-capsule-b">
            <Image src={photos[1].src} alt={photos[1].alt} fill sizes="(max-width: 860px) 60vw, 320px" priority className="object-cover" style={{ objectPosition: '50% 22%' }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
