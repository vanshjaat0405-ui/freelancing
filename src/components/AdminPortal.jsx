import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  Shield,
  X,
  Mail,
  User,
  Eye,
  EyeOff,
  Trash2,
  ExternalLink,
  MessageCircle,
  Phone,
  CheckCircle,
  AlertCircle,
  Clock,
  Sparkles,
  Inbox
} from 'lucide-react';
import { profile } from '../data/profile';

export const AdminPortal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });
  const [inquiries, setInquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('inbox'); // 'inbox' | 'profile'

  // Load inquiries from localStorage
  useEffect(() => {
    if (isOpen) {
      loadInquiries();
    }
  }, [isOpen, isAuthenticated]);

  const loadInquiries = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('portfolio_inquiries') || '[]');
      setInquiries(stored);
    } catch {
      setInquiries([]);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    if (cleanUser === 'vansh jaat' && cleanPass === 'vansh jaat') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setUsername('');
      setPassword('');
      loadInquiries();
    } else {
      setError('Invalid username or password. Use: vansh jaat / vansh jaat');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
  };

  const handleDeleteInquiry = (id) => {
    const updated = inquiries.filter((item) => item.id !== id);
    setInquiries(updated);
    localStorage.setItem('portfolio_inquiries', JSON.stringify(updated));
  };

  const handleAddDemoLead = () => {
    const demo = {
      id: Date.now(),
      name: 'Amit Verma (Demo Client)',
      email: 'amit.verma@example.com',
      projectType: 'Business Website',
      message: 'Looking for a responsive business landing page for our new tech consultancy startup.',
      date: new Date().toLocaleString(),
    };
    const updated = [demo, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('portfolio_inquiries', JSON.stringify(updated));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {isAuthenticated ? 'Admin Dashboard' : 'Admin Portal Login'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isAuthenticated ? 'Welcome back, Vansh Jaat' : 'Restricted Access for Vansh Jaat'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 transition-colors"
              >
                Logout
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isAuthenticated ? (
            /* LOGIN FORM */
            <form onSubmit={handleLogin} className="max-w-md mx-auto space-y-5 py-4">
              <div className="text-center space-y-1 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  Admin Sign In
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Enter your admin credentials to access client inquiries and settings.
                </p>
              </div>

              {error && (
                <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Username Input */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="vansh jaat"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    required
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    required
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-md shadow-indigo-600/30 transition-all text-sm"
              >
                Sign In to Dashboard
              </button>

              <p className="text-center text-[11px] text-slate-400">
                Authorized for Vansh Jaat only.
              </p>
            </form>
          ) : (
            /* DASHBOARD VIEW */
            <div className="space-y-6">
              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <button
                  onClick={() => setActiveTab('inbox')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'inbox'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Inbox className="w-3.5 h-3.5" />
                  <span>Client Inquiries ({inquiries.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Live Settings</span>
                </button>
              </div>

              {activeTab === 'inbox' ? (
                /* INBOX TAB */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Messages submitted via website contact form:
                    </span>
                    <button
                      onClick={handleAddDemoLead}
                      className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                    >
                      + Add Sample Lead
                    </button>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="py-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                      <Inbox className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        No inquiries yet
                      </p>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                        When visitors fill out the "Have a Project in Mind?" form on your website, their requests will appear right here.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {inquiries.map((inquiry) => (
                        <div
                          key={inquiry.id}
                          className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2 relative group"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                                  {inquiry.name}
                                </h5>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60">
                                  {inquiry.projectType}
                                </span>
                              </div>
                              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                                <Mail className="w-3 h-3" />
                                {inquiry.email} &bull; <Clock className="w-3 h-3 ml-1" /> {inquiry.date}
                              </span>
                            </div>

                            <button
                              onClick={() => handleDeleteInquiry(inquiry.id)}
                              className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                              title="Delete message"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200/60 dark:border-slate-700/60 leading-relaxed">
                            "{inquiry.message}"
                          </p>

                          <div className="flex gap-2 pt-1">
                            <a
                              href={`mailto:${inquiry.email}?subject=Re: Inquiry regarding ${inquiry.projectType}&body=Hi ${inquiry.name},%0D%0A%0D%0AThanks for reaching out about your ${inquiry.projectType} project!`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>Reply Email</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* PROFILE / SETTINGS TAB */
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                      Current Live Information
                    </h5>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                        <span className="text-slate-500">Admin Name:</span>
                        <strong className="text-slate-900 dark:text-white">{profile.name}</strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                        <span className="text-slate-500">Contact Email:</span>
                        <strong className="text-slate-900 dark:text-white">{profile.email}</strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                        <span className="text-slate-500">Primary WhatsApp:</span>
                        <strong className="text-slate-900 dark:text-white">{profile.whatsapp}</strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                        <span className="text-slate-500">Alternate Phone:</span>
                        <strong className="text-slate-900 dark:text-white">{profile.alternatePhone}</strong>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-500">GitHub:</span>
                        <strong className="text-indigo-600 dark:text-indigo-400">{profile.github}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/50 text-xs text-indigo-900 dark:text-indigo-300 space-y-1">
                    <strong className="block font-semibold">💡 Admin Note:</strong>
                    <span>
                      Aapka portfolio bilkul live aur safe hai. Saare client messages is Dashboard me real-time store hote rahenge!
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
