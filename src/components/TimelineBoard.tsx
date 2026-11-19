'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MILESTONES, Milestone } from '@/data/timelineData';
import { MilestoneCard } from './MilestoneCard';
import { MilestoneModal } from './MilestoneModal';
import { Target, Sparkles, CheckCircle, Clock, BookOpen, Users, Compass, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export const TimelineBoard: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [completedMilestones, setCompletedMilestones] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#6366f1', '#10b981', '#f59e0b', '#ec4899'],
      });
    } else {
      updated = completedMilestones.filter((mId) => mId !== id);
    }

    setCompletedMilestones(updated);
    localStorage.setItem('rp_completed_milestones', JSON.stringify(updated));
  };

  const progressPercent = Math.round((completedMilestones.length / MILESTONES.length) * 100);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Banner (Header section matching the original image) */}
      <header className="w-full text-center max-w-5xl mx-auto px-4 pt-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3"
        >
          <Award size={14} />
          IT4010 Research Project • Faculty of Computing
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white"
        >
          The <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">2027 RP journey</span> at a glance
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium"
        >
          Start before January —{' '}
          <span className="font-bold text-slate-900 dark:text-amber-300">
            the strongest teams do not wait for the semester to begin.
          </span>
        </motion.p>

        {/* Progress Bar & Quick Stats */}
        <div className="mt-6 max-w-md mx-auto bg-slate-100 dark:bg-slate-900/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="flex-1 text-left">
            <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              <span>Overall RP Progress</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full"
              />
            </div>
          </div>
          <div className="text-right text-xs font-medium text-slate-500 dark:text-slate-400 border-l border-slate-200 dark:border-slate-800 pl-3">
            <span className="text-slate-900 dark:text-white font-bold">{completedMilestones.length}</span> / {MILESTONES.length}
            <div>Done</div>
          </div>
        </div>
      </header>

      {/* Main Timeline Section (Desktop Horizontal + Scrollable) */}
      <section className="w-full mt-6 mb-8 px-4 sm:px-6 overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <div className="min-w-[1280px] max-w-7xl mx-auto relative pt-36 pb-36">
          {/* Main Central Timeline Axis */}
          <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-slate-200 dark:bg-slate-700/80 z-0 rounded-full">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-purple-500 via-sky-500 via-emerald-500 to-cyan-500 origin-left"
            />
          </div>

          {/* Timeline Nodes Grid */}
          <div className="relative z-10 grid grid-cols-9 gap-4 items-center">
            {MILESTONES.map((m, idx) => {
              const isCompleted = completedMilestones.includes(m.id);
              const isTop = m.position === 'top';

              return (
                <div key={m.id} className="relative flex flex-col items-center">
                  {/* Card on TOP */}
                  {isTop && (
                    <div className="absolute bottom-8 mb-4 flex flex-col items-center">
                      <MilestoneCard
                        milestone={m}
                        isCompleted={isCompleted}
                        onSelect={() => setSelectedMilestone(m)}
                        index={idx}
                      />
                      {/* Stem connector */}
                      <div
                        className="w-0.5 h-6 transition-colors"
                        style={{ backgroundColor: m.color }}
                      />
                    </div>
                  )}

                  {/* Node Dot on central line */}
                  <motion.button
                    whileHover={{ scale: 1.35 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMilestone(m)}
                    className="relative group focus:outline-none"
                    aria-label={m.title}
                  >
                    {/* Ring highlight on pulse */}
                    {m.deadlineStatus === 'urgent' && (
                      <span
                        className="absolute -inset-2 rounded-full animate-ping opacity-50"
                        style={{ backgroundColor: m.color }}
                      />
                    )}

                    <div
                      className={`h-7 w-7 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center transition-all duration-300 shadow-md ${
                        isCompleted ? 'bg-emerald-500' : ''
                      }`}
                      style={{
                        backgroundColor: isCompleted ? undefined : m.color,
                        boxShadow: `0 0 16px ${m.color}80`,
                      }}
                    >
                      {isCompleted ? (
                        <CheckCircle size={14} className="text-white" />
                      ) : (
                        <span className="h-2 w-2 rounded-full bg-white" />
                      )}
                    </div>
                  </motion.button>

                  {/* Card on BOTTOM */}
                  {!isTop && (
                    <div className="absolute top-8 mt-4 flex flex-col items-center">
                      {/* Stem connector */}
                      <div
                        className="w-0.5 h-6 transition-colors"
                        style={{ backgroundColor: m.color }}
                      />
                      <MilestoneCard
                        milestone={m}
                        isCompleted={isCompleted}
                        onSelect={() => setSelectedMilestone(m)}
                        index={idx}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Immediate Target Callout Box (Exactly like in the uploaded graphic) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-4xl mx-auto px-4 mb-10"
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/30 p-5 shadow-2xl text-center text-white">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Target size={18} />
            </span>
            <p className="text-base sm:text-lg font-bold tracking-wide">
              Your immediate target:{' '}
              <span className="text-amber-300 font-extrabold underline decoration-amber-400/60 decoration-2 underline-offset-4">
                group + supervisor + topic + TAF before January
              </span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Mobile-Friendly Vertical Timeline fallback for smaller screens */}
      <div className="w-full max-w-md mx-auto px-4 sm:hidden mb-12">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 text-center mb-6">
          Vertical List View
        </h3>
        <div className="relative pl-6 border-l-2 border-slate-700/60 space-y-6">
          {MILESTONES.map((m) => {
            const isCompleted = completedMilestones.includes(m.id);
            return (
              <div key={m.id} className="relative cursor-pointer" onClick={() => setSelectedMilestone(m)}>
                <span
                  className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-slate-900"
                  style={{ backgroundColor: isCompleted ? '#10b981' : m.color }}
                />
                <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold" style={{ color: m.color }}>
                      {m.date}
                    </span>
                    {m.deadlineStatus === 'urgent' && (
                      <span className="text-[10px] text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded">
                        Target
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white">{m.title}</h4>
                  {m.annotation && (
                    <p className="text-[11px] text-amber-300 font-mono mt-1">✎ {m.annotation}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Dialog */}
      <MilestoneModal
        milestone={selectedMilestone}
        onClose={() => setSelectedMilestone(null)}
        isCompleted={selectedMilestone ? completedMilestones.includes(selectedMilestone.id) : false}
        onToggleComplete={handleToggleComplete}
      />

      {/* Bottom Footer Ribbon matching graphic */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 py-4 px-6 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
        <div className="font-mono tracking-wider">
          <span className="font-bold text-indigo-500">IT4010</span> Research Project
        </div>
        <div className="font-semibold text-slate-700 dark:text-slate-300">
          RP 2027 Timeline Tracker
        </div>
        <div>Faculty of Computing</div>
      </footer>
    </div>
  );
};
