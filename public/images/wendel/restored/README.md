# Wendel photograph restoration — v1

Built-in image generation/editing, 2 October 2026. These are AI-assisted enhancements of the seven official photographs currently used on the homepage, not newly photographed locations. The source JPGs and previous WebPs remain untouched in the parent directory. PNG masters are retained in `masters/`; website delivery uses quality-88 WebP without additional enlargement.

Restoration improves apparent texture, color and tonal balance. It does **not** recover verifiable original detail: faces, fine lettering, foliage and small background objects may be reconstructed. The farm owner should approve likeness and branding before public deployment. In particular, ingredients and other tiny label text should be read from originals, not these derivatives. The original landscape is larger in pixel dimensions than its restored version; the edit prioritizes visual cleanup rather than claiming increased source resolution.

The original framing and aspect ratios are preserved approximately; each website image uses the actual derivative dimensions. This is a local draft update, not publication to the live Wendel website.

## Exact edit prompts

Verification: all 14 original JPG/WebP checksums matched after editing; all seven restored WebPs loaded with nonzero natural dimensions in the local production website. TypeScript, production build and all 14 tests passed. Desktop preview confirmed the cafe/shop and family sections render the restored versions without horizontal overflow.

### family

Input: `../family.jpg`

Restore and enhance this authentic historical family photograph for the original farm website, preserving the EXACT photograph, not reimagining it. All five people must remain the same identifiable individuals: exact facial geometry, age, expressions, skin tone, eye direction, hairstyles, poses, hands, clothing and positions. Do not beautify or replace faces. Preserve every background building, pond, hillside, tree and blossom branch. Gently reduce JPEG artifacts and image noise; recover believable fine detail without hallucinated facial features; improve tonal balance and natural skin colors, subtle local contrast and clarity. Keep the original overcast daylight, composition and 4:3 landscape framing. Photographic restoration, restrained, realistic, no HDR, no halos, no waxy skin, no extra people, no changed objects, no invented text. Produce a high-quality clean version suitable for a large website photograph.

### self-pick

Input: `../self-pick.jpg`

Faithfully restore this real farm photograph, NOT a new scene. Preserve the exact identity, age, facial structure and expression of the girl, her light brown hair, beige sweater with three pink embroidered flowers, pink shirt hem, grey trousers, hands and the strawberries she holds. Preserve the original people in the background, their locations, strawberry rows, straw, polytunnel and trees. Keep the identical portrait composition and crop. Remove JPEG compression artifacts and improve softness gently, with believable detail and natural skin texture; do not invent facial detail or beautify. Correct the overly cyan sky and overly saturated colors to realistic soft overcast daylight. Clean photographic tonal balance, realistic organic colors, no artificial HDR, halos, extra plants or people, no architecture changes. High-quality photographic restoration for a website, not a stock-photo reinterpretation.

### cafe

Input: `../cafe.jpg`

Restore this exact real farm cafe courtyard photograph without redesigning it. Maintain the identical composition and 4:3 framing, every table and green chair, red-and-white parasol, tent canopy and curtain, flower barrel, planter, buildings, statue, cars and machinery in their original positions. Keep signs and any text exactly as in the source; do not invent legible text. Carefully lift dark canopy shadows and balance exposure while retaining natural daylight and bright-surface detail. Reduce compression and noise, improve sharpness and realistic fine texture, correct colors with a restrained warm natural grade. No guests added, no objects removed, no replacement furniture or architecture, no fake HDR, no sharpening halos. An authentic high-quality photographic restoration of the original photograph for a website.

### cake

Input: `../cake.jpg`

Faithfully restore and enhance the supplied real Wendel farm photograph, not a redesign or a new scene. Preserve exact framing, crop, object positions, proportions and authentic location. Reduce JPEG artifacts and noise; recover restrained credible fine detail and natural color balance without fake HDR, halos or over-sharpening. No objects added or removed, no invented text. High-quality photographic restoration for a website. Keep the portrait 3:4 composition of the same four long baking trays (red strawberries, golden crumble cake, dark blueberries, red berries), the same windows and door and blurred Wendel poster. Preserve original food arrangement, baked textures and depth of field, sharpen the cakes subtly without turning background into a different store or replacing text. Natural inviting warm daylight and realistic reds, retain existing strawberry and asparagus artwork.

### farm-shop

Input: `../farm-shop.jpg`

