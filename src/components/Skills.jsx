import {
  SiPython, SiJavascript, SiTypescript, SiReact, SiNodedotjs,
  SiHtml5, SiCss, SiFlutter, SiPhp, SiSpringboot, SiWordpress,
  SiNextdotjs, SiTailwindcss, SiDjango, SiFlask, SiFastapi,
  SiGithub, SiDocker, SiTensorflow, SiPytorch, SiPandas, SiScikitlearn,
  SiMysql, SiFirebase, SiGit, SiMongodb, SiRedis, SiKubernetes,
  SiPostgresql, SiApachekafka, SiJupyter, SiNumpy,
} from 'react-icons/si';

const languages = [
  { name: 'Python',      Icon: SiPython,      color: '#3776AB' },
  { name: 'JavaScript',  Icon: SiJavascript,  color: '#F7DF1E' },
  { name: 'TypeScript',  Icon: SiTypescript,  color: '#3178C6' },
  { name: 'PHP',         Icon: SiPhp,         color: '#8892BE' },
  { name: 'HTML5',       Icon: SiHtml5,       color: '#E34F26' },
  { name: 'CSS3',        Icon: SiCss,         color: '#1572B6' },
  { name: 'React',       Icon: SiReact,       color: '#61DAFB' },
  { name: 'Next.js',     Icon: SiNextdotjs,   color: '#f0f0f0' },
  { name: 'Node.js',     Icon: SiNodedotjs,   color: '#68A063' },
  { name: 'Tailwind',    Icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Flutter',     Icon: SiFlutter,     color: '#54C5F8' },
  { name: 'Spring Boot', Icon: SiSpringboot,  color: '#6DB33F' },
  { name: 'Django',      Icon: SiDjango,      color: '#092E20' },
  { name: 'FastAPI',     Icon: SiFastapi,     color: '#009688' },
  { name: 'WordPress',   Icon: SiWordpress,   color: '#21759B' },
];

const tools = [
  { name: 'GitHub',       Icon: SiGithub,       color: '#f0f0f0' },
  { name: 'Docker',       Icon: SiDocker,       color: '#2496ED' },
  { name: 'TensorFlow',   Icon: SiTensorflow,   color: '#FF6F00' },
  { name: 'PyTorch',      Icon: SiPytorch,      color: '#EE4C2C' },
  { name: 'Pandas',       Icon: SiPandas,       color: '#9B59B6' },
  { name: 'NumPy',        Icon: SiNumpy,        color: '#4DABCF' },
  { name: 'Scikit-learn', Icon: SiScikitlearn,  color: '#F7931E' },
  { name: 'MySQL',        Icon: SiMysql,        color: '#4479A1' },
  { name: 'Firebase',     Icon: SiFirebase,     color: '#FFCA28' },
  { name: 'Git',          Icon: SiGit,          color: '#F05032' },
  { name: 'MongoDB',      Icon: SiMongodb,      color: '#47A248' },
  { name: 'Redis',        Icon: SiRedis,        color: '#DC382D' },
  { name: 'PostgreSQL',   Icon: SiPostgresql,   color: '#336791' },
  { name: 'Kubernetes',   Icon: SiKubernetes,   color: '#326CE5' },
  { name: 'Kafka',        Icon: SiApachekafka,  color: '#f0f0f0' },
  { name: 'Jupyter',      Icon: SiJupyter,      color: '#F37626' },
];

const maskStyle = {
  maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
  WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
};

function TechCard({ name, Icon, color }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 w-[100px] h-[100px] flex-shrink-0 bg-[var(--surface)] border border-[var(--border)] rounded-2xl hover:border-[var(--border2)] transition-colors duration-300 cursor-default">
      <Icon size={30} color={color} />
      <span className="text-[10px] text-[var(--text5)] tracking-wide text-center leading-tight px-1">
        {name}
      </span>
    </div>
  );
}

function Reel({ items, reverse = false, duration = 30 }) {
  return (
    <div className="overflow-hidden" style={maskStyle}>
      <div
        className="flex gap-4 w-max"
        style={{ animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${duration}s linear infinite` }}
      >
        {[...items, ...items].map((item, i) => (
          <TechCard key={i} {...item} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-32 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-8 mb-16">
        <div className="flex items-end justify-between border-b border-[var(--border)] pb-8">
          <h2 className="text-section text-[var(--text1)]">
            Tech <span className="text-orange-400">Stack</span>
          </h2>
          <span className="text-sm text-[var(--text5)] tracking-widest uppercase hidden sm:block">
            Tools &amp; Languages
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div>
          <p className="text-xs text-[var(--text6)] tracking-[0.2em] uppercase px-8 max-w-7xl mx-auto mb-5">
            Languages &amp; Frameworks
          </p>
          <Reel items={languages} duration={32} />
        </div>

        <div>
          <p className="text-xs text-[var(--text6)] tracking-[0.2em] uppercase px-8 max-w-7xl mx-auto mb-5">
            AI / Data / Cloud / Tools
          </p>
          <Reel items={tools} reverse duration={36} />
        </div>
      </div>
    </section>
  );
}
