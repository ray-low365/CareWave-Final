import { Patient, Appointment, Staff, InventoryItem, BillingRecord, DashboardStats } from '../types';

// Get Current and Next Few Weeks' Dates
const today = new Date();
const getCurrentDate = (offsetDays = 0) => {
  const date = new Date(today);
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split('T')[0];
};

// Generate Time Slots
const generateTimeSlot = (hour: number, minute: number) => {
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
};

// Mock Patients Data with Kenyan and Ugandan names
export const patients: Patient[] = [
  { id: 1, name: 'Wafula Otieno', contactInfo: 'wafula.otieno@gmail.com', medicalHistory: 'History of hypertension', appointmentHistory: 'Regular checkups', dateOfBirth: '1985-05-10', gender: 'Male', address: '123 Moi Avenue, Nairobi', insuranceProvider: 'Jubilee Insurance', insuranceNumber: 'JB123456' },
  { id: 2, name: 'Akinyi Wanjiku', contactInfo: 'akinyi.wanjiku@gmail.com', medicalHistory: 'Allergic to penicillin', appointmentHistory: 'Annual checkups', dateOfBirth: '1990-08-15', gender: 'Female', address: '456 Kenyatta Avenue, Nakuru', insuranceProvider: 'NHIF', insuranceNumber: 'NH789012' },
  { id: 3, name: 'Namukwaya Adeke', contactInfo: 'namukwaya.adeke@gmail.com', medicalHistory: 'Diabetic', appointmentHistory: 'Monthly checkups', dateOfBirth: '1978-11-20', gender: 'Female', address: '789 Tom Mboya Street, Mombasa', insuranceProvider: 'AAR', insuranceNumber: 'AAR345678' },
  { id: 4, name: 'Ochen Mutua', contactInfo: 'ochen.mutua@gmail.com', medicalHistory: 'Asthmatic', appointmentHistory: 'Quarterly checkups', dateOfBirth: '1982-07-05', gender: 'Male', address: '321 Uhuru Highway, Kisumu', insuranceProvider: 'Britam', insuranceNumber: 'BR901234' },
  { id: 5, name: 'Kato Kamau', contactInfo: 'kato.kamau@gmail.com', medicalHistory: 'No significant history', appointmentHistory: 'First visit', dateOfBirth: '1995-01-25', gender: 'Male', address: '654 Ngong Road, Nairobi', insuranceProvider: 'Resolution Insurance', insuranceNumber: 'RI567890' },
  { id: 6, name: 'Wambui Atieno', contactInfo: 'wambui.atieno@gmail.com', medicalHistory: 'Migraines', appointmentHistory: 'Biannual checkups', dateOfBirth: '1988-09-12', gender: 'Female', address: '987 Kimathi Street, Nyeri', insuranceProvider: 'CIC Insurance', insuranceNumber: 'CIC123456' },
  { id: 7, name: 'Okello Mwangi', contactInfo: 'okello.mwangi@gmail.com', medicalHistory: 'High cholesterol', appointmentHistory: 'Annual checkups', dateOfBirth: '1975-03-30', gender: 'Male', address: '159 Oginga Odinga Road, Kakamega', insuranceProvider: 'Heritage Insurance', insuranceNumber: 'HI789012' },
  { id: 8, name: 'Nafula Omondi', contactInfo: 'nafula.omondi@gmail.com', medicalHistory: 'Arthritis', appointmentHistory: 'Monthly checkups', dateOfBirth: '1970-12-15', gender: 'Female', address: '753 Ronald Ngala Street, Eldoret', insuranceProvider: 'NHIF', insuranceNumber: 'NH345678' },
  { id: 9, name: 'Mugisha Githinji', contactInfo: 'mugisha.githinji@gmail.com', medicalHistory: 'No significant history', appointmentHistory: 'First visit', dateOfBirth: '1992-06-20', gender: 'Male', address: '852 Moi Avenue, Machakos', insuranceProvider: 'Jubilee Insurance', insuranceNumber: 'JB901234' },
  { id: 10, name: 'Amina Waweru', contactInfo: 'amina.waweru@gmail.com', medicalHistory: 'Anemia', appointmentHistory: 'Quarterly checkups', dateOfBirth: '1980-04-10', gender: 'Female', address: '426 Haile Selassie Avenue, Nairobi', insuranceProvider: 'NHIF', insuranceNumber: 'NH567890' }
];

