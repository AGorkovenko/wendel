"use client";

import { useEffect, useRef, useState } from "react";
import { navigation, wendel } from "@/lib/wendel";
import { PinIcon } from "./icons";

export function SiteHeader() {
  const [theme, setTheme] = useState("opening");
  const [menuOpen, setMenuOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const film = document.getElementById("top");
      if (!film) return;
      const end = film.offsetHeight - innerHeight;
      const y = -film.getBoundingClientRect().top;
      setTheme(
        y < 70 && !film.classList.contains("is-static")
          ? "opening"
          : y >= end - 20
            ? "content"
            : "hidden",
      );
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const observer = new MutationObserver(queue);
    const film = document.getElementById("top");
    if (film)
      observer.observe(film, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    update();
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, []);

  const closeMenu = () => dialog.current?.close();

  return (
    <>
      <header className={`site-header header-${theme}`}>
        <a
          className="site-logo"
          href="#top"
          aria-label="Wendel – zur Startseite"
        >
          <img
            src="/brand/wendel.png"
            alt="Spargel & Obsthof Wendel"
            width="400"
            height="310"
          />
        </a>
        <nav className="desktop-nav" aria-label="Hauptnavigation">
          {navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-location" href={wendel.stands}>
          <PinIcon />
          Verkaufsstand finden
        </a>
        <button
          className="menu-toggle"
          aria-label="Menü öffnen"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => {
            dialog.current?.showModal();
            setMenuOpen(true);
          }}
        >
          <span />
          <span />
        </button>
      </header>
      <dialog
        ref={dialog}
        id="mobile-menu"
        className="mobile-menu"
        aria-label="Hauptnavigation"
        onClose={() => setMenuOpen(false)}
        onClick={(event) => {
          if (event.target === dialog.current) closeMenu();
        }}
      >
        <div className="menu-top">
          <img src="/brand/wendel.png" width="400" height="310" alt="Wendel" />
          <button onClick={closeMenu} aria-label="Menü schließen">
            Schließen <span aria-hidden="true">×</span>
          </button>
        </div>
        <nav aria-label="Mobile Hauptnavigation">
          {navigation.map((item) => (
            <a href={item.href} key={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a href="#kontakt" onClick={closeMenu}>
            Ihr Besuch
          </a>
        </nav>
        <a className="button button-green" href={wendel.stands}>
          <PinIcon />
          Verkaufsstand finden
        </a>
        <p>
          Spargelhof 1 · 64673 Zwingenberg
          <br />
          <a href="tel:+49625179304">06251 79304</a>
        </p>
      </dialog>
    </>
  );
}
