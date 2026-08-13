import { cache } from "react";

import { apiGet } from "@/lib/backend";
import { isLocalDemoMode } from "@/lib/local-mode";
import {
  demoCourses,
  demoLeaderboard,
  demoLesson,
  demoUserProgress,
} from "@/db/demo-data";

type CourseSummary = {
  id: number;
  title: string;
  imageSrc: string;
  totalUnits?: number;
  unitsCompleted?: number;
  progress?: number;
};

type BackendProfile = {
  user_id: string;
  user_name: string;
  user_image_src: string;
  active_course_id: number | null;
  hearts: number;
  points: number;
  streak: number;
  gems: number;
  daily_goal_xp: number;
  last_activity: string;
  dailyXp: number;
  activeCourse: {
    id: number;
    title: string;
    imageSrc: string;
  };
  completedSkills: number[];
};

export const getUserProgress = cache(async () => {
  if (isLocalDemoMode) {
    return demoUserProgress as any;
  }

  try {
    const profile = await apiGet<BackendProfile>("/profile");
    return {
      userId: profile.user_id,
      userName: profile.user_name,
      userImageSrc: profile.user_image_src,
      activeCourseId: profile.active_course_id,
      hearts: profile.hearts,
      points: profile.points,
      streak: profile.streak,
      gems: profile.gems,
      dailyGoalXp: profile.daily_goal_xp,
      dailyXp: profile.dailyXp,
      activeCourse: profile.activeCourse,
    };
  } catch {
    return demoUserProgress;
  }
});

export const getUnits = cache(async () => {
  if (isLocalDemoMode) {
    return demoCourses[0].units;
  }

  try {
    const profile = await getUserProgress();
    const courseId = profile?.activeCourseId ?? 1;
    const course = await apiGet<any>(`/courses/${courseId}`);
    return course.units as any;
  } catch {
    return demoCourses[0].units;
  }
});

export const getCourses = cache(async () => {
  if (isLocalDemoMode) {
    return demoCourses;
  }

  try {
    return await apiGet<CourseSummary[]>("/courses");
  } catch {
    return demoCourses;
  }
});

export const getCourseById = cache(async (courseId: number) => {
  if (isLocalDemoMode) {
    return demoCourses.find((course) => course.id === courseId) ?? demoCourses[0];
  }

  try {
    return await apiGet<Record<string, unknown>>(`/courses/${courseId}`);
  } catch {
    return demoCourses.find((course) => course.id === courseId) ?? demoCourses[0];
  }
});

export const getCourseProgress = cache(async () => {
  if (isLocalDemoMode) {
    return {
      activeLesson: demoLesson,
      activeLessonId: demoLesson.id,
    };
  }

  try {
    const lesson = await apiGet<any>("/lesson/current");
    return {
      activeLesson: lesson,
      activeLessonId: lesson.id,
    };
  } catch {
    return {
      activeLesson: demoLesson,
      activeLessonId: demoLesson.id,
    };
  }
});

export const getLesson = cache(async (id?: number) => {
  if (isLocalDemoMode) {
    return demoLesson;
  }

  try {
    return await apiGet<any>("/lesson/current");
  } catch {
    return demoLesson;
  }
});

export const getLessonPercentage = cache(async () => {
  const lesson = await getLesson();
  const challenges = (lesson as { challenges?: Array<{ completed?: boolean }> }).challenges ?? [];
  if (challenges.length === 0) {
    return 0;
  }

  const completedChallenges = challenges.filter((challenge) => challenge.completed);
  return Math.round((completedChallenges.length / challenges.length) * 100);
});

export const getUserSubscription = cache(async (): Promise<{ isActive: boolean } | null> => null);

export const getTopTenUsers = cache(async () => {
  if (isLocalDemoMode) {
    return demoLeaderboard;
  }

  try {
    const users = await apiGet<Array<{ user_id: string; user_name: string; user_image_src: string; points: number }>>("/leaderboard");
    return users.map((user) => ({
      userId: user.user_id,
      userName: user.user_name,
      userImageSrc: user.user_image_src,
      points: user.points,
    }));
  } catch {
    return demoLeaderboard;
  }
});

export const getAchievements = cache(async () => {
  if (isLocalDemoMode) {
    return [
      {
        title: "First Steps",
        description: "Completed your first lesson.",
        earned_at: "2026-08-13",
      },
    ];
  }

  try {
    return await apiGet<Array<{ title: string; description: string; earned_at: string }>>('/achievements');
  } catch {
    return [
      {
        title: "First Steps",
        description: "Completed your first lesson.",
        earned_at: "2026-08-13",
      },
    ];
  }
});
