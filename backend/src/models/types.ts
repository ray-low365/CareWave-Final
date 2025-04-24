// Import database types
import { Database } from '../../../database/models/supabase-types';

// Type aliases for database tables
export type Patient = Database['public']['Tables']['patients']['Row'];
export type PatientInsert = Database['public']['Tables']['patients']['Insert'];
export type PatientUpdate = Database['public']['Tables']['patients']['Update'];

export type Appointment = Database['public']['Tables']['appointments']['Row'];
export type AppointmentInsert = Database['public']['Tables']['appointments']['Insert'];
export type AppointmentUpdate = Database['public']['Tables']['appointments']['Update'];

export type Staff = Database['public']['Tables']['staff']['Row'];
export type StaffInsert = Database['public']['Tables']['staff']['Insert'];
export type StaffUpdate = Database['public']['Tables']['staff']['Update'];

export type Inventory = Database['public']['Tables']['inventory']['Row'];
export type InventoryInsert = Database['public']['Tables']['inventory']['Insert'];
export type InventoryUpdate = Database['public']['Tables']['inventory']['Update'];

export type Billing = Database['public']['Tables']['billing']['Row'];
export type BillingInsert = Database['public']['Tables']['billing']['Insert'];
export type BillingUpdate = Database['public']['Tables']['billing']['Update'];

export type BillingService = Database['public']['Tables']['billing_services']['Row'];
export type BillingServiceInsert = Database['public']['Tables']['billing_services']['Insert'];
export type BillingServiceUpdate = Database['public']['Tables']['billing_services']['Update'];

export type Todo = Database['public']['Tables']['todos']['Row'];
export type TodoInsert = Database['public']['Tables']['todos']['Insert'];
export type TodoUpdate = Database['public']['Tables']['todos']['Update'];

// Extended types with additional properties for frontend
export interface PatientWithAppointments extends Patient {
  appointments?: Appointment[];
}

export interface AppointmentWithPatient extends Appointment {
  patient?: Patient;
}

export interface BillingWithServices extends Billing {
  services?: BillingService[];
}

// Authentication types
export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Dashboard statistics type
export interface DashboardStats {
  totalPatients: number;
  totalAppointments: number;
  todayAppointments: number;
  upcomingAppointments: number;
  monthlyPatientVisits: { month: string; visits: number }[];
  departmentDistribution: { department: string; patients: number }[];
  appointmentStatus: { status: string; count: number }[];
  revenueData: { month: string; amount: number }[];
}
