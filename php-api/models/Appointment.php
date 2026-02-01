<?php
/**
 * Appointment Model
 * Handles appointment database operations
 */

class Appointment {
    private $conn;
    private $table = 'appointments';

    public $id;
    public $patient_id;
    public $doctor_id;
    public $appointment_date;
    public $status;
    public $notes;
    public $created_at;
    public $updated_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    /**
     * Get all appointments
     */
    public function getAll() {
        $query = "SELECT a.*, p.full_name as patient_name, d.full_name as doctor_name
                FROM " . $this->table . " a
                LEFT JOIN users p ON a.patient_id = p.id
                LEFT JOIN users d ON a.doctor_id = d.id
                ORDER BY a.appointment_date DESC";

        $result = $this->conn->query($query);

        if (!$result) {
            return false;
        }

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    /**
     * Get today's appointments
     */
    public function getTodayAppointments() {
        $today = date('Y-m-d');
        $query = "SELECT a.*, p.full_name as patient_name, d.full_name as doctor_name
                FROM " . $this->table . " a
                LEFT JOIN users p ON a.patient_id = p.id
                LEFT JOIN users d ON a.doctor_id = d.id
                WHERE DATE(a.appointment_date) = ?
                ORDER BY a.appointment_date ASC";

        $stmt = $this->conn->prepare($query);
        
        if (!$stmt) {
            return false;
        }

        $stmt->bind_param('s', $today);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    /**
     * Count pending appointments
     */
    public function countPending() {
        $query = "SELECT COUNT(*) as total FROM " . $this->table . " WHERE status = 'pending'";
        $result = $this->conn->query($query);
        $row = $result->fetch_assoc();
        return $row['total'];
    }

    /**
     * Create appointment
     */
    public function create() {
        $query = "INSERT INTO " . $this->table . "
                SET patient_id = ?,
                    doctor_id = ?,
                    appointment_date = ?,
                    status = 'pending',
                    notes = ?,
                    created_at = NOW(),
                    updated_at = NOW()";

        $stmt = $this->conn->prepare($query);
        
        if (!$stmt) {
            return false;
        }

        $stmt->bind_param(
            'iiss',
            $this->patient_id,
            $this->doctor_id,
            $this->appointment_date,
            $this->notes
        );

        if ($stmt->execute()) {
            $this->id = $this->conn->insert_id;
            return true;
        }

        return false;
    }

    /**
     * Update appointment
     */
    public function update($id, $status, $notes) {
        $query = "UPDATE " . $this->table . "
                SET status = ?, notes = ?, updated_at = NOW()
                WHERE id = ?";

        $stmt = $this->conn->prepare($query);
        
        if (!$stmt) {
            return false;
        }

        $stmt->bind_param('ssi', $status, $notes, $id);

        return $stmt->execute();
    }
}
?>
