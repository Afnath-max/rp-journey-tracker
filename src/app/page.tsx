import { TimelineBoard } from '@/components/TimelineBoard';
import { HexagonBackground } from '@/components/HexagonBackground';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-800 selection:bg-amber-400 selection:text-black relative overflow-x-hidden">
      {/* Animated Light Honeycomb Breathing Backdrop */}
      <HexagonBackground />
      {/* Foreground Content */}
      <div className="relative z-10">
        <TimelineBoard />
      </div>
    </main>
  );
}
