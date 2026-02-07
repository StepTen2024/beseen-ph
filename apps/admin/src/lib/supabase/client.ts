/**
 * BE SEEN.PH - Admin App Browser Supabase Client
 */

'use client';

import { createBrowserSupabaseClient } from '@beseen/database';

export function createClient() {
  return createBrowserSupabaseClient();
}
