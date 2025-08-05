
# XAMPP Setup Guide for CRMS (macOS & Windows)

> **Note:**
> This guide is written for macOS, but CRMS works on Windows and Linux as well. For Windows, use the XAMPP Control Panel and MySQL Workbench for GUI-based steps, or Command Prompt for CLI steps. Adjust file paths and commands as needed for your OS.

## Overview
This guide will help you set up the Crime Report Management System (CRMS) using XAMPP on your MacBook.

## Prerequisites
- XAMPP installed on macOS or Windows
- Terminal (macOS) or Command Prompt/PowerShell (Windows)
- Text editor (VS Code, Sublime Text, etc.)

## Step-by-Step Setup

### 1. Start XAMPP Services

#### On macOS:
**Option A: Using XAMPP Control Panel**
1. Open XAMPP Control Panel
2. Click "Start" next to **Apache** and **MySQL**
3. Verify both services show green status

**Option B: Using Terminal**
```bash
# Navigate to XAMPP directory
cd /Applications/XAMPP/xamppfiles/
# Start Apache and MySQL
sudo ./xampp start
# Check status
sudo ./xampp status
```

#### On Windows:
1. Open the XAMPP Control Panel
2. Click "Start" next to **Apache** and **MySQL**
3. Both services should show green status

### 2. Access phpMyAdmin

1. Open your web browser
2. Go to: `http://localhost/phpmyadmin`
3. Login with:
   - **Username**: `root`
   - **Password**: (leave blank by default)

### 3. Create Database and User

**Using phpMyAdmin (macOS/Windows):**
1. Click "New" to create a new database
2. Enter database name: `crms_db`
3. Click "Create"

**Using Terminal (macOS) or Command Prompt (Windows):**

#### On macOS:
```bash
# Connect to MySQL
/Applications/XAMPP/xamppfiles/bin/mysql -u root
# Create database
CREATE DATABASE crms_db;
# Create user
CREATE USER 'crms_user'@'localhost' IDENTIFIED BY 'crms_password_2024';
# Grant privileges
GRANT ALL PRIVILEGES ON crms_db.* TO 'crms_user'@'localhost';
FLUSH PRIVILEGES;
# Exit MySQL
EXIT;
```

#### On Windows:
```bat
mysql -u root
CREATE DATABASE crms_db;
CREATE USER 'crms_user'@'localhost' IDENTIFIED BY 'crms_password_2024';
GRANT ALL PRIVILEGES ON crms_db.* TO 'crms_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 4. Import Database Schema

**Option A: Using phpMyAdmin (macOS/Windows)**
1. Select the `crms_db` database
2. Click "Import" tab
3. Click "Choose File" and select `database-setup.sql`
4. Click "Go" to import

**Option B: Using Terminal (macOS) or Command Prompt (Windows):**

#### On macOS:
```bash
# Navigate to your CRMS project directory
cd /path/to/your/CRMS
# Import the database setup script
/Applications/XAMPP/xamppfiles/bin/mysql -u crms_user -p crms_db < database-setup.sql
```

#### On Windows:
```bat
mysql -u crms_user -p crms_db < database-setup.sql
```

### 5. Verify Database Setup

**Using phpMyAdmin (macOS/Windows):**
1. Select `crms_db` database
2. You should see these tables:
   - users
   - roles
   - departments
   - jurisdictions
   - crime_categories
   - crime_reports
   - cases
   - messages
   - files
   - audit_logs

**Using Terminal (macOS) or Command Prompt (Windows):**

#### On macOS:
```bash
# Connect to database
/Applications/XAMPP/xamppfiles/bin/mysql -u crms_user -p crms_db
# Check tables
SHOW TABLES;
# Check sample data
SELECT * FROM users;
SELECT COUNT(*) as total_reports FROM crime_reports;
# Exit
EXIT;
```

#### On Windows:
```bat
mysql -u crms_user -p crms_db
SHOW TABLES;
SELECT * FROM users;
SELECT COUNT(*) as total_reports FROM crime_reports;
EXIT;
```

### 6. Configure Backend Application

Edit `backend/src/main/resources/application.properties`:

```properties
# Database Configuration for XAMPP
spring.datasource.url=jdbc:mysql://localhost:3306/crms_db
spring.datasource.username=crms_user
spring.datasource.password=crms_password_2024
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Server Configuration
server.port=8080
```

### 7. Test Database Connection

**Create a test script:**
```bash
# Create test file
cat > test_db_connection.sql << 'EOF'
USE crms_db;
SELECT 'Database connection successful!' as status;
SELECT COUNT(*) as total_users FROM users;
SELECT COUNT(*) as total_reports FROM crime_reports;
SELECT COUNT(*) as total_cases FROM cases;
EOF

# Run test
/Applications/XAMPP/xamppfiles/bin/mysql -u crms_user -p crms_db < test_db_connection.sql
```

## XAMPP-Specific Configuration

### MySQL Configuration for XAMPP

Edit `/Applications/XAMPP/xamppfiles/etc/my.cnf`:

```ini
[mysqld]
# Basic settings
port = 3306
socket = /Applications/XAMPP/xamppfiles/var/mysql/mysql.sock
key_buffer_size = 256M
max_allowed_packet = 64M
table_open_cache = 256
sort_buffer_size = 1M
read_buffer_size = 1M
read_rnd_buffer_size = 4M
myisam_sort_buffer_size = 64M
thread_cache_size = 8
query_cache_size = 16M

