// Canonical, presentation-free portfolio content.
// The visible pages and Sushi's AI prompt both consume this file so the site
// and the assistant stay in sync as Het's experience changes.

export const profile = {
  name: "Het Patel",
  headline: "Software & AI Engineer",
  summary: [
    "I'm a software engineer who ended up deep in machine learning — and lately, in hardware too. I've done research, taught graduate labs, and built full-stack products, sometimes all in the same semester.",
    "Right now that means Python and PyTorch experiments, a web-based ML analytics tool fed by lab testing data, and camera-and-sensor pipelines that talk to the cloud — plus web apps built with React, Node.js, and MongoDB that real people use.",
  ],
  focus: [
    "Machine learning and AI systems",
    "Embedded/IoT and sensor-to-cloud systems",
    "Full-stack product engineering",
    "Applied research and reproducible experimentation",
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
    slug: "embedded-iot",
    title: "Embedded & IoT",
    items: [
      "C++",
      "Sensors/DAQ",
      "Camera Integration",
      "Device-to-Cloud Telemetry",
      "TCP/IP",
      "Serial Communication",
      "Hardware/Software Debugging",
    ],
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
      "LLM Evaluation",
      "Prompt Engineering",
    ],
  },
  {
    slug: "cloud-backend",
    title: "Cloud & Backend",
    items: [
      "AWS",
      "Google Cloud",
      "Docker",
      "Node.js",
      "Express.js",
      "MongoDB",
      "SQL & NoSQL",
      "Socket.IO",
    ],
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
    slug: "frontend",
    title: "Frontend",
    items: ["React", "HTML/CSS", "Tailwind CSS"],
  },
  {
    slug: "tools-workflow",
    title: "Tools & Workflow",
    items: ["Power BI", "Git", "CI/CD", "Linux", "VS Code", "Postman", "Testing", "Technical Documentation", "Debugging", "Automation"],
  },
];

export const experienceItems = [
  {
    slug: "dometic",
    aliases: ["dometic", "product development internship", "engineering internship"],
    title: "Engineering Intern (Product Development & QA)",
    company_name: "Dometic",
    date: "May 2026 - Present",
    points: [
      "Built a web-based analytics tool with machine learning that chews through large volumes of lab testing data and backs real product and quality decisions.",
      "Cut product-improvement and comparison time by 40%, taking real workload off the lab technicians and the product development team.",
      "Validated AC/fan software upgrades through systematic testing, reviewing system behavior, data-collection requirements, and field-trial needs to ensure reliable releases.",
      "Designed monitoring solutions using sensors, data loggers, and DAQ; documented design choices and trade-offs, sourced parts, and supported prototype assembly.",
    ],
  },
  {
    slug: "iit-research",
    aliases: ["research assistant", "ml research", "software ml research"],
    title: "Research Assistant (Software/ML Engineering)",
    company_name: "Illinois Institute of Technology",
    date: "Jan 2026 - Present",
    points: [
      "Built Python/PyTorch pipelines across 5+ prototype variants, benchmarking model quality, runtime behavior, and forecasting metrics to figure out which approaches were worth keeping.",
      "Automated preprocessing, experiment runs, validation, and result aggregation with reusable Python tooling, so experiments are reproducible instead of hand-run.",
      "Tracked down and fixed preprocessing and configuration issues in transformer/LLM-based systems, then wrote up the findings and presented them to the team.",
    ],
  },
  {
    slug: "iit-teaching",
    aliases: ["teaching assistant", "graduate labs", "ta role"],
    title: "Teaching Assistant",
    company_name: "Illinois Institute of Technology",
    date: "Sep 2025 - Jan 2026",
    points: [
      "Helped 40+ students through labs, grading, and office hours, keeping the feedback clear and the grading fair.",
      "Reviewed programming assignments for correctness, debugging approach, data structures, documentation, and how clearly students reasoned through problems.",
    ],
  },
  {
    slug: "barodaweb",
    aliases: ["barodaweb", "digital signage", "camera pipeline"],
    title: "Software Engineer",
    company_name: "Barodaweb",
    date: "Jun 2024 - Dec 2024",
    points: [
      "Built the camera-facing software pipeline for a digital signage platform — image acquisition, image processing, and computer vision working together to estimate viewer attributes in near real time.",
      "Implemented device-to-backend data capture and configuration flows with React, Node.js, Express, and MongoDB, debugging integration all the way from camera to backend.",
      "Shipped 10+ reliability fixes through repeated testing and tuning, cutting down production issues across the workflow.",
    ],
  },
  {
    slug: "vmc",
    aliases: ["vmc", "ticketing platform", "c# internship"],
    title: "Software Engineer Intern",
    company_name: "VMC",
    date: "Mar 2024 - May 2024",
    points: [
      "Debugged workflow defects in C# and .NET, validated the fixes, and documented rollout steps for an online ticketing platform with live users.",
      "Reproduced production issues, dug down to root causes, and wrote up findings so implementation and QA follow-up moved quickly.",
    ],
  },
];

