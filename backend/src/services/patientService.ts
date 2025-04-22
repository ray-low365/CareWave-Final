import { supabase } from '../config/database';
import { Patient, PatientInsert, PatientUpdate, PatientWithAppointments } from '../models/types';

export const PatientService = {
  /**
   * Get all patients
   */
  getAll: async (): Promise<Patient[]> => {
    const { data, error } = await supabase.from('patients').select('*');
    
    if (error) {
      throw new Error(`Error fetching patients: ${error.message}`);
    }
    
    return data || [];
  },
  
  /**
   * Get a patient by ID
   */
  getById: async (id: string): Promise<Patient> => {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      throw new Error(`Error fetching patient: ${error.message}`);
    }
    
    if (!data) {
      throw new Error('Patient not found');
    }
    
    return data;
  },
  
  /**
   * Get a patient with their appointments
   */
  getWithAppointments: async (id: string): Promise<PatientWithAppointments> => {
    // Get patient
    const { data: patient, error: patientError } = await supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .single();
    
    if (patientError) {
      throw new Error(`Error fetching patient: ${patientError.message}`);
    }
    
    if (!patient) {
      throw new Error('Patient not found');
    }
    
    // Get patient's appointments
    const { data: appointments, error: appointmentsError } = await supabase
      .from('appointments')
      .select('*')
      .eq('patient_id', id);
    
    if (appointmentsError) {
      throw new Error(`Error fetching patient appointments: ${appointmentsError.message}`);
    }
    
    return {
      ...patient,
      appointments: appointments || []
    };
  },
  
  /**
   * Create a new patient
   */
  create: async (patient: PatientInsert): Promise<Patient> => {
    const { data, error } = await supabase
      .from('patients')
      .insert(patient)
      .select()
      .single();
    
    if (error) {
      throw new Error(`Error creating patient: ${error.message}`);
    }
    
    if (!data) {
      throw new Error('Failed to create patient');
    }
    
    return data;
  },
  
  /**
   * Update a patient
   */
  update: async (id: string, patient: PatientUpdate): Promise<Patient> => {
    const { data, error } = await supabase
      .from('patients')
      .update(patient)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      throw new Error(`Error updating patient: ${error.message}`);
    }
    
    if (!data) {
      throw new Error('Patient not found');
    }
    
    return data;
  },
  
  /**
   * Delete a patient
   */
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw new Error(`Error deleting patient: ${error.message}`);
    }
  },
  
  /**
   * Search patients by name
   */
  search: async (query: string): Promise<Patient[]> => {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .ilike('name', `%${query}%`);
    
    if (error) {
      throw new Error(`Error searching patients: ${error.message}`);
    }
    
    return data || [];
  }
};
