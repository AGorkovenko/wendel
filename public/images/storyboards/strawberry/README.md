# Strawberry growth storyboard

All frames are 1122 × 1402 PNG files generated as continuity-preserving edits of the previous frame.

| Frame | File | Video transition |
|---:|---|---|
| 00 | `00-boden-vorbereitet.png` | clean prepared soil, no plants or straw |
| 01 | `01-anpflanzen.png` | one tiny starter plant is planted by hand |
| 02 | `02-wachsen.png` | crown fills out, flower buds rise |
| 03 | `03-bluehen.png` | buds open; one bumblebee pollinates |
| 04 | `04-reifen.png` | flowers form green, pale and red fruit |
| 05 | `05-ernten.png` | hand picks the ripe fruit into a cardboard basket |

## Recommended video workflow

Generate five short transitions rather than asking the model for the full lifecycle in one pass:

1. frame 00 → frame 01, 2–3 seconds: a hand plants the starter;
2. frame 01 → frame 02, 3–4 seconds: the hand leaves, the plant grows and straw is added only near the end;
3. frame 02 → frame 03, 3–4 seconds: buds open and the bumblebee arrives;
4. frame 03 → frame 04, 4–5 seconds: flowers form and fruit ripens;
5. frame 04 → frame 05, 3–4 seconds: the ripe fruit is picked into the basket.

Use the end frame of every clip as the start frame of the next clip. Preserve the fixed camera; ask for biological growth only. Join the clips without crossfades, then export a constant-frame-rate master.

## Shared negative constraints

No camera movement, no reframing, no changing field or tunnel, no fantasy morphing, no duplicated leaves or fruit, no plastic CGI texture, no text, no labels, no logo, no watermark. The opening field is bare: straw must not appear before the plant has visibly established.

The full motion prompt is stored at `docs/video-prompts/strawberry-growth.seedance.json`.
