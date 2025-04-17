
import { Patient, Appointment, Staff, InventoryItem, BillingRecord, DashboardStats, NewPatient, NewInventoryItem } from '../types';
import { patients, appointments, staff, inventory, billing, dashboardStats } from './mockData';

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API Service for Patients
export const PatientService = {
  getAll: async (): Promise<Patient[]> => {
    await delay(500); // Simulate network delay
    return [...patients];
  },
  
  getById: async (id: string): Promise<Patient> => {
    await delay(300);
    const patient = patients.find(p => p.id === id);
    if (!patient) throw new Error('Patient not found');
    return { ...patient };
  },
  
  create: async (patient: NewPatient): Promise<Patient> => {
    await delay(700);
    const newPatient = {
      ...patient,
      id: String(Math.max(...patients.map(p => parseInt(p.id)), 0) + 1)
    };
    patients.push(newPatient as Patient);
    return { ...newPatient as Patient };
  },
  
  update: async (id: string, patient: Partial<Patient>): Promise<Patient> => {
    await delay(500);
    const index = patients.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Patient not found');
    
    const updatedPatient = { ...patients[index], ...patient };
    patients[index] = updatedPatient;
    return { ...updatedPatient };
  },
  
  delete: async (id: string): Promise<void> => {
    await delay(600);
    const index = patients.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Patient not found');
    patients.splice(index, 1);
  }
};

// API Service for Appointments
export const AppointmentService = {
  getAll: async (): Promise<Appointment[]> => {
    await delay(500);
    return [...appointments];
  },
  
  getById: async (id: string): Promise<Appointment> => {
    await delay(300);
    const appointment = appointments.find(a => a.id === id);
    if (!appointment) throw new Error('Appointment not found');
    return { ...appointment };
  },
  
  getByPatientId: async (patientId: string): Promise<Appointment[]> => {
    await delay(400);
    return appointments.filter(a => a.patientId === patientId).map(a => ({ ...a }));
  },
  
  create: async (appointment: Omit<Appointment, 'id'>): Promise<Appointment> => {
    await delay(700);
    const newAppointment = {
      ...appointment,
      id: String(Math.max(...appointments.map(a => parseInt(a.id)), 0) + 1)
    };
    appointments.push(newAppointment as Appointment);
    return { ...newAppointment as Appointment };
  },
  
  update: async (id: string, appointment: Partial<Appointment>): Promise<Appointment> => {
    await delay(500);
    const index = appointments.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Appointment not found');
    
    const updatedAppointment = { ...appointments[index], ...appointment };
    appointments[index] = updatedAppointment;
    return { ...updatedAppointment };
  },
  
  delete: async (id: string): Promise<void> => {
    await delay(600);
    const index = appointments.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Appointment not found');
    appointments.splice(index, 1);
  }
};

// API Service for Staff
export const StaffService = {
  getAll: async (): Promise<Staff[]> => {
    await delay(500);
    return [...staff];
  },
  
  getById: async (id: string): Promise<Staff> => {
    await delay(300);
    const member = staff.find(s => s.id === id);
    if (!member) throw new Error('Staff member not found');
    return { ...member };
  },
  
  create: async (member: Omit<Staff, 'id'>): Promise<Staff> => {
    await delay(700);
    const newMember = {
      ...member,
      id: String(Math.max(...staff.map(s => parseInt(s.id)), 0) + 1)
    };
    staff.push(newMember as Staff);
    return { ...newMember as Staff };
  },
  
  update: async (id: string, member: Partial<Staff>): Promise<Staff> => {
    await delay(500);
    const index = staff.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Staff member not found');
    
    const updatedMember = { ...staff[index], ...member };
    staff[index] = updatedMember;
    return { ...updatedMember };
  },
  
  delete: async (id: string): Promise<void> => {
    await delay(600);
    const index = staff.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Staff member not found');
    staff.splice(index, 1);
  }
};

// API Service for Inventory
export const InventoryService = {
  getAll: async (): Promise<InventoryItem[]> => {
    await delay(500);
    return [...inventory];
  },
  
  getById: async (id: string): Promise<InventoryItem> => {
    await delay(300);
    const item = inventory.find(i => i.id === id);
    if (!item) throw new Error('Inventory item not found');
    return { ...item };
  },
  
  create: async (item: NewInventoryItem): Promise<InventoryItem> => {
    await delay(700);
    const newItem = {
      ...item,
      id: String(Math.max(...inventory.map(i => parseInt(i.id)), 0) + 1)
    };
    inventory.push(newItem as InventoryItem);
    return { ...newItem as InventoryItem };
  },
  
  update: async (id: string, item: Partial<InventoryItem>): Promise<InventoryItem> => {
    await delay(500);
    const index = inventory.findIndex(i => i.id === id);
    if (index === -1) throw new Error('Inventory item not found');
    
    const updatedItem = { ...inventory[index], ...item };
    inventory[index] = updatedItem;
    return { ...updatedItem };
  },
  
  delete: async (id: string): Promise<void> => {
    await delay(600);
    const index = inventory.findIndex(i => i.id === id);
    if (index === -1) throw new Error('Inventory item not found');
    inventory.splice(index, 1);
  }
};

// API Service for Billing
export const BillingService = {
  getAll: async (): Promise<BillingRecord[]> => {
    await delay(500);
    return [...billing];
  },
  
  getById: async (id: string): Promise<BillingRecord> => {
    await delay(300);
    const record = billing.find(b => b.id === id);
    if (!record) throw new Error('Billing record not found');
    return { ...record };
  },
  
  getByPatientId: async (patientId: string): Promise<BillingRecord[]> => {
    await delay(400);
    return billing.filter(b => b.patientId === patientId).map(b => ({ ...b }));
  },
  
  create: async (record: Omit<BillingRecord, 'id'>): Promise<BillingRecord> => {
    await delay(700);
    const newRecord = {
      ...record,
      id: String(Math.max(...billing.map(b => parseInt(b.id)), 0) + 1)
    };
    billing.push(newRecord as BillingRecord);
    return { ...newRecord as BillingRecord };
  },
  
  update: async (id: string, record: Partial<BillingRecord>): Promise<BillingRecord> => {
    await delay(500);
    const index = billing.findIndex(b => b.id === id);
    if (index === -1) throw new Error('Billing record not found');
    
    const updatedRecord = { ...billing[index], ...record };
    billing[index] = updatedRecord;
    return { ...updatedRecord };
  },
  
  delete: async (id: string): Promise<void> => {
    await delay(600);
    const index = billing.findIndex(b => b.id === id);
    if (index === -1) throw new Error('Billing record not found');
    billing.splice(index, 1);
  }
};

// API Service for Dashboard Statistics
export const DashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    await delay(800);
    return { ...dashboardStats };
  }
};