export const projectItems = [
  {
    slug: "web-analytics-tool",
    aliases: ["analytics tool", "sales forecasting", "warranty analytics"],
    name: "Web-Based Analytics Tool",
    description:
      "A web app that uses machine learning to predict sales, warranty claims, and rework cost — and stores test data so trends can be tracked and compared over time instead of decisions running on gut feel.",
    link: null,
  },
  {
    slug: "cryptexllm",
    aliases: ["cryptex", "crypto forecasting", "market forecaster"],
    name: "CryptexLLM",
    description:
      "A forecasting pipeline that teaches a frozen LLM to read crypto markets. OHLCV data goes in through patch tokenization and RevIN normalization, a reprogramming head does the translating, and walk-forward evaluation keeps score on MAE, RMSE, directional accuracy, and risk-adjusted returns.",
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
      "A PyTorch Transformer trained to spot fraud in 284,807 transactions where only 0.17% are fraudulent. The first version reached 0.9643 ROC-AUC; a Feature-Gated FT-Transformer with Conv1D and sigmoid token gating pushed that to 0.9827 and cut test loss from 0.3360 to 0.2758.",
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
  "Won the MACIA Hackathon with a blockchain payment-processing prototype.",
  "Built an IoT smart-parking prototype at the HackSVIT hackathon.",
  "CryptexLLM research manuscript in preparation (LLM-based OHLCV forecasting with RevIN normalization and robustness evaluation).",
  "Completed AWS Cloud Practitioner Essentials (Cloud 101) and AWS Machine Learning training.",
  "Served as a Google Cloud Student Facilitator.",
];

export const socialProfiles = [
  { name: "Contact", link: "/contact" },
  { name: "GitHub", link: "https://github.com/hetptl1433" },
  { name: "LinkedIn", link: "https://linkedin.com/in/hetptldev" },
];

export const contactDetails = {
  email: "hetptl143324@gmail.com",
  phoneDisplay: "(574) 336-4929",
  phoneE164: "+15743364929",
  phoneHref: "tel:+15743364929",
  contactPage: "/contact",
  visibility:
    "Het intentionally publishes these contact channels on his portfolio and authorizes Sushi to share them with visitors.",
  note: "Visitors can call Het directly or use the Contact page form to send him a message.",
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
    "An interactive 3D portfolio featuring Het's machine-learning systems, full-stack products, experience, and Sushi, the bird AI guide.",
  routes: [
    { path: "/", purpose: "Interactive 3D home and four-stage introduction" },
    { path: "/about", purpose: "Biography, education, full skill set, and experience timeline" },
    { path: "/projects", purpose: "Project summaries and available live demos" },
    { path: "/contact", purpose: "Contact form" },
  ],
  destinations: siteDestinations,
  homeExperience: [
    "A floating 3D island with bird, plane, sky, clouds, sparkles, and optional music.",
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
