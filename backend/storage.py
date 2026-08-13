from __future__ import annotations

import json
import sqlite3
from contextlib import contextmanager
from pathlib import Path
from typing import Any
from datetime import date, timedelta

DB_PATH = Path(__file__).with_name("lingo.db")


@contextmanager
def get_connection() -> sqlite3.Connection:
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    try:
        yield connection
        connection.commit()
    finally:
        connection.close()


def init_db() -> None:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with get_connection() as connection:
        cursor = connection.cursor()
        cursor.executescript(
            """
            CREATE TABLE IF NOT EXISTS courses (
                id INTEGER PRIMARY KEY,
                title TEXT NOT NULL,
                image_src TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS units (
                id INTEGER PRIMARY KEY,
                course_id INTEGER NOT NULL,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                unit_order INTEGER NOT NULL,
                FOREIGN KEY(course_id) REFERENCES courses(id)
            );

            CREATE TABLE IF NOT EXISTS lessons (
                id INTEGER PRIMARY KEY,
                unit_id INTEGER NOT NULL,
                title TEXT NOT NULL,
                lesson_order INTEGER NOT NULL,
                FOREIGN KEY(unit_id) REFERENCES units(id)
            );

            CREATE TABLE IF NOT EXISTS exercises (
                id INTEGER PRIMARY KEY,
                lesson_id INTEGER NOT NULL,
                exercise_order INTEGER NOT NULL,
                type TEXT NOT NULL,
                prompt TEXT NOT NULL,
                answer TEXT NOT NULL,
                FOREIGN KEY(lesson_id) REFERENCES lessons(id)
            );

            CREATE TABLE IF NOT EXISTS exercise_options (
                id INTEGER PRIMARY KEY,
                exercise_id INTEGER NOT NULL,
                text TEXT NOT NULL,
                correct INTEGER NOT NULL DEFAULT 0,
                image_src TEXT,
                audio_src TEXT,
                FOREIGN KEY(exercise_id) REFERENCES exercises(id)
            );

            CREATE TABLE IF NOT EXISTS learner_profile (
                user_id TEXT PRIMARY KEY,
                user_name TEXT NOT NULL,
                user_image_src TEXT NOT NULL,
                active_course_id INTEGER,
                hearts INTEGER NOT NULL DEFAULT 4,
                points INTEGER NOT NULL DEFAULT 120,
                streak INTEGER NOT NULL DEFAULT 7,
                gems INTEGER NOT NULL DEFAULT 50,
                daily_goal_xp INTEGER NOT NULL DEFAULT 50,
                last_activity TEXT NOT NULL,
                FOREIGN KEY(active_course_id) REFERENCES courses(id)
            );

            CREATE TABLE IF NOT EXISTS completed_lessons (
                user_id TEXT NOT NULL,
                lesson_id INTEGER NOT NULL,
                completed_at TEXT NOT NULL,
                PRIMARY KEY (user_id, lesson_id)
            );

            CREATE TABLE IF NOT EXISTS completed_exercises (
                user_id TEXT NOT NULL,
                exercise_id INTEGER NOT NULL,
                completed_at TEXT NOT NULL,
                PRIMARY KEY (user_id, exercise_id)
            );

            CREATE TABLE IF NOT EXISTS leaderboard_seed (
                user_id TEXT PRIMARY KEY,
                user_name TEXT NOT NULL,
                user_image_src TEXT NOT NULL,
                points INTEGER NOT NULL
            );

            CREATE TABLE IF NOT EXISTS achievements (
                id INTEGER PRIMARY KEY,
                user_id TEXT NOT NULL,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                earned_at TEXT NOT NULL
            );
            """
        )

        cursor.execute("SELECT COUNT(*) AS count FROM courses")
        if cursor.fetchone()["count"] == 0:
            seed_db(cursor)
            connection.commit()

        # Older demo databases included empty placeholder courses. Keep the
        # default learner on a playable course after a restart.
        cursor.execute(
            """
            UPDATE learner_profile SET active_course_id = 1
            WHERE user_id = 'demo-user' AND NOT EXISTS (
                SELECT 1 FROM lessons l JOIN units u ON l.unit_id = u.id
                WHERE u.course_id = learner_profile.active_course_id
            )
            """
        )


