import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-row">
        <Link href="/" className="brand">
          Anaïs Gaillot
        </Link>
        <div>© {new Date().getFullYear()} Anaïs Gaillot Photographie. Tous droits réservés.</div>
      </div>
    </footer>
  );
}
