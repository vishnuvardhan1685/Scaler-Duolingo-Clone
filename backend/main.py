from __future__ import annotations

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from storage import (
    activate_course,
    complete_exercise,
    fetch_course_detail,
    fetch_courses,
    fetch_current_lesson,
    fetch_achievements,
    fetch_leaderboard,
    fetch_active_profile,
    fetch_progress,
    refill_hearts,
    init_db,
    lose_heart,
)

app = FastAPI(title="Lingo API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ActivateCourseBody(BaseModel):
    courseId: int


class ExerciseCompleteBody(BaseModel):
    exerciseId: int
    correct: bool = True


class ProgressUpdate(BaseModel):
    hearts: int
    points: int
    streak: int
    gems: int
    dailyGoal: int
    lastActivity: str
    completedSkills: list[int] = Field(default_factory=list)


@app.on_event("startup")
def startup() -> None:
    init_db()


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/courses")
def list_courses() -> list[dict[str, object]]:
    return fetch_courses()


@app.get("/courses/{course_id}")
def get_course(course_id: int) -> dict[str, object]:
    course = fetch_course_detail(course_id)
    if course is None:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


@app.get("/lesson/current")
def get_current_lesson() -> dict[str, object]:
    lesson = fetch_current_lesson()
    if lesson is None:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson


@app.get("/leaderboard")
def get_leaderboard() -> list[dict[str, object]]:
    return fetch_leaderboard()


@app.get("/progress")
def get_progress() -> dict[str, object]:
    return fetch_progress()


@app.post("/courses/activate")
def choose_course(body: ActivateCourseBody) -> dict[str, object]:
    try:
        profile = activate_course(body.courseId)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
    return {"ok": True, "profile": profile}


@app.post("/lesson/complete")
def complete_lesson(body: ExerciseCompleteBody) -> dict[str, object]:
    if not body.correct:
        return {"ok": False}
    try:
        progress = complete_exercise(body.exerciseId)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
    return {"ok": True, "progress": progress}


@app.post("/lesson/wrong")
def wrong_answer() -> dict[str, object]:
    progress = lose_heart()
    return {"ok": True, "progress": progress}


@app.post("/progress/refill-hearts")
def refill() -> dict[str, object]:
    progress = refill_hearts()
    return {"ok": True, "progress": progress}


@app.get("/profile")
def profile() -> dict[str, object]:
    return fetch_active_profile()


@app.get("/achievements")
def achievements() -> list[dict[str, object]]:
    return fetch_achievements()
