# Wendel homepage · design refinement

## Direction

A modern farm destination, not an online grocery template. The agricultural film is the signature interaction; everything after it is confident, useful and photographic. Actual Wendel photographs connect the opening story to real people and a real place.

## Tokens

- Paper `#ffffff`: clean backgrounds and the film's studio ending.
- Wendel green `#09633d`: actions and the family story.
- Orchard ink `#16382a`: readable text.
- Leaf mist `#f0f4ec`: seasonal and visit information.
- Berry `#b53048`: restrained seasonal emphasis.
- Field gold `#e9d899`: small natural accents.

Instrument Sans Variable carries interface and relaxed display headings. Newsreader is reserved for one family statement. Body lines remain short. Generous display spacing is paired with denser practical information.

## Layout

```text
Logo           harvest · visit · family             find a stand
┌────────────── Fullscreen scrubbed film ──────────────────────┐
│ Large introduction → unobstructed growing and harvest story │
│ Final image shrinks → logo above the three boxes            │
└────────────────────────────────────────────────────────────┘
Season notice                      hours · picking · location
Big harvest heading                               introduction
Asparagus photo     lower Strawberry photo      Raspberry photo
Product details     staggered triptych          product details
Café landscape + shop story                 Self-pick portrait
Family photo + regional detail              green family story
Bee photo                         three concrete farm practices
Local visit invitation            address · route · season hours
Common questions                  expandable answers
Green footer                      contact · links · jobs · legal
```

Content aligns left except the film ending. Photography supplies the colour. White space gives the produce room to breathe. The asymmetric visit section acknowledges that a café and a picking experience need different information.

## Plan review

Removed repeated generated landscapes, isolated emoji rows, tiny studio crops and identical service cards. No scroll hijacking, scattered entrance animations, invented quotes, fake live availability or search forms without a working service. The fullscreen-to-brand transition remains the one signature motion.

## References inspected

- [Oishii](https://oishii.com/): large product photography and unhurried visual hierarchy; viewed directly in browser.
- [Corphes case study, Luminous](https://www.luminous.gr/projects/corphes-website/): scroll narrative tied to growing and harvesting; agency search-index description (direct fetch returned 403).
- [Organic & Original Tastes, Awwwards](https://www.awwwards.com/sites/organic-orignial-tastes): agricultural design-gallery reference, not a template to copy.

## Content and behavior

Official Wendel homepage, company, sales/café and sustainability pages are the content sources. Reviewed 2 October 2026: homepage says the season has ended. April–June hours are seasonal, not current opening hours. Original stand finder and picking announcements use verified anchors. The menu links to the official 2026 PDF. No tracking, embedded map or contact form pretending to send messages.

Keep original film and storyboard files unchanged. Decorative video, poster fallback, reduced-motion static end frame, skip link, native mobile dialog and native FAQ disclosures. Check desktop and mobile visually, run TypeScript and production build before committing.

## Verification · previous continuous version · 2 October 2026

- Desktop layout inspected at 1280 × 720; mobile at 390 × 844.
- Fullscreen video reaches its 35.23s endpoint before the studio-image shrink and logo reveal. Reverse scrolling seeks backwards rather than playing independently.
- Mobile navigation opens a native modal, Escape closes it and returns focus; section links close the modal before navigation.
- FAQ disclosure opens and shows its answer. No mobile horizontal overflow or broken loaded photographs.
- Original footage is preserved; the video request starts only after the browser's reduced-motion preference has been checked.
- TypeScript check, production build and whitespace validation pass. Secondary-page actions currently lead to the existing official Wendel pages, not placeholder routes.

## Chapter-based introduction · approved refinement

The continuous scrub is replaced with user-triggered chapters. One distinct wheel gesture, swipe or key press plays a short transition and leaves the scene still until the next action. The controls work independently of scrolling. Native page scrolling resumes at the ending; navigation and the skip link always bypass the introduction.

Keep Paper `#ffffff`, Wendel green `#09633d`, Orchard ink `#16382a`, Leaf mist `#f0f4ec`, Berry `#b53048` and Field gold `#e9d899`. Instrument Sans carries both the large scene headings and short explanations. Left-aligned captions sit above the main agricultural action; the studio ending stays centred.

```text
Opening: existing large introduction and start control
┌──────────────── Fullscreen farm film ─────────────────┐
│ Chapter count                         skip the story │
│ Meaningful heading                                   │
│ Two lines: what Wendel does and why it matters         │
│ One concrete practice                                │
│                 living agricultural scene            │
│ Herkunft · Sorgfalt · Natur · Reife · Handwerk · Frische│
│ previous                              next chapter   │
└──────────────────────────────────────────────────────┘
Final: three boxes → smaller image → Wendel logo → page
```

Review: do not put a generic marketing card over each scene or describe only plant biology. Use confirmed Wendel practices: regional family farming, resource-conscious irrigation, weather protection, pollinators, ripe berries and direct sales. The film is an illustrative montage, not a claim that asparagus planting and harvest happen within one season. Numbering now describes an actual sequence. Motion belongs only to a requested chapter transition and the final brand reveal.

Unlike the earlier continuous design, wheel interception is intentionally limited to the fullscreen introduction at the top of the page, with momentum gating, backwards navigation, touch and keyboard controls. Never intercept zoom gestures, modal interaction or scrolling elsewhere. Reduced motion and failed video use still images with the same chapter text; the original film is unchanged.

### Chapter checkpoints and verification

Opening 0s → Herkunft 2.8s → Sorgfalt 9.8s → Natur 14.6s → Reife 19s → Handwerk 27.2s → Frische 29.2s → studio ending 35.193s. Still images in `public/media/chapter-*.jpg` are extracted from the supplied film at those times, not independently generated replacements.

Adjacent forward chapters use native muted video playback at up to 4× speed, then pause at the checkpoint. Rewind and long direct chapter jumps use bounded seeking. Transitions take 1.1–2.1 seconds; the final studio-frame shrink adds 0.8 seconds. A stalled or unavailable decoder cannot leave navigation locked indefinitely.

Verified in the browser at 1280 × 720, 390 × 844, 320 × 568 and 844 × 390. A large wheel gesture advances only one chapter with page position unchanged. The media pauses at the chosen time and stays there; keyboard navigation returns to the previous checkpoint. Chapter buttons restore fullscreen framing if focus or partial page scrolling moved it. The final logo appears above all three boxes; the next fresh gesture resumes native scrolling and the normal header. No horizontal overflow at the tested mobile widths.

Seven automated tests cover long trackpad momentum, distinct gestures, reversal, small deltas, boundary release, available ordered checkpoints and bounded playback speeds. TypeScript and production build pass. Reduced-motion and video-error paths use chapter stills; touch cancellation begins before the browser latches scrolling. Actual touch hardware and OS-level reduced-motion emulation have not been exercised in this browser session.
