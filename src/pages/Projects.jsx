import { CTA } from "../components";
import { projects } from "../constants";
import { arrow } from "../assets/icons";

export const Projects = () => {
  return (
    <section className='max-container'>
      <h1 className='head-text'>
        Resume{" "}
        <span className='blue-gradient_text drop-shadow font-semibold'>
          Projects
        </span>
      </h1>

      <p className='mt-2 max-w-3xl leading-relaxed text-slate-500'>
        These are the projects currently reflected on my resume, covering LLM
        forecasting, fraud detection, geospatial product tooling, and full-stack
        operational software.
      </p>

      <div className='my-20 flex flex-wrap gap-16'>
        {projects.map((project) => (
          <div className='w-full lg:w-[400px]' key={project.name}>
            <div className='block-container h-12 w-12'>
              <div className={`btn-back rounded-xl ${project.theme}`} />
              <div className='btn-front rounded-xl flex justify-center items-center'>
                <img
                  src={project.iconUrl}
                  alt={project.name}
                  className='h-1/2 w-1/2 object-contain'
                />
              </div>
            </div>

            <div className='mt-5 flex flex-col'>
              <h4 className='font-poppins text-2xl font-semibold'>
                {project.name}
              </h4>
              <p className='mt-2 text-slate-500'>{project.description}</p>

              {project.link ? (
                <div className='mt-5 flex items-center gap-2 font-poppins'>
                  <a
                    href={project.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='font-semibold text-blue-600'
                  >
                    {project.linkLabel || "View Project"}
                  </a>
                  <img
                    src={arrow}
                    alt='arrow'
                    className='h-4 w-4 object-contain'
                  />
                </div>
              ) : (
                <p className='mt-5 text-sm font-medium text-slate-400'>
                  Project summary available here; live demo not linked on the site.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <hr className='border-slate-200' />

      <CTA />
    </section>
  );
};
