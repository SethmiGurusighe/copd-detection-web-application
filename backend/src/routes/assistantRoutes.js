// Assistant Routes
const express = require('express');
const {
  getDashboard,
  getAppointments,
  createAppointment,
  updateAppointment,
  getPatients,
} = require('../controllers/assistantController');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

router.get('/dashboard', getDashboard);
router.get('/appointments', getAppointments);
router.post('/appointments', createAppointment);
router.put('/appointments/:id', updateAppointment);
router.get('/patients', getPatients);

module.exports = router;
