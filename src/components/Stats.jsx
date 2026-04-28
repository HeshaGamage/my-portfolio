const stats = [
  { value: '∞', label: 'Still Gaining Experience' },
  { value: '10+', label: 'Projects Built' },
  { value: '10+', label: 'Technologies' },
  { value: '∞', label: 'Curiosity' },
];

export default function Stats() {
  return (
    <section className="border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-10 px-8 flex flex-col gap-2 ${
                i < stats.length - 1 ? 'border-r border-[var(--border)]' : ''
              }`}
            >
              <span className="text-4xl md:text-5xl font-medium text-[var(--text1)] tracking-tight">
                {stat.value}
              </span>
              <span className="text-sm text-[var(--text5)] tracking-wide">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
