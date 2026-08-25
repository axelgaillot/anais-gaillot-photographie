'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/reveal';
import { withBasePath } from '@/lib/utils';

interface Photo {
  src: string;
  alt: string;
}

const ORIGINAL_PHOTOS: Photo[] = [
  { src: '/images/portfolio-1.jpg', alt: 'Séance grossesse, portrait rapproché' },
  { src: '/images/portfolio-2.jpg', alt: "Séance grossesse, profil au pied d'un arbre" },
  { src: '/images/portfolio-3.jpg', alt: 'Séance grossesse, détail des mains' },
  { src: '/images/portfolio-4.jpg', alt: 'Séance grossesse, portrait lumière dorée' },
  { src: '/images/portfolio-5.jpg', alt: 'Séance grossesse, sourire complice' },
  { src: '/images/portfolio-6.jpg', alt: 'Séance grossesse, assise contre un arbre' },
  { src: '/images/portfolio-7.jpg', alt: 'Séance grossesse, détail fleurs et tatouages' },
];

const ALBUMS: { prefix: string; count: number; label: string; exclude?: number[] }[] = [
  { prefix: 'alex', count: 29, label: 'Séance Alex' },
  {
    prefix: 'cocon-marine',
    count: 76,
    label: 'Séance Dans le cocon de Marine',
    exclude: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 28, 29, 30, 35, 36, 73, 74, 75, 76],
  },
  { prefix: 'faustine', count: 21, label: 'Séance Faustine' },
  { prefix: 'lexie', count: 45, label: 'Séance Lexie, maman & papa' },
];

const ALBUM_PHOTOS: Photo[] = ALBUMS.flatMap((album) =>
  Array.from({ length: album.count }, (_, i) => i + 1)
    .filter((n) => !album.exclude?.includes(n))
    .map((n) => {
      const num = String(n).padStart(2, '0');
      return {
        src: `/images/portfolio/${album.prefix}-${num}.jpg`,
        alt: `${album.label}, photo ${n}`,
      };
    })
);

const PHOTOS: Photo[] = [...ORIGINAL_PHOTOS, ...ALBUM_PHOTOS];

export function PortfolioGallery() {
  const [active, setActive] = useState<Photo | null>(null);

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
            <Image src={withBasePath(photo.src)} alt={photo.alt} width={800} height={1200} loading="lazy" />
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
          {active && <Image src={withBasePath(active.src)} alt={active.alt} width={1200} height={1600} />}
        </div>
      </div>
    </>
  );
}
