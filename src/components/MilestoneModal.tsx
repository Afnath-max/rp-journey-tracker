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
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Bumblebee Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-neutral-950 border-2 border-yellow-500/40 rounded-2xl shadow-[0_0_50px_-10px_rgba(234,179,8,0.25)] p-6 text-neutral-100"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-800">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 text-xs font-black uppercase tracking-wider rounded-md border border-yellow-500/50 bg-yellow-500/10 text-yellow-400 font-mono">
                  {milestone.date}
                </span>
                {milestone.annotation && (
                  <span className="text-xs bg-yellow-950/40 text-yellow-300 font-medium px-2 py-0.5 rounded-full border border-yellow-500/30">
                    ✍️ {milestone.annotation}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-black text-yellow-400 tracking-tight">
                {milestone.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-yellow-400 hover:bg-neutral-900 border border-transparent hover:border-yellow-500/30 transition-all"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Description */}
          <div className="my-4 text-neutral-300 leading-relaxed text-sm bg-neutral-900/80 p-3.5 rounded-xl border border-neutral-800">
            {milestone.shortDescription}
          </div>

          {/* Key Deliverables & Requirements */}
          <div className="space-y-3 mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-yellow-400 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-yellow-400" />
              Key Deliverables & Action Items
            </h4>
            <ul className="space-y-2">
              {milestone.detailedRequirements.map((req, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-neutral-200 bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800/80"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 bg-yellow-400" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tips for High Scoring */}
          {milestone.tips && milestone.tips.length > 0 && (
            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-yellow-300 flex items-center gap-2">
                <Lightbulb size={16} className="text-yellow-400" />
                Pro-Tips & Evaluator Insights
              </h4>
              <div className="space-y-2">
                {milestone.tips.map((tip, i) => (
                  <div
                    key={i}
                    className="text-xs leading-relaxed text-yellow-200/90 bg-yellow-950/20 border border-yellow-500/30 rounded-lg p-2.5"
                  >
                    💡 {tip}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
            <button
              onClick={() => onToggleComplete(milestone.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                isCompleted
                  ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/30'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 hover:border-yellow-500/50'
              }`}
            >
              <CheckCircle2 size={17} className={isCompleted ? 'text-black' : 'text-neutral-400'} />
              {isCompleted ? 'Completed' : 'Mark as Done'}
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-sm font-bold bg-yellow-400 hover:bg-yellow-300 text-black transition-all shadow-md shadow-yellow-400/20"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
