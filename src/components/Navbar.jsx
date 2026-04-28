import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['About', 'Projects', 'Skills', 'Contact'];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-md' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        <a href="#" className="text-sm font-medium text-[var(--text1)] tracking-widest uppercase">
          HG
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-[var(--text3)] hover:text-[var(--text1)] transition-colors duration-300 tracking-wide"
            >
              {item}
            </a>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="text-[var(--text5)] hover:text-[var(--text1)] transition-colors duration-300"
          >
            {dark ? <FaSun size={15} /> : <FaMoon size={15} />}
          </button>

          <a
            href="/resume.pdf"
            download
            className="text-sm px-5 py-2 border border-[var(--border2)] text-[var(--text2)] hover:border-[var(--text1)] hover:text-[var(--text1)] rounded-full transition-all duration-300"
          >
            Resume
          </a>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-5">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="text-[var(--text5)] hover:text-[var(--text1)] transition-colors duration-300"
          >
            {dark ? <FaSun size={15} /> : <FaMoon size={15} />}
          </button>
          <button
            className="flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-px bg-[var(--text1)] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-px bg-[var(--text1)] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-[var(--text1)] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--bg)] border-t border-[var(--border)] px-8 py-6 flex flex-col gap-6">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-lg text-[var(--text3)] hover:text-[var(--text1)] transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
