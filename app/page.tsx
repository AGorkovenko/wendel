import { FilmHero } from "@/components/film-hero";
import { SiteHeader } from "@/components/site-header";
import { ArrowIcon, PinIcon, SunIcon } from "@/components/icons";
import { navigation, wendel } from "@/lib/wendel";
import "./homepage.css";

const products = [
  {
    name: "Spargel",
    detail: "Weiß & grün. Frisch vom Feld.",
    text: "Im milden Klima der Bergstraße gewachsen, mit Sorgfalt gestochen und direkt zu Ihnen.",
    href: "/spargel-aus-zwingenberg/",
    image: "asparagus",
    season: "Frühling auf dem Teller",
  },
  {
    name: "Erdbeeren",
    detail: "Sonnengereift. Handgepflückt.",
    text: "Rot bis ins Herz und voller Sommer. Unsere Erdbeeren dürfen reifen, bevor sie ins Körbchen kommen.",
    href: "/sonnengereifte-erdbeeren/",
    image: "strawberries",
    season: "So schmeckt der Sommer",
  },
  {
    name: "Himbeeren",
    detail: "Zart. Süß. Voller Aroma.",
    text: "Beere für Beere behutsam gepflückt. Für den kleinen Genuss direkt aus der Hand.",
    href: "/aromatische-himbeeren/",
    image: "raspberries",
    season: "Kleine Beere, großer Genuss",
  },
];

const questions = [
  {
    question: "Wann kann ich den Hof besuchen?",
    answer: (
      <>
        Hofladen und Hof-Café sind während der Saison von April bis Juni täglich
        von 8 bis 19 Uhr geöffnet, auch sonntags und an Feiertagen. Aktuell ist
        Saisonpause. Bitte prüfen Sie vor der Anreise die{" "}
        <a href={wendel.sales}>aktuellen Hinweise</a>.
      </>
    ),
  },
  {
    question: "Kann ich Erdbeeren und Himbeeren selbst pflücken?",
    answer: (
      <>
        Ja, in der Hochsaison. Erdbeeren normalerweise von Mitte Mai bis Ende
        Juni, Himbeeren etwa von Ende Juni bis Anfang Juli. Wetter und Reife
        bestimmen den Start. Die{" "}
        <a href={wendel.picking}>aktuellen Pflücktermine</a> werden auf der
        Hofseite bekannt gegeben.
      </>
    ),
  },
  {
    question: "Muss ich zum Selbstpflücken etwas mitbringen?",
    answer: (
      <>
        Bringen Sie gern ein eigenes Gefäß mit. Melden Sie sich zuerst im
        Hofladen an; dort wird Ihr leeres Gefäß gewogen. Pflücken Sie mit Stiel
        und bleiben Sie in Ihrer Reihe. Kinder sind willkommen, Hunde müssen
        außerhalb des Feldes bleiben.
      </>
    ),
  },
  {
    question: "Wo finde ich einen Wendel-Verkaufsstand?",
    answer: (
      <>
        Unsere Verkaufsstände sind während der Saison in vielen Orten für Sie
        da. In der <a href={wendel.stands}>Verkaufsstandsuche</a> können Sie
        Ihren Ort oder Ihre Postleitzahl eingeben und die nächstgelegenen Stände
        finden.
      </>
    ),
  },
];

