'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Milestone } from '@/data/timelineData';
import { X, Calendar, CheckCircle2, AlertCircle, Lightbulb, ExternalLink } from 'lucide-react';

interface MilestoneModalProps {
  milestone: Milestone | null;
  onClose: () => void;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
}

export const MilestoneModal: React.FC<MilestoneModalProps> = ({
  milestone,
  onClose,
  isCompleted,
  onToggleComplete,
}) => {
  if (!milestone) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-100"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-md border"
                  style={{ borderColor: milestone.color, color: milestone.color }}
                >
                  {milestone.date}
                </span>
                {milestone.annotation && (
                  <span className="text-xs bg-slate-800 text-amber-300 font-medium px-2 py-0.5 rounded-full border border-amber-500/20">
                    ✍️ {milestone.annotation}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {milestone.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Description */}
          <div className="my-4 text-slate-300 leading-relaxed text-sm bg-slate-800/40 p-3.5 rounded-xl border border-slate-800">
            {milestone.shortDescription}
          </div>

          {/* Key Deliverables & Requirements */}
          <div className="space-y-3 mb-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              Key Deliverables & Action Items
            </h4>
            <ul className="space-y-2">
              {milestone.detailedRequirements.map((req, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-slate-200 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/40"
                >
                  <span className="mt-1 h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: milestone.color }} />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tips for High Scoring */}
          {milestone.tips && milestone.tips.length > 0 && (
            <div className="space-y-3 mb-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Lightbulb size={16} />
                Pro-Tips & Evaluator Insights
              </h4>
              <div className="space-y-2">
                {milestone.tips.map((tip, i) => (
                  <div
                    key={i}
                    className="text-xs leading-relaxed text-amber-200/90 bg-amber-950/20 border border-amber-800/40 rounded-lg p-2.5"
                  >
                    💡 {tip}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => onToggleComplete(milestone.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isCompleted
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              <CheckCircle2 size={17} className={isCompleted ? 'text-white' : 'text-slate-400'} />
              {isCompleted ? 'Completed' : 'Mark as Done'}
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/30"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