// Mock Appointments Data - Updating to use the new patient names
export const appointments: Appointment[] = [
  { id: 1, patientId: 1, patientName: 'Wafula Otieno', date: getCurrentDate(1), time: generateTimeSlot(10, 0), status: 'Scheduled', doctor: 'Dr. Smith', department: 'Cardiology', notes: 'Regular checkup' },
  { id: 2, patientId: 2, patientName: 'Akinyi Wanjiku', date: getCurrentDate(2), time: generateTimeSlot(11, 0), status: 'Scheduled', doctor: 'Dr. Johnson', department: 'Pediatrics', notes: 'Annual physical' },
  { id: 3, patientId: 3, patientName: 'Namukwaya Adeke', date: getCurrentDate(3), time: generateTimeSlot(12, 0), status: 'Scheduled', doctor: 'Dr. Williams', department: 'Endocrinology', notes: 'Diabetes follow-up' },
  { id: 4, patientId: 4, patientName: 'Ochen Mutua', date: getCurrentDate(4), time: generateTimeSlot(13, 0), status: 'Scheduled', doctor: 'Dr. Davis', department: 'Pulmonology', notes: 'Asthma follow-up' },
  { id: 5, patientId: 5, patientName: 'Kato Kamau', date: getCurrentDate(5), time: generateTimeSlot(14, 0), status: 'Scheduled', doctor: 'Dr. Miller', department: 'General Medicine', notes: 'Initial consultation' },
  { id: 6, patientId: 6, patientName: 'Wambui Atieno', date: getCurrentDate(6), time: generateTimeSlot(15, 0), status: 'Scheduled', doctor: 'Dr. Wilson', department: 'Neurology', notes: 'Migraine treatment' },
  { id: 7, patientId: 7, patientName: 'Okello Mwangi', date: getCurrentDate(7), time: generateTimeSlot(10, 30), status: 'Scheduled', doctor: 'Dr. Smith', department: 'Cardiology', notes: 'Cholesterol check' },
  { id: 8, patientId: 8, patientName: 'Nafula Omondi', date: getCurrentDate(8), time: generateTimeSlot(11, 30), status: 'Scheduled', doctor: 'Dr. Moore', department: 'Rheumatology', notes: 'Arthritis treatment' },
  { id: 9, patientId: 9, patientName: 'Mugisha Githinji', date: getCurrentDate(9), time: generateTimeSlot(12, 30), status: 'Scheduled', doctor: 'Dr. Taylor', department: 'General Medicine', notes: 'Initial consultation' },
  { id: 10, patientId: 10, patientName: 'Amina Waweru', date: getCurrentDate(10), time: generateTimeSlot(13, 30), status: 'Scheduled', doctor: 'Dr. Anderson', department: 'Hematology', notes: 'Anemia follow-up' },
  { id: 11, patientId: 1, patientName: 'Wafula Otieno', date: getCurrentDate(0), time: generateTimeSlot(14, 30), status: 'Completed', doctor: 'Dr. Smith', department: 'Cardiology', notes: 'Blood pressure check' },
  { id: 12, patientId: 2, patientName: 'Akinyi Wanjiku', date: getCurrentDate(-1), time: generateTimeSlot(15, 30), status: 'Completed', doctor: 'Dr. Johnson', department: 'Pediatrics', notes: 'Vaccination' },
  { id: 13, patientId: 3, patientName: 'Namukwaya Adeke', date: getCurrentDate(13), time: generateTimeSlot(10, 0), status: 'Scheduled', doctor: 'Dr. Williams', department: 'Endocrinology', notes: 'Insulin adjustment' },
  { id: 14, patientId: 4, patientName: 'Ochen Mutua', date: getCurrentDate(14), time: generateTimeSlot(11, 0), status: 'Scheduled', doctor: 'Dr. Davis', department: 'Pulmonology', notes: 'Breathing test' },
  { id: 15, patientId: 5, patientName: 'Kato Kamau', date: getCurrentDate(15), time: generateTimeSlot(12, 0), status: 'Scheduled', doctor: 'Dr. Miller', department: 'General Medicine', notes: 'Follow-up consultation' },
  { id: 16, patientId: 6, patientName: 'Wambui Atieno', date: getCurrentDate(16), time: generateTimeSlot(13, 0), status: 'Scheduled', doctor: 'Dr. Wilson', department: 'Neurology', notes: 'MRI review' },
  { id: 17, patientId: 7, patientName: 'Okello Mwangi', date: getCurrentDate(17), time: generateTimeSlot(14, 0), status: 'Scheduled', doctor: 'Dr. Smith', department: 'Cardiology', notes: 'ECG test' },
  { id: 18, patientId: 8, patientName: 'Nafula Omondi', date: getCurrentDate(18), time: generateTimeSlot(15, 0), status: 'Scheduled', doctor: 'Dr. Moore', department: 'Rheumatology', notes: 'Joint pain assessment' },
  { id: 19, patientId: 9, patientName: 'Mugisha Githinji', date: getCurrentDate(-2), time: generateTimeSlot(10, 30), status: 'No-Show', doctor: 'Dr. Taylor', department: 'General Medicine', notes: 'Follow-up consultation' },
  { id: 20, patientId: 10, patientName: 'Amina Waweru', date: getCurrentDate(-3), time: generateTimeSlot(11, 30), status: 'Cancelled', doctor: 'Dr. Anderson', department: 'Hematology', notes: 'Blood work' }
];

