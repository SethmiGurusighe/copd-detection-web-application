-- MySQL Database Schema for COPD Detection System
-- Import this file into MySQL Workbench to create the database and tables

-- Create Database
CREATE DATABASE IF NOT EXISTS copd_detection;
USE copd_detection;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    staff_id VARCHAR(50) UNIQUE NOT NULL,
    role ENUM('doctor', 'assistant', 'patient') NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    nic VARCHAR(20),
    place_of_work VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_staff_id (staff_id),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Patients Table
CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    age INT,
    gender ENUM('male', 'female', 'other'),
    medical_history TEXT,
    status VARCHAR(50) DEFAULT 'active',
    assigned_doctor INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_doctor) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_assigned_doctor (assigned_doctor)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT,
    appointment_date DATETIME NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_patient_id (patient_id),
    INDEX idx_doctor_id (doctor_id),
    INDEX idx_appointment_date (appointment_date),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Sample Data (Optional)
-- Admin Doctor
INSERT INTO users (staff_id, role, full_name, email, phone, password, nic, place_of_work)
VALUES ('DOC001', 'doctor', 'Dr. John Smith', 'doctor@example.com', '1234567890', 
    '$2y$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/KFm', 'NIC123', 'General Hospital');

-- Admin Assistant
INSERT INTO users (staff_id, role, full_name, email, phone, password, nic, place_of_work)
VALUES ('ASS001', 'assistant', 'Jane Doe', 'assistant@example.com', '0987654321',
    '$2y$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/KFm', 'NIC456', 'General Hospital');

-- Sample Patient
INSERT INTO users (staff_id, role, full_name, email, phone, password, nic, place_of_work)
VALUES ('PAT001', 'patient', 'Robert Johnson', 'patient@example.com', '5555555555',
    '$2y$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/KFm', 'NIC789', 'Home');

-- Insert sample patient record
INSERT INTO patients (user_id, age, gender, medical_history, status, assigned_doctor)
VALUES (3, 65, 'male', 'History of smoking, hypertension', 'active', 1);

-- Insert sample appointments
INSERT INTO appointments (patient_id, doctor_id, appointment_date, status, notes)
VALUES 
(3, 1, DATE_ADD(NOW(), INTERVAL 1 DAY), 'pending', 'COPD screening appointment'),
(3, 1, DATE_ADD(NOW(), INTERVAL 3 DAY), 'completed', 'Initial consultation');
