import { createClient } from "@supabase/supabase-js";
export const supabase =
  globalThis.supabase ||
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_ANON_KEY
  );

if (process.env.NODE_ENV !== "production") globalThis.supabase = supabase;
