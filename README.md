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
- **Full Social & Profile Pages**: Replicated Leaderboard with 3-Shield graphics, Profile page with statistics grid & friends tabs, and Settings Preferences with toggle switches and MORE popover menu.

---

## Technical Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons, Radix UI, React Confetti, React Circular Progressbar.
- **Backend / ORM**: Drizzle ORM, Neon PostgreSQL / SQLite Database with seeded course curriculum data.
- **State Management**: Zustand stores (`useLanguageStore`, `useGuidebookModal`, `useExitModal`, `useHeartsModal`, `usePracticeModal`).

---

## Features Implemented

1. **Learning Path / Skill Tree**:
   - Snake path layout with alternating node offsets.
   - Dynamic Unit Banners (`SECTION 1, UNIT 1 - Form basic sentences` in Green `#58cc02` & `SECTION 1, UNIT 2 - Build simple phrases` in Purple `#ce82ff`).
   - `GUIDEBOOK` button opening interactive grammar & key phrases modal.

2. **Lesson Player**:
   - Answer normalization stripping punctuation (`.`, `,`, `!`, `?`) and casing so typed answers like `"i am happy"` validate properly.
   - Audio feedback playback on correct/incorrect answers.
   - Progress bar tracking lesson progress.

3. **Gamification & Progress**:
   - Top-right stats bar showing Flag switcher popover, Streak 🔥, Gems 💎, and Hearts ❤️.
   - Leaderboard page with 3-Shield gold/silver/bronze graphic and locked rank row skeletons.
   - Shop page with Family Plan top banner, Hearts refills, Power-Ups (Streak Freeze), and Ad Blocker cards.

4. **Profile & Settings**:
   - Profile page with dotted avatar outline, username `@Vishnuvard52446`, 2x2 statistics grid, and Following/Followers side tabs.
   - Settings page with Preferences toggles (`Sound effects`, `Animations`, `Motivational messages`, `Listening exercises`).
   - `MORE` sidebar popover menu (`DUOLINGO ENGLISH TEST`, `SCHOOLS`, `SETTINGS`, `HELP`, `LOG OUT`).

---

## Database Schema Overview

- **`courses`**: `id`, `title`, `image_src`
- **`units`**: `id`, `title`, `description`, `course_id`, `order`
- **`lessons`**: `id`, `title`, `unit_id`, `order`
- **`challenges`**: `id`, `lesson_id`, `type` (`SELECT` | `ASSIST` | `TYPE` | `BLANK` | `MATCH`), `question`, `order`
- **`challenge_options`**: `id`, `challenge_id`, `text`, `correct`, `image_src`, `audio_src`
- **`user_progress`**: `user_id`, `user_name`, `user_image_src`, `active_course_id`, `hearts`, `points`, `streak`

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

## Project Structure

```
Scaler-Duolingo-Clone/
├── app/
│   ├── (main)/
│   │   ├── courses/        # Letters & Course selection page
│   │   ├── leaderboard/    # Replicated 3-Shield Leaderboard page
│   │   ├── learn/          # Skill tree path & dynamic unit banners
│   │   ├── profile/        # User profile & statistics page
│   │   ├── quests/         # Daily quests page
│   │   ├── settings/       # Preferences & toggles page
│   │   └── shop/           # Shop page (Power-ups, Hearts, Ad Blocker)
│   ├── lesson/             # Interactive Lesson Player & Quiz loop
│   └── layout.tsx          # Root layout & global modals
├── components/
│   ├── modals/             # Guidebook, Hearts, Exit, & Practice modals
│   ├── ui/                 # Duolingo 3D buttons, progress bars, avatars
│   ├── sidebar.tsx         # Left sidebar with MORE popover menu
│   └── user-progress.tsx   # Top stats bar & MY COURSES flag popover
├── store/                  # Zustand state stores
└── README.md
```
