'use client';

import { useState, useEffect } from 'react';
import { TimelineBoard } from '@/components/TimelineBoard';
import { HexagonBackground } from '@/components/HexagonBackground';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <main className="min-h-screen bg-[#0f0e0c]" />;
  }

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
