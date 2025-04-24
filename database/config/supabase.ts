import { createClient } from '@supabase/supabase-js';
import { Database } from '../models/supabase-types';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://efyoufljsmihzhqjdsqz.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmeW91Zmxqc21paHpocWpkc3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MzUwODUsImV4cCI6MjA2MTExMTA4NX0.yRTHra6psjP88a21rYCuw-Dfe08ZIr_znLVnbQ0zDJU';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Helper functions for database operations
export const db = {
  // Patients
  patients: {
    getAll: async () => {
      const { data, error } = await supabase.from('patients').select('*');
      if (error) throw error;
      return data;
    },
    getById: async (id: string) => {
      const { data, error } = await supabase.from('patients').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    },
    create: async (patient: Database['public']['Tables']['patients']['Insert']) => {
      const { data, error } = await supabase.from('patients').insert(patient).select().single();
      if (error) throw error;
      return data;
    },
    update: async (id: string, patient: Database['public']['Tables']['patients']['Update']) => {
      const { data, error } = await supabase.from('patients').update(patient).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    delete: async (id: string) => {
      const { error } = await supabase.from('patients').delete().eq('id', id);
      if (error) throw error;
    }
  },

  // Appointments
  appointments: {
    getAll: async () => {
      const { data, error } = await supabase.from('appointments').select('*');
      if (error) throw error;
      return data;
    },
    getById: async (id: string) => {
      const { data, error } = await supabase.from('appointments').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    },
    getByPatientId: async (patientId: string) => {
      const { data, error } = await supabase.from('appointments').select('*').eq('patient_id', patientId);
      if (error) throw error;
      return data;
    },
    create: async (appointment: Database['public']['Tables']['appointments']['Insert']) => {
      const { data, error } = await supabase.from('appointments').insert(appointment).select().single();
      if (error) throw error;
      return data;
    },
    update: async (id: string, appointment: Database['public']['Tables']['appointments']['Update']) => {
      const { data, error } = await supabase.from('appointments').update(appointment).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    delete: async (id: string) => {
      const { error } = await supabase.from('appointments').delete().eq('id', id);
      if (error) throw error;
    }
  },

  // Staff
  staff: {
    getAll: async () => {
      const { data, error } = await supabase.from('staff').select('*');
      if (error) throw error;
      return data;
    },
    getById: async (id: string) => {
      const { data, error } = await supabase.from('staff').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    },
    create: async (staff: Database['public']['Tables']['staff']['Insert']) => {
      const { data, error } = await supabase.from('staff').insert(staff).select().single();
      if (error) throw error;
      return data;
    },
    update: async (id: string, staff: Database['public']['Tables']['staff']['Update']) => {
      const { data, error } = await supabase.from('staff').update(staff).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    delete: async (id: string) => {
      const { error } = await supabase.from('staff').delete().eq('id', id);
      if (error) throw error;
    }
  },

  // Inventory
  inventory: {
    getAll: async () => {
      const { data, error } = await supabase.from('inventory').select('*');
      if (error) throw error;
      return data;
    },
    getById: async (id: string) => {
      const { data, error } = await supabase.from('inventory').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    },
    create: async (item: Database['public']['Tables']['inventory']['Insert']) => {
      const { data, error } = await supabase.from('inventory').insert(item).select().single();
      if (error) throw error;
      return data;
    },
    update: async (id: string, item: Database['public']['Tables']['inventory']['Update']) => {
      const { data, error } = await supabase.from('inventory').update(item).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    delete: async (id: string) => {
      const { error } = await supabase.from('inventory').delete().eq('id', id);
      if (error) throw error;
    }
  },

  // Billing
  billing: {
    getAll: async () => {
      const { data, error } = await supabase.from('billing').select('*');
      if (error) throw error;
      return data;
    },
    getById: async (id: string) => {
      const { data, error } = await supabase.from('billing').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    },
    getByPatientId: async (patientId: string) => {
      const { data, error } = await supabase.from('billing').select('*').eq('patient_id', patientId);
      if (error) throw error;
      return data;
    },
    create: async (billing: Database['public']['Tables']['billing']['Insert']) => {
      const { data, error } = await supabase.from('billing').insert(billing).select().single();
      if (error) throw error;
      return data;
    },
    update: async (id: string, billing: Database['public']['Tables']['billing']['Update']) => {
      const { data, error } = await supabase.from('billing').update(billing).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    delete: async (id: string) => {
      const { error } = await supabase.from('billing').delete().eq('id', id);
      if (error) throw error;
    }
  },

  // Todos
  todos: {
    getAll: async () => {
      const { data, error } = await supabase.from('todos').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    getById: async (id: string) => {
      const { data, error } = await supabase.from('todos').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    },
    create: async (todo: Database['public']['Tables']['todos']['Insert']) => {
      const { data, error } = await supabase.from('todos').insert(todo).select().single();
      if (error) throw error;
      return data;
    },
    update: async (id: string, todo: Database['public']['Tables']['todos']['Update']) => {
      const { data, error } = await supabase.from('todos').update(todo).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    delete: async (id: string) => {
      const { error } = await supabase.from('todos').delete().eq('id', id);
      if (error) throw error;
    }
  }
};
