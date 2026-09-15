import { download, logo, web, ILTECH } from "../assets/images";
import {
  contact,
  estate,
  express,
  git,
  github,
  javascript,
  linkedin,
  mongodb,
  nextjs,
  nodejs,
  pricewise,
  react,
  summiz,
  threads,
  typescript,
} from "../assets/icons";
import {
  education,
  experienceItems,
  projectItems,
  skillCategories,
  socialProfiles,
} from "../data/portfolio.js";

export const skills = [
  {
    imageUrl: javascript,
    name: "JavaScript",
    type: "Programming",
  },
  {
    imageUrl: typescript,
    name: "TypeScript",
    type: "Programming",
  },
  {
    imageUrl: react,
    name: "React",
    type: "Frontend",
  },
  {
    imageUrl: nextjs,
    name: "Next.js",
    type: "Full Stack",
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
];

export { education, skillCategories };

const experiencePresentation = {
  "Dometic|Engineering Intern (Product Development & QA)": {
    icon: logo,
    iconBg: "#bfe0ff",
  },
  "Illinois Institute of Technology|Research Assistant (Software/ML Engineering)": {
    icon: ILTECH,
    iconBg: "#a2d2ff",
  },
  "Illinois Institute of Technology|Teaching Assistant": {
    icon: ILTECH,
    iconBg: "#d9ed92",
  },
  "Barodaweb|Software Engineer": {
    icon: web,
    iconBg: "#0077cb",
  },
  "VMC|Software Engineer Intern": {
    icon: download,
    iconBg: "#accbe1",
  },
};

export const experiences = experienceItems.map((experience) => ({
  ...experience,
  ...experiencePresentation[`${experience.company_name}|${experience.title}`],
}));

const socialIcons = { Contact: contact, GitHub: github, LinkedIn: linkedin };

export const socialLinks = socialProfiles.map((profileLink) => ({
  ...profileLink,
  iconUrl: socialIcons[profileLink.name],
}));

const projectPresentation = {
  "AI-Powered Analytics Dashboard": { iconUrl: summiz, theme: "btn-back-blue" },
  CryptexLLM: { iconUrl: pricewise, theme: "btn-back-green" },
  "Credit Card Fraud Detection Using Transformer": {
    iconUrl: summiz,
    theme: "btn-back-yellow",
  },
  "Real-Estate Management": { iconUrl: estate, theme: "btn-back-black" },
  "E-Motel": { iconUrl: threads, theme: "btn-back-blue" },
};

export const projects = projectItems.map((project) => ({
  ...project,
  ...projectPresentation[project.name],
}));
