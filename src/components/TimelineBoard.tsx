'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MILESTONES, Milestone, getMilestoneStatus } from '@/data/timelineData';
import { MilestoneModal } from './MilestoneModal';
import {
  Target,
  CheckCircle,
  Award,
  Calendar,
  Clock,
  AlertTriangle,
  ChevronRight,
  ArrowDown,
  Sparkles,
  LayoutList,
  Columns
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const TimelineBoard: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [completedMilestones, setCompletedMilestones] = useState<string[]>([]);
  const [currentTimestamp, setCurrentTimestamp] = useState<number | null>(null);

  useEffect(() => {
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
    <div className="w-full flex flex-col items-center min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Top Banner Header */}
      <header className="w-full max-w-4xl mx-auto px-4 pt-10 pb-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3"
        >
          <Award size={14} />
          IT4010 Research Project • Faculty of Computing
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white"
        >
          The <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">2027 RP journey</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-2 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto"
        >
          Chronological Roadmap from <span className="text-purple-600 dark:text-purple-400 font-semibold">Inception</span> to{' '}
          <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Progress Defense</span>
        </motion.p>

        {/* Dynamic Focus Alert Callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/30 p-4 shadow-xl text-center text-white"
        >
          <div className="flex items-center justify-center gap-2.5">
            <span className="flex items-center justify-center h-7 w-7 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Target size={16} />
            </span>
            <p className="text-sm sm:text-base font-bold tracking-wide">
              {nextActiveMilestone ? (
                <>
                  Next Critical Deadline:{' '}
                  <span className="text-amber-300 font-extrabold underline decoration-amber-400/60 decoration-2 underline-offset-4">
                    {nextActiveMilestone.title} ({nextActiveMilestone.date})
                  </span>
                </>
              ) : (
                <span className="text-emerald-400 font-extrabold">
                  🎉 Congratulations! All milestones completed!
                </span>
              )}
            </p>
          </div>
        </motion.div>

        {/* Progress Tracker Card */}
        <div className="mt-5 bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md flex items-center gap-4">
          <div className="flex-1 text-left">
            <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
              <span>Overall Milestone Progress</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className="h-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 rounded-full"
              />
            </div>
          </div>
          <div className="text-right text-xs font-medium text-slate-500 dark:text-slate-400 border-l border-slate-200 dark:border-slate-800 pl-4">
            <span className="text-slate-900 dark:text-white font-bold text-sm">{completedMilestones.length}</span> / {MILESTONES.length}
            <div>Completed</div>
          </div>
        </div>

        {/* Flow indicator */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs font-medium text-slate-400 dark:text-slate-500">
          <span>Past / Kick-off</span>
          <ArrowDown size={14} className="animate-bounce" />
          <span>Future Deliverables</span>
        </div>
      </header>

      {/* Vertical Spine Timeline (Past -> Future) */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 pb-20 relative">
        <div className="relative">
          {/* Central Vertical Connecting Spine Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-800 -translate-x-1/2 rounded-full z-0">
            {/* Animated filled progress spine */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-full bg-gradient-to-b from-purple-500 via-indigo-500 to-emerald-400 rounded-full"
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
                  {/* Card Section (Alternates Left / Right on Desktop, Stacked on Mobile) */}
                  <div
                    className={`w-full md:w-[calc(50%-44px)] pl-16 md:pl-0 ${
                      isEven ? 'md:text-left' : 'md:text-left'
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30, y: 10 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.4, delay: 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedMilestone(m)}
                      className={`group cursor-pointer p-5 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border-2 transition-all duration-300 relative ${
                        isCompleted
                          ? 'border-emerald-500 shadow-emerald-500/10'
                          : isUrgent
                          ? 'border-rose-500 shadow-rose-500/20 ring-4 ring-rose-500/10'
                          : isOverdue
                          ? 'border-amber-500/80 shadow-amber-500/10'
                          : 'border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500'
                      }`}
                      style={{
                        boxShadow: isUrgent
                          ? `0 10px 30px -5px ${m.color}40`
                          : undefined,
                      }}
                    >
                      {/* Top Badges Row */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span
                          className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border font-mono"
                          style={{
                            borderColor: `${m.color}60`,
                            backgroundColor: `${m.color}15`,
                            color: m.color,
                          }}
                        >
                          {m.date}
                        </span>

                        {isCompleted ? (
                          <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                            <CheckCircle size={12} /> Done
                          </span>
                        ) : isUrgent ? (
                          <span className="flex items-center gap-1.5 text-xs font-bold text-rose-500 bg-rose-500/10 border border-rose-500/40 px-2 py-0.5 rounded-full animate-pulse">
                            <Clock size={12} /> {statusInfo.label}
                          </span>
                        ) : isOverdue ? (
                          <span className="flex items-center gap-1.5 text-xs font-bold text-amber-500 bg-amber-500/10 border border-amber-500/40 px-2 py-0.5 rounded-full">
                            <AlertTriangle size={12} /> {statusInfo.label}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                            <Calendar size={12} /> {statusInfo.label}
                          </span>
                        )}
                      </div>

                      {/* Milestone Title */}
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                        {m.title}
                      </h3>

                      {/* Summary description */}
                      <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {m.shortDescription}
                      </p>

                      {/* Annotation / Hand-written note */}
                      {m.annotation && (
                        <div className="mt-3 text-xs font-mono font-medium text-amber-700 dark:text-amber-300/90 bg-amber-50 dark:bg-amber-950/40 border border-amber-300/60 dark:border-amber-800/50 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                          <span>✎</span>
                          <span className="truncate">{m.annotation}</span>
                        </div>
                      )}

                      {/* Card Footer action link */}
                      <div className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors">
                        <span>View Requirements & Tips</span>
                        <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Central Node Anchor Dot on Spine Line */}
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
                        <span
                          className="absolute -inset-3 rounded-full animate-ping opacity-60 pointer-events-none"
                          style={{ backgroundColor: m.color }}
                        />
                      )}

                      <div
                        className={`h-9 w-9 rounded-full border-4 border-white dark:border-slate-950 flex items-center justify-center transition-all duration-300 shadow-lg ${
                          isCompleted ? 'bg-emerald-500' : ''
                        }`}
                        style={{
                          backgroundColor: isCompleted ? undefined : m.color,
                          boxShadow: `0 0 20px ${m.color}90`,
                        }}
                      >
                        {isCompleted ? (
                          <CheckCircle size={16} className="text-white" />
                        ) : (
                          <span className="text-white font-mono text-[11px] font-bold">
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

      {/* Bottom Footer */}
      <footer className="w-full mt-auto border-t border-slate-200 dark:border-slate-800/80 py-4 px-6 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
        <div className="font-mono tracking-wider">
          <span className="font-bold text-indigo-500">IT4010</span> Research Project
        </div>
        <div className="font-semibold text-slate-700 dark:text-slate-300">
          RP 2027 Chronological Timeline Tracker
        </div>
        <div>Faculty of Computing</div>
      </footer>
    </div>
  );
};
