# ⚡ BizGen — Next-Gen AI Website Builder for Small Businesses

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/FastAPI-0.110-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Firebase_Auth-Orange?style=for-the-badge&logo=firebase&logoColor=white" alt="Firebase" />
  <img src="https://img.shields.io/badge/SQLite-blue?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
</p>

---

## 🌟 Overview

**BizGen** is a premium, state-of-the-art SaaS platform that empowers small business owners to generate, customize, and publish stunning, modern websites in seconds using artificial intelligence. By combining high-performance frontend visual controls with real-time AI generation agents, BizGen makes professional web design accessible to local businesses (salons, cafes, consulting firms, gyms, and more).

With a side-by-side **Visual Site Builder**, **AI-enhanced section regeneration**, and an **embedded autonomous AI Chatbot Widget** trained specifically on the generated business content, BizGen handles the heavy lifting of copy, layout, branding, and deployment.

---

## ✨ Key Features

### 🎨 1. AI Generation Studio Wizard
* **Context-Aware Entrances:** Business owners specify their business name, category (Salon, Restaurant, Fitness, etc.), descriptions, language, and design styles ("Minimalist", "Bold & Modern", "Corporate", "Playful & Vibrant").
* **AI Enhancer:** Dynamic "AI Enhance" text area utilities powered by OpenRouter LLM context styling.
* **WebSocket Stepper Checklist:** Live step-by-step progress tracking (`branding`, `structure`, `content`, `seo`, `theme`) with active terminal telemetry logs streaming from the FastAPI backend.

### 🛠️ 2. Visual Drag-and-Drop Builder
* **Side-by-Side Workspace:** Left configuration panel with collapsible panels for layout tuning and a right-hand high-fidelity responsive preview simulator.
* **Real-time Live Preview:** Instant HSL theme adjustments, font pairing cards, and custom content modification bound in real-time inside a sandboxed viewport (Desktop, Tablet, Mobile options).
* **AI Section Regenerator:** An inline command utility inside every block section allowing users to instruct the AI to restructure, rephrase, or redesign a single block section without breaking the page.
* **Section Manager:** Full modular control to drag-reorder, hide/unhide, or delete structural landing blocks.

### 💬 3. Trainable Floating AI Assistant Chatbot
* **Embedded Widget:** A glowing floating orb chat bubble that injects onto generated sites.
* **Autonomous Sales Agent:** The chatbot is trained directly on the website's brand kit, services, prices, and contact details to interact with leads and answer visitor inquiries.
* **Rich Interactions:** Animated three-dot typing indicator wave loaders and modern Radix UI bubbles.

### 📊 4. Metrics Dashboard
* **Glassmorphism Stat Cards:** Dynamic trackers showing *Live Websites*, *Monthly Visitors* (with green sparklines), *AI Credits* remaining, and *Lead Forms* captured.
* **Recent Projects Suite:** Comprehensive project cards mapping business records, publish states (Published/Draft badge indicators), quick action dropdowns (view live site, trigger Vercel deployment, edit, delete).

---

## 🧭 System Architecture & Data Flow

BizGen employs a dual-service architecture. Next.js handles static delivery, interactive editing, and state syncing, while FastAPI acts as the database mediator, AI coordinator, and real-time WebSocket broad-caster.

```mermaid
graph TD
    classDef client fill:#8B5CF6,stroke:#7C3AED,stroke-width:2px,color:#fff;
    classDef server fill:#10B981,stroke:#059669,stroke-width:2px,color:#fff;
    classDef ext fill:#F59E0B,stroke:#D97706,stroke-width:2px,color:#fff;

    subgraph Client ["Client Side (Next.js 16 App Router)"]
        A["Dashboard & AI Studio"]:::client
        B["Visual Builder & Editor"]:::client
        C["Floating AI Chatbot"]:::client
        D["Firebase Auth Web SDK"]:::client
    end

    subgraph Backend ["Backend Services (FastAPI Port 8001)"]
        E["Auth & Middleware"]:::server
        F["AI Orchestration Engine"]:::server
        G["WebSocket Manager"]:::server
        H["SQLite Database (SQLAlchemy)"]:::server
    end

    subgraph External ["External Integrations"]
        I["Firebase Authentication"]:::ext
        J["OpenRouter (LLMs)"]:::ext
        K["Supervity Automation Workflow"]:::ext
        L["Vercel / Netlify (Deployments)"]:::ext
    end

    A -->|1. Get ID Token| D
    D -->|2. Verify Token| I
    A -->|3. POST /auth/verify| E
    E -->|4. Store User / Credits| H
    
    A -->|5. POST /ai/generate-site| F
    F -->|6. Call LLM for generation| J
    F -->|7. Stream steps| G
    G -->|8. Real-time checklist| A
    
    B -->|9. PUT /sites/{id} (Save Draft)| H
    B -->|10. POST /sites/{id}/publish| L
    
    C -->|11. POST /chatbot/message| F
    F -->|12. Custom Prompt Context| J
    
    A -->|13. Workflow trigger| K
```

---

## 📁 Workspace Project Structure

The project is managed as a monorepo workspace divided into three main modules:

