import { download, web, ILTECH } from "../assets/images";
import {
  contact,
  css,
  estate,
  express,
  git,
  github,
  html,
  javascript,
  linkedin,
  mongodb,
  nodejs,
  pricewise,
  react,
  summiz,
  threads,
} from "../assets/icons";

export const skills = [
  {
    imageUrl: javascript,
    name: "JavaScript",
    type: "Programming",
  },
  {
    imageUrl: react,
    name: "React",
    type: "Frontend",
  },
  {
    imageUrl: nodejs,
    name: "Node.js",
    type: "Backend",
  },
  {
    imageUrl: express,
    name: "Express.js",
    type: "Backend",
  },
  {
    imageUrl: mongodb,
    name: "MongoDB",
    type: "Database",
  },
  {
    imageUrl: git,
    name: "Git",
    type: "Version Control",
  },
  {
    imageUrl: html,
    name: "HTML",
    type: "Frontend",
  },
  {
    imageUrl: css,
    name: "CSS",
    type: "Frontend",
  },
];

export const skillCategories = [
  {
    title: "Programming",
    items: ["Python", "SQL", "Java", "JavaScript", "C", "C++"],
  },
  {
    title: "Machine Learning",
    items: [
      "PyTorch",
      "TensorFlow",
      "Keras",
      "scikit-learn",
      "Predictive Modeling",
      "Model Evaluation",
    ],
  },
  {
    title: "Data Science",
    items: [
      "pandas",
      "NumPy",
      "Data Cleaning",
      "Feature Engineering",
      "Time-Series Analysis",
      "Anomaly Detection",
      "Trend Analysis",
    ],
  },
  {
    title: "Software Development",
    items: ["REST APIs", "MongoDB", "React", "Node.js", "Express.js", "AWS", "Git"],
  },
];

export const education = [
  {
    school: "Illinois Institute of Technology",
    degree: "Master of Science in Computer Science",
    location: "Chicago, IL",
    date: "Dec 2025",
  },
  {
    school: "Sardar Vallabhbhai Institute of Technology",
    degree: "Bachelor of Science in Computer Science",
    location: "Anand, India",
    date: "May 2024",
  },
];

export const experiences = [
  {
    title: "Research Assistant",
    company_name: "Illinois Institute of Technology",
    icon: ILTECH,
    iconBg: "#a2d2ff",
    date: "Jan 2026 - Present",
    points: [
      "Built and evaluated Python and PyTorch machine learning pipelines across multiple experiments, comparing metrics, runtime behavior, and output quality to support model selection.",
      "Automated data preparation, experiment execution, and result aggregation with Python scripts, improving reproducibility and reducing manual validation across runs.",
      "Investigated preprocessing, configuration, and model-pipeline issues while documenting repeatable execution steps for follow-up experimentation and debugging.",
    ],
  },
  {
    title: "Teaching Assistant",
    company_name: "Illinois Institute of Technology",
    icon: ILTECH,
    iconBg: "#d9ed92",
    date: "Sep 2025 - Dec 2025",
    points: [
      "Managed labs, grading, and office hours for graduate Cryptography and Security courses while helping students solve analytical and debugging problems.",
      "Supported structured evaluation across assignments and communicated technical feedback clearly, strengthening classroom operations and student outcomes.",
    ],
  },
  {
    title: "Software Engineer / ML Engineer",
    company_name: "Barodaweb",
    icon: web,
    iconBg: "#0077cb",
    date: "Jun 2024 - Dec 2024",
    points: [
      "Worked on a camera-enabled advertising platform using Python and data-driven validation workflows to analyze operational logs, identify performance trends, and support troubleshooting.",
      "Built internal scripts and reporting workflows to summarize recurring issues, improve testing efficiency, and provide actionable insights to engineering and business teams.",
    ],
  },
  {
    title: "Software Engineer Intern",
    company_name: "VMC",
    icon: download,
    iconBg: "#accbe1",
    date: "Mar 2024 - May 2024",
    points: [
      "Worked with C# and .NET to improve an online ticketing platform by analyzing workflow issues, increasing application reliability, and reducing recurring client support requests by 20%.",
      "Supported rollout and troubleshooting, documented validation steps and issue patterns, and helped reduce repeat issue occurrences by 15%.",
    ],
  },
];

export const socialLinks = [
  {
    name: "Contact",
    iconUrl: contact,
    link: "/contact",
  },
  {
    name: "GitHub",
    iconUrl: github,
    link: "https://github.com/hetptl1433",
  },
  {
    name: "LinkedIn",
    iconUrl: linkedin,
    link: "https://linkedin.com/in/hetptldev",
  },
];

export const projects = [
  {
    iconUrl: pricewise,
    theme: "btn-back-green",
    name: "CryptexLLM",
    description:
      "Built an LLM-powered BTC forecasting pipeline using OHLCV market data, patch-based tokenization, RevIN normalization, and direction-aware losses, then validated it with walk-forward testing under trading fees.",
  },
  {
    iconUrl: summiz,
    theme: "btn-back-yellow",
    name: "Credit Card Fraud Detection Using Transformer",
    description:
      "Built FT-Transformer fraud detection models in PyTorch on 284,807 transactions and improved results with feature-gated token weighting, boosting ROC-AUC while reducing test loss.",
  },
  {
    iconUrl: estate,
    theme: "btn-back-black",
    name: "Real-Estate Management",
    description:
      "Built a parcel management app with React, Mapbox GL, and GraphQL to visualize land records, support search and filter workflows, and improve maintainability over ad-hoc REST calls.",
    link: "https://real-estate-olive-six.vercel.app/",
    linkLabel: "Live Project",
  },
  {
    iconUrl: threads,
    theme: "btn-back-blue",
    name: "E-Motel",
    description:
      "Built a MERN motel management platform with Tailwind CSS, Socket.IO, Vercel, and AWS to manage rooms, bookings, customer records, and staff operations in real time.",
    link: "https://e-motel-front-git-main-hetptl1433s-projects.vercel.app/",
    linkLabel: "Live Project",
  },
];
