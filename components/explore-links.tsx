import Link from 'next/link';

const LINKS = [
  { href: '/portfolio', label: 'Portfolio', desc: 'Les séances en images' },
  { href: '/forfaits', label: 'Forfaits', desc: 'Trois formules de séance' },
  { href: '/temoignages', label: 'Témoignages', desc: "Ce qu'en disent les client·es" },
  { href: '/contact', label: 'Contact', desc: 'Réserver une séance' },
];

export function ExploreLinks() {
  return (
    <div className="wrap">
      <div className="explore-grid">
        {LINKS.map((link) => (
          <Link href={link.href} key={link.href} className="explore-card">
            <span className="explore-label">{link.label}</span>
            <span className="explore-desc">{link.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
