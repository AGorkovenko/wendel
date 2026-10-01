import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, PinIcon, SunIcon } from "@/components/icons";
import { CropStory } from "@/components/crop-story";

const products = [
  { name: "Spargel", meta: "April — Juni", className: "product-asparagus", copy: "Tagesfrisch gestochen. Weiß oder grün, zart und aromatisch." },
  { name: "Erdbeeren", meta: "Mai — Juni", className: "product-strawberry", copy: "Sonnengereift und von Hand direkt ins Körbchen gepflückt." },
  { name: "Himbeeren", meta: "Mai — Juli", className: "product-raspberry", copy: "Geschützt gewachsen, behutsam geerntet, voll im Geschmack." },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <Link className="brand" href="#top" aria-label="Wendel Startseite">
          <span className="brand-mark">W</span>
          <span><strong>Wendel</strong><small>Spargel & Obsthof</small></span>
        </Link>
        <nav aria-label="Hauptnavigation">
          <Link href="#ernte">Produkte</Link>
          <Link href="#standorte">Verkaufsstellen</Link>
          <Link href="#hof">Hof erleben</Link>
          <Link href="#verantwortung">Nachhaltigkeit</Link>
          <Link href="#familie">Über uns</Link>
        </nav>
        <Link className="header-cta" href="#standorte"><PinIcon /> Stand finden</Link>
        <button className="menu-button" aria-label="Menü öffnen"><span /><span /></button>
      </header>

      <section className="hero" id="top">
        <Image
          className="hero-image"
          src="/images/concepts/wendel-hero-art-direction-v1.png"
          alt="Feld mit Erdbeeren und Spargel an der Bergstraße im Morgenlicht"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-wash" />
        <div className="hero-content">
          <div className="season-pill"><span /> Unsere Saison ist beendet</div>
          <h1>Frisch gewachsen.<br />Nah genossen.</h1>
          <p>Spargel, Erdbeeren und Himbeeren von der Bergstraße — seit 1986 mit Sorgfalt angebaut.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="#standorte"><PinIcon /> Verkaufsstand finden</Link>
            <Link className="text-link" href="#hof">Hof erleben <ArrowIcon /></Link>
          </div>
        </div>
        <div className="hero-index"><span>49.723° N</span><span>Zwingenberg</span></div>
      </section>

      <section className="today-strip" aria-label="Heute bei Wendel">
        <div className="today-title"><SunIcon /><span>Heute bei Wendel</span></div>
        <div><span>Hofladen</span><strong>Saisonpause</strong></div>
        <div><span>Hof-Café</span><strong>Saisonpause</strong></div>
        <div><span>Selbstpflücken</span><strong>Ab Mitte Mai</strong></div>
        <Link href="#standorte">Alle Zeiten <ArrowIcon /></Link>
      </section>

      <section className="harvest section-shell" id="ernte">
        <div className="section-heading">
          <p className="section-kicker">Unsere Ernte</p>
          <h2>Drei Kulturen.<br />Ein Anspruch.</h2>
          <p>Reif geerntet, kurz transportiert und so frisch wie möglich verkauft.</p>
        </div>
        <div className="product-list">
          {products.map((product, index) => (
            <article className={`product-row ${product.className}`} key={product.name}>
              <span className="product-number">0{index + 1}</span>
              <div className="product-orbit"><i /></div>
              <div className="product-title"><h3>{product.name}</h3><span>{product.meta}</span></div>
              <p>{product.copy}</p>
              <Link href="#vom-feld" aria-label={`Mehr über ${product.name}`}><ArrowIcon size={24} /></Link>
            </article>
          ))}
        </div>
      </section>

      <CropStory />

      <section className="farm section-shell" id="hof">
        <div className="section-heading compact">
          <p className="section-kicker">Hof erleben</p>
          <h2>Ein guter Ort für eine kleine Pause.</h2>
        </div>
        <div className="experience-grid">
          <article className="experience-main">
            <div className="experience-art café-art"><span className="cup" /><span className="cake" /></div>
            <div><span>Hofladen & Hof-Café</span><h3>Feldfrisch einkaufen. Hausgemacht genießen.</h3><Link href="#standorte">Besuch planen <ArrowIcon /></Link></div>
          </article>
          <article className="experience-card pick-card">
            <div className="experience-art berry-basket"><i /><i /><i /><i /></div>
            <span>Selbstpflücken</span><h3>Naschen ausdrücklich erlaubt.</h3>
          </article>
          <article className="experience-card play-card">
            <div className="experience-art hill-art"><i /></div>
            <span>Für Familien</span><h3>Spielen mit Blick auf den Melibokus.</h3>
          </article>
        </div>
      </section>

      <section className="responsibility" id="verantwortung">
        <div className="section-shell responsibility-grid">
          <div>
            <p className="section-kicker">Landwirtschaft weiter gedacht</p>
            <h2>Verantwortung, die mitwächst.</h2>
            <p>Moderne Landwirtschaft und Naturschutz gehören für uns zusammen — auf dem Feld, bei der Energie und in jeder Verpackung.</p>
            <Link className="text-link light" href="#">Wie wir arbeiten <ArrowIcon /></Link>
          </div>
          <div className="proof-grid">
            <article><strong>440</strong><span>kW Sonnenenergie auf dem Hof</span></article>
            <article><strong>7</strong><span>Jahre nutzen wir unsere Folien</span></article>
            <article><strong>100%</strong><span>recycelbare Obstschalen</span></article>
            <article className="bee-proof"><span className="bee">✦</span><span>Blühwiesen & Nützlinge</span></article>
          </div>
        </div>
      </section>

      <section className="family section-shell" id="familie">
        <div className="family-year">1986</div>
        <div className="family-copy">
          <p className="section-kicker">Familie Wendel</p>
          <h2>Aus Erfahrung gewachsen.</h2>
          <p>Was mit kleinen Mengen Spargel begann, ist heute ein Familienbetrieb mit 102 Hektar Anbaufläche — geführt von Florian, Chantal und Sigrid Wendel.</p>
          <Link className="text-link" href="#">Unsere Geschichte <ArrowIcon /></Link>
        </div>
      </section>

      <section className="visit" id="standorte">
        <div className="visit-copy">
          <p className="section-kicker">Erntefrisch in Ihrer Nähe</p>
          <h2>Wo dürfen wir Sie begrüßen?</h2>
          <form className="location-search">
            <PinIcon size={22} />
            <label className="sr-only" htmlFor="location">Ort oder Postleitzahl</label>
            <input id="location" placeholder="Ort oder Postleitzahl" />
            <button type="submit" aria-label="Standort suchen"><ArrowIcon size={22} /></button>
          </form>
          <p className="form-note">Findet die fünf nächstgelegenen Verkaufsstände.</p>
        </div>
        <div className="visit-map" aria-hidden="true">
          <span className="map-road road-a" /><span className="map-road road-b" /><span className="map-road road-c" />
          <i className="map-pin pin-a" /><i className="map-pin pin-b" /><i className="map-pin pin-c" /><i className="map-pin pin-d" />
          <strong>Zwingenberg</strong>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><span className="brand-mark">W</span><h2>Bis bald<br />auf dem Hof.</h2></div>
        <div><strong>Spargel & Obsthof Wendel</strong><span>Spargelhof 1<br />64673 Zwingenberg</span></div>
        <div><strong>Kontakt</strong><a href="tel:+49625179304">06251 79304</a><a href="mailto:info@spargel-wendel.de">info@spargel-wendel.de</a></div>
        <div><strong>Mehr</strong><a href="#ernte">Produkte</a><a href="#hof">Hof erleben</a><a href="#verantwortung">Nachhaltigkeit</a><a href="#">Jobs</a></div>
        <div className="footer-bottom"><span>© 2026 Wendel</span><span>Impressum · Datenschutz · Cookies</span></div>
      </footer>

      <nav className="mobile-bar" aria-label="Schnellzugriff">
        <a href="#standorte"><PinIcon /><span>Stand</span></a>
        <a href="#top"><SunIcon /><span>Heute</span></a>
        <a href="tel:+49625179304"><span className="phone-icon">⌕</span><span>Anrufen</span></a>
      </nav>
    </main>
  );
}
