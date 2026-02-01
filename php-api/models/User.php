<?php
/**
 * User Model
 * Handles user database operations
 */

class User {
    private $conn;
    private $table = 'users';

    public $id;
    public $staff_id;
    public $role;
    public $full_name;
    public $email;
    public $phone;
    public $password;
    public $nic;
    public $place_of_work;
    public $is_active;
    public $created_at;
    public $updated_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    /**
     * Register new user
     */
    public function register() {
        // Check if email already exists
        if ($this->emailExists()) {
            return false;
        }

        // Hash password
        $hashed_password = password_hash($this->password, PASSWORD_BCRYPT);

        // Create query
        $query = "INSERT INTO " . $this->table . "
                SET staff_id = ?,
                    role = ?,
                    full_name = ?,
                    email = ?,
                    phone = ?,
                    password = ?,
                    nic = ?,
                    place_of_work = ?,
                    is_active = 1,
                    created_at = NOW(),
                    updated_at = NOW()";

        $stmt = $this->conn->prepare($query);

        if (!$stmt) {
            return false;
        }

        // Bind values
        $stmt->bind_param(
            'sssssss',
            $this->staff_id,
            $this->role,
            $this->full_name,
            $this->email,
            $this->phone,
            $hashed_password,
            $this->nic,
            $this->place_of_work
        );

        if ($stmt->execute()) {
            $this->id = $this->conn->insert_id;
            return true;
        }

        return false;
    }

    /**
     * Login user
     */
    public function login() {
        $query = "SELECT id, staff_id, role, full_name, email, password
                FROM " . $this->table . "
                WHERE (staff_id = ? OR email = ?) AND is_active = 1
                LIMIT 1";

        $stmt = $this->conn->prepare($query);
        
        if (!$stmt) {
            return false;
        }

        $stmt->bind_param('ss', $this->staff_id ?? $this->email, $this->email ?? $this->staff_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            
            // Verify password
            if (password_verify($this->password, $user['password'])) {
                return $user;
            }
        }

        return false;
    }

    /**
     * Get user by ID
     */
    public function getUserById($id) {
        $query = "SELECT id, staff_id, role, full_name, email, phone, nic, place_of_work
                FROM " . $this->table . "
                WHERE id = ? AND is_active = 1
                LIMIT 1";

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
     * Check if email exists
     */
    private function emailExists() {
        $query = "SELECT id FROM " . $this->table . " WHERE email = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        
        if (!$stmt) {
            return false;
        }

        $stmt->bind_param('s', $this->email);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->num_rows > 0;
    }

    /**
     * Check if staff_id exists
     */
    public function staffIdExists($staff_id) {
        $query = "SELECT id FROM " . $this->table . " WHERE staff_id = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        
        if (!$stmt) {
            return false;
        }

        $stmt->bind_param('s', $staff_id);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->num_rows > 0;
    }
}
?>
