# Duolingo Web Application Clone — SDE Fullstack Assignment

A pixel-perfect full-stack Duolingo clone replicating Duolingo's design, user experience, core lesson player, and gamification workflows.

![Duolingo Clone Banner](public/hero.svg)

## Overview & Architecture

This application recreates the playful, gamified experience of Duolingo:
- **Interactive Skill Tree / Path**: Sequential unit progress with lock/unlock states, completed checkmarks (`✓`), active crown nodes (`👑`) with `START` speech bubbles, and mascot flourishes.
- **Dynamic Language Switcher**: Switch between language courses (Spanish 🇪🇸, French 🇫🇷, German 🇩🇪, Italian 🇮🇹, Japanese 🇯🇵, Hindi 🇮🇳) directly from the top-right flag popover menu (`MY COURSES`).
- **Interactive Lesson Player**: sequence of exercises including SELECT, ASSIST (multiple choice), TYPE (typed answers), BLANK (word bank fill-in), and MATCH (pair matching).
- **Gamification Mechanics**: Real-time XP tracking, daily streak calculation, hearts reduction on wrong answers, heart refills via mocked gems, and celebratory confetti completion states.
- **Letters & Alphabet Learning Tab**: Interactive character cards with audio phonetic sounds for Devanagari 🇮🇳, Hiragana 🇯🇵, Spanish 🇪🇸, and French 🇫🇷.
- **Full Social & Profile Pages**: Replicated Leaderboard with 3-Shield graphics, Profile page with statistics grid & friends tabs, Search for Friends page (`/user-search`), Invite Friends modal, and Settings Preferences with toggle switches and MORE popover menu.

---

## Technical Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons, Radix UI, React Confetti, React Circular Progressbar.
- **Backend / Database**: Drizzle ORM, Neon PostgreSQL / SQLite Database with seeded course curriculum data & Server Actions.
- **State Management**: Zustand stores (`useLanguageStore`, `useProgressStore`, `useInviteModal`, `useGuidebookModal`, `useExitModal`, `useHeartsModal`, `usePracticeModal`).

---

## Deployment Instructions for Vercel (Combined Stack)

Deploying the application to Vercel is seamless as Next.js 14 handles both the frontend UI and the backend API / Server Actions in a single combined deployment.

### Option A: Vercel CLI (Recommended)

1. Install Vercel CLI globally:
   ```bash
   npm i -g vercel
   ```
2. Run deployment from the root directory:
   ```bash
   vercel
   ```
3. Follow the prompts (select Next.js framework, accept defaults).

### Option B: Vercel Dashboard (Git Import)

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Go to [Vercel Dashboard](https://vercel.com/new) and click **Import Project**.
3. Select your repository `Scaler-Duolingo-Clone`.
4. Configure Project Settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Environment Variables (Optional):
   - Add `DATABASE_URL` (Neon PostgreSQL URL if using cloud DB).
   - Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` & `CLERK_SECRET_KEY` (if Clerk Auth is configured).
6. Click **Deploy**. Vercel will build and deploy the entire full-stack application automatically.

---

## Setup & Running Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/vishnuvardhan1685/Scaler-Duolingo-Clone.git
   cd Scaler-Duolingo-Clone
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables (`.env.local`)**:
   ```env
   DATABASE_URL=postgresql://user:password@host/dbname
   ```

4. **Seed Database**:
   ```bash
   npm run db:seed
   ```

5. **Run Local Development Server**:
   ```bash
   npm run dev
   ```

6. **Open in Browser**:
   Visit `http://localhost:3000` to view the application.

---

## Database Schema Overview

- **`courses`**: `id`, `title`, `image_src`
- **`units`**: `id`, `title`, `description`, `course_id`, `order`
- **`lessons`**: `id`, `title`, `unit_id`, `order`
- **`challenges`**: `id`, `lesson_id`, `type` (`SELECT` | `ASSIST` | `TYPE` | `BLANK` | `MATCH`), `question`, `order`
- **`challenge_options`**: `id`, `challenge_id`, `text`, `correct`, `image_src`, `audio_src`
- **`user_progress`**: `user_id`, `user_name`, `user_image_src`, `active_course_id`, `hearts`, `points`, `streak`

---

## Project Structure

```
Scaler-Duolingo-Clone/
├── app/
│   ├── (main)/
│   │   ├── courses/        # SOUNDS & Course selection page
│   │   ├── leaderboard/    # Replicated 3-Shield Leaderboard page
│   │   ├── learn/          # Skill tree path & dynamic unit banners
│   │   ├── profile/        # User profile & statistics page
│   │   ├── quests/         # Daily quests page
│   │   ├── settings/       # Preferences & toggles page
│   │   ├── shop/           # Shop page (Power-ups, Hearts, Ad Blocker)
│   │   └── user-search/    # Search for friends page
│   ├── lesson/             # Interactive Lesson Player & Quiz loop
│   └── layout.tsx          # Root layout & global modals
├── components/
│   ├── modals/             # Invite, Guidebook, Hearts, Exit, & Practice modals
│   ├── ui/                 # Duolingo 3D buttons, progress bars, avatars
│   ├── sidebar.tsx         # Left sidebar with MORE popover menu
│   └── user-progress.tsx   # Top stats bar & MY COURSES flag popover
├── store/                  # Zustand state stores
└── README.md
```
