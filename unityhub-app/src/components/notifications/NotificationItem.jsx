import { Calendar, Package, CheckCircle2, Users, Info } from 'lucide-react';

const icons = {
  calendar: Calendar,
  package: Package,
  check: CheckCircle2,
  users: Users,
  info: Info,
};

export function NotificationItem({ notification, onRead }) {
  const Icon = icons[notification.icon] ?? Info;

  return (
    <button
      type="button"
      onClick={() => onRead?.(notification.id)}
      className={`w-full flex gap-3 p-4 text-left rounded-xl border transition-colors min-h-[72px] ${
        notification.read
          ? 'bg-white border-slate-200/80 hover:bg-slate-50'
          : 'bg-primary-50/50 border-primary-100 hover:bg-primary-50'
      }`}
    >
      <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${notification.read ? 'bg-slate-100 text-slate-600' : 'bg-primary-100 text-primary-600'}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="font-medium text-slate-900 text-sm">{notification.title}</p>
          <span className="text-xs text-slate-400 shrink-0">{notification.time}</span>
        </div>
        <p className="text-sm text-slate-500 mt-0.5 line-clamp-2">{notification.message}</p>
      </div>
      {!notification.read && <span className="shrink-0 w-2 h-2 rounded-full bg-primary-500 mt-2" aria-hidden />}
    </button>
  );
}
