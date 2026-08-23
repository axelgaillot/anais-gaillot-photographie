'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

export function Reveal({
  children,
  className = '',
  stagger = false,
}: {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const classes = ['reveal', stagger ? 'reveal-stagger' : '', inView ? 'in-view' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
}
