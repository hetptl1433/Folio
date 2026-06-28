import { contact, github, linkedin } from "../assets/icons";

export const profile = {
  name: "Het Patel",
  title: "Software Engineer · ML Engineer",
  tagline: "Research rigor, shipping discipline.",
  summary:
    "MS Computer Science student and engineer building ML and AI systems that hold up in production — repeatable experiments, honest evaluation, and full-stack delivery on AWS.",
  location: "Chicago, IL",
  graduation: "Dec 2026",
  email: "hetptl143324@gmail.com",
  phone: "574-336-4929",
  links: {
    github: "https://github.com/hetptl1433",
    linkedin: "https://linkedin.com/in/hetptldev",
    email: "mailto:hetptl143324@gmail.com",
  },
  resume: "/Het_Patel_Resume.pdf",
};

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Skills", to: "/skills" },
  { label: "Experience", to: "/experience" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

export const homeSections = [
  { id: "about", index: "01", label: "About" },
  { id: "skills", index: "02", label: "Skills" },
  { id: "experience", index: "03", label: "Experience" },
  { id: "projects", index: "04", label: "Projects" },
  { id: "signals", index: "05", label: "Signals" },
  { id: "contact", index: "06", label: "Contact" },
];

export const heroMeta = {
  pointCount: 7214,
  rendering: "rendering 7,214 embeddings from one engineer…",
};

export const homeStats = [
  { value: "5", label: "Roles", note: "research · ML · teaching · full-stack · QA" },
  { value: "4", label: "Featured builds", note: "ML pipelines and shipped products" },
  { value: "2", label: "CS degrees", note: "graduate + undergraduate" },
  { value: "0.9827", label: "Best ROC-AUC", note: "fraud detection · 284,807 txns" },
];

export const aboutIntro = [
  "I'm a software and machine learning engineer who works where model behavior, backend systems, and product clarity all have to coexist — without turning into three separate efforts.",
  "My bias is useful over flashy: repeatable experiments, honest metrics, and interfaces that make model output actually mean something to the people using it.",
];

// the two strands of the about helix
export const aboutStrands = [
  {
    key: "research",
    accent: "violet",
    title: "Research rigor",
    text:
      "PyTorch pipelines across many prototype variants, automated experiment execution, and evaluation discipline so results are reproducible and trustworthy.",
  },
  {
    key: "shipping",
    accent: "teal",
    title: "Shipping discipline",
    text:
      "Full-stack delivery with React, Node, and AWS — distributed services, REST APIs, and operational products built around real user workflows.",
  },
];

export const focusAreas = [
  {
    title: "Machine Learning Systems",
    accent: "violet",
    description:
      "Experiment automation, reproducible evaluation pipelines, and model debugging with Python and PyTorch — including transformer and LLM-based systems.",
    points: ["PyTorch", "LLM workflows", "Experiment automation"],
  },
  {
    title: "Full-Stack & Cloud",
    accent: "teal",
    description:
      "Interfaces and backend workflows with React, Node.js, Express, and MongoDB, deployed as distributed services on AWS with CI/CD.",
    points: ["React", "Node.js", "AWS"],
  },
  {
    title: "Systems & Communication",
    accent: "ember",
    description:
      "Strong CS fundamentals — data structures, algorithms, system design — paired with the teaching habit of explaining technical work clearly.",
    points: ["System design", "REST APIs", "Technical writing"],
  },
];

export const skillBands = [
  {
    title: "Machine Learning & GenAI",
    accent: "violet",
    levels: [
      { label: "PyTorch", value: 95 },
      { label: "Transformers / LLM workflows", value: 92 },
      { label: "TensorFlow", value: 84 },
      { label: "scikit-learn / pandas / NumPy", value: 90 },
    ],
  },
  {
    title: "Full-Stack & Cloud",
    accent: "teal",
    levels: [
      { label: "React / TypeScript", value: 90 },
      { label: "Node.js / Express", value: 87 },
      { label: "AWS / SageMaker", value: 80 },
      { label: "MongoDB / SQL / GraphQL", value: 83 },
    ],
  },
  {
    title: "Languages",
    accent: "ember",
    pills: ["Java", "Python", "C++", "C#", "TypeScript", "JavaScript", "SQL", "Go"],
  },
  {
    title: "CS Fundamentals",
    accent: "violet",
    pills: [
      "Data Structures",
      "Algorithms",
      "Object-Oriented Design",
      "Distributed Systems",
      "System Design",
      "REST APIs",
      "Concurrency",
    ],
  },
  {
    title: "Tooling & Workflow",
    accent: "teal",
    pills: [
      "Git / GitHub",
      "CI / CD",
      "Docker",
      "Linux",
      "Postman",
      "VS Code",
      "Code review",
      "Automation",
    ],
  },
];

export const skillCategories = [
  {
    title: "Languages",
    accent: "ember",
    items: ["Java", "Python", "C++", "C#", "TypeScript", "JavaScript", "SQL", "Go"],
  },
  {
    title: "ML & GenAI",
    accent: "violet",
    items: [
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "Hugging Face",
      "LLM evaluation",
      "Prompt engineering",
    ],
  },
  {
    title: "Cloud & Backend",
    accent: "teal",
    items: ["AWS", "SageMaker", "Google Cloud", "Docker", "Node.js", "Express", "GraphQL"],
  },
  {
    title: "Data & Frontend",
    accent: "violet",
    items: ["pandas", "NumPy", "React", "Tailwind CSS", "MongoDB", "SQL & NoSQL", "Socket.IO"],
  },
];

export const researchFocus = {
  title: "Research Focus",
  description:
    "I care about making applied AI systems more reliable through repeatable evaluation, practical experimentation, and cleaner product-facing presentation.",
  items: [
    {
      title: "Generative AI",
      text:
        "Prompt design, LLM pipelines, and forecasting-style workflows that need more structure than a one-off prototype.",
    },
    {
      title: "Evaluation & Reliability",
      text:
        "Automated checks, experiment discipline, and legible outputs so model behavior can be trusted and debugged.",
    },
  ],
};

export const education = [
  {
    school: "Illinois Institute of Technology",
    degree: "M.S. in Computer Science",
    location: "Chicago, IL",
    date: "Expected Dec 2026",
    accent: "violet",
  },
  {
    school: "Sardar Vallabhbhai Institute of Technology",
    degree: "B.S. in Computer Science",
    location: "Anand, India",
    date: "May 2024",
    accent: "teal",
  },
];

export const experiences = [
  {
    code: "SWE",
    role: "Software Engineering Intern — Product Dev & QA",
    org: "Dometic",
    location: "Remote / US",
    date: "May 2026 — Present",
    accent: "ember",
    summary:
      "Building an AI-powered analytics dashboard as a scalable service over large volumes of lab testing data.",
    points: [
      "Designed and built an AI-powered analytics dashboard as a scalable service to process large volumes of laboratory testing data and surface actionable insights for product and quality decisions.",
      "Validated AC/fan software upgrades through systematic testing — reviewing system behavior, data-collection requirements, and field-trial needs to ensure reliable releases.",
      "Designed monitoring solutions with sensors, data loggers, and DAQ; documented design trade-offs, sourced parts, and supported prototype assembly.",
    ],
    tags: ["AI Dashboards", "QA Automation", "Data Pipelines"],
  },
  {
    code: "RA",
    role: "Research Assistant — Software / ML Engineering",
    org: "Illinois Institute of Technology",
    location: "Chicago, IL",
    date: "Jan 2026 — Present",
    accent: "violet",
    summary:
      "Python/PyTorch pipelines across 5+ prototype variants, benchmarking model quality and forecasting metrics.",
    points: [
      "Designed and built Python/PyTorch pipelines across 5+ prototype variants, benchmarking model quality, runtime behavior, and forecasting metrics to drive data-backed decisions.",
      "Automated data preprocessing, experiment execution, validation, and result aggregation through reusable Python tooling, improving reproducibility across repeated runs.",
      "Debugged and resolved preprocessing and configuration issues in transformer/LLM-based systems; documented findings and presented results in technical discussions.",
    ],
    tags: ["PyTorch", "LLMs", "Experiment automation"],
  },
  {
    code: "TA",
    role: "Teaching Assistant",
    org: "Illinois Institute of Technology",
    location: "Chicago, IL",
    date: "Sep 2025 — Jan 2026",
    accent: "teal",
    summary:
      "Supported 40+ students through labs, grading, and office hours with consistent evaluation and clear feedback.",
    points: [
      "Supported 40+ students through labs, grading, and office hours, applying consistent evaluation criteria and clear technical feedback.",
      "Reviewed programming assignments for correctness, debugging approach, data structures, documentation quality, and problem-solving clarity.",
    ],
    tags: ["Teaching", "Mentoring", "Code review"],
  },
  {
    code: "SWE",
    role: "Software Engineer",
    org: "Barodaweb",
    location: "India",
    date: "Jun 2024 — Dec 2024",
    accent: "violet",
    summary:
      "Owned end-to-end features for a camera-integrated digital signage platform using computer vision.",
    points: [
      "Owned end-to-end development of features for a camera-integrated digital signage platform, applying computer vision and image-processing logic to estimate viewer attributes in near real time.",
      "Designed and built full-stack, distributed web components with React, Node.js, Express, and MongoDB for data capture, configuration workflows, and operational dashboards.",
      "Improved reliability through iterative testing and tuning, shipping 10+ reliability improvements and reducing production issues.",
    ],
    tags: ["React", "Node.js", "Computer Vision"],
  },
  {
    code: "INT",
    role: "Software Engineer Intern",
    org: "VMC",
    location: "India",
    date: "Mar 2024 — May 2024",
    accent: "teal",
    summary:
      "Debugged and validated fixes for a live C#/.NET online ticketing platform.",
    points: [
      "Used C# and .NET to debug workflow defects, validate fixes, and document rollout steps for an online ticketing platform serving live users.",
      "Reproduced production issues, performed root-cause analysis, and communicated findings clearly to drive implementation and QA follow-up.",
    ],
    tags: ["C#", ".NET", "Debugging"],
  },
];

export const projects = [
  {
    id: "cryptexllm",
    accent: "violet",
    name: "CryptexLLM",
    category: "LLM Forecasting",
    stack: "Python · PyTorch · Transformers",
    description:
      "A scalable time-series forecasting pipeline using OHLCV market data, patch-based tokenization, RevIN normalization, and a frozen LLM reprogramming head.",
    outcome:
      "Validated with walk-forward evaluation tracking MAE, RMSE, directional accuracy, and risk-adjusted returns under realistic assumptions.",
    metrics: [
      { label: "Eval", value: "walk-forward" },
      { label: "Signals", value: "MAE · RMSE · DA" },
    ],
    tags: ["PyTorch", "LLM reprogramming", "Time-series"],
    badge: "Publication in prep",
  },
  {
    id: "fraud",
    accent: "ember",
    name: "Credit-Card Fraud Detection",
    category: "FT-Transformer",
    stack: "Python · PyTorch · scikit-learn",
    description:
      "A Transformer-based detection model on 284,807 transactions (0.17% fraud), then a Feature-Gated FT-Transformer using Conv1D and sigmoid token gating.",
    outcome:
      "Feature gating boosted ROC-AUC from 0.9643 to 0.9827 and cut test loss from 0.3360 to 0.2758 on highly imbalanced data.",
    metrics: [
      { label: "ROC-AUC", value: "0.9827" },
      { label: "Recall", value: "0.8667" },
      { label: "Accuracy", value: "0.9929" },
    ],
    tags: ["FT-Transformer", "Imbalanced data", "PyTorch"],
  },
  {
    id: "emotel",
    accent: "teal",
    name: "E-Motel",
    category: "Operations Platform",
    stack: "MERN · Socket.IO · AWS · Vercel",
    description:
      "A full-stack management platform on AWS with MongoDB Atlas, Express, React, Node, JWT auth, and real-time Socket.IO updates for booking and staff workflows.",
    outcome:
      "Integrated an AI-assisted chatbot to automate check-in and streamline operations with automatic task assignment.",
    metrics: [
      { label: "Realtime", value: "Socket.IO" },
      { label: "Auth", value: "JWT" },
    ],
    tags: ["MERN", "Socket.IO", "AWS"],
    link: "https://e-motel-front-git-main-hetptl1433s-projects.vercel.app/",
    linkLabel: "Live project",
  },
  {
    id: "realestate",
    accent: "teal",
    name: "Real-Estate Management",
    category: "Geospatial Product",
    stack: "React · Mapbox GL · GraphQL",
    description:
      "A parcel management app with React, Mapbox GL, and GraphQL to visualize land records and support search and filter workflows.",
    outcome:
      "Improved maintainability and spatial decision-making compared with ad-hoc REST-based implementations.",
    metrics: [
      { label: "Map", value: "Mapbox GL" },
      { label: "API", value: "GraphQL" },
    ],
    tags: ["React", "Mapbox GL", "GraphQL"],
    link: "https://real-estate-olive-six.vercel.app/",
    linkLabel: "Live project",
  },
];

// query bar tokens — drive the latent-space highlight + caption
export const queryTokens = [
  {
    token: "ml",
    cluster: "violet",
    caption: "cluster: machine-learning · PyTorch · LLM pipelines · evaluation",
  },
  {
    token: "fraud",
    cluster: "ember",
    caption: "cluster: fraud-detection · FT-Transformer · ROC-AUC 0.9827",
  },
  {
    token: "llm",
    cluster: "violet",
    caption: "cluster: CryptexLLM · OHLCV · RevIN · reprogramming head",
  },
  {
    token: "react",
    cluster: "teal",
    caption: "cluster: full-stack · React · Node.js · MERN · realtime",
  },
  {
    token: "aws",
    cluster: "teal",
    caption: "cluster: cloud · AWS · SageMaker · CI/CD · distributed services",
  },
  {
    token: "ship",
    cluster: "ember",
    caption: "cluster: shipping discipline · 10+ reliability fixes · live products",
  },
];

export const certifications = [
  {
    title: "AWS Cloud Practitioner Essentials",
    org: "Cloud 101",
    accent: "ember",
    text: "Cloud concepts, core AWS services, security, architecture, and pricing fundamentals.",
  },
  {
    title: "Google Cloud Student Facilitator",
    org: "GCR",
    accent: "teal",
    text: "Led peer study sessions and supported students through Google Cloud hands-on labs and learning paths.",
  },
];

export const awards = [
  {
    title: "MACIA Hackathon — Winner",
    accent: "ember",
    category: "Blockchain · Payment Processing",
    text:
      "Designed, built, and presented a blockchain-based payment processing prototype for secure transaction handling and transparent verification — winning the hackathon.",
  },
];

export const publication = {
  authors: "Het Patel, et al.",
  title: "CryptexLLM",
  status: "Manuscript in preparation",
  accent: "violet",
  text:
    "An LLM-powered time-series forecasting pipeline using OHLCV market data, RevIN normalization, and robustness evaluation across multiple training windows.",
};

export const achievements = [
  {
    title: "MACIA Hackathon — Winner",
    accent: "ember",
    text:
      "Built and presented a blockchain-based payment processing prototype for secure, transparent transactions — winning the hackathon.",
  },
  {
    title: "CryptexLLM — Publication in prep",
    accent: "violet",
    text:
      "Lead author on a manuscript covering an LLM-powered forecasting pipeline with RevIN normalization and multi-window robustness evaluation.",
  },
];

export const contactMethods = [
  { label: "Email", value: profile.email, href: profile.links.email },
  { label: "GitHub", value: "github.com/hetptl1433", href: profile.links.github },
  { label: "LinkedIn", value: "linkedin.com/in/hetptldev", href: profile.links.linkedin },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/-/g, "")}` },
  { label: "Base", value: profile.location },
];

export const contactHighlights = [
  {
    title: "Open To",
    text: "Software engineering, ML engineering, and research-oriented roles.",
  },
  {
    title: "Best Fit",
    text: "Teams that value experimentation, product ownership, and crisp technical communication.",
  },
  {
    title: "Strengths",
    text: "Applied ML, full-stack delivery, debugging, and structured iteration.",
  },
];

export const socialLinks = [
  { name: "Email", iconUrl: contact, link: profile.links.email },
  { name: "GitHub", iconUrl: github, link: profile.links.github },
  { name: "LinkedIn", iconUrl: linkedin, link: profile.links.linkedin },
];
