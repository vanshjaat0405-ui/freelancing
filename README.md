# Vansh Jaat — Freelance Web Developer Portfolio

A premium, modern, and fully responsive personal freelancing portfolio website built for **Vansh Jaat** (BTech AIML & Freelance Web Developer).

---

## 🚀 Quick Start (Local Development)

In your terminal or PowerShell inside this folder:

```bash
# 1. Install dependencies (if not already done)
npm install

# 2. Start the local development server
npm run dev
```

Open your browser at `http://localhost:5173`.

To create an optimized production build:
```bash
npm run build
```

---

## 🛠️ How to Customize Your Details (Zero Code Needed!)

All your personal details, links, and portfolio items are stored cleanly inside the `src/data/` folder so you never have to touch JSX layout code:

| File | What to customize |
| :--- | :--- |
| `src/data/profile.js` | Your name, tagline, email, WhatsApp number, GitHub link, LinkedIn link, and Calendly link. |
| `src/data/projects.js` | Add, edit, or remove projects. Update live demo URLs and GitHub repo links. |
| `src/data/services.js` | Modify your freelancing service packages, titles, and descriptions. |
| `src/data/skills.js` | Update your technical skills, programming languages, and tools. |
| `src/data/process.js` | Adjust your 4-step work process and "Why Work With Me" value cards. |

---

## ⚡ High-Conversion Features Included

1. **Dark & Light Mode Toggle:** Seamless developer aesthetic (Dark) and crisp agency aesthetic (Light), saved automatically in `localStorage`.
2. **1-Click "Copy Email" with Toast Notification:** Prevents issues where `mailto:` fails on Windows/Mac, providing instant visual feedback.
3. **Instant WhatsApp Quick Chat:** Dedicated direct WhatsApp chat buttons in the Hero and Contact sections.
4. **Interactive Hero Terminal:** Right-side developer IDE window with tab switching (`vansh.config.js` and `workflow.ts`).
5. **15-Min Discovery Call Link:** Cal.com / Calendly call booking trigger in the Contact section.
6. **Responsive Contact Form:** Validates name, email, project type, and message with instant fallback to email clients.

---

## 🌐 1-Click Free Deployment (Vercel / Netlify)

### Option A: Vercel (Recommended — 2 Minutes)
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Vansh Jaat freelancing portfolio"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in with GitHub.
3. Click **"Add New Project"** -> Select your repository.
4. Click **"Deploy"** (Vercel automatically detects Vite).
5. Done! Your site will be live at `https://vansh-jaat.vercel.app` with free SSL.

---

## 📬 Connecting Real Email Delivery to the Contact Form

Right now, the form validates inputs and prepares a one-click mail client sender. To receive emails directly in your inbox from web visitors without setting up a backend:
1. Go to [formspree.io](https://formspree.io) (Free: 50 emails/month).
2. Create a form and get your endpoint URL (e.g. `https://formspree.io/f/xv...`).
3. In `src/sections/Contact.jsx`, add the Formspree endpoint into the `fetch()` call.
