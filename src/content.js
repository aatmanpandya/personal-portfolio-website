// ═══════════════════════════════════════════════════════════════════════════
//  EDIT EVERYTHING HERE. This is the only file you need to touch for content.
//  After editing, re-run `npm run build:map` so the embedding map picks up
//  your changes (node positions and similarity vectors are computed from
//  this text at build time).
// ═══════════════════════════════════════════════════════════════════════════

export const profile = {
  name: "Aatman Pandya",
  title: "AI Engineer",
  // One sharp line. Shows on the Input node and in search placeholders.
  tagline:
    "I build memory for AI agents. My work at DXFactor is live with real users: what an agent keeps from every chat, and what reaches the prompt on the next message.",
  location: "India",
  bio: [
    "I work across the whole agent: memory, RAG, evals, voice calling, and the product around them. I built the first version of ELO end to end at DXFactor, and added speech-to-speech calling to a voice AI platform at Zenalyst.",
    "This site is built the same way. Every node on this map was embedded with all-MiniLM-L6-v2 and placed by semantic similarity. Ask it a question and it retrieves.",
  ],
  resumeUrl: "/Aatman_Resume.pdf",
  photoUrl: "", // optional — e.g. "/me.jpg" in /public. Leave "" to show a monogram.
};

export const links = {
  email: "aatmanpandya595@gmail.com",
  phone: "+91 8160073938",
  github: "https://github.com/aatmanpandya",
  linkedin: "https://www.linkedin.com/in/aatman-pandya-a3ba453a6/",
};

// ─── Map clusters ────────────────────────────────────────────────────────────
// Order here is the guided-tour order. `hue` keys into the cluster palette
// defined in index.css / MapScene.
export const clusters = [
  {
    id: "semantic",
    label: "Agent Memory",
    blurb: "What an agent keeps, and what reaches the prompt.",
  },
  {
    id: "language",
    label: "Retrieval & Search",
    blurb: "Finding the right thing, across languages and scripts.",
  },
  {
    id: "predictive",
    label: "Models in Production",
    blurb: "Trained, monitored, and judged on data they never saw.",
  },
  {
    id: "production",
    label: "Shipped Products",
    blurb: "Voice calls, web apps, and the systems behind them.",
  },
  {
    id: "foundations",
    label: "Foundations",
    blurb: "Where the rigor comes from.",
  },
  {
    id: "beyond",
    label: "Beyond the Loss Function",
    blurb: "The human parts.",
  },
];