export default function Home() {
  return (
    <>
      <a className="access-skip" href="#ernte">
        Zum Inhalt springen
      </a>
      <SiteHeader />
      <main>
        <FilmHero />

        <aside className="season-bar" aria-label="Aktuelle Saisoninformation">
          <div className="page-width season-inner">
            <div className="season-message">
              <span className="season-dot" />
              <div>
                <strong>Die Felder machen Pause.</strong>
                <p>
                  Unsere Saison ist beendet. Danke für einen genussvollen
                  Sommer!
                </p>
              </div>
            </div>
            <a href={wendel.sales}>
              Saison & Öffnungszeiten <ArrowIcon />
            </a>
          </div>
        </aside>

        <section className="harvest page-width" id="ernte">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Frisch von unseren Feldern</p>
              <h2>
                Eine Saison.
                <br />
                Drei Lieblingsstücke.
              </h2>
            </div>
            <p>
              Manches schmeckt nur zu seiner Zeit so richtig gut. Entdecken Sie
              unsere Lieblingsfrüchte – aus eigenem Anbau, direkt von der
              Bergstraße.
            </p>
          </div>
          <div className="produce-grid">
            {products.map((product) => (
              <article
                className={`produce produce-${product.image}`}
                key={product.name}
              >
                <div className="produce-title">
                  <h3>
                    <a href={`${wendel.origin}${product.href}`}>
                      {product.name}
                    </a>
                  </h3>
                  <span>{product.season}</span>
                </div>
                <a
                  className="produce-photo"
                  href={`${wendel.origin}${product.href}`}
                  aria-label={`${product.name}: mehr erfahren`}
                >
                  <img
                    src={`/images/generated/${product.image}-v1.webp`}
                    alt={`Illustrative Produktaufnahme: ${product.name}`}
                    width="1024"
                    height="1024"
                    loading="lazy"
                  />
                  <span className="photo-link" aria-hidden="true">
                    <ArrowIcon size={23} />
                  </span>
                </a>
                <div className="produce-copy">
                  <p className="produce-detail">{product.detail}</p>
                  <p>{product.text}</p>
                  <a
                    className="text-link"
                    href={`${wendel.origin}${product.href}`}
                  >
                    Mehr über {product.name}
                    <ArrowIcon />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="harvest-foot">
            <span>
              <SunIcon size={21} /> Guter Geschmack hat eine Saison.
            </span>
            <a className="text-link" href={wendel.stands}>
              Frische in Ihrer Nähe finden <ArrowIcon />
            </a>
          </div>
        </section>

        <section className="visit-section" id="besuch">
          <div className="page-width">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Ein schöner Tag bei Wendel</p>
                <h2>
                  Heute mal
                  <br />
                  raus aufs Land.
                </h2>
              </div>
              <p>
                Ein Stück Kuchen, ein Einkauf im Hofladen oder die erste selbst
                gepflückte Erdbeere. Ihr kleiner Ausflug ins Grüne beginnt hier.
              </p>
            </div>
            <article className="field-invitation">
              <div className="field-copy">
                <span className="field-tag">
                  Erdbeeren & Himbeeren selbst pflücken
                </span>
                <h3>
                  Die schönsten
                  <br />
                  Erinnerungen
                  <br />
                  wachsen draußen.
                </h3>
                <p>
                  Raus ins Feld. Rein ins Sommerglück. Füllen Sie Ihr Körbchen
                  mit Beeren – und den Tag mit Zeit füreinander.
                </p>
                <a className="button button-white" href={wendel.picking}>
                  Pflücktermine entdecken
                  <ArrowIcon />
                </a>
                <small>In der Hochsaison · wetterabhängig</small>
              </div>
              <div className="field-photo">
                <img
                  src="/images/wendel/restored/self-pick-v1.webp"
                  alt="Ein Kind mit frisch gepflückten Erdbeeren auf einem Wendel-Feld"
                  width="1026"
                  height="1532"
                  loading="lazy"
                />
                <span>Naschen erlaubt.</span>
              </div>
            </article>
            <div className="visit-grid">
              <article className="cafe-story">
                <div className="cafe-image">
                  <img
                    src="/images/wendel/restored/cafe-v1.webp"
                    alt="Sonniger Außenbereich des Wendel Hof-Cafés mit roten Sonnenschirmen"
                    width="1448"
                    height="1086"
                    loading="lazy"
                  />
                  <img
                    className="cafe-cake"
                    src="/images/wendel/restored/cake-v1.webp"
                    alt="Hausgebackener Erdbeer-, Streusel- und Beerenkuchen im Wendel Hofladen"
                    width="1086"
                    height="1448"
                    loading="lazy"
                  />
                </div>
                <div className="visit-copy">
                  <h3>
                    Kaffee. Kuchen.
                    <br />
                    Noch ein Stück?
                  </h3>
                  <p>
                    Hausgebackener Kuchen, Spargelsalate und Zeit zum
                    Durchatmen. Im Hof-Café schmeckt die Pause nach Frühling und
                    Sommer.
                  </p>
                  <div className="visit-actions">
                    <a className="button button-green" href={wendel.shop}>
                      Hof-Café entdecken <ArrowIcon />
                    </a>
                    <a
                      className="text-link"
                      href={wendel.menu}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Speisekarte <span className="file-label">PDF</span>
                    </a>
                  </div>
                </div>
              </article>
              <article className="shop-story">
                <div className="shop-image">
                  <img
                    src="/images/wendel/restored/farm-shop-v1.webp"
                    alt="Eingang zum Wendel Hofladen mit Hof-Café im Außenbereich"
                    width="1448"
                    height="1086"
                    loading="lazy"
                  />
                  <img
                    className="shop-preserves"
                    src="/images/wendel/restored/preserves-v1.webp"
                    alt="Wendel-Fruchtaufstriche aus eigener Ernte"
                    width="1300"
                    height="1209"
                    loading="lazy"
                  />
                </div>
                <div className="visit-copy">
                  <h3>
                    Ein Körbchen voll.
                    <br />
                    Ein bisschen mehr.
                  </h3>
                  <p>
                    Unsere Ernte und regionale Lieblingsstücke. Hausgemachte
                    Fruchtaufstriche, Spargelsuppe, erlesene Weine und Secco –
                    ein Stück Hof für zu Hause.
                  </p>
                  <a className="text-link" href={wendel.shop}>
                    Im Hofladen vorbeischauen
                    <ArrowIcon />
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="family-section" id="hof">
          <div className="family-photos">
            <img
              className="family-photo"
              src="/images/wendel/restored/family-v1.webp"
              alt="Die Familie Wendel auf ihrem Hof an der Bergstraße"
              width="1448"
              height="1086"
              loading="lazy"
            />
            <span className="family-photo-label">
              Familie Wendel · Zwingenberg
            </span>
          </div>
          <div className="family-copy">
            <p className="section-kicker">Die Menschen hinter der Ernte</p>
            <h2>
              Unser Name.
              <br />
              Unser Versprechen.
            </h2>
            <p>
              Seit 1986 bauen wir in Zwingenberg Spargel an. Erdbeeren und
              Himbeeren kamen dazu – und die Freude daran, etwas richtig Gutes
              wachsen zu lassen, ist geblieben.
            </p>
            <p>
              Wir begleiten unsere Früchte vom Feld bis zum Verkauf. Persönlich,
              mit Erfahrung und mit unserer ganzen Familie.
            </p>
            <a className="button button-white" href={wendel.family}>
              Familie Wendel kennenlernen <ArrowIcon />
            </a>
            <div className="family-signoff">
              Der Bauer nach Ihrem Geschmack.
            </div>
            <div className="family-year">
              <strong>1986</strong>
              <span>
                Seitdem wächst
                <br />
                hier Gutes.
              </span>
            </div>
          </div>
        </section>

        <section className="nature-section page-width" id="natur">
          <div className="nature-photo">
            <img
              src="/images/generated/pollination-v1.webp"
              alt="Illustrative Nahaufnahme einer Hummel an einer Erdbeerblüte"
              width="1524"
              height="1080"
              loading="lazy"
            />
            <span className="nature-photo-label">
              Kleine Helfer.
              <br />
              Große Wirkung.
            </span>
          </div>
          <div className="nature-copy">
            <p className="section-kicker">Mit der Natur arbeiten</p>
            <h2>
              Gutes braucht
              <br />
              gute Fürsorge.
            </h2>
            <p>
              Ein gesunder Boden und ein bewusster Umgang mit Ressourcen gehören
              für uns zur guten Ernte dazu.
            </p>
            <ul className="nature-practices">
              <li>
                <span>Bestäubung</span>
                <p>Hummeln helfen unseren Pflanzen, Früchte zu tragen.</p>
              </li>
              <li>
                <span>Sonnenenergie</span>
                <p>
                  Eigene Photovoltaik macht die Sonne auch am Hof zur Helferin.
                </p>
              </li>
              <li>
                <span>Kurze Wege</span>
                <p>Direkter Verkauf verbindet unsere Felder mit Ihrer Küche.</p>
              </li>
            </ul>
            <a className="text-link" href={wendel.sustainability}>
              So arbeiten wir <ArrowIcon />
            </a>
          </div>
        </section>

        <section className="contact-section" id="kontakt">
          <div className="page-width contact-grid">
            <div className="contact-invitation">
              <p className="section-kicker">
                <PinIcon size={18} /> Zwingenberg an der Bergstraße
              </p>
              <h2>
                Das Gute liegt
                <br />
                näher, als Sie denken.
              </h2>
              <p>
                Besuchen Sie uns direkt am Hof. Oder finden Sie einen unserer
                Verkaufsstände in Ihrer Nähe.
              </p>
              <a className="button button-green" href={wendel.stands}>
                <PinIcon />
                Verkaufsstand finden <ArrowIcon />
              </a>
              <a
                className="route-photo"
                href={wendel.route}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/images/wendel/restored/farm-v1.webp"
                  alt="Blühende Landschaft an der Bergstraße bei Wendel"
                  width="1254"
                  height="1254"
                  loading="lazy"
                />
                <span>
                  <PinIcon /> Ihr Weg zum Hof
                  <ArrowIcon />
                </span>
              </a>
            </div>
            <div className="visit-info">
              <div className="info-top">
                <span className="status-pill">
                  <span />
                  {wendel.season}
                </span>
                <span>Wir freuen uns auf die nächste Ernte.</span>
              </div>
              <h3>Spargel & Obsthof Wendel</h3>
              <address>
                Spargelhof 1<br />
                64673 Zwingenberg
              </address>
              <a
                className="text-link"
                href={wendel.route}
                target="_blank"
                rel="noreferrer"
              >
                Route zum Hof planen <ArrowIcon />
              </a>
              <div className="hours">
                <div>
                  <span>Hofladen & Hof-Café</span>
                  <strong>April – Juni</strong>
                </div>
                <div>
                  <span>Täglich, auch Sonn- & Feiertage</span>
                  <strong>8 – 19 Uhr</strong>
                </div>
              </div>
              <p className="small-note">
                Saisonzeiten, keine aktuellen Öffnungszeiten. Aktuelle Hinweise
                und Pflücktermine bitte vor Ihrem Besuch prüfen.
              </p>
              <div className="info-contact">
                <a href="tel:+49625179304">06251 79304</a>
                <a href="mailto:info@spargel-wendel.de">
                  info@spargel-wendel.de
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-section page-width">
          <div>
            <p className="section-kicker">Gut zu wissen</p>
            <h2>
              Noch eine
              <br />
              kleine Frage?
            </h2>
            <p>Wir helfen Ihnen auch gern persönlich.</p>
            <a className="text-link" href="mailto:info@spargel-wendel.de">
              Schreiben Sie uns <ArrowIcon />
            </a>
          </div>
          <div className="faq-list">
            {questions.map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="jobs-strip page-width">
          <div>
            <h3>Gutes wächst im Team.</h3>
            <p>Lust auf frische Luft und eine Arbeit, die Früchte trägt?</p>
          </div>
          <a className="text-link" href={wendel.jobs}>
            Jobs bei Wendel <ArrowIcon />
          </a>
        </section>
      </main>

      <footer className="footer">
        <div className="page-width">
          <div className="footer-top">
            <a href="#top" aria-label="Wendel – nach oben">
              <img
                src="/brand/wendel.png"
                width="400"
                height="310"
                alt="Wendel"
              />
            </a>
            <p>
              Wir sehen uns
              <br />
              beim Guten.
            </p>
            <a className="footer-up" href="#top" aria-label="Zurück nach oben">
              ↑
            </a>
          </div>
          <div className="footer-grid">
            <div>
              <h3>Besuchen Sie uns</h3>
              <p>
                Spargelhof 1<br />
                64673 Zwingenberg
              </p>
              <a href={wendel.route} target="_blank" rel="noreferrer">
                Route planen
              </a>
            </div>
            <div>
              <h3>Sagen Sie Hallo</h3>
              <a href="tel:+49625179304">06251 79304</a>
              <a href="mailto:info@spargel-wendel.de">info@spargel-wendel.de</a>
            </div>
            <nav aria-label="Entdecken">
              <h3>Wendel entdecken</h3>
              {navigation.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
              <a href={wendel.sustainability}>Nachhaltigkeit</a>
            </nav>
            <nav aria-label="Informationen">
              <h3>Gut zu wissen</h3>
              <a href={wendel.stands}>Verkaufsstellen</a>
              <a href={wendel.picking}>Selbst pflücken</a>
              <a href={wendel.jobs}>Arbeiten bei Wendel</a>
            </nav>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Spargel & Obsthof Wendel</span>
            <span>Mit Herz an der Bergstraße.</span>
            <nav aria-label="Rechtliches">
              <a href={`${wendel.origin}/impressum/`}>Impressum</a>
              <a href={`${wendel.origin}/datenschutzerklaerung/`}>
                Datenschutz
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
