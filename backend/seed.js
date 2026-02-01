// Database Seeding Script - Optional
// Run this once to add test data

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Patient = require('./src/models/Patient');
const Appointment = require('./src/models/Appointment');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Patient.deleteMany({});
    await Appointment.deleteMany({});
    console.log('✓ Cleared existing data');

    // Create test assistant
    const assistant = new User({
      staffId: 'S001',
      role: 'assistant',
      fullName: 'U.W. Gurusinghe',
      email: 'upul@hospital.com',
      phone: '0712345678',
      password: 'password123',
      nic: '990123456V',
      placeOfWork: 'Central Hospital',
    });
    await assistant.save();
    console.log('✓ Created test assistant');

    // Create test doctor
    const doctor = new User({
      role: 'doctor',
      fullName: 'Dr. Silva',
      email: 'silva@hospital.com',
      phone: '0712345679',
      password: 'password123',
    });
    await doctor.save();
    console.log('✓ Created test doctor');

    // Create test patients
    const patient1 = new User({
      role: 'patient',
      fullName: 'Kamal Perera',
      email: 'kamal@email.com',
      phone: '0712345680',
      password: 'password123',
    });
    await patient1.save();

    const patient2 = new User({
      role: 'patient',
      fullName: 'Saman Fernando',
      email: 'saman@email.com',
      phone: '0712345681',
      password: 'password123',
    });
    await patient2.save();

    const patient3 = new User({
      role: 'patient',
      fullName: 'Nimal Perera',
      email: 'nimal@email.com',
      phone: '0712345682',
      password: 'password123',
    });
    await patient3.save();
    console.log('✓ Created test patients');

    // Create patient records
    await Patient.create([
      {
        userId: patient1._id,
        age: 45,
        gender: 'male',
        status: 'active',
        assignedDoctor: doctor._id,
      },
      {
        userId: patient2._id,
        age: 52,
        gender: 'male',
        status: 'active',
        assignedDoctor: doctor._id,
      },
      {
        userId: patient3._id,
        age: 48,
        gender: 'male',
        status: 'active',
        assignedDoctor: doctor._id,
      },
    ]);
    console.log('✓ Created patient records');

    // Create appointments
    const today = new Date();
    await Appointment.create([
      {
        patientId: patient1._id,
        doctorId: doctor._id,
        appointmentDate: today,
        status: 'pending',
      },
      {
        patientId: patient2._id,
        doctorId: doctor._id,
        appointmentDate: today,
        status: 'completed',
      },
      {
        patientId: patient3._id,
        doctorId: doctor._id,
        appointmentDate: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        status: 'pending',
      },
    ]);
    console.log('✓ Created appointments');

    console.log('\n✅ Database seeding completed!');
    console.log('\nTest credentials:');
    console.log('Staff ID: S001');
    console.log('Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
