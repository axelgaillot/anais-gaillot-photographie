import Link from 'next/link';
import { PhotoHero } from '@/components/photo-hero';
import { IntroSplash } from '@/components/intro-splash';
import { BestOfGallery } from '@/components/best-of-gallery';
import { Reveal } from '@/components/reveal';

export default function HomePage() {
  return (
    <IntroSplash>
      <main>
        <PhotoHero
          eyebrow="Photographe de portraits, grossesse & événements"
          title="Des instants tout en douceur."
          subtitle="Kodascreen, studio de photographie basé à Montréal et Longueuil. Chaque séance est pensée pour capturer vos moments avec chaleur et naturel."
          photos={[
            { src: '/images/portfolio/alex-24.jpg', alt: 'Séance Alex, portrait rieur avec une fleur' },
            { src: '/images/portfolio/cocon-marine-44.jpg', alt: 'Séance Dans le cocon de Marine, détail fleurs' },
          ]}
        />

        <section className="section-dark">
          <div className="wrap">
            <Reveal className="section-head">
              <h2>Nos plus beaux souvenirs</h2>
              <p>Un aperçu des séances qui nous ont marquées. Cliquez sur une photo pour la parcourir en grand.</p>
            </Reveal>
            <BestOfGallery />
          </div>
        </section>

        <section className="section-dark">
          <div className="wrap">
            <Reveal className="home-contact-inner">
              <div className="home-contact-copy">
                <h2>Racontons votre histoire</h2>
                <p>Une envie de séance ? Écrivez-nous, on prend le temps de discuter de votre projet avant tout.</p>
              </div>
              <div className="home-contact-actions">
                <a className="v-link" href="mailto:a.plenard@yahoo.com">
                  a.plenard@yahoo.com
                </a>
                <Link href="/contact" className="btn btn-solid">
                  Réserver une séance
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </IntroSplash>
  );
}
