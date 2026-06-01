export function Card({ children, className = '', padding = true }) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200/80 shadow-soft ${padding ? 'p-5' : ''} ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ title, description, action }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-4">
      <div>
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        {description && <p className="text-sm text-slate-500 mt-0.5">{description}</p>}
      </div>
      {action}
    </div>
  );
}
