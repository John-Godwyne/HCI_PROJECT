import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppShell } from './components/layout/AppShell';
import { MobileShell } from './components/layout/MobileShell';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Events } from './pages/Events';
import { EventDetail } from './pages/EventDetail';
import { Resources } from './pages/Resources';
import { ResourceDetail } from './pages/ResourceDetail';
import { OrganizationProfile } from './pages/OrganizationProfile';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { MobileDashboard } from './pages/MobileDashboard';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />

          {/* Mobile-specific screens */}
          <Route path="/m" element={<MobileDashboard />} />
          <Route path="/m/events/:id" element={<MobileShell showBack />}>
            <Route index element={<EventDetail mobile />} />
          </Route>

          {/* Desktop app shell */}
          <Route element={<AppShell />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:id" element={<ResourceDetail />} />
            <Route path="/organizations/:id" element={<OrganizationProfile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
