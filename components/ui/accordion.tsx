"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useId,
  useMemo,
  useState,
} from "react";
import { cn } from "@/lib/utils";

type AccordionContextValue = {
  value: string | null;
  setValue: Dispatch<SetStateAction<string | null>>;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within AccordionSingle");
  }
  return context;
}

type AccordionSingleProps = {
  children: ReactNode;
  className?: string;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  value?: string | null;
};

export function AccordionSingle({
  children,
  className,
  defaultValue = null,
  onValueChange,
  value,
}: AccordionSingleProps) {
  const [internalValue, setInternalValue] = useState<string | null>(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value ?? null : internalValue;

  const contextValue = useMemo<AccordionContextValue>(
    () => ({
      value: currentValue,
      setValue: (next) => {
        const resolvedValue = typeof next === "function" ? (next as (prev: string | null) => string | null)(currentValue) : next;
        if (!isControlled) {
          setInternalValue(resolvedValue);
        }
        onValueChange?.(resolvedValue);
      },
    }),
    [currentValue, isControlled, onValueChange],
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={cn("space-y-4", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

type AccordionItemProps = {
  children: ReactNode;
  className?: string;
  description?: ReactNode;
  eyebrow?: string;
  title: string;
  value: string;
};

export function AccordionItem({
  children,
  className,
  description,
  eyebrow,
  title,
  value,
}: AccordionItemProps) {
  const { value: activeValue, setValue } = useAccordionContext();
  const isOpen = activeValue === value;
  const triggerId = useId();
  const panelId = `${triggerId}-panel`;

  return (
    <div className={cn("border border-white/15 bg-white/5 backdrop-blur-sm", className)}>
      <button
        type="button"
        onClick={() => setValue((prev) => (prev === value ? null : value))}
        className="flex w-full items-start justify-between gap-6 px-6 py-5 text-left text-white transition hover:bg-white/5"
        aria-expanded={isOpen}
        aria-controls={panelId}
        id={triggerId}
      >
        <div className="flex-1">
          {eyebrow && <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">{eyebrow}</p>}
          <h3 className="mt-1 text-xl font-semibold tracking-tight text-white">{title}</h3>
          {description && <p className="mt-2 text-sm text-white/70">{description}</p>}
        </div>
        <ChevronDown
          className={cn(
            "mt-1 h-5 w-5 shrink-0 text-white transition-transform duration-300",
            isOpen ? "rotate-180" : "rotate-0",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            aria-labelledby={triggerId}
            id={panelId}
            role="region"
          >
            <div className="border-t border-white/10 px-6 py-5 text-sm leading-6 text-white/80">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
