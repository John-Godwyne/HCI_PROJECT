import { createContext, useContext, useCallback, useState } from 'react';
import { events as initialEvents, notifications as initialNotifications } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [events, setEvents] = useState(initialEvents);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [savedResources, setSavedResources] = useState(['r1']);
  const [toasts, setToasts] = useState([]);
  const [modal, setModal] = useState(null);

  const addToast = useCallback((message, type = 'default') => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  }, []);

  const registerEvent = useCallback((eventId) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, registered: true, going: e.going + 1 } : e))
    );
    setNotifications((prev) => [
      {
        id: `n-${Date.now()}`,
        type: 'registration',
        title: 'Registration confirmed',
        message: 'You are successfully registered. A reminder will be sent before the event.',
        time: 'Just now',
        read: false,
        icon: 'check',
      },
      ...prev,
    ]);
    addToast('Successfully registered! You will receive a reminder before the event.', 'success');
    setModal(null);
  }, [addToast]);

  const cancelRegistration = useCallback((eventId) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId ? { ...e, registered: false, going: Math.max(0, e.going - 1) } : e
      )
    );
    addToast('Registration cancelled. You can register again anytime.', 'default');
    setModal(null);
  }, [addToast]);

  const requestBorrow = useCallback((resourceTitle) => {
    setNotifications((prev) => [
      {
        id: `n-${Date.now()}`,
        type: 'approval',
        title: 'Borrow request submitted',
        message: `Your request for "${resourceTitle}" was sent. The organization will respond within 48 hours.`,
        time: 'Just now',
        read: false,
        icon: 'package',
      },
      ...prev,
    ]);
    addToast('Borrow request submitted. You will be notified when approved.', 'success');
    setModal(null);
  }, [addToast]);

  const toggleSaveResource = useCallback((id) => {
    setSavedResources((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('All notifications marked as read.');
  }, [addToast]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        events,
        notifications,
        savedResources,
        toasts,
        modal,
        setModal,
        addToast,
        registerEvent,
        cancelRegistration,
        requestBorrow,
        toggleSaveResource,
        markNotificationRead,
        markAllRead,
        unreadCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
