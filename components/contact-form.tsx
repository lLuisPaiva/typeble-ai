"use client";

import React, { FormEvent, useCallback, useState } from "react";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { useLanguage } from "./language-provider";

type ContactFormProps = {
  onSuccess?: () => void;
};

const challengeOptions = [
  { value: "ai", label: "Deploy enterprise AI" },
  { value: "platform", label: "Scale our core platform" },
  { value: "data", label: "Modernize data pipelines" },
  { value: "other", label: "Something else" },
];

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const { language } = useLanguage();
  const [challenge, setChallenge] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const fullName = formData.get("fullName")?.toString().trim() ?? "";
      const workEmail = formData.get("workEmail")?.toString().trim() ?? "";
      const company = formData.get("company")?.toString().trim() ?? "";
      const project = formData.get("project")?.toString().trim() ?? "";

      if (!fullName || !workEmail || !company || !challenge) {
        setStatus("error");
        setFeedback("Please fill in all required fields.");
        return;
      }

      setStatus("loading");
      setFeedback(null);

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            workEmail,
            company,
            challenge,
            project,
            locale: language,
          }),
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(typeof data.message === "string" ? data.message : "We couldn't send your message. Try again.");
        }

        event.currentTarget.reset();
        setChallenge("");
        setStatus("success");
        setFeedback("Thanks! We'll get in touch within one business day.");

        setTimeout(() => {
          onSuccess?.();
        }, 700);
      } catch (error) {
        setStatus("error");
        setFeedback(error instanceof Error ? error.message : "We couldn't send your message. Try again.");
      }
    },
    [challenge, language, onSuccess]
  );

  return (
    <form className="space-y-6" aria-label="Contact form" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm uppercase tracking-[0.3em] text-neutral-400 mb-2" htmlFor="fullName">
          Full Name*
        </label>
        <input
          id="fullName"
          name="fullName"
          required
          className="w-full bg-black border border-neutral-700 px-4 py-3 text-white text-lg"
          disabled={status === "loading"}
        />
      </div>

      <div>
        <label className="block text-sm uppercase tracking-[0.3em] text-neutral-400 mb-2" htmlFor="workEmail">
          Work Email*
        </label>
        <input
          id="workEmail"
          name="workEmail"
          type="email"
          required
          className="w-full bg-black border border-neutral-700 px-4 py-3 text-white text-lg"
          disabled={status === "loading"}
        />
      </div>

      <div>
        <label className="block text-sm uppercase tracking-[0.3em] text-neutral-400 mb-2" htmlFor="company">
          Company*
        </label>
        <input
          id="company"
          name="company"
          required
          className="w-full bg-black border border-neutral-700 px-4 py-3 text-white text-lg"
          disabled={status === "loading"}
        />
      </div>

      <div>
        <label className="block text-sm uppercase tracking-[0.3em] text-neutral-400 mb-2">What is your primary challenge?*</label>
        <Select.Root value={challenge} onValueChange={setChallenge} disabled={status === "loading"}>
          <Select.Trigger className="w-full bg-black border border-neutral-700 px-4 py-3 text-left text-lg inline-flex items-center justify-between">
            <Select.Value placeholder="Choose one" />
            <Select.Icon>
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="z-[1100] max-h-[240px] w-[var(--radix-select-trigger-width)] overflow-y-auto bg-neutral-950 border border-neutral-700 shadow-lg">
              <Select.Viewport>
                {challengeOptions.map((option) => (
                  <Select.Item key={option.value} value={option.value} className="text-lg py-3 px-4 flex items-center justify-between gap-3">
                    <Select.ItemText>{option.label}</Select.ItemText>
                    <Select.ItemIndicator>
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
        <input type="hidden" name="challenge" value={challenge} readOnly />
      </div>

      <div>
        <label className="block text-sm uppercase tracking-[0.3em] text-neutral-400 mb-2" htmlFor="project">
          Tell us about your project (optional)
        </label>
        <textarea
          id="project"
          name="project"
          className="w-full bg-black border border-neutral-700 px-4 py-3 text-white text-lg min-h-[140px]"
          disabled={status === "loading"}
        ></textarea>
      </div>

      <div>
        <button
          type="submit"
          className="w-full border border-white px-6 py-3 uppercase tracking-[0.4em] text-sm hover:bg-white hover:text-black transition disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Submit"}
        </button>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={`text-sm ${status === "success" ? "text-emerald-400" : status === "error" ? "text-red-400" : "text-neutral-400"}`}
      >
        {feedback}
      </p>
    </form>
  );
}
