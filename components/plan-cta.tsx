'use client';

import { MouseEvent, ReactNode } from 'react';

export function PlanCta({
  formule,
  className,
  children,
}: {
  formule: string;
  className?: string;
  children: ReactNode;
}) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    const textarea = document.getElementById('message') as HTMLTextAreaElement | null;
    if (textarea) {
      textarea.value = `Formule souhaitée : ${formule}\n\n`;
    }
  }

  return (
    <a href="#contact" className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
