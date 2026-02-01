<?php
/**
 * Application Configuration
 */

// Database Configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', '');  // Change if you have MySQL password
define('DB_NAME', 'copd_detection');

// Server Configuration
define('SERVER_NAME', $_SERVER['HTTP_HOST'] ?? 'localhost');
define('API_URL', 'http://' . SERVER_NAME . '/copd-api');

// JWT Configuration
define('JWT_SECRET', 'your_jwt_secret_key_change_in_production');
define('JWT_EXPIRE', 7 * 24 * 60 * 60);  // 7 days

// App Configuration
define('APP_NAME', 'COPD Detection System');
define('APP_ENV', 'development');  // development or production

// CORS Configuration
define('ALLOWED_ORIGINS', array(
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173'
));

// Enable error reporting in development
if (APP_ENV === 'development') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(E_ALL);
    ini_set('display_errors', 0);
    ini_set('log_errors', 1);
}

// Set timezone
date_default_timezone_set('UTC');
?>
