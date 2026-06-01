import { Link } from 'react-router-dom';

export function Logo({ compact = false }) {
  return (
    <Link to="/dashboard" className="flex items-center gap-2.5 group">
      <div className="w-9 h-9 rounded-lg bg-primary-500 flex items-center justify-center shadow-soft">
        <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden>
          <circle cx="8" cy="10" r="3" fill="white" fillOpacity="0.95" />
          <circle cx="16" cy="10" r="3" fill="white" fillOpacity="0.75" />
          <circle cx="12" cy="16" r="3" fill="white" fillOpacity="0.55" />
        </svg>
      </div>
      {!compact && (
        <div>
          <span className="font-semibold text-slate-900 text-[15px]">UnityHub</span>
          <span className="block text-[10px] text-slate-500 leading-tight">Connect. Collaborate. Create Impact.</span>
        </div>
      )}
    </Link>
  );
}
