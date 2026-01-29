
-- RFAI Database Schema v2
CREATE DATABASE IF NOT EXISTS rfai_db;
USE rfai_db;

CREATE TABLE users (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'COORDINATOR', 'PROFESSIONAL', 'CLIENT') NOT NULL,
    service ENUM('Calma', 'Angustia', 'Amor Propio', 'Culpa'),
    assigned_professional_id CHAR(36),
    is_active BOOLEAN DEFAULT TRUE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (assigned_professional_id) REFERENCES users(id)
);

CREATE TABLE test_results (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36),
    phase_id INT NOT NULL, -- 1: Inicial, 2: Evolución, 3: Final
    score INT,
    responses JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE audio_analytics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id CHAR(36),
    audio_id VARCHAR(100),
    play_count INT DEFAULT 0,
    total_seconds INT DEFAULT 0,
    last_played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
