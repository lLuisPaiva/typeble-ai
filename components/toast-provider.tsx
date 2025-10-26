"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type ToastVariant = "default" | "success" | "error";

type ToastOptions = {
  description?: string;
  message: string;
  variant?: ToastVariant;
};

type ToastRecord = ToastOptions & { id: number };

type ToastContextValue = {
  pushToast: (options: ToastOptions) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const pushToast = useCallback(
    ({ message, description, variant = "default" }: ToastOptions) => {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      setToasts((prev) => [...prev, { id, message, description, variant }]);

      const timeout = window.setTimeout(() => removeToast(id), 4500);
      return () => window.clearTimeout(timeout);
    },
    [removeToast]
  );

  const value = useMemo<ToastContextValue>(() => ({ pushToast }), [pushToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[3000] flex w-[min(92vw,340px)] flex-col gap-3 sm:right-6 sm:top-6">
        <AnimatePresence>
          {toasts.map((toast) => {
            const colorClasses = getVariantClasses(toast.variant ?? "default");
            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className={`pointer-events-auto rounded border px-4 py-3 shadow-xl backdrop-blur-sm ${colorClasses}`}
              >
                <div className="text-sm font-semibold uppercase tracking-[0.25em]">
                  {toast.variant === "success" && "SUCCESS"}
                  {toast.variant === "error" && "ERROR"}
                  {toast.variant === "default" && "NOTICE"}
                </div>
                <div className="mt-1 text-base font-medium leading-snug">
                  {toast.message}
                </div>
                {toast.description ? (
                  <div className="mt-1 text-sm opacity-80">{toast.description}</div>
                ) : null}
                <button
                  type="button"
                  onClick={() => removeToast(toast.id)}
                  className="mt-3 inline-flex text-xs uppercase tracking-[0.32em] text-white/70 underline-offset-4 transition hover:text-white"
                >
                  Dismiss
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

function getVariantClasses(variant: ToastVariant) {
  switch (variant) {
    case "success":
      return "border-emerald-400/70 bg-emerald-500/10 text-emerald-100";
    case "error":
      return "border-red-400/70 bg-red-500/10 text-red-100";
    default:
      return "border-neutral-700/80 bg-neutral-900/90 text-neutral-50";
  }
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
