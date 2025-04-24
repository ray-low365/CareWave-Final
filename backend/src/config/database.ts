import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { Database } from '../../../database/models/supabase-types';

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://efyoufljsmihzhqjdsqz.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmeW91Zmxqc21paHpocWpkc3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MzUwODUsImV4cCI6MjA2MTExMTA4NX0.yRTHra6psjP88a21rYCuw-Dfe08ZIr_znLVnbQ0zDJU';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Helper function to check database connection
export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase.from('patients').select('id').limit(1);

    if (error) {
      console.error('Database connection error:', error.message);
      return false;
    }

    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Failed to connect to database:', error);
    return false;
  }
};
