<?php
/**
 * Database Connection Class
 * Connects to MySQL database using MySQLi
 */

class Database {
    private $host = 'localhost';
    private $db_user = 'root';
    private $db_password = '';  // Change if you have password
    private $db_name = 'copd_detection';
    private $connection;

    /**
     * Connect to database
     */
    public function connect() {
        $this->connection = new mysqli(
            $this->host,
            $this->db_user,
            $this->db_password,
            $this->db_name
        );

        // Check connection
        if ($this->connection->connect_error) {
            die('Database Connection Failed: ' . $this->connection->connect_error);
        }

        // Set charset to utf8mb4
        $this->connection->set_charset("utf8mb4");

        return $this->connection;
    }

    /**
     * Get connection
     */
    public function getConnection() {
        if (!$this->connection) {
            $this->connect();
        }
        return $this->connection;
    }

    /**
     * Close connection
     */
    public function disconnect() {
        if ($this->connection) {
            $this->connection->close();
        }
    }
}
?>