Faithfully restore and enhance the supplied real Wendel farm photograph, not a redesign or a new scene. Preserve exact framing, crop, object positions, proportions and authentic location. Reduce JPEG artifacts and noise; recover restrained credible fine detail and natural color balance without fake HDR, halos or over-sharpening. No objects added or removed, no invented text. High-quality photographic restoration for a website. Keep the same landscape 4:3 courtyard, yellow wall, roof, tent, all green chairs and tables, red-and-white striped parasol, strawberry-shaped furniture, plants and gravel. Especially retain the exact prominent sign text 'Hofladen', same font, size, location and red underline. Keep original sunny blue sky and shadow direction, balance deep shadows gently. Do not replace or modernize anything.

### preserves

Input: `../preserves.jpg`

Faithfully restore and enhance the supplied real Wendel farm photograph, not a redesign or a new scene. Preserve exact framing, crop, object positions, proportions and authentic location. Reduce JPEG artifacts and noise; recover restrained credible fine detail and natural color balance without fake HDR, halos or over-sharpening. No objects added or removed, no invented text. High-quality photographic restoration for a website. Keep the square composition of the same stacked jam jars, green-and-white gingham lids in foreground, red lids to the right, red countertop and defocused bottles and shop backdrop. Preserve original Wendel label artwork, all logo lettering and existing print. Do not rewrite labels or invent readable ingredients. Maintain authentic glass reflections and shallow depth of field. Subtle natural clean color correction and texture improvement, no changed jar shapes or counts.

### farm

Input: `../farm.jpg`

Faithfully restore and enhance the supplied real Wendel farm photograph, not a redesign or a new scene. Preserve exact framing, crop, object positions, proportions and authentic location. Reduce JPEG artifacts and noise; recover restrained credible fine detail and natural color balance without fake HDR, halos or over-sharpening. No objects added or removed, no invented text. High-quality photographic restoration for a website. Keep the identical square landscape composition of the poppy meadow, all trees, hill and real castle with its exact silhouette, tower count, locations and masonry proportions. Preserve daytime clouds, original horizon, depth and viewpoint. Improve fine foliage and flower clarity naturally, eliminate muddy compression, balance pale cloudy sky and natural greens. No new towers, hills, buildings or mountains. Do not transform into sunset, cinematic fiction or an idealized different location.

## Original file checksums (SHA-256)

```text
public/images/wendel/family.jpg 9698f13c2cd04094a5e0b73e515ac46d827de397c290a262d01e55b4fe701533
public/images/wendel/family.webp 222ba88deb5ecdbeae26554583612f0f61cfbaedb5138fe33b950756114d32ef
public/images/wendel/self-pick.jpg aae94ccc6d1893fcfaab0e54d2b257dd036cd29f7e402a1d8c2e23b6133fc320
public/images/wendel/self-pick.webp 90cacf2c523b0f1355d6c0d4bdbde7e29f0c6545c0d130f3a12f0e582778e2f5
public/images/wendel/cafe.jpg 1d858083eda6d09bcc3ec07a529e2893e53a602ec537c56384e766832e4199c9
public/images/wendel/cafe.webp a867e80f10c3857ce8ff9d0ebbf9e077ed34e56f3c95b37d7fbf4f2fdc1ed5c0
public/images/wendel/cake.jpg 3d94747971ac39c3b464c1c8a934f2ea44325b6b88d0a976768f58ca2193a9e3
public/images/wendel/cake.webp cb2ad2993a1d6aefc63d7c26bbe5dbf4650d5b254089fb1eabc48d43bcc1da26
public/images/wendel/farm-shop.jpg 73a6cf0c6e716e9724e0c33d09b004c5e7562a39cbe80b72a40c63e8a0217893
public/images/wendel/farm-shop.webp 9e8343798f41ef5eb94d57934b3ce2cbdadfcb42e2e956fc2279e8d3e9261a79
public/images/wendel/preserves.jpg 15fed88a79fc66c85ed44d008e97264da0937009a805192c089f227e73c23a34
public/images/wendel/preserves.webp 4b83f78fb2984c5e2b988c3f317272dda7c10051949693d6daa51de6148362cd
public/images/wendel/farm.jpg a43d93787d12e9fd232408e6b0387cdad41fd32d7c0677903d5c3f16c7696e9f
public/images/wendel/farm.webp 3ecc47285665d0a6b1c2d0dfb1e977d5a5b2d82d6512b34820954162fca5fb71
```
