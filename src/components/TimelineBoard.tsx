'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  Zap
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
        particleCount: 90,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#eab308', '#f59e0b', '#0f172a', '#10b981'],
      });
    } else {
      updated = completedMilestones.filter((mId) => mId !== id);
    }

    setCompletedMilestones(updated);
    localStorage.setItem('rp_completed_milestones', JSON.stringify(updated));
  };

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
    <div className="w-full flex flex-col items-center min-h-screen bg-transparent text-slate-800 selection:bg-amber-400 selection:text-black">
      {/* Top Banner Header */}
      <header className="w-full max-w-4xl mx-auto px-4 pt-10 pb-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-black uppercase tracking-wider mb-3 shadow-sm backdrop-blur-sm"
        >
          <Zap size={14} className="fill-amber-500 text-amber-500" />
          IT4010 Research Project • Faculty of Computing
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900"
        >
          The <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent">2027 RP journey</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-2 text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto"
        >
          Start before January —{' '}
          <span className="font-bold text-amber-700">
            the strongest teams do not wait for the semester to begin.
          </span>
        </motion.p>

        {/* Dynamic Focus Alert Callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 rounded-2xl bg-white/90 backdrop-blur-md border-2 border-amber-400/80 p-4 shadow-xl shadow-amber-500/5 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-50/50 via-yellow-50/30 to-amber-50/50 pointer-events-none" />
          <div className="relative z-10 flex items-center justify-center gap-2.5">
            <span className="flex items-center justify-center h-7 w-7 rounded-full bg-amber-400 text-slate-950 font-black shadow-sm">
              <Target size={16} />
            </span>
            <p className="text-sm sm:text-base font-bold tracking-wide text-slate-900">
              {nextActiveMilestone ? (
                <>
                  Next Critical Target:{' '}
                  <span className="text-amber-600 font-black underline decoration-amber-500 decoration-2 underline-offset-4">
                    {nextActiveMilestone.title} ({nextActiveMilestone.date})
                  </span>
                </>
              ) : (
                <span className="text-emerald-600 font-black">
                  🎉 All milestones completed! Ready for Final Defense!
                </span>
              )}
            </p>
          </div>
        </motion.div>

        {/* Progress Tracker Card */}
        <div className="mt-5 bg-white/85 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-md flex items-center gap-4">
          <div className="flex-1 text-left">
            <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
              <span>Overall Milestone Progress</span>
              <span className="text-amber-600 font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200/60">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full"
              />
            </div>
          </div>
          <div className="text-right text-xs font-medium text-slate-500 border-l border-slate-200 pl-4">
            <span className="text-slate-900 font-bold text-sm">{completedMilestones.length}</span> / {MILESTONES.length}
            <div>Completed</div>
          </div>
        </div>

        {/* Chronological Spine Direction Marker */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          <span>Inception / Past</span>
          <ArrowDown size={14} className="text-amber-500 animate-bounce" />
          <span>Future Target</span>
        </div>
      </header>

      {/* Vertical Spine Timeline */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 pb-20 relative">
        <div className="relative">
          {/* Central Vertical Amber Spine Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 -translate-x-1/2 rounded-full z-0">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-full bg-gradient-to-b from-amber-400 via-yellow-500 to-amber-600 shadow-md rounded-full"
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
                      className={`group cursor-pointer p-5 rounded-2xl bg-white/95 backdrop-blur-md border-2 transition-all duration-300 relative shadow-lg ${
                        isCompleted
                          ? 'border-emerald-500/80 shadow-emerald-500/10'
                          : isUrgent
                          ? 'border-amber-500 shadow-xl shadow-amber-500/20 ring-4 ring-amber-400/20'
                          : isOverdue
                          ? 'border-slate-300 hover:border-amber-400'
                          : 'border-slate-200/90 hover:border-amber-400'
                      }`}
                    >
                      {/* Top Badges Row */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border border-amber-300 bg-amber-50 text-amber-800 font-mono">
                          {m.date}
                        </span>

                        {isCompleted ? (
                          <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full">
                            <CheckCircle size={12} /> Done
                          </span>
                        ) : isUrgent ? (
                          <span className="flex items-center gap-1.5 text-xs font-black text-slate-950 bg-amber-400 border border-amber-300 px-2.5 py-0.5 rounded-full animate-pulse shadow-sm">
                            <Clock size={12} /> {statusInfo.label}
                          </span>
                        ) : isOverdue ? (
                          <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                            <AlertTriangle size={12} className="text-amber-600" /> {statusInfo.label}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                            <Calendar size={12} /> {statusInfo.label}
                          </span>
                        )}
                      </div>

                      {/* Milestone Title */}
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                        {m.title}
                      </h3>

                      {/* Summary description */}
                      <p className="mt-1.5 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {m.shortDescription}
                      </p>

                      {/* Annotation / Hand-written note */}
                      {m.annotation && (
                        <div className="mt-3 text-xs font-mono font-medium text-amber-900 bg-amber-50/80 border border-amber-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                          <span>✎</span>
                          <span className="truncate">{m.annotation}</span>
                        </div>
                      )}

                      {/* Card Footer action link */}
                      <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-amber-600 transition-colors">
                        <span>View Requirements & Tips</span>
                        <ChevronRight size={14} className="transition-transform group-hover:translate-x-1 text-amber-500" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Central Node Anchor */}
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
                        <span className="absolute -inset-3 rounded-full bg-amber-400 animate-ping opacity-60 pointer-events-none" />
                      )}

                      <div
                        className={`h-9 w-9 rounded-full border-4 border-white flex items-center justify-center transition-all duration-300 shadow-lg ${
                          isCompleted
                            ? 'bg-emerald-500 text-white shadow-md'
                            : isUrgent
                            ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300'
                            : 'bg-white border-slate-300 text-slate-700'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle size={16} className="text-white" />
                        ) : (
                          <span className="font-mono text-[11px] font-black">
                            {idx + 1}
                          </span>
                        )}
                      </div>
                    </motion.button>
                  </div>

                  {/* Empty spacer for grid balance */}
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
      <footer className="w-full mt-auto border-t border-slate-200/80 py-4 px-6 bg-white/80 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <div className="font-mono tracking-wider">
          <span className="font-bold text-amber-600">IT4010</span> Research Project
        </div>
        <div className="font-bold text-slate-800">
          RP 2027 Timeline Tracker <span className="text-amber-500">⚡</span>
        </div>
        <div>Faculty of Computing</div>
      </footer>
    </div>
  );
};
