'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Milestone } from '@/data/timelineData';
import { Check, Sparkles, ChevronRight, Clock } from 'lucide-react';

interface MilestoneCardProps {
  milestone: Milestone;
  isCompleted: boolean;
  onSelect: () => void;
  index: number;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({
  milestone,
  isCompleted,
  onSelect,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: milestone.position === 'top' ? -20 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: milestone.position === 'top' ? -6 : 6, scale: 1.02 }}
      onClick={onSelect}
      className={`group cursor-pointer w-48 sm:w-52 p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-md shadow-lg transition-all duration-300 relative border-2 ${
        isCompleted
          ? 'border-emerald-500 shadow-emerald-500/10'
          : 'border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500'
      }`}
      style={{
        boxShadow: `0 8px 24px -6px ${milestone.color}25`
      }}
    >
      {/* Target Marker Accent Pill on Top */}
      <div className="flex items-center justify-between gap-1 mb-2">
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
          <span className="flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500 text-white shadow-sm">
            <Check size={12} strokeWidth={3} />
          </span>
        ) : milestone.deadlineStatus === 'urgent' ? (
          <span className="flex items-center gap-1 text-[10px] font-bold text-rose-500 bg-rose-500/10 border border-rose-500/30 px-1.5 py-0.5 rounded-full animate-pulse">
            <Clock size={10} /> Target
          </span>
        ) : null}
      </div>

      {/* Title */}
      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
        {milestone.title}
      </h4>

      {/* Handwritten Annotation badge if present */}
      {milestone.annotation && (
        <div className="mt-2 text-[10px] font-mono font-medium text-amber-700 dark:text-amber-300/90 bg-amber-50 dark:bg-amber-950/40 border border-amber-300/60 dark:border-amber-800/50 px-1.5 py-0.5 rounded flex items-center gap-1">
          <span>✎</span>
          <span className="truncate">{milestone.annotation}</span>
        </div>
      )}

      {/* Click indicator */}
      <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors">
        <span>View Details</span>
        <ChevronRight size={13} className="transition-transform group-hover:translate-x-0.5" />
      </div>
    </motion.div>
  );
};
