import { FaGithub, FaArrowRight } from 'react-icons/fa';

const projects = [
  {
    number: '01',
    title: 'Smart University System',
    description:
      'Smart University Platform (SMS) is a Flutter mobile app for university students that combines Lost & Found, a Marketplace, Study Group matching, and Study Area finding — powered by AI features like semantic search and smart grouping, backed by Firebase.',
    tags: ['React Native', 'Node.js', 'Python', 'ML', 'MongoDB'],
    github: 'https://github.com/it24101264/WE_DS_G03_AIML',
    live: null,
    year: '2025',
  },
  {
    number: '02',
    title: 'ML Cryptocurrency Price Prediction',
    description:
      'Developed a machine learning model to predict cryptocurrency price trends using historical data, featuring interactive visualizations and real-time data fetching via yFinance.',
    tags: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'yFinance'],
    github: 'https://github.com/HeshaGamage/Crypto_price_project',
    live: null,
    year: '2025',
  },
  {
    number: '03',
    title: 'ResumeX — AI Job Application Assistant',
    description:
      'Full-stack web app that analyses resumes against job descriptions to generate ATS match scores, identify missing skills, suggest improvements, generate cover letters, and predict suitable roles using NLP and ML.',
    tags: ['Python', 'NLP', 'Machine Learning', 'Full-Stack', 'AI'],
    github: 'https://github.com/HeshaGamage/resumeX',
    live: null,
    year: '2026',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 max-w-7xl mx-auto px-8">
      {/* Section header */}
      <div className="flex items-end justify-between mb-16 border-b border-[var(--border)] pb-8">
        <h2 className="text-section text-[var(--text1)]">Selected Work</h2>
        <span className="text-sm text-[var(--text5)] tracking-widest uppercase hidden sm:block">
          {projects.length} Projects
        </span>
      </div>

      {/* Project list */}
      <div className="flex flex-col">
        {projects.map((project) => (
          <div
            key={project.number}
            className="group border-b border-[var(--border)] py-10 grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-6 md:gap-10 items-start hover:bg-[var(--hover)] transition-colors duration-300 -mx-4 px-4 rounded-xl cursor-default"
          >
            {/* Number */}
            <span className="text-xs text-[var(--text6)] tracking-widest mt-1 font-mono">
              {project.number}
            </span>

            {/* Content */}
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4 flex-wrap">
                <h3 className="text-xl md:text-2xl font-medium text-[var(--text1)] transition-colors">
                  {project.title}
                </h3>
                <span className="text-xs text-[var(--text5)] border border-[var(--border2)] px-2.5 py-1 rounded-full mt-1">
                  {project.year}
                </span>
              </div>
              <p className="text-[var(--text4)] text-sm leading-relaxed max-w-xl">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-[var(--text5)] bg-[var(--tag-bg)] border border-[var(--tag-bd)] px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 md:pt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text4)] hover:text-[var(--text1)] transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text4)] hover:text-[var(--text1)] transition-colors"
                  aria-label="Live"
                >
                  <FaArrowRight size={16} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
