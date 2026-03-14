import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://dummy.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || 'dummy_key';

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Creates a unique Supabase client that acts on behalf of a specific user.
 * Useful when SERVICE_ROLE_KEY is missing and we must respect RLS.
 */
export const getSupabaseClient = (token?: string) => {
  if (token) {
    return createClient(supabaseUrl, supabaseServiceKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    });
  }
  return supabase;
};

if (supabaseUrl === 'https://dummy.supabase.co') {
  console.warn('[Supabase] Warning: Missing SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file. Database functionalities will silently fail.');
}
