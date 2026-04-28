import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Hero() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-between px-8 pt-32 pb-16 max-w-7xl mx-auto w-full"
    >
      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center">
        {/* Label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs tracking-[0.2em] uppercase text-[var(--text4)]">
            Available for opportunities
          </span>
        </div>

        {/* Display name */}
        <h1 className="text-display text-[var(--text1)] mb-8 fade-up" style={{ animationDelay: '0.1s' }}>
          Heshan<br />Gamage
        </h1>

        {/* Role + description row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-[var(--border)] pt-8">
          <p className="text-[var(--text3)] text-base md:text-lg max-w-md leading-relaxed" style={{ animationDelay: '0.2s' }}>
            I engineer data pipelines, train machine learning models,
            and ship full-stack products — turning raw data into
            meaningful experiences.
          </p>

          <div className="flex flex-col gap-1 text-right">
            <span className="text-sm text-[var(--text5)] tracking-wide uppercase">Role</span>
            <span className="text-[var(--text1)] font-medium">Data Engineer</span>
            <span className="text-[var(--text1)] font-medium">ML Engineer</span>
            <span className="text-[var(--text1)] font-medium">Full-Stack Developer</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border)] pt-8 mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Social icons */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/HeshaGamage"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text5)] hover:text-[var(--text1)] transition-colors duration-300"
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/heshan-kavishka-655381215/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text5)] hover:text-[var(--text1)] transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href="mailto:heshank92@gmail.com"
            className="text-[var(--text5)] hover:text-[var(--text1)] transition-colors duration-300"
            aria-label="Email"
          >
            <FaEnvelope size={18} />
          </a>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <a
            href="#projects"
            className="text-sm px-6 py-3 bg-[var(--accent)] text-[var(--on-accent)] font-semibold rounded-full hover:bg-[var(--accent-hover)] transition-colors duration-300"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="text-sm px-6 py-3 border border-[var(--border2)] text-[var(--text2)] rounded-full hover:border-[var(--text1)] hover:text-[var(--text1)] transition-all duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
