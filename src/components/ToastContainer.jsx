import React from 'react';

export default function ToastContainer({ toasts }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => {
        const bgClass =
          t.type === 'success'
            ? 'bg-sage-600 text-white'
            : t.type === 'warning'
            ? 'bg-peach-600 text-white'
            : 'bg-ink-800 text-white';
        return (
          <div
            key={t.id}
            className={`pointer-events-auto px-4 py-3 rounded-2xl text-xs font-semibold shadow-lg transition-all flex items-center gap-2 ${bgClass}`}
          >
            <span>{t.message}</span>
          </div>
        );
      })}
    </div>
  );
}
