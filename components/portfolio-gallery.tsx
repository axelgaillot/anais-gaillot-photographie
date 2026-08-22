'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/reveal';

const PHOTOS = [
  { src: '/images/portfolio-1.jpg', alt: 'Séance grossesse, portrait rapproché' },
  { src: '/images/portfolio-2.jpg', alt: "Séance grossesse, profil au pied d'un arbre" },
  { src: '/images/portfolio-3.jpg', alt: 'Séance grossesse, détail des mains' },
  { src: '/images/portfolio-4.jpg', alt: 'Séance grossesse, portrait lumière dorée' },
  { src: '/images/portfolio-5.jpg', alt: 'Séance grossesse, sourire complice' },
  { src: '/images/portfolio-6.jpg', alt: 'Séance grossesse, assise contre un arbre' },
  { src: '/images/portfolio-7.jpg', alt: 'Séance grossesse, détail fleurs et tatouages' },
];

export function PortfolioGallery() {
  const [active, setActive] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!active) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setActive(null);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <>
      <Reveal stagger className="frame-grid">
        {PHOTOS.map((photo) => (
          <div className="frame" key={photo.src} onClick={() => setActive(photo)}>
            <Image src={photo.src} alt={photo.alt} width={800} height={1200} />
          </div>
        ))}
      </Reveal>

      <div className={`lightbox ${active ? 'active' : ''}`} onClick={() => setActive(null)}>
        <button
          className="lightbox-close"
          aria-label="Fermer"
          onClick={(e) => {
            e.stopPropagation();
            setActive(null);
          }}
        >
          &times;
        </button>
        <div className="lightbox-frame" onClick={(e) => e.stopPropagation()}>
          {active && (
            <Image src={active.src} alt={active.alt} width={1200} height={1600} />
          )}
        </div>
      </div>
    </>
  );
}
