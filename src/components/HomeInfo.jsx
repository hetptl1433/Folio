import React from 'react'
import { Link } from 'react-router-dom'
import {arrow } from '../assets/icons'
const InfoBox = ({text, link, btnText}) => {
    return (
        <div className="info-box">
            <p className='font-medium sm:text-xl text-center'>{text}</p>
            <Link to={link}  className='neo-brutalism-white neo-btn '>{btnText} <img sec={arrow} className='w-4 h-4 object-contain'></img></Link>
        </div>
    );
};
 const renderContent = {
        1: (
           <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5' >Hi, I am <span className='font-semibold'>Het</span> 👋<br/>Sofwear Engineer from Chicago </h1>
        ),
        2: (
            <InfoBox text={"Worked with many companies and gathered lot of skills"} link={'/about'} btnText={'Learn More'}/>
        ),
        3: (
                      <InfoBox text={"Led multiple projects to my success"} link={'/Projects'} btnText={'Visit portfolio'}/>

        ),
        4: (
                        <InfoBox text={"Need a project done or loooking for dev? ping me"} link={'/contact'} btnText={"Let's talk"}/>

        ),
    }
export const HomeInfo = ({currentStage}) => {
   
  return renderContent[currentStage] || null;
}


export default HomeInfo;