import { Bell, Globe2, ShieldCheck, Volume2 } from "lucide-react";

const settings = [
  [Globe2, "Learning language", "Spanish for English speakers"],
  [Volume2, "Sound effects", "Enabled during lessons"],
  [Bell, "Daily reminder", "Coming soon"],
  [ShieldCheck, "Privacy & account", "Coming soon"],
];

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 pb-10">
      <div className="rounded-[28px] border-2 border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-extrabold uppercase tracking-widest text-emerald-600">Settings</p>
        <h1 className="mt-1 text-3xl font-black text-slate-800">Make Lingo yours</h1>
        <div className="mt-6 divide-y-2 rounded-2xl border-2 border-slate-100">
          {settings.map(([Icon, title, detail]) => {
            const SettingIcon = Icon as typeof Globe2;
            return <div key={title as string} className="flex items-center gap-4 p-4">
              <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600"><SettingIcon className="h-5 w-5" /></div>
              <div><p className="font-extrabold text-slate-700">{title as string}</p><p className="text-sm text-slate-500">{detail as string}</p></div>
            </div>;
          })}
        </div>
      </div>
    </div>
  );
}
