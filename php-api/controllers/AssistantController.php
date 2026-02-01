<?php
/**
 * Assistant Controller
 * Handles assistant dashboard operations
 */

class AssistantController {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    /**
     * Get dashboard stats
     */
    public function getDashboard() {
        // Verify token
        $token_data = Auth::verifyToken();

        if (isset($token_data['success']) && !$token_data['success']) {
            http_response_code(401);
            return $token_data;
        }

        // Get stats
        $patient = new Patient($this->db);
        $appointment = new Appointment($this->db);

        http_response_code(200);
        return [
            'success' => true,
            'data' => [
                'total_patients' => $patient->countTotal(),
                'pending_appointments' => $appointment->countPending(),
                'total_appointments' => 0,  // Can be calculated from appointments table
                'completion_rate' => 0      // Can be calculated from completed appointments
            ]
        ];
    }

    /**
     * Get all appointments
     */
    public function getAppointments() {
        // Verify token
        $token_data = Auth::verifyToken();

        if (isset($token_data['success']) && !$token_data['success']) {
            http_response_code(401);
            return $token_data;
        }

        $appointment = new Appointment($this->db);
        $appointments = $appointment->getAll();

        http_response_code(200);
        return [
            'success' => true,
            'data' => $appointments ?? []
        ];
    }

    /**
     * Create appointment
     */
    public function createAppointment($data) {
        // Verify token
        $token_data = Auth::verifyToken();

        if (isset($token_data['success']) && !$token_data['success']) {
            http_response_code(401);
            return $token_data;
        }

        // Validate input
        if (empty($data['patient_id']) || empty($data['doctor_id']) || empty($data['appointment_date'])) {
            http_response_code(400);
            return [
                'success' => false,
                'message' => 'Missing required fields'
            ];
        }

        // Create appointment
        $appointment = new Appointment($this->db);
        $appointment->patient_id = $data['patient_id'];
        $appointment->doctor_id = $data['doctor_id'];
        $appointment->appointment_date = $data['appointment_date'];
        $appointment->notes = $data['notes'] ?? '';

        if ($appointment->create()) {
            http_response_code(201);
            return [
                'success' => true,
                'message' => 'Appointment created successfully',
                'data' => [
                    'id' => $appointment->id
                ]
            ];
        } else {
            http_response_code(500);
            return [
                'success' => false,
                'message' => 'Failed to create appointment'
            ];
        }
    }

    /**
     * Update appointment
     */
    public function updateAppointment($id, $data) {
        // Verify token
        $token_data = Auth::verifyToken();

        if (isset($token_data['success']) && !$token_data['success']) {
            http_response_code(401);
            return $token_data;
        }

        // Validate input
        if (empty($data['status'])) {
            http_response_code(400);
            return [
                'success' => false,
                'message' => 'Status is required'
            ];
        }

        $appointment = new Appointment($this->db);
        if ($appointment->update($id, $data['status'], $data['notes'] ?? '')) {
            http_response_code(200);
            return [
                'success' => true,
                'message' => 'Appointment updated successfully'
            ];
        } else {
            http_response_code(500);
            return [
                'success' => false,
                'message' => 'Failed to update appointment'
            ];
        }
    }

    /**
     * Get all patients
     */
    public function getPatients() {
        // Verify token
        $token_data = Auth::verifyToken();

        if (isset($token_data['success']) && !$token_data['success']) {
            http_response_code(401);
            return $token_data;
        }

        $patient = new Patient($this->db);
        $patients = $patient->getAll();

        http_response_code(200);
        return [
            'success' => true,
            'data' => $patients ?? []
        ];
    }

    /**
     * Get patient by ID
     */
    public function getPatient($id) {
        // Verify token
        $token_data = Auth::verifyToken();

        if (isset($token_data['success']) && !$token_data['success']) {
            http_response_code(401);
            return $token_data;
        }

        $patient = new Patient($this->db);
        $patient_data = $patient->getById($id);

        if ($patient_data) {
            http_response_code(200);
            return [
                'success' => true,
                'data' => $patient_data
            ];
        } else {
            http_response_code(404);
            return [
                'success' => false,
                'message' => 'Patient not found'
            ];
        }
    }
}
?>
