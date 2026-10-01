# Strawberry growth storyboard

All frames are 1122 × 1402 PNG files generated as continuity-preserving edits of the previous frame.

| Frame | File | Video transition |
|---:|---|---|
| 01 | `01-anpflanzen.png` | young plant establishes and unfolds |
| 02 | `02-wachsen.png` | crown fills out, flower buds rise |
| 03 | `03-bluehen.png` | buds open; one bumblebee pollinates |
| 04 | `04-reifen.png` | flowers form green, pale and red fruit |
| 05 | `05-ernten.png` | hand picks the ripe fruit into a cardboard basket |

## Recommended video workflow

Generate four short transitions rather than asking the model for the full lifecycle in one pass:

1. frame 01 → frame 02, 3–4 seconds;
2. frame 02 → frame 03, 3–4 seconds;
3. frame 03 → frame 04, 4–5 seconds;
4. frame 04 → frame 05, 3–4 seconds.

Use the end frame of every clip as the start frame of the next clip. Preserve the fixed camera; ask for biological growth only. Join the clips without crossfades, then export a constant-frame-rate master.

## Shared negative constraints

No camera movement, no reframing, no new plants, no changing field or tunnel, no fantasy morphing, no duplicated leaves or fruit, no plastic CGI texture, no text, no labels, no logo, no watermark.

The full motion prompt is stored at `docs/video-prompts/strawberry-growth.seedance.json`.

