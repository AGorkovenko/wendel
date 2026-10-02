# Homepage refinement, 2 October 2026

## Direction before implementation

Keep the existing full-screen chapter film. Below it, create a fresh produce
campaign rather than a row of photographic cards: oversized isolated crops,
generous white space and colored plinths, followed by a large photographic
invitation to spend a day at the farm. Real Wendel family, café and shop photos
remain documentary evidence; generated images are illustrative product imagery,
not photos of the actual property or people.

Tokens: chalk white #ffffff; asparagus green #09633d; forest ink #16382a;
leaf #edf3e7; strawberry #b53048; pollen #e9d899. Instrument Sans carries
headings and practical information; Newsreader provides a quiet editorial
counterpoint in quotations. Left-aligned content, centered produce silhouettes.

Layout:

    film / final studio boxes
    compact seasonal notice
    large heading + crop triptych on distinct colored plinths
    full-width self-picking photograph / café and shop editorial pair
    actual family portrait + green story panel
    pollination close-up + practical environmental commitments
    visit information + actual farm photograph
    questions / recruitment / generous signature footer

Self-review: retain no repeated numbered decoration or identical photo-card
kit. Give produce the one expressive visual moment; retain quiet navigation,
realistic season information and functional links elsewhere.

## Interaction defects to address

- New wheel gestures during a transition are consumed and discarded.
- Backward animation uses repeated seeking and is decoder-dependent.
- A two-pixel alignment gate disables the story when partially scrolled.
- Disabled chapter controls prevent users from changing their mind mid-animation.

Preserve one chapter per gesture, but retain one pending intention and allow
direction reversal immediately. Encode a native reverse-playing companion film
without modifying the original. Ignore momentum, not deliberate new gestures.

## Content sources

Visitor information checked against
https://spargelhof-wendel.de/verkauf-hofladen-hof-cafe/ and environmental
information against https://spargelhof-wendel.de/nachhaltigkeit-umweltschutz/.
No invented current opening status or certification claims.

## Implemented

- Wheel gestures retain one pending chapter. Reversal cancels the old playback;
  generation tokens prevent obsolete play promises from settling a newer request.
- Strong renewed trackpad impulses re-arm even if a previous inertia tail remains.
- Small stage misalignment is tolerated, while page scrolling remains native once
  the stage is left. A fresh exit request during the ending is honored after the
  brand reveal instead of disappearing.
- Direct nonadjacent chapter selection jumps to its still rather than playing
  through every intervening chapter.
- `hero-forward-v2.mp4`: 1280×720, 24 fps, about 14 MB. Companion reverse film:
  960×540, 24 fps, about 10 MB. Both have matching 35.25-second duration,
  native playback and bounded playback rates. Original videos remain unchanged.
- Four generated assets, about 1 MB in total, are described with their exact
  prompts in `public/images/generated/README.md`. Alpha is preserved on crops.
- Homepage composition is in `app/homepage.css`, scoped to content below the
  original hero; original hero responsive rules are preserved.

## Verification

Browser checks: immediate forward/backward reversal, native reverse playback,
final checkpoint at 35.193 seconds, exit into content and reverse re-entry;
desktop 1388×1258 and mobile layouts 390×844 and 320×568 without horizontal
overflow or missing loaded images. Mobile menu opens and closes on navigation.
Actual touch hardware and OS reduced-motion setting are not exercised; their
fallback/input paths remain implemented. Automated gesture, request-routing,
media preservation and checkpoint tests run with `npm test` (12 passing).
Type checking and the production build also pass. Production server runs on
localhost:3000. Full-page screenshots are unsuitable for this svh-based pinned
stage in the current browser capture implementation; visual checks use ordinary
viewport screenshots at the real browser dimensions instead.
