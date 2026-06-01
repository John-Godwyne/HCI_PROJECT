export function FilterChips({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filters">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
          className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors min-h-[40px] ${
            value === opt.value
              ? 'bg-primary-500 text-white shadow-soft'
              : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
