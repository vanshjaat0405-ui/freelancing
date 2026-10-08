import React from 'react';
import { GraduationCap, Code2, Cpu, Briefcase, CheckCircle, Sparkles, UserCheck } from 'lucide-react';
import { profile } from '../data/profile';

export const About = () => {
  const iconMap = {
    GraduationCap: GraduationCap,
    Code2: Code2,
    Cpu: Cpu,
    Briefcase: Briefcase,
  };

  return (
    <section id="about" className="py-20 md:py-28 bg-slate-100/50 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Profile & Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            About Me
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            A BTech AIML student engineering clean, accessible web interfaces and helping businesses establish a credible digital identity.
          </p>
        </div>

        {/* Narrative & Focus */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              Bridging Applied AI with Modern Web Development
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {profile.aboutStory}
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Rather than making unverified claims or copying templates, I focus on building real-world projects with clean code architectures, fast performance, and meticulous responsiveness across all screen sizes.
            </p>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700 dark:text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Honest & transparent pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Mobile-first responsive layouts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Clean, maintainable source code</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>On-time project delivery</span>
              </div>
            </div>
          </div>

          {/* Quick Focus Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900/90 to-slate-900 text-white p-8 rounded-2xl border border-indigo-700/40 shadow-xl space-y-6">
            <span className="text-xs font-mono tracking-widest uppercase text-indigo-300">
              Current Mission
            </span>
            <h4 className="text-2xl font-bold leading-snug">
              "Building high-impact websites that turn casual visitors into paying customers."
            </h4>
            <div className="space-y-4 pt-2 text-sm text-indigo-200">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-indigo-800/80 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  1
                </div>
                <div>
                  <strong className="text-white block">Focus on Client Objectives</strong>
                  Understanding the problem before writing any lines of code.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-indigo-800/80 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  2
                </div>
                <div>
                  <strong className="text-white block">Fast Delivery & Deployment</strong>
                  Deploying directly to production with zero downtime and fast loading.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Information Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {profile.highlights.map((item) => {
            const Icon = iconMap[item.icon] || Code2;
            return (
              <div
                key={item.title}
                className="bg-white dark:bg-slate-900/90 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-medium mb-1">
                  {item.subtitle}
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
