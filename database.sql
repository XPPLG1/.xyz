-- Database Schema for Theme Management
-- Run this SQL script to create the database and table

-- Create database (optional, uncomment if needed)
-- CREATE DATABASE IF NOT EXISTS class_website CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE class_website;

-- Create table for storing student themes
CREATE TABLE IF NOT EXISTS student_themes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL UNIQUE,
    theme VARCHAR(50) NOT NULL DEFAULT 'default',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by VARCHAR(255),
    INDEX idx_student_name (student_name),
    INDEX idx_updated_at (updated_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data (optional)
-- INSERT INTO student_themes (student_name, theme) VALUES 
-- ('Alvano Darmansyah', 'bloody'),
-- ('Arthur Elshaddai Prasetyo', 'lightning'),
-- ('Natan', 'neon')
-- ON DUPLICATE KEY UPDATE theme = VALUES(theme);

