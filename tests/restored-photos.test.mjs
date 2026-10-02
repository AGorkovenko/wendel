import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import sharp from "sharp";

const names = [
  "family",
  "self-pick",
  "cafe",
  "cake",
  "farm-shop",
  "preserves",
  "farm",
];

test("photo restoration keeps every original and previous website version", () => {
  for (const name of names) {
    for (const extension of ["jpg", "webp"]) {
      assert.ok(
        existsSync(
          new URL(
            `../public/images/wendel/${name}.${extension}`,
            import.meta.url,
          ),
        ),
      );
    }
  }
});

test("restored website photos exist, are optimized and preserve the source aspect ratio", async () => {
  const page = readFileSync(
    new URL("../app/page.tsx", import.meta.url),
    "utf8",
  );
  for (const name of names) {
    const original = await sharp(
      new URL(`../public/images/wendel/${name}.jpg`, import.meta.url).pathname,
    ).metadata();
    const url = new URL(
      `../public/images/wendel/restored/${name}-v1.webp`,
      import.meta.url,
    );
    const restored = await sharp(url.pathname).metadata();
    assert.equal(restored.format, "webp");
    assert.ok(restored.width >= 1000);
    assert.ok(statSync(url).size < 800_000, `${name}: excessive delivery size`);
    assert.ok(
      Math.abs(
        restored.width / restored.height - original.width / original.height,
      ) < 0.01,
      `${name}: changed aspect ratio`,
    );
    assert.ok(page.includes(`/images/wendel/restored/${name}-v1.webp`));
  }
});
