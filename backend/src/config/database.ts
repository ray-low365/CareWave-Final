import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { Database } from '../../../database/models/supabase-types';

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please check your .env file.');
  process.exit(1);
}

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
