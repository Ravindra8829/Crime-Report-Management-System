# Database Setup Guide for CRMS

## Overview
This guide will help you set up the MySQL database for the Crime Report Management System (CRMS).

## Prerequisites
- MySQL 8.0 or higher installed
- MySQL command line client or MySQL Workbench
- Administrative access to create databases

## Quick Setup

### 1. Install MySQL (if not already installed)

**On Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

**On CentOS/RHEL:**
```bash
sudo yum install mysql-server
sudo systemctl start mysqld
sudo mysql_secure_installation
```

**On macOS (using Homebrew):**
```bash
brew install mysql
brew services start mysql
mysql_secure_installation
```

**On Windows:**
Download and install MySQL from the official website: https://dev.mysql.com/downloads/mysql/

### 2. Create Database and User

```sql
-- Connect to MySQL as root
mysql -u root -p

-- Create database
CREATE DATABASE crms_db;

-- Create user for the application
CREATE USER 'crms_user'@'localhost' IDENTIFIED BY 'crms_password_2024';

-- Grant privileges
GRANT ALL PRIVILEGES ON crms_db.* TO 'crms_user'@'localhost';
FLUSH PRIVILEGES;

-- Exit MySQL
EXIT;
```

### 3. Initialize Database Schema

```bash
# Run the complete setup script
mysql -u crms_user -p crms_db < database-setup.sql
```

### 4. Verify Setup

```bash
# Connect to database
mysql -u crms_user -p crms_db

# Check tables
SHOW TABLES;

# Check sample data
SELECT * FROM users;
SELECT * FROM crime_reports;
SELECT * FROM cases;

# Exit
EXIT;
```

## Database Structure

### Core Tables
- **users** - System users with roles and departments
- **roles** - User roles (ADMIN, OFFICER, ANALYST)
- **departments** - Police departments
- **jurisdictions** - Police jurisdictions
- **crime_categories** - Types of crimes
- **crime_reports** - Crime reports submitted
- **cases** - Investigation cases
- **messages** - Inter-agency communication
- **files** - File uploads and attachments
- **audit_logs** - System activity logs

### Sample Data Included
- 3 user roles (ADMIN, OFFICER, ANALYST)
- 8 police jurisdictions across India
- 8 departments (Cyber Crime, Homicide, etc.)
- 12 crime categories
- 5 default users with credentials
- 5 sample crime reports
- 5 sample cases
- 4 sample messages
- 5 sample audit logs

## Default Login Credentials

| Username | Password | Role | Full Name |
|----------|----------|------|-----------|
| admin | admin123 | ADMIN | System Administrator |
| officer1 | admin123 | OFFICER | Inspector Rajesh Kumar |
| officer2 | admin123 | OFFICER | Sub-Inspector Priya Singh |
| analyst1 | admin123 | ANALYST | Data Analyst Amit Patel |
| analyst2 | admin123 | ANALYST | Senior Analyst Meera Iyer |

## Configuration

### Update Application Properties
Edit `backend/src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/crms_db
spring.datasource.username=crms_user
spring.datasource.password=crms_password_2024
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

## Security Considerations

### Production Database Setup
1. **Use Strong Passwords**: Change default passwords
2. **Restrict Access**: Limit database access to application server only
3. **Enable SSL**: Use SSL connections for database
4. **Regular Backups**: Set up automated database backups
5. **Monitoring**: Implement database monitoring and alerting

### Example Production Commands
```bash
# Create production user with limited privileges
CREATE USER 'crms_prod'@'application-server-ip' IDENTIFIED BY 'strong_password_here';

# Grant only necessary privileges
GRANT SELECT, INSERT, UPDATE, DELETE ON crms_db.* TO 'crms_prod'@'application-server-ip';

# Enable SSL
ALTER USER 'crms_prod'@'application-server-ip' REQUIRE SSL;
```

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Check if MySQL service is running
   - Verify port 3306 is open
   - Check firewall settings

2. **Access Denied**
   - Verify username and password
   - Check user privileges
   - Ensure user can access from application host

3. **Table Not Found**
   - Run the database setup script
   - Check if database exists
   - Verify table names in schema

### Useful Commands
```sql
-- Check MySQL status
SHOW VARIABLES LIKE 'version';

-- List databases
SHOW DATABASES;

-- List users
SELECT user, host FROM mysql.user;

-- Check user privileges
SHOW GRANTS FOR 'crms_user'@'localhost';

-- Reset user password
ALTER USER 'crms_user'@'localhost' IDENTIFIED BY 'new_password';
```

## Performance Optimization

### Indexes
The setup script creates indexes on frequently queried columns:
- User authentication (username, email)
- Crime reports (status, reported_by)
- Cases (assigned_to, status)
- Messages (sender, receiver, sent_at)
- Audit logs (user_id, created_at)

### Recommended MySQL Configuration
```ini
[mysqld]
# InnoDB settings
innodb_buffer_pool_size = 1G
innodb_log_file_size = 256M
innodb_flush_log_at_trx_commit = 2

# Connection settings
max_connections = 200
max_connect_errors = 1000000

# Query cache
query_cache_type = 1
query_cache_size = 64M

# Logging
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 2
```

## Backup and Recovery

### Automated Backup Script
```bash
#!/bin/bash
# backup_crms.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backup/crms"
DB_NAME="crms_db"
DB_USER="crms_user"
DB_PASS="crms_password_2024"

# Create backup directory
mkdir -p $BACKUP_DIR

# Create backup
mysqldump -u $DB_USER -p$DB_PASS $DB_NAME > $BACKUP_DIR/crms_backup_$DATE.sql

# Compress backup
gzip $BACKUP_DIR/crms_backup_$DATE.sql

# Keep only last 7 days of backups
find $BACKUP_DIR -name "crms_backup_*.sql.gz" -mtime +7 -delete

echo "Backup completed: crms_backup_$DATE.sql.gz"
```

### Restore Database
```bash
# Restore from backup
gunzip < backup_file.sql.gz | mysql -u crms_user -p crms_db
```

## Support

For database-related issues:
1. Check MySQL error logs: `/var/log/mysql/error.log`
2. Verify application logs for database connection errors
3. Test database connectivity manually
4. Review MySQL configuration for performance issues

---

**Database Setup Complete!** 🎉

Your CRMS database is now ready for production use with comprehensive security, performance optimization, and backup procedures in place. 