import { PhotoHero } from '@/components/photo-hero';

export default function HomePage() {
  return (
    <main>
      <PhotoHero
        eyebrow="Photographe de portraits, grossesse & événements"
        title="Des instants tout en douceur."
        subtitle="Kodascreen, studio de photographie basé à Montréal et Longueuil. Chaque séance est pensée pour capturer vos moments avec chaleur et naturel."
        photos={[
          { src: '/images/portfolio/alex-15.jpg', alt: 'Séance Alex, portrait au soleil' },
          { src: '/images/portfolio/cocon-marine-44.jpg', alt: 'Séance Dans le cocon de Marine, détail fleurs' },
        ]}
      />
    </main>
  );
}
