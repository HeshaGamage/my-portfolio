export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8 px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs text-[var(--text6)] tracking-widest uppercase">
          © {new Date().getFullYear()} Heshan Gamage
        </span>
        <span className="text-xs text-[var(--ghost)] tracking-widest uppercase">
          Built with React + Tailwind
        </span>
      </div>
    </footer>
  );
}
