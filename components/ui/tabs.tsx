"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { cn } from "@/lib/utils";

type TabsContextValue = {
  orientation: "horizontal" | "vertical";
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within Tabs");
  }
  return context;
}

type TabsProps = {
  children: ReactNode;
  className?: string;
  defaultValue: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  value?: string;
};

export function Tabs({
  children,
  className,
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  value,
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const contextValue = useMemo(
    () => ({
      orientation,
      value: currentValue,
      setValue: (next: SetStateAction<string>) => {
        const resolvedValue =
          typeof next === "function"
            ? (next as (prev: string) => string)(currentValue)
            : next;
        if (!isControlled) {
          setInternalValue(resolvedValue);
        }
        onValueChange?.(resolvedValue);
      },
    }),
    [currentValue, isControlled, onValueChange, orientation],
  );

  useEffect(() => {
    if (!isControlled) {
      setInternalValue(defaultValue);
    }
  }, [defaultValue, isControlled]);

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

type TabsListProps = {
  children: ReactNode;
  className?: string;
};

export function TabsList({ children, className }: TabsListProps) {
  const { orientation } = useTabsContext();
  return (
    <div
      className={cn(
        "flex rounded-md border border-white/15 bg-white/5 p-1",
        orientation === "vertical" ? "flex-col" : "flex-row",
        className,
      )}
      role="tablist"
      aria-orientation={orientation}
    >
      {children}
    </div>
  );
}

type TabsTriggerProps = {
  children: ReactNode;
  className?: string;
  value: string;
};

export function TabsTrigger({ children, className, value }: TabsTriggerProps) {
  const { value: activeValue, setValue } = useTabsContext();
  const triggerId = `tabs-trigger-${value}`;
  const panelId = `tabs-panel-${value}`;
  const isActive = activeValue === value;

  return (
    <button
      type="button"
      role="tab"
      id={triggerId}
      aria-controls={panelId}
      aria-selected={isActive}
      onClick={() => setValue(value)}
      className={cn(
        "flex-1 rounded-sm px-4 py-3 text-sm font-medium uppercase tracking-[0.3em] transition",
        "text-white/60 hover:text-white",
        isActive && "bg-white text-black shadow",
        className,
      )}
    >
      {children}
    </button>
  );
}

type TabsContentProps = {
  children: ReactNode;
  className?: string;
  value: string;
};

export function TabsContent({ children, className, value }: TabsContentProps) {
  const { value: activeValue } = useTabsContext();
  const panelId = `tabs-panel-${value}`;
  const triggerId = `tabs-trigger-${value}`;

  if (activeValue !== value) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={triggerId}
      className={cn("mt-8", className)}
    >
      {children}
    </div>
  );
}
