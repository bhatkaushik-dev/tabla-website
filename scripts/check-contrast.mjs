/**
 * Walks every rendered page and reports any text that fails WCAG AA contrast.
 *
 *   npm run build && npm start        # in one terminal
 *   node scripts/check-contrast.mjs   # in another
 *
 * Optional args: --url=http://localhost:3000 --chrome="/path/to/chrome"
 *
 * This measures *computed* colours in a real browser rather than the tokens in
 * globals.css, so it catches the cases token math misses: translucent overlays,
 * a colour inherited from an unexpected ancestor, or one component that opted
 * out of the palette. Run it after any palette change — the dark/gold theme has
 * plenty of headroom, but "plenty" is a measurement, not an assumption.
 */

import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const arg = (name, fallback) => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};

const BASE = arg("url", "http://localhost:3000").replace(/\/$/, "");
const ROUTES = ["/", "/about", "/performances", "/gallery", "/classes", "/contact"];
const PORT = 9444;

const CHROME_CANDIDATES = [
  arg("chrome", ""),
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "google-chrome",
  "chromium",
].filter(Boolean);

/** Runs in the page: compare each text node's colour to its effective background. */
const AUDIT = `(() => {
  // Tailwind v4 emits modern colour syntax — an opacity modifier like
  // text-foreground/75 computes to oklab(... / 0.75), not rgba(). Reading those
  // channels as RGB gives nonsense, so every colour goes through a canvas,
  // which resolves ANY CSS colour to straight sRGB + alpha.
  const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  const cache = new Map();
  const toRGBA = css => {
    if (cache.has(css)) return cache.get(css);
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#000';
    ctx.fillStyle = css;               // invalid colours leave the previous value
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    const out = [d[0], d[1], d[2], d[3] / 255];
    cache.set(css, out);
    return out;
  };

  // src over dst, both straight sRGB; dst is assumed opaque.
  const over = (src, dst) => {
    const a = src[3];
    return [
      src[0] * a + dst[0] * (1 - a),
      src[1] * a + dst[1] * (1 - a),
      src[2] * a + dst[2] * (1 - a),
      1,
    ];
  };

  const lum = ([r, g, b]) => {
    const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };

  // Collect every painted layer up the tree, then composite them back down so
  // translucent panels stack correctly instead of being skipped.
  const bgOf = el => {
    const layers = [];
    let n = el;
    while (n) {
      const c = toRGBA(getComputedStyle(n).backgroundColor);
      if (c[3] > 0) {
        layers.push(c);
        if (c[3] >= 0.999) break;
      }
      n = n.parentElement;
    }
    let base = [0, 0, 0, 1];                       // the canvas behind everything
    for (let i = layers.length - 1; i >= 0; i--) base = over(layers[i], base);
    return base;
  };

  const failures = new Map();
  const SELECTOR = 'p,h1,h2,h3,h4,h5,h6,a,span,li,dt,dd,label,button,summary,figcaption,strong,em,td,th';

  document.querySelectorAll(SELECTOR).forEach(el => {
    const text = (el.textContent || '').trim();
    if (!text || el.children.length) return;               // leaf text nodes only
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none') return;
    if (el.closest('[hidden],[aria-hidden="true"],[inert]')) return;
    const box = el.getBoundingClientRect();
    if (box.width < 2 || box.height < 2) return;

    const bg = bgOf(el);
    // Translucent text is judged on what the eye actually sees: the colour
    // composited over its background.
    const fg = over(toRGBA(cs.color), bg);

    const a = lum(fg), b = lum(bg);
    const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

    const size = parseFloat(cs.fontSize);
    const bold = Number(cs.fontWeight) >= 700;
    const isLarge = size >= 24 || (size >= 18.66 && bold);
    const required = isLarge ? 3 : 4.5;

    if (ratio < required) {
      const rgb = c => 'rgb(' + c.slice(0, 3).map(Math.round).join(', ') + ')';
      const key = cs.color + '|' + rgb(bg) + '|' + Math.round(size);
      if (!failures.has(key)) {
        failures.set(key, {
          ratio: +ratio.toFixed(2),
          required,
          fontSize: Math.round(size),
          color: cs.color + ' -> ' + rgb(fg),
          background: rgb(bg),
          sample: text.slice(0, 48),
        });
      }
    }
  });

  return JSON.stringify([...failures.values()]);
})()`;

function launchChrome() {
  const profile = mkdtempSync(join(tmpdir(), "contrast-"));
  for (const bin of CHROME_CANDIDATES) {
    try {
      const child = spawn(
        bin,
        [
          "--headless",
          "--disable-gpu",
          `--remote-debugging-port=${PORT}`,
          `--user-data-dir=${profile}`,
          "about:blank",
        ],
        { stdio: "ignore" },
      );
      child.on("error", () => {});
      return { child, profile };
    } catch {
      /* try the next candidate */
    }
  }
  throw new Error(
    "Could not launch Chrome. Pass --chrome=/path/to/chrome or set CHROME_PATH.",
  );
}

async function connect() {
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const target = list.find((t) => t.type === "page");
      if (target) return target.webSocketDebuggerUrl;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error("Chrome did not expose a debugging target in time.");
}

async function main() {
  try {
    const res = await fetch(BASE, { method: "HEAD" });
    if (!res.ok) throw new Error(String(res.status));
  } catch {
    console.error(`No server at ${BASE}. Start one with \`npm start\` (or pass --url=).`);
    process.exit(2);
  }

  const { child, profile } = launchChrome();
  const wsUrl = await connect();
  const ws = new WebSocket(wsUrl);

  let id = 0;
  const pending = new Map();
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const msgId = ++id;
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });

  await new Promise((resolve) => (ws.onopen = resolve));
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg.result);
      pending.delete(msg.id);
    }
  };

  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 2400,
    deviceScaleFactor: 1,
    mobile: false,
  });

  let total = 0;

  for (const route of ROUTES) {
    await send("Page.navigate", { url: BASE + route });
    await new Promise((r) => setTimeout(r, 2500));
    const { result } = await send("Runtime.evaluate", {
      expression: AUDIT,
      returnByValue: true,
    });
    const failures = JSON.parse(result.value);
    total += failures.length;

    if (failures.length === 0) {
      console.log(`  ok    ${route}`);
    } else {
      console.log(`  FAIL  ${route} — ${failures.length} distinct failure(s)`);
      for (const f of failures) {
        console.log(
          `          ${f.ratio}:1 (needs ${f.required}:1)  ${f.fontSize}px  ` +
            `${f.color} on ${f.background}\n            "${f.sample}"`,
        );
      }
    }
  }

  ws.close();
  child.kill();
  try {
    rmSync(profile, { recursive: true, force: true });
  } catch {
    /* Windows sometimes holds the profile briefly; harmless. */
  }

  console.log(
    total === 0
      ? "\nAll text passes WCAG AA."
      : `\n${total} contrast failure(s).`,
  );
  process.exit(total === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
