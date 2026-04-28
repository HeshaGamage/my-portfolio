import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from 'react-icons/fa';
import { useState, useRef } from 'react';

const socialLinks = [
  { icon: <FaGithub size={16} />, label: 'GitHub', href: 'https://github.com/HeshaGamage', value: 'github.com/HeshaGamage' },
  { icon: <FaLinkedin size={16} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/heshan-kavishka-655381215/', value: 'linkedin.com/in/heshan-kavishka' },
  { icon: <FaEnvelope size={16} />, label: 'Email', href: 'mailto:heshank92@gmail.com', value: 'heshank92@gmail.com' },
  { icon: <FaFileDownload size={16} />, label: 'CV — General', href: '/resume.pdf', value: 'Download PDF', download: true },
  { icon: <FaFileDownload size={16} />, label: 'CV — Data Engineering', href: '/resume-de.pdf', value: 'Download PDF', download: true },
  { icon: <FaFileDownload size={16} />, label: 'CV — Full Stack', href: '/resume-fs.pdf', value: 'Download PDF', download: true },
];

export default function Contact() {
  const [status, setStatus] = useState('');
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const message = messageRef.current.value.trim();

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`);

    window.location.href = `mailto:heshank92@gmail.com?subject=${subject}&body=${body}`;
    setStatus('sent');
  }

  return (
    <section id="contact" className="py-32 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-8">
        {/* Big CTA heading */}
        <div className="mb-20">
          <h2 className="text-display text-[var(--text1)] mb-6">
            Let's work<br />
            <span className="text-[var(--text6)]">together</span>
          </h2>
          <p className="text-[var(--text4)] text-lg max-w-md leading-relaxed">
            Open to new roles, collaborations, and conversations about data and tech.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 border-t border-[var(--border)] pt-16">
          {/* Left: links */}
          <div className="flex flex-col gap-4">
            <span className="text-xs text-[var(--text6)] tracking-[0.2em] uppercase mb-4">Find me at</span>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.download ? undefined : '_blank'}
                rel="noopener noreferrer"
                download={link.download}
                className="group flex items-center justify-between py-4 border-b border-[var(--border)] hover:border-[var(--text6)] transition-colors duration-300"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[var(--text6)] group-hover:text-[var(--text1)] transition-colors">{link.icon}</span>
                  <span className="text-sm text-[var(--text3)] tracking-wide uppercase">{link.label}</span>
                </div>
                <span className="text-sm text-[var(--text5)] group-hover:text-[var(--text1)] transition-colors">
                  {link.value}
                </span>
              </a>
            ))}
          </div>

          {/* Right: form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <span className="text-xs text-[var(--text6)] tracking-[0.2em] uppercase mb-4">Send a message</span>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-[var(--text5)] tracking-wide uppercase">Name</label>
              <input
                ref={nameRef}
                type="text"
                placeholder="Your name"
                required
                className="bg-transparent border-b border-[var(--border)] focus:border-[var(--text5)] pb-3 text-[var(--text1)] placeholder-[var(--ghost)] outline-none transition-colors text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-[var(--text5)] tracking-wide uppercase">Email</label>
              <input
                ref={emailRef}
                type="email"
                placeholder="your@email.com"
                required
                className="bg-transparent border-b border-[var(--border)] focus:border-[var(--text5)] pb-3 text-[var(--text1)] placeholder-[var(--ghost)] outline-none transition-colors text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-[var(--text5)] tracking-wide uppercase">Message</label>
              <textarea
                ref={messageRef}
                placeholder="Tell me about your project..."
                rows={4}
                required
                className="bg-transparent border-b border-[var(--border)] focus:border-[var(--text5)] pb-3 text-[var(--text1)] placeholder-[var(--ghost)] outline-none transition-colors resize-none text-sm"
              />
            </div>
            {status === 'sent' ? (
              <div className="py-4 text-center text-green-400 text-sm tracking-wide border border-green-900 rounded-full mt-2">
                Message sent — I'll be in touch soon.
              </div>
            ) : (
              <button
                type="submit"
                className="mt-2 py-4 bg-[var(--accent)] text-[var(--on-accent)] rounded-full font-semibold text-sm hover:bg-[var(--accent-hover)] transition-colors duration-300 tracking-wide"
              >
                Send Message
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
