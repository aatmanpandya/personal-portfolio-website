# Personal Portfolio — "The Forward Pass"

An interactive AI/ML portfolio built around one idea: **the site is a neural
network, and moving through it is a forward pass.** A live, mouse-reactive
network spans the background; the page you're on sets the activation
wavefront's base position (Home → Contact = layer 0 → layer 4), and scrolling
within a page advances it further across that layer's slice. Nodes light up,
signal particles fire along the edges, and a subtle "loss" value keeps
converging as you move deeper into the site.

Stack: **React + Vite + Tailwind v4 + Framer Motion + React Router.** Canvas
network is hand-written (no heavy libs) and respects `prefers-reduced-motion`.
Pages: `/` `/journey` `/projects` `/skills` `/contact`.

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
  routes.js                ← page/route list — single source of truth
  App.jsx                  ← BrowserRouter + Layout + AnimatedRoutes
  index.css                ← design tokens / theme
  pages/
    Home.jsx                ← Hero + layer picker (/)
    NotFound.jsx             ← 404
  components/
    Layout.jsx               ← persistent shell: background, HUD, nav
    AnimatedRoutes.jsx        ← <Routes> + page transitions
    NeuralBackground.jsx      ← the live canvas network
    ScrollHud.jsx             ← progress rail + converging loss
    LayerNav.jsx              ← prev/next layer footer link
    LayerMenu.jsx             ← Home's grid of links into each layer
    Nav.jsx  Hero.jsx  Journey.jsx  Projects.jsx  Skills.jsx  Contact.jsx
```

## Deploy

It's a static SPA — after `npm run build`, deploy the `dist/` folder.

Because routing uses clean URLs (`/projects`, not `/#/projects`), the host
needs to serve `index.html` for any unmatched path so a direct link or
refresh on `/projects` doesn't 404:

- **Netlify** — already handled by `public/_redirects`.
- **Vercel** — already handled by `vercel.json`.
- **GitHub Pages / other static hosts** — these don't support SPA rewrites
  out of the box; you'd need the 404.html-redirect workaround or switch to
  `HashRouter` in `App.jsx`.
