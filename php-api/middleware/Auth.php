<?php
/**
 * Authentication Middleware
 * Handles JWT token verification
 */

class Auth {
    /**
     * Verify JWT token
     */
    public static function verifyToken() {
        // Get authorization header
        $headers = getallheaders();
        $auth_header = $headers['Authorization'] ?? '';

        if (empty($auth_header)) {
            return self::error(401, 'No token provided');
        }

        // Extract token from "Bearer <token>"
        if (preg_match('/Bearer\s+(.*)$/i', $auth_header, $matches)) {
            $token = $matches[1];
        } else {
            return self::error(401, 'Invalid token format');
        }

        // Verify token
        try {
            $decoded = self::decodeToken($token);
            return $decoded;
        } catch (Exception $e) {
            return self::error(401, 'Invalid token: ' . $e->getMessage());
        }
    }

    /**
     * Decode JWT token
     */
    public static function decodeToken($token) {
        $parts = explode('.', $token);
        
        if (count($parts) !== 3) {
            throw new Exception('Invalid token structure');
        }

        // Verify signature
        $header = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $parts[0])), true);
        $payload = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $parts[1])), true);
        $signature = $parts[2];

        // Create signature to verify
        $data = $parts[0] . '.' . $parts[1];
        $expected_signature = hash_hmac('sha256', $data, JWT_SECRET, true);
        $expected_signature = rtrim(strtr(base64_encode($expected_signature), '+/', '-_'), '=');

        if ($signature !== $expected_signature) {
            throw new Exception('Invalid signature');
        }

        // Check expiration
        if (isset($payload['exp']) && $payload['exp'] < time()) {
            throw new Exception('Token expired');
        }

        return $payload;
    }

    /**
     * Generate JWT token
     */
    public static function generateToken($user_id, $role) {
        $header = [
            'alg' => 'HS256',
            'typ' => 'JWT'
        ];

        $payload = [
            'id' => $user_id,
            'role' => $role,
            'iat' => time(),
            'exp' => time() + JWT_EXPIRE
        ];

        $header_encoded = rtrim(strtr(base64_encode(json_encode($header)), '+/', '-_'), '=');
        $payload_encoded = rtrim(strtr(base64_encode(json_encode($payload)), '+/', '-_'), '=');

        $signature = hash_hmac('sha256', $header_encoded . '.' . $payload_encoded, JWT_SECRET, true);
        $signature_encoded = rtrim(strtr(base64_encode($signature), '+/', '-_'), '=');

        return $header_encoded . '.' . $payload_encoded . '.' . $signature_encoded;
    }

    /**
     * Return error response
     */
    public static function error($code, $message) {
        http_response_code($code);
        return [
            'success' => false,
            'message' => $message
        ];
    }
}
?>
