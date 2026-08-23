import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-row">
        <Link href="/" className="brand">
          Kodascreen
        </Link>
        <div>© {new Date().getFullYear()} Kodascreen. Tous droits réservés.</div>
      </div>
    </footer>
  );
}
