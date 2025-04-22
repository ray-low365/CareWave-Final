import { supabase } from '../config/supabase';
import { patientsSeed, appointmentsSeed, staffSeed, inventorySeed, billingSeed, billingServicesSeed } from './seed-data';

/**
 * Seed the database with initial data
 */
async function seedDatabase() {
  try {
    console.log('Starting database seeding...');

    // Clear existing data (if needed)
    console.log('Clearing existing data...');
    await clearExistingData();

    // Seed patients
    console.log('Seeding patients...');
    await supabase.from('patients').insert(patientsSeed);

    // Seed staff
    console.log('Seeding staff...');
    await supabase.from('staff').insert(staffSeed);

    // Seed inventory
    console.log('Seeding inventory...');
    await supabase.from('inventory').insert(inventorySeed);

    // Seed appointments
    console.log('Seeding appointments...');
    await supabase.from('appointments').insert(appointmentsSeed);

    // Seed billing
    console.log('Seeding billing...');
    await supabase.from('billing').insert(billingSeed);

    // Seed billing services
    console.log('Seeding billing services...');
    await supabase.from('billing_services').insert(billingServicesSeed);

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

/**
 * Clear existing data from all tables
 */
async function clearExistingData() {
  try {
    // Delete in reverse order of dependencies
    await supabase.from('billing_services').delete().neq('id', '0');
    await supabase.from('billing').delete().neq('id', '0');
    await supabase.from('appointments').delete().neq('id', '0');
    await supabase.from('inventory').delete().neq('id', '0');
    await supabase.from('staff').delete().neq('id', '0');
    await supabase.from('patients').delete().neq('id', '0');
  } catch (error) {
    console.error('Error clearing existing data:', error);
    throw error;
  }
}

// Run the seed function if this script is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}

export { seedDatabase, clearExistingData };