// ─── Projects ────────────────────────────────────────────────────────────────
// `size` sets the circle on the map, from 1 to 5: scope, code, and whether real
// people use it. Experience entries use the same scale.
export const projects = [
  {
    id: "proj-elo-memory",
    cluster: "semantic",
    size: 5,
    name: "ELO Agent Memory",
    period: "DXFactor · 2026",
    blurb:
      "Long-term memory for a conversational AI agent, architected and built from the ground up and live with beta users.",
    detail: [
      "Extraction: a background pass pulls facts, people and open conflicts from every chat. Output is schema-enforced, with attribution and durability guards so the model can't store invented facts.",
      "Layered recall: the chat's person is frozen at chat open so the prompt cache holds. Everything else is ranked by meaning to the current message, within a token budget.",
      "Reranker: I proposed and built a Voyage reranker to replace a fixed distance cut-off. The right past chat now reaches the prompt on 96% of messages.",
      "Carry-over: back-reference and time cues let the agent follow a topic across turns, and a working window with a running summary holds the current chat.",
      "Sensitive facts: marked 'never raise first', so the agent only uses them after the user brings them up.",
      "Evals: every memory and RAG change runs through suites with test users of up to 240 facts and 120 chats, on the production prompt path, graded by an LLM judge.",
    ],
    tags: ["Agent Memory", "RAG", "Reranking", "pgvector", "Voyage", "Evals"],
    highlight: "Right past chat in the prompt: 96% of messages.",
    links: { repo: "", demo: "" },
  },
  {
    id: "proj-elo-backend",
    cluster: "production",
    size: 4,
    name: "ELO Backend",
    period: "DXFactor · 2026",
    blurb:
      "The server behind a live AI agent: real-time chat, safety checks, background jobs and encrypted user data.",
    detail: [
      "Turn loop: a WebSocket streams each reply through safety checks, the model gateway and a per-sentence guard, then stores it encrypted.",
      "Failure handling: if the model gateway fails, the user gets a scripted holding response, never an error screen.",
      "Model gateway: OpenAI as primary and Anthropic as fallback, behind one interface.",
      "API contracts: Pydantic models frozen first, so the front end could build against a real-shaped stub server.",
      "Background jobs: arq workers on Redis run memory consolidation after chats, plus nightly passes.",
      "Accounts: argon2id passwords, rate limits, and account deletion with a 24-hour restore.",
      "Email flows: 6-digit codes for signup, email change and password reset. Codes are stored as HMACs and work once, and sending runs in the background so a slow mail server never holds up a request.",
      "Privacy: DPDP-compliant erasure with per-user encryption keys, and log redaction that keeps user data out of database errors.",
    ],
    tags: ["FastAPI", "WebSockets", "Postgres", "pgvector", "Redis", "arq", "SQLAlchemy", "DPDP"],
    highlight: "First version built end to end: database to UI.",
    links: { repo: "", demo: "" },
  },
  {
    id: "proj-elo-frontend",
    cluster: "production",
    size: 4,
    name: "ELO Front End",
    period: "DXFactor · 2026",
    blurb:
      "The Next.js app people actually use: signup, onboarding, live chat, people, reads and profile.",
    detail: [
      "Product: rebuilt the app to the product design, with light and dark themes, from signup through to chat.",
      "Live chat: a WebSocket client and a reducer handle streamed replies, safety interventions and resuming a chat where it stopped.",
      "Typed contracts: TypeScript types mirror the backend's, and every server message is parsed before the UI uses it.",
      "Forms: my own DD / MM / YYYY date field and 6-digit code input, plus password rules with a strength bar and show or hide buttons.",
      "Testing: component and reducer tests with Vitest and Testing Library.",
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind", "WebSockets", "Vitest"],
    highlight: "Signup to live streamed chat, in one typed client.",
    links: { repo: "", demo: "" },
  },
  {
    id: "proj-hindsight",
    cluster: "semantic",
    size: 2,
    name: "Hindsight Memory Chatbot",
    period: "2026",
    blurb:
      "A chatbot whose memory persists across sessions and consolidates raw turns into higher-order observations.",
    detail: [
      "Chat loop: recall, assemble the prompt, stream the reply, then retain the exchange asynchronously and consolidate on a debounce.",
      "Built so far: auth, the evolving-memory chat loop, and seeding memory from uploaded chat exports, including WhatsApp.",
      "Stack: FastAPI, Postgres for app state, Redis and Celery for background jobs, Hindsight as the memory layer.",
    ],
    tags: ["Agent Memory", "FastAPI", "Celery", "Redis"],
    highlight: "Status: chat loop and memory seeding done. Memory graph and eval harness next.",
    links: { repo: "", demo: "" },
  },
  {
    id: "proj-film",
    cluster: "language",
    size: 2,
    name: "Multilingual Film Search",
    period: "2026",
    blurb:
      "Search over 9,274 Indian films for English, native-script, Hinglish and misspelt queries.",
    detail: [
      "Catalogue: assembled with Wikidata SPARQL and batched Wikipedia plot extraction, then corrected where Wikidata's language field was wrong.",
      "Test set: 300 graded queries, split into dev and test, written before any search code existed so nothing could be shaped to fit them.",
      "BM25: field weights, transliteration and phonetic keys raised dev nDCG@10 from 0.47 to 0.78.",
      "Next: dense and hybrid retrieval are being benchmarked.",
    ],
    tags: ["BM25", "Embeddings", "nDCG", "Wikidata", "Python"],
    highlight: "Dev nDCG@10: 0.47 → 0.78.",
    links: { repo: "", demo: "" },
  },
  {
    id: "proj-churn",
    cluster: "predictive",
    size: 3,
    name: "Subscription Churn in Production",
    period: "2026",
    blurb:
      "Churn prediction for 993K KKBox subscribers, carried from notebook to a monitored service.",
    detail: [
      "Model: XGBoost over 21.5M transactions and 392M listening-log rows with leak-free cut-offs. ROC-AUC 0.899, and 0.873 on a later out-of-time cohort.",
      "Incident: the ranking held on the next month but the probabilities did not. Drift monitoring caught 6.5% predicted against 9.0% actual churn.",
      "Fix: leak-free recalibration took ECE from 0.025 to 0.001, promoted through an MLflow registry.",
      "Service: batch scoring, a FastAPI API in Docker, and 70 pytest tests.",
    ],
    tags: ["XGBoost", "DuckDB", "MLflow", "FastAPI", "Docker"],
    highlight: "Calibration gap caught and fixed: ECE 0.025 → 0.001.",
    links: { repo: "https://github.com/aatmanpandya/music-subscription-churn", demo: "" },
  },
  {
    id: "proj-cricket",
    cluster: "predictive",
    size: 2,
    name: "IPL Win Probability",
    period: "2026",
    blurb:
      "Ball-by-ball win probability, trained on past seasons and scored on 2025 and 2026.",
    detail: [
      "Question: when the model says 70%, do teams win 70% of the time, and does that hold on future seasons?",
      "Result: the simple baseline won. Logistic regression scored log loss 0.541 against 0.546 for LightGBM, the pre-declared headline model.",
      "Disclosure: the test seasons were scored across three versions of the pipeline, so the repo states it isn't a perfectly clean holdout.",
      "Demo: an offline replay of 138 held-out matches with the win-probability line and turning points.",
    ],
    tags: ["LightGBM", "Calibration", "Log Loss", "Python"],
    highlight: "Logistic regression 0.541, LightGBM 0.546. The baseline won.",
    links: { repo: "https://github.com/aatmanpandya/cricket-win-probability", demo: "" },
  },
  {
    id: "proj-abtest",
    cluster: "predictive",
    size: 2,
    name: "Faster, Safer A/B Tests",
    period: "2026",
    blurb:
      "CUPED and sequential testing on a real randomised experiment of 64,000 customers, validated with 100,000-trial simulations.",
    detail: [
      "Peeking: checking a '5%' test daily for 28 days pushes false positives to 25.8%, about 1 in 4.",
      "Fix: O'Brien-Fleming boundaries, implemented from scratch, hold false positives at 4.9% and use 27% fewer users on average, for about 2 points of power at the design effect.",
      "CUPED: it reduced variance by only 0.4% here, and I explain why. Last year's spend barely predicts a two-week outcome. It pays off when the covariate is an earlier measure of the same metric.",
      "Reproducible: one script regenerates the simulations, the executed notebook and the figures in about 8 minutes.",
    ],
    tags: ["Experimentation", "CUPED", "Sequential Testing", "mSPRT", "Statistics"],
    highlight: "Daily peeking: 25.8% false positives. O'Brien-Fleming: 4.9%.",
    links: { repo: "https://github.com/aatmanpandya/ab-test-variance-reduction", demo: "" },
  },
  {
    id: "proj-notch",
    cluster: "production",
    size: 3,
    name: "NotchIsland",
    period: "2026",
    blurb:
      "A Dynamic Island for the MacBook notch: a native macOS app that turns the notch into a live panel.",
    detail: [
      "Media: now playing and controls for Apple Music, Spotify and any tab in Chrome, Arc, Edge or Brave.",
      "Everyday tools: next calendar event with a Join button, meeting reminders, a file shelf with AirDrop, timer, stopwatch and camera mirror.",
      "Audio: an opt-in live visualizer drives the bars from the actual audio with a Core Audio tap and an FFT. Nothing is recorded.",
      "Status: prototype, v0.11. Liquid Glass design on macOS 26, with a frosted fallback on macOS 14 and 15.",
    ],
    tags: ["Swift", "SwiftUI", "macOS", "Core Audio", "Liquid Glass"],
    highlight: "Native macOS app, built outside my AI work.",
    links: { repo: "https://github.com/aatmanpandya/NotchIsland", demo: "" },
  },
];

// ─── Experience ──────────────────────────────────────────────────────────────
export const experience = [
  {
    id: "exp-dxfactor",
    cluster: "semantic",
    size: 5,
    role: "AI Engineering Intern",
    org: "DXFactor",
    period: "Jul – Dec 2026 · Ahmedabad",
    detail: [
      "ELO is a conversational AI agent for relationship intelligence in health tech, live with beta users.",
      "Memory: architected and built its long-term memory from the ground up.",
      "RAG: built retrieval over clinician-approved content packs, with chunked retrieval, ranking and an ingest gate for approved versions.",
      "Safety: built a classifier that handles romanised-Hindi and code-mixed input.",
      "Product: built the first version end to end, including the web app and email flows.",
    ],
    tags: ["Agent Memory", "RAG", "Evals", "Safety", "FastAPI", "Next.js"],
  },
  {
    id: "exp-zenalyst",
    cluster: "production",
    size: 4,
    role: "AI Engineering Intern",
    org: "Zenalyst AI",
    period: "Summer 2026 · Remote",
    detail: [
      "Speech-to-speech: added OpenAI Realtime and Gemini Live calling to a LiveKit Agents platform that previously ran only an STT → LLM → TTS cascade.",
      "Email agents: built tool-calling agents that send confirmation emails after booking, reschedule and payment calls.",
      "Reliability: moved the call LLM to Groq with Anthropic fallback.",
      "Cost: added per-call token accounting and a fuzzy-match response cache.",
    ],
    tags: ["Voice AI", "LiveKit", "Tool Calling", "OpenAI Realtime", "Gemini Live", "Groq"],
  },
  {
    id: "exp-octalsoft",
    cluster: "production",
    size: 1,
    role: "Data Analytics Intern",
    org: "Octalsoft",
    period: "May – Jul 2024",
    detail: [
      "Built Python reporting pipelines over 1,000+ customer records, with data cleaning, validation and anomaly checks.",
      "Built Oracle APEX front-end modules for data entry, reporting and operational tracking.",
    ],
    tags: ["Python", "Pandas", "Oracle APEX", "Reporting"],
  },
];

// ─── Certifications ──────────────────────────────────────────────────────────
export const certifications = [
  {
    id: "cert-claude",
    cluster: "semantic",
    name: "Claude Certified Developer – Foundations",
    issuer: "Anthropic",
    period: "CCDV-F · 970/1000",
    detail: [
      "I build with Claude in production: schema-enforced memory extraction at DXFactor, and the fallback model for voice calls at Zenalyst.",
    ],
    credentialUrl: "", // link to the credential; the card shows a button once set
  },
];

// ─── Skills (each entry becomes a node near its cluster) ────────────────────
export const skills = [
  {
    id: "skill-memory",
    cluster: "semantic",
    name: "Agent Memory",
    text: "Long-term memory for AI agents: extraction, consolidation, layered recall, working memory, and running summaries.",
  },
  {
    id: "skill-evals",
    cluster: "semantic",
    name: "LLM Evals",
    text: "Eval suites that gate memory and RAG changes: test users, regression scenarios, LLM judges, and prompt-cache cost tracking.",
  },
  {
    id: "skill-rag",
    cluster: "language",
    name: "RAG & Reranking",
    text: "Retrieval-augmented generation: chunking, ranking, Voyage rerank, pgvector, and ingest gates for approved content.",
  },
  {
    id: "skill-embeddings",
    cluster: "language",
    name: "Embeddings & Hybrid Search",
    text: "Embedding generation, BM25, semantic search, cosine similarity, and nDCG evaluation of retrieval quality.",
  },
  {
    id: "skill-ensembles",
    cluster: "predictive",
    name: "Gradient Boosting",
    text: "XGBoost and LightGBM models, benchmarked against simple baselines with cross-validation and out-of-time tests.",
  },
  {
    id: "skill-monitoring",
    cluster: "predictive",
    name: "Drift & Calibration",
    text: "Drift monitoring with PSI, calibration checks, recalibration, and MLflow model registries.",
  },
  {
    id: "skill-voice",
    cluster: "production",
    name: "Voice AI",
    text: "Real-time calling with LiveKit Agents, OpenAI Realtime and Gemini Live, speech-to-speech pipelines, and tool-calling agents.",
  },
  {
    id: "skill-backend",
    cluster: "production",
    name: "Backend",
    text: "Python and FastAPI services with WebSockets, async SQLAlchemy, Postgres with pgvector, Redis, arq and Celery workers, Docker, and SQL. Built ELO's real-time turn loop and account flows, and a scoring API for churn.",
  },
  {
    id: "skill-frontend",
    cluster: "production",
    name: "Front End",
    text: "Next.js, React, TypeScript and Tailwind for product interfaces, with Vitest and Testing Library. Built ELO's web app, and this site's interactive map with SVG and Framer Motion.",
  },
];

// ─── Foundations ─────────────────────────────────────────────────────────────
export const education = [
  {
    id: "edu-bits",
    cluster: "foundations",
    name: "BITS Pilani, Hyderabad Campus",
    period: "2022 – 2027",
    detail: [
      "Dual degree: MSc (Hons) Biological Science & B.E. (Hons) Mechanical Engineering.",
      "Coursework: Probability & Statistics, Data Analytics, Optimization.",
    ],
    tags: ["Probability & Statistics", "Data Analytics", "Optimization"],
  },
];

// ─── Leadership & extracurriculars ──────────────────────────────────────────
export const leadership = [
  {
    id: "lead-traders",
    cluster: "beyond",
    name: "Design Team — Traders@BPHC",
    period: "May 2023 – Jun 2025",
    detail: [
      "Created branding, marketing creatives, and promotional material for club outreach and student engagement campaigns.",
    ],
  },
  {
    id: "lead-verba",
    cluster: "beyond",
    name: "Logistics Coordinator — Verba Maximus",
    period: "Jan 2025",
    detail: [
      "Coordinated logistics, participant management, and event execution for smooth scheduling and on-ground operations.",
    ],
  },
];
