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
      <span className="font-semibold">software</span> and{" "}
      <span className="font-semibold">ML systems</span>.
      <br />
      Welcome to my little island. Have a look around.
    </h1>
  ),
  2: (
    <InfoBox
      text="These days I'm building AI analytics at Dometic and doing ML research at Illinois Tech. Before that, I shipped software at Barodaweb and VMC."
      link="/about"
      btnText="About me"
    />
  ),
  3: (
    <InfoBox
      text="I've been building things like an ML analytics tool that forecasts sales and costs, an LLM market forecaster, a fraud detector, and a motel ops platform."
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
