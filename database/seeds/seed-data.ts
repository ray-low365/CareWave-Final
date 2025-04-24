// Helper functions for date generation
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

// Seed data for patients
export const patientsSeed = [
  { id: "1", name: 'Wafula Otieno', contact_info: 'wafula.otieno@gmail.com', medical_history: 'History of hypertension', appointment_history: 'Regular checkups', date_of_birth: '1985-05-10', gender: 'Male', address: '123 Moi Avenue, Nairobi', insurance_provider: 'Jubilee Insurance', insurance_number: 'JB123456' },
  { id: "2", name: 'Akinyi Wanjiku', contact_info: 'akinyi.wanjiku@gmail.com', medical_history: 'Allergic to penicillin', appointment_history: 'Annual checkups', date_of_birth: '1990-08-15', gender: 'Female', address: '456 Kenyatta Avenue, Nakuru', insurance_provider: 'NHIF', insurance_number: 'NH789012' },
  { id: "3", name: 'Namukwaya Adeke', contact_info: 'namukwaya.adeke@gmail.com', medical_history: 'Diabetic', appointment_history: 'Monthly checkups', date_of_birth: '1978-11-20', gender: 'Female', address: '789 Tom Mboya Street, Mombasa', insurance_provider: 'AAR', insurance_number: 'AAR345678' },
  { id: "4", name: 'Ochen Mutua', contact_info: 'ochen.mutua@gmail.com', medical_history: 'Asthmatic', appointment_history: 'Quarterly checkups', date_of_birth: '1982-07-05', gender: 'Male', address: '321 Uhuru Highway, Kisumu', insurance_provider: 'Britam', insurance_number: 'BR901234' },
  { id: "5", name: 'Kato Kamau', contact_info: 'kato.kamau@gmail.com', medical_history: 'No significant history', appointment_history: 'First visit', date_of_birth: '1995-01-25', gender: 'Male', address: '654 Ngong Road, Nairobi', insurance_provider: 'Resolution Insurance', insurance_number: 'RI567890' },
  { id: "6", name: 'Wambui Atieno', contact_info: 'wambui.atieno@gmail.com', medical_history: 'Migraines', appointment_history: 'Biannual checkups', date_of_birth: '1988-09-12', gender: 'Female', address: '987 Kimathi Street, Nyeri', insurance_provider: 'CIC Insurance', insurance_number: 'CIC123456' },
  { id: "7", name: 'Okello Mwangi', contact_info: 'okello.mwangi@gmail.com', medical_history: 'High cholesterol', appointment_history: 'Annual checkups', date_of_birth: '1975-03-30', gender: 'Male', address: '159 Oginga Odinga Road, Kakamega', insurance_provider: 'Heritage Insurance', insurance_number: 'HI789012' },
  { id: "8", name: 'Nafula Omondi', contact_info: 'nafula.omondi@gmail.com', medical_history: 'Arthritis', appointment_history: 'Monthly checkups', date_of_birth: '1970-12-15', gender: 'Female', address: '753 Ronald Ngala Street, Eldoret', insurance_provider: 'NHIF', insurance_number: 'NH345678' },
  { id: "9", name: 'Mugisha Githinji', contact_info: 'mugisha.githinji@gmail.com', medical_history: 'No significant history', appointment_history: 'First visit', date_of_birth: '1992-06-20', gender: 'Male', address: '852 Moi Avenue, Machakos', insurance_provider: 'Jubilee Insurance', insurance_number: 'JB901234' },
  { id: "10", name: 'Amina Waweru', contact_info: 'amina.waweru@gmail.com', medical_history: 'Anemia', appointment_history: 'Quarterly checkups', date_of_birth: '1980-04-10', gender: 'Female', address: '426 Haile Selassie Avenue, Nairobi', insurance_provider: 'NHIF', insurance_number: 'NH567890' }
];

