
import { supabase } from "@/integrations/supabase/client";
import { 
  Patient, 
  NewPatient, 
  Appointment, 
  Staff, 
  InventoryItem, 
  NewInventoryItem, 
  BillingRecord, 
  DashboardStats 
} from "@/types";

export const PatientService = {
  async getAll(): Promise<Patient[]> {
    const { data, error } = await supabase
      .from('patients')
      .select('*');
    
    if (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }

    return data.map(p => ({
      id: p.id,
      name: p.name,
      contactInfo: p.contact_info,
      medicalHistory: p.medical_history,
      appointmentHistory: p.appointment_history,
      address: p.address,
      dateOfBirth: p.date_of_birth,
      gender: p.gender,
      insuranceProvider: p.insurance_provider,
      insuranceNumber: p.insurance_number
    }));
  },

  async getById(id: string): Promise<Patient> {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching patient with id ${id}:`, error);
      throw error;
    }

    return {
      id: data.id,
      name: data.name,
      contactInfo: data.contact_info,
      medicalHistory: data.medical_history,
      appointmentHistory: data.appointment_history,
      address: data.address,
      dateOfBirth: data.date_of_birth,
      gender: data.gender,
      insuranceProvider: data.insurance_provider,
      insuranceNumber: data.insurance_number
    };
  },

  async create(patient: NewPatient): Promise<Patient> {
    const { data, error } = await supabase
      .from('patients')
      .insert({
        name: patient.name,
        contact_info: patient.contactInfo,
        medical_history: patient.medicalHistory || null,
        appointment_history: patient.appointmentHistory || null,
        address: patient.address || '',
        date_of_birth: patient.dateOfBirth,
        gender: patient.gender,
        insurance_provider: patient.insuranceProvider,
        insurance_number: patient.insuranceNumber
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating patient:', error);
      throw error;
    }

    return {
      id: data.id,
      name: data.name,
      contactInfo: data.contact_info,
      medicalHistory: data.medical_history,
      appointmentHistory: data.appointment_history,
      address: data.address,
      dateOfBirth: data.date_of_birth,
      gender: data.gender,
      insuranceProvider: data.insurance_provider,
      insuranceNumber: data.insurance_number
    };
  },

  async update(id: string, patient: Partial<Patient>): Promise<Patient> {
    const updateData: any = {};
    
    if (patient.name) updateData.name = patient.name;
    if (patient.contactInfo) updateData.contact_info = patient.contactInfo;
    if (patient.medicalHistory !== undefined) updateData.medical_history = patient.medicalHistory;
    if (patient.appointmentHistory !== undefined) updateData.appointment_history = patient.appointmentHistory;
    if (patient.address) updateData.address = patient.address;
    if (patient.dateOfBirth) updateData.date_of_birth = patient.dateOfBirth;
    if (patient.gender) updateData.gender = patient.gender;
    if (patient.insuranceProvider) updateData.insurance_provider = patient.insuranceProvider;
    if (patient.insuranceNumber) updateData.insurance_number = patient.insuranceNumber;
    
    const { data, error } = await supabase
      .from('patients')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating patient with id ${id}:`, error);
      throw error;
    }

    return {
      id: data.id,
      name: data.name,
      contactInfo: data.contact_info,
      medicalHistory: data.medical_history,
      appointmentHistory: data.appointment_history,
      address: data.address,
      dateOfBirth: data.date_of_birth,
      gender: data.gender,
      insuranceProvider: data.insurance_provider,
      insuranceNumber: data.insurance_number
    };
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting patient with id ${id}:`, error);
      throw error;
    }
  }
};

export const AppointmentService = {
  async getAll(): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        patients:patient_id (name)
      `);
    
    if (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }

    return data.map(a => ({
      id: a.id,
      patientId: a.patient_id,
      patientName: a.patients?.name || 'Unknown',
      date: a.date,
      time: a.time,
      status: a.status as 'Scheduled' | 'Completed' | 'Cancelled' | 'No-Show',
      doctor: a.doctor || undefined,
      department: a.department || undefined,
      notes: a.notes || undefined
    }));
  },

  async getById(id: string): Promise<Appointment> {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        patients:patient_id (name)
      `)
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching appointment with id ${id}:`, error);
      throw error;
    }

    return {
      id: data.id,
      patientId: data.patient_id,
      patientName: data.patients?.name || 'Unknown',
      date: data.date,
      time: data.time,
      status: data.status as 'Scheduled' | 'Completed' | 'Cancelled' | 'No-Show',
      doctor: data.doctor || undefined,
      department: data.department || undefined,
      notes: data.notes || undefined
    };
  },

  async getByPatientId(patientId: string): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        patients:patient_id (name)
      `)
      .eq('patient_id', patientId);
    
    if (error) {
      console.error(`Error fetching appointments for patient ${patientId}:`, error);
      throw error;
    }

    return data.map(a => ({
      id: a.id,
      patientId: a.patient_id,
      patientName: a.patients?.name || 'Unknown',
      date: a.date,
      time: a.time,
      status: a.status as 'Scheduled' | 'Completed' | 'Cancelled' | 'No-Show',
      doctor: a.doctor || undefined,
      department: a.department || undefined,
      notes: a.notes || undefined
    }));
  },

  async create(appointment: Omit<Appointment, 'id'>): Promise<Appointment> {
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
        patients:patient_id (name)
      `)
      .single();
    
    if (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }

    return {
      id: data.id,
      patientId: data.patient_id,
      patientName: data.patients?.name || 'Unknown',
      date: data.date,
      time: data.time,
      status: data.status as 'Scheduled' | 'Completed' | 'Cancelled' | 'No-Show',
      doctor: data.doctor || undefined,
      department: data.department || undefined,
      notes: data.notes || undefined
    };
  },

  async update(id: string, appointment: Partial<Appointment>): Promise<Appointment> {
    const updateData: any = {};
    
    if (appointment.patientId) updateData.patient_id = appointment.patientId;
    if (appointment.date) updateData.date = appointment.date;
    if (appointment.time) updateData.time = appointment.time;
    if (appointment.status) updateData.status = appointment.status;
    if (appointment.doctor !== undefined) updateData.doctor = appointment.doctor;
    if (appointment.department !== undefined) updateData.department = appointment.department;
    if (appointment.notes !== undefined) updateData.notes = appointment.notes;
    
    const { data, error } = await supabase
      .from('appointments')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        patients:patient_id (name)
      `)
      .single();
    
    if (error) {
      console.error(`Error updating appointment with id ${id}:`, error);
      throw error;
    }

    return {
      id: data.id,
      patientId: data.patient_id,
      patientName: data.patients?.name || 'Unknown',
      date: data.date,
      time: data.time,
      status: data.status as 'Scheduled' | 'Completed' | 'Cancelled' | 'No-Show',
      doctor: data.doctor || undefined,
      department: data.department || undefined,
      notes: data.notes || undefined
    };
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting appointment with id ${id}:`, error);
      throw error;
    }
  }
};

