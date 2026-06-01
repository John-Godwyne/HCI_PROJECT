import { CheckCircle2, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function ToastContainer() {
  const { toasts } = useApp();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-soft-lg text-sm font-medium animate-in ${
            t.type === 'success' ? 'bg-emerald-700 text-white' : 'bg-slate-800 text-white'
          }`}
        >
          {t.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <Info className="w-5 h-5 shrink-0" />}
          {t.message}
        </div>
      ))}
    </div>
  );
}
