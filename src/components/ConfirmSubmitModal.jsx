import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function ConfirmSubmitModal({ open, answeredCount, total, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onCancel} className="fixed inset-0 bg-ink-800/40 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl border border-cream-200 shadow-2xl p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-peach-100 text-peach-700 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-ink-800">
              Submit Incomplete Assessment?
            </h3>
            <p className="text-xs text-ink-600 mt-1 leading-relaxed">
              You have answered {answeredCount} of {total} questions. Unanswered questions will be
              marked incorrect. Submit anyway?
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-cream-100 hover:bg-cream-200 text-ink-700 text-xs font-semibold"
          >
            Keep Answering
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold shadow-sm"
          >
            Submit Anyway
          </button>
        </div>
      </div>
    </div>
  );
}
