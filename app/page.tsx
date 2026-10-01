import { FilmHero } from "@/components/film-hero";
import { PinIcon } from "@/components/icons";

const origin = "https://spargelhof-wendel.de";
const products = [
  { name: "Spargel", season: "Der Geschmack des Frühlings", text: "Frisch gestochen, behutsam sortiert. Unser Spargel wächst im milden Klima der Bergstraße.", href: "/spargel-aus-zwingenberg/", position: "left" },
  { name: "Erdbeeren", season: "Sonne im Körbchen", text: "Am Strauch gereift und von Hand gepflückt. So kommt der volle Geschmack bei Ihnen an.", href: "/sonnengereifte-erdbeeren/", position: "center" },
  { name: "Himbeeren", season: "Klein, zart, voller Aroma", text: "Geschützt gewachsen und mit Fingerspitzengefühl geerntet. Beere für Beere ein Genuss.", href: "/aromatische-himbeeren/", position: "right" },
];

export default function Home() {
  return (
    <main>
      <a className="access-skip" href="#ernte">Zum Inhalt springen</a>
      <FilmHero />
      <section className="harvest page-width" id="ernte">
        <div className="harvest-heading"><h2>Die gute Zeit<br />hat ihren Geschmack.</h2><p>Spargel, Erdbeeren und Himbeeren aus eigenem Anbau. Direkt von der Bergstraße, mit kurzen Wegen und viel Sorgfalt.</p></div>
        <div className="produce-grid">
          {products.map(product => <article className={`produce produce-${product.position}`} key={product.name}>
            <a className="produce-photo" href={`${origin}${product.href}`} aria-label={`Mehr über ${product.name}`}><img src="/images/storyboards/dual-crop-16x9/08-studio-three-boxes.png" alt={`Frische ${product.name} in einer Wendel-Box`} width="1920" height="1080" loading="lazy" /></a>
            <div className="produce-title"><h3>{product.name}</h3><a href={`${origin}${product.href}`} aria-label={`Mehr über ${product.name}`}><span aria-hidden="true">↗</span></a></div>
            <p className="produce-season">{product.season}</p><p>{product.text}</p>
          </article>)}
        </div>
      </section>
      <section className="farm-story" id="hof">
        <div className="farm-photo"><img src="/images/concepts/wendel-hero-art-direction-v1.png" alt="Spargel- und Erdbeerreihen im Morgenlicht an der Bergstraße" width="1942" height="809" loading="lazy" /><span>Zuhause an der Bergstraße.</span></div>
        <div className="farm-copy"><span className="little-flower" aria-hidden="true">✳</span><h2>Ein Stück Land.<br />Ein Stück Zuhause.</h2><p>In Zwingenberg sind unsere Felder und unsere Familie zu Hause. Hier begleiten wir unsere Früchte vom Pflanzen bis zur Ernte. Und freuen uns, wenn Sie vorbeischauen.</p><a className="button button-white" href={`${origin}/das-unternehmen/`}>Die Familie kennenlernen</a></div>
      </section>
      <section className="visit page-width" id="besuch">
        <div className="visit-heading"><h2>Bleiben Sie<br />ein bisschen.</h2><p>Ein Einkauf im Hofladen, ein Stück Kuchen oder ein Körbchen selbst gepflückte Beeren. Manchmal liegt das Gute ganz nah.</p></div>
        <div className="visit-options">
          <a href={`${origin}/verkauf-hofladen-hof-cafe/`}><span className="visit-symbol" aria-hidden="true">☕</span><div><h3>Hofladen & Café</h3><p>Feldfrisch einkaufen. Hausgemacht genießen.</p></div><span aria-hidden="true">↗</span></a>
          <a href={`${origin}/verkauf-hofladen-hof-cafe/`}><span className="visit-symbol" aria-hidden="true">✿</span><div><h3>Selbst pflücken</h3><p>Mitten im Feld schmeckt der Sommer am besten.</p></div><span aria-hidden="true">↗</span></a>
          <a href={`${origin}/nachhaltigkeit-umweltschutz/`}><span className="visit-symbol" aria-hidden="true">❋</span><div><h3>Mit der Natur arbeiten</h3><p>Nützlinge, bewusste Bewässerung und Sonnenenergie.</p></div><span aria-hidden="true">↗</span></a>
        </div>
      </section>
      <section className="find-us">
        <div className="page-width find-grid"><div><PinIcon size={32} /><h2>Wir sind<br />ganz in Ihrer Nähe.</h2><a className="button button-green" href={`${origin}/verkauf-hofladen-hof-cafe/`}>Verkaufsstellen & Öffnungszeiten</a></div><div className="address"><p>Besuchen Sie uns auf dem Hof</p><h3>Spargelhof 1<br />64673 Zwingenberg</h3><a href="https://www.google.com/maps/search/?api=1&query=Spargelhof+1+64673+Zwingenberg" target="_blank" rel="noreferrer">Route planen <span aria-hidden="true">↗</span></a><p className="season-note">Wir freuen uns auf Ihren Besuch während der Saison. Aktuelle Öffnungszeiten und Pflücktermine finden Sie auf unserer Hofseite.</p></div></div>
      </section>
      <footer className="footer page-width"><div className="footer-top"><img src="/brand/wendel.png" width="400" height="310" alt="Spargel & Obsthof Wendel" /><p>Gutes wächst<br />ganz in der Nähe.</p><div><a href="tel:+49625179304">06251 79304</a><a href="mailto:info@spargel-wendel.de">info@spargel-wendel.de</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Spargel & Obsthof Wendel</span><nav aria-label="Rechtliches"><a href={`${origin}/impressum/`}>Impressum</a><a href={`${origin}/datenschutzerklaerung/`}>Datenschutz</a></nav><a href="#top">Nach oben ↑</a></div></footer>
    </main>
  );
}
