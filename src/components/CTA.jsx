import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className='panel-strong overflow-hidden'>
      <div className='relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between'>
        <div className='max-w-2xl space-y-4'>
          <span className='section-kicker'>Next move</span>
          <h2 className='section-title text-balance'>
            Building thoughtful software, applied ML workflows, and polished
            product experiences.
          </h2>
          <p className='section-copy max-w-xl'>
            If you need someone who can move between experimentation, engineering,
            and communication without dropping detail, I am ready to talk.
          </p>
        </div>

        <div className='flex flex-col gap-3 sm:flex-row'>
          <Link to='/projects' className='action-secondary'>
            View selected work
          </Link>
          <Link to='/contact' className='action-primary'>
            Contact me
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
