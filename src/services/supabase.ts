import { createClient } from '@supabase/supabase-js';
import { Project, Lead, Settings } from '../types';

// Define the shape of your database tables for type safety with Supabase
export interface Database {
  public: {
    Tables: {
      projects: {
        Row: Project
        Insert: Omit<Project, 'id' | 'created_at'>
        Update: Partial<Project>
      }
      leads: {
        Row: Lead
        Insert: Omit<Lead, 'id' | 'created_at'>
        Update: Partial<Lead>
      }
      settings: {
        Row: Settings
        Insert: Omit<Settings, 'id'>
        Update: Partial<Settings>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
  }
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase environment variables VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are missing. Please add them to your .env file or deployment settings.");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
