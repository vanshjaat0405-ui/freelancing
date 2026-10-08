import React, { useState } from 'react';
import { Terminal, Code2, Sparkles, Check } from 'lucide-react';

export const HeroTerminal = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    profile: `// vansh.config.js
export const developer = {
  name: "Vansh Jaat",
  education: "BTech in AIML",
  role: "Freelance Web Developer",
  status: "AVAILABLE_FOR_PROJECTS",
  services: [
    "Portfolio Websites",
    "Business Websites",
    "Landing Pages",
    "Responsive Web Design"
  ],
  stack: ["React", "JavaScript", "Tailwind CSS", "Python"],
  delivers: "Clean, responsive & modern web apps"
};`,
    workflow: `// freelanceWorkflow.ts
async function buildClientProject(requirements) {
  const spec = await discussAndPlan(requirements);
  const website = await developWithCare(spec, {
    responsive: true,
    performance: "95+ Lighthouse",
    accessibility: "WCAG Compliant"
  });
  
  return deployToVercel(website);
  // Status: 100% Client Satisfaction Guaranteed
}`
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl bg-slate-900/95 dark:bg-slate-900/95 text-slate-200 border border-slate-800 shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-indigo-500/40">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            vansh-dev-workspace
          </span>
        </div>
        
        {/* Copy snippet button */}
        <button
          onClick={handleCopyCode}
          className="text-xs text-slate-400 hover:text-indigo-300 flex items-center gap-1 px-2 py-1 rounded bg-slate-800/60 hover:bg-slate-800 transition-colors"
          title="Copy snippet"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Code2 className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-slate-800/80 bg-slate-950/40 px-2 text-xs font-mono">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-1.5 px-3 py-2 border-b-2 transition-colors ${
            activeTab === 'profile'
              ? 'border-indigo-500 text-indigo-300 bg-slate-900/40'
              : 'border-transparent text-slate-400 hover:text-slate-300'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          vansh.config.js
        </button>
        <button
          onClick={() => setActiveTab('workflow')}
          className={`flex items-center gap-1.5 px-3 py-2 border-b-2 transition-colors ${
            activeTab === 'workflow'
              ? 'border-indigo-500 text-indigo-300 bg-slate-900/40'
              : 'border-transparent text-slate-400 hover:text-slate-300'
          }`}
        >
          <Code2 className="w-3.5 h-3.5 text-emerald-400" />
          workflow.ts
        </button>
      </div>

      {/* Code Display */}
      <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
        <pre className="text-slate-300">
          <code>
            {activeTab === 'profile' ? (
              <>
                <span className="text-slate-500">// vansh.config.js</span>
                <br />
                <span className="text-indigo-400">export const</span>{' '}
                <span className="text-amber-300">developer</span> = &#123;
                <br />
                &nbsp;&nbsp;<span className="text-slate-400">name:</span>{' '}
                <span className="text-emerald-300">"Vansh Jaat"</span>,
                <br />
                &nbsp;&nbsp;<span className="text-slate-400">education:</span>{' '}
                <span className="text-emerald-300">"BTech AIML Student"</span>,
                <br />
                &nbsp;&nbsp;<span className="text-slate-400">focus:</span>{' '}
                <span className="text-emerald-300">"Freelance Web Developer"</span>,
                <br />
                &nbsp;&nbsp;<span className="text-slate-400">status:</span>{' '}
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-emerald-950 text-emerald-300 border border-emerald-800/80 font-bold">
                  "AVAILABLE_FOR_PROJECTS"
                </span>
                ,
                <br />
                &nbsp;&nbsp;<span className="text-slate-400">services:</span> [
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-indigo-300">"Portfolio Websites"</span>,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-indigo-300">"Business Websites"</span>,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-indigo-300">"Landing Pages"</span>,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-indigo-300">"Responsive Web Design"</span>
                <br />
                &nbsp;&nbsp;],
                <br />
                &nbsp;&nbsp;<span className="text-slate-400">stack:</span> [
                <span className="text-cyan-300">"React"</span>,{' '}
                <span className="text-cyan-300">"Tailwind"</span>,{' '}
                <span className="text-cyan-300">"JS"</span>,{' '}
                <span className="text-cyan-300">"Python"</span>],
                <br />
                &nbsp;&nbsp;<span className="text-slate-400">mission:</span>{' '}
                <span className="text-emerald-300">"Build clean, client-winning web apps"</span>
                <br />
                &#125;;
              </>
            ) : (
              <>
                <span className="text-slate-500">// workflow.ts</span>
                <br />
                <span className="text-indigo-400">async function</span>{' '}
                <span className="text-amber-300">deliverClientProject</span>(req) &#123;
                <br />
                &nbsp;&nbsp;<span className="text-indigo-400">const</span> spec ={' '}
                <span className="text-cyan-400">await</span> understandRequirements(req);
                <br />
                &nbsp;&nbsp;<span className="text-indigo-400">const</span> site ={' '}
                <span className="text-cyan-400">await</span> buildCleanResponsiveSite(spec, &#123;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400">mobileOptimized:</span>{' '}
                <span className="text-rose-300">true</span>,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400">cleanUI:</span>{' '}
                <span className="text-rose-300">true</span>,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400">seoFriendly:</span>{' '}
                <span className="text-rose-300">true</span>
                <br />
                &nbsp;&nbsp;&#125;);
                <br />
                <br />
                &nbsp;&nbsp;<span className="text-indigo-400">return</span> deployLive(site);
                <br />
                &nbsp;&nbsp;<span className="text-slate-500">// Output: Reliable, Modern & On-Time</span>
                <br />
                &#125;
              </>
            )}
          </code>
        </pre>
      </div>

      {/* Terminal status bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-950/90 border-t border-slate-800 text-[11px] font-mono text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Ready for new projects
        </span>
        <span>UTF-8 • React 18</span>
      </div>
    </div>
  );
};
