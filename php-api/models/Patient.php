<?php
/**
 * Patient Model
 * Handles patient database operations
 */

class Patient {
    private $conn;
    private $table = 'patients';

    public $id;
    public $user_id;
    public $age;
    public $gender;
    public $medical_history;
    public $status;
    public $assigned_doctor;
    public $created_at;
    public $updated_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    /**
     * Get all patients
     */
    public function getAll() {
        $query = "SELECT p.*, u.full_name, u.email, u.phone, d.full_name as doctor_name
                FROM " . $this->table . " p
                LEFT JOIN users u ON p.user_id = u.id
                LEFT JOIN users d ON p.assigned_doctor = d.id
                ORDER BY p.created_at DESC";

        $result = $this->conn->query($query);

        if (!$result) {
            return false;
        }

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    /**
     * Get patient by ID
     */
    public function getById($id) {
        $query = "SELECT p.*, u.full_name, u.email, u.phone, d.full_name as doctor_name
                FROM " . $this->table . " p
                LEFT JOIN users u ON p.user_id = u.id
                LEFT JOIN users d ON p.assigned_doctor = d.id
                WHERE p.id = ? LIMIT 1";

        $stmt = $this->conn->prepare($query);
        
        if (!$stmt) {
            return false;
        }

        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            return $result->fetch_assoc();
        }

        return false;
    }

    /**
     * Count total patients
     */
    public function countTotal() {
        $query = "SELECT COUNT(*) as total FROM " . $this->table;
        $result = $this->conn->query($query);
        $row = $result->fetch_assoc();
        return $row['total'];
    }

    /**
     * Create patient
     */
    public function create() {
        $query = "INSERT INTO " . $this->table . "
                SET user_id = ?,
                    age = ?,
                    gender = ?,
                    medical_history = ?,
                    status = 'active',
                    assigned_doctor = ?,
                    created_at = NOW(),
                    updated_at = NOW()";

        $stmt = $this->conn->prepare($query);
        
        if (!$stmt) {
            return false;
        }

        $stmt->bind_param(
            'iissi',
            $this->user_id,
            $this->age,
            $this->gender,
            $this->medical_history,
            $this->assigned_doctor
        );

        if ($stmt->execute()) {
            $this->id = $this->conn->insert_id;
            return true;
        }

        return false;
    }
}
?>
