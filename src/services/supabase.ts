/**
 * Supabase Integration Service Layer for ResearchConnect Nigeria
 * 
 * Provides initialization, typed queries, and graceful fallbacks
 * when running in demo/offline preview mode.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables for Supabase (client-safe anon key only)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co'
);

let supabaseInstance: SupabaseClient | null = null;

if (isSupabaseConfigured) {
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  } catch (error) {
    console.warn('Failed to initialize Supabase client:', error);
  }
}

export const supabase = supabaseInstance;

/**
 * Service description of backend functions prepared for production deployment:
 * 
 * 1. auth.signUp / auth.signInWithPassword - Role-based Supabase Auth
 * 2. rpc('submit_study_for_review') - Atomic state transition with admin notification
 * 3. rpc('admin_approve_study') - Validates admin role via RLS and sets study Active
 * 4. rpc('record_participant_consent') - Stores timestamped consent record with IP hash
 * 5. rpc('flag_response_quality') - Flags anomalies (duration, IP clustering)
 */
export const BACKEND_STATUS = {
  isConfigured: isSupabaseConfigured,
  provider: isSupabaseConfigured ? 'Supabase PostgreSQL' : 'Local State Engine (Demo Mode)',
  unimplementedEndpoints: [
    'Direct automated email dispatch (Requires SendGrid/Postmark SMTP integration)',
    'Mobile airtime auto-disbursement (Requires Paystack / Flutterwave Transfers API)',
    'Live automated university student matriculation verification',
    'Real-time IP geolocation reverse clustering'
  ]
};
