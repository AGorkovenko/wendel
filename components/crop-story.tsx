"use client";

import { useState } from "react";

const crops = {
  Erdbeere: [
    { stage: "01", title: "Ankommen", text: "Im Juli setzen wir die jungen Pflanzen in die vorbereitete Erde.", visual: "seed" },
    { stage: "02", title: "Wachsen", text: "Sonne, geschützter Anbau und Wasser genau dort, wo es gebraucht wird.", visual: "leaf" },
    { stage: "03", title: "Blühen", text: "Hummeln tragen den Pollen behutsam von Blüte zu Blüte.", visual: "flower" },
    { stage: "04", title: "Reifen", text: "Auf Stroh gebettet färben sich die Früchte langsam Wendel-rot.", visual: "fruit" },
    { stage: "05", title: "Genießen", text: "Von Hand gepflückt. Direkt im Körbchen. So frisch wie möglich.", visual: "basket" },
  ],
  Spargel: [
    { stage: "01", title: "Wurzeln", text: "Unter der Erde sammelt die Spargelpflanze Kraft für die Saison.", visual: "seed" },
    { stage: "02", title: "Schützen", text: "Die Dämme speichern Wärme und Feuchtigkeit im Boden.", visual: "leaf" },
    { stage: "03", title: "Entdecken", text: "Sobald die Spitze die Erde hebt, ist der richtige Moment gekommen.", visual: "flower" },
    { stage: "04", title: "Stechen", text: "Jede Stange wird einzeln und von Hand geerntet.", visual: "fruit" },
    { stage: "05", title: "Frisch halten", text: "Gewaschen, sortiert und schnell gekühlt geht es direkt zum Verkauf.", visual: "basket" },
  ],
  Himbeere: [
    { stage: "01", title: "Setzen", text: "Junge Ruten finden im geschützten Tunnel ihren Platz.", visual: "seed" },
    { stage: "02", title: "Pflegen", text: "Sorgfältiges Binden und gezielte Bewässerung stärken jede Pflanze.", visual: "leaf" },
    { stage: "03", title: "Bestäuben", text: "Blüten und Nützlinge bilden ein kleines, lebendiges System.", visual: "flower" },
    { stage: "04", title: "Reifen", text: "Licht und Luft lassen aus zarten Früchten volles Aroma entstehen.", visual: "fruit" },
    { stage: "05", title: "Pflücken", text: "Direkt ins Schälchen, damit die empfindliche Frucht unversehrt bleibt.", visual: "basket" },
  ],
} as const;

type Crop = keyof typeof crops;

export function CropStory() {
  const [crop, setCrop] = useState<Crop>("Erdbeere");
  const [step, setStep] = useState(2);
  const item = crops[crop][step];

  return (
    <section className={`crop-story crop-${crop.toLowerCase()}`} id="vom-feld">
      <div className="section-shell crop-shell">
        <div className="crop-copy">
          <p className="section-kicker">Vom Feld zu Ihnen</p>
          <h2>Geschmack beginnt lange vor der Ernte.</h2>
          <div className="crop-tabs" role="tablist" aria-label="Kultur auswählen">
            {(Object.keys(crops) as Crop[]).map((name) => (
              <button
                key={name}
                role="tab"
                aria-selected={crop === name}
                onClick={() => { setCrop(name); setStep(2); }}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="stage-copy" aria-live="polite">
            <span>{item.stage} / 05</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
          <div className="stage-controls" aria-label="Wachstumsphasen">
            {crops[crop].map((stage, index) => (
              <button
                key={stage.stage}
                className={index === step ? "active" : ""}
                onClick={() => setStep(index)}
                aria-label={`${stage.stage}: ${stage.title}`}
              />
            ))}
          </div>
        </div>

        <div className="crop-visual" aria-hidden="true">
          <div className="sun-glow" />
          <div className="soil-line soil-line-back" />
          <div className="soil-line" />
          <div className={`plant plant-${item.visual}`}>
            <span className="stem" />
            <span className="leaf leaf-a" />
            <span className="leaf leaf-b" />
            <span className="leaf leaf-c" />
            <span className="blossom"><i /><i /><i /><i /><i /></span>
            <span className="berry"><i /></span>
          </div>
          <div className="visual-caption">{crop} · {item.title}</div>
        </div>
      </div>
    </section>
  );
}
