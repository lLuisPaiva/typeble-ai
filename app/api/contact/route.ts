import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

interface ContactPayload {
  fullName?: string;
  workEmail?: string;
  company?: string;
  challenge?: string;
  project?: string;
  locale?: string;
}

function isValidEmail(input: string) {
  return /.+@.+\..+/.test(input);
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json({ message: "Invalid JSON payload." }, { status: 400 });
  }

  const fullName = payload.fullName?.trim();
  const workEmail = payload.workEmail?.trim().toLowerCase();
  const company = payload.company?.trim();
  const challenge = payload.challenge?.trim();
  const project = payload.project?.trim() ?? null;
  const locale = payload.locale?.trim() ?? null;

  if (!fullName || !workEmail || !company || !challenge) {
    return NextResponse.json({ message: "All required fields must be provided." }, { status: 400 });
  }

  if (!isValidEmail(workEmail)) {
    return NextResponse.json({ message: "Please provide a valid work email." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("contact_submissions").insert({
      full_name: fullName,
      work_email: workEmail,
      company,
      challenge,
      project,
      locale,
      user_agent: request.headers.get("user-agent"),
    });

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: "Submission received." }, { status: 200 });
  } catch (error: unknown) {
    console.error("Contact form submission failed", error);
    return NextResponse.json({ message: "We could not submit the form right now. Please try again." }, { status: 500 });
  }
}
