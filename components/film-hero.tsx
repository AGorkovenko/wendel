"use client";

import { useEffect, useRef, useState } from "react";
const clamp = (n: number) => Math.max(0, Math.min(1, n));

export function FilmHero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [staticMode, setStaticMode] = useState(false);
  useEffect(() => {
    const section = root.current!;
    const media = video.current!;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let target = 0;
    let disposed = false;
    const setPreference = () => setStaticMode(preference.matches);
    setPreference();
    preference.addEventListener("change", setPreference);
    const seek = () => {
      if (disposed || !Number.isFinite(media.duration) || media.readyState < 2 || media.seeking) return;
      if (Math.abs(media.currentTime - target) > 0.035) media.currentTime = target;
    };
    const update = () => {
      raf = 0;
      const progress = clamp(-section.getBoundingClientRect().top / Math.max(1, section.offsetHeight - innerHeight));
      const film = clamp(progress / 0.79);
      const finish = clamp((progress - 0.81) / 0.17);
      const eased = finish * finish * (3 - 2 * finish);
      section.style.setProperty("--opening", String(1 - clamp(progress / 0.055)));
      section.style.setProperty("--finish", String(eased));
      section.style.setProperty("--film-progress", String(film));
      section.dataset.final = film >= 1 ? "true" : "false";
      section.dataset.scrolling = progress > 0.025 ? "true" : "false";
      if (Number.isFinite(media.duration)) target = film * Math.max(0, media.duration - 0.04);
      seek();
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    media.addEventListener("loadeddata", queue);
    media.addEventListener("seeked", seek);
    update();
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      preference.removeEventListener("change", setPreference);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      media.removeEventListener("loadeddata", queue);
      media.removeEventListener("seeked", seek);
    };
  }, []);
  return (
    <section ref={root} className={`film-story${staticMode ? " is-static" : ""}`} id="top" aria-label="Vom Feld ins Körbchen">
      <div className="film-pin">
        <div className="film-frame" aria-hidden="true">
          <video ref={video} muted playsInline preload={staticMode ? "none" : "auto"} poster="/media/hero-poster.jpg" onError={() => setStaticMode(true)}>
            {!staticMode && <source src="/media/hero-scroll.mp4" type="video/mp4" onError={() => setStaticMode(true)} />}
          </video>
          <img className="film-final" src="/media/hero-end.jpg" alt="" width="1920" height="1080" />
        </div>
        <div className="film-shade" />
        <header className="film-header">
          <a href="#top" className="hero-wordmark" aria-label="Wendel Startseite"><img src="/brand/wendel.png" alt="Wendel" width="400" height="310" /></a>
          <nav aria-label="Hauptnavigation"><a href="#ernte">Unsere Ernte</a><a href="#hof">Der Hof</a><a href="#besuch">Besuch planen</a></nav>
          <a className="header-find" href="https://spargelhof-wendel.de/verkauf-hofladen-hof-cafe/">Verkaufsstellen <span aria-hidden="true">↗</span></a>
        </header>
        <div className="film-intro">
          <p>Familienbetrieb an der Bergstraße</p>
          <h1>Hier wächst<br />Vorfreude.</h1>
          <div className="intro-bottom"><span>Vom ersten Grün bis ins Körbchen.<br />Entdecken Sie unsere Ernte.</span><span className="scroll-cue">Mit dem Scrollen beginnt die Geschichte <span aria-hidden="true">↓</span></span></div>
        </div>
        <div className="film-signature"><img src="/brand/wendel.png" alt="Spargel & Obsthof Wendel — Der Bauer nach Ihrem Geschmack" width="400" height="310" /></div>
        <div className="film-outro"><p>Von unseren Feldern.<br />Für Ihren Tisch.</p><a href="#ernte">Unsere Ernte entdecken <span aria-hidden="true">↓</span></a></div>
        <a className="film-skip" href="#ernte">Direkt zur Ernte <span aria-hidden="true">↗</span></a>
        <div className="film-track" aria-hidden="true"><i /></div>
      </div>
    </section>
  );
}
