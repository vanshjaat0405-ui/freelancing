export const profile = {
  name: "Vansh Jaat",
  role: "Freelance Web Developer",
  subRole: "BTech Artificial Intelligence & Machine Learning Student",
  status: "Available for Freelance Projects",
  tagline: "I Build Modern & Responsive Websites",
  description:
    "I create modern, responsive and user-friendly websites for students, individuals, startups and small businesses.",
  aboutStory:
    "I'm Vansh Jaat, a BTech student specializing in Artificial Intelligence and Machine Learning. I am passionate about crafting high-performance, responsive web interfaces and exploring AI integrations. I build clean, modern websites that help individuals and businesses build their digital presence, continuously refining my technical craftsmanship through hands-on development and client work.",
  
  email: "vansh.webbuilds@gmail.com",
  whatsapp: "+918725096398",
  alternatePhone: "+916398887830",
  whatsappMessage: "Hi Vansh! I checked out your portfolio and would like to discuss a web project.",
  github: "https://github.com/vanshjaat0405-ui",
  linkedin: "https://linkedin.com/in/vanshjaat", // Replace with your LinkedIn profile link
  calendly: "https://calendly.com", // Replace with your Calendly / Cal.com booking link if available

  // Email Delivery Configuration (Web3Forms / Formspree)
  // For Web3Forms: Obtain a free access key at https://web3forms.com
  // For Formspree: Obtain your Form ID at https://formspree.io
  // Can be configured here or in Vercel Environment Variables:
  emailService: {
    provider: 'web3forms', // 'web3forms' | 'formspree'
    web3FormsAccessKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '',
    formspreeId: import.meta.env.VITE_FORMSPREE_ID || '',
  },

  // Freelance Profiles (Optional links to share)
  fiverr: "https://www.fiverr.com",
  upwork: "https://www.upwork.com",

  // Core Highlights (for About section cards)
  highlights: [
    {
      title: "BTech AIML",
      subtitle: "Academic Core",
      desc: "Strong foundations in algorithms, AI principles, and problem solving.",
      icon: "GraduationCap"
    },
    {
      title: "Web Development",
      subtitle: "Modern Frontend",
      desc: "Building clean, responsive, fast-loading user interfaces.",
      icon: "Code2"
    },
    {
      title: "AI & Machine Learning",
      subtitle: "Applied Intelligence",
      desc: "Exploring intelligent API integrations and practical AI tools.",
      icon: "Cpu"
    },
    {
      title: "Freelance Development",
      subtitle: "Client-Centric",
      desc: "Delivering customized websites tailored to client goals.",
      icon: "Briefcase"
    }
  ]
};
