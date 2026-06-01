export function StatCard({ label, value, icon: Icon, accent = 'primary' }) {
  const accents = {
    primary: 'text-primary-600 bg-primary-50',
    secondary: 'text-secondary-600 bg-emerald-50',
    slate: 'text-slate-600 bg-slate-100',
  };
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-soft">
      {Icon && (
        <div className={`inline-flex p-2 rounded-lg mb-3 ${accents[accent]}`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
      <p className="text-2xl font-semibold text-slate-900 tabular-nums">{value}</p>
      <p className="text-sm text-slate-500 mt-1">{label}</p>
    </div>
  );
}
