<div align="center">

# 🩺 MediCore

### *Demystifying Healthcare — Medical Jargon Made Simple*

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI-4285F4?style=for-the-badge&logo=google)](https://aistudio.google.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

<p align="center">
  <b>MediCore</b> transforms complex clinical terminology, lab results, and prescriptions into clear, plain-language insights with intelligent triage and 24/7 AI health guidance.
</p>

[Explore Features](#-key-features) • [Quick Start](#-quick-start) • [Environment Setup](#-environment-variables) • [Vercel Deployment](#-deployment-to-vercel)

</div>

---

## 🌟 Key Features

### 1. 📖 Medical Jargon Translator
* Translates confusing doctor notes, anatomical terms, and clinical abbreviations into plain, easy-to-digest language.
* Provides real-world analogies and explanations so patients and caregivers can understand their health conditions with confidence.

### 2. 🧪 Smart Medical Report Analyzer
* Upload lab reports and diagnostics in **PDF or image formats**.
* Automatically extracts and visualizes key biomarkers (e.g., Blood Sugar, Lipid Profiles, CBC).
* Categorizes metrics as **Normal**, **High**, or **Low** with concise explanations and actionable lifestyle takeaways.
* Generates downloadable, patient-friendly **PDF analysis summaries**.

### 3. 🩺 Interactive Symptom Checker
* Comprehensive clinical triage assessment based on age, primary symptoms, duration, and severity.
* Categorizes care levels into **Self-Care**, **Pharmacy Consultation**, or **Doctor Visit** with clear warning signs and when to seek urgent emergency care.

### 4. 🤖 MediBot — 24/7 AI Health Assistant
* Floating, cube-styled medical doctor assistant available on every page.
* Powered by **Google Gemini API** (with optional local **Ollama** fallback).
* Features quick prompt shortcuts, conversation history, and responsive mobile-friendly chat.

### 5. 🌐 Multilingual Accessibility
* Bridges communication gaps with support for English, Hindi, Spanish, French, German, and more.

### 6. 🔒 Privacy-First Architecture
* Designed with patient privacy in mind: zero permanent storage of uploaded medical records or personal health conversations.

---

## 🛠️ Tech Stack

* **Frontend & Framework**: [Next.js 14](https://nextjs.org/) (App Router), React 18, TypeScript
* **Styling & UI**: [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/) Icons, [Sonner](https://sonner.emilkowal.ski/) Toasts
* **AI & Machine Learning**: [Google Gemini Flash](https://aistudio.google.com/) (`gemini-1.5-flash` / `gemini-2.0-flash`), optional local [Ollama](https://ollama.com/)
* **Document Processing**: `pdf-parse`, `jspdf`, `html2canvas`
* **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Quick Start

### Prerequisites

* [Node.js](https://nodejs.org/) (version 18.17 or higher)
* `npm`, `pnpm`, or `yarn`
* A free [Google Gemini API Key](https://aistudio.google.com/apikey)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/UzmahShaikh1506/MediCore.git
   cd MediCore
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the example environment file and add your Google Gemini API key:
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and paste your key:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Environment Variables

| Variable | Description | Required? |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Google AI Studio Gemini API key for chatbot, translator & analysis | **Yes** (Free) |
| `OLLAMA_URL` | Local Ollama base URL (e.g. `http://localhost:11434`) | *Optional* |
| `OLLAMA_MODEL` | Local Ollama model name (e.g. `llama3.2`) | *Optional* |

---

## 🚢 Deployment to Vercel

MediCore is optimized for zero-config deployment on Vercel:

1. **Push your code** to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new) and click **Import Project**.
3. Under **Environment Variables**, add:
   * **Key:** `GEMINI_API_KEY`
   * **Value:** `your_gemini_api_key`
4. Click **Deploy**. Your application will be live in under 2 minutes!

---

## 📁 Project Structure

```text
MediCore/
├── app/
│   ├── about/              # About us & mission page
│   ├── contact/            # Contact form & headquarters info
│   ├── report-analyzer/    # Lab report upload & PDF summary generator
│   ├── symptom-checker/    # Interactive triage assessment
│   ├── translator/         # Medical jargon simplifier
│   ├── api/                # Next.js route handlers (AI, OCR, chat)
│   ├── globals.css         # Global healthcare theme styles
│   └── page.tsx            # Landing page
├── components/
│   ├── cute-doctor-icon.tsx # Vector doctor avatar
│   ├── floating-chatbot.tsx # MediBot floating widget
│   ├── navigation.tsx      # Responsive header navbar
│   └── ui/                 # Reusable UI component library (shadcn/ui)
├── lib/
│   ├── services/           # Gemini & OCR integration logic
│   └── types/              # TypeScript schemas and definitions
└── public/                 # Static media assets & icons
```

---

## 👩‍💻 Author & Team

* **Uzmah Shaikh** — *Founder & Lead Developer*
  * GitHub: [@UzmahShaikh1506](https://github.com/UzmahShaikh1506)

---

## ⚠️ Medical Disclaimer

> **IMPORTANT:** MediCore is an educational and informational tool designed to assist patients in understanding medical concepts. **It is not a substitute for professional medical diagnosis, advice, or treatment.** Always seek the guidance of a qualified healthcare professional with any questions regarding medical conditions or treatments. In case of a medical emergency, call your local emergency services immediately.

---

<div align="center">
  <sub>Built with care for accessible healthcare for everyone.</sub>
</div>
