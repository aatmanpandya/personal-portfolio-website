// ═══════════════════════════════════════════════════════════════════════════
//  EDIT EVERYTHING HERE. This is the only file you need to touch for content.
//  After editing, re-run `npm run build:map` so the embedding map picks up
//  your changes (node positions and similarity vectors are computed from
//  this text at build time).
// ═══════════════════════════════════════════════════════════════════════════

export const profile = {
  name: "Aatman Pandya",
  title: "AI/ML Engineer & Data Scientist",
  // One sharp line. Shows on the Input node and in search placeholders.
  tagline:
    "I turn messy, unstructured data — resumes, financial news, operational records — into systems that understand it.",
  location: "Hyderabad, India",
  bio: [
    "I build ML and NLP systems end to end: semantic search over resumes, transformer-based sentiment signals from financial news, and supervised pipelines that predict real-world outcomes.",
    "The instinct is always the same — take something unstructured and extract signal from it. This site runs on that instinct: every node on this map was embedded with all-MiniLM-L6-v2, the same model behind my ATS Analyzer, and placed by semantic similarity.",
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
    label: "Semantic Systems",
    blurb: "Embeddings, retrieval, and search that understands meaning.",
  },
  {
    id: "language",
    label: "Language & Signal",
    blurb: "Transformers that turn raw text into decision signals.",
  },
  {
    id: "predictive",
    label: "Predictive Modeling",
    blurb: "Supervised pipelines, benchmarked and cross-validated.",
  },
  {
    id: "production",
    label: "Data in Production",
    blurb: "Analytics and reporting shipped for real operations.",
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
    id: "proj-ats",
    cluster: "semantic",
    name: "AI Resume ATS Analyzer",
    period: "Jan – Mar 2026",
    blurb:
      "An AI-powered ATS that semantically matches resumes to job descriptions — beyond keyword overlap.",
    detail: [
      "Modular pipeline covering document ingestion, PDF parsing, resume extraction, embedding generation, semantic retrieval, scoring, and recommendation workflows.",
      "Sentence Transformers (all-MiniLM-L6-v2) with cosine similarity scoring power semantic resume–job matching, contextual retrieval, and candidate ranking beyond keyword overlap.",
      "LLM-based information extraction, named entity recognition, fuzzy matching, and structured parsing convert unstructured resumes into comparable candidate profiles.",
      "Retrieval workflows and recommendation logic use semantic search signals to surface skill gaps and generate targeted optimization suggestions.",
    ],
    tags: ["Python", "Sentence Transformers", "Embeddings", "Semantic Search", "NLP"],
    highlight: "The model inside this project is the one placing the nodes on this map.",
    links: { repo: "https://github.com/aatmanpandya", demo: "" },
  },
  {
    id: "proj-finbert",
    cluster: "language",
    name: "Market Sentiment Analysis with FinBERT",
    period: "Aug – Oct 2025",
    blurb:
      "A FinBERT pipeline that turns 1,400+ financial news articles into tradable sentiment signals.",
    detail: [
      "Financial sentiment analysis pipeline using FinBERT over 1,000+ financial news articles, quantifying market sentiment across multiple publicly traded companies.",
      "Collected and processed ~1,400 articles over a 30-day window, generating sentiment signals for five major technology stocks.",
      "Correlation analysis between sentiment scores and subsequent stock-price movements surfaced predictive relationships with coefficients as high as 0.63.",
      "Visualization dashboards and statistical reporting turn unstructured financial news into decision-support insights.",
    ],
    tags: ["Python", "FinBERT", "NLP", "Sentiment Analysis", "Statistics"],
    highlight: "Sentiment ↔ price-movement correlation up to r = 0.63.",
    links: { repo: "https://github.com/aatmanpandya", demo: "" },
  },
  {
    id: "proj-smartwatch",
    cluster: "predictive",
    name: "Smartwatch Price Prediction System",
    period: "Oct – Dec 2025",
    blurb:
      "An end-to-end supervised ML pipeline predicting smartwatch prices from a 201-feature dataset.",
    detail: [
      "End-to-end supervised pipeline over 450 smartwatch records: feature engineering, preprocessing, model training, benchmarking, and evaluation.",
      "Missing-value imputation, IQR-based outlier removal, one-hot encoding, and Min-Max scaling transform raw attributes into a 201-feature training dataset.",
      "Benchmarked Decision Tree, Random Forest, and XGBoost regressors across multiple evaluation metrics to identify robust pricing models.",
      "GridSearchCV and K-Fold cross-validation tuning, with R², feature-importance analysis, and interpretability checks for generalization.",
    ],
    tags: ["Python", "Scikit-Learn", "XGBoost", "Random Forest", "GridSearchCV"],
    highlight: "450 records → 201 engineered features → 3 benchmarked model families.",
    links: { repo: "https://github.com/aatmanpandya", demo: "" },
  },
];

