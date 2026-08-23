import type { Metadata } from 'next';
import { Reveal } from '@/components/reveal';
import { PlanCta } from '@/components/plan-cta';

export const metadata: Metadata = {
  title: 'Forfaits — Anaïs Gaillot Photographie',
  description: 'Les trois formules de séance photo proposées par Anaïs Gaillot.',
};

export default function ForfaitsPage() {
  return (
    <main>
      <div className="wrap page-header">
        <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
          Trois formules pour s&apos;adapter à vos envies
        </h1>
        <p style={{ marginTop: '0.8rem', color: 'var(--ink-soft)', maxWidth: '52ch' }}>
          Pour vos souvenirs, durée, nombre de photos et livraison varient selon la formule
          choisie.
        </p>
      </div>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal stagger className="plans">
            <div className="plan">
              <span className="tag">Formule 1</span>
              <h3>Séance express</h3>
              <div className="price">
                180 $ <small>CAD</small>
              </div>
              <ul className="rows">
                <li>
                  Durée : <b>jusqu&apos;à 45 minutes</b>
                </li>
                <li>
                  Photos : <b>15 incluses</b>
                </li>
                <li>
                  Livraison : <b>galerie privée HD</b>
                </li>
              </ul>
              <div className="ideal">
                <span className="label">Idéal pour</span>
                Séance express, couple, portrait, réseaux sociaux…
              </div>
              <PlanCta formule="Formule 1 — 180$ / 45 min / 15 photos" className="btn btn-ghost">
                Choisir cette formule
              </PlanCta>
            </div>

            <div className="plan featured">
              <span className="tag">
                Formule 2 <span className="pop">· Populaire</span>
              </span>
              <h3>Séance complète</h3>
              <div className="price">
                230 $ <small>CAD</small>
              </div>
              <ul className="rows">
                <li>
                  Durée : <b>jusqu&apos;à 1h15</b>
                </li>
                <li>
                  Photos : <b>30 incluses</b>
                </li>
                <li>
                  Livraison : <b>galerie privée HD</b>
                </li>
              </ul>
              <div className="ideal">
                <span className="label">Idéal pour</span>
                Séance complète, famille, grossesse, lifestyle…
              </div>
              <PlanCta
                formule="Formule 2 — 230$ / 1h15 / 30 photos coup de cœur"
                className="btn btn-solid"
              >
                Choisir cette formule
              </PlanCta>
            </div>

            <div className="plan">
              <span className="tag">Formule 3</span>
              <h3>Grand jour</h3>
              <div className="price">
                300 $ <small>CAD</small>
              </div>
              <ul className="rows">
                <li>
                  Durée : <b>jusqu&apos;à 1h30</b>
                </li>
                <li>
                  Photos : <b>50 minimum</b>
                </li>
                <li>
                  Livraison : <b>galerie privée HD</b>
                </li>
              </ul>
              <div className="ideal">
                <span className="label">Idéal pour</span>
                Ne rien manquer, vos plus beaux souvenirs.
              </div>
              <PlanCta formule="Formule 3 — 300$ / 1h30 / 50+ photos" className="btn btn-ghost">
                Choisir cette formule
              </PlanCta>
            </div>
          </Reveal>

          <Reveal className="know-box">
            <h3>Bon à savoir</h3>
            <ul>
              <li>Toutes les séances sont personnalisées selon vos envies.</li>
              <li>Un acompte est demandé pour réserver votre date.</li>
              <li>Paiement par virement Interac ou autre méthode convenue ensemble.</li>
              <li>Déplacement inclus uniquement sur Montréal ou Longueuil.</li>
            </ul>
            <p className="signoff">Hâte de créer de beaux souvenirs avec vous.</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
