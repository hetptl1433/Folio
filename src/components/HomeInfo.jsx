import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";

const InfoBox = ({ text, link, btnText }) => {
  return (
    <div className='info-box'>
      <p className='text-center font-medium sm:text-xl'>{text}</p>
      <Link to={link} className='neo-brutalism-white neo-btn'>
        {btnText}
        <img src={arrow} alt='' className='h-4 w-4 object-contain' />
      </Link>
    </div>
  );
};

const renderContent = {
  1: (
    <h1 className='neo-brutalism-blue mx-5 px-8 py-4 text-center text-white sm:text-xl sm:leading-snug'>
      Hi, I&apos;m <span className='font-semibold'>Het</span>.
      <br />
      I build machine learning systems and full-stack web products.
    </h1>
  ),
  2: (
    <InfoBox
      text='Recent experience includes ML research, graduate teaching, and production-facing application development.'
      link='/about'
      btnText='About me'
    />
  ),
  3: (
    <InfoBox
      text='Current portfolio projects span BTC forecasting, fraud detection, geospatial tooling, and real-time operations software.'
      link='/projects'
      btnText='View projects'
    />
  ),
  4: (
    <InfoBox
      text="Hiring for software, ML, or research-oriented engineering work? Let's talk."
      link='/contact'
      btnText='Contact me'
    />
  ),
};

export const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null;
};

export default HomeInfo;
