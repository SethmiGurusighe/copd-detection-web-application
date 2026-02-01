<?php
/**
 * COPD Detection System - PHP API
 * Main Entry Point
 */

// Set error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Load configuration
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/config/cors.php';

// Load database
require_once __DIR__ . '/config/Database.php';

// Load middleware
require_once __DIR__ . '/middleware/Auth.php';

// Load models
require_once __DIR__ . '/models/User.php';
require_once __DIR__ . '/models/Patient.php';
require_once __DIR__ . '/models/Appointment.php';

// Load controllers
require_once __DIR__ . '/controllers/AuthController.php';
require_once __DIR__ . '/controllers/AssistantController.php';

// Load router
require_once __DIR__ . '/routes/Router.php';

// Initialize database connection
$database = new Database();
$db = $database->connect();

if (!$db) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed'
    ]);
    exit;
}

// Handle API request
try {
    $router = new Router($db);
    $response = $router->route();
    
    // Send JSON response
    echo json_encode($response);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Internal server error',
        'error' => $e->getMessage()
    ]);
} finally {
    $database->disconnect();
}
?>
