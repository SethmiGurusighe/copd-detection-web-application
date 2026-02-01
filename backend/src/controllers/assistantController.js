// Assistant Controller
const User = require('../models/User');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');

// @route GET /api/assistant/dashboard
// @desc Get assistant dashboard data
exports.getDashboard = async (req, res, next) => {
  try {
    const assistantId = req.user.id;

    // Get total patients (patients with appointments assigned to this assistant's doctors)
    const totalPatients = await Patient.countDocuments();

    // Get today's appointments
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayAppointments = await Appointment.find({
      appointmentDate: {
        $gte: today,
        $lt: tomorrow,
      },
    })
      .populate('patientId', 'fullName email')
      .populate('doctorId', 'fullName email');

    // Get pending appointments
    const pendingAppointments = await Appointment.countDocuments({
      status: 'pending',
    });

    res.status(200).json({
      success: true,
      data: {
        totalPatients,
        todayAppointments: todayAppointments.length,
        pendingAppointments,
        appointmentsList: todayAppointments,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @route GET /api/assistant/appointments
// @desc Get all appointments
exports.getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find()
      .populate('patientId', 'fullName email')
      .populate('doctorId', 'fullName email')
      .sort({ appointmentDate: -1 });

    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

// @route POST /api/assistant/appointments
// @desc Create appointment
exports.createAppointment = async (req, res, next) => {
  try {
    const { patientId, doctorId, appointmentDate, notes } = req.body;

    const appointment = new Appointment({
      patientId,
      doctorId,
      appointmentDate,
      notes,
    });

    await appointment.save();

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

// @route PUT /api/assistant/appointments/:id
// @desc Update appointment
exports.updateAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status, notes },
      { new: true }
    )
      .populate('patientId', 'fullName email')
      .populate('doctorId', 'fullName email');

    res.status(200).json({
      success: true,
      message: 'Appointment updated successfully',
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

// @route GET /api/assistant/patients
// @desc Get all patients
exports.getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find()
      .populate('userId', 'fullName email phone')
      .populate('assignedDoctor', 'fullName email');

    res.status(200).json({
      success: true,
      data: patients,
    });
  } catch (error) {
    next(error);
  }
};
