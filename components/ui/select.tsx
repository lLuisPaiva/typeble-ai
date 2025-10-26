"use client";

import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useState,
} from "react";

type SelectOption = {
  description?: string;
  label: string;
  value: string;
};

type SelectProps = {
  className?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  value?: string | null;
};

export function Select({
  className,
  disabled = false,
  onChange,
  options,
  placeholder = "Select an option",
  value,
}: SelectProps) {
  const [internalValue, setInternalValue] = useState<string | null>(value ?? null);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value ?? null : internalValue;

  const selectedOption = useMemo(
    () => options.find((option) => option.value === currentValue) ?? null,
    [currentValue, options],
  );

  const selectOption = useCallback(
    (nextValue: string) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onChange?.(nextValue);
      setOpen(false);
      triggerRef.current?.focus();
    },
    [isControlled, onChange],
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const initialIndex = selectedOption ? options.findIndex((option) => option.value === selectedOption.value) : 0;
    setHighlightedIndex(initialIndex >= 0 ? initialIndex : 0);
  }, [open, options, selectedOption]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (triggerRef.current?.contains(event.target as Node)) {
        return;
      }
      if (listRef.current?.contains(event.target as Node)) {
        return;
      }
      setOpen(false);
    };

    const handleKeyNavigation = (event: KeyboardEvent) => {
      if (!open) {
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setHighlightedIndex((prev) => {
          const next = prev + 1;
          return next >= options.length ? 0 : next;
        });
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setHighlightedIndex((prev) => {
          const next = prev - 1;
          return next < 0 ? options.length - 1 : next;
        });
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const option = options[highlightedIndex];
        if (option) {
          selectOption(option.value);
        }
      }

      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyNavigation);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyNavigation);
    };
  }, [highlightedIndex, open, options, selectOption]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const highlightedItem = listRef.current?.children[highlightedIndex] as HTMLElement | undefined;
    highlightedItem?.scrollIntoView({ block: "nearest" });
  }, [highlightedIndex, open]);

  useEffect(() => {
    if (isControlled) {
      return;
    }
    setInternalValue(value ?? null);
  }, [isControlled, value]);

  const toggleOpen = () => {
    if (disabled) {
      return;
    }
    setOpen((prev) => !prev);
  };

  const handleTriggerKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setOpen(true);
      }
    },
    []
  );

  return (
    <div className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={toggleOpen}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          "flex w-full items-start justify-between gap-3 border border-white/20 bg-black/60 px-4 py-3 text-left transition",
          disabled ? "cursor-not-allowed opacity-60" : "hover:border-white/40",
        )}
      >
        <span className="flex-1">
          <span className="block text-sm text-white">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {selectedOption?.description && (
            <span className="mt-1 block text-xs text-white/50">{selectedOption.description}</span>
          )}
        </span>
        <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-white/70" aria-hidden="true" />
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          className="absolute left-0 right-0 z-50 mt-2 max-h-64 overflow-auto border border-white/20 bg-black/90 backdrop-blur-md shadow-2xl"
        >
          {options.map((option, index) => {
            const isSelected = option.value === currentValue;
            const isHighlighted = index === highlightedIndex;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => selectOption(option.value)}
                onMouseEnter={() => setHighlightedIndex(index)}
                onMouseDown={(event: ReactMouseEvent<HTMLLIElement>) => event.preventDefault()}
                className={cn(
                  "cursor-pointer border-b border-white/5 px-4 py-3 transition last:border-none",
                  isHighlighted ? "bg-white/15" : "hover:bg-white/10",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-white">{option.label}</p>
                    {option.description && <p className="mt-1 text-xs text-white/60">{option.description}</p>}
                  </div>
                  {isSelected && <Check className="mt-1 h-4 w-4 text-white" aria-hidden="true" />}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
