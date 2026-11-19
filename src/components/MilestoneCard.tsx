'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Milestone, MilestoneComputedStatus } from '@/data/timelineData';
import { Check, ChevronRight, Clock, AlertTriangle, CalendarDays } from 'lucide-react';

interface MilestoneCardProps {
  milestone: Milestone;
  statusInfo: { status: MilestoneComputedStatus; daysDiff: number; label: string };
  onSelect: () => void;
  index: number;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({
  milestone,
  statusInfo,
  onSelect,
  index,
}) => {
  const { status, label } = statusInfo;
  const isCompleted = status === 'completed';
  const isUrgent = status === 'urgent';
  const isOverdue = status === 'overdue';

  return (
    <motion.div
      initial={{ opacity: 0, y: milestone.position === 'top' ? -16 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: milestone.position === 'top' ? -4 : 4, scale: 1.02 }}
      onClick={onSelect}
      className={`group cursor-pointer w-48 p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-xl transition-all duration-300 relative border-2 ${
        isCompleted
          ? 'border-emerald-500 shadow-emerald-500/10'
          : isUrgent
          ? 'border-rose-500 shadow-rose-500/25 ring-2 ring-rose-500/20'
          : isOverdue
          ? 'border-amber-500 shadow-amber-500/15'
          : 'border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500'
      }`}
      style={{
        boxShadow: isUrgent
          ? `0 0 20px -3px ${milestone.color}50`
          : `0 8px 24px -6px ${milestone.color}25`,
      }}
    >
      {/* Header Pill & Dynamic Countdown Status */}
      <div className="flex items-center justify-between gap-1 mb-1.5">
        <span
          className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border"
          style={{
            borderColor: `${milestone.color}60`,
            backgroundColor: `${milestone.color}15`,
            color: milestone.color,
          }}
        >
          {milestone.date}
        </span>

        {isCompleted ? (
          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded-full">
            <Check size={10} strokeWidth={3} /> Done
          </span>
        ) : isUrgent ? (
          <span className="flex items-center gap-1 text-[10px] font-bold text-rose-500 bg-rose-500/10 border border-rose-500/40 px-1.5 py-0.5 rounded-full animate-pulse">
            <Clock size={10} /> {label}
          </span>
        ) : isOverdue ? (
          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-500/10 border border-amber-500/40 px-1.5 py-0.5 rounded-full">
            <AlertTriangle size={10} /> {label}
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-full">
            <CalendarDays size={10} /> {label}
          </span>
        )}
      </div>

      {/* Title */}
      <h4 className="text-[13px] font-bold text-slate-900 dark:text-slate-100 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
        {milestone.title}
      </h4>

      {/* Handwritten Annotation badge if present */}
      {milestone.annotation && (
        <div className="mt-1.5 text-[10px] font-mono font-medium text-amber-700 dark:text-amber-300/90 bg-amber-50 dark:bg-amber-950/40 border border-amber-300/60 dark:border-amber-800/50 px-1.5 py-0.5 rounded flex items-center gap-1">
          <span>✎</span>
          <span className="truncate">{milestone.annotation}</span>
        </div>
      )}

      {/* Click indicator */}
      <div className="mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] font-medium text-slate-500 dark:text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors">
        <span>View Details</span>
        <ChevronRight size={12} className="transition-transform group-hover:translate-x-0.5" />
      </div>
    </motion.div>
  );
};
