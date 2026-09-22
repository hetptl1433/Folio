// Canonical, presentation-free portfolio content.
// The visible pages and Sushi's AI prompt both consume this file so the site
// and the assistant stay in sync as Het's experience changes.

export const profile = {
  name: "Het Patel",
  headline: "Software & AI Engineer",
  summary: [
    "I'm an M.S. in Computer Science student and software engineer building scalable AI/ML, cloud, and customer-facing systems. I work across Python, Java, C#, and TypeScript, with strong foundations in algorithms, distributed services, REST APIs, Microsoft Azure, Microsoft Power Platform, and AWS.",
    "I'm comfortable owning products from requirements and architecture through deployment, validation, and iteration — whether that means a Next.js analytics dashboard, a multi-GPU forecasting experiment, or a full-stack platform.",
  ],
  focus: [
    "AI/ML and time-series forecasting",
    "Cloud and distributed systems",
    "Full-stack product engineering",
    "Analytics and workflow automation",
  ],
  opportunities:
    "Open to conversations about software engineering, machine learning, AI, and research-oriented engineering work.",
};

export const education = [
  {
    slug: "illinois-tech",
    aliases: ["illinois tech", "iit", "master's", "masters degree"],
    school: "Illinois Institute of Technology",
    degree: "Master of Science in Computer Science",
    location: "Chicago, IL",
    date: "Expected Dec 2026",
  },
  {
    slug: "svit",
    aliases: ["sardar vallabhbhai", "bachelor's", "bachelors degree"],
    school: "Sardar Vallabhbhai Institute of Technology",
    degree: "Bachelor of Science in Computer Science",
    location: "Anand, India",
    date: "May 2024",
  },
];

