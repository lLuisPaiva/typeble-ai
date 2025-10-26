"use client";

import * as Dialog from "@radix-ui/react-dialog";
import React, { ReactNode, useState } from "react";
import { X } from "lucide-react";
import ContactForm from "./contact-form";

interface ScheduleDialogProps {
  triggerLabel?: string;
  trigger?: ReactNode;
  onOpenChange?: (open: boolean) => void;
}

export function ScheduleDialog({ triggerLabel = "Schedule Discovery", trigger, onOpenChange }: ScheduleDialogProps) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    onOpenChange?.(next);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        {trigger ?? (
          <button className="inline-flex items-center justify-center border border-white px-8 py-3 uppercase tracking-[0.4em] text-sm hover:bg-white hover:text-black transition-colors">
            {triggerLabel}
          </button>
        )}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[1001] -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-[680px] max-h-[90vh] overflow-y-auto bg-neutral-950 border border-neutral-800 p-6 sm:p-8 rounded-sm shadow-xl focus:outline-none">
          <div className="flex items-start justify-between gap-4 sm:gap-6">
            <div>
              <Dialog.Title className="text-xl sm:text-2xl font-semibold text-white mb-2">Let’s Build What’s Next.</Dialog.Title>
              <Dialog.Description className="text-sm sm:text-base text-neutral-300">
                Have a complex problem? We're interested. Let's schedule a 30-minute discovery call.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center border border-white/40 text-white hover:bg-white hover:text-black transition"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          <div className="mt-5 sm:mt-6">
            <ContactForm
              onSuccess={() => {
                setOpen(false);
                onOpenChange?.(false);
              }}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ScheduleDialog;
