"use client";

import { useEffect, useRef, useState } from "react";
import { PinIcon } from "./icons";
import {
  ChapterWheelGesture,
  chapterTime,
  chapterRequest,
  filmChapters,
  lastFilmChapter,
  transitionDuration,
} from "@/lib/film-story";

export function FilmHero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reverseVideo = useRef<HTMLVideoElement>(null);
  const navigate = useRef<(index: number) => void>(() => {});
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [moving, setMoving] = useState(false);
  const [still, setStill] = useState(true);
  const [stillImage, setStillImage] = useState<string>(filmChapters[0].image);
  const [reversing, setReversing] = useState(false);
  const ending = chapter === lastFilmChapter;
  const current = filmChapters[chapter];

  useEffect(() => {
    const section = root.current!;
    const media = video.current!;
    const rewind = reverseVideo.current!;
    let active = media;
    let reverseActive = false;
    let travel = 0;
    let pending: number | null = null;
    let exitRequested = false;
    let generation = 0;
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
    // Re-entering from the page, or a fractional native scroll, must not leave
    // the controls inert. Only capture while most of the stage is visible.
    const inStage = () => {
      const top = section.getBoundingClientRect().top;
      return top <= 2 && top > -Math.min(180, innerHeight * 0.25);
    };
    const modalOpen = () => Boolean(document.querySelector("dialog[open]"));
    const canStep = (direction: number) =>
      direction > 0 ? index < lastFilmChapter : index > 0;
    const stop = () => {
      generation++;
      cancelAnimationFrame(raf);
      clearTimeout(finishTimer);
      media.pause();
      rewind.pause();
    };
    const settle = (animateEnding = true) => {
      stop();
      if (disposed) return;
      if (!failed && !preference.matches && media.readyState >= 2) {
        media.currentTime = chapterTime(index, media.duration);
      }
      setStill(true);
      setStillImage(filmChapters[index].image);
      section.style.setProperty(
        "--finish",
        index === lastFilmChapter ? "1" : "0",
      );
      const complete = () => {
        busy = false;
        setMoving(false);
        const next = pending;
        pending = null;
        if (
          exitRequested &&
          index === lastFilmChapter &&
          inStage() &&
          !modalOpen()
        ) {
          exitRequested = false;
          window.scrollTo({
            top: section.offsetTop + section.offsetHeight,
            behavior: preference.matches ? "instant" : "smooth",
          });
          return;
        }
        if (next !== null && inStage() && !modalOpen()) go(next);
      };
      if (index === lastFilmChapter && animateEnding && !preference.matches) {
        finishTimer = setTimeout(complete, 850);
      } else complete();
    };

    const go = (next: number) => {
      const request = chapterRequest(index, next, travel, busy);
      if (request === "ignore") return;
      if (request === "queue") {
        pending = next;
        return;
      }
      // Chapter buttons may be used while the introduction is partly scrolled
      // out of view. Return its stage to fullscreen before starting the story.
      if (!atTop())
        window.scrollTo({ top: section.offsetTop, behavior: "instant" });
      const from =
        busy && active.readyState >= 2 && Number.isFinite(active.duration)
          ? reverseActive
            ? rewind.duration - active.currentTime
            : active.currentTime
          : filmChapters[index].time;
      stop();
      const token = generation;
      pending = null;
      exitRequested = false;
      const previous = index;
      index = next;
      travel = Math.sign(next - previous);
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
        !Number.isFinite(media.duration) ||
        Math.abs(next - previous) > 1
      ) {
        settle(false);
        return;
      }
      const target = chapterTime(index, media.duration);
      const duration = transitionDuration(from, target);
      reverseActive = target < from;
      active = reverseActive ? rewind : media;
      // Reverse is encoded as a companion film: native decoding in both
      // directions, never dozens of asynchronous seeks per second.
      if (active.readyState < 2 || !Number.isFinite(active.duration)) {
        settle(false);
        return;
      }
      const nativeFrom = reverseActive ? rewind.duration - from : from;
      const nativeTarget = reverseActive ? rewind.duration - target : target;
      active.currentTime = Math.max(
        0,
        Math.min(nativeFrom, active.duration - 0.04),
      );
      active.playbackRate = Math.min(
        4,
        Math.max(1, Math.abs(target - from) / (duration / 1000)),
      );
      setReversing(reverseActive);
      const waitingSince = performance.now();
      let started = 0;
      const tick = (now: number) => {
        if (disposed || token !== generation) return;
        if (!started) {
          if (now - waitingSince > 2500) {
            settle(false);
            return;
          }
          if (active.seeking || active.readyState < 2) {
            raf = requestAnimationFrame(tick);
            return;
          }
          started = now;
          setStill(false);
          void active.play().catch(() => {
            if (token === generation) settle(false);
          });
        }
        const actualDuration =
          (Math.abs(target - from) / active.playbackRate) * 1000;
        if (
          active.currentTime >= nativeTarget - 0.025 ||
          now - started > actualDuration + 1200
        ) {
          settle();
          return;
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
      if (!inStage() || modalOpen()) {
        wheelCaptured = false;
        return;
      }
      // A fresh gesture leaves the final scene; the arrival gesture's momentum
      // must not immediately scroll the final scene away.
      if (!busy && !canStep(input.direction) && !wheelCaptured) return;
      event.preventDefault();
      wheelCaptured = true;
      if (input.trigger) {
        if (busy && index === lastFilmChapter && input.direction > 0)
          exitRequested = true;
        else go(index + input.direction);
      }
    };
    const key = (event: KeyboardEvent) => {
      if (
        !inStage() ||
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
        if (busy && index === lastFilmChapter && direction > 0)
          exitRequested = true;
        else go(index + direction);
      }
    };
    const keyUp = (event: KeyboardEvent) => {
      if (event.key === capturedKey) capturedKey = "";
    };
    const touchStart = (event: TouchEvent) => {
      touchStartedHere =
        inStage() && !modalOpen() && event.touches.length === 1;
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
        if (busy && index === lastFilmChapter && direction > 0)
          exitRequested = true;
        else go(index + direction);
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
      if (busy && !inStage()) {
        pending = null;
        exitRequested = false;
        settle(false);
      }
    };
    const visibility = () => {
      if (document.hidden && busy) {
        pending = null;
        exitRequested = false;
        settle(false);
      }
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
        <div
          className="film-frame"
          data-reversing={reversing}
          aria-hidden="true"
        >
          <video
            ref={video}
            muted
            playsInline
            width="1280"
            height="720"
            preload={videoEnabled ? "auto" : "none"}
            src={videoEnabled ? "/media/hero-forward-v2.mp4" : undefined}
            poster="/media/hero-poster.jpg"
          />
          <video
            ref={reverseVideo}
            className="film-reverse"
            muted
            playsInline
            width="960"
            height="540"
            preload={videoEnabled ? "auto" : "none"}
            src={videoEnabled ? "/media/hero-reverse-v2.mp4" : undefined}
          />
          <img
            className="film-still"
            data-visible={still}
            src={stillImage}
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
              disabled={chapter === 0}
              onClick={() => navigate.current(chapter - 1)}
            >
              ↑
            </button>
            {!ending && (
              <button
                type="button"
                className="film-next"
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
