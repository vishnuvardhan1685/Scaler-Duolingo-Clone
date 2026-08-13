import type {
  challengeOptions,
  challenges,
  courses,
  lessons,
  units,
  userProgress,
  userSubscription,
} from "@/db/schema";

export const demoCourses = [
  {
    id: 1,
    title: "Spanish",
    imageSrc: "/mascot.svg",
    units: [
      {
        id: 101,
        title: "Unit 1",
        description: "Learn the basics of Spanish",
        courseId: 1,
        order: 1,
        lessons: [
          { id: 1001, title: "Greetings", unitId: 101, order: 1, completed: true },
          { id: 1002, title: "Basics", unitId: 101, order: 2, completed: false },
        ],
      },
      {
        id: 102,
        title: "Unit 2",
        description: "Build simple phrases",
        courseId: 1,
        order: 2,
        lessons: [
          { id: 1003, title: "Phrases", unitId: 102, order: 1, completed: false },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "French",
    imageSrc: "/mascot.svg",
    units: [],
  },
  {
    id: 3,
    title: "Japanese",
    imageSrc: "/mascot.svg",
    units: [],
  },
] as unknown as (typeof courses.$inferSelect & {
  units: (typeof units.$inferSelect & {
    lessons: (typeof lessons.$inferSelect & { completed: boolean })[];
  })[];
})[];

export const demoUserProgress = {
  userId: "demo-user",
  userName: "Demo User",
  userImageSrc: "/mascot.svg",
  activeCourseId: 1,
  hearts: 4,
  points: 120,
  streak: 7,
  gems: 50,
  dailyGoalXp: 50,
  dailyXp: 10,
  activeCourse: demoCourses[0],
} as typeof userProgress.$inferSelect & {
  activeCourse: typeof courses.$inferSelect;
};

export const demoCourseProgress = {
  activeLesson: {
    id: 1002,
    title: "Basics",
    unitId: 101,
    order: 2,
    unit: demoCourses[0].units[0],
  },
  activeLessonId: 1002,
};

export const demoLesson = {
  id: 1002,
  title: "Basics",
  unitId: 101,
  order: 2,
  challenges: [
    {
      id: 2000,
      lessonId: 1002,
      type: "TYPE",
      question: "Type the answer: I am happy",
      answer: "I am happy",
      order: 1,
      completed: false,
      challengeOptions: [],
    },
    {
      id: 2001,
      lessonId: 1002,
      type: "SELECT",
      question: "Select the Spanish word for apple",
      answer: "manzana",
      order: 2,
      completed: false,
      challengeOptions: [
        {
          id: 3001,
          challengeId: 2001,
          text: "manzana",
          correct: true,
          imageSrc: null,
          audioSrc: "/es_man.mp3",
        },
        {
          id: 3002,
          challengeId: 2001,
          text: "pera",
          correct: false,
          imageSrc: null,
          audioSrc: "/es_woman.mp3",
        },
      ],
    },
  ],
} as unknown as typeof lessons.$inferSelect & {
  challenges: (typeof challenges.$inferSelect & {
    answer?: string;
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
};

export const demoLeaderboard = [
  {
    userId: "demo-user-1",
    userName: "Demo User",
    userImageSrc: "/mascot.svg",
    points: 120,
  },
  {
    userId: "demo-user-2",
    userName: "Mina",
    userImageSrc: "/mascot.svg",
    points: 110,
  },
  {
    userId: "demo-user-3",
    userName: "Noah",
    userImageSrc: "/mascot.svg",
    points: 95,
  },
] as Array<Pick<typeof userProgress.$inferSelect, "userId" | "userName" | "userImageSrc" | "points">>;

export const demoSubscription = null as (typeof userSubscription.$inferSelect & {
  isActive: boolean;
}) | null;
