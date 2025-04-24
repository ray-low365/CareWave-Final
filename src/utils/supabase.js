import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = 'https://efyoufljsmihzhqjdsqz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmeW91Zmxqc21paHpocWpkc3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MzUwODUsImV4cCI6MjA2MTExMTA4NX0.yRTHra6psjP88a21rYCuw-Dfe08ZIr_znLVnbQ0zDJU';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper functions for common database operations
export const db = {
  // Todos
  todos: {
    getAll: async () => {
      const { data, error } = await supabase.from('todos').select('*');
      if (error) throw error;
      return data || [];
    },

    create: async (todo) => {
      const { data, error } = await supabase.from('todos').insert(todo).select().single();
      if (error) throw error;
      return data;
    },

    update: async (id, todo) => {
      const { data, error } = await supabase.from('todos').update(todo).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },

    delete: async (id) => {
      const { error } = await supabase.from('todos').delete().eq('id', id);
      if (error) throw error;
    }
  }
};
