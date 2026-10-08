import React from 'react';
import { ExternalLink, Github, FolderGit2, Sparkles, Layers } from 'lucide-react';
import { projects } from '../data/projects';

export const Projects = () => {
  return (
    <section id="projects" className="py-20 md:py-28 bg-slate-100/50 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Demonstrated Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Featured Projects
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            A selection of projects that demonstrate my development skills and frontend craftsmanship.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-500/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Banner Preview */}
                <div
                  className={`h-48 w-full bg-gradient-to-tr ${project.accent} relative flex items-center justify-center p-6 overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px]" />
                  
                  {/* Decorative Mockup Visual */}
                  <div className="relative z-10 w-full max-w-[280px] bg-white/10 dark:bg-slate-900/70 border border-white/20 dark:border-slate-700/60 rounded-xl p-3.5 shadow-xl backdrop-blur-md transform group-hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                      </div>
                      <span className="text-[10px] font-mono text-white/70">preview</span>
                    </div>
                    <div className="space-y-1.5 text-left">
                      <div className="h-2.5 bg-white/40 rounded w-3/4" />
                      <div className="h-2 bg-white/20 rounded w-1/2" />
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/70 text-white backdrop-blur-md border border-white/10">
                      {project.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-medium">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                <a
                  href={project.liveUrl}
                  target={project.liveUrl === '#' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    project.liveUrl === '#'
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20'
                  }`}
                  title={project.liveUrl === '#' ? 'Add your live demo link in src/data/projects.js' : 'View Live Demo'}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{project.liveUrl === '#' ? 'Demo URL' : 'Live Demo'}</span>
                </a>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-all hover:bg-slate-50 dark:hover:bg-slate-700"
                  aria-label="View source on GitHub"
                >
                  <Github className="w-4 h-4" />
                  <span>Code</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Note on how to add projects */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            💡 Easy to update: Add your new projects and GitHub repositories directly in{' '}
            <code className="text-indigo-600 dark:text-indigo-400 font-semibold">src/data/projects.js</code>
          </p>
        </div>
      </div>
    </section>
  );
};
