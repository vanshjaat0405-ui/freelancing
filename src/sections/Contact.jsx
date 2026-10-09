import React, { useState } from 'react';
import {
  Mail,
  Copy,
  Check,
  Send,
  Calendar,
  Github,
  Linkedin,
  MessageCircle,
  Phone,
  Sparkles,
  AlertCircle,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { profile } from '../data/profile';

export const Contact = ({ onCopyEmail, selectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: selectedService || 'Personal Portfolio Website',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'success' | 'error' | 'setup_needed'
  const [errorMessage, setErrorMessage] = useState('');
  const [emailCopied, setEmailCopied] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState(null);

  // Sync if parent updates selectedService
  React.useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, projectType: selectedService }));
    }
  }, [selectedService]);

  const validate = () => {
    const errs = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMsg = formData.message.trim();

    if (!trimmedName) {
      errs.name = 'Please provide your name.';
    } else if (trimmedName.length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    if (!trimmedEmail) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!trimmedMsg) {
      errs.message = 'Please provide brief details about your project.';
    } else if (trimmedMsg.length < 10) {
      errs.message = 'Message must be at least 10 characters so I can understand your requirements.';
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setErrorMessage('');

    const newInquiry = {
      id: Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      projectType: formData.projectType,
      message: formData.message.trim(),
      date: new Date().toLocaleString(),
    };

    // 1. Always record in Admin Portal localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('portfolio_inquiries') || '[]');
      localStorage.setItem('portfolio_inquiries', JSON.stringify([newInquiry, ...existing]));
    } catch (err) {
      console.warn('Could not save inquiry to local storage', err);
    }

    setLastSubmitted(newInquiry);

    // 2. Transmit via Email Service (Web3Forms or Formspree)
    const serviceConfig = profile.emailService || {};
    const web3Key = (serviceConfig.web3FormsAccessKey || import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '').trim();
    const formspreeId = (serviceConfig.formspreeId || import.meta.env.VITE_FORMSPREE_ID || '').trim();

    try {
      if (web3Key) {
        // Submit to Web3Forms
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3Key,
            name: newInquiry.name,
            email: newInquiry.email,
            subject: `New Project Inquiry: ${newInquiry.projectType} from ${newInquiry.name}`,
            project_type: newInquiry.projectType,
            message: newInquiry.message,
            from_name: newInquiry.name,
            replyto: newInquiry.email,
          }),
        });

        const data = await response.json();
        if (data.success) {
          setSubmitStatus('success');
        } else {
          throw new Error(data.message || 'Web3Forms submission failed');
        }
      } else if (formspreeId) {
        // Submit to Formspree
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: newInquiry.name,
            email: newInquiry.email,
            projectType: newInquiry.projectType,
            message: newInquiry.message,
          }),
        });

        if (response.ok) {
          setSubmitStatus('success');
        } else {
          const data = await response.json().catch(() => ({}));
          throw new Error(data?.errors?.[0]?.message || 'Formspree submission failed');
        }
      } else {
        // No external API key configured yet
        setSubmitStatus('setup_needed');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setErrorMessage(err.message || 'Could not send message automatically.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmailLocal = () => {
    navigator.clipboard.writeText(profile.email);
    setEmailCopied(true);
    if (onCopyEmail) onCopyEmail();
    setTimeout(() => setEmailCopied(false), 2500);
  };

  const handleMailtoDirect = () => {
    const name = lastSubmitted?.name || formData.name;
    const email = lastSubmitted?.email || formData.email;
    const project = lastSubmitted?.projectType || formData.projectType;
    const msg = lastSubmitted?.message || formData.message;

    const subject = encodeURIComponent(`Project Inquiry: ${project} from ${name}`);
    const body = encodeURIComponent(
      `Hi Vansh,\n\nName: ${name}\nEmail: ${email}\nProject Type: ${project}\n\nMessage:\n${msg}\n`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      projectType: 'Personal Portfolio Website',
      message: '',
    });
    setErrors({});
    setSubmitStatus('idle');
    setErrorMessage('');
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Outreach</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Have a Project in Mind?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Let's build something modern, responsive and professional together. Reach out via form, direct email, or WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info & Fast Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Contact Information
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Whether you need a custom portfolio, a startup landing page, or a full responsive business site, I'm ready to collaborate.
              </p>

              {/* Email with 1-Click Copy */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">
                      Direct Email
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white truncate block">
                      {profile.email}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmailLocal}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors flex-shrink-0"
                  title="Copy email to clipboard"
                >
                  {emailCopied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Fast WhatsApp Chat (Primary) */}
              <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium block">
                      Primary WhatsApp
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {profile.whatsapp}
                    </span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${profile.whatsapp.replace('+', '')}?text=${encodeURIComponent(
                    profile.whatsappMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-all flex items-center gap-1.5"
                >
                  <span>Chat Now</span>
                </a>
              </div>

              {/* Alternate Contact / Direct Phone Call */}
              {profile.alternatePhone && (
                <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-blue-500/20 text-blue-600 dark:text-blue-400 flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-blue-700 dark:text-blue-400 font-medium block">
                        Alternate / Direct Call
                      </span>
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {profile.alternatePhone}
                      </span>
                    </div>
                  </div>

                  <a
                    href={`tel:${profile.alternatePhone}`}
                    className="px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Call Now</span>
                  </a>
                </div>
              )}

              {/* Discovery Call Option */}
              <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/40 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-indigo-700 dark:text-indigo-400 font-medium block">
                      Prefer Video Call?
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      15-Min Project Call
                    </span>
                  </div>
                </div>

                <a
                  href={profile.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all flex items-center gap-1.5"
                >
                  <span>Schedule</span>
                </a>
              </div>

              {/* Social Channels */}
              <div className="pt-2">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-3">
                  Professional Profiles:
                </span>
                <div className="flex gap-3">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 hover:border-indigo-500 text-xs font-semibold transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 hover:border-indigo-500 text-xs font-semibold transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative">
              {/* SUCCESS STATE */}
              {submitStatus === 'success' ? (
                <div className="py-10 text-center space-y-5 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Inquiry Sent Successfully!
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
                      Thank you, <strong>{lastSubmitted?.name}</strong>! Your inquiry regarding{' '}
                      <strong>{lastSubmitted?.projectType}</strong> has been delivered directly to Vansh's inbox (
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">{profile.email}</span>).
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      I typically review client requirements and respond within 24 hours.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <button
                      onClick={handleResetForm}
                      className="px-6 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/30 transition-all text-sm w-full sm:w-auto"
                    >
                      Send Another Message
                    </button>
                    <a
                      href={`https://wa.me/${profile.whatsapp.replace('+', '')}?text=${encodeURIComponent(
                        `Hi Vansh! I just sent you a project inquiry through your website form for ${lastSubmitted?.projectType}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-xl font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors text-sm flex items-center justify-center gap-1.5 w-full sm:w-auto"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-500" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : submitStatus === 'setup_needed' ? (
                /* SETUP NEEDED STATE (Graceful onboarding fallback) */
                <div className="py-8 text-center space-y-5 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto border border-indigo-200 dark:border-indigo-800">
                    <Check className="w-7 h-7" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Inquiry Captured & Prepared!
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
                      Your inquiry from <strong>{lastSubmitted?.name}</strong> for{' '}
                      <strong>{lastSubmitted?.projectType}</strong> is saved. To enable instant 1-click transmission to your inbox:
                    </p>
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-left text-xs text-slate-700 dark:text-slate-300 space-y-1">
                      <p className="font-semibold text-indigo-600 dark:text-indigo-400">
                        ⚡ How to activate Web3Forms email delivery:
                      </p>
                      <p>1. Get a free access key at <a href="https://web3forms.com" target="_blank" rel="noreferrer" className="underline font-mono">web3forms.com</a>.</p>
                      <p>2. Paste your access key into <code className="font-mono bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">src/data/profile.js</code> or Vercel Env <code className="font-mono bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">VITE_WEB3FORMS_ACCESS_KEY</code>.</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    In the meantime, dispatch your inquiry directly using either option:
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      onClick={handleMailtoDirect}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/30 transition-all text-xs sm:text-sm w-full sm:w-auto"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send via Email Client</span>
                    </button>
                    <a
                      href={`https://wa.me/${profile.whatsapp.replace('+', '')}?text=${encodeURIComponent(
                        `Hi Vansh! Project Inquiry from ${lastSubmitted?.name} (${lastSubmitted?.email}) for ${lastSubmitted?.projectType}: "${lastSubmitted?.message}"`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors text-xs sm:text-sm w-full sm:w-auto"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-500" />
                      <span>Send via WhatsApp</span>
                    </a>
                  </div>

                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline pt-2"
                  >
                    Back to Edit Form
                  </button>
                </div>
              ) : (
                /* REGULAR CONTACT FORM */
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Error Banner */}
                  {submitStatus === 'error' && (
                    <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-700 dark:text-rose-400 space-y-2 animate-in fade-in">
                      <div className="flex items-center gap-2 font-semibold">
                        <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-500" />
                        <span>Could not deliver message automatically: {errorMessage}</span>
                      </div>
                      <p className="text-[11px] text-rose-600/90 dark:text-rose-400/90">
                        Don't worry, you can dispatch your message directly:
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <button
                          type="button"
                          onClick={handleMailtoDirect}
                          className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors"
                        >
                          Send via Mail Client
                        </button>
                        <a
                          href={`https://wa.me/${profile.whatsapp.replace('+', '')}?text=${encodeURIComponent(
                            `Hi Vansh! Inquiry from ${formData.name}: "${formData.message}"`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors inline-flex items-center gap-1"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp Directly</span>
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder="e.g. Rahul Sharma"
                        disabled={isSubmitting}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border ${
                          errors.name
                            ? 'border-rose-500 focus:ring-rose-500'
                            : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500'
                        } text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 transition-all disabled:opacity-60`}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="e.g. rahul@example.com"
                        disabled={isSubmitting}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border ${
                          errors.email
                            ? 'border-rose-500 focus:ring-rose-500'
                            : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500'
                        } text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 transition-all disabled:opacity-60`}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer disabled:opacity-60"
                    >
                      <option value="Personal Portfolio Website">Personal Portfolio Website</option>
                      <option value="Business Website">Business Website</option>
                      <option value="Landing Page">Landing Page</option>
                      <option value="Responsive Web Redesign">Responsive Web Redesign</option>
                      <option value="AI / Web Integration">AI / Web Integration</option>
                      <option value="Custom Consultation / Other">Custom Consultation / Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Project Details / Message *
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      disabled={isSubmitting}
                      placeholder="Tell me about your project goals, timeline, and any specific preferences..."
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border ${
                        errors.message
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500'
                      } text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 transition-all resize-y disabled:opacity-60`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-lg shadow-indigo-600/30 transition-all text-base hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending Your Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Project Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                    Direct communication with Vansh Jaat. Guaranteed response within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
