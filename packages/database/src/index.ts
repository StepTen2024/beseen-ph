/**
 * BE SEEN.PH - Database Package
 * Central export for all database types, clients, and queries
 */

// Types
export * from './types';

// Clients
export {
  createBrowserSupabaseClient,
  createServerSupabaseClient,
  createRouteHandlerClient,
  createAdminClient,
  type SupabaseClient,
  type SupabaseAdminClient,
} from './client';

// Queries
export * from './queries';
