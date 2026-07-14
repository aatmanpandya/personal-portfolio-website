// ═══════════════════════════════════════════════════════════════════════════
//  EDIT EVERYTHING HERE.  This is the only file you need to touch for content.
//  Replace the placeholder values below with your real details.
//  Anything marked  // TODO  is a placeholder waiting for you.
// ═══════════════════════════════════════════════════════════════════════════

export const profile = {
  name: "Aatman Pandya",
  title: "AI/ML Enthusiast & Data Analyst",
  // One sharp line. Shows in the hero as the "input signal".
  tagline:
    "I turn messy, unstructured data — resumes, clinical trials, customer behavior — into models that make sense of it.",
  location: "Hyderabad, India",
  // A couple of sentences for the About / "output" section.
  bio: [
    "I'm pursuing a dual degree at BITS Pilani, Hyderabad — an MSc (Hons) in Biological Science and a B.E. (Hons) in Mechanical Engineering — while building AI/ML projects on the side, from semantic search to supervised and unsupervised learning pipelines.",
    "My internship at Octalsoft had me shipping Python analytics pipelines over clinical-trial data; since then I've been chasing the same instinct — take a messy dataset or an unstructured document and build something that extracts signal from it.",
  ],
  resumeUrl: "/Aatman_Resume.pdf",
  photoUrl: "", // optional — e.g. "/me.jpg" in /public. Leave "" to show a monogram.
};

export const links = {
  email: "aatmanpandya595@gmail.com",
  github: "", // TODO — not found in resume, add your GitHub URL
  linkedin: "", // TODO — resume links to LinkedIn via icon only; paste your profile URL
  twitter: "", // optional
  blog: "", // optional
};

// Short, scannable. These "fire" as neurons in the hidden layers.
export const skills = [
  { group: "Languages", items: ["Python", "SQL", "TypeScript", "Java"] },
  { group: "Libraries", items: ["NumPy", "Pandas", "Scikit-Learn", "Matplotlib"] },
  {
    group: "Machine Learning",
    items: [
      "Regression",
      "Classification",
      "Clustering",
      "Feature Engineering",
      "Hyperparameter Tuning",
      "Cross Validation",
    ],
  },
  {
    group: "AI / NLP",
    items: [
      "Embeddings",
      "Semantic Search",
      "Sentence Transformers",
      "Cosine Similarity",
      "Named Entity Recognition",
      "LLM Applications",
    ],
  },
];

// Your best project first. Each becomes an activating cluster in the network.
export const projects = [
  {
    name: "AI Resume ATS Analyzer",
    blurb:
      "An AI-powered ATS that semantically matches resumes to job descriptions — beyond keyword overlap.",
    detail:
      "Built a modular pipeline covering document ingestion, PDF parsing, and resume extraction, then used Sentence Transformers (all-MiniLM-L6-v2) with cosine similarity for semantic resume–job matching. LLM-based extraction, named entity recognition, and fuzzy matching convert unstructured resumes into comparable candidate profiles, feeding scoring and recommendation logic that surfaces skill gaps and targeted improvements.",
    tags: ["Python", "Sentence Transformers", "LLM", "NLP", "Embeddings"],
    metric: "Jan–Mar 2026",
    links: {
      repo: "", // TODO — add your GitHub repo link
      demo: "",
      paper: "",
    },
  },
  {
    name: "Smartwatch Price Prediction System",
    blurb: "An end-to-end supervised ML pipeline predicting smartwatch prices from spec data.",
    detail:
      "Engineered features with missing-value imputation, IQR-based outlier removal, one-hot encoding, and Min-Max scaling, then benchmarked Decision Tree, Random Forest, and XGBoost regressors. Tuned with GridSearchCV and K-Fold cross-validation, evaluating generalization with R².",
    tags: ["Python", "Scikit-Learn", "XGBoost", "GridSearchCV"],
    metric: "Oct–Dec 2025",
    links: { repo: "", demo: "", paper: "" },
  },
  {
    name: "Customer Segmentation using K-Means Clustering",
    blurb:
      "An unsupervised segmentation framework grouping customers into interpretable behavioral personas.",
    detail:
      "Used EDA, WCSS computation, and the Elbow Method with K-Means++ initialization to select cluster structure, then translated cluster patterns into customer personas and business recommendations for targeted marketing and prioritization.",
    tags: ["Python", "Pandas", "Scikit-Learn", "K-Means"],
    metric: "Aug–Sep 2025",
    links: { repo: "", demo: "", paper: "" },
  },
];

// The "journey" — reads as the forward pass through hidden layers on scroll.
// Keep 2–5 milestones. Newest or most relevant first is fine.
export const journey = [
  {
    when: "2026",
    what: "Building AI-powered systems",
    note: "Shipped an AI Resume ATS Analyzer using semantic search and LLM-based extraction.",
  },
  {
    when: "2025",
    what: "End-to-end ML pipelines",
    note: "Built supervised (price prediction) and unsupervised (customer segmentation) systems from scratch.",
  },
  {
    when: "2024",
    what: "Data Analytics Intern @ Octalsoft",
    note: "Built Python analytics pipelines over clinical-trial data and shipped Oracle APEX reporting modules.",
  },
  {
    when: "2022 – 2027",
    what: "BITS Pilani, Hyderabad Campus",
    note: "Dual degree: MSc (Hons) Biological Science & B.E. (Hons) Mechanical Engineering.",
  },
];
