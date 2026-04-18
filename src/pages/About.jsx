import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { CTA } from "../components";
import { education, experiences, skillCategories, skills } from "../constants";

import "react-vertical-timeline-component/style.min.css";

export const About = () => {
  return (
    <section className='max-container'>
      <h1 className='head-text'>
        Hello, I&apos;m{" "}
        <span className='blue-gradient_text font-semibold drop-shadow'>Het</span>
      </h1>

      <div className='mt-5 flex max-w-3xl flex-col gap-3 text-slate-600 leading-relaxed'>
        <p>
          I&apos;m a software and machine learning engineer with experience across
          research workflows, technical instruction, and full-stack product
          development.
        </p>
        <p>
          My recent work spans Python and PyTorch experimentation, teaching
          graduate cryptography labs, and building production-facing web
          applications with React, Node.js, and MongoDB.
        </p>
      </div>

      <div className='py-10'>
        <h3 className='subhead-text'>Education</h3>

        <div className='mt-8 grid gap-6 md:grid-cols-2'>
          {education.map((item) => (
            <div
              key={item.school}
              className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'
            >
              <p className='text-sm font-semibold uppercase tracking-[0.2em] text-sky-600'>
                {item.date}
              </p>
              <h4 className='mt-3 text-xl font-poppins font-semibold text-slate-900'>
                {item.school}
              </h4>
              <p className='mt-2 text-slate-700'>{item.degree}</p>
              <p className='mt-1 text-sm text-slate-500'>{item.location}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='py-10 flex flex-col'>
        <h3 className='subhead-text'>Selected Stack</h3>

        <div className='mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-4'>
          {skills.map((skill) => (
            <div key={skill.name} className='flex flex-col items-center text-center'>
              <div className='block-container h-20 w-20'>
                <div className='btn-back rounded-xl' />
                <div className='btn-front rounded-xl flex justify-center items-center'>
                  <img
                    src={skill.imageUrl}
                    alt={skill.name}
                    className='h-1/2 w-1/2 object-contain'
                  />
                </div>
              </div>
              <p className='mt-5 font-poppins font-semibold text-slate-900'>
                {skill.name}
              </p>
              <p className='text-sm text-slate-500'>{skill.type}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='py-10'>
        <h3 className='subhead-text'>Core Skills</h3>

        <div className='mt-8 grid gap-5 md:grid-cols-2'>
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'
            >
              <h4 className='text-lg font-poppins font-semibold text-slate-900'>
                {category.title}
              </h4>
              <p className='mt-3 leading-relaxed text-slate-600'>
                {category.items.join(" | ")}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='py-16'>
        <h3 className='subhead-text'>Experience</h3>
        <div className='mt-5 max-w-3xl text-slate-600'>
          <p>
            The recent timeline below matches the roles highlighted on my resume,
            from applied ML research and graduate teaching to production web and
            platform engineering.
          </p>
        </div>

        <div className='mt-12 flex'>
          <VerticalTimeline>
            {experiences.map((experience) => (
              <VerticalTimelineElement
                key={`${experience.company_name}-${experience.title}`}
                date={experience.date}
                iconStyle={{ background: experience.iconBg }}
                icon={
                  <div className='flex justify-center items-center w-full h-full'>
                    <img
                      src={experience.icon}
                      alt={experience.company_name}
                      className='h-[60%] w-[60%] object-contain'
                    />
                  </div>
                }
                contentStyle={{
                  borderBottom: "8px",
                  borderStyle: "solid",
                  borderBottomColor: experience.iconBg,
                  boxShadow: "none",
                }}
              >
                <div>
                  <h3 className='font-poppins text-xl font-semibold text-black'>
                    {experience.title}
                  </h3>
                  <p
                    className='text-base font-medium text-black-500'
                    style={{ margin: 0 }}
                  >
                    {experience.company_name}
                  </p>
                </div>

                <ul className='my-5 ml-5 list-disc space-y-2'>
                  {experience.points.map((point, index) => (
                    <li
                      key={`experience-point-${index}`}
                      className='pl-1 text-sm font-normal text-black-500/70'
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>

      <hr className='border-slate-200' />

      <CTA />
    </section>
  );
};
