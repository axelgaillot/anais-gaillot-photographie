import Link from 'next/link';
import Image from 'next/image';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import { Reveal } from '@/components/reveal';
import { PlanCta } from '@/components/plan-cta';
import { ContactForm } from '@/components/contact-form';

const ENTRY_PHOTOS = [
  { src: '/images/portfolio-2.jpg', alt: "Séance grossesse, profil au pied d'un arbre" },
  { src: '/images/portfolio-4.jpg', alt: 'Séance grossesse, portrait lumière dorée' },
  { src: '/images/portfolio-6.jpg', alt: 'Séance grossesse, assise contre un arbre' },
  { src: '/images/portfolio-7.jpg', alt: 'Séance grossesse, détail fleurs et tatouages' },
];

export default function HomePage() {
  return (
    <main>
      <ScrollExpandMedia
        mediaSrc="/images/hero-2.jpg"
        title="Des instants tout en douceur."
        scrollToExpand=""
      >
        <div />
      </ScrollExpandMedia>

      <section id="apercu">
        <div className="wrap">
          <Reveal className="section-head split">
            <h2>Quelques séances récentes</h2>
            <Link href="/portfolio" className="dash-link">
              <span className="dash" /> Voir tout le portfolio
            </Link>
          </Reveal>
          <Reveal stagger className="entry-grid">
            {ENTRY_PHOTOS.map((photo) => (
              <Link href="/portfolio" key={photo.src}>
                <Image src={photo.src} alt={photo.alt} width={480} height={640} />
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="forfaits" className="tint">
        <div className="wrap">
          <Reveal className="section-head centered">
            <h2>Trois formules pour s&apos;adapter à vos envies</h2>
            <p>
              Pour vos souvenirs, durée, nombre de photos et livraison varient selon la formule choisie.
            </p>
          </Reveal>
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

      <section id="temoignages">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Ce qu&apos;en disent les client·es</h2>
          </Reveal>
          <Reveal className="quotes-feature">
            <div className="quote">
              <span className="mark">&quot;</span>
              <p>
                La lumière, le rythme de la journée, la discrétion pendant la séance : tout était pensé.
                On revit ces instants à chaque fois qu&apos;on ouvre la galerie.
              </p>
              <div className="who">Sophie &amp; Marc</div>
            </div>
            <div className="quote-side">
              <div className="quote">
                <span className="mark">&quot;</span>
                <p>
                  Anaïs a su me mettre à l&apos;aise en dix minutes, les couleurs sont si douces qu&apos;on
                  dirait un souvenir déjà ancien.
                </p>
                <div className="who">Camille R.</div>
              </div>
              <div className="quote">
                <span className="mark">&quot;</span>
                <p>Livraison rapide comme promis, et des photos d&apos;une tendresse rare.</p>
                <div className="who">Léa D.</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="tint">
        <div className="wrap contact-grid">
          <Reveal>
            <h2>Racontons votre histoire</h2>
            <ContactForm />
          </Reveal>
          <Reveal className="contact-info">
            <div className="item">
              <div className="l">Courriel</div>
              <div className="v">
                <a href="mailto:a.plenard@yahoo.com">a.plenard@yahoo.com</a>
              </div>
            </div>
            <div className="item">
              <div className="l">Téléphone</div>
              <div className="v">À compléter</div>
            </div>
            <div className="item">
              <div className="l">Zone desservie</div>
              <div className="v">Montréal &amp; Longueuil (déplacement inclus)</div>
            </div>
            <div className="item">
              <div className="l">Instagram</div>
              <div className="v">
                <a href="#">À compléter</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
