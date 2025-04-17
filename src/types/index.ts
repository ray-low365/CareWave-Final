
export interface Patient {
  id: string;
  name: string;
  contactInfo: string;
  medicalHistory: string;
  appointmentHistory: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
}

export interface NewPatient {
  name: string;
  contactInfo: string;
  medicalHistory: string;
  appointmentHistory: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'No-Show';
  doctor?: string;
  department?: string;
  notes?: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  department: string;
  email?: string;
  phone?: string;
  specialty?: string;
  joiningDate?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  reorderLevel: number;
  category?: string;
  supplier?: string;
  lastRestocked?: string;
  price?: number;
  expiryDate?: string;
}

export interface NewInventoryItem {
  name: string;
  quantity: number;
  reorderLevel: number;
  category?: string;
  supplier?: string;
  lastRestocked?: string;
  price?: number;
  expiryDate?: string;
}

export interface BillingRecord {
  id: string;
  patientId: string;
  patientName: string;
  amount: number;
  paymentStatus: 'Paid' | 'Pending' | 'Overdue' | 'Cancelled';
  date: string;
  insuranceDetails?: string;
  services?: string[];
  invoiceNumber?: string;
}

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
