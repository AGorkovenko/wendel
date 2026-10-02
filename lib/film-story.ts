// Checkpoints are chosen from the finished film, not evenly divided by duration.
export const filmChapters = [
  {
    name: "Start",
    time: 0,
    image: "/media/hero-poster.jpg",
    title: "",
    copy: "",
    fact: "",
  },
  {
    name: "Herkunft",
    time: 2.8,
    image: "/media/chapter-heritage.jpg",
    title: "Guter Geschmack\nbeginnt hier.",
    copy: "Hier an der Bergstraße bauen wir Spargel und Beeren an. Als Familie stehen wir für das, was auf unseren Feldern wächst.",
    fact: "Familienbetrieb in Zwingenberg seit 1986",
  },
  {
    name: "Sorgfalt",
    time: 9.8,
    image: "/media/chapter-care.jpg",
    title: "Sorgfalt,\ndie mitwächst.",
    copy: "Wir bewässern ressourcenschonend und schützen unsere Pflanzen vor Wetterextremen. Gute Bedingungen sind der Anfang guter Qualität.",
    fact: "Schutz vor Frost · weniger Verdunstung",
  },
  {
    name: "Natur",
    time: 14.6,
    image: "/media/chapter-nature.jpg",
    title: "Kleine Helfer.\nGroße Wirkung.",
    copy: "Hummeln bestäuben unsere Beerenblüten, auch bei kühlem Wetter. Mit Blühwiesen geben wir Insekten Nahrung und Lebensraum.",
    fact: "Bestäubung und lebendige Vielfalt",
  },
  {
    name: "Reife",
    time: 19,
    image: "/media/chapter-ripeness.jpg",
    title: "Geschmack\nbraucht Zeit.",
    copy: "Unsere Erdbeeren dürfen auf dem Feld reifen. Beim Spargel zählt der richtige Erntezeitpunkt. So kommt guter Geschmack ins Körbchen.",
    fact: "Reif gepflückte Beeren · tagesfrischer Spargel",
  },
  {
    name: "Handwerk",
    time: 27.2,
    image: "/media/chapter-handwork.jpg",
    title: "Mit Erfahrung.\nVon Hand.",
    copy: "Spargel stechen, Beeren pflücken, die Ernte behutsam ablegen: Hinter jedem Körbchen stehen Menschen, die ihr Handwerk verstehen.",
    fact: "Behutsam geerntet, sorgfältig behandelt",
  },
  {
    name: "Frische",
    time: 29.2,
    image: "/media/chapter-freshness.jpg",
    title: "Kurze Wege.\nFrischer Genuss.",
    copy: "Vom Feld in unseren Hofladen und an unsere Verkaufsstände. Direkt vermarktet, ohne lange Umwege — damit die Frische bei Ihnen ankommt.",
    fact: "Direkt vom Hof · Beerenschalen aus Wellpappe",
  },
  {
    name: "Wendel",
    time: 35.193,
    image: "/media/hero-end.jpg",
    title: "",
    copy: "",
    fact: "",
  },
] as const;

export const lastFilmChapter = filmChapters.length - 1;

export function chapterTime(index: number, duration: number) {
  return Math.max(0, Math.min(filmChapters[index].time, duration - 0.04));
}

export function transitionDuration(from: number, to: number) {
  return Math.min(2100, Math.max(1100, Math.abs(to - from) * 260));
}

// Keep one deliberate request, not an unbounded queue of trackpad events.
export function chapterRequest(
  current: number,
  requested: number,
  travel: number,
  busy: boolean,
) {
  if (requested < 0 || requested > lastFilmChapter || requested === current)
    return "ignore";
  if (!busy) return "start";
  return Math.sign(requested - current) !== travel ? "interrupt" : "queue";
}

// A trackpad gesture can emit events for longer than the video transition.
// Do not unlock on animation completion: wait for a quiet gap or a reversal.
export class ChapterWheelGesture {
  private lastTime = -Infinity;
  private direction = 0;
  private distance = 0;
  private consumed = false;
  private lastMagnitude = 0;
  private triggeredAt = -Infinity;

  push(delta: number, time: number) {
    const direction = Math.sign(delta);
    if (!direction)
      return {
        direction: 0,
        trigger: false,
        consumed: this.consumed,
        fresh: false,
      };
    const magnitude = Math.abs(delta);
    // A new trackpad stroke can start before the previous stroke's momentum
    // has gone quiet. A strong renewed impulse is intentional, a tiny tail isn't.
    const renewedImpulse =
      this.consumed &&
      time - this.triggeredAt > 350 &&
      magnitude >= 28 &&
      magnitude > this.lastMagnitude * 3;
    const fresh =
      time - this.lastTime > 200 ||
      direction !== this.direction ||
      renewedImpulse;
    if (fresh) {
      this.consumed = false;
      this.distance = 0;
    }
    this.lastTime = time;
    this.direction = direction;
    this.lastMagnitude = magnitude;
    this.distance += magnitude;
    const trigger = !this.consumed && this.distance >= 28;
    if (trigger) {
      this.consumed = true;
      this.triggeredAt = time;
    }
    return { direction, trigger, consumed: this.consumed, fresh };
  }
}