export const StaffService = {
  async getAll(): Promise<Staff[]> {
    const { data, error } = await supabase
      .from('staff')
      .select('*');
    
    if (error) {
      console.error('Error fetching staff:', error);
      throw error;
    }

    return data.map(s => ({
      id: s.id,
      name: s.name || s.email || 'Unknown',
      role: s.role,
      department: s.department,
      email: s.email,
      phone: s.phone,
      specialty: s.specialty,
      joiningDate: s.joining_date
    }));
  },

  async getById(id: string): Promise<Staff> {
    const { data, error } = await supabase
      .from('staff')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching staff member with id ${id}:`, error);
      throw error;
    }

    return {
      id: data.id,
      name: data.name || data.email || 'Unknown',
      role: data.role,
      department: data.department,
      email: data.email,
      phone: data.phone,
      specialty: data.specialty,
      joiningDate: data.joining_date
    };
  }
};

export const InventoryService = {
  async getAll(): Promise<InventoryItem[]> {
    const { data, error } = await supabase
      .from('inventory')
      .select('*');
    
    if (error) {
      console.error('Error fetching inventory items:', error);
      throw error;
    }

    return data.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      reorderLevel: item.reorder_level,
      category: item.category,
      supplier: item.supplier,
      lastRestocked: item.last_restocked,
      price: item.price,
      expiryDate: item.expiry_date
    }));
  },

  async create(item: NewInventoryItem): Promise<InventoryItem> {
    const { data, error } = await supabase
      .from('inventory')
      .insert({
        name: item.name,
        quantity: item.quantity,
        reorder_level: item.reorderLevel,
        category: item.category,
        supplier: item.supplier,
        last_restocked: item.lastRestocked,
        price: item.price,
        expiry_date: item.expiryDate
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating inventory item:', error);
      throw error;
    }

    return {
      id: data.id,
      name: data.name,
      quantity: data.quantity,
      reorderLevel: data.reorder_level,
      category: data.category,
      supplier: data.supplier,
      lastRestocked: data.last_restocked,
      price: data.price,
      expiryDate: data.expiry_date
    };
  }
};

export const BillingService = {
  async getAll(): Promise<BillingRecord[]> {
    const { data, error } = await supabase
      .from('billing')
      .select(`
        *,
        patients:patient_id (name)
      `);
    
    if (error) {
      console.error('Error fetching billing records:', error);
      throw error;
    }

    return data.map(record => ({
      id: record.id,
      patientId: record.patient_id,
      patientName: record.patients?.name || 'Unknown',
      amount: record.amount,
      paymentStatus: record.payment_status as 'Paid' | 'Pending' | 'Overdue' | 'Cancelled',
      date: record.date,
      insuranceDetails: record.insurance_details,
      services: record.services,
      invoiceNumber: record.invoice_number
    }));
  },

  async create(record: Omit<BillingRecord, 'id'>): Promise<BillingRecord> {
    const { data, error } = await supabase
      .from('billing')
      .insert({
        patient_id: record.patientId,
        amount: record.amount,
        payment_status: record.paymentStatus,
        date: record.date,
        insurance_details: record.insuranceDetails,
        services: record.services,
        invoice_number: record.invoiceNumber
      })
      .select(`
        *,
        patients:patient_id (name)
      `)
      .single();
    
    if (error) {
      console.error('Error creating billing record:', error);
      throw error;
    }

    return {
      id: data.id,
      patientId: data.patient_id,
      patientName: data.patients?.name || 'Unknown',
      amount: data.amount,
      paymentStatus: data.payment_status as 'Paid' | 'Pending' | 'Overdue' | 'Cancelled',
      date: data.date,
      insuranceDetails: data.insurance_details,
      services: data.services,
      invoiceNumber: data.invoice_number
    };
  }
};

export const DashboardService = {
  async getStats(): Promise<DashboardStats> {
    // Fetch data from Supabase to calculate dashboard statistics
    const { data: patients, error: patientsError } = await supabase
      .from('patients')
      .select('count', { count: 'exact' });
    
    const { data: appointments, error: appointmentsError } = await supabase
      .from('appointments')
      .select('count', { count: 'exact' });
    
    const currentDate = new Date().toISOString().split('T')[0];
    const { data: todayAppointments, error: todayAppointmentsError } = await supabase
      .from('appointments')
      .select('count', { count: 'exact' })
      .eq('date', currentDate);
    
    const { data: upcomingAppointments, error: upcomingAppointmentsError } = await supabase
      .from('appointments')
      .select('count', { count: 'exact' })
      .gt('date', currentDate);
    
    if (patientsError || appointmentsError || todayAppointmentsError || upcomingAppointmentsError) {
      console.error('Error fetching dashboard stats:', {
        patientsError,
        appointmentsError,
        todayAppointmentsError,
        upcomingAppointmentsError
      });
      throw new Error('Failed to fetch dashboard statistics');
    }

    // Mock data for charts until we implement real data aggregation
    const monthlyPatientVisits = [
      { month: 'Jan', visits: 65 },
      { month: 'Feb', visits: 59 },
      { month: 'Mar', visits: 80 },
      { month: 'Apr', visits: 81 },
      { month: 'May', visits: 56 },
      { month: 'Jun', visits: 55 },
      { month: 'Jul', visits: 40 }
    ];

    const departmentDistribution = [
      { department: 'Cardiology', patients: 45 },
      { department: 'Orthopedics', patients: 30 },
      { department: 'Neurology', patients: 25 },
      { department: 'Pediatrics', patients: 35 },
      { department: 'Dermatology', patients: 15 }
    ];

    const appointmentStatus = [
      { status: 'Scheduled', count: 45 },
      { status: 'Completed', count: 35 },
      { status: 'Cancelled', count: 10 },
      { status: 'No-Show', count: 5 }
    ];

    const revenueData = [
      { month: 'Jan', amount: 12000 },
      { month: 'Feb', amount: 19000 },
      { month: 'Mar', amount: 15000 },
      { month: 'Apr', amount: 21000 },
      { month: 'May', amount: 16000 },
      { month: 'Jun', amount: 25000 },
      { month: 'Jul', amount: 23000 }
    ];

    return {
      totalPatients: patients[0]?.count || 0,
      totalAppointments: appointments[0]?.count || 0,
      todayAppointments: todayAppointments[0]?.count || 0,
      upcomingAppointments: upcomingAppointments[0]?.count || 0,
      monthlyPatientVisits,
      departmentDistribution,
      appointmentStatus,
      revenueData
    };
  }
};
