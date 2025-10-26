"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Select } from "@/components/ui/select";

const projectOptions = [
  {
    value: "ai-agents",
    label: "Autonomous AI Agents",
    description: "Delegated ops, human-in-the-loop governance, multi-agent orchestration.",
  },
  {
    value: "rag-platforms",
    label: "Enterprise RAG Systems",
    description: "Retrieval pipelines, evaluation harnesses, compliance-first delivery.",
  },
  {
    value: "legacy-modernization",
    label: "Legacy Modernization",
    description: "Refactor core systems, cloud migration, service decomposition roadmaps.",
  },
  {
    value: "product-delivery",
    label: "Full-Stack Product Delivery",
    description: "Greenfield SaaS build, architecture runway, design-to-production execution.",
  },
];

type ContactLeadFormProps = {
  compact?: boolean;
};

type FormState = {
  company: string;
  email: string;
  message: string;
  name: string;
  projectType: string;
  timeline: string;
};

const initialState: FormState = {
  company: "",
  email: "",
  message: "",
  name: "",
  projectType: "",
  timeline: "",
};

export function ContactLeadForm({ compact = false }: ContactLeadFormProps) {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const updateField = (field: keyof FormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") {
      return;
    }
    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
      setFormState(initialState);
    }, 900);
  };

  const fieldGrid = compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className={`grid gap-4 ${fieldGrid}`}>
        <label className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.3em] text-white/60">Name</span>
          <input
            required
            value={formState.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="w-full border border-white/20 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none"
            placeholder="Who should we prep for?"
            type="text"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.3em] text-white/60">Company</span>
          <input
            required
            value={formState.company}
            onChange={(event) => updateField("company", event.target.value)}
            className="w-full border border-white/20 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none"
            placeholder="Org or team name"
            type="text"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.3em] text-white/60">Email</span>
          <input
            required
            value={formState.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="w-full border border-white/20 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none"
            placeholder="Where should we send the brief?"
            type="email"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.3em] text-white/60">Timeline</span>
          <input
            value={formState.timeline}
            onChange={(event) => updateField("timeline", event.target.value)}
            className="w-full border border-white/20 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none"
            placeholder="Example: Deployment in Q1"
            type="text"
          />
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.3em] text-white/60">Primary Initiative</span>
        <Select
          value={formState.projectType}
          onChange={(value) => updateField("projectType", value)}
          options={projectOptions}
          placeholder="What are we building or modernizing?"
        />
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.3em] text-white/60">Context</span>
        <textarea
          value={formState.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="min-h-[140px] w-full border border-white/20 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none"
          placeholder="Share KPIs, legacy constraints, or success metrics."
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          24-hour response from principal engineers.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-w-[220px] items-center justify-center border border-white px-6 py-3 text-sm uppercase tracking-[0.3em] text-white transition hover:bg-white hover:text-black disabled:opacity-60"
        >
          {status === "submitting" ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending
            </span>
          ) : (
            "Request Discovery"
          )}
        </button>
      </div>

      {status === "success" && (
        <div className="flex items-center gap-3 border border-white/20 bg-white/10 px-4 py-3 text-sm text-white">
          <CheckCircle2 className="h-5 w-5 text-white" />
          We’ll share a calendar link and prep doc within one business day.
        </div>
      )}
    </form>
  );
}