```bash
bizgen/
├── frontend/                     # Client application (Next.js)
│   ├── app/                      # App router route entrypoints (AI Studio, Builder, Dashboard)
│   │   └── api/                  # Serverless APIs & Supervity web automation bridges
│   ├── components/               # Domain-specific UI primitives
│   │   ├── builder/              # Sidebar panels, visual iframe preview, custom chatbot widgets
│   │   ├── dashboard/            # Metrics cards, project grids, studio wizard controls
│   │   └── ui/                   # Shared UI primitives (Radix, Framer Motion springs)
│   ├── hooks/                    # Custom React hooks (WS handlers, viewport states)
│   ├── lib/                      # Zustand store, Firebase client, and Axios API Client wrapper
│   └── styles/                   # Global Tailwind v4 layout styling
├── backend/                      # Service API application (FastAPI)
│   ├── app/
│   │   ├── api/v1/               # Core routing endpoints (AI generation, auth, deployments, chatbot)
│   │   ├── services/             # Core business logical handlers (AI generators, site deployers)
│   │   ├── models/               # SQLAlchemy SQL database models
│   │   ├── schemas/              # Pydantic validation contracts
│   │   ├── ai/                   # OpenRouter clients, custom prompt templates
│   │   └── db/                   # DB configurations, seeds, and initializations
│   └── alembic/                  # Database migration schemas
└── docs/                         # Blueprints, requirements, and project plans
```

---

## 🛠️ Environment Configuration & Local Setup

### 1. Prerequisites
* **Node.js**: v18.x or later
* **Python**: v3.10.x or later
* **SQLite / PostgreSQL**: Preloaded SQLite file (dev defaults)

---

### 2. Frontend Configuration
Navigate to the `frontend/` directory, duplicate the environment blueprint, and specify your values:

```bash
cd frontend
cp .env.example .env.local
```

Inside **`frontend/.env.local`**:
```env
# Firebase Authentication Web Credentials
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=bizgen-auth.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=bizgen-auth
NEXT_PUBLIC_FIREBASE_APP_ID=1:768315632040...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-K4NE...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=bizgen-auth.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=768315...

# Target APIs Configuration
NEXT_PUBLIC_API_URL=http://localhost:8001/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:8001/ws

# Supervity Workflow automation
SUPERVITY_API_TOKEN=eyJhbGciOiJSUz...
SUPERVITY_WORKFLOW_ID=019e3856-2c75-7000-8be7-9a26150d6eda
SUPERVITY_SOURCE=v1
```

---

### 3. Backend Configuration
Navigate to the `backend/` directory, duplicate the environment blueprint, and specify your values:

```bash
cd ../backend
cp .env.example .env
```
```

---

## 🚀 Running the Platform

You can boot individual modules independently or leverage the monorepo root settings.

### Standard Dev Launch:

1. **Frontend Boot:**
   ```bash
   # From root or frontend directory
   npm install
   npm run dev
   ```
   *The frontend starts at `http://localhost:3001` (it will auto-bind to the next port if 3001 is already taken).*

2. **Backend Virtual Environment & Launch:**
   ```bash
   cd backend
   # Establish standard virtual environment
   python -m venv venv
   .\venv\Scripts\activate   # Windows
   source venv/bin/activate  # MacOS/Linux
   
   # Install dependencies & run uvicorn server
   pip install -r requirements.txt
   python -m uvicorn main:app --host 127.0.0.1 --port 8001 --reload
   ```
   *The FastAPI backend starts at `http://127.0.0.1:8001` with Swagger docs available at `/docs`.*

---

## ⚡ API Payload and Protocol Reference

### Real-time WebSockets Generation Stepper
To connect to the AI generation progress visualizer:
* **Protocol:** `WS`
* **Target Endpoint:** `ws://localhost:8001/ws/{client_id}` (where `client_id` is a UUID generated on mount).
* **Payload Stream Format:**
  ```json
  {
    "type": "ai_progress",
    "step": "branding",
    "progress": 25,
    "status": "active"
  }
  ```
  *(Steps transition sequentially: `branding` ➔ `structure` ➔ `content` ➔ `seo` ➔ `theme` ➔ `complete`)*

### Lead Inquiries / Chatbot Query
To query the AI Sales Chatbot:
* **Method:** `POST`
* **Target Endpoint:** `/api/v1/chatbot/message`
* **Payload Body:**
  ```json
  {
    "website_id": "848ad871-331b-419b-ab92-9477bcf4d1a5",
    "message": "Hi, do you offer weekend pricing?",
    "session_id": "b18b87ce-3b1a-4d7a"
  }
  ```

---

## 🤖 Supervity Automation Workflow
BizGen links into **Supervity Automation Engine** via a dedicated endpoint located at `/api/supervity/workflow/route.ts`. The workflow is designed to execute heavy processing (e.g. advanced AI templates or analytics processing) asynchronously:
* It reads variables: `SUPERVITY_API_TOKEN`, `SUPERVITY_WORKFLOW_ID`, and `SUPERVITY_SOURCE` from env.
* Seamlessly binds telemetry into front-end action steps to maintain real-time status reporting back to the user interface.

---

## 🎨 Visual System & Premium Aesthetic Tokens

BizGen components are crafted using premium UI paradigms:
* **Glassmorphism**: Leverages semi-transparent cards with fine frosted borders, subtle backdrop filters, and radial lights (`bg-background/80 backdrop-blur-md border-border/50`).
* **Harmony Theme**: Uses custom TailWind CSS v4 color tokens centered around elegant dark HSL slate backgrounds paired with deep indigo and violet brand gradients.
* **Micro-Animations**: Renders elements using Framer Motion springs (`type: "spring", stiffness: 300, damping: 30`) to deliver satisfying haptic transitions when switching builders, clicking sliders, or collapsing menus.

---

<p align="center">Made with ❤️ for SaaS Web Creators.</p>
