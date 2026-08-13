# Duolingo Web Application Clone — SDE Fullstack Assignment

A pixel-perfect full-stack Duolingo web application clone replicating Duolingo's design system, user experience, core lesson player, and gamification mechanics.

![Duolingo Clone Banner](public/hero.svg)

## Overview & Features

This application recreates the playful, gamified experience of Duolingo from the ground up:

### 1. 🟢 Interactive Learning Path / Skill Tree (`/learn`)
- **Snake Path Layout**: Curved alternating node offsets matching Duolingo's learn path.
- **Dynamic Unit Banners**: Section headers (`SECTION 1, UNIT 1 - Form basic sentences` in `#58cc02` green & `SECTION 1, UNIT 2 - Build simple phrases` in `#ce82ff` purple).
- **Sequential Lesson Progress**: Step-by-step node unlocking with completed checkmarks (`✓`), active crown nodes (`👑`) with `START` speech bubbles, and locked nodes (`🔒`).
- **Interactive Guidebooks**: `GUIDEBOOK` button opening grammar notes and key phrases modal for each unit.

### 2. 🌍 Full-Screen Courses Page (`/courses`)
- **Courses Grid**: 4x3 card layout matching Duolingo's course selector (Spanish 🇪🇸, French 🇫🇷, Chess 🏰, Japanese 🇯🇵, German 🇩🇪, Math 🔢, Hindi 🇮🇳, Korean 🇰🇷, Italian 🇮🇹, Chinese 🇨🇳, Russian 🇷🇺, English 🇺🇸).
- **Learner Metrics**: Learner counts (e.g. `42M learners`) and active course green checkmark badge (`✓`).
- **Course Switcher**: Instant language selection updating course context across the app.

### 3. 🔊 SOUNDS & Phonetics Tab (`/sounds`)
- Interactive alphabet and sound cards for Devanagari 🇮🇳, Hiragana 🇯🇵, Spanish 🇪🇸, and French 🇫🇷 with audio playback.

### 4. 🎮 Interactive Lesson Player (`/lesson`)
- **Exercise Formats**: `SELECT` (image cards), `ASSIST` (multiple choice), `TYPE` (typed input for exercises like *"Type the answer: I am happy"*), `BLANK` (word bank assembly), and `MATCH` (pair matching).
- **Answer Validation**: Normalizes punctuation and casing (accepting variations like *"i am happy"*).
- **Sound & Hearts Loop**: Audio feedback on correct/wrong answers, real-time heart deduction, and confetti completion celebration screen (*"Great job! You've completed the lesson"*).

### 5. 🏆 Gamification & Social Mechanics
- **Top Stats Bar**: Active course flag selector popover (`MY COURSES`), Streak counter 🔥, Gems 💎, and Hearts ❤️.
- **Leaderboard (`/leaderboard`)**: Replicated 3-Shield graphics (Gold, Silver, Bronze), top user rankings, and locked league rank rows.
- **Shop Page (`/shop`)**: Family Plan top banner, Heart refills, Power-ups (Streak Freeze), and Ad Blocker cards.
- **Profile Page (`/profile`)**: Cover card `@Vishnuvard52446`, 2x2 statistics grid, achievements, and `FOLLOWING` | `FOLLOWERS` tabs (*"No followers yet"*).
- **Search for Friends Page (`/user-search`)**: Search input, friends illustration, and invite friends sidebar card.
- **Invite Friends Modal**: Duo envelope mascot illustration, copy referral link button (`https://invite.duolingo.com/...`), toast notification, and Facebook/Twitter share buttons.
- **Settings Page (`/settings`)**: Preferences toggles (`Sound effects`, `Animations`, `Motivational messages`, `Listening exercises`).
- **MORE Menu**: Sidebar popover menu for English Test, Schools, Settings, Help, and Logout.

---

## Technical Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons, Radix UI, React Confetti, React Circular Progressbar.
- **Backend / State Management**: Drizzle ORM, Neon PostgreSQL / SQLite Database with seeded course curriculum, Server Actions, and Zustand persistent stores (`useLanguageStore`, `useProgressStore`, `useInviteModal`, `useGuidebookModal`, `useExitModal`, `useHeartsModal`, `usePracticeModal`).

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

3. **Seed Database / Demo Data**:
   ```bash
   npm run db:seed
   ```

4. **Run Local Development Server**:
   ```bash
   npm run dev
   ```

5. **Open in Browser**:
   Visit `http://localhost:3000` to view the application.

---

## Deploying to Vercel (Single Repository)

This project compiles all UI pages, App Router API routes (`/api/*`), Server Actions, and Zustand persistent state into **one single Next.js project on Vercel**:

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Deploy Duolingo clone to Vercel"
   git push origin main
   ```
2. Go to [Vercel Dashboard](https://vercel.com/new) and import `Scaler-Duolingo-Clone`.
3. Set **Framework Preset** to `Next.js` and click **Deploy**.

---

## Project Structure

```
Scaler-Duolingo-Clone/
├── app/
│   ├── (main)/
│   │   ├── courses/        # Full-Screen "Courses for English Speakers" grid
│   │   ├── leaderboard/    # Replicated 3-Shield Leaderboard page
│   │   ├── learn/          # Skill tree path & dynamic unit banners
│   │   ├── profile/        # User profile, statistics & friends tabs
│   │   ├── quests/         # Daily quests page
│   │   ├── settings/       # Preferences & toggles page
│   │   ├── shop/           # Shop page (Power-ups, Hearts, Ad Blocker)
│   │   ├── sounds/         # Interactive SOUNDS & Phonetics page
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