// Mock Staff Data
export const staff: Staff[] = [
  { id: 1, name: 'Dr. Robert Smith', role: 'Doctor', department: 'Cardiology', email: 'robert.smith@carewave.com', phone: '555-123-4567', specialty: 'Heart Disease', joiningDate: '2020-03-15' },
  { id: 2, name: 'Dr. Sarah Johnson', role: 'Doctor', department: 'Pediatrics', email: 'sarah.johnson@carewave.com', phone: '555-234-5678', specialty: 'Child Health', joiningDate: '2021-06-22' },
  { id: 3, name: 'Kevin Williams', role: 'Administrator', department: 'Billing', email: 'kevin.williams@carewave.com', phone: '555-345-6789', joiningDate: '2022-11-10' },
  { id: 4, name: 'Lisa Davis', role: 'Pharmacist', department: 'Pharmacy', email: 'lisa.davis@carewave.com', phone: '555-456-7890', joiningDate: '2022-01-05' },
  { id: 5, name: 'Michael Brown', role: 'Receptionist', department: 'Front Desk', email: 'michael.brown@carewave.com', phone: '555-567-8901', joiningDate: '2023-08-30' },
  { id: 6, name: 'Dr. Jennifer Wilson', role: 'Doctor', department: 'Neurology', email: 'jennifer.wilson@carewave.com', phone: '555-678-9012', specialty: 'Brain Disorders', joiningDate: '2021-05-17' },
  { id: 7, name: 'Dr. James Taylor', role: 'Doctor', department: 'General Medicine', email: 'james.taylor@carewave.com', phone: '555-789-0123', specialty: 'Primary Care', joiningDate: '2022-09-12' },
  { id: 8, name: 'Dr. Emily Moore', role: 'Doctor', department: 'Rheumatology', email: 'emily.moore@carewave.com', phone: '555-890-1234', specialty: 'Arthritis', joiningDate: '2020-07-23' },
  { id: 9, name: 'David Anderson', role: 'Nurse', department: 'Emergency', email: 'david.anderson@carewave.com', phone: '555-901-2345', joiningDate: '2023-02-14' },
  { id: 10, name: 'Amanda Miller', role: 'Nurse', department: 'ICU', email: 'amanda.miller@carewave.com', phone: '555-012-3456', joiningDate: '2023-04-01' }
];

