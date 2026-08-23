'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const CONTACT_EMAIL = 'a.plenard@yahoo.com';

export function ContactForm() {
  const [status, setStatus] = useState<{ text: string; kind: 'success' | 'error' } | null>(null);
  const searchParams = useSearchParams();
  const [prefill, setPrefill] = useState('');

  useEffect(() => {
    const formule = searchParams.get('formule');
    if (formule) {
      setPrefill(`Formule souhaitée : ${formule}\n\n`);
    }
  }, [searchParams]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const type = (form.elements.namedItem('type') as HTMLSelectElement).value;
    const date = (form.elements.namedItem('date') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim();

    if (!name || !email || !message) {
      setStatus({ text: 'Merci de remplir les champs obligatoires.', kind: 'error' });
      return;
    }

    const subject = encodeURIComponent(`Demande de séance — ${type || 'Photographie'}`);
    const body = encodeURIComponent(
      `Nom: ${name}\nCourriel: ${email}\nType de séance: ${type}\nDate souhaitée: ${date || 'à discuter'}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setStatus({ text: "Votre client email va s'ouvrir pour envoyer votre demande. Merci !", kind: 'success' });
  }

  return (
    <form id="bookingForm" style={{ marginTop: '1.5rem' }} onSubmit={handleSubmit}>
      <div className="field-row">
        <div className="field">
          <label htmlFor="name">Nom</label>
          <input id="name" name="name" type="text" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="email">Courriel</label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="type">Type de séance</label>
          <select id="type" name="type" defaultValue="Portrait">
            <option>Portrait</option>
            <option>Couple</option>
            <option>Mariage</option>
            <option>Autre événement</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="date">Date souhaitée</label>
          <input id="date" name="date" type="date" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Parlez-moi de votre projet…"
          defaultValue={prefill}
          key={prefill}
          required
        />
      </div>
      <button type="submit" className="btn btn-solid" style={{ marginTop: '0.4rem', width: 'fit-content' }}>
        Envoyer la demande
      </button>
      <p className={`form-status ${status?.kind ?? ''}`} role="status" aria-live="polite">
        {status?.text}
      </p>
      <p className="form-note">
        Le bouton ouvre votre logiciel de courriel avec les informations pré-remplies — remplacez par une
        intégration de votre choix si besoin.
      </p>
    </form>
  );
}
