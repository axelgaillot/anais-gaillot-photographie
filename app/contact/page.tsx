import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Reveal } from '@/components/reveal';
import { ContactForm } from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Contact — Anaïs Gaillot Photographie',
  description: "Réservez votre séance avec Anaïs Gaillot, photographe.",
};

export default function ContactPage() {
  return (
    <main>
      <div className="wrap page-header">
        <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>Racontons votre histoire</h1>
      </div>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap contact-grid">
          <Reveal>
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </Reveal>
          <Reveal className="contact-info">
            <div className="item">
              <div className="l">Courriel</div>
              <div className="v">
                <a href="mailto:a.plenard@yahoo.com">a.plenard@yahoo.com</a>
              </div>
            </div>
            <div className="item">
              <div className="l">Téléphone</div>
              <div className="v">À compléter</div>
            </div>
            <div className="item">
              <div className="l">Zone desservie</div>
              <div className="v">Montréal &amp; Longueuil (déplacement inclus)</div>
            </div>
            <div className="item">
              <div className="l">Instagram</div>
              <div className="v">
                <a href="#">À compléter</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
