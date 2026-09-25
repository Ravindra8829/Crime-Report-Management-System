-- Insert Roles
INSERT INTO roles (id, name, description) VALUES
(1, 'ADMIN', 'System Administrator with full access'),
(2, 'OFFICER', 'Law Enforcement Officer with investigation privileges'),
(3, 'ANALYST', 'Data Analyst with read and analytics access');

-- Insert Jurisdictions
INSERT INTO jurisdictions (id, name, region) VALUES
(1, 'Mumbai Police', 'Maharashtra'),
(2, 'Delhi Police', 'Delhi'),
(3, 'Bangalore Police', 'Karnataka'),
(4, 'Chennai Police', 'Tamil Nadu'),
(5, 'Kolkata Police', 'West Bengal');

-- Insert Departments
INSERT INTO departments (id, name, jurisdiction_id) VALUES
(1, 'Cyber Crime Unit', 1),
(2, 'Homicide Division', 1),
(3, 'Narcotics Control', 1),
(4, 'Special Branch', 2),
(5, 'Crime Branch', 2);

-- Insert Crime Categories
INSERT INTO crime_categories (id, name, description) VALUES
(1, 'Theft', 'Property theft and burglary cases'),
(2, 'Assault', 'Physical assault and violence'),
(3, 'Fraud', 'Financial fraud and scams'),
(4, 'Cyber Crime', 'Online crimes and digital fraud'),
(5, 'Drug Trafficking', 'Illegal drug trade and possession'),
(6, 'Homicide', 'Murder and manslaughter cases'),
(7, 'Sexual Assault', 'Sexual violence and harassment'),
(8, 'Terrorism', 'Terrorist activities and threats');

-- Insert Default Users (password: admin123)
INSERT INTO users (id, username, password, full_name, email, phone, role_id, department_id, is_active, created_at, updated_at) VALUES
(1, 'admin', '$2a$10$L2UwKId9CzcVObu702A1keCnwI7CsdH87fQwqV86Vrb7h.zZhCNGO', 'System Administrator', 'admin@crms.gov.in', '+91-9876543210', 1, 1, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'officer1', '$2a$10$L2UwKId9CzcVObu702A1keCnwI7CsdH87fQwqV86Vrb7h.zZhCNGO', 'Inspector Rajesh Kumar', 'rajesh.kumar@crms.gov.in', '+91-9876543211', 2, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'officer2', '$2a$10$L2UwKId9CzcVObu702A1keCnwI7CsdH87fQwqV86Vrb7h.zZhCNGO', 'Sub-Inspector Priya Singh', 'priya.singh@crms.gov.in', '+91-9876543212', 2, 3, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'analyst1', '$2a$10$L2UwKId9CzcVObu702A1keCnwI7CsdH87fQwqV86Vrb7h.zZhCNGO', 'Data Analyst Amit Patel', 'amit.patel@crms.gov.in', '+91-9876543213', 3, 1, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Sample Crime Reports
INSERT INTO crime_reports (id, title, description, category_id, location, latitude, longitude, reported_by, status, created_at, updated_at) VALUES
(1, 'Armed Robbery at Central Bank', 'Three armed men robbed the Central Bank branch on MG Road.', 1, 'MG Road, Mumbai', 19.0760, 72.8777, 2, 'Open', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Cyber Fraud Case - Online Scam', 'Multiple victims reported losing money through fake investment schemes.', 4, 'Online Platform', 19.0760, 72.8777, 2, 'Under Investigation', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Drug Trafficking Network Busted', 'Large-scale drug trafficking operation uncovered in suburban area.', 5, 'Suburban Mumbai', 19.0760, 72.8777, 3, 'Closed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Sample Cases
INSERT INTO cases (id, crime_report_id, assigned_to, status, opened_at, notes) VALUES
(1, 1, 2, 'Open', CURRENT_TIMESTAMP, 'Initial investigation started. CCTV footage being analyzed.'),
(2, 2, 3, 'Under Investigation', CURRENT_TIMESTAMP, 'Cyber forensics team working on tracing the scammers.'),
(3, 3, 2, 'Closed', CURRENT_TIMESTAMP, 'Case successfully resolved. All suspects convicted.');

-- Insert Sample Messages
INSERT INTO messages (id, sender_id, receiver_id, subject, content, sent_at, is_read, is_encrypted) VALUES
(1, 2, 3, 'Case Update - Armed Robbery', 'Please review the CCTV footage from the Central Bank robbery case.', CURRENT_TIMESTAMP, FALSE, TRUE),
(2, 3, 2, 'Re: Case Update - Armed Robbery', 'I have analyzed the footage. Vehicle details captured.', CURRENT_TIMESTAMP, TRUE, TRUE);
