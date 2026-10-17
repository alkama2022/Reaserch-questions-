import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div 
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        let borderClass = 'border-slate-200';
        let bgClass = 'bg-white';
        let icon = <Info className="w-4 h-4 text-[#0F9D8A] shrink-0" />;

        if (toast.type === 'success') {
          borderClass = 'border-emerald-200';
          icon = <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
        } else if (toast.type === 'warning') {
          borderClass = 'border-amber-200';
          icon = <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />;
        } else if (toast.type === 'error') {
          borderClass = 'border-red-200';
          icon = <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded shadow-lg border ${borderClass} ${bgClass} text-slate-800 transition-all flex items-start justify-between gap-3 animate-in slide-in-from-bottom-2`}
          >
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5">{icon}</div>
              <div>
                <div className="text-xs font-semibold text-slate-900">{toast.title}</div>
                {toast.message && (
                  <div className="text-xs text-slate-600 mt-0.5 leading-snug">{toast.message}</div>
                )}
              </div>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer shrink-0"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
