import { Bell, CheckCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NotificationItem } from '../components/notifications/NotificationItem';
import { Button } from '../components/ui/Button';

export function Notifications() {
  const { notifications, markNotificationRead, markAllRead, unreadCount } = useApp();

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <header>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="text-slate-500 mt-1">
            {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'} — registrations, reminders, and updates.
          </p>
        </header>
        {unreadCount > 0 && (
          <Button variant="secondary" size="sm" onClick={markAllRead}>
            <CheckCheck className="w-4 h-4" /> Mark all read
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {notifications.map((n) => (
          <NotificationItem key={n.id} notification={n} onRead={markNotificationRead} />
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-16">
          <Bell className="w-12 h-12 text-slate-300 mx-auto" />
          <p className="text-slate-500 mt-4">No notifications yet.</p>
        </div>
      )}
    </>
  );
}
