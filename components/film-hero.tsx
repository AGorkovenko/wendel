"use client";

import { useEffect, useRef, useState } from "react";
import { PinIcon } from "./icons";
import {
  ChapterWheelGesture,
  chapterTime,
  filmChapters,
  lastFilmChapter,
  transitionDuration,
} from "@/lib/film-story";

export function FilmHero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const navigate = useRef<(index: number) => void>(() => {});
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [moving, setMoving] = useState(false);
  const [still, setStill] = useState(true);
  const ending = chapter === lastFilmChapter;
  const current = filmChapters[chapter];

  useEffect(() => {
    const section = root.current!;
    const media = video.current!;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const gesture = new ChapterWheelGesture();
    let index = Number(section.dataset.chapter) || 0;
    let busy = false;
    let failed = false;
    let disposed = false;
    let raf = 0;
    let finishTimer: ReturnType<typeof setTimeout> | undefined;
    let touchY = 0;
    let touchConsumed = false;
    let touchStartedHere = false;
    let wheelCaptured = false;
    let capturedKey = "";

    const atTop = () => Math.abs(section.getBoundingClientRect().top) < 2;
    const modalOpen = () => Boolean(document.querySelector("dialog[open]"));
    const canStep = (direction: number) =>
      direction > 0 ? index < lastFilmChapter : index > 0;
    const stop = () => {
      cancelAnimationFrame(raf);
      clearTimeout(finishTimer);
      media.pause();
    };
    const settle = (animateEnding = true) => {
      stop();
      if (disposed) return;
      if (!failed && !preference.matches && media.readyState >= 2) {
        media.currentTime = chapterTime(index, media.duration);
      }
      setStill(true);
      section.style.setProperty(
        "--finish",
        index === lastFilmChapter ? "1" : "0",
      );
      const complete = () => {
        busy = false;
        setMoving(false);
      };
      if (index === lastFilmChapter && animateEnding && !preference.matches) {
        finishTimer = setTimeout(complete, 850);
      } else complete();
    };

    const go = (next: number) => {
      if (busy || next === index || next < 0 || next > lastFilmChapter) return;
      // Chapter buttons may be used while the introduction is partly scrolled
      // out of view. Return its stage to fullscreen before starting the story.
      if (!atTop())
        window.scrollTo({ top: section.offsetTop, behavior: "instant" });
      const from = Number.isFinite(media.currentTime)
        ? media.currentTime
        : filmChapters[index].time;
      index = next;
      busy = true;
      setChapter(index);
      setMoving(true);
      section.style.setProperty("--opening", index === 0 ? "1" : "0");
      section.style.setProperty("--finish", "0");
      section.style.setProperty(
        "--film-progress",
        String(index / lastFilmChapter),
      );
      if (
        preference.matches ||
        failed ||
        media.readyState < 2 ||
        !Number.isFinite(media.duration)
      ) {
        settle(false);
        return;
      }
      setStill(false);
      const target = chapterTime(index, media.duration);
      const duration = transitionDuration(from, target);
      const started = performance.now();
      let lastSeek = 0;
      // Adjacent forward chapters use the browser's smooth video decoder.
      // Rewind and long chapter jumps use bounded seeking instead.
      let playing = target > from && (target - from) / (duration / 1000) <= 4;
      if (playing) {
        media.playbackRate = Math.max(1, (target - from) / (duration / 1000));
        void media.play().catch(() => {
          playing = false;
        });
      }
      const tick = (now: number) => {
        if (disposed) return;
        if (playing) {
          if (
            media.currentTime >= target - 0.025 ||
            now - started > duration + 1500
          ) {
            settle();
            return;
          }
          raf = requestAnimationFrame(tick);
          return;
        }
        const progress = Math.min(1, (now - started) / duration);
        if (progress >= 1) {
          settle();
          return;
        }
        // Bounded seeking works in both directions. Short GOP encoding keeps
        // decoding responsive without relying on negative playback rates.
        if (!media.seeking && now - lastSeek > 32) {
          const eased = progress * progress * (3 - 2 * progress);
          media.currentTime = from + (target - from) * eased;
          lastSeek = now;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    navigate.current = go;

    const wheel = (event: WheelEvent) => {
      if (
        event.ctrlKey ||
        event.metaKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        !event.deltaY
      )
        return;
      const delta =
        event.deltaY *
        (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
      const input = gesture.push(delta, performance.now());
      if (input.fresh) wheelCaptured = false;
      if (!atTop() || modalOpen()) {
        wheelCaptured = false;
        return;
      }
      // A fresh gesture leaves the final scene; the arrival gesture's momentum
      // must not immediately scroll the final scene away.
      if (!busy && !canStep(input.direction) && !wheelCaptured) return;
      event.preventDefault();
      wheelCaptured = true;
      if (input.trigger && !busy) go(index + input.direction);
    };
    const key = (event: KeyboardEvent) => {
      if (
        !atTop() ||
        modalOpen() ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey
      )
        return;
      const target = event.target as HTMLElement;
      if (
        target.closest("a, button, input, textarea, select, [contenteditable]")
      )
        return;
      const direction = ["ArrowDown", "PageDown", " "].includes(event.key)
        ? event.shiftKey
          ? -1
          : 1
        : ["ArrowUp", "PageUp"].includes(event.key)
          ? -1
          : 0;
      if (!direction) return;
      if (event.repeat && capturedKey === event.key) {
        event.preventDefault();
        return;
      }
      if (!busy && !canStep(direction)) return;
      event.preventDefault();
      if (!event.repeat) {
        capturedKey = event.key;
        if (!busy) go(index + direction);
      }
    };
    const keyUp = (event: KeyboardEvent) => {
      if (event.key === capturedKey) capturedKey = "";
    };
    const touchStart = (event: TouchEvent) => {
      touchStartedHere = atTop() && !modalOpen() && event.touches.length === 1;
      touchConsumed = false;
      touchY = event.touches[0]?.clientY ?? 0;
    };
    const touchMove = (event: TouchEvent) => {
      if (!touchStartedHere || event.touches.length !== 1) return;
      const delta = touchY - event.touches[0].clientY;
      if (!delta) return;
      const direction = Math.sign(delta);
      if (!busy && !touchConsumed && !canStep(direction)) return;
      event.preventDefault();
      // Cancel from the first eligible move, before the browser latches native
      // scrolling. Only advance after a deliberate swipe crosses the threshold.
      if (!touchConsumed && Math.abs(delta) >= 28) {
        touchConsumed = true;
        if (!busy) go(index + direction);
      }
    };
    const syncMedia = () => {
      if (
        !busy &&
        !preference.matches &&
        !failed &&
        Number.isFinite(media.duration)
      ) {
        media.currentTime = chapterTime(index, media.duration);
      }
    };
    const setPreference = () => {
      setVideoEnabled(!preference.matches && !failed);
      if (busy) settle(false);
    };
    const fail = () => {
      failed = true;
      setVideoEnabled(false);
      settle(false);
    };
    const leave = () => {
      if (busy && !atTop()) settle(false);
    };
    const visibility = () => {
      if (document.hidden && busy) settle(false);
    };

    setPreference();
    preference.addEventListener("change", setPreference);
    window.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("keydown", key);
    window.addEventListener("keyup", keyUp);
    window.addEventListener("scroll", leave, { passive: true });
    section.addEventListener("touchstart", touchStart, { passive: true });
    section.addEventListener("touchmove", touchMove, { passive: false });
    media.addEventListener("loadeddata", syncMedia);
    media.addEventListener("error", fail);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      disposed = true;
      stop();
      navigate.current = () => {};
      preference.removeEventListener("change", setPreference);
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("keydown", key);
      window.removeEventListener("keyup", keyUp);
      window.removeEventListener("scroll", leave);
      section.removeEventListener("touchstart", touchStart);
      section.removeEventListener("touchmove", touchMove);
      media.removeEventListener("loadeddata", syncMedia);
      media.removeEventListener("error", fail);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  return (
    <section
      ref={root}
      className="film-story"
      id="top"
      data-chapter={chapter}
      data-moving={moving}
      data-ending={ending}
      aria-label="Die Wendel Geschichte"
    >
      <noscript>
        <style>
          {
            ".film-story{--finish:1;--opening:0}.film-still{content:url('/media/hero-end.jpg');object-fit:contain!important}.film-controls,.film-scenes,.film-intro,.film-outro,.film-skip,.film-place{display:none!important}.film-shade{opacity:0!important}.film-signature{opacity:1!important}.site-header{color:#16382a;background:white}.site-logo img{filter:none!important}"
          }
        </style>
        <a className="film-nojs-link button button-green" href="#ernte">
          Unsere Ernte entdecken
        </a>
      </noscript>
      <div className="film-pin">
        <div className="film-frame" aria-hidden="true">
          <video
            ref={video}
            muted
            playsInline
            width="1600"
            height="900"
            preload={videoEnabled ? "auto" : "none"}
            src={videoEnabled ? "/media/hero-scroll.mp4" : undefined}
            poster="/media/hero-poster.jpg"
          />
          <img
            className="film-still"
            data-visible={still}
            src={current.image}
            alt=""
            width="1600"
            height="900"
            fetchPriority="high"
          />
        </div>
        <div className="film-shade" />
        <div className="film-intro" aria-hidden={chapter !== 0}>
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
                Einmal scrollen.
                <br />
                Eine Geschichte weiter.
              </span>
            </div>
          </div>
        </div>
        <div className="film-place">
          <PinIcon size={16} />
          Zwingenberg an der Bergstraße
        </div>
        <div
          className="film-scenes"
          aria-live="polite"
          aria-atomic="true"
          aria-busy={moving}
        >
          {chapter > 0 && !ending && (
            <article className="film-scene" key={chapter}>
              <p className="scene-position">
                {String(chapter).padStart(2, "0")} <span>/ 06</span>
              </p>
              <h2>{current.title}</h2>
              <p className="scene-copy">{current.copy}</p>
              <p className="scene-fact">
                <span aria-hidden="true" />
                {current.fact}
              </p>
            </article>
          )}
        </div>
        <div className="film-signature" aria-hidden={!ending}>
          <img
            src="/brand/wendel.png"
            alt="Spargel & Obsthof Wendel – Der Bauer nach Ihrem Geschmack"
            width="400"
            height="310"
          />
        </div>
        <div className="film-outro" inert={!ending} aria-hidden={!ending}>
          <p>So schmeckt das Gute von hier.</p>
          <a className="text-link" href="#ernte">
            Unsere Ernte entdecken <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="film-controls">
          <nav
            className="film-chapters"
            aria-label="Kapitel der Wendel Geschichte"
          >
            {filmChapters.slice(1, -1).map((item, i) => (
              <button
                type="button"
                key={item.name}
                aria-label={`Kapitel ${i + 1}: ${item.name}`}
                aria-current={chapter === i + 1 ? "step" : undefined}
                data-complete={chapter > i + 1}
                disabled={moving}
                onClick={() => navigate.current(i + 1)}
              >
                <span className="chapter-mark" />
                <span className="chapter-name">{item.name}</span>
              </button>
            ))}
          </nav>
          <div className="film-arrows">
            <button
              type="button"
              className="film-back"
              aria-label="Vorheriges Kapitel"
              disabled={moving || chapter === 0}
              onClick={() => navigate.current(chapter - 1)}
            >
              ↑
            </button>
            {!ending && (
              <button
                type="button"
                className="film-next"
                disabled={moving}
                onClick={() => navigate.current(chapter + 1)}
              >
                {chapter === 0
                  ? "Geschichte starten"
                  : chapter === 6
                    ? "Das ist Wendel"
                    : "Weiter"}
                <span aria-hidden="true">↓</span>
              </button>
            )}
          </div>
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
