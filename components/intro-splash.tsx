'use client';

import {
  useEffect,
  useRef,
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
  const [dismissed, setDismissed] = useState(false);

  const targetProgress = useRef(0);
  const displayProgress = useRef(0);
  const rafId = useRef<number | null>(null);
  const touchStartY = useRef(0);
  const fullyExpandedRef = useRef(false);

  useEffect(() => {
    document.body.classList.add('intro-active');
    return () => document.body.classList.remove('intro-active');
  }, []);

  useEffect(() => {
    if (dismissed) document.body.classList.remove('intro-active');
  }, [dismissed]);

  useEffect(() => {
    if (dismissed) return;

    const tick = () => {
      const diff = targetProgress.current - displayProgress.current;
      displayProgress.current += diff * 0.14;
      if (Math.abs(diff) < 0.0005) displayProgress.current = targetProgress.current;
      setScrollProgress(displayProgress.current);

      if (displayProgress.current >= 0.999 && !fullyExpandedRef.current) {
        fullyExpandedRef.current = true;
        setFullyExpanded(true);
        setShowContent(true);
      }

      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [dismissed]);

  useEffect(() => {
    if (dismissed) return;

    const handleWheel = (e: WheelEvent) => {
      if (fullyExpandedRef.current && e.deltaY < 0 && window.scrollY <= 5) {
        fullyExpandedRef.current = false;
        setFullyExpanded(false);
        targetProgress.current = 0.9;
        e.preventDefault();
      } else if (!fullyExpandedRef.current) {
        e.preventDefault();
        const cappedDelta = Math.max(Math.min(e.deltaY, 100), -100);
        targetProgress.current = Math.min(Math.max(targetProgress.current + cappedDelta * 0.0009, 0), 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY.current) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchY;

      if (fullyExpandedRef.current && deltaY < -20 && window.scrollY <= 5) {
        fullyExpandedRef.current = false;
        setFullyExpanded(false);
        targetProgress.current = 0.9;
        e.preventDefault();
      } else if (!fullyExpandedRef.current) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.0035 : 0.0028;
        targetProgress.current = Math.min(Math.max(targetProgress.current + deltaY * scrollFactor, 0), 1);
        touchStartY.current = touchY;
      }
    };

    const handleTouchEnd = () => {
      touchStartY.current = 0;
    };

    const handleScroll = () => {
      if (!fullyExpandedRef.current) window.scrollTo(0, 0);
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
  }, [dismissed]);

  useEffect(() => {
    if (fullyExpanded) {
      const t = setTimeout(() => setDismissed(true), 900);
      return () => clearTimeout(t);
    }
  }, [fullyExpanded]);

  if (dismissed) return <>{children}</>;

  // Diving into the image: it scales up well past the viewport while the
  // welcome text stretches apart and fades, then the site fades in beneath.
  const bgScale = 1 + scrollProgress * 2.4;
  const bgBlur = scrollProgress * 6;
  const textShift = scrollProgress * 70;
  const textOpacity = Math.max(1 - scrollProgress * 1.5, 0);

  return (
    <div className="intro-splash">
      <section
        className="intro-splash-stage"
        style={{ opacity: fullyExpanded ? 0 : 1, transition: 'opacity 0.6s var(--ease-premium)' }}
      >
        <Image
          src="/images/intro-welcome.jpg"
          alt="Bienvenue dans l'univers de Kodascreen"
          fill
          priority
          className="intro-splash-bg"
          style={{
            filter: `blur(${bgBlur}px)`,
            transform: `scale(${bgScale})`,
          }}
        />

        <div className="intro-splash-copy">
          <span
            className="intro-splash-copy-part"
            style={{ transform: `translateX(-${textShift}vw)`, opacity: textOpacity }}
          >
            Bienvenue dans l&apos;univers
          </span>
          <span
            className="intro-splash-copy-part"
            style={{ transform: `translateX(${textShift}vw)`, opacity: textOpacity }}
          >
            de Kodascreen
          </span>
        </div>

        <p className="intro-splash-hint" style={{ opacity: 0.85 - scrollProgress * 2 }}>
          Faites défiler pour entrer
        </p>
      </section>

      <div style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.9s var(--ease-premium)' }}>
        {children}
      </div>
    </div>
  );
}