// Seed data for appointments
export const appointmentsSeed = [
  { id: "1", patient_id: "1", date: getCurrentDate(1), time: generateTimeSlot(10, 0), status: 'Scheduled', doctor: 'Dr. Smith', department: 'Cardiology', notes: 'Regular checkup' },
  { id: "2", patient_id: "2", date: getCurrentDate(2), time: generateTimeSlot(11, 0), status: 'Scheduled', doctor: 'Dr. Johnson', department: 'Pediatrics', notes: 'Annual physical' },
  { id: "3", patient_id: "3", date: getCurrentDate(3), time: generateTimeSlot(12, 0), status: 'Scheduled', doctor: 'Dr. Williams', department: 'Endocrinology', notes: 'Diabetes follow-up' },
  { id: "4", patient_id: "4", date: getCurrentDate(4), time: generateTimeSlot(13, 0), status: 'Scheduled', doctor: 'Dr. Davis', department: 'Pulmonology', notes: 'Asthma follow-up' },
  { id: "5", patient_id: "5", date: getCurrentDate(5), time: generateTimeSlot(14, 0), status: 'Scheduled', doctor: 'Dr. Miller', department: 'General Medicine', notes: 'Initial consultation' },
  { id: "6", patient_id: "6", date: getCurrentDate(6), time: generateTimeSlot(15, 0), status: 'Scheduled', doctor: 'Dr. Wilson', department: 'Neurology', notes: 'Migraine treatment' },
  { id: "7", patient_id: "7", date: getCurrentDate(7), time: generateTimeSlot(10, 30), status: 'Scheduled', doctor: 'Dr. Smith', department: 'Cardiology', notes: 'Cholesterol check' },
  { id: "8", patient_id: "8", date: getCurrentDate(8), time: generateTimeSlot(11, 30), status: 'Scheduled', doctor: 'Dr. Moore', department: 'Rheumatology', notes: 'Arthritis treatment' },
  { id: "9", patient_id: "9", date: getCurrentDate(9), time: generateTimeSlot(12, 30), status: 'Scheduled', doctor: 'Dr. Taylor', department: 'General Medicine', notes: 'Initial consultation' },
  { id: "10", patient_id: "10", date: getCurrentDate(10), time: generateTimeSlot(13, 30), status: 'Scheduled', doctor: 'Dr. Anderson', department: 'Hematology', notes: 'Anemia follow-up' },
  { id: "11", patient_id: "1", date: getCurrentDate(0), time: generateTimeSlot(14, 30), status: 'Completed', doctor: 'Dr. Smith', department: 'Cardiology', notes: 'Blood pressure check' },
  { id: "12", patient_id: "2", date: getCurrentDate(-1), time: generateTimeSlot(15, 30), status: 'Completed', doctor: 'Dr. Johnson', department: 'Pediatrics', notes: 'Vaccination' },
  { id: "13", patient_id: "3", date: getCurrentDate(13), time: generateTimeSlot(10, 0), status: 'Scheduled', doctor: 'Dr. Williams', department: 'Endocrinology', notes: 'Insulin adjustment' },
  { id: "14", patient_id: "4", date: getCurrentDate(14), time: generateTimeSlot(11, 0), status: 'Scheduled', doctor: 'Dr. Davis', department: 'Pulmonology', notes: 'Breathing test' },
  { id: "15", patient_id: "5", date: getCurrentDate(15), time: generateTimeSlot(12, 0), status: 'Scheduled', doctor: 'Dr. Miller', department: 'General Medicine', notes: 'Follow-up consultation' },
  { id: "16", patient_id: "6", date: getCurrentDate(16), time: generateTimeSlot(13, 0), status: 'Scheduled', doctor: 'Dr. Wilson', department: 'Neurology', notes: 'MRI review' },
  { id: "17", patient_id: "7", date: getCurrentDate(17), time: generateTimeSlot(14, 0), status: 'Scheduled', doctor: 'Dr. Smith', department: 'Cardiology', notes: 'ECG test' },
  { id: "18", patient_id: "8", date: getCurrentDate(18), time: generateTimeSlot(15, 0), status: 'Scheduled', doctor: 'Dr. Moore', department: 'Rheumatology', notes: 'Joint pain assessment' },
  { id: "19", patient_id: "9", date: getCurrentDate(-2), time: generateTimeSlot(10, 30), status: 'No-Show', doctor: 'Dr. Taylor', department: 'General Medicine', notes: 'Follow-up consultation' },
  { id: "20", patient_id: "10", date: getCurrentDate(-3), time: generateTimeSlot(11, 30), status: 'Cancelled', doctor: 'Dr. Anderson', department: 'Hematology', notes: 'Blood work' }
];

