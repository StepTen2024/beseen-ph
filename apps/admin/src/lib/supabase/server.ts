/**
 * BE SEEN.PH - Admin App Server Supabase Client
 */

import { cookies } from 'next/headers';
import { createServerSupabaseClient, createAdminClient } from '@beseen/database';

export async function createClient() {
  const cookieStore = await cookies();
  
  return createServerSupabaseClient({
    get: (name: string) => cookieStore.get(name),
    set: (cookie: { name: string; value: string; [key: string]: unknown }) => {
      try {
        cookieStore.set(cookie.name, cookie.value, cookie);
      } catch {
        // Ignore - read-only context
      }
    },
  });
}

export function createAdmin() {
  return createAdminClient();
}
