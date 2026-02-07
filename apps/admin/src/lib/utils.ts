/**
 * BE SEEN.PH - Utility Functions
 * Phase 2: The Delivery Engine ("Pinky")
 */

// ============================================================================
// TAILWIND CLASS MERGING
// ============================================================================

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ============================================================================
// DATE UTILITIES
// ============================================================================

/**
 * Format a date to Philippine timezone string
 */
export function formatPHDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-PH', {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format a date to ISO string (YYYY-MM-DD)
 */
export function formatISODate(date: Date | string): string {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}

/**
 * Get current date in Philippines timezone
 */
export function getCurrentPHDate(): Date {
  const now = new Date();
  const phTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Manila' }));
  return phTime;
}

/**
 * Calculate days between two dates
 */
export function daysBetween(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
}

// ============================================================================
// CURRENCY UTILITIES
// ============================================================================

/**
 * Format number as Philippine Peso
 */
export function formatPHP(amount: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// ============================================================================
// STRING UTILITIES
// ============================================================================

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Convert string to slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Generate a random string
 */
export function generateRandomString(length: number = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Philippine phone number
 */
export function isValidPHPhone(phone: string): boolean {
  // Accepts formats: 09123456789, +639123456789, 9123456789
  const phoneRegex = /^(\+63|0)?9\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Validate Facebook Page URL
 */
export function isValidFacebookPageUrl(url: string): boolean {
  return url.includes('facebook.com/');
}

// ============================================================================
// ARRAY UTILITIES
// ============================================================================

/**
 * Group array items by key
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

/**
 * Shuffle array (Fisher-Yates algorithm)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

/**
 * Safely parse JSON
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Get error message from unknown error
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'An unknown error occurred';
}

// ============================================================================
// ENCRYPTION UTILITIES (for sensitive data)
// ============================================================================

/**
 * Simple encryption for tokens (in production, use proper encryption)
 * NOTE: This is a placeholder. In production, use a proper encryption library
 * like crypto-js or the Node.js crypto module with proper key management.
 */
export function encryptToken(token: string, secret: string): string {
  // Placeholder - implement proper encryption
  return Buffer.from(`${token}:${secret}`).toString('base64');
}

export function decryptToken(encrypted: string, secret: string): string | null {
  // Placeholder - implement proper decryption
  try {
    const decoded = Buffer.from(encrypted, 'base64').toString('utf-8');
    const [token, _] = decoded.split(':');
    return token;
  } catch {
    return null;
  }
}
