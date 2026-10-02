import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import {
  ChapterWheelGesture,
  chapterTime,
  chapterRequest,
  filmChapters,
  lastFilmChapter,
  transitionDuration,
} from "../lib/film-story.ts";

test("a fresh forward gesture is retained during playback", () => {
  assert.equal(chapterRequest(2, 3, 1, true), "queue");
  assert.equal(chapterRequest(2, 3, 1, false), "start");
});

test("a reversal interrupts immediately instead of being swallowed", () => {
  assert.equal(chapterRequest(2, 1, 1, true), "interrupt");
  assert.equal(chapterRequest(1, 2, -1, true), "interrupt");
});

test("chapter boundaries and same-chapter requests never queue", () => {
  assert.equal(chapterRequest(0, -1, 1, true), "ignore");
  assert.equal(chapterRequest(7, 8, 1, true), "ignore");
  assert.equal(chapterRequest(2, 2, 1, true), "ignore");
});

test("one trackpad gesture triggers one chapter, including a long momentum tail", () => {
  const gesture = new ChapterWheelGesture();
  let triggers = 0;
  for (let time = 0; time < 4000; time += 16) {
    if (gesture.push(time < 100 ? 20 : 2, time).trigger) triggers++;
  }
  assert.equal(triggers, 1);
});

test("a quiet gap arms the next intentional gesture", () => {
  const gesture = new ChapterWheelGesture();
  assert.equal(gesture.push(80, 0).trigger, true);
  assert.equal(gesture.push(30, 100).trigger, false);
  assert.equal(gesture.push(80, 350).trigger, true);
});

test("a deliberate new stroke is recognized even before the momentum tail stops", () => {
  const gesture = new ChapterWheelGesture();
  gesture.push(80, 0);
  for (let time = 16; time <= 600; time += 16)
    assert.equal(gesture.push(2, time).trigger, false);
  assert.equal(gesture.push(90, 616).trigger, true);
  assert.equal(gesture.push(60, 632).trigger, false);
});

test("direction reversal can return to the previous chapter", () => {
  const gesture = new ChapterWheelGesture();
  gesture.push(80, 0);
  const backwards = gesture.push(-80, 20);
  assert.equal(backwards.trigger, true);
  assert.equal(backwards.direction, -1);
  assert.equal(backwards.fresh, true);
});

test("small deltas accumulate without making zero-delta events advance", () => {
  const gesture = new ChapterWheelGesture();
  assert.equal(gesture.push(8, 0).trigger, false);
  assert.equal(gesture.push(8, 20).trigger, false);
  assert.equal(gesture.push(0, 30).trigger, false);
  assert.equal(gesture.push(12, 40).trigger, true);
});

test("fresh boundary gestures can leave the hero without inheriting a consumed gesture", () => {
  const gesture = new ChapterWheelGesture();
  gesture.push(80, 0);
  assert.equal(gesture.push(8, 20).fresh, false);
  const exit = gesture.push(8, 300);
  assert.equal(exit.fresh, true);
  assert.equal(exit.consumed, false);
});

test("checkpoints are ordered, match actual film time and have available still images", () => {
  assert.equal(lastFilmChapter, 7);
  for (let i = 0; i < filmChapters.length; i++) {
    assert.ok(
      existsSync(new URL(`../public${filmChapters[i].image}`, import.meta.url)),
    );
    if (i) assert.ok(filmChapters[i].time > filmChapters[i - 1].time);
  }
  assert.equal(chapterTime(3, 35.233333), 14.6);
  assert.ok(chapterTime(lastFilmChapter, 35.233333) < 35.233333);
  assert.equal(chapterTime(6, 20), 19.96);
});

test("both native playback companions exist while original films are preserved", () => {
  for (const path of [
    "media/hero-forward-v2.mp4",
    "media/hero-reverse-v2.mp4",
    "media/hero-scroll.mp4",
    "images/storyboards/hero.mp4",
  ]) {
    assert.ok(existsSync(new URL(`../public/${path}`, import.meta.url)));
  }
});

test("transitions have bounded duration in either direction", () => {
  assert.equal(transitionDuration(0, 2.8), 1100);
  assert.equal(transitionDuration(0, 35), 2100);
  assert.equal(transitionDuration(13.3, 9), transitionDuration(9, 13.3));
  for (let i = 1; i < filmChapters.length; i++) {
    const from = filmChapters[i - 1].time;
    const to = filmChapters[i].time;
    assert.ok((to - from) / (transitionDuration(from, to) / 1000) <= 4);
  }
});