// Seed data for staff
export const staffSeed = [
  { id: "1", name: 'Dr. Robert Smith', role: 'Doctor', department: 'Cardiology', email: 'robert.smith@carewave.com', phone: '555-123-4567', specialty: 'Heart Disease', joining_date: '2020-03-15' },
  { id: "2", name: 'Dr. Sarah Johnson', role: 'Doctor', department: 'Pediatrics', email: 'sarah.johnson@carewave.com', phone: '555-234-5678', specialty: 'Child Health', joining_date: '2021-06-22' },
  { id: "3", name: 'Kevin Williams', role: 'Administrator', department: 'Billing', email: 'kevin.williams@carewave.com', phone: '555-345-6789', joining_date: '2022-11-10' },
  { id: "4", name: 'Lisa Davis', role: 'Pharmacist', department: 'Pharmacy', email: 'lisa.davis@carewave.com', phone: '555-456-7890', joining_date: '2022-01-05' },
  { id: "5", name: 'Michael Brown', role: 'Receptionist', department: 'Front Desk', email: 'michael.brown@carewave.com', phone: '555-567-8901', joining_date: '2023-08-30' },
  { id: "6", name: 'Dr. Jennifer Wilson', role: 'Doctor', department: 'Neurology', email: 'jennifer.wilson@carewave.com', phone: '555-678-9012', specialty: 'Brain Disorders', joining_date: '2021-05-17' },
  { id: "7", name: 'Dr. James Taylor', role: 'Doctor', department: 'General Medicine', email: 'james.taylor@carewave.com', phone: '555-789-0123', specialty: 'Primary Care', joining_date: '2022-09-12' },
  { id: "8", name: 'Dr. Emily Moore', role: 'Doctor', department: 'Rheumatology', email: 'emily.moore@carewave.com', phone: '555-890-1234', specialty: 'Arthritis', joining_date: '2020-07-23' },
  { id: "9", name: 'David Anderson', role: 'Nurse', department: 'Emergency', email: 'david.anderson@carewave.com', phone: '555-901-2345', joining_date: '2023-02-14' },
  { id: "10", name: 'Amanda Miller', role: 'Nurse', department: 'ICU', email: 'amanda.miller@carewave.com', phone: '555-012-3456', joining_date: '2023-04-01' }
];

// Seed data for inventory
export const inventorySeed = [
  { id: "1", name: 'Surgical Gloves', quantity: 500, reorder_level: 100, category: 'Supplies', supplier: 'MedSupply Co.', last_restocked: '2024-03-15', price: 0.50, expiry_date: '2026-03-15' },
  { id: "2", name: 'Surgical Masks', quantity: 1000, reorder_level: 200, category: 'Supplies', supplier: 'MedSupply Co.', last_restocked: '2024-03-10', price: 0.30, expiry_date: '2026-03-10' },
  { id: "3", name: 'Paracetamol', quantity: 300, reorder_level: 50, category: 'Medication', supplier: 'PharmaCorp', last_restocked: '2024-03-05', price: 5.00, expiry_date: '2025-03-05' },
  { id: "4", name: 'Ibuprofen', quantity: 250, reorder_level: 50, category: 'Medication', supplier: 'PharmaCorp', last_restocked: '2024-03-01', price: 6.00, expiry_date: '2025-03-01' },
  { id: "5", name: 'Syringes', quantity: 400, reorder_level: 80, category: 'Supplies', supplier: 'MedEquip Inc.', last_restocked: '2024-02-28', price: 0.75, expiry_date: '2026-02-28' },
  { id: "6", name: 'Bandages', quantity: 600, reorder_level: 100, category: 'Supplies', supplier: 'MedEquip Inc.', last_restocked: '2024-02-25', price: 1.20, expiry_date: '2026-02-25' },
  { id: "7", name: 'Antibiotics', quantity: 150, reorder_level: 30, category: 'Medication', supplier: 'PharmaCorp', last_restocked: '2024-02-20', price: 12.00, expiry_date: '2025-02-20' },
  { id: "8", name: 'Disinfectant', quantity: 200, reorder_level: 40, category: 'Supplies', supplier: 'CleanMed Ltd.', last_restocked: '2024-02-15', price: 8.50, expiry_date: '2026-02-15' },
  { id: "9", name: 'Thermometers', quantity: 50, reorder_level: 10, category: 'Equipment', supplier: 'MedTech Solutions', last_restocked: '2024-02-10', price: 15.00 },
  { id: "10", name: 'Blood Pressure Monitors', quantity: 25, reorder_level: 5, category: 'Equipment', supplier: 'MedTech Solutions', last_restocked: '2024-02-05', price: 65.00 },
  { id: "11", name: 'Gauze Pads', quantity: 350, reorder_level: 70, category: 'Supplies', supplier: 'MedEquip Inc.', last_restocked: '2024-02-01', price: 2.00, expiry_date: '2026-02-01' },
  { id: "12", name: 'Insulin', quantity: 80, reorder_level: 20, category: 'Medication', supplier: 'PharmaCorp', last_restocked: '2024-01-28', price: 45.00, expiry_date: '2025-01-28' },
  { id: "13", name: 'Wheelchairs', quantity: 10, reorder_level: 2, category: 'Equipment', supplier: 'MobilityAid Co.', last_restocked: '2024-01-20', price: 250.00 },
  { id: "14", name: 'First Aid Kits', quantity: 30, reorder_level: 5, category: 'Supplies', supplier: 'MedSupply Co.', last_restocked: '2024-01-15', price: 25.00, expiry_date: '2026-01-15' },
  { id: "15", name: 'Sterile Wipes', quantity: 450, reorder_level: 90, category: 'Supplies', supplier: 'CleanMed Ltd.', last_restocked: '2024-01-10', price: 0.40, expiry_date: '2026-01-10' }
];

