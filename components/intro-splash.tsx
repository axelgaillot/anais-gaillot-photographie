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
import { emitHeroProgress } from '@/lib/hero-progress';

export function IntroSplash({ children }: { children: ReactNode }) {
  const [fullyExpanded, setFullyExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const targetProgress = useRef(0);
  const displayProgress = useRef(0);
  const rafId = useRef<number | null>(null);
  const lastTickTime = useRef<number | null>(null);
  const fullyExpandedRef = useRef(false);

  const MIN_JOURNEY_MS = 3400;

  const bgRef = useRef<HTMLImageElement | null>(null);
  const bgMobileRef = useRef<HTMLImageElement | null>(null);
  const stageRef = useRef<HTMLElement | null>(null);

  const STAGE_FADE_START = 0.4;
  const STAGE_FADE_END = 0.98;

  const applyStyles = (p: number) => {
    const blur = `blur(${p * 14}px)`;
    const scale = `scale(${1 + p * 0.42})`;
    if (bgRef.current) {
      bgRef.current.style.filter = blur;
      bgRef.current.style.transform = scale;
    }
    if (bgMobileRef.current) {
      bgMobileRef.current.style.filter = blur;
      bgMobileRef.current.style.transform = scale;
    }

    const fadeP = Math.max(0, Math.min((p - STAGE_FADE_START) / (STAGE_FADE_END - STAGE_FADE_START), 1));
    if (stageRef.current) {
      stageRef.current.style.opacity = String(1 - fadeP);
      stageRef.current.style.pointerEvents = fadeP >= 1 ? 'none' : 'auto';
    }
    emitHeroProgress(fadeP);
  };

  useEffect(() => {
    document.documentElement.classList.add('intro-active');
    document.body.classList.add('intro-active');
    return () => {
      document.documentElement.classList.remove('intro-active');
      document.body.classList.remove('intro-active');
    };
  }, []);

  useEffect(() => {
    if (dismissed) {
      document.documentElement.classList.remove('intro-active');
      document.body.classList.remove('intro-active');
    }
  }, [dismissed]);

  useEffect(() => {
    if (dismissed) return;

    const tick = (now: number) => {
      const last = lastTickTime.current ?? now;
      const dt = now - last;
      lastTickTime.current = now;

      const diff = targetProgress.current - displayProgress.current;
      const easedStep = diff * 0.14;
      const maxStep = dt / MIN_JOURNEY_MS;
      const step = diff === 0 ? 0 : Math.sign(diff) * Math.min(Math.abs(easedStep), maxStep);
      displayProgress.current += step;
      if (Math.abs(targetProgress.current - displayProgress.current) < 0.0005) {
        displayProgress.current = targetProgress.current;
      }
      applyStyles(displayProgress.current);

      if (displayProgress.current >= STAGE_FADE_END && !fullyExpandedRef.current) {
        fullyExpandedRef.current = true;
        setFullyExpanded(true);
      }

      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      lastTickTime.current = null;
    };
  }, [dismissed]);

  useEffect(() => {
    if (dismissed) return;

    // Une seule interaction, peu importe laquelle (molette, clic, touche,
    // toucher), lance directement l'entree complete sur le site. Le rythme
    // reste doux grace au plafond de vitesse applique dans tick().
    const handleWheel = (e: WheelEvent) => {
      if (fullyExpandedRef.current && e.deltaY < 0 && window.scrollY <= 5) {
        fullyExpandedRef.current = false;
        setFullyExpanded(false);
        targetProgress.current = 0.9;
        e.preventDefault();
      } else if (!fullyExpandedRef.current) {
        e.preventDefault();
        targetProgress.current = 1;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (fullyExpandedRef.current) return;
      e.preventDefault();
      targetProgress.current = 1;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!fullyExpandedRef.current) e.preventDefault();
    };

    const handleTouchEnd = () => {};

    const handleClick = () => {
      if (!fullyExpandedRef.current) targetProgress.current = 1;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!fullyExpandedRef.current) {
        e.preventDefault();
        targetProgress.current = 1;
      }
    };

    const handleScroll = () => {
      if (!fullyExpandedRef.current) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    window.addEventListener('wheel', handleWheel as unknown as EventListener, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart as unknown as EventListener, { passive: false });
    window.addEventListener('touchmove', handleTouchMove as unknown as EventListener, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel as unknown as EventListener);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
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
    <>
      <section ref={stageRef} className="intro-splash-stage" aria-hidden={dismissed}>
        <Image
          ref={bgRef}
          src="/images/intro-welcome.jpg"
          alt="Kodascreen, gardienne d'images et poésie du réel"
          fill
          priority
          className="intro-splash-bg intro-splash-bg-desktop"
        />
        <Image
          ref={bgMobileRef}
          src="/images/intro-welcome-mobile.jpg"
          alt="Kodascreen, gardienne d'images et poésie du réel"
          fill
          priority
          className="intro-splash-bg intro-splash-bg-mobile"
        />
      </section>

      {children}
    </>
  );
}
