import { PhotoHero } from '@/components/photo-hero';
import { IntroSplash } from '@/components/intro-splash';

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
      </main>
    </IntroSplash>
  );
}