# InnoDB settings
innodb_buffer_pool_size = 256M
innodb_log_file_size = 64M
innodb_flush_log_at_trx_commit = 2

# Connection settings
max_connections = 100
max_connect_errors = 1000000

# Logging
log_error = /Applications/XAMPP/xamppfiles/var/mysql/error.log
slow_query_log = 1
slow_query_log_file = /Applications/XAMPP/xamppfiles/var/mysql/slow.log
long_query_time = 2
```

### Restart MySQL After Configuration
```bash
# Stop MySQL
sudo /Applications/XAMPP/xamppfiles/bin/mysql.server stop

# Start MySQL
sudo /Applications/XAMPP/xamppfiles/bin/mysql.server start
```

## Troubleshooting XAMPP Issues

### Common Issues and Solutions

**1. MySQL Won't Start**
```bash
# Check if port 3306 is in use
sudo lsof -i :3306

# Kill process if needed
sudo kill -9 <PID>

# Check MySQL error log
tail -f /Applications/XAMPP/xamppfiles/var/mysql/error.log
```

**2. Permission Issues**
```bash
# Fix XAMPP permissions
sudo chmod -R 755 /Applications/XAMPP/xamppfiles/
sudo chown -R daemon:daemon /Applications/XAMPP/xamppfiles/var/mysql/
```

**3. Can't Connect to Database**
```bash
# Test MySQL connection
/Applications/XAMPP/xamppfiles/bin/mysql -u root -p

# Check user privileges
SHOW GRANTS FOR 'crms_user'@'localhost';

# Reset user if needed
DROP USER 'crms_user'@'localhost';
CREATE USER 'crms_user'@'localhost' IDENTIFIED BY 'crms_password_2024';
GRANT ALL PRIVILEGES ON crms_db.* TO 'crms_user'@'localhost';
FLUSH PRIVILEGES;
```

**4. phpMyAdmin Access Issues**
```bash
# Check Apache status
sudo /Applications/XAMPP/xamppfiles/bin/httpd -t

# Restart Apache
sudo /Applications/XAMPP/xamppfiles/bin/httpd restart
```

## Development Workflow with XAMPP

### Daily Development Commands

```bash
# Start XAMPP services
sudo /Applications/XAMPP/xamppfiles/xampp start

# Check status
sudo /Applications/XAMPP/xamppfiles/xampp status

# Stop services
sudo /Applications/XAMPP/xamppfiles/xampp stop

# Restart services
sudo /Applications/XAMPP/xamppfiles/xampp restart
```

### Database Management Commands

```bash
# Backup database
/Applications/XAMPP/xamppfiles/bin/mysqldump -u crms_user -p crms_db > backup_$(date +%Y%m%d).sql

# Restore database
/Applications/XAMPP/xamppfiles/bin/mysql -u crms_user -p crms_db < backup_file.sql

# Reset database (for development)
/Applications/XAMPP/xamppfiles/bin/mysql -u crms_user -p crms_db < database-setup.sql
```

## Security Considerations for Development

### Development Environment Security
```bash
# Change default MySQL root password
/Applications/XAMPP/xamppfiles/bin/mysql -u root
ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_secure_password';
FLUSH PRIVILEGES;
EXIT;
```

### Firewall Settings
```bash
# Allow MySQL port for local development
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /Applications/XAMPP/xamppfiles/bin/mysqld
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --unblock /Applications/XAMPP/xamppfiles/bin/mysqld
```

## Performance Optimization for XAMPP

### MySQL Performance Settings
```ini
# Add to /Applications/XAMPP/xamppfiles/etc/my.cnf
[mysqld]
# Increase buffer sizes for better performance
innodb_buffer_pool_size = 512M
key_buffer_size = 512M
query_cache_size = 32M
```

### Apache Performance Settings
```bash
# Edit /Applications/XAMPP/xamppfiles/etc/httpd.conf
# Increase MaxRequestWorkers for better performance
MaxRequestWorkers 150
```

## Useful XAMPP Commands

```bash
# Start specific services
sudo /Applications/XAMPP/xamppfiles/bin/mysql.server start
sudo /Applications/XAMPP/xamppfiles/bin/httpd start

# Check service status
sudo /Applications/XAMPP/xamppfiles/bin/mysql.server status
sudo /Applications/XAMPP/xamppfiles/bin/httpd -t

# View logs
tail -f /Applications/XAMPP/xamppfiles/var/mysql/error.log
tail -f /Applications/XAMPP/xamppfiles/logs/error_log
```

## Quick Test Commands

```bash
# Test MySQL connection
/Applications/XAMPP/xamppfiles/bin/mysql -u crms_user -p crms_db -e "SELECT 'CRMS Database Connected!' as status;"

# Test sample data
/Applications/XAMPP/xamppfiles/bin/mysql -u crms_user -p crms_db -e "SELECT username, full_name, role_id FROM users;"

# Test crime reports
/Applications/XAMPP/xamppfiles/bin/mysql -u crms_user -p crms_db -e "SELECT title, status FROM crime_reports;"
```

---

## ✅ **XAMPP Setup Complete!**

Your CRMS system is now ready to run with XAMPP on macOS. The database includes:
- ✅ Complete schema with all tables
- ✅ Sample data for testing
- ✅ Default users with login credentials
- ✅ Performance optimized configuration
- ✅ Security settings for development

**Next Steps:**
1. Start your Spring Boot backend application
2. Start your React frontend application
3. Access the system at `http://localhost:3000`
4. Login with the default credentials provided

**Happy Development!** 🚀 