import { CATEGORIES } from '../../data/mockData';

export function CategoryBadge({ category }) {
  const cat = CATEGORIES[category];
  if (!cat) return null;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${cat.className}`}>
      {cat.label}
    </span>
  );
}

export function StatusBadge({ children, variant = 'default' }) {
  const styles = {
    default: 'bg-slate-100 text-slate-700 ring-slate-500/10',
    success: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    primary: 'bg-primary-50 text-primary-700 ring-primary-600/20',
    warning: 'bg-amber-50 text-amber-800 ring-amber-600/20',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[variant]}`}>
      {children}
    </span>
  );
}
