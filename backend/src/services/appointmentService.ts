import { supabase } from '../config/database';
import { Appointment, AppointmentInsert, AppointmentUpdate, AppointmentWithPatient } from '../models/types';

export const AppointmentService = {
  /**
   * Get all appointments
   */
  getAll: async (): Promise<Appointment[]> => {
    const { data, error } = await supabase.from('appointments').select('*');
    
    if (error) {
      throw new Error(`Error fetching appointments: ${error.message}`);
    }
    
    return data || [];
  },
  
  /**
   * Get an appointment by ID
   */
  getById: async (id: string): Promise<Appointment> => {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      throw new Error(`Error fetching appointment: ${error.message}`);
    }
    
    if (!data) {
      throw new Error('Appointment not found');
    }
    
    return data;
  },
  
  /**
   * Get appointments by patient ID
   */
  getByPatientId: async (patientId: string): Promise<Appointment[]> => {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('patient_id', patientId);
    
    if (error) {
      throw new Error(`Error fetching patient appointments: ${error.message}`);
    }
    
    return data || [];
  },
  
  /**
   * Get appointments with patient details
   */
  getWithPatients: async (): Promise<AppointmentWithPatient[]> => {
    const { data: appointments, error: appointmentsError } = await supabase
      .from('appointments')
      .select('*');
    
    if (appointmentsError) {
      throw new Error(`Error fetching appointments: ${appointmentsError.message}`);
    }
    
    if (!appointments || appointments.length === 0) {
      return [];
    }
    
    const { data: patients, error: patientsError } = await supabase
      .from('patients')
      .select('*');
    
    if (patientsError) {
      throw new Error(`Error fetching patients: ${patientsError.message}`);
    }
    
    const patientsMap = new Map(patients?.map(p => [p.id, p]) || []);
    
    return appointments.map(appointment => ({
      ...appointment,
      patient: patientsMap.get(appointment.patient_id)
    }));
  },
  
  /**
   * Create a new appointment
   */
  create: async (appointment: AppointmentInsert): Promise<Appointment> => {
    const { data, error } = await supabase
      .from('appointments')
      .insert(appointment)
      .select()
      .single();
    
    if (error) {
      throw new Error(`Error creating appointment: ${error.message}`);
    }
    
    if (!data) {
      throw new Error('Failed to create appointment');
    }
    
    return data;
  },
  
  /**
   * Update an appointment
   */
  update: async (id: string, appointment: AppointmentUpdate): Promise<Appointment> => {
    const { data, error } = await supabase
      .from('appointments')
      .update(appointment)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      throw new Error(`Error updating appointment: ${error.message}`);
    }
    
    if (!data) {
      throw new Error('Appointment not found');
    }
    
    return data;
  },
  
  /**
   * Delete an appointment
   */
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw new Error(`Error deleting appointment: ${error.message}`);
    }
  },
  
  /**
   * Get today's appointments
   */
  getTodayAppointments: async (): Promise<Appointment[]> => {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('date', today);
    
    if (error) {
      throw new Error(`Error fetching today's appointments: ${error.message}`);
    }
    
    return data || [];
  },
  
  /**
   * Get upcoming appointments
   */
  getUpcomingAppointments: async (): Promise<Appointment[]> => {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .gte('date', today)
      .eq('status', 'Scheduled')
      .order('date', { ascending: true });
    
    if (error) {
      throw new Error(`Error fetching upcoming appointments: ${error.message}`);
    }
    
    return data || [];
  }
};
