import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Trophy, Flame, CheckCircle, Info, X, Zap } from "lucide-react";

export type ToastType = "success" | "achievement" | "karma" | "streak" | "info";

export interface ToastItem {
  id: string;
  title: string;
  message: string;
  type: ToastType;
  icon?: string;
  duration?: number;
}

interface ToastOptions {
  type?: ToastType;
  icon?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (title: string, message: string, options?: ToastOptions) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (title: string, message: string, options?: ToastOptions) => {
      const id = "toast_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 6);
      const newToast: ToastItem = {
        id,
        title,
        message,
        type: options?.type || "success",
        icon: options?.icon,
        duration: options?.duration || 4000,
      };

      setToasts((prev) => {
        // Stacking maximum of 3 notifications at once
        const updated = [...prev, newToast];
        if (updated.length > 3) {
          return updated.slice(updated.length - 3);
        }
        return updated;
      });

      // Auto dismiss after duration
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

/* Floating Toast Container & Animated Items */
const ToastContainer = ({
  toasts,
  onClose,
}: {
  toasts: ToastItem[];
  onClose: (id: string) => void;
}) => {
  return (
    <div
      className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-[calc(100vw-2.5rem)] pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} onClose={() => onClose(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const ToastCard = ({ toast, onClose }: { toast: ToastItem; onClose: () => void; key?: React.Key }) => {
  const getStyles = (type: ToastType) => {
    switch (type) {
      case "achievement":
        return {
          container:
            "bg-slate-900/90 text-slate-100 border-amber-400/50 shadow-amber-500/15 shadow-xl backdrop-blur-xl",
          iconBg: "bg-amber-500/20 text-amber-300 border border-amber-400/30",
          defaultIcon: <Trophy className="w-5 h-5 text-amber-400 shrink-0 animate-bounce" />,
          accentColor: "text-amber-400",
        };
      case "karma":
        return {
          container:
            "bg-slate-900/90 text-slate-100 border-emerald-400/50 shadow-emerald-500/15 shadow-xl backdrop-blur-xl",
          iconBg: "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30",
          defaultIcon: <Zap className="w-5 h-5 text-emerald-400 fill-emerald-400 shrink-0" />,
          accentColor: "text-emerald-400",
        };
      case "streak":
        return {
          container:
            "bg-slate-900/90 text-slate-100 border-rose-400/50 shadow-rose-500/15 shadow-xl backdrop-blur-xl",
          iconBg: "bg-rose-500/20 text-rose-300 border border-rose-400/30",
          defaultIcon: <Flame className="w-5 h-5 text-rose-400 fill-rose-400 shrink-0" />,
          accentColor: "text-rose-400",
        };
      case "info":
        return {
          container:
            "bg-slate-900/90 text-slate-100 border-sky-400/50 shadow-sky-500/15 shadow-xl backdrop-blur-xl",
          iconBg: "bg-sky-500/20 text-sky-300 border border-sky-400/30",
          defaultIcon: <Info className="w-5 h-5 text-sky-400 shrink-0" />,
          accentColor: "text-sky-400",
        };
      case "success":
      default:
        return {
          container:
            "bg-slate-900/90 text-slate-100 border-teal-400/50 shadow-teal-500/15 shadow-xl backdrop-blur-xl",
          iconBg: "bg-teal-500/20 text-teal-300 border border-teal-400/30",
          defaultIcon: <CheckCircle className="w-5 h-5 text-teal-400 shrink-0" />,
          accentColor: "text-teal-400",
        };
    }
  };

  const style = getStyles(toast.type);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.92, x: 20 }}
      animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
      exit={{ opacity: 0, y: 12, scale: 0.9, x: 30, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={`pointer-events-auto relative p-3.5 rounded-2xl border flex items-start gap-3 shadow-2xl overflow-hidden ${style.container}`}
    >
      {/* Decorative subtle ambient glow line */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${style.accentColor.replace('text-', 'bg-')}`} />

      {/* Icon */}
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base font-bold ${style.iconBg}`}
      >
        {toast.icon ? toast.icon : style.defaultIcon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-2 pt-0.5">
        <h4 className={`text-xs font-extrabold tracking-wide uppercase ${style.accentColor}`}>
          {toast.title}
        </h4>
        <p className="text-xs font-semibold text-slate-200 mt-0.5 leading-snug break-words">
          {toast.message}
        </p>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
        aria-label="Đóng thông báo"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
};
