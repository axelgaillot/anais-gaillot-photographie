'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/forfaits', label: 'Forfaits' },
  { href: '/temoignages', label: 'Témoignages' },
  { href: '/contact', label: 'Contact' },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <Link href="/" className="brand" onClick={() => setOpen(false)}>
        <motion.span whileTap={{ scale: 0.9 }} style={{ display: 'inline-block' }}>
          Kodascreen
        </motion.span>
      </Link>
      <button
        className="hamburger"
        aria-label="Ouvrir le menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span
          style={
            open
              ? { transform: 'translateY(7px) rotate(45deg)' }
              : undefined
          }
        />
        <span style={open ? { opacity: 0 } : undefined} />
        <span
          style={
            open
              ? { transform: 'translateY(-7px) rotate(-45deg)' }
              : undefined
          }
        />
      </button>
      <ul className={`nav-links ${open ? 'open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/contact" className="nav-cta">
        Réserver une séance
      </Link>
    </nav>
  );
}