// Seed data for billing
export const billingSeed = [
  { id: "1", patient_id: "1", amount: 150.00, payment_status: 'Paid', date: '2024-03-15', insurance_details: 'Jubilee Insurance, 80% coverage', invoice_number: 'INV-2024-001' },
  { id: "2", patient_id: "2", amount: 200.00, payment_status: 'Paid', date: '2024-03-14', insurance_details: 'NHIF, 70% coverage', invoice_number: 'INV-2024-002' },
  { id: "3", patient_id: "3", amount: 120.00, payment_status: 'Pending', date: '2024-03-13', insurance_details: 'AAR, 75% coverage', invoice_number: 'INV-2024-003' },
  { id: "4", patient_id: "4", amount: 180.00, payment_status: 'Pending', date: '2024-03-12', insurance_details: 'Britam, 65% coverage', invoice_number: 'INV-2024-004' },
  { id: "5", patient_id: "5", amount: 100.00, payment_status: 'Paid', date: '2024-03-11', insurance_details: 'Resolution Insurance, 90% coverage', invoice_number: 'INV-2024-005' },
  { id: "6", patient_id: "6", amount: 250.00, payment_status: 'Overdue', date: '2024-03-10', insurance_details: 'CIC Insurance, 60% coverage', invoice_number: 'INV-2024-006' },
  { id: "7", patient_id: "7", amount: 165.00, payment_status: 'Paid', date: '2024-03-09', insurance_details: 'Heritage Insurance, 75% coverage', invoice_number: 'INV-2024-007' },
  { id: "8", patient_id: "8", amount: 195.00, payment_status: 'Pending', date: '2024-03-08', insurance_details: 'NHIF, 80% coverage', invoice_number: 'INV-2024-008' },
  { id: "9", patient_id: "9", amount: 90.00, payment_status: 'Cancelled', date: '2024-03-07', insurance_details: 'Jubilee Insurance, 70% coverage', invoice_number: 'INV-2024-009' },
  { id: "10", patient_id: "10", amount: 210.00, payment_status: 'Paid', date: '2024-03-06', insurance_details: 'NHIF, 100% coverage', invoice_number: 'INV-2024-010' }
];

// Seed data for billing services
export const billingServicesSeed = [
  { billing_id: "1", service_name: 'Consultation' },
  { billing_id: "1", service_name: 'Blood Test' },
  { billing_id: "2", service_name: 'Annual Physical' },
  { billing_id: "2", service_name: 'Vaccination' },
  { billing_id: "3", service_name: 'Diabetes Consultation' },
  { billing_id: "4", service_name: 'Pulmonary Function Test' },
  { billing_id: "4", service_name: 'Consultation' },
  { billing_id: "5", service_name: 'Initial Consultation' },
  { billing_id: "6", service_name: 'Neurological Examination' },
  { billing_id: "6", service_name: 'MRI Scan' },
  { billing_id: "7", service_name: 'Cardiac Evaluation' },
  { billing_id: "7", service_name: 'ECG' },
  { billing_id: "8", service_name: 'Joint Assessment' },
  { billing_id: "8", service_name: 'X-Ray' },
  { billing_id: "9", service_name: 'Consultation (Cancelled)' },
  { billing_id: "10", service_name: 'Blood Work' },
  { billing_id: "10", service_name: 'Consultation' }
];

// Seed data for todos
export const todosSeed = [
  { id: "1", title: 'Order more surgical gloves', completed: false },
  { id: "2", title: 'Schedule staff meeting for next week', completed: true },
  { id: "3", title: 'Follow up with patient #3 about test results', completed: false },
  { id: "4", title: 'Update inventory tracking system', completed: false },
  { id: "5", title: 'Review billing reports for the month', completed: true },
  { id: "6", title: 'Organize patient files', completed: false },
  { id: "7", title: 'Call insurance company about claim #JB123456', completed: false },
  { id: "8", title: 'Prepare for tomorrow\'s appointments', completed: false }
];
