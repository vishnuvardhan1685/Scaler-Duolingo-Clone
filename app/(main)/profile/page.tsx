import Image from "next/image";

import { getAchievements, getUserProgress } from "@/db/queries";

const ProfilePage = async () => {
  const [userProgress, achievements] = await Promise.all([
    getUserProgress(),
    getAchievements(),
  ]);

  if (!userProgress) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pb-8">
      <div className="rounded-[32px] border-2 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={userProgress.userImageSrc}
              alt={userProgress.userName}
              width={88}
              height={88}
              className="rounded-3xl border-4 border-green-100"
            />
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-green-600">Learner profile</p>
              <h1 className="text-3xl font-black text-slate-800">{userProgress.userName}</h1>
              <p className="text-sm text-slate-500">Active course: {userProgress.activeCourse?.title}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Streak" value={userProgress.streak ?? 0} />
            <Stat label="XP" value={userProgress.points} />
            <Stat label="Hearts" value={userProgress.hearts} />
            <Stat label="Gems" value={userProgress.gems ?? 0} />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-[28px] border-2 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-slate-800">Daily Goal</h2>
          <p className="mt-2 text-sm text-slate-500">Earn {userProgress.dailyGoalXp ?? 50} XP today to complete your daily goal.</p>
          <div className="mt-4 rounded-2xl bg-slate-100 p-4 text-center">
            <p className="text-4xl font-black text-green-600">{userProgress.dailyXp ?? 0} / {userProgress.dailyGoalXp ?? 50}</p>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">XP earned today</p>
          </div>
        </section>

        <section className="rounded-[28px] border-2 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-slate-800">Achievements</h2>
          <div className="mt-4 space-y-3">
            {achievements.map((achievement) => (
              <div key={`${achievement.title}-${achievement.earned_at}`} className="rounded-2xl border bg-slate-50 p-4">
                <p className="font-bold text-slate-800">{achievement.title}</p>
                <p className="text-sm text-slate-500">{achievement.description}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-green-600">Earned {achievement.earned_at}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="rounded-2xl border bg-slate-50 px-4 py-3 text-center">
    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p>
    <p className="text-2xl font-black text-slate-800">{value}</p>
  </div>
);

export default ProfilePage;
