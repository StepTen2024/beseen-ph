/**
 * BE SEEN.PH - Supabase Client Factory
 * Browser, Server, and Admin clients for different contexts
 */

import { createClient } from '@supabase/supabase-js';
import { createBrowserClient, createServerClient, type CookieOptions } from '@supabase/ssr';
import type { Database } from './types';

// ============================================================================
// BROWSER CLIENT (for client components)
// ============================================================================

let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

/**
 * Creates a Supabase client for browser/client components
 * Uses singleton pattern to avoid multiple instances
 */
export function createBrowserSupabaseClient() {
  if (browserClient) return browserClient;
  
  browserClient = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  return browserClient;
}

// ============================================================================
// SERVER CLIENT (for server components and API routes)
// ============================================================================

/**
 * Creates a Supabase client for server components
 * Requires cookie store from Next.js
 */
export function createServerSupabaseClient(cookieStore: {
  get: (name: string) => { value: string } | undefined;
  set: (cookie: { name: string; value: string; [key: string]: unknown }) => void;
}) {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Ignore - happens in read-only contexts
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Ignore
          }
        },
      },
    }
  );
}

/**
 * Creates a Supabase client for API route handlers
 * Uses request/response for cookie handling
 */
export function createRouteHandlerClient(request: Request, response: Response) {
  const cookieStore = new Map<string, string>();
  
  // Parse cookies from request
  const cookieHeader = request.headers.get('cookie');
  if (cookieHeader) {
    cookieHeader.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name && value) cookieStore.set(name, value);
    });
  }

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name);
        },
        set(name: string, value: string, options: CookieOptions) {
          // Set cookie in response
          const cookieValue = `${name}=${value}; Path=/; HttpOnly; SameSite=Lax`;
          response.headers.append('Set-Cookie', cookieValue);
        },
        remove(name: string, options: CookieOptions) {
          response.headers.append('Set-Cookie', `${name}=; Path=/; MaxAge=0`);
        },
      },
    }
  );
}

// ============================================================================
// ADMIN CLIENT (service role - for server-side operations)
// ============================================================================

let adminClient: ReturnType<typeof createClient<Database>> | null = null;

/**
 * Creates a Supabase admin client with service role key
 * NEVER expose this to the client!
 */
export function createAdminClient() {
  if (adminClient) return adminClient;
  
  adminClient = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
  
  return adminClient;
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type SupabaseClient = ReturnType<typeof createBrowserSupabaseClient>;
export type SupabaseAdminClient = ReturnType<typeof createAdminClient>;