// Mock Inventory Data
export const inventory: InventoryItem[] = [
  { id: 1, name: 'Surgical Gloves', quantity: 500, reorderLevel: 100, category: 'Supplies', supplier: 'MedSupply Co.', lastRestocked: '2024-03-15', price: 0.50, expiryDate: '2026-03-15' },
  { id: 2, name: 'Surgical Masks', quantity: 1000, reorderLevel: 200, category: 'Supplies', supplier: 'MedSupply Co.', lastRestocked: '2024-03-10', price: 0.30, expiryDate: '2026-03-10' },
  { id: 3, name: 'Paracetamol', quantity: 300, reorderLevel: 50, category: 'Medication', supplier: 'PharmaCorp', lastRestocked: '2024-03-05', price: 5.00, expiryDate: '2025-03-05' },
  { id: 4, name: 'Ibuprofen', quantity: 250, reorderLevel: 50, category: 'Medication', supplier: 'PharmaCorp', lastRestocked: '2024-03-01', price: 6.00, expiryDate: '2025-03-01' },
  { id: 5, name: 'Syringes', quantity: 400, reorderLevel: 80, category: 'Supplies', supplier: 'MedEquip Inc.', lastRestocked: '2024-02-28', price: 0.75, expiryDate: '2026-02-28' },
  { id: 6, name: 'Bandages', quantity: 600, reorderLevel: 100, category: 'Supplies', supplier: 'MedEquip Inc.', lastRestocked: '2024-02-25', price: 1.20, expiryDate: '2026-02-25' },
  { id: 7, name: 'Antibiotics', quantity: 150, reorderLevel: 30, category: 'Medication', supplier: 'PharmaCorp', lastRestocked: '2024-02-20', price: 12.00, expiryDate: '2025-02-20' },
  { id: 8, name: 'Disinfectant', quantity: 200, reorderLevel: 40, category: 'Supplies', supplier: 'CleanMed Ltd.', lastRestocked: '2024-02-15', price: 8.50, expiryDate: '2026-02-15' },
  { id: 9, name: 'Thermometers', quantity: 50, reorderLevel: 10, category: 'Equipment', supplier: 'MedTech Solutions', lastRestocked: '2024-02-10', price: 15.00 },
  { id: 10, name: 'Blood Pressure Monitors', quantity: 25, reorderLevel: 5, category: 'Equipment', supplier: 'MedTech Solutions', lastRestocked: '2024-02-05', price: 65.00 },
  { id: 11, name: 'Gauze Pads', quantity: 350, reorderLevel: 70, category: 'Supplies', supplier: 'MedEquip Inc.', lastRestocked: '2024-02-01', price: 2.00, expiryDate: '2026-02-01' },
  { id: 12, name: 'Insulin', quantity: 80, reorderLevel: 20, category: 'Medication', supplier: 'PharmaCorp', lastRestocked: '2024-01-28', price: 45.00, expiryDate: '2025-01-28' },
  { id: 13, name: 'Wheelchairs', quantity: 10, reorderLevel: 2, category: 'Equipment', supplier: 'MobilityAid Co.', lastRestocked: '2024-01-20', price: 250.00 },
  { id: 14, name: 'First Aid Kits', quantity: 30, reorderLevel: 5, category: 'Supplies', supplier: 'MedSupply Co.', lastRestocked: '2024-01-15', price: 25.00, expiryDate: '2026-01-15' },
  { id: 15, name: 'Sterile Wipes', quantity: 450, reorderLevel: 90, category: 'Supplies', supplier: 'CleanMed Ltd.', lastRestocked: '2024-01-10', price: 0.40, expiryDate: '2026-01-10' }
];

