'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MILESTONES, Milestone, getMilestoneStatus } from '@/data/timelineData';
import { MilestoneModal } from './MilestoneModal';
import {
  Target,
  CheckCircle,
  Calendar,
  Clock,
  AlertTriangle,
  ChevronRight,
  ArrowDown,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const TimelineBoard: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [completedMilestones, setCompletedMilestones] = useState<string[]>([]);
  const [currentTimestamp, setCurrentTimestamp] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCurrentTimestamp(Date.now());
    const saved = localStorage.getItem('rp_completed_milestones');
    if (saved) {
      try {
        setCompletedMilestones(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleToggleComplete = (id: string) => {
    let updated: string[];
    const isAdding = !completedMilestones.includes(id);

    if (isAdding) {
      updated = [...completedMilestones, id];
      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#eab308', '#facc15', '#fde047', '#ffffff'],
      });
    } else {
      updated = completedMilestones.filter((mId) => mId !== id);
    }

    setCompletedMilestones(updated);
    localStorage.setItem('rp_completed_milestones', JSON.stringify(updated));
  };

  // Determine the next active (incomplete) milestone dynamically
  const nextActiveMilestone =
    currentTimestamp !== null
      ? MILESTONES.find((m) => {
          if (completedMilestones.includes(m.id)) return false;
          const d = new Date(m.isoDate + 'T23:59:59').getTime();
          return d >= currentTimestamp;
        }) ||
        MILESTONES.find((m) => !completedMilestones.includes(m.id)) ||
        null
      : null;

  const nextActiveId = nextActiveMilestone ? nextActiveMilestone.id : null;
  const progressPercent = Math.round((completedMilestones.length / MILESTONES.length) * 100);

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-transparent text-neutral-100 selection:bg-yellow-400 selection:text-black">
      {/* Top Banner Header */}
      <header className="w-full max-w-4xl mx-auto px-4 pt-10 pb-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-black uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(234,179,8,0.15)]"
        >
          <Zap size={14} className="fill-yellow-400 text-yellow-400" />
          IT4010 Research Project • Faculty of Computing
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-white"
        >
          The <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">2027 RP journey</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-2 text-base sm:text-lg text-neutral-300 font-medium max-w-2xl mx-auto"
        >
          Start before January —{' '}
          <span className="font-bold text-yellow-400">
            the strongest teams do not wait for the semester to begin.
          </span>
        </motion.p>

        {/* Dynamic Focus Alert Callout in Bumblebee Style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 rounded-2xl bg-neutral-950/80 backdrop-blur-md border-2 border-yellow-500/50 p-4 shadow-[0_0_30px_rgba(234,179,8,0.15)] text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 flex items-center justify-center gap-2.5">
            <span className="flex items-center justify-center h-7 w-7 rounded-full bg-yellow-400 text-black font-black">
              <Target size={16} />
            </span>
            <p className="text-sm sm:text-base font-bold tracking-wide">
              {nextActiveMilestone ? (
                <>
                  Next Critical Target:{' '}
                  <span className="text-yellow-400 font-black underline decoration-yellow-400 decoration-2 underline-offset-4">
                    {nextActiveMilestone.title} ({nextActiveMilestone.date})
                  </span>
                </>
              ) : (
                <span className="text-yellow-400 font-black">
                  🎉 All milestones completed! Ready for Final Defense!
                </span>
              )}
            </p>
          </div>
        </motion.div>

        {/* Progress Tracker Card */}
        <div className="mt-5 bg-neutral-950/80 backdrop-blur-md p-4 rounded-2xl border border-neutral-800 shadow-xl flex items-center gap-4">
          <div className="flex-1 text-left">
            <div className="flex justify-between text-xs font-semibold text-neutral-400 mb-1.5">
              <span>Overall Milestone Progress</span>
              <span className="text-yellow-400 font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-neutral-900 h-2.5 rounded-full overflow-hidden border border-neutral-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className="h-full bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-300 rounded-full shadow-[0_0_12px_rgba(250,204,21,0.5)]"
              />
            </div>
          </div>
          <div className="text-right text-xs font-medium text-neutral-400 border-l border-neutral-800 pl-4">
            <span className="text-yellow-400 font-bold text-sm">
              {isClient ? completedMilestones.length : 0}
            </span>{' '}
            / {MILESTONES.length}
            <div>{isClient && completedMilestones.length === MILESTONES.length ? 'Completed' : 'Done'}</div>
          </div>
        </div>

        {/* Chronological Spine Direction Marker */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
          <span>Inception / Past</span>
          <ArrowDown size={14} className="text-yellow-400 animate-bounce" />
          <span>Future Target</span>
        </div>
      </header>

      {/* Vertical Spine Timeline (Past -> Future) */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 pb-20 relative">
        <div className="relative">
          {/* Central Vertical Yellow Spine Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-neutral-800 -translate-x-1/2 rounded-full z-0">
            {/* Animated filled yellow beam */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-full bg-gradient-to-b from-yellow-500 via-amber-400 to-yellow-300 shadow-[0_0_15px_rgba(234,179,8,0.7)] rounded-full"
            />
          </div>

          {/* Chronological Milestone List */}
          <div className="space-y-10 sm:space-y-12 relative z-10 pt-4">
            {MILESTONES.map((m, idx) => {
              const statusInfo = getMilestoneStatus(
                m,
                completedMilestones,
                nextActiveId,
                currentTimestamp
              );
              const isCompleted = statusInfo.status === 'completed';
              const isUrgent = statusInfo.status === 'urgent';
              const isOverdue = statusInfo.status === 'overdue';
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={m.id}
                  className={`flex flex-col md:flex-row items-start md:items-center w-full ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Card Section */}
                  <div className="w-full md:w-[calc(50%-44px)] pl-16 md:pl-0">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30, y: 10 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.4, delay: 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedMilestone(m)}
                      className={`group cursor-pointer p-5 rounded-2xl bg-neutral-950/85 backdrop-blur-md border-2 transition-all duration-300 relative shadow-xl ${
                        isCompleted
                          ? 'border-yellow-500/70 shadow-[0_0_20px_rgba(234,179,8,0.2)]'
                          : isUrgent
                          ? 'border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.35)] ring-2 ring-yellow-400/40'
                          : isOverdue
                          ? 'border-neutral-700 hover:border-yellow-500/50'
                          : 'border-neutral-800 hover:border-yellow-500/60'
                      }`}
                    >
                      {/* Top Badges Row */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border border-yellow-500/40 bg-yellow-500/10 text-yellow-400 font-mono">
                          {m.date}
                        </span>

                        {isCompleted ? (
                          <span className="flex items-center gap-1 text-xs font-bold text-yellow-400 bg-yellow-500/15 border border-yellow-500/30 px-2 py-0.5 rounded-full">
                            <CheckCircle size={12} /> Done
                          </span>
                        ) : isUrgent ? (
                          <span className="flex items-center gap-1.5 text-xs font-black text-black bg-yellow-400 border border-yellow-300 px-2.5 py-0.5 rounded-full animate-pulse shadow-[0_0_10px_rgba(250,204,21,0.6)]">
                            <Clock size={12} /> {statusInfo.label}
                          </span>
                        ) : isOverdue ? (
                          <span className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 bg-neutral-900 border border-neutral-700 px-2 py-0.5 rounded-full">
                            <AlertTriangle size={12} className="text-yellow-500" /> {statusInfo.label}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs font-medium text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-full">
                            <Calendar size={12} /> {statusInfo.label}
                          </span>
                        )}
                      </div>

                      {/* Milestone Title */}
                      <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors leading-snug">
                        {m.title}
                      </h3>

                      {/* Summary description */}
                      <p className="mt-1.5 text-xs sm:text-sm text-neutral-400 line-clamp-2 leading-relaxed">
                        {m.shortDescription}
                      </p>

                      {/* Annotation / Hand-written note */}
                      {m.annotation && (
                        <div className="mt-3 text-xs font-mono font-medium text-yellow-300 bg-yellow-950/30 border border-yellow-500/30 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                          <span>✎</span>
                          <span className="truncate">{m.annotation}</span>
                        </div>
                      )}

                      {/* Card Footer action link */}
                      <div className="mt-3.5 pt-2.5 border-t border-neutral-800 flex items-center justify-between text-xs font-bold text-neutral-400 group-hover:text-yellow-400 transition-colors">
                        <span>View Requirements & Tips</span>
                        <ChevronRight size={14} className="transition-transform group-hover:translate-x-1 text-yellow-400" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Central Bumblebee Node Anchor on Spine Line */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedMilestone(m)}
                      className="relative focus:outline-none z-20 group"
                      aria-label={m.title}
                    >
                      {/* Active glowing radar pulse */}
                      {isUrgent && (
                        <span className="absolute -inset-3 rounded-full bg-yellow-400 animate-ping opacity-70 pointer-events-none" />
                      )}

                      <div
                        className={`h-9 w-9 rounded-full border-4 border-black flex items-center justify-center transition-all duration-300 shadow-xl ${
                          isCompleted
                            ? 'bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.8)]'
                            : isUrgent
                            ? 'bg-yellow-400 text-black shadow-[0_0_25px_rgba(250,204,21,0.9)]'
                            : 'bg-neutral-900 border-neutral-700 text-yellow-400'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle size={16} className="text-black" />
                        ) : (
                          <span className="font-mono text-[11px] font-black">
                            {idx + 1}
                          </span>
                        )}
                      </div>
                    </motion.button>
                  </div>

                  {/* Empty spacer on opposite side for desktop grid balance */}
                  <div className="hidden md:block md:w-[calc(50%-44px)]" />
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Modal Dialog */}
      <MilestoneModal
        milestone={selectedMilestone}
        onClose={() => setSelectedMilestone(null)}
        isCompleted={selectedMilestone ? completedMilestones.includes(selectedMilestone.id) : false}
        onToggleComplete={handleToggleComplete}
      />

      {/* Bottom Footer in Bumblebee Theme */}
      <footer className="w-full mt-auto border-t border-neutral-900 py-4 px-6 bg-neutral-950 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-2">
        <div className="font-mono tracking-wider">
          <span className="font-bold text-yellow-400">IT4010</span> Research Project
        </div>
        <div className="font-bold text-white">
          RP 2027 Timeline Tracker <span className="text-yellow-400">⚡</span>
        </div>
        <div>Faculty of Computing</div>
      </footer>
    </div>
  );
};
