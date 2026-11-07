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
    "This site is built the same way. Every node on this map was embedded with all-MiniLM-L6-v2, the model from my ATS Analyzer, and placed by semantic similarity. Ask it a question and it retrieves.",
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
export const projects = [
  {
    id: "proj-elo-memory",
    cluster: "semantic",
    name: "ELO Agent Memory",
    period: "DXFactor · 2026",
    blurb:
      "Long-term memory for a conversational AI agent, architected and built from the ground up and live with beta users.",
    detail: [
      "Extraction: a background pass pulls facts, people and open conflicts from every chat. Output is schema-enforced, with attribution and durability guards so the model can't store invented facts.",
      "Layered recall: the chat's person is frozen at chat open so the prompt cache holds. Everything else is ranked by meaning to the current message, within a token budget.",
      "Reranker: I proposed and built a Voyage reranker to replace a fixed distance cut-off. The right past chat now reaches the prompt on 92% of messages, up from 72%.",
      "Carry-over: back-reference and time cues let the agent follow a topic across turns, and a working window with a running summary holds the current chat.",
      "Sensitive facts: marked 'never raise first', so the agent only uses them after the user brings them up.",
      "Evals: every memory and RAG change runs through suites with test users of up to 240 facts and 120 chats, on the production prompt path, graded by an LLM judge.",
    ],
    tags: ["Agent Memory", "RAG", "Reranking", "pgvector", "Voyage", "Evals"],
    highlight: "Right past chat in the prompt: 72% → 92% of messages.",
    links: { repo: "", demo: "" },
  },
  {
    id: "proj-elo-product",
    cluster: "production",
    name: "ELO Web App & Email Flows",
    period: "DXFactor · 2026",
    blurb:
      "The first version of ELO, built end to end: database, API, workers and the Next.js front end.",
    detail: [
      "Backend: FastAPI, Postgres with pgvector, Redis and arq workers, with the agent turn loop running against them.",
      "Front end: Next.js, React, TypeScript and Tailwind. I rebuilt the app to the product design, with light and dark themes, from signup through to chat.",
      "Email flows: 6-digit codes for signup, email change and password reset. Codes are stored as HMACs, work once, and sending runs in the background so a slow mail server never holds up a request.",
      "Privacy: DPDP-compliant erasure with per-user encryption keys, rate limits, and log redaction that keeps user data out of database errors.",
    ],
    tags: ["FastAPI", "Next.js", "TypeScript", "Postgres", "Redis", "DPDP"],
    highlight: "First version built end to end: database to UI.",
    links: { repo: "", demo: "" },
  },
  {
    id: "proj-hindsight",
    cluster: "semantic",
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
    id: "proj-ats",
    cluster: "language",
    name: "AI Resume ATS Analyzer",
    period: "Jan – Mar 2026",
    blurb:
      "Semantic matching of resumes to job descriptions, beyond keyword overlap.",
    detail: [
      "Pipeline: PDF parsing, LLM-based extraction, embedding generation, retrieval, scoring and recommendations.",
      "Matching: Sentence Transformers (all-MiniLM-L6-v2) with cosine similarity for ranking and skill-gap detection.",
    ],
    tags: ["Sentence Transformers", "Embeddings", "Semantic Search", "NLP"],
    highlight: "The model inside this project is the one placing the nodes on this map.",
    links: { repo: "", demo: "" },
  },
  {
    id: "proj-churn",
    cluster: "predictive",
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
];

// ─── Experience ──────────────────────────────────────────────────────────────
export const experience = [
  {
    id: "exp-dxfactor",
    cluster: "semantic",
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
    name: "Claude Certified Developer",
    issuer: "Anthropic",
    period: "", // e.g. "2026"
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
    text: "Python, FastAPI, Postgres, Redis, background workers, Docker, and SQL.",
  },
  {
    id: "skill-frontend",
    cluster: "production",
    name: "Front End",
    text: "Next.js, React, TypeScript, and Tailwind for product interfaces.",
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
