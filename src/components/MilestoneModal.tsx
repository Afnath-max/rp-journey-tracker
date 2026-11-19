'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Milestone } from '@/data/timelineData';
import { X, CheckCircle2, Lightbulb } from 'lucide-react';

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
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        {/* Crisp Executive Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 text-slate-800"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 text-xs font-black uppercase tracking-wider rounded-md border border-amber-300 bg-amber-50 text-amber-800 font-mono">
                  {milestone.date}
                </span>
                {milestone.annotation && (
                  <span className="text-xs bg-amber-50 text-amber-900 font-medium px-2 py-0.5 rounded-full border border-amber-200">
                    ✍️ {milestone.annotation}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {milestone.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Description */}
          <div className="my-4 text-slate-600 leading-relaxed text-sm bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            {milestone.shortDescription}
          </div>

          {/* Key Deliverables & Requirements */}
          <div className="space-y-3 mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-amber-600" />
              Key Deliverables & Action Items
            </h4>
            <ul className="space-y-2">
              {milestone.detailedRequirements.map((req, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 bg-amber-500" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tips for High Scoring */}
          {milestone.tips && milestone.tips.length > 0 && (
            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-2">
                <Lightbulb size={16} className="text-amber-600" />
                Pro-Tips & Evaluator Insights
              </h4>
              <div className="space-y-2">
                {milestone.tips.map((tip, i) => (
                  <div
                    key={i}
                    className="text-xs leading-relaxed text-amber-900 bg-amber-50/80 border border-amber-200 rounded-lg p-2.5"
                  >
                    💡 {tip}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => onToggleComplete(milestone.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                isCompleted
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              <CheckCircle2 size={17} className={isCompleted ? 'text-white' : 'text-slate-500'} />
              {isCompleted ? 'Completed' : 'Mark as Done'}
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-sm font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition-all shadow-md shadow-amber-400/20"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
