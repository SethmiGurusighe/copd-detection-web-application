<?php
/**
 * Authentication Controller
 * Handles user registration and login
 */

class AuthController {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    /**
     * Register a new user
     */
    public function register($data) {
        // Validate input
        if (empty($data['staff_id']) || empty($data['email']) || empty($data['password']) || empty($data['role'])) {
            http_response_code(400);
            return [
                'success' => false,
                'message' => 'Missing required fields'
            ];
        }

        // Check if staff_id already exists
        $user = new User($this->db);
        if ($user->staffIdExists($data['staff_id'])) {
            http_response_code(400);
            return [
                'success' => false,
                'message' => 'Staff ID already registered'
            ];
        }

        // Create user
        $user->staff_id = $data['staff_id'];
        $user->email = $data['email'];
        $user->password = $data['password'];
        $user->role = $data['role'];
        $user->full_name = $data['full_name'] ?? '';
        $user->phone = $data['phone'] ?? '';
        $user->nic = $data['nic'] ?? '';
        $user->place_of_work = $data['place_of_work'] ?? '';

        if ($user->register()) {
            http_response_code(201);
            return [
                'success' => true,
                'message' => 'User registered successfully',
                'data' => [
                    'id' => $user->id,
                    'staff_id' => $user->staff_id,
                    'email' => $user->email,
                    'role' => $user->role
                ]
            ];
        } else {
            http_response_code(500);
            return [
                'success' => false,
                'message' => 'Registration failed'
            ];
        }
    }

    /**
     * Login user
     */
    public function login($data) {
        // Validate input
        if (empty($data['staff_id']) || empty($data['password'])) {
            http_response_code(400);
            return [
                'success' => false,
                'message' => 'Staff ID and password required'
            ];
        }

        // Find and authenticate user
        $user = new User($this->db);
        $user->staff_id = $data['staff_id'];
        $user->password = $data['password'];

        $user_data = $user->login();

        if ($user_data) {
            // Generate token
            $token = Auth::generateToken($user_data['id'], $user_data['role']);

            http_response_code(200);
            return [
                'success' => true,
                'message' => 'Login successful',
                'data' => [
                    'user' => [
                        'id' => $user_data['id'],
                        'staff_id' => $user_data['staff_id'],
                        'email' => $user_data['email'],
                        'role' => $user_data['role'],
                        'full_name' => $user_data['full_name']
                    ],
                    'token' => $token
                ]
            ];
        } else {
            http_response_code(401);
            return [
                'success' => false,
                'message' => 'Invalid credentials'
            ];
        }
    }

    /**
     * Get current user
     */
    public function getCurrentUser() {
        // Verify token
        $token_data = Auth::verifyToken();

        if (isset($token_data['success']) && !$token_data['success']) {
            http_response_code($token_data['code'] ?? 401);
            return $token_data;
        }

        // Get user data
        $user = new User($this->db);
        $user_data = $user->getUserById($token_data['id']);

        if ($user_data) {
            http_response_code(200);
            return [
                'success' => true,
                'data' => $user_data
            ];
        } else {
            http_response_code(404);
            return [
                'success' => false,
                'message' => 'User not found'
            ];
        }
    }
}
?>
