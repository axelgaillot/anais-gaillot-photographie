import type { Metadata } from 'next';
import { Reveal } from '@/components/reveal';

export const metadata: Metadata = {
  title: 'Témoignages — Kodascreen',
  description: "Ce qu'en disent les client·es de Kodascreen.",
};

export default function TemoignagesPage() {
  return (
    <main>
      <div className="wrap page-header">
        <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>Ce qu&apos;en disent les client·es</h1>
      </div>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="quotes-feature">
            <div className="quote">
              <span className="mark">&quot;</span>
              <p>
                La lumière, le rythme de la journée, la discrétion pendant la séance : tout était pensé.
                On revit ces instants à chaque fois qu&apos;on ouvre la galerie.
              </p>
              <div className="who">Sophie &amp; Marc</div>
            </div>
            <div className="quote-side">
              <div className="quote">
                <span className="mark">&quot;</span>
                <p>
                  Anaïs a su me mettre à l&apos;aise en dix minutes, les couleurs sont si douces qu&apos;on
                  dirait un souvenir déjà ancien.
                </p>
                <div className="who">Camille R.</div>
              </div>
              <div className="quote">
                <span className="mark">&quot;</span>
                <p>Livraison rapide comme promis, et des photos d&apos;une tendresse rare.</p>
                <div className="who">Léa D.</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
