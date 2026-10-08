import React, { useState, useEffect } from 'react';
import {
  Lock,
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
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Inbox,
  LayoutDashboard,
  FolderGit2,
  Settings,
  Maximize2,
  Minimize2,
  Download,
  Search,
  Plus,
  TrendingUp,
  LogOut,
  Save,
  Check
} from 'lucide-react';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { services } from '../data/services';

export const AdminPortal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });

  const [inquiries, setInquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'inbox' | 'projects' | 'settings'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Editable Profile Settings
  const [editableProfile, setEditableProfile] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('custom_profile_settings') || 'null');
      return saved || {
        email: profile.email,
        whatsapp: profile.whatsapp,
        alternatePhone: profile.alternatePhone,
        github: profile.github,
        linkedin: profile.linkedin,
      };
    } catch {
      return {
        email: profile.email,
        whatsapp: profile.whatsapp,
        alternatePhone: profile.alternatePhone,
        github: profile.github,
        linkedin: profile.linkedin,
      };
    }
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

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
      name: 'Rohan Sharma (Demo Startup)',
      email: 'rohan.sharma@example.com',
      projectType: 'Business Website',
      message: 'Hello Vansh! We need a clean, responsive landing page for our new SaaS platform. Can we schedule a quick call?',
      date: new Date().toLocaleString(),
      status: 'New'
    };
    const updated = [demo, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('portfolio_inquiries', JSON.stringify(updated));
  };

  const handleExportCSV = () => {
    if (inquiries.length === 0) {
      alert('No inquiries to export!');
      return;
    }
    const headers = ['ID,Name,Email,Project Type,Date,Message\n'];
    const rows = inquiries.map(
      (i) => `"${i.id}","${i.name}","${i.email}","${i.projectType}","${i.date}","${(i.message || '').replace(/"/g, '""')}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_vansh_portfolio_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('custom_profile_settings', JSON.stringify(editableProfile));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.message?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || inquiry.projectType === filterType;
    return matchesSearch && matchesType;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
          isFullscreen
            ? 'w-full h-full rounded-none'
            : 'w-full max-w-6xl h-[92vh] max-h-[900px]'
        }`}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">
                  {isAuthenticated ? 'Vansh Jaat — Pro Admin Center' : 'Admin Portal Login'}
                </h3>
                {isAuthenticated && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live Mode
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isAuthenticated
                  ? 'Manage incoming leads, website metrics, and profile settings'
                  : 'Restricted system for Vansh Jaat (vansh jaat / vansh jaat)'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Mode'}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close admin dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* LOGIN VIEW */
          <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
            <form onSubmit={handleLogin} className="w-full max-w-md space-y-6 py-8">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-inner">
                  <Lock className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                  Admin Sign In
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Access your client inbox, live inquiries, and developer workspace.
                </p>
              </div>

              {error && (
                <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="vansh jaat"
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                      required
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••"
                      className="w-full pl-11 pr-11 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                      required
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-lg shadow-indigo-600/30 transition-all text-sm hover:scale-[1.01]"
              >
                Sign In to Pro Dashboard
              </button>

              <div className="text-center pt-2">
                <span className="text-xs text-slate-400">
                  Default credentials configured: <code className="text-indigo-500 font-bold">vansh jaat</code>
                </span>
              </div>
            </form>
          </div>
        ) : (
          /* EXPANDED PRO DASHBOARD */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-4 space-y-1 flex flex-row md:flex-col overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'overview'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('inbox')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'inbox'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Inbox className="w-4 h-4" />
                  <span>Client Inbox</span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    activeTab === 'inbox'
                      ? 'bg-white/20 text-white'
                      : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                  }`}
                >
                  {inquiries.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'projects'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <FolderGit2 className="w-4 h-4" />
                <span>Projects ({projects.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'settings'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Contact Settings</span>
              </button>
            </aside>

            {/* Main Workspace Area */}
            <main className="flex-1 p-4 sm:p-8 overflow-y-auto bg-white dark:bg-slate-900">
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  {/* Quick Stat Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Total Inquiries
                      </span>
                      <div className="flex items-baseline justify-between">
                        <span className="text-3xl font-black text-slate-900 dark:text-white">
                          {inquiries.length}
                        </span>
                        <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" /> Active
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">Leads captured via website form</p>
                    </div>

                    <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Active Services
                      </span>
                      <div className="flex items-baseline justify-between">
                        <span className="text-3xl font-black text-slate-900 dark:text-white">
                          {services.length}
                        </span>
                        <span className="text-xs font-semibold text-indigo-500">Live</span>
                      </div>
                      <p className="text-[11px] text-slate-400">Portfolio, Business, Landing Pages</p>
                    </div>

                    <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Featured Projects
                      </span>
                      <div className="flex items-baseline justify-between">
                        <span className="text-3xl font-black text-slate-900 dark:text-white">
                          {projects.length}
                        </span>
                        <span className="text-xs font-semibold text-purple-500">Showcased</span>
                      </div>
                      <p className="text-[11px] text-slate-400">Wired to your GitHub repositories</p>
                    </div>

                    <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/30 space-y-2">
                      <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                        Outreach Status
                      </span>
                      <div className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                        Ready For Clients
                      </div>
                      <p className="text-[11px] text-indigo-200/80">WhatsApp & Direct Email Active</p>
                    </div>
                  </div>

                  {/* Quick Action Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50">
                    <div>
                      <h4 className="font-bold text-sm text-indigo-950 dark:text-indigo-200">
                        Admin Quick Tools
                      </h4>
                      <p className="text-xs text-indigo-800/70 dark:text-indigo-300/70">
                        Test new leads or export existing clients to spreadsheet
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      <button
                        onClick={handleAddDemoLead}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Demo Client Lead</span>
                      </button>
                      <button
                        onClick={handleExportCSV}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-all shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export CSV Leads</span>
                      </button>
                    </div>
                  </div>

                  {/* Recent Leads Preview */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        Recent Client Inquiries
                      </h4>
                      <button
                        onClick={() => setActiveTab('inbox')}
                        className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        View All Inbox &rarr;
                      </button>
                    </div>

                    {inquiries.length === 0 ? (
                      <div className="py-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                        <Inbox className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                          No inquiries received yet
                        </p>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                          Click "Add Demo Client Lead" above to see how incoming requests look in your dashboard.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {inquiries.slice(0, 4).map((inquiry) => (
                          <div
                            key={inquiry.id}
                            className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-sm text-slate-900 dark:text-white">
                                {inquiry.name}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-800/60">
                                {inquiry.projectType}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                              "{inquiry.message}"
                            </p>
                            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-400">
                              <span>{inquiry.date}</span>
                              <a
                                href={`mailto:${inquiry.email}`}
                                className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                              >
                                Reply &rarr;
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: FULL INBOX */}
              {activeTab === 'inbox' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white">
                        Client Messages & Leads
                      </h4>
                      <p className="text-xs text-slate-500">
                        Manage all prospective freelance project inquiries.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleExportCSV}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export CSV</span>
                      </button>
                      <button
                        onClick={handleAddDemoLead}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Demo</span>
                      </button>
                    </div>
                  </div>

                  {/* Search and Filters */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search leads by client name, email, or message..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="all">All Project Types</option>
                      <option value="Personal Portfolio Website">Personal Portfolio</option>
                      <option value="Business Website">Business Website</option>
                      <option value="Landing Page">Landing Page</option>
                      <option value="AI / Web Integration">AI Integration</option>
                    </select>
                  </div>

                  {/* Inquiries List */}
                  {filteredInquiries.length === 0 ? (
                    <div className="py-16 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                      <Inbox className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                      <p className="text-base font-bold text-slate-700 dark:text-slate-300">
                        No matching inquiries found
                      </p>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                        Try adjusting your search query or add a demo lead.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredInquiries.map((inquiry) => (
                        <div
                          key={inquiry.id}
                          className="p-5 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-4 transition-all hover:border-indigo-500/50"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2.5">
                                <h5 className="font-extrabold text-base text-slate-900 dark:text-white">
                                  {inquiry.name}
                                </h5>
                                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60">
                                  {inquiry.projectType}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                                <span className="flex items-center gap-1 font-medium">
                                  <Mail className="w-3.5 h-3.5 text-indigo-500" />
                                  {inquiry.email}
                                </span>
                                <span>&bull;</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  {inquiry.date}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => handleDeleteInquiry(inquiry.id)}
                              className="self-end sm:self-center p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                              title="Delete inquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80">
                            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                              {inquiry.message}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 pt-1">
                            <a
                              href={`mailto:${inquiry.email}?subject=Re: Your ${inquiry.projectType} inquiry&body=Hi ${inquiry.name},%0D%0A%0D%0AI received your inquiry regarding a ${inquiry.projectType}. I would love to discuss the project details with you!`}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>Reply to Client via Email</span>
                            </a>
                            <a
                              href={`https://wa.me/?text=${encodeURIComponent(
                                `Hi ${inquiry.name}! Vansh Jaat here. I reviewed your inquiry for ${inquiry.projectType}.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp Lead</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: PROJECTS OVERVIEW */}
              {activeTab === 'projects' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white">
                        Portfolio Projects Management
                      </h4>
                      <p className="text-xs text-slate-500">
                        View active showcased projects wired to <code className="text-indigo-500 font-semibold">src/data/projects.js</code>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                            {proj.category}
                          </span>
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                            {proj.badge}
                          </span>
                        </div>
                        <h5 className="text-lg font-bold text-slate-900 dark:text-white">
                          {proj.title}
                        </h5>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {proj.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.technologies.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="pt-2 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                          <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                            GitHub Repository &rarr;
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-5 rounded-3xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50 text-xs text-indigo-950 dark:text-indigo-200">
                    <strong className="block font-bold mb-1">💡 How to add a new project:</strong>
                    Simply open <code className="font-mono bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded text-indigo-600 dark:text-indigo-400 font-bold">src/data/projects.js</code>, copy an existing project block, and paste your new project details!
                  </div>
                </div>
              )}

              {/* TAB 4: CONTACT & LIVE SETTINGS */}
              {activeTab === 'settings' && (
                <div className="space-y-6 animate-in fade-in duration-200 max-w-2xl">
                  <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
                    <h4 className="text-xl font-black text-slate-900 dark:text-white">
                      Live Contact Settings
                    </h4>
                    <p className="text-xs text-slate-500">
                      Configure your official email, WhatsApp, phone number, and social profiles.
                    </p>
                  </div>

                  {saveSuccess && (
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>Settings saved successfully in your browser!</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveSettings} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        value={editableProfile.email}
                        onChange={(e) => setEditableProfile({ ...editableProfile, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Primary WhatsApp Number
                      </label>
                      <input
                        type="text"
                        value={editableProfile.whatsapp}
                        onChange={(e) => setEditableProfile({ ...editableProfile, whatsapp: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Alternate Calling Number
                      </label>
                      <input
                        type="text"
                        value={editableProfile.alternatePhone}
                        onChange={(e) => setEditableProfile({ ...editableProfile, alternatePhone: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        GitHub Profile URL
                      </label>
                      <input
                        type="text"
                        value={editableProfile.github}
                        onChange={(e) => setEditableProfile({ ...editableProfile, github: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-md shadow-indigo-600/30 text-sm transition-all"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Live Settings</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
};
