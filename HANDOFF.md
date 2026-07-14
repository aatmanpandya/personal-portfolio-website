# Handoff — Aatman Pandya's Portfolio Website

Repo: https://github.com/aatmanpandya/personal-portfolio-website
Local path: `~/Desktop/personal portfolio website`

## Branches

| Branch | State | Purpose |
|---|---|---|
| `main` | Working, deployable | Single-page scrolling site — the current "real" version |
| `multipage` | Working, deployable | Same site split into routed pages (React Router) |
| `main2` | Empty scaffold (this branch) | Clean slate — only `README.md` + `.gitignore`. You're here. |

`main` and `multipage` diverge only in page structure; the concept, content, and
canvas background are identical between them. **Neither is merged into the
other** — pick one to keep building on, or treat `multipage` as the eventual
successor to `main`.

## The concept

**"The Forward Pass."** The whole site is a neural network; the background is
a live, hand-written `<canvas>` (`src/components/NeuralBackground.jsx`, no
external canvas/animation library) — layered nodes and edges spanning the
viewport. On `main`, scrolling drives an activation wavefront left→right
through the layers. On `multipage`, the wavefront's base position is set by
*which page you're on*, and in-page scroll advances it further within that
page's slice — so navigating jumps the signal to the right layer instead of
resetting.

**Layer-tap interaction** (both branches, same code): click or right-click
any non-interactive part of the page (text, headings, section backgrounds —
anything that isn't a link/button/input) and it ripples a pulse through the
nearest network layer's nodes from the click point, then forwards a burst of
glowing packets onward to the next layer. Listeners are on `window` with an
interactive-element guard — an earlier version listened on the canvas
directly and silently failed almost everywhere because foreground content
sits on top of it in the stacking order.

Stack: React + Vite + Tailwind v4 + Framer Motion (+ React Router on
`multipage` only). `multipage` also has `public/_redirects` (Netlify) and
`vercel.json` (Vercel) for clean-URL SPA rewrites — `main` doesn't need these
since it has no client-side routing.

## Content

Everything editable lives in **`src/content.js`** — profile, links, skills,
projects, journey/timeline. Already filled in from Aatman's resume
(`public/Aatman_Resume.pdf`, also wired up as the "Download résumé" button).

**Outstanding TODOs in `content.js`** (present on both `main` and
`multipage`):
- `links.github` — empty. No GitHub URL was on the resume; get it from Aatman.
- `links.linkedin` — empty. Resume only embedded it as an icon, not
  extractable text; get the profile URL from Aatman.
- `projects[0].links.repo` — same GitHub-repo-link gap, for the AI Resume ATS
  Analyzer project specifically.

## Open design decisions (from earlier conversation, not yet acted on)

- **Accent color** — currently blue-signal + mint-synapse on near-black.
  Never revisited; still the default.
- **Photo** — `profile.photoUrl` is empty (shows a monogram instead). Never
  decided whether to add one.
- **Jargon level** — deliberately set to "tasteful hints" (subtle `layer_n`
  labels, quiet loss ticker) rather than full ML-jargon-forward. This was a
  decision, not a gap — revisit only if the vibe feels off in practice.

## Running it

```bash
cd ~/Desktop/"personal portfolio website"
git checkout main        # or multipage
npm install
npm run dev               # http://localhost:5173
npm run build              # production build → dist/
```

The dev server is **not currently running** — it was stopped before this
branch was created (checking out an orphan branch wipes the working tree, so
there was nothing left for it to serve).

## Suggested next steps

1. Get the missing GitHub/LinkedIn URLs from Aatman and fill in `content.js`
   on both `main` and `multipage`.
2. Decide `main` vs. `multipage` as the version to actually deploy — `main`
   is simpler; `multipage` has real per-page URLs and a slightly richer nav
   (prev/next layer links, a `LayerMenu` grid on Home).
3. Deploy (Netlify or Vercel were the discussed targets — `multipage` has the
   redirect configs ready; `main` would deploy as-is with no extra config
   needed since it has no client routing).
4. Resolve the open design decisions above if they still feel unresolved.
