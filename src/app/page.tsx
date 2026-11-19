import { TimelineBoard } from '@/components/TimelineBoard';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      <TimelineBoard />
    </main>
  );
}