// Mock Billing Data - Updating to use the new patient names
export const billing: BillingRecord[] = [
  { id: 1, patientId: 1, patientName: 'Wafula Otieno', amount: 150.00, paymentStatus: 'Paid', date: '2024-03-15', insuranceDetails: 'Jubilee Insurance, 80% coverage', services: ['Consultation', 'Blood Test'], invoiceNumber: 'INV-2024-001' },
  { id: 2, patientId: 2, patientName: 'Akinyi Wanjiku', amount: 200.00, paymentStatus: 'Paid', date: '2024-03-14', insuranceDetails: 'NHIF, 70% coverage', services: ['Annual Physical', 'Vaccination'], invoiceNumber: 'INV-2024-002' },
  { id: 3, patientId: 3, patientName: 'Namukwaya Adeke', amount: 120.00, paymentStatus: 'Pending', date: '2024-03-13', insuranceDetails: 'AAR, 75% coverage', services: ['Diabetes Consultation'], invoiceNumber: 'INV-2024-003' },
  { id: 4, patientId: 4, patientName: 'Ochen Mutua', amount: 180.00, paymentStatus: 'Pending', date: '2024-03-12', insuranceDetails: 'Britam, 65% coverage', services: ['Pulmonary Function Test', 'Consultation'], invoiceNumber: 'INV-2024-004' },
  { id: 5, patientId: 5, patientName: 'Kato Kamau', amount: 100.00, paymentStatus: 'Paid', date: '2024-03-11', insuranceDetails: 'Resolution Insurance, 90% coverage', services: ['Initial Consultation'], invoiceNumber: 'INV-2024-005' },
  { id: 6, patientId: 6, patientName: 'Wambui Atieno', amount: 250.00, paymentStatus: 'Overdue', date: '2024-03-10', insuranceDetails: 'CIC Insurance, 60% coverage', services: ['Neurological Examination', 'MRI Scan'], invoiceNumber: 'INV-2024-006' },
  { id: 7, patientId: 7, patientName: 'Okello Mwangi', amount: 165.00, paymentStatus: 'Paid', date: '2024-03-09', insuranceDetails: 'Heritage Insurance, 75% coverage', services: ['Cardiac Evaluation', 'ECG'], invoiceNumber: 'INV-2024-007' },
  { id: 8, patientId: 8, patientName: 'Nafula Omondi', amount: 195.00, paymentStatus: 'Pending', date: '2024-03-08', insuranceDetails: 'NHIF, 80% coverage', services: ['Joint Assessment', 'X-Ray'], invoiceNumber: 'INV-2024-008' },
  { id: 9, patientId: 9, patientName: 'Mugisha Githinji', amount: 90.00, paymentStatus: 'Cancelled', date: '2024-03-07', insuranceDetails: 'Jubilee Insurance, 70% coverage', services: ['Consultation (Cancelled)'], invoiceNumber: 'INV-2024-009' },
  { id: 10, patientId: 10, patientName: 'Amina Waweru', amount: 210.00, paymentStatus: 'Paid', date: '2024-03-06', insuranceDetails: 'NHIF, 100% coverage', services: ['Blood Work', 'Consultation'], invoiceNumber: 'INV-2024-010' }
];

// Dashboard Statistics
export const dashboardStats: DashboardStats = {
  totalPatients: patients.length,
  totalAppointments: appointments.length,
  todayAppointments: appointments.filter(app => app.date === getCurrentDate(0)).length,
  upcomingAppointments: appointments.filter(app => new Date(app.date) > new Date() && app.status === 'Scheduled').length,
  monthlyPatientVisits: [
    { month: 'Jan', visits: 45 },
    { month: 'Feb', visits: 52 },
    { month: 'Mar', visits: 49 },
    { month: 'Apr', visits: 62 },
    { month: 'May', visits: 55 },
    { month: 'Jun', visits: 60 },
    { month: 'Jul', visits: 68 },
    { month: 'Aug', visits: 72 },
    { month: 'Sep', visits: 80 },
    { month: 'Oct', visits: 76 },
    { month: 'Nov', visits: 70 },
    { month: 'Dec', visits: 65 }
  ],
  departmentDistribution: [
    { department: 'Cardiology', patients: 25 },
    { department: 'Pediatrics', patients: 18 },
    { department: 'Neurology', patients: 15 },
    { department: 'Orthopedics', patients: 12 },
    { department: 'General Medicine', patients: 30 }
  ],
  appointmentStatus: [
    { status: 'Scheduled', count: 16 },
    { status: 'Completed', count: 2 },
    { status: 'Cancelled', count: 1 },
    { status: 'No-Show', count: 1 }
  ],
  revenueData: [
    { month: 'Jan', amount: 12500 },
    { month: 'Feb', amount: 13200 },
    { month: 'Mar', amount: 12800 },
    { month: 'Apr', amount: 15600 },
    { month: 'May', amount: 14500 },
    { month: 'Jun', amount: 15000 },
    { month: 'Jul', amount: 16200 },
    { month: 'Aug', amount: 17500 },
    { month: 'Sep', amount: 18000 },
    { month: 'Oct', amount: 17200 },
    { month: 'Nov', amount: 16500 },
    { month: 'Dec', amount: 15800 }
  ]
};
