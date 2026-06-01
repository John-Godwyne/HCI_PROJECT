import { useState } from 'react';
import { Bell, Mail, Shield, Moon } from 'lucide-react';
import { currentUser } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

function Toggle({ label, description, defaultOn = true }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-slate-100 last:border-0">
      <div>
        <p className="font-medium text-slate-900 text-sm">{label}</p>
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => setOn(!on)}
        className={`relative w-11 h-6 rounded-full transition-colors shrink-0 min-h-[44px] min-w-[44px] flex items-center ${
          on ? 'bg-primary-500' : 'bg-slate-200'
        }`}
      >
        <span className={`absolute w-5 h-5 bg-white rounded-full shadow transition-transform ${on ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
    </div>
  );
}

export function Settings() {
  const { addToast } = useApp();
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  return (
    <>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account, notifications, and preferences.</p>
      </header>

      <div className="space-y-6 max-w-2xl">
        <Card>
          <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-slate-400" /> Profile
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full name</label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm min-h-[44px] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm min-h-[44px] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
            <Button onClick={() => addToast('Profile saved successfully', 'success')}>Save changes</Button>
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <Bell className="w-5 h-5 text-slate-400" /> Notifications
          </h2>
          <Toggle label="Event reminders" description="Get notified 2 days before registered events" />
          <Toggle label="Registration confirmations" description="Confirm when you register for an event" />
          <Toggle label="Borrow request updates" description="Approvals and status changes for resources" />
          <Toggle label="Organization updates" description="Partnership invites and org announcements" />
        </Card>

        <Card>
          <h2 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <Mail className="w-5 h-5 text-slate-400" /> Accessibility
          </h2>
          <Toggle label="Reduce motion" description="Minimize animations for comfort" defaultOn={false} />
          <Toggle label="High contrast mode" description="Increase text and border contrast" defaultOn={false} />
        </Card>

        <Card>
          <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Moon className="w-5 h-5 text-slate-400" /> Appearance
          </h2>
          <p className="text-sm text-slate-500">Light mode is optimized for readability and WCAG contrast. Dark mode coming in full version.</p>
        </Card>
      </div>
    </>
  );
}
