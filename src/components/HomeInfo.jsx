import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";

const InfoBox = ({ text, link, btnText }) => {
  return (
    <div className="info-box animate-pop">
      <p className="info-box-text text-center font-medium">{text}</p>
      <Link to={link} className="neo-brutalism-white neo-btn magnetic shine group" data-burst>
        {btnText}
        <img
          src={arrow}
          alt=""
          className="h-4 w-4 object-contain transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
};

const renderContent = {
  1: (
    <h1 className="neo-brutalism-blue home-intro-title animate-pop mx-4 w-[calc(100vw-2rem)] max-w-2xl text-center text-white sm:mx-5">
      Hi, I&apos;m <span className="font-semibold">Het</span> — I build{" "}
      <span className="font-semibold">AI/ML</span>,{" "}
      <span className="font-semibold">cloud</span>, and software systems.
      <br />
      Welcome to my little island. Have a look around.
    </h1>
  ),
  2: (
    <InfoBox
      text="These days I'm building a Next.js and Azure AI analytics platform at Dometic while training time-series models at Illinois Tech — including Llama 3.1, Qwen2.5, Kronos, and CryptexLLM."
      link="/about"
      btnText="About me"
    />
  ),
  3: (
    <InfoBox
      text="I've built an AI analytics dashboard, the CryptexLLM market forecaster, a Transformer fraud detector, and the E-Motel operations platform."
      link="/projects"
      btnText="View projects"
    />
  ),
  4: (
    <InfoBox
      text="Looking for a software or ML engineer? I'd love to hear from you."
      link="/contact"
      btnText="Contact me"
    />
  ),
};

export const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null;
};

export default HomeInfo;
