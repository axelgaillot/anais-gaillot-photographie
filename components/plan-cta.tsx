import Link from 'next/link';
import { ReactNode } from 'react';

export function PlanCta({
  formule,
  className,
  children,
}: {
  formule: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={`/contact?formule=${encodeURIComponent(formule)}`} className={className}>
      {children}
    </Link>
  );
}
