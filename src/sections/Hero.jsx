import React from 'react';
import { ArrowRight, Eye, Github, Linkedin, Mail, Sparkles, MessageCircle } from 'lucide-react';
import { profile } from '../data/profile';
import { HeroTerminal } from '../components/HeroTerminal';
import { AvailabilityBadge } from '../components/AvailabilityBadge';

export const Hero = ({ onCopyEmail }) => {
  return (
    <section id="home" className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-violet-500/10 dark:bg-violet-500/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Availability Pill */}
            <div className="flex justify-center lg:justify-start">
              <AvailabilityBadge />
            </div>

            {/* Intro and Headings */}
            <div className="space-y-3">
              <p className="text-sm sm:text-base font-semibold tracking-wide uppercase text-indigo-600 dark:text-indigo-400">
                Hi, I'm {profile.name}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                {profile.tagline}
              </h1>
              <p className="inline-block text-base sm:text-lg font-medium text-slate-600 dark:text-slate-300">
                {profile.role} <span className="text-indigo-500">&bull;</span> {profile.subRole}
              </p>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {profile.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Eye className="w-5 h-5" />
                <span>View My Work</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-indigo-500 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Hire Me</span>
                <ArrowRight className="w-5 h-5 text-indigo-500" />
              </a>

              {/* WhatsApp Quick Chat */}
              <a
                href={`https://wa.me/${profile.whatsapp.replace('+', '')}?text=${encodeURIComponent(
                  profile.whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all"
                title="Chat directly on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span>Quick WhatsApp</span>
              </a>
            </div>

            {/* Social Proof & Quick Links */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                Connect Directly:
              </span>
              <div className="flex items-center gap-4">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <button
                  onClick={onCopyEmail}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded bg-slate-100 dark:bg-slate-800"
                  title="Copy email to clipboard"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Copy Email</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Terminal Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroTerminal />
          </div>
        </div>
      </div>
    </section>
  );
};
