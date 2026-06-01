import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';
import { ToastContainer } from '../ui/Toast';
import { Logo } from './Logo';
import { X } from 'lucide-react';

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar onNavigate={() => setMobileOpen(false)} />

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <button type="button" className="absolute inset-0 bg-slate-900/40" aria-label="Close menu" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-soft-lg flex flex-col p-4">
            <div className="flex items-center justify-between mb-2">
              <Logo />
              <button type="button" onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>
            <Sidebar inline onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="lg:pl-60 flex flex-col min-h-screen">
        <TopBar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 px-4 lg:px-6 py-6 pb-24 lg:pb-6 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      <MobileNav />
      <ToastContainer />
    </div>
  );
}
