'use client';

import dynamic from 'next/dynamic';

const TimelineBoard = dynamic(
  () => import('@/components/TimelineBoard').then((mod) => mod.TimelineBoard),
  { ssr: false }
);

const HexagonBackground = dynamic(
  () => import('@/components/HexagonBackground').then((mod) => mod.HexagonBackground),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f0e0c] text-neutral-100 selection:bg-yellow-400 selection:text-black relative overflow-x-hidden">
      {/* Animated Hexagonal Breathing Backdrop */}
      <HexagonBackground theme="bumblebee" />
      {/* Foreground Content */}
      <div className="relative z-10">
        <TimelineBoard />
      </div>
    </main>
  );
}