def seed_db(cursor: sqlite3.Cursor) -> None:
    cursor.execute("INSERT INTO courses (id, title, image_src) VALUES (?, ?, ?)", (1, "Spanish", "/mascot.svg"))
    cursor.execute("INSERT INTO courses (id, title, image_src) VALUES (?, ?, ?)", (2, "French", "/fr.svg"))
    cursor.execute("INSERT INTO courses (id, title, image_src) VALUES (?, ?, ?)", (3, "Japanese", "/jp.svg"))

    units = [
        (101, 1, "Unit 1", "Learn the basics of Spanish", 1),
        (102, 1, "Unit 2", "Build simple phrases", 2),
        (103, 1, "Unit 3", "Practice daily situations", 3),
    ]
    cursor.executemany("INSERT INTO units (id, course_id, title, description, unit_order) VALUES (?, ?, ?, ?, ?)", units)

    lessons = [
        (1001, 101, "Greetings", 1),
        (1002, 101, "Basics", 2),
        (1003, 102, "Phrases", 1),
        (1004, 103, "Food", 1),
    ]
    cursor.executemany("INSERT INTO lessons (id, unit_id, title, lesson_order) VALUES (?, ?, ?, ?)", lessons)

    exercises = [
        (2001, 1002, 1, "SELECT", "Select the Spanish word for apple", "manzana"),
        (2002, 1002, 2, "ASSIST", "Translate: good morning", "buenos días"),
        (2003, 1002, 3, "MATCH", "Match the pair", "cat = gato"),
        (2004, 1002, 4, "BLANK", "Fill in the blank", "Yo soy"),
        (2005, 1002, 5, "TYPE", "Type the answer: I am happy", "Estoy feliz"),
    ]
    cursor.executemany(
        "INSERT INTO exercises (id, lesson_id, exercise_order, type, prompt, answer) VALUES (?, ?, ?, ?, ?, ?)",
        exercises,
    )

    options = [
        (3001, 2001, "manzana", 1, None, "/es_man.mp3"),
        (3002, 2001, "pera", 0, None, "/es_woman.mp3"),
        (3003, 2001, "naranja", 0, None, "/es_boy.mp3"),
        (3004, 2001, "uva", 0, None, "/es_girl.mp3"),
        (3005, 2002, "buenos días", 1, None, "/es_boy.mp3"),
        (3006, 2002, "buenas noches", 0, None, "/es_girl.mp3"),
    ]
    cursor.executemany(
        "INSERT INTO exercise_options (id, exercise_id, text, correct, image_src, audio_src) VALUES (?, ?, ?, ?, ?, ?)",
        options,
    )

    cursor.execute(
        """
        INSERT INTO learner_profile (
            user_id, user_name, user_image_src, active_course_id, hearts,
            points, streak, gems, daily_goal_xp, last_activity
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        ("demo-user", "Demo User", "/mascot.svg", 1, 4, 120, 7, 50, 50, "2026-08-13"),
    )

    leaderboard = [
        ("demo-user-1", "Demo User", "/mascot.svg", 120),
        ("demo-user-2", "Mina", "/mascot.svg", 110),
        ("demo-user-3", "Noah", "/mascot.svg", 95),
    ]
    cursor.executemany(
        "INSERT INTO leaderboard_seed (user_id, user_name, user_image_src, points) VALUES (?, ?, ?, ?)",
        leaderboard,
    )

    cursor.execute(
        "INSERT INTO completed_lessons (user_id, lesson_id, completed_at) VALUES (?, ?, ?)",
        ("demo-user", 1001, "2026-08-13"),
    )
    cursor.execute(
        "INSERT INTO completed_exercises (user_id, exercise_id, completed_at) VALUES (?, ?, ?)",
        ("demo-user", 2001, "2026-08-13"),
    )
    cursor.execute(
        "INSERT INTO achievements (id, user_id, title, description, earned_at) VALUES (?, ?, ?, ?, ?)",
        (1, "demo-user", "First Steps", "Completed your first lesson.", "2026-08-13"),
    )


def row_to_dict(row: sqlite3.Row | None) -> dict[str, Any] | None:
    if row is None:
        return None
    return dict(row)


def fetch_courses() -> list[dict[str, Any]]:
    with get_connection() as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM courses ORDER BY id")
        courses = [dict(row) for row in cursor.fetchall()]
        for course in courses:
            cursor.execute("SELECT COUNT(*) AS count FROM units WHERE course_id = ?", (course["id"],))
            course["totalUnits"] = cursor.fetchone()["count"]
            cursor.execute(
                """
                SELECT COUNT(*) AS count
                FROM units u
                WHERE u.course_id = ?
                AND NOT EXISTS (
                    SELECT 1 FROM lessons l
                    WHERE l.unit_id = u.id
                    AND NOT EXISTS (
                        SELECT 1 FROM completed_lessons cl
                        WHERE cl.lesson_id = l.id AND cl.user_id = ?
                    )
                )
                """,
                (course["id"], "demo-user"),
            )
            course["unitsCompleted"] = cursor.fetchone()["count"]
            total = course["totalUnits"] or 1
            course["progress"] = round(course["unitsCompleted"] / total * 100)
        return [course for course in courses if course["totalUnits"] > 0]


def fetch_active_profile() -> dict[str, Any]:
    with get_connection() as connection:
        cursor = connection.cursor()
        cursor.execute(
            "SELECT * FROM learner_profile WHERE user_id = ?",
            ("demo-user",),
        )
        profile = dict(cursor.fetchone())
        cursor.execute(
            "SELECT * FROM courses WHERE id = ?",
            (profile["active_course_id"],),
        )
        profile["activeCourse"] = dict(cursor.fetchone())
        cursor.execute(
            "SELECT COUNT(*) AS count FROM completed_exercises WHERE user_id = ? AND date(completed_at) = date('now')",
            (profile["user_id"],),
        )
        profile["dailyXp"] = cursor.fetchone()["count"] * 10
        return profile


def fetch_course_detail(course_id: int) -> dict[str, Any] | None:
    with get_connection() as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM courses WHERE id = ?", (course_id,))
        course = cursor.fetchone()
        if course is None:
            return None
        cursor.execute("SELECT * FROM units WHERE course_id = ? ORDER BY unit_order", (course_id,))
        units = []
        for unit_row in cursor.fetchall():
            cursor.execute("SELECT * FROM lessons WHERE unit_id = ? ORDER BY lesson_order", (unit_row["id"],))
            lesson_rows = cursor.fetchall()
            lessons = []
            # A lesson is available when every earlier lesson in the course is done.
            cursor.execute(
                """
                SELECT l.id FROM lessons l JOIN units prior_unit ON l.unit_id = prior_unit.id
                WHERE prior_unit.course_id = ?
                ORDER BY prior_unit.unit_order, l.lesson_order
                """,
                (course_id,),
            )
            ordered_ids = [row["id"] for row in cursor.fetchall()]
            cursor.execute("SELECT lesson_id FROM completed_lessons WHERE user_id = ?", ("demo-user",))
            completed_ids = {row["lesson_id"] for row in cursor.fetchall()}
            for lesson_row in lesson_rows:
                cursor.execute(
                    "SELECT 1 FROM completed_lessons WHERE user_id = ? AND lesson_id = ?",
                    ("demo-user", lesson_row["id"]),
                )
                completed = cursor.fetchone() is not None
                lesson_position = ordered_ids.index(lesson_row["id"])
                unlocked = lesson_position == 0 or all(
                    previous_id in completed_ids
                    for previous_id in ordered_ids[:lesson_position]
                )
                lessons.append({
                    "id": lesson_row["id"],
                    "title": lesson_row["title"],
                    "unitId": lesson_row["unit_id"],
                    "order": lesson_row["lesson_order"],
                    "completed": completed,
                    "unlocked": unlocked,
                })
            units.append({
                "id": unit_row["id"],
                "title": unit_row["title"],
                "description": unit_row["description"],
                "courseId": unit_row["course_id"],
                "order": unit_row["unit_order"],
                "lessons": lessons,
            })
        units = [unit for unit in units if unit["lessons"]]
        return {
            "id": course["id"],
            "title": course["title"],
            "imageSrc": course["image_src"],
            "units": units,
        }


def fetch_current_lesson() -> dict[str, Any] | None:
    profile = fetch_active_profile()
    course = fetch_course_detail(profile["active_course_id"])
    if course is None:
        return None

    current_lesson: dict[str, Any] | None = None
    current_unit: dict[str, Any] | None = None
    for unit in course["units"]:
        for lesson in unit["lessons"]:
            if not lesson["completed"]:
                current_lesson = lesson
                current_unit = unit
                break
        if current_lesson:
            break

    if current_lesson is None:
        if not course["units"]:
            return None
        current_unit = course["units"][-1]
        current_lesson = current_unit["lessons"][-1]

    unit_payload = None
    if current_unit is not None:
        unit_payload = {
            "id": current_unit["id"],
            "title": current_unit["title"],
            "description": current_unit["description"],
            "courseId": current_unit["courseId"],
            "order": current_unit["order"],
        }

    with get_connection() as connection:
        cursor = connection.cursor()
        cursor.execute(
            "SELECT * FROM exercises WHERE lesson_id = ? ORDER BY exercise_order",
            (current_lesson["id"],),
        )
        exercises = []
        for exercise_row in cursor.fetchall():
            cursor.execute(
                "SELECT * FROM exercise_options WHERE exercise_id = ? ORDER BY id",
                (exercise_row["id"],),
            )
            options = [dict(row) for row in cursor.fetchall()]
            cursor.execute(
                "SELECT 1 FROM completed_exercises WHERE user_id = ? AND exercise_id = ?",
                ("demo-user", exercise_row["id"]),
            )
            completed = cursor.fetchone() is not None
            exercises.append({
                "id": exercise_row["id"],
                "lessonId": exercise_row["lesson_id"],
                "type": exercise_row["type"],
                "question": exercise_row["prompt"],
                "order": exercise_row["exercise_order"],
                "completed": completed,
                "challengeOptions": options,
                "answer": exercise_row["answer"],
            })

    return {
        "id": current_lesson["id"],
        "title": current_lesson["title"],
        "unitId": current_unit["id"] if current_unit else None,
        "order": current_lesson["order"],
        "unit": unit_payload,
        "challenges": exercises,
    }


def fetch_leaderboard() -> list[dict[str, Any]]:
    with get_connection() as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM leaderboard_seed ORDER BY points DESC")
        return [dict(row) for row in cursor.fetchall()]


def fetch_achievements() -> list[dict[str, Any]]:
    with get_connection() as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT title, description, earned_at FROM achievements WHERE user_id = ? ORDER BY id", ("demo-user",))
        return [dict(row) for row in cursor.fetchall()]


def fetch_progress() -> dict[str, Any]:
    profile = fetch_active_profile()
    cursor_payload = {
        "streak": profile["streak"],
        "xp": profile["points"],
        "hearts": profile["hearts"],
        "gems": profile["gems"],
        "dailyGoal": profile["daily_goal_xp"],
        "lastActivity": profile["last_activity"],
        "completedSkills": [],
    }
    with get_connection() as connection:
        cursor = connection.cursor()
        cursor.execute(
            "SELECT lesson_id FROM completed_lessons WHERE user_id = ?",
            (profile["user_id"],),
        )
        cursor_payload["completedSkills"] = [row["lesson_id"] for row in cursor.fetchall()]
    return cursor_payload


def activate_course(course_id: int) -> dict[str, Any]:
    with get_connection() as connection:
        cursor = connection.cursor()
        cursor.execute(
            "SELECT 1 FROM lessons l JOIN units u ON l.unit_id = u.id WHERE u.course_id = ? LIMIT 1",
            (course_id,),
        )
        if cursor.fetchone() is None:
            raise ValueError("This course is coming soon")
        cursor.execute("UPDATE learner_profile SET active_course_id = ? WHERE user_id = ?", (course_id, "demo-user"))
    return fetch_active_profile()


def _streak_for_activity(profile: dict[str, Any]) -> int:
    """Count at most one streak day per calendar day; reset after a missed day."""
    today = date.today()
    try:
        last = date.fromisoformat(str(profile["last_activity"]))
    except ValueError:
        return 1
    if last == today:
        return int(profile["streak"])
    if last == today - timedelta(days=1):
        return int(profile["streak"]) + 1
    return 1


def complete_exercise(exercise_id: int) -> dict[str, Any]:
    profile = fetch_active_profile()
    lesson = fetch_current_lesson()
    if lesson is None:
        raise ValueError("Lesson not found")

    with get_connection() as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT lesson_id FROM exercises WHERE id = ?", (exercise_id,))
        exercise = cursor.fetchone()
        if exercise is None or exercise["lesson_id"] != lesson["id"]:
            raise ValueError("Exercise is not part of the active lesson")
        cursor.execute(
            "SELECT 1 FROM completed_exercises WHERE user_id = ? AND exercise_id = ?",
            (profile["user_id"], exercise_id),
        )
        already_completed = cursor.fetchone() is not None
        if not already_completed:
            cursor.execute(
                "INSERT INTO completed_exercises (user_id, exercise_id, completed_at) VALUES (?, ?, datetime('now'))",
                (profile["user_id"], exercise_id),
            )
            cursor.execute(
                "UPDATE learner_profile SET points = points + 10, streak = ?, last_activity = date('now') WHERE user_id = ?",
                (_streak_for_activity(profile), profile["user_id"]),
            )

            cursor.execute(
                "SELECT COUNT(*) AS count FROM exercises WHERE lesson_id = ?",
                (lesson["id"],),
            )
            total = cursor.fetchone()["count"]
            cursor.execute(
                "SELECT COUNT(*) AS count FROM completed_exercises WHERE user_id = ? AND exercise_id IN (SELECT id FROM exercises WHERE lesson_id = ?)",
                (profile["user_id"], lesson["id"]),
            )
            completed = cursor.fetchone()["count"]
            if completed >= total:
                cursor.execute(
                    "INSERT OR IGNORE INTO completed_lessons (user_id, lesson_id, completed_at) VALUES (?, ?, datetime('now'))",
                    (profile["user_id"], lesson["id"]),
                )

    return fetch_progress()


def lose_heart() -> dict[str, Any]:
    profile = fetch_active_profile()
    with get_connection() as connection:
        cursor = connection.cursor()
        cursor.execute(
            "UPDATE learner_profile SET hearts = MAX(hearts - 1, 0) WHERE user_id = ?",
            (profile["user_id"],),
        )
    return fetch_progress()


def refill_hearts() -> dict[str, Any]:
    profile = fetch_active_profile()
    with get_connection() as connection:
        cursor = connection.cursor()
        cursor.execute(
            "UPDATE learner_profile SET hearts = 5, gems = MAX(gems - 10, 0) WHERE user_id = ?",
            (profile["user_id"],),
        )
    return fetch_progress()
