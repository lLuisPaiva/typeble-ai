"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  cloneElement,
  createContext,
  type MouseEvent as ReactMouseEvent,
  type ReactElement,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";

const DialogContext = createContext<{
  open: boolean;
  setOpen: (next: boolean) => void;
}>({ open: false, setOpen: () => undefined });

const DialogContentContext = createContext<{
  descriptionId?: string;
  setDescriptionId: (id?: string) => void;
  setTitleId: (id?: string) => void;
  titleId?: string;
} | null>(null);

function useDialogContext() {
  return useContext(DialogContext);
}

function useDialogContentContext() {
  const context = useContext(DialogContentContext);
  if (!context) {
    throw new Error("Dialog content components must be used within DialogContent");
  }
  return context;
}

type DialogProps = {
  children: ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
};

export function Dialog({ children, defaultOpen = false, onOpenChange, open }: DialogProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const currentOpen = isControlled ? open : internalOpen;

  const contextValue = useMemo(
    () => ({
      open: currentOpen,
      setOpen: (next: boolean) => {
        if (!isControlled) {
          setInternalOpen(next);
        }
        onOpenChange?.(next);
      },
    }),
    [currentOpen, isControlled, onOpenChange],
  );

  return <DialogContext.Provider value={contextValue}>{children}</DialogContext.Provider>;
}

type DialogTriggerProps = {
  asChild?: boolean;
  children: ReactElement;
};

export function DialogTrigger({ asChild = false, children }: DialogTriggerProps) {
  const { setOpen } = useDialogContext();

  if (asChild) {
    const element = children as ReactElement<any>;
    const handleClick = (event: ReactMouseEvent) => {
      element.props?.onClick?.(event);
      setOpen(true);
    };

    return cloneElement(
      element,
      {
        onClick: handleClick,
        "data-dialog-trigger": true,
      } as Partial<typeof element.props> & { "data-dialog-trigger": boolean },
    );
  }

  return (
    <button type="button" onClick={() => setOpen(true)} data-dialog-trigger>
      {children}
    </button>
  );
}

type DialogContentProps = {
  children: ReactNode;
  className?: string;
};

export function DialogContent({ children, className }: DialogContentProps) {
  const { open, setOpen } = useDialogContext();
  const [mounted, setMounted] = useState(false);
  const [titleId, setTitleId] = useState<string | undefined>();
  const [descriptionId, setDescriptionId] = useState<string | undefined>();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !open) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [mounted, open, setOpen]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <DialogContentContext.Provider value={{ titleId, setTitleId, descriptionId, setDescriptionId }}>
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-hidden="true"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              className={cn(
                "relative z-10 w-full max-w-xl border border-white/10 bg-[#0a0a0a] p-8 text-white shadow-2xl",
                className,
              )}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </motion.div>
        </DialogContentContext.Provider>
      )}
    </AnimatePresence>,
    document.body,
  );
}

type DialogHeaderProps = {
  children: ReactNode;
  className?: string;
};

export function DialogHeader({ children, className }: DialogHeaderProps) {
  return <div className={cn("space-y-2", className)}>{children}</div>;
}

type DialogTitleProps = {
  children: ReactNode;
  className?: string;
};

export function DialogTitle({ children, className }: DialogTitleProps) {
  const { setTitleId } = useDialogContentContext();
  const [id] = useState(() => `dialog-title-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    setTitleId(id);
    return () => setTitleId(undefined);
  }, [id, setTitleId]);

  return (
    <h2 id={id} className={cn("text-2xl font-semibold tracking-tight", className)}>
      {children}
    </h2>
  );
}

type DialogDescriptionProps = {
  children: ReactNode;
  className?: string;
};

export function DialogDescription({ children, className }: DialogDescriptionProps) {
  const { setDescriptionId } = useDialogContentContext();
  const [id] = useState(() => `dialog-description-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    setDescriptionId(id);
    return () => setDescriptionId(undefined);
  }, [id, setDescriptionId]);

  return (
    <p id={id} className={cn("text-sm text-white/70", className)}>
      {children}
    </p>
  );
}

type DialogFooterProps = {
  children: ReactNode;
  className?: string;
};

export function DialogFooter({ children, className }: DialogFooterProps) {
  return <div className={cn("mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end", className)}>{children}</div>;
}

type DialogCloseProps = {
  children: ReactNode;
  className?: string;
};

export function DialogClose({ children, className }: DialogCloseProps) {
  const { setOpen } = useDialogContext();
  return (
    <button
      type="button"
      onClick={() => setOpen(false)}
      className={cn(
        "inline-flex items-center justify-center border border-white/30 px-5 py-2 text-sm uppercase tracking-[0.3em] text-white transition hover:border-white hover:bg-white/10",
        className,
      )}
    >
      {children}
    </button>
  );
}
