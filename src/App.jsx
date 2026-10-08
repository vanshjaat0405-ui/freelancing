import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { BackToTop } from './components/BackToTop';
import { AdminPortal } from './components/AdminPortal';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Services } from './sections/Services';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { WhyMe } from './sections/WhyMe';
import { Process } from './sections/Process';
import { Contact } from './sections/Contact';

function PortfolioApp() {
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Keyboard shortcut: Ctrl + Shift + A to open Admin Portal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerToast = (message = 'Email address copied to clipboard!') => {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 3000);
  };

  const handleSelectService = (serviceTitle) => {
    setSelectedService(serviceTitle);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero onCopyEmail={() => triggerToast('Email address copied to clipboard!')} />
        <About />
        <Services onSelectService={handleSelectService} />
        <Projects />
        <Skills />
        <WhyMe />
        <Process />
        <Contact
          selectedService={selectedService}
          onCopyEmail={() => triggerToast('Email address copied to clipboard!')}
        />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Utilities */}
      <BackToTop />
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />

      {/* Admin Portal Modal (vansh jaat / vansh jaat) */}
      <AdminPortal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
