# Lingo — Duolingo-style language learning app

A full-stack Spanish learning demo built for the assignment. It has a playable learning path, five exercise formats, persistent gamification, a profile, leaderboard, and heart refill flow.

## Stack

- Next.js 14 + TypeScript + Tailwind CSS for the interface
- FastAPI for the JSON API
- SQLite (`backend/lingo.db`) for seeded content and learner progress

## Run locally

Open two terminals from this directory.

```powershell
# Terminal 1 — API
..\.venv\Scripts\python.exe -m pip install -r backend\requirements.txt
..\.venv\Scripts\python.exe -m uvicorn main:app --app-dir backend --reload
```

```powershell
# Terminal 2 — web app
npm install
npm run dev
```

Visit `http://localhost:3000`. The frontend uses `NEXT_PUBLIC_API_BASE_URL` from `.env.local`, which defaults to `http://localhost:8000`.

## Features

- Sequential, lockable course path with completed, current, and locked lesson states
- Lesson player with select, translate, match, word-bank fill-in, and typed-answer exercises
- Immediate answer feedback, progress bar, sound effects, XP, hearts, completion celebration, and out-of-hearts modal
- Persistent learner XP, streak, hearts, gems, completed exercises/lessons, course selection, profile, achievements, and seeded leaderboard
- Streak logic only increases once per calendar day; it resets after a missed day
- Mock heart refill costs 10 gems

## Database design

`courses → units → lessons → exercises → exercise_options` models curriculum content. `learner_profile` stores the active course and gamification totals. `completed_exercises` and `completed_lessons` are user-to-content join tables used for progress and unlock calculations. `achievements` and `leaderboard_seed` support the profile and social placeholder UI.

The SQLite database is initialized and seeded automatically when FastAPI starts. One Spanish course with three units and a seeded demo learner is included.

## API overview

- `GET /courses`, `GET /courses/{id}`, `POST /courses/activate`
- `GET /lesson/current`, `POST /lesson/complete`, `POST /lesson/wrong`
- `GET /progress`, `POST /progress/refill-hearts`
- `GET /profile`, `GET /achievements`, `GET /leaderboard`

Authentication is intentionally simplified to a seeded `demo-user`, as permitted by the assignment. Speech, payments, and social connections are represented as UI placeholders.
