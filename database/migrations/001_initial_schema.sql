-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  contact_info TEXT NOT NULL,
  address TEXT NOT NULL,
  medical_history TEXT,
  appointment_history TEXT,
  date_of_birth DATE,
  gender TEXT,
  insurance_provider TEXT,
  insurance_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id),
  date DATE NOT NULL,
  time TIME NOT NULL,
  status TEXT NOT NULL,
  doctor TEXT,
  department TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create staff table
CREATE TABLE IF NOT EXISTS staff (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  role TEXT NOT NULL,
  department TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  specialty TEXT,
  joining_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create inventory table
CREATE TABLE IF NOT EXISTS inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  reorder_level INTEGER NOT NULL,
  category TEXT,
  supplier TEXT,
  last_restocked DATE,
  price DECIMAL,
  expiry_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create billing table
CREATE TABLE IF NOT EXISTS billing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id),
  amount DECIMAL NOT NULL,
  payment_status TEXT NOT NULL,
  date DATE NOT NULL,
  insurance_details TEXT,
  invoice_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create billing_services table
CREATE TABLE IF NOT EXISTS billing_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  billing_id UUID REFERENCES billing(id),
  service_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_billing_patient_id ON billing(patient_id);
CREATE INDEX IF NOT EXISTS idx_billing_services_billing_id ON billing_services(billing_id);
CREATE INDEX IF NOT EXISTS idx_inventory_name ON inventory(name);
CREATE INDEX IF NOT EXISTS idx_staff_role ON staff(role);
CREATE INDEX IF NOT EXISTS idx_staff_department ON staff(department);
