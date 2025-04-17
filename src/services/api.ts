import { Patient, Appointment, Staff, InventoryItem, BillingRecord, DashboardStats, NewPatient, NewInventoryItem } from '../types';
import { supabase } from '@/integrations/supabase/client';

// Helper function to simulate API delay for backward compatibility during transition
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API Service for Patients
export const PatientService = {
  getAll: async (): Promise<Patient[]> => {
    const { data, error } = await supabase
      .from('patients')
      .select('*');
    
    if (error) throw error;
    
    return data.map(p => ({
      id: p.id,
      name: p.name,
      contactInfo: p.contact_info,
      medicalHistory: p.medical_history || '',
      appointmentHistory: p.appointment_history || '',
      address: p.address || '',
      // Map other fields as needed
    }));
  },
  
  getById: async (id: number): Promise<Patient> => {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name,
      contactInfo: data.contact_info,
      medicalHistory: data.medical_history || '',
      appointmentHistory: data.appointment_history || '',
      address: data.address || '',
      // Map other fields as needed
    };
  },
  
  create: async (patient: NewPatient): Promise<Patient> => {
    const { data, error } = await supabase
      .from('patients')
      .insert({
        name: patient.name,
        contact_info: patient.contactInfo,
        medical_history: patient.medicalHistory,
        appointment_history: patient.appointmentHistory,
        address: patient.address
        // Map other fields as needed
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name,
      contactInfo: data.contact_info,
      medicalHistory: data.medical_history || '',
      appointmentHistory: data.appointment_history || '',
      address: data.address || '',
      // Map other fields as needed
    };
  },
  
  update: async (id: number, patient: Partial<Patient>): Promise<Patient> => {
    const { data, error } = await supabase
      .from('patients')
      .update({
        name: patient.name,
        contact_info: patient.contactInfo,
        medical_history: patient.medicalHistory,
        appointment_history: patient.appointmentHistory,
        address: patient.address
        // Map other fields as needed
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name,
      contactInfo: data.contact_info,
      medicalHistory: data.medical_history || '',
      appointmentHistory: data.appointment_history || '',
      address: data.address || '',
      // Map other fields as needed
    };
  },
  
  delete: async (id: number): Promise<void> => {
    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// API Service for Appointments
export const AppointmentService = {
  getAll: async (): Promise<Appointment[]> => {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        patients(name)
      `);
    
    if (error) throw error;
    
    return data.map(a => ({
      id: a.id,
      patientId: a.patient_id,
      patientName: a.patients?.name || 'Unknown Patient',
      date: a.date,
      time: a.time,
      status: a.status,
      doctor: a.doctor || '',
      department: a.department || '',
      notes: a.notes || ''
    }));
  },
  
  getById: async (id: number): Promise<Appointment> => {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        patients(name)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      patientId: data.patient_id,
      patientName: data.patients?.name || 'Unknown Patient',
      date: data.date,
      time: data.time,
      status: data.status,
      doctor: data.doctor || '',
      department: data.department || '',
      notes: data.notes || ''
    };
  },
  
  getByPatientId: async (patientId: number): Promise<Appointment[]> => {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        patients(name)
      `)
      .eq('patient_id', patientId);
    
    if (error) throw error;
    
    return data.map(a => ({
      id: a.id,
      patientId: a.patient_id,
      patientName: a.patients?.name || 'Unknown Patient',
      date: a.date,
      time: a.time,
      status: a.status,
      doctor: a.doctor || '',
      department: a.department || '',
      notes: a.notes || ''
    }));
  },
  
  create: async (appointment: Omit<Appointment, 'id'>): Promise<Appointment> => {
    const { data, error } = await supabase
      .from('appointments')
      .insert({
        patient_id: appointment.patientId,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status,
        doctor: appointment.doctor,
        department: appointment.department,
        notes: appointment.notes
      })
      .select(`
        *,
        patients(name)
      `)
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      patientId: data.patient_id,
      patientName: data.patients?.name || 'Unknown Patient',
      date: data.date,
      time: data.time,
      status: data.status,
      doctor: data.doctor || '',
      department: data.department || '',
      notes: data.notes || ''
    };
  },
  
  update: async (id: number, appointment: Partial<Appointment>): Promise<Appointment> => {
    const { data, error } = await supabase
      .from('appointments')
      .update({
        patient_id: appointment.patientId,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status,
        doctor: appointment.doctor,
        department: appointment.department,
        notes: appointment.notes
      })
      .eq('id', id)
      .select(`
        *,
        patients(name)
      `)
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      patientId: data.patient_id,
      patientName: data.patients?.name || 'Unknown Patient',
      date: data.date,
      time: data.time,
      status: data.status,
      doctor: data.doctor || '',
      department: data.department || '',
      notes: data.notes || ''
    };
  },
  
  delete: async (id: number): Promise<void> => {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// API Service for Staff
export const StaffService = {
  getAll: async (): Promise<Staff[]> => {
    const { data, error } = await supabase
      .from('staff')
      .select('*');
    
    if (error) throw error;
    
    return data.map(s => ({
      id: s.id,
      name: s.name || '',
      role: s.role,
      department: s.department,
      email: s.email || '',
      phone: s.phone || '',
      specialty: s.specialty || '',
      joiningDate: s.joining_date || ''
    }));
  },
  
  getById: async (id: number): Promise<Staff> => {
    const { data, error } = await supabase
      .from('staff')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name || '',
      role: data.role,
      department: data.department,
      email: data.email || '',
      phone: data.phone || '',
      specialty: data.specialty || '',
      joiningDate: data.joining_date || ''
    };
  },
  
  create: async (member: Omit<Staff, 'id'>): Promise<Staff> => {
    const { data, error } = await supabase
      .from('staff')
      .insert({
        name: member.name,
        role: member.role,
        department: member.department,
        email: member.email,
        phone: member.phone,
        specialty: member.specialty,
        joining_date: member.joiningDate
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name || '',
      role: data.role,
      department: data.department,
      email: data.email || '',
      phone: data.phone || '',
      specialty: data.specialty || '',
      joiningDate: data.joining_date || ''
    };
  },
  
  update: async (id: number, member: Partial<Staff>): Promise<Staff> => {
    const { data, error } = await supabase
      .from('staff')
      .update({
        name: member.name,
        role: member.role,
        department: member.department,
        email: member.email,
        phone: member.phone,
        specialty: member.specialty,
        joining_date: member.joiningDate
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name || '',
      role: data.role,
      department: data.department,
      email: data.email || '',
      phone: data.phone || '',
      specialty: data.specialty || '',
      joiningDate: data.joining_date || ''
    };
  },
  
  delete: async (id: number): Promise<void> => {
    const { error } = await supabase
      .from('staff')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// API Service for Inventory
export const InventoryService = {
  getAll: async (): Promise<InventoryItem[]> => {
    const { data, error } = await supabase
      .from('inventory')
      .select('*');
    
    if (error) throw error;
    
    return data.map(i => ({
      id: i.id,
      name: i.name,
      description: i.description,
      quantity: i.quantity,
      price: i.price,
      category: i.category
    }));
  },
  
  getById: async (id: number): Promise<InventoryItem> => {
    const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      quantity: data.quantity,
      price: data.price,
      category: data.category
    };
  },
  
  create: async (item: NewInventoryItem): Promise<InventoryItem> => {
    const { data, error } = await supabase
      .from('inventory')
      .insert({
        name: item.name,
        description: item.description,
        quantity: item.quantity,
        price: item.price,
        category: item.category
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      quantity: data.quantity,
      price: data.price,
      category: data.category
    };
  },
  
  update: async (id: number, item: Partial<InventoryItem>): Promise<InventoryItem> => {
    const { data, error } = await supabase
      .from('inventory')
      .update({
        name: item.name,
        description: item.description,
        quantity: item.quantity,
        price: item.price,
        category: item.category
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      quantity: data.quantity,
      price: data.price,
      category: data.category
    };
  },
  
  delete: async (id: number): Promise<void> => {
    const { error } = await supabase
      .from('inventory')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// API Service for Billing
export const BillingService = {
  getAll: async (): Promise<BillingRecord[]> => {
    const { data, error } = await supabase
      .from('billing')
      .select('*');
    
    if (error) throw error;
    
    return data.map(b => ({
      id: b.id,
      patientId: b.patient_id,
      amount: b.amount,
      date: b.date,
      status: b.status,
      notes: b.notes
    }));
  },
  
  getById: async (id: number): Promise<BillingRecord> => {
    const { data, error } = await supabase
      .from('billing')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      patientId: data.patient_id,
      amount: data.amount,
      date: data.date,
      status: data.status,
      notes: data.notes
    };
  },
  
  getByPatientId: async (patientId: number): Promise<BillingRecord[]> => {
    const { data, error } = await supabase
      .from('billing')
      .select('*')
      .eq('patient_id', patientId);
    
    if (error) throw error;
    
    return data.map(b => ({
      id: b.id,
      patientId: b.patient_id,
      amount: b.amount,
      date: b.date,
      status: b.status,
      notes: b.notes
    }));
  },
  
  create: async (record: Omit<BillingRecord, 'id'>): Promise<BillingRecord> => {
    const { data, error } = await supabase
      .from('billing')
      .insert({
        patient_id: record.patientId,
        amount: record.amount,
        date: record.date,
        status: record.status,
        notes: record.notes
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      patientId: data.patient_id,
      amount: data.amount,
      date: data.date,
      status: data.status,
      notes: data.notes
    };
  },
  
  update: async (id: number, record: Partial<BillingRecord>): Promise<BillingRecord> => {
    const { data, error } = await supabase
      .from('billing')
      .update({
        patient_id: record.patientId,
        amount: record.amount,
        date: record.date,
        status: record.status,
        notes: record.notes
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      patientId: data.patient_id,
      amount: data.amount,
      date: data.date,
      status: data.status,
      notes: data.notes
    };
  },
  
  delete: async (id: number): Promise<void> => {
    const { error } = await supabase
      .from('billing')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// API Service for Dashboard Statistics
export const DashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const { count: totalPatients, error: patientsError } = await supabase
      .from('patients')
      .select('*', { count: 'exact', head: true });
    
    if (patientsError) throw patientsError;
    
    const { count: totalAppointments, error: appointmentsError } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true });
    
    if (appointmentsError) throw appointmentsError;
    
    const today = new Date().toISOString().split('T')[0];
    const { count: todayAppointments, error: todayError } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .eq('date', today)
      .eq('status', 'Scheduled');
    
    if (todayError) throw todayError;
    
    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);
    const thirtyDaysLaterStr = thirtyDaysLater.toISOString().split('T')[0];
    
    const { count: upcomingAppointments, error: upcomingError } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .gte('date', today)
      .lte('date', thirtyDaysLaterStr)
      .eq('status', 'Scheduled');
    
    if (upcomingError) throw upcomingError;

    return {
      totalPatients: totalPatients || 0,
      totalAppointments: totalAppointments || 0,
      todayAppointments: todayAppointments || 0,
      upcomingAppointments: upcomingAppointments || 0,
      monthlyPatientVisits: [
        { month: 'Jan', visits: 45 },
        { month: 'Feb', visits: 52 },
        { month: 'Mar', visits: 49 },
        { month: 'Apr', visits: 62 },
        { month: 'May', visits: 55 },
        { month: 'Jun', visits: 60 },
        { month: 'Jul', visits: 58 },
        { month: 'Aug', visits: 65 },
        { month: 'Sep', visits: 70 },
        { month: 'Oct', visits: 75 },
        { month: 'Nov', visits: 68 },
        { month: 'Dec', visits: 72 }
      ],
      departmentDistribution: [
        { department: 'Cardiology', patients: 120 },
        { department: 'Orthopedics', patients: 80 },
        { month: 'Neurology', patients: 60 },
        { month: 'Pediatrics', patients: 110 },
        { month: 'Dermatology', patients: 50 }
      ],
      appointmentStatus: [
        { status: 'Scheduled', count: 45 },
        { status: 'Completed', count: 120 },
        { status: 'Cancelled', count: 15 },
        { status: 'No-Show', count: 8 }
      ],
      revenueData: [
        { month: 'Jan', amount: 12500 },
        { month: 'Feb', amount: 13800 },
        { month: 'Mar', amount: 13200 },
        { month: 'Apr', amount: 15500 },
        { month: 'May', amount: 14800 },
        { month: 'Jun', amount: 16200 },
        { month: 'Jul', amount: 15800 },
        { month: 'Aug', amount: 17500 },
        { month: 'Sep', amount: 18200 },
        { month: 'Oct', amount: 19500 },
        { month: 'Nov', amount: 18800 },
        { month: 'Dec', amount: 20500 }
      ]
    };
  }
};