// ─── Experience ──────────────────────────────────────────────────────────────
export const experience = [
  {
    id: "exp-octalsoft",
    cluster: "production",
    role: "Data Analytics Intern",
    org: "Octalsoft",
    period: "May – Jul 2024",
    detail: [
      "Developed Python analytics workflows with Pandas and NumPy to process 1,000+ customer records, account balances, and operational performance indicators.",
      "Built automated reporting pipelines — data cleaning, validation, exploratory analysis — supporting business monitoring and anomaly detection.",
      "Generated dashboard-ready insights tracking completion trends, balance irregularities, and key operational metrics.",
      "Developed Oracle APEX front-end modules for enterprise data-entry, reporting, and operational tracking.",
    ],
    tags: ["Python", "Pandas", "NumPy", "Oracle APEX", "Reporting"],
  },
];

// ─── Skills (each entry becomes a node near its cluster) ────────────────────
export const skills = [
  {
    id: "skill-embeddings",
    cluster: "semantic",
    name: "Embeddings & Semantic Search",
    text: "Embedding generation, semantic search, cosine similarity, contextual retrieval, and vector-based ranking with Sentence Transformers.",
  },
  {
    id: "skill-ner",
    cluster: "semantic",
    name: "NER & Information Extraction",
    text: "Named entity recognition, LLM-based information extraction, fuzzy matching, and structured parsing of unstructured documents.",
  },
  {
    id: "skill-nlp-pipelines",
    cluster: "language",
    name: "NLP Pipelines",
    text: "End-to-end NLP pipelines: text ingestion, preprocessing, transformer inference, sentiment analysis, and signal generation from raw language.",
  },
  {
    id: "skill-ensembles",
    cluster: "predictive",
    name: "Ensemble Methods",
    text: "Random Forest and XGBoost regressors and classifiers, benchmarked across evaluation metrics.",
  },
  {
    id: "skill-feature-eng",
    cluster: "predictive",
    name: "Feature Engineering",
    text: "Imputation, outlier removal, encoding, scaling — turning raw attributes into model-ready features.",
  },
  {
    id: "skill-model-eval",
    cluster: "predictive",
    name: "Tuning & Evaluation",
    text: "Hyperparameter tuning with GridSearchCV, K-Fold cross-validation, R² evaluation, feature importance, and interpretability checks.",
  },
  {
    id: "skill-python-stack",
    cluster: "production",
    name: "Python Data Stack",
    text: "Python with NumPy, Pandas, Scikit-Learn, and Matplotlib for analysis, modeling, and visualization at working scale.",
  },
  {
    id: "skill-sql",
    cluster: "production",
    name: "SQL & Java",
    text: "SQL for querying and reshaping operational data; Java for object-oriented application development.",
  },
  {
    id: "skill-tools",
    cluster: "production",
    name: "Git & Oracle APEX",
    text: "Version control with Git and GitHub; enterprise reporting modules with Oracle APEX.",
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
