'use client';

import {
  useEffect,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from 'react';
import Image from 'next/image';

export function IntroSplash({ children }: { children: ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [fullyExpanded, setFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const handleWheel = (e: WheelEvent) => {
      if (fullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setFullyExpanded(false);
        e.preventDefault();
      } else if (!fullyExpanded) {
        e.preventDefault();
        const newProgress = Math.min(Math.max(scrollProgress + e.deltaY * 0.001, 0), 1);
        setScrollProgress(newProgress);
        if (newProgress >= 1) {
          setFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => setTouchStartY(e.touches[0].clientY);

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (fullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setFullyExpanded(false);
        e.preventDefault();
      } else if (!fullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.009 : 0.006;
        const newProgress = Math.min(Math.max(scrollProgress + deltaY * scrollFactor, 0), 1);
        setScrollProgress(newProgress);
        if (newProgress >= 1) {
          setFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => setTouchStartY(0);

    const handleScroll = () => {
      if (!fullyExpanded) window.scrollTo(0, 0);
    };

    window.addEventListener('wheel', handleWheel as unknown as EventListener, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart as unknown as EventListener, { passive: false });
    window.addEventListener('touchmove', handleTouchMove as unknown as EventListener, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel as unknown as EventListener);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart as unknown as EventListener);
      window.removeEventListener('touchmove', handleTouchMove as unknown as EventListener);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollProgress, fullyExpanded, touchStartY, dismissed]);

  useEffect(() => {
    if (fullyExpanded) {
      const t = setTimeout(() => setDismissed(true), 1000);
      return () => clearTimeout(t);
    }
  }, [fullyExpanded]);

  if (dismissed) return <>{children}</>;

  const mediaWidth = 300 + scrollProgress * 900;
  const mediaHeight = 200 + scrollProgress * 560;
  const radius = 20 - scrollProgress * 20;

  return (
    <div className="intro-splash">
      <section
        className="intro-splash-stage"
        style={{ opacity: fullyExpanded ? 0 : 1, transition: 'opacity 0.7s var(--ease-premium)' }}
      >
        <div
          className="intro-splash-media"
          style={{ width: `${mediaWidth}px`, height: `${mediaHeight}px`, borderRadius: `${radius}px` }}
        >
          <Image
            src="/images/intro-welcome.jpg"
            alt="Bienvenue dans l'univers de Kodascreen"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="intro-splash-copy" style={{ opacity: 0.55 + scrollProgress * 0.45 }}>
          <p className="intro-splash-eyebrow">Bienvenue dans l&apos;univers de</p>
          <h1>Kodascreen</h1>
          <p className="intro-splash-hint">Faites défiler pour entrer</p>
        </div>
      </section>

      <div style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.9s var(--ease-premium)' }}>
        {children}
      </div>
    </div>
  );
}
