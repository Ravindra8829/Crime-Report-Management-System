-- CRMS Database Setup Script
-- Crime Report Management System
-- For Indian Government Agencies

-- Create Database
CREATE DATABASE IF NOT EXISTS crms_db;
USE crms_db;

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS files;
DROP TABLE IF EXISTS case_assignments;
DROP TABLE IF EXISTS cases;
DROP TABLE IF EXISTS crime_reports;
DROP TABLE IF EXISTS crime_categories;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS jurisdictions;
DROP TABLE IF EXISTS roles;

-- ROLES
CREATE TABLE roles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
);

-- JURISDICTIONS
CREATE TABLE jurisdictions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    region VARCHAR(100)
);

-- DEPARTMENTS
CREATE TABLE departments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    jurisdiction_id BIGINT,
    FOREIGN KEY (jurisdiction_id) REFERENCES jurisdictions(id)
);

-- USERS
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    role_id BIGINT NOT NULL,
    department_id BIGINT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- CRIME CATEGORIES
CREATE TABLE crime_categories (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255)
);

-- CRIME REPORTS
CREATE TABLE crime_reports (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category_id BIGINT NOT NULL,
    location VARCHAR(255),
    latitude DOUBLE,
    longitude DOUBLE,
    reported_by BIGINT NOT NULL,
    status VARCHAR(50) DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES crime_categories(id),
    FOREIGN KEY (reported_by) REFERENCES users(id)
);

-- CASES
CREATE TABLE cases (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    crime_report_id BIGINT NOT NULL,
    assigned_to BIGINT,
    status VARCHAR(50) DEFAULT 'Open',
    opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    closed_at TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (crime_report_id) REFERENCES crime_reports(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id)
);

-- CASE ASSIGNMENTS (for inter-agency collaboration)
CREATE TABLE case_assignments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    case_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES cases(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- FILES (for uploads and attachments)
CREATE TABLE files (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100),
    file_size BIGINT,
    file_path VARCHAR(255) NOT NULL,
    uploaded_by BIGINT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

-- MESSAGES (Inter-Agency Communication)
CREATE TABLE messages (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    sender_id BIGINT NOT NULL,
    receiver_id BIGINT NOT NULL,
    subject VARCHAR(255),
    content TEXT,
    file_id BIGINT,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    is_encrypted BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id),
    FOREIGN KEY (file_id) REFERENCES files(id)
);

-- AUDIT LOGS
CREATE TABLE audit_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    action VARCHAR(255) NOT NULL,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- INSERT INITIAL DATA

-- Insert Roles
INSERT INTO roles (name, description) VALUES
('ADMIN', 'System Administrator with full access'),
('OFFICER', 'Law Enforcement Officer with investigation privileges'),
('ANALYST', 'Data Analyst with read and analytics access');

-- Insert Jurisdictions
INSERT INTO jurisdictions (name, region) VALUES
('Mumbai Police', 'Maharashtra'),
('Delhi Police', 'Delhi'),
('Bangalore Police', 'Karnataka'),
('Chennai Police', 'Tamil Nadu'),
('Kolkata Police', 'West Bengal'),
('Hyderabad Police', 'Telangana'),
('Pune Police', 'Maharashtra'),
('Ahmedabad Police', 'Gujarat');

-- Insert Departments
INSERT INTO departments (name, jurisdiction_id) VALUES
('Cyber Crime Unit', 1),
('Homicide Division', 1),
('Narcotics Control', 1),
('Special Branch', 2),
('Crime Branch', 2),
('Anti-Terrorism Squad', 1),
('Economic Offences Wing', 2),
('Traffic Police', 1);

-- Insert Crime Categories
INSERT INTO crime_categories (name, description) VALUES
('Theft', 'Property theft and burglary cases'),
('Assault', 'Physical assault and violence'),
('Fraud', 'Financial fraud and scams'),
('Cyber Crime', 'Online crimes and digital fraud'),
('Drug Trafficking', 'Illegal drug trade and possession'),
('Homicide', 'Murder and manslaughter cases'),
('Sexual Assault', 'Sexual violence and harassment'),
('Terrorism', 'Terrorist activities and threats'),
('Kidnapping', 'Abduction and hostage situations'),
('Arson', 'Deliberate fire setting'),
('Vandalism', 'Property damage and destruction'),
('Extortion', 'Blackmail and threats for money');

