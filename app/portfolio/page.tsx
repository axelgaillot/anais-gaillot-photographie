import type { Metadata } from 'next';
import { PortfolioGallery } from '@/components/portfolio-gallery';

export const metadata: Metadata = {
  title: 'Portfolio — Kodascreen',
  description: 'Portfolio Kodascreen : portraits, grossesse et événements en tons chauds.',
};

export default function PortfolioPage() {
  return (
    <main>
      <div className="wrap page-header">
        <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>Une sélection de séances récentes</h1>
      </div>
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <PortfolioGallery />
        </div>
      </section>
    </main>
  );
}
