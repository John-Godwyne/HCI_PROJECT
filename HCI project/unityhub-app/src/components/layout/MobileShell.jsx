import { Outlet, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { MobileNav } from './MobileNav';
import { ToastContainer } from '../ui/Toast';

export function MobileShell({ showBack }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {showBack && (
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200/80 px-4 h-14 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2.5 -ml-2 rounded-lg hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </header>
      )}
      <div className="max-w-lg mx-auto">
        <Outlet />
      </div>
      <MobileNav />
      <ToastContainer />
    </div>
  );
}
