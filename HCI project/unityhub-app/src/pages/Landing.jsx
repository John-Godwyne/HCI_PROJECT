import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Calendar,
  Package,
  Users,
  Bell,
  Shield,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { Logo } from '../components/layout/Logo';
import { Button } from '../components/ui/Button';

const features = [
  { icon: Calendar, title: 'Event Management', desc: 'Discover, register, and manage campus and community activities in one place.' },
  { icon: Package, title: 'Resource Sharing', desc: 'Borrow equipment and materials from organizations — reduce waste, save budgets.' },
  { icon: Users, title: 'Organization Profiles', desc: 'Connect with NSTP groups, student orgs, and barangay youth partners.' },
  { icon: Bell, title: 'Smart Notifications', desc: 'Reminders, approvals, and updates so you never miss an opportunity.' },
];

const hci = [
  'Consistent navigation and visual language',
  'Clear system status with toasts and badges',
  'User control — cancel registrations anytime',
  'Filters and labels — no memorization required',
  'WCAG-friendly contrast and keyboard focus',
];

export function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-200/80 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900">Features</a>
            <a href="#hci" className="hover:text-slate-900">HCI Design</a>
            <a href="#sdg" className="hover:text-slate-900">SDG 17</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="text-sm font-medium text-slate-600 hover:text-slate-900 hidden sm:inline min-h-[44px] flex items-center px-3">
              Sign in
            </Link>
            <Link to="/dashboard">
              <Button>Get Started <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-6 ring-1 ring-primary-600/10">
            <Sparkles className="w-4 h-4" />
            SDG 17 — Partnerships for the Goals
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
            One platform for community collaboration
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl">
            UnityHub centralizes events, resource sharing, and organization partnerships for students, NSTP groups, and local volunteer communities.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/dashboard">
              <Button size="lg">Open Dashboard <ArrowRight className="w-4 h-4" /></Button>
            </Link>
            <Link to="/m">
              <Button size="lg" variant="secondary">Mobile View</Button>
            </Link>
          </div>
        </div>

        <div className="mt-16 rounded-2xl border border-slate-200/80 shadow-soft-lg overflow-hidden bg-slate-50">
          <div className="aspect-[16/9] max-h-[480px] bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center p-8">
            <div className="w-full max-w-4xl grid grid-cols-3 gap-3 opacity-90">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 shadow-soft h-32" />
              ))}
              <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-4 shadow-soft h-40" />
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-soft h-40" />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-slate-50 border-y border-slate-200/80 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900">Built for real collaboration</h2>
          <p className="text-slate-600 mt-2 max-w-xl">Everything fragmented across social media and group chats — unified.</p>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-soft">
                <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900">{title}</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="hci" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-secondary-600 font-medium text-sm mb-4">
              <Shield className="w-4 h-4" />
              HCI Principles
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Designed for everyone</h2>
            <p className="text-slate-600 mt-3">Accessibility-first, consistent, and transparent — so students and organizations can focus on impact.</p>
            <ul className="mt-8 space-y-3">
              {hci.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-secondary-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div id="sdg" className="bg-primary-500 rounded-2xl p-8 text-white shadow-soft-lg">
            <p className="text-primary-100 text-sm font-medium">Aligned with</p>
            <h3 className="text-2xl font-bold mt-1">UN SDG 17</h3>
            <p className="text-primary-100 mt-4 text-sm leading-relaxed">
              Strengthening partnerships between students, organizations, and local communities through centralized digital collaboration.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        UnityHub HCI Prototype · Connect. Collaborate. Create Impact.
      </footer>
    </div>
  );
}
