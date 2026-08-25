'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from 'react';
import Image from 'next/image';

export const HeroRevealContext = createContext(true);
export const useHeroReveal = () => useContext(HeroRevealContext);

export function IntroSplash({ children }: { children: ReactNode }) {
  const [showContent, setShowContent] = useState(false);
  const [fullyExpanded, setFullyExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const targetProgress = useRef(0);
  const displayProgress = useRef(0);
  const rafId = useRef<number | null>(null);
  const touchStartY = useRef(0);
  const fullyExpandedRef = useRef(false);

  const bgRef = useRef<HTMLImageElement | null>(null);
  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);
  const hintRef = useRef<HTMLParagraphElement | null>(null);
  const stageRef = useRef<HTMLElement | null>(null);
  const showContentRef = useRef(false);

  const STAGE_FADE_START = 0.58;
  const STAGE_FADE_END = 0.98;

  const applyStyles = (p: number) => {
    if (bgRef.current) {
      bgRef.current.style.filter = `blur(${p * 14}px)`;
      bgRef.current.style.transform = `scale(${1 + p * 0.18})`;
    }
    const exitP = Math.min(p * 1.7, 1);
    const exitOpacity = String(Math.max(1 - exitP * 1.15, 0));
    if (line1Ref.current) {
      line1Ref.current.style.opacity = exitOpacity;
      line1Ref.current.style.transform = `translateX(${-exitP * 65}vw)`;
    }
    if (line2Ref.current) {
      line2Ref.current.style.opacity = exitOpacity;
      line2Ref.current.style.transform = `translateX(${exitP * 65}vw)`;
    }
    if (hintRef.current) hintRef.current.style.opacity = String(Math.max(0.85 - p * 3, 0));

    const fadeP = Math.max(0, Math.min((p - STAGE_FADE_START) / (STAGE_FADE_END - STAGE_FADE_START), 1));
    if (stageRef.current) {
      stageRef.current.style.opacity = String(1 - fadeP);
      stageRef.current.style.pointerEvents = fadeP >= 1 ? 'none' : 'auto';
    }
  };

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
      applyStyles(displayProgress.current);

      if (displayProgress.current >= STAGE_FADE_START && !showContentRef.current) {
        showContentRef.current = true;
        setShowContent(true);
      }

      if (displayProgress.current >= STAGE_FADE_END && !fullyExpandedRef.current) {
        fullyExpandedRef.current = true;
        setFullyExpanded(true);
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
        targetProgress.current = Math.min(Math.max(targetProgress.current + cappedDelta * 0.0022, 0), 1);
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
        const scrollFactor = deltaY < 0 ? 0.008 : 0.0065;
        targetProgress.current = Math.min(Math.max(targetProgress.current + deltaY * scrollFactor, 0), 1);
        touchStartY.current = touchY;
      }
    };

    const handleTouchEnd = () => {
      touchStartY.current = 0;
    };

    const handleScroll = () => {
      if (!fullyExpandedRef.current) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
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
      const t = setTimeout(() => setDismissed(true), 450);
      return () => clearTimeout(t);
    }
  }, [fullyExpanded]);

  return (
    <HeroRevealContext.Provider value={showContent}>
      <section ref={stageRef} className="intro-splash-stage" aria-hidden={dismissed}>
        <Image
          ref={bgRef}
          src="/images/intro-welcome.jpg"
          alt="Bienvenue dans l'univers de Kodascreen"
          fill
          priority
          className="intro-splash-bg"
        />

        <div className="intro-splash-copy intro-splash-copy-enter">
          <div className="intro-splash-copy-inner">
            <span ref={line1Ref} className="intro-splash-copy-part">
              Bienvenue dans l&apos;univers
            </span>
            <span ref={line2Ref} className="intro-splash-copy-part intro-splash-copy-part-accent">
              de Kodascreen
            </span>
          </div>
        </div>

        <p ref={hintRef} className="intro-splash-hint">
          Faites défiler pour entrer
        </p>
      </section>

      {children}
    </HeroRevealContext.Provider>
  );
}
