# Personal Portfolio — "The Forward Pass"

An interactive AI/ML portfolio built around one idea: **the page is a neural
network, and scrolling is a forward pass through it.** A live, mouse-reactive
network spans the background; as you scroll, an activation wavefront sweeps
left→right, lighting up neurons, firing signal along the edges, and revealing
each section as it reaches that layer. A subtle "loss" value converges toward
zero as you go.

Stack: **React + Vite + Tailwind v4 + Framer Motion.** Canvas network is hand-
written (no heavy libs) and respects `prefers-reduced-motion`.

## Run it

```bash
npm install       # first time only
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Make it yours

**All your content lives in one file:** [`src/content.js`](src/content.js).
Every placeholder is marked with `// TODO`. Edit:

- `profile` — name, title, tagline, location, bio, résumé + optional photo
- `links` — email, GitHub, LinkedIn, and optional X / blog
- `skills` — grouped tech
- `projects` — best first; name, blurbs, tags, optional metric + links
- `journey` — your timeline / milestones

Drop a `resume.pdf` (or a photo) into `public/` and point `content.js` at it,
e.g. `resumeUrl: "/resume.pdf"`.

## Structure

```
src/
  content.js               ← edit this
  App.jsx                  ← section order
  index.css                ← design tokens / theme
  components/
    NeuralBackground.jsx   ← the live canvas network
    ScrollHud.jsx          ← progress rail + converging loss
    Nav.jsx  Hero.jsx  Journey.jsx  Projects.jsx  Skills.jsx  Contact.jsx
```

## Deploy

It's a static site — after `npm run build`, deploy the `dist/` folder to
Netlify, Vercel, GitHub Pages, or Cloudflare Pages (drag-and-drop works).
