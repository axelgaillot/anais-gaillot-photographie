'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useHeroReveal } from '@/components/intro-splash';

interface HeroPhoto {
  src: string;
  alt: string;
}

const copyContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};

const visualContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.24, delayChildren: 0.6 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
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
  const reveal = useHeroReveal();
  const revealState = reveal ? 'show' : 'hidden';

  return (
    <section className={`hero-photo ${sky ? 'hero-photo-sky' : ''}`}>
      {sky && (
        <div className="hero-sky" aria-hidden="true">
          <div className="hero-sky-clouds" />
        </div>
      )}
      <div className="wrap hero-photo-grid">
        <motion.div
          className="hero-photo-copy"
          variants={copyContainer}
          initial="hidden"
          animate={revealState}
        >
          <motion.p variants={item} className="hero-photo-eyebrow">
            {eyebrow}
          </motion.p>
          <motion.h1 variants={item}>{title}</motion.h1>
          <motion.p variants={item} className="hero-photo-sub">
            {subtitle}
          </motion.p>
          <motion.div variants={item} style={{ display: 'inline-block' }}>
            <Link href="/portfolio" className="dash-link">
              <span className="dash" /> Voir mon portfolio
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-photo-visual"
          variants={visualContainer}
          initial="hidden"
          animate={revealState}
        >
          <motion.div variants={item} className="hero-capsule hero-capsule-a">
            <Image src={photos[0].src} alt={photos[0].alt} fill sizes="(max-width: 860px) 60vw, 320px" priority className="object-cover" style={{ objectPosition: '50% 22%' }} />
          </motion.div>
          <motion.div variants={item} className="hero-capsule hero-capsule-b">
            <Image src={photos[1].src} alt={photos[1].alt} fill sizes="(max-width: 860px) 60vw, 320px" priority className="object-cover" style={{ objectPosition: '50% 22%' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
