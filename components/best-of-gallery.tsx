'use client';

import { useEffect, useRef, useState, MouseEvent as ReactMouseEvent } from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/reveal';

interface Photo {
  src: string;
  alt: string;
}

const BEST_OF: Photo[] = [
  { src: '/images/portfolio/alex-03.jpg', alt: 'Séance Alex, portrait naturel' },
  { src: '/images/portfolio/cocon-marine-04.jpg', alt: 'Séance Dans le cocon de Marine, instant tendre' },
  { src: '/images/portfolio/faustine-02.jpg', alt: 'Séance Faustine, portrait lumineux' },
  { src: '/images/portfolio/lexie-05.jpg', alt: 'Séance Lexie, maman & papa, complicité' },
  { src: '/images/portfolio/alex-08.jpg', alt: 'Séance Alex, sourire complice' },
  { src: '/images/portfolio/cocon-marine-09.jpg', alt: 'Séance Dans le cocon de Marine, douceur' },
  { src: '/images/portfolio/faustine-07.jpg', alt: 'Séance Faustine, regard' },
  { src: '/images/portfolio/lexie-15.jpg', alt: 'Séance Lexie, maman & papa, tendresse' },
  { src: '/images/portfolio/alex-14.jpg', alt: 'Séance Alex, lumière dorée' },
  { src: '/images/portfolio/cocon-marine-44.jpg', alt: 'Séance Dans le cocon de Marine, détail fleurs' },
  { src: '/images/portfolio/faustine-12.jpg', alt: 'Séance Faustine, portrait profil' },
  { src: '/images/portfolio/lexie-25.jpg', alt: 'Séance Lexie, maman & papa, moment complice' },
  { src: '/images/portfolio/alex-20.jpg', alt: 'Séance Alex, portrait extérieur' },
  { src: '/images/portfolio/cocon-marine-51.jpg', alt: 'Séance Dans le cocon de Marine, portrait doux' },
  { src: '/images/portfolio/faustine-17.jpg', alt: 'Séance Faustine, portrait rieur' },
  { src: '/images/portfolio/lexie-35.jpg', alt: 'Séance Lexie, maman & papa, câlin' },
  { src: '/images/portfolio/alex-24.jpg', alt: 'Séance Alex, portrait rieur avec une fleur' },
  { src: '/images/portfolio/cocon-marine-60.jpg', alt: 'Séance Dans le cocon de Marine, instant naturel' },
  { src: '/images/portfolio/lexie-45.jpg', alt: 'Séance Lexie, maman & papa, portrait final' },
  { src: '/images/portfolio/cocon-marine-67.jpg', alt: 'Séance Dans le cocon de Marine, lumière douce' },
];

export function BestOfGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const dragMoved = useRef(false);

  const onDragStart = (e: ReactMouseEvent) => {
    const strip = stripRef.current;
    if (!strip) return;
    isDraggingRef.current = true;
    setDragging(true);
    dragMoved.current = false;
    dragStartX.current = e.pageX;
    dragStartScroll.current = strip.scrollLeft;
  };

  const onDragMove = (e: ReactMouseEvent) => {
    const strip = stripRef.current;
    if (!strip || !isDraggingRef.current) return;
    e.preventDefault();
    const delta = e.pageX - dragStartX.current;
    if (Math.abs(delta) > 5) dragMoved.current = true;
    strip.scrollLeft = dragStartScroll.current - delta;
  };

  const onDragEnd = () => {
    isDraggingRef.current = false;
    setDragging(false);
  };

  const handleItemClick = (i: number) => {
    if (dragMoved.current) {
      dragMoved.current = false;
      return;
    }
    setActiveIndex(i);
  };

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || !('IntersectionObserver' in window)) return;

    const animateScrollTo = (from: number, target: number, duration: number) => {
      const change = target - from;
      const startTime = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        strip.scrollLeft = from + change * eased;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    let isPeeking = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isPeeking && !isDraggingRef.current) {
            isPeeking = true;
            const restPos = strip.scrollLeft;
            animateScrollTo(restPos, restPos + 240, 2000);
            setTimeout(() => {
              animateScrollTo(restPos + 240, restPos, 2000);
              setTimeout(() => {
                isPeeking = false;
              }, 2000);
            }, 2700);
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(strip);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowRight') setActiveIndex((i) => (i === null ? i : (i + 1) % BEST_OF.length));
      if (e.key === 'ArrowLeft') setActiveIndex((i) => (i === null ? i : (i - 1 + BEST_OF.length) % BEST_OF.length));
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [activeIndex]);

  const active = activeIndex === null ? null : BEST_OF[activeIndex];

  return (
    <>
      <Reveal className="bestof-strip-wrap">
        <div
          ref={stripRef}
          className={`bestof-strip ${dragging ? 'dragging' : ''}`}
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
        >
          {BEST_OF.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              className="bestof-item"
              style={{ transitionDelay: `${Math.min(i * 70, 700)}ms` }}
              onClick={() => handleItemClick(i)}
              aria-label={photo.alt}
            >
              <Image src={photo.src} alt={photo.alt} width={480} height={640} loading="lazy" draggable={false} />
            </button>
          ))}
        </div>
      </Reveal>

      <div className={`bestof-lightbox ${active ? 'active' : ''}`} onClick={() => setActiveIndex(null)}>
        <button
          className="lightbox-close"
          aria-label="Fermer"
          onClick={(e) => {
            e.stopPropagation();
            setActiveIndex(null);
          }}
        >
          &times;
        </button>
        <button
          className="bestof-nav bestof-nav-prev"
          aria-label="Photo précédente"
          onClick={(e) => {
            e.stopPropagation();
            setActiveIndex((i) => (i === null ? i : (i - 1 + BEST_OF.length) % BEST_OF.length));
          }}
        >
          &#8249;
        </button>
        <div className="lightbox-frame" onClick={(e) => e.stopPropagation()}>
          {active && <Image src={active.src} alt={active.alt} width={1200} height={1600} />}
        </div>
        <button
          className="bestof-nav bestof-nav-next"
          aria-label="Photo suivante"
          onClick={(e) => {
            e.stopPropagation();
            setActiveIndex((i) => (i === null ? i : (i + 1) % BEST_OF.length));
          }}
        >
          &#8250;
        </button>
      </div>
    </>
  );
}
