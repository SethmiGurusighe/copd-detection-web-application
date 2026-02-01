<?php
/**
 * API Routes Handler
 * Routes incoming requests to appropriate controllers
 */

class Router {
    private $method;
    private $path;
    private $db;

    public function __construct($db) {
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $this->db = $db;
    }

    /**
     * Route requests to appropriate handler
     */
    public function route() {
        // Remove base path
        $path = str_replace('/copd-api', '', $this->path);
        $parts = array_filter(explode('/', $path));
        $parts = array_values($parts);

        // Route: POST /auth/register
        if ($this->method === 'POST' && isset($parts[0]) && $parts[0] === 'auth' && isset($parts[1]) && $parts[1] === 'register') {
            $data = json_decode(file_get_contents('php://input'), true);
            $controller = new AuthController($this->db);
            return $controller->register($data);
        }

        // Route: POST /auth/login
        if ($this->method === 'POST' && isset($parts[0]) && $parts[0] === 'auth' && isset($parts[1]) && $parts[1] === 'login') {
            $data = json_decode(file_get_contents('php://input'), true);
            $controller = new AuthController($this->db);
            return $controller->login($data);
        }

        // Route: GET /auth/me
        if ($this->method === 'GET' && isset($parts[0]) && $parts[0] === 'auth' && isset($parts[1]) && $parts[1] === 'me') {
            $controller = new AuthController($this->db);
            return $controller->getCurrentUser();
        }

        // Route: GET /assistant/dashboard
        if ($this->method === 'GET' && isset($parts[0]) && $parts[0] === 'assistant' && isset($parts[1]) && $parts[1] === 'dashboard') {
            $controller = new AssistantController($this->db);
            return $controller->getDashboard();
        }

        // Route: GET /assistant/appointments
        if ($this->method === 'GET' && isset($parts[0]) && $parts[0] === 'assistant' && isset($parts[1]) && $parts[1] === 'appointments') {
            $controller = new AssistantController($this->db);
            return $controller->getAppointments();
        }

        // Route: POST /assistant/appointments
        if ($this->method === 'POST' && isset($parts[0]) && $parts[0] === 'assistant' && isset($parts[1]) && $parts[1] === 'appointments') {
            $data = json_decode(file_get_contents('php://input'), true);
            $controller = new AssistantController($this->db);
            return $controller->createAppointment($data);
        }

        // Route: PUT /assistant/appointments/:id
        if ($this->method === 'PUT' && isset($parts[0]) && $parts[0] === 'assistant' && isset($parts[1]) && $parts[1] === 'appointments' && isset($parts[2])) {
            $data = json_decode(file_get_contents('php://input'), true);
            $controller = new AssistantController($this->db);
            return $controller->updateAppointment($parts[2], $data);
        }

        // Route: GET /assistant/patients
        if ($this->method === 'GET' && isset($parts[0]) && $parts[0] === 'assistant' && isset($parts[1]) && $parts[1] === 'patients') {
            $controller = new AssistantController($this->db);
            return $controller->getPatients();
        }

        // Route: GET /assistant/patients/:id
        if ($this->method === 'GET' && isset($parts[0]) && $parts[0] === 'assistant' && isset($parts[1]) && $parts[1] === 'patients' && isset($parts[2])) {
            $controller = new AssistantController($this->db);
            return $controller->getPatient($parts[2]);
        }

        // Route not found
        http_response_code(404);
        return [
            'success' => false,
            'message' => 'Route not found'
        ];
    }
}
?>