export const skillCategories = [
  {
    slug: "languages",
    title: "Languages",
    items: ["Java", "Python", "C++", "C#", "TypeScript", "JavaScript", "SQL", "Go (familiar)"],
  },
  {
    slug: "cs-fundamentals",
    title: "CS Fundamentals",
    items: [
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
    slug: "cloud-backend",
    title: "Cloud & Backend",
    items: [
      "Microsoft Azure",
      "Azure App Service",
      "Azure Load Balancer",
      "Azure Blob Storage",
      "Azure Data Lake Storage",
      "AWS",
      "Amazon SageMaker",
      "Google Cloud",
      ".NET",
      "Docker",
      "Node.js",
      "Express.js",
      "MongoDB",
      "SQL & NoSQL",
      "GraphQL",
      "Socket.IO",
      "Microservices",
      "Microsoft Dynamics 365",
      "IBM AS/400",
    ],
  },
  {
    slug: "frontend",
    title: "Frontend",
    items: ["React", "Next.js", "HTML/CSS", "Tailwind CSS"],
  },
  {
    slug: "ml-genai",
    title: "ML & GenAI",
    items: [
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "pandas",
      "NumPy",
      "Hugging Face Transformers",
      "Llama 3.1",
      "Qwen2.5",
      "Kronos",
      "Time-Series Forecasting",
      "Computer Vision",
      "CNNs",
      "Distributed/Multi-GPU Training",
      "LLM Evaluation",
      "OpenAI/Claude API",
      "Prompt Engineering",
    ],
  },
  {
    slug: "tools-workflow",
    title: "Tools & Workflow",
    items: [
      "Microsoft Power BI",
      "Microsoft Power Automate",
      "Git",
      "CI/CD",
      "Linux",
      "VS Code",
      "Postman",
      "Debugging",
      "Automation",
    ],
  },
];

export const experienceItems = [
  {
    slug: "dometic",
    aliases: [
      "dometic",
      "product development internship",
      "engineering internship",
      "azure dashboard",
      "power automate",
      "warranty forecasting",
    ],
    title: "Engineering Intern (Product Development & QA)",
    company_name: "Dometic",
    date: "May 2026 - Present",
    points: [
      "Built a Next.js AI-powered analytics dashboard, cutting laboratory-data comparison, processing, and analysis time by 70%.",
      "Deployed the dashboard on Azure App Service with Azure Load Balancer; used Azure Blob Storage for storage and IBM AS/400 and Microsoft Dynamics 365 connectors to ingest data for unified comparison and analytics.",
      "Built and trained an ML forecasting model on historical data to predict future warranty costs with under 8% error, improving inventory and resource planning.",
      "Automated employee and project progress tracking with Microsoft Power Automate, streamlining status updates, task follow-ups, and project-management reporting.",
    ],
  },
  {
    slug: "iit-research",
    aliases: [
      "research assistant",
      "ml research",
      "software ml research",
      "llama 3.1",
      "qwen2.5",
      "kronos",
      "v100 cluster",
    ],
    title: "Research Assistant (Software/ML Engineering)",
    company_name: "Illinois Institute of Technology",
    date: "Jan 2026 - Present",
    points: [
      "Trained and evaluated Llama 3.1 and Qwen2.5 alongside Kronos, a financial time-series foundation model, and custom CryptexLLM on cryptocurrency data, achieving 58% test directional accuracy.",
      "Automated data preprocessing, experiment execution, validation, and result aggregation through reusable Python tooling, improving reproducibility and reducing manual effort across repeated runs.",
      "Ran concurrent large-model training on an 8-GPU NVIDIA Tesla V100 cluster, distributing and load-balancing workloads across devices to accelerate experiments and improve hardware utilization.",
    ],
  },
  {
    slug: "iit-teaching",
    aliases: ["teaching assistant", "graduate labs", "ta role"],
    title: "Teaching Assistant",
    company_name: "Illinois Institute of Technology",
    date: "Sep 2025 - Jan 2026",
    points: [
      "Supported 40+ students through labs, grading, and office hours, applying consistent evaluation criteria and clear technical feedback.",
      "Reviewed programming assignments for correctness, debugging approach, data structures, documentation quality, and problem-solving clarity.",
    ],
  },
  {
    slug: "barodaweb",
    aliases: ["barodaweb", "digital signage", "camera pipeline", "computer vision advertising", "age and gender estimation"],
    title: "Software Engineer",
    company_name: "Barodaweb",
    date: "Jun 2024 - Dec 2024",
    points: [
      "Built, deployed, and hosted full-stack web features with React, Node.js, Express, and MongoDB, translating customer requirements into solutions for data capture, configuration, and operational workflows.",
      "Developed a camera-integrated computer vision advertising screen using a CNN-based age-and-gender estimation model to analyze viewers in real time and display personalized advertisements.",
    ],
  },
  {
    slug: "vmc",
    aliases: ["vmc", "ticketing platform", "c# internship"],
    title: "Software Engineer Intern",
    company_name: "VMC",
    date: "Mar 2024 - May 2024",
    points: [
      "Modernized a legacy C#/.NET ticketing platform, redesigning customer workflows to reduce required clicks by 30% and improve the user experience.",
      "Implemented load balancing and performance optimizations, improving peak-traffic stability by 10% and strengthening service reliability.",
    ],
  },
];

export const projectItems = [
  {
    slug: "web-analytics-tool",
    aliases: ["analytics tool", "analytics dashboard", "warranty forecasting", "warranty analytics", "lab analytics"],
    name: "AI-Powered Analytics Dashboard",
    description:
      "A Next.js dashboard that unifies laboratory data from IBM AS/400 and Microsoft Dynamics 365 through Azure services. It cut comparison, processing, and analysis time by 70%, while an ML model forecasts future warranty costs with under 8% error.",
    link: null,
  },
  {
    slug: "cryptexllm",
    aliases: ["cryptex", "crypto forecasting", "market forecaster"],
    name: "CryptexLLM",
    description:
      "A scalable crypto time-series forecasting pipeline using OHLCV data, patch-based tokenization, RevIN normalization, and a frozen LLM reprogramming head. Llama 3.1, Qwen2.5, Kronos, and custom CryptexLLM experiments reached 58% test directional accuracy and were validated with walk-forward evaluation.",
    link: null,
  },
  {
    slug: "e-motel",
    aliases: ["emotel", "motel management", "motel app"],
    name: "E-Motel",
    description:
      "A full-stack motel management app running on AWS — MongoDB Atlas, Express, React, Node.js, JWT auth, and live Socket.IO updates — plus a chatbot that handles check-in and hands tasks off to staff.",
    link: "https://e-motel-front-git-main-hetptl1433s-projects.vercel.app/",
    linkLabel: "Live Project",
  },
  {
    slug: "fraud-detection",
    aliases: ["credit card fraud", "fraud transformer", "ft-transformer"],
    name: "Credit Card Fraud Detection Using Transformer",
    description:
      "A PyTorch Transformer trained on 284,807 transactions where only 0.17% are fraudulent. The first version reached 0.9643 ROC-AUC, 0.8667 recall, and 0.9929 accuracy; a Feature-Gated FT-Transformer raised ROC-AUC to 0.9827 and cut test loss from 0.3360 to 0.2758.",
    additionalMetrics: {
      recall: 0.8667,
      accuracy: 0.9929,
    },
    link: null,
  },
  {
    slug: "real-estate-management",
    aliases: ["real estate", "parcel management", "property map"],
    name: "Real-Estate Management",
    description:
      "A parcel management app built with React, Mapbox GL, and GraphQL — land records on an interactive map, with search and filtering, and a far saner data layer than the ad-hoc REST calls it replaced. Not on the resume, but it earned its spot here.",
    link: "https://real-estate-olive-six.vercel.app/",
    linkLabel: "Live Project",
  },
];

export const highlights = [
  "Won the MACIA Hackathon after designing, building, and presenting a blockchain-based payment processing prototype for secure transaction handling and transparent verification.",
  "CryptexLLM research manuscript in preparation on an LLM-powered time-series forecasting pipeline using OHLCV market data, RevIN normalization, and robustness evaluation across multiple training windows.",
  "Completed AWS Cloud Practitioner Essentials (Cloud 101), covering cloud concepts, core AWS services, security, architecture, and pricing fundamentals.",
  "Served as a Google Cloud (GCR) Student Facilitator, leading peer study sessions and supporting hands-on labs and learning paths.",
];

export const socialProfiles = [
  { name: "Contact", link: "/contact" },
  { name: "GitHub", link: "https://github.com/hetptl1433" },
  { name: "LinkedIn", link: "https://linkedin.com/in/hetptldev" },
];

export const contactDetails = {
  email: "hetptl143324@gmail.com",
  phoneDisplay: "574-336-4929",
  phoneE164: "+15743364929",
  phoneHref: "tel:+15743364929",
  contactPage: "/contact",
  visibility:
    "Het intentionally publishes these contact channels on his portfolio and authorizes Sushi to share them with visitors.",
  note: "Visitors can call Het directly or use the Contact page form to send him a message.",
};

export const resumeDetails = {
  href: "/resume/Het-Patel-Resume.pdf",
  fileName: "Het-Patel-Resume.pdf",
  format: "PDF",
  label: "Download Het's resume",
  description:
    "A concise overview of Het's software engineering, AI/ML, cloud, education, and selected project experience.",
};

const coreDestinations = [
  { id: "home", href: "/", label: "Explore the 3D island", kind: "internal" },
  { id: "about", href: "/about", label: "Open the About page", kind: "internal" },
  { id: "about.bio", href: "/about#about-overview", label: "Meet Het", kind: "internal" },
  { id: "about.education", href: "/about#education", label: "View education", kind: "internal" },
  { id: "about.experience", href: "/about#experience", label: "View experience", kind: "internal" },
  { id: "about.stack", href: "/about#selected-stack", label: "View selected stack", kind: "internal" },
  { id: "about.skills", href: "/about#skills", label: "Explore all skills", kind: "internal" },
  { id: "about.highlights", href: "/about#highlights", label: "View focus and highlights", kind: "internal" },
  { id: "projects", href: "/projects", label: "Open the Projects page", kind: "internal" },
  { id: "projects.all", href: "/projects#projects", label: "Explore all projects", kind: "internal" },
  { id: "contact", href: "/contact", label: "Open the Contact page", kind: "internal" },
  { id: "contact.options", href: "/contact#contact-options", label: "View contact options", kind: "internal" },
  { id: "contact.form", href: "/contact#contact-form", label: "Send Het a message", kind: "internal" },
  { id: "contact.phone", href: contactDetails.phoneHref, label: `Call ${contactDetails.phoneDisplay}`, kind: "external" },
  { id: "contact.email", href: `mailto:${contactDetails.email}`, label: `Email ${contactDetails.email}`, kind: "external" },
  {
    id: "resume.download",
    href: resumeDetails.href,
    label: resumeDetails.label,
    kind: "download",
    fileName: resumeDetails.fileName,
  },
];

const entityDestinations = [
  ...education.map((item) => ({
    id: `education.${item.slug}`,
    href: `/about#education-${item.slug}`,
    label: `View ${item.school}`,
    kind: "internal",
  })),
  ...experienceItems.map((item) => ({
    id: `experience.${item.slug}`,
    href: `/about#experience-${item.slug}`,
    label: `View ${item.company_name} experience`,
    kind: "internal",
  })),
  ...skillCategories.map((category) => ({
    id: `skills.${category.slug}`,
    href: `/about#skills-${category.slug}`,
    label: `View ${category.title} skills`,
    kind: "internal",
  })),
  ...projectItems.map((project) => ({
    id: `projects.${project.slug}`,
    href: `/projects#${project.slug}`,
    label: `View ${project.name}`,
    kind: "internal",
  })),
  ...projectItems
    .filter((project) => project.link)
    .map((project) => ({
      id: `projects.${project.slug}.demo`,
      href: project.link,
      label: `Open ${project.name} live demo`,
      kind: "external",
    })),
  ...socialProfiles
    .filter((item) => item.link.startsWith("http"))
    .map((item) => ({
      id: `social.${item.name.toLowerCase()}`,
      href: item.link,
      label: `Open Het's ${item.name}`,
      kind: "external",
    })),
];

export const siteDestinations = [...coreDestinations, ...entityDestinations];

export const siteGuide = {
  title: "Het Patel — Software & AI Engineer",
  description:
    "An interactive 3D portfolio featuring Het's AI/ML, cloud, and full-stack systems, experience, and Sushi, the bird AI guide.",
  routes: [
    { path: "/", purpose: "Interactive 3D home and four-stage introduction" },
    { path: "/about", purpose: "Biography, education, full skill set, and experience timeline" },
    { path: "/projects", purpose: "Project summaries and available live demos" },
    { path: "/contact", purpose: "Contact form" },
  ],
  destinations: siteDestinations,
  homeExperience: [
    "A floating 3D island with bird, plane, sky, clouds, sparkles, and optional music.",
    "A plane tows a waving, clickable LinkedIn and GitHub banner from left to right; hover or focus the banner to hold the flyby in place.",
    "Four stages cover Het's introduction, current work, project areas, and contact invitation.",
    "Visitors can navigate by dragging the island, using arrow keys, pressing arrow buttons, or selecting stage dots.",
    "Sushi flies toward the visitor, opens this chat, and can be reopened with the Ask Sushi button.",
  ],
  otherInteractions: [
    "While Sushi's chat is open on the home page, visitors can click the 3D bird or its chat avatar to trigger a playful corkscrew reaction.",
    "The Contact page has an animated fox that reacts to the form.",
    "The site includes reduced-motion support and an accessible WebGL error fallback.",
  ],
};

export const portfolioKnowledge = {
  profile,
  education,
  skillCategories,
  experience: experienceItems,
  projects: projectItems,
  highlights,
  contact: contactDetails,
  resume: resumeDetails,
  socialProfiles,
  website: siteGuide,
  unknownPersonalDetails: [
    "street address",
    "personal location outside the education and work locations listed above",
    "unlisted project repositories",
    "compensation requirements",
  ],
};

export const PORTFOLIO_CONTEXT = JSON.stringify(portfolioKnowledge, null, 2);