-- Insert Default Users (password: admin123 for all)
INSERT INTO users (username, password, full_name, email, phone, role_id, department_id, is_active) VALUES
('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'System Administrator', 'admin@crms.gov.in', '+91-9876543210', 1, 1, TRUE),
('officer1', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'Inspector Rajesh Kumar', 'rajesh.kumar@crms.gov.in', '+91-9876543211', 2, 2, TRUE),
('officer2', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'Sub-Inspector Priya Singh', 'priya.singh@crms.gov.in', '+91-9876543212', 2, 3, TRUE),
('analyst1', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'Data Analyst Amit Patel', 'amit.patel@crms.gov.in', '+91-9876543213', 3, 1, TRUE),
('analyst2', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'Senior Analyst Meera Iyer', 'meera.iyer@crms.gov.in', '+91-9876543214', 3, 4, TRUE);

-- Insert Sample Crime Reports
INSERT INTO crime_reports (title, description, category_id, location, latitude, longitude, reported_by, status) VALUES
('Armed Robbery at Central Bank', 'Three armed men robbed the Central Bank branch on MG Road. They escaped with approximately 50 lakhs in cash.', 1, 'MG Road, Mumbai', 19.0760, 72.8777, 2, 'Open'),
('Cyber Fraud Case - Online Scam', 'Multiple victims reported losing money through fake investment schemes advertised on social media.', 4, 'Online Platform', 19.0760, 72.8777, 2, 'Under Investigation'),
('Drug Trafficking Network Busted', 'Large-scale drug trafficking operation uncovered in suburban area. Multiple arrests made.', 5, 'Suburban Mumbai', 19.0760, 72.8777, 3, 'Closed'),
('Homicide Case - Domestic Violence', 'Fatal domestic violence incident reported in residential area. Suspect in custody.', 6, 'Residential Area, Delhi', 28.7041, 77.1025, 2, 'Under Investigation'),
('Terrorism Threat - Bomb Hoax', 'Multiple bomb threats received at major railway stations. Security heightened.', 8, 'Multiple Railway Stations', 19.0760, 72.8777, 2, 'Open');

-- Insert Sample Cases
INSERT INTO cases (crime_report_id, assigned_to, status, notes) VALUES
(1, 2, 'Open', 'Initial investigation started. CCTV footage being analyzed.'),
(2, 3, 'Under Investigation', 'Cyber forensics team working on tracing the scammers.'),
(3, 2, 'Closed', 'Case successfully resolved. All suspects convicted.'),
(4, 2, 'Under Investigation', 'Forensic analysis of crime scene completed.'),
(5, 3, 'Open', 'Security agencies coordinating response. Threat assessment ongoing.');

-- Insert Sample Messages
INSERT INTO messages (sender_id, receiver_id, subject, content, is_read) VALUES
(2, 3, 'Case Update - Armed Robbery', 'Please review the CCTV footage from the Central Bank robbery case. I need your analysis.', FALSE),
(3, 2, 'Re: Case Update - Armed Robbery', 'I have analyzed the footage. There are three suspects, all wearing masks. Vehicle details captured.', TRUE),
(2, 4, 'Urgent - Cyber Fraud Investigation', 'We need immediate assistance with the cyber fraud case. Multiple victims involved.', FALSE),
(4, 2, 'Re: Urgent - Cyber Fraud Investigation', 'I am working on the digital forensics. Will provide detailed report by tomorrow.', TRUE);

-- Insert Sample Audit Logs
INSERT INTO audit_logs (user_id, action, details) VALUES
(1, 'USER_LOGIN', 'Admin user logged in successfully'),
(2, 'REPORT_CREATED', 'New crime report created: Armed Robbery at Central Bank'),
(3, 'CASE_ASSIGNED', 'Case assigned to Officer Rajesh Kumar'),
(2, 'MESSAGE_SENT', 'Message sent to Data Analyst regarding case update'),
(4, 'ANALYTICS_ACCESSED', 'Analytics dashboard accessed for crime trend analysis');

-- Create Indexes for Better Performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_crime_reports_status ON crime_reports(status);
CREATE INDEX idx_crime_reports_reported_by ON crime_reports(reported_by);
CREATE INDEX idx_cases_assigned_to ON cases(assigned_to);
CREATE INDEX idx_cases_status ON cases(status);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_receiver ON messages(receiver_id);
CREATE INDEX idx_messages_sent_at ON messages(sent_at);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Display Setup Summary
SELECT 'Database Setup Complete!' as status;
SELECT COUNT(*) as total_roles FROM roles;
SELECT COUNT(*) as total_jurisdictions FROM jurisdictions;
SELECT COUNT(*) as total_departments FROM departments;
SELECT COUNT(*) as total_users FROM users;
SELECT COUNT(*) as total_crime_categories FROM crime_categories;
SELECT COUNT(*) as total_crime_reports FROM crime_reports;
SELECT COUNT(*) as total_cases FROM cases;
SELECT COUNT(*) as total_messages FROM messages; 