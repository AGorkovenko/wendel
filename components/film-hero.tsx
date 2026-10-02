"use client";

import { useEffect, useRef, useState } from "react";
import { PinIcon } from "./icons";

const clamp = (n: number) => Math.max(0, Math.min(1, n));
const chapters = [
  "Ein guter Anfang",
  "Zeit zum Wachsen",
  "Mit Sorgfalt geerntet",
  "Vom Feld ins Körbchen",
];

export function FilmHero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [staticMode, setStaticMode] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [ending, setEnding] = useState(false);

  useEffect(() => {
    const section = root.current!;
    const media = video.current!;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let target = 0;
    let disposed = false;
    const setPreference = () => {
      setStaticMode(preference.matches);
      setVideoEnabled(!preference.matches);
    };
    setPreference();
    preference.addEventListener("change", setPreference);
    const seek = () => {
      if (
        disposed ||
        preference.matches ||
        !Number.isFinite(media.duration) ||
        media.readyState < 2 ||
        media.seeking
      )
        return;
      if (Math.abs(media.currentTime - target) > 0.035)
        media.currentTime = target;
    };
    const update = () => {
      raf = 0;
      const progress = clamp(
        -section.getBoundingClientRect().top /
          Math.max(1, section.offsetHeight - innerHeight),
      );
      const film = clamp(progress / 0.79);
      const finish = clamp((progress - 0.81) / 0.17);
      const eased = finish * finish * (3 - 2 * finish);
      section.style.setProperty(
        "--opening",
        String(1 - clamp(progress / 0.055)),
      );
      section.style.setProperty("--finish", String(eased));
      section.style.setProperty("--film-progress", String(film));
      section.style.setProperty(
        "--chapter-visible",
        progress > 0.055 && progress < 0.76 ? "1" : "0",
      );
      section.dataset.final = film >= 1 ? "true" : "false";
      setChapter(film < 0.26 ? 0 : film < 0.53 ? 1 : film < 0.83 ? 2 : 3);
      setEnding(film >= 1);
      if (Number.isFinite(media.duration))
        target = film * Math.max(0, media.duration - 0.04);
      seek();
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
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
    <section
      ref={root}
      className={`film-story${staticMode ? " is-static" : ""}`}
      id="top"
      aria-label="Vom Feld ins Körbchen"
    >
      <noscript>
        <style>
          {
            ".film-story{height:100svh;--finish:1;--opening:0}.film-final{opacity:1!important}.film-signature,.film-outro{opacity:1!important}.site-header{color:#16382a;background:white}.site-logo img{filter:none!important}"
          }
        </style>
      </noscript>
      <div className="film-pin">
        <div className="film-frame" aria-hidden="true">
          <video
            ref={video}
            muted
            playsInline
            width="1920"
            height="1080"
            preload={videoEnabled && !staticMode ? "auto" : "none"}
            src={videoEnabled && !staticMode ? "/media/hero-scroll.mp4" : undefined}
            poster="/media/hero-poster.jpg"
            onError={() => setStaticMode(true)}
          />
          <img
            className="film-final"
            src="/media/hero-end.jpg"
            alt=""
            width="1920"
            height="1080"
          />
        </div>
        <div className="film-shade" />
        <div className="film-intro">
          <p>Spargel & Obsthof Wendel</p>
          <h1>
            Gutes wächst
            <br />
            ganz nah.
          </h1>
          <div className="intro-bottom">
            <p>
              Spargel, Erdbeeren und Himbeeren.
              <br />
              Mit Sorgfalt gewachsen. Von uns für Sie.
            </p>
            <div className="scroll-cue">
              <span className="scroll-ring" aria-hidden="true">
                ↓
              </span>
              <span>
                Scrollen und
                <br />
                Wachsen erleben
              </span>
            </div>
          </div>
        </div>
        <div className="film-place">
          <PinIcon size={16} />
          Zwingenberg an der Bergstraße
        </div>
        <div className="film-chapter" aria-hidden="true">
          <span />
          {chapters[chapter]}
        </div>
        <div className="film-signature">
          <img
            src="/brand/wendel.png"
            alt="Spargel & Obsthof Wendel – Der Bauer nach Ihrem Geschmack"
            width="400"
            height="310"
          />
        </div>
        <div className="film-outro" inert={!ending && !staticMode}>
          <p>So schmeckt das Gute von hier.</p>
          <a className="text-link" href="#ernte">
            Unsere Ernte entdecken <span aria-hidden="true">↓</span>
          </a>
        </div>
        <a className="film-skip" href="#ernte">
          Geschichte überspringen <span aria-hidden="true">↗</span>
        </a>
        <div className="film-track" aria-hidden="true">
          <i />
        </div>
      </div>
    </section>
  );
}
