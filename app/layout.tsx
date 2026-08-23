import type { Metadata } from 'next';
import { Cormorant_Garamond, Nunito_Sans, Kaushan_Script } from 'next/font/google';
import './globals.css';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

const body = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-body',
});

const script = Kaushan_Script({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script',
});

export const metadata: Metadata = {
  title: 'Kodascreen',
  description:
    "Kodascreen, studio de photographie de portraits et d'événements en tons chauds, disponible sur Montréal et Longueuil.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${display.variable} ${body.variable} ${script.variable} font-body`}
      >
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
