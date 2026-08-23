import { PhotoHero } from '@/components/photo-hero';
import { ExploreLinks } from '@/components/explore-links';
import { Reveal } from '@/components/reveal';

export default function HomePage() {
  return (
    <main>
      <PhotoHero
        eyebrow="Photographe de portraits, grossesse & événements"
        title="Des instants tout en douceur."
        subtitle="Anaïs Gaillot, photographe basée à Montréal et Longueuil. Chaque séance est pensée pour capturer vos moments avec chaleur et naturel."
        photos={[
          { src: '/images/portfolio/alex-15.jpg', alt: 'Séance Alex, portrait au soleil' },
          { src: '/images/portfolio/cocon-marine-44.jpg', alt: 'Séance Dans le cocon de Marine, détail fleurs' },
        ]}
      />

      <Reveal>
        <ExploreLinks />
      </Reveal>
    </main>
  );
}
