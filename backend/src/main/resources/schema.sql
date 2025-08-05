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

-- ROLES
CREATE TABLE roles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
);

-- DEPARTMENTS
CREATE TABLE departments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    jurisdiction_id BIGINT,
    FOREIGN KEY (jurisdiction_id) REFERENCES jurisdictions(id)
);

-- JURISDICTIONS
CREATE TABLE jurisdictions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    region VARCHAR(100)
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
('Kolkata Police', 'West Bengal');

-- Insert Departments
INSERT INTO departments (name, jurisdiction_id) VALUES
('Cyber Crime Unit', 1),
('Homicide Division', 1),
('Narcotics Control', 1),
('Special Branch', 2),
('Crime Branch', 2);

-- Insert Crime Categories
INSERT INTO crime_categories (name, description) VALUES
('Theft', 'Property theft and burglary cases'),
('Assault', 'Physical assault and violence'),
('Fraud', 'Financial fraud and scams'),
('Cyber Crime', 'Online crimes and digital fraud'),
('Drug Trafficking', 'Illegal drug trade and possession'),
('Homicide', 'Murder and manslaughter cases'),
('Sexual Assault', 'Sexual violence and harassment'),
('Terrorism', 'Terrorist activities and threats');

-- Insert Default Admin User (password: admin123)
INSERT INTO users (username, password, full_name, email, phone, role_id, department_id, is_active) VALUES
('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'System Administrator', 'admin@crms.gov.in', '+91-9876543210', 1, 1, TRUE),
('officer1', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'Inspector Rajesh Kumar', 'rajesh.kumar@crms.gov.in', '+91-9876543211', 2, 2, TRUE),
('analyst1', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'Data Analyst Priya Singh', 'priya.singh@crms.gov.in', '+91-9876543212', 3, 1, TRUE); 