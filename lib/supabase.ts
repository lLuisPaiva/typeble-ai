import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null = null;

function resolveSupabaseKey() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (serviceKey && serviceKey.length > 0) {
    return serviceKey;
  }

  const anonKey = process.env.SUPABASE_ANON_KEY;
  if (anonKey && anonKey.length > 0) {
    return anonKey;
  }

  return null;
}

function createAdminClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = resolveSupabaseKey();

  if (!url || !key) {
    throw new Error("Supabase environment variables are not configured.");
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
    },
    global: {
      headers: {
        "X-Client-Info": "typeble-ai-contact-api",
      },
    },
  });
}

export function getSupabaseAdmin() {
  if (!cachedClient) {
    cachedClient = createAdminClient();
  }
  return cachedClient;
}
