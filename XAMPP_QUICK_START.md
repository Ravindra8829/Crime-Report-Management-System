
# 🚀 XAMPP Quick Start for CRMS

> **Note:**
> This guide is written for macOS, but CRMS works on Windows and Linux as well. For Windows, use the XAMPP Control Panel and MySQL Workbench for GUI-based steps, or Command Prompt for CLI steps. Adjust file paths and commands as needed for your OS.

## **Super Quick Setup (5 minutes)**

### **Step 1: Start XAMPP**

#### On macOS/Linux:
```bash
# Open XAMPP Control Panel and click "Start" for Apache and MySQL
# OR use terminal:
sudo /Applications/XAMPP/xamppfiles/xampp start
```

#### On Windows:
1. Open the XAMPP Control Panel
2. Click "Start" next to **Apache** and **MySQL**
3. Both services should show green status

### **Step 2: Run Setup Script**

#### On macOS/Linux:
```bash
# Make script executable (if not already done)
chmod +x setup-xampp.sh
# Run the automated setup
./setup-xampp.sh
```

#### On Windows:
Open Command Prompt, navigate to your project folder, and run:
```bat
REM If you have Git Bash or WSL, you can run the script as above.
REM Otherwise, follow the manual setup steps below.
```

### **Step 3: Verify Setup**

#### On macOS/Linux:
```bash
# Test database connection
/Applications/XAMPP/xamppfiles/bin/mysql -u crms_user -pcrms_password_2024 crms_db -e "SELECT 'CRMS Ready!' as status;"
```

#### On Windows:
Open Command Prompt and run:
```bat
mysql -u crms_user -pcrms_password_2024 crms_db -e "SELECT 'CRMS Ready!' as status;"
```

## **Manual Setup (if script doesn't work)**

### **1. Create Database**

#### On macOS/Linux:
```bash
# Connect to MySQL
/Applications/XAMPP/xamppfiles/bin/mysql -u root
# Create database and user
CREATE DATABASE crms_db;
CREATE USER 'crms_user'@'localhost' IDENTIFIED BY 'crms_password_2024';
GRANT ALL PRIVILEGES ON crms_db.* TO 'crms_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### On Windows:
Open Command Prompt and run:
```bat
mysql -u root
CREATE DATABASE crms_db;
CREATE USER 'crms_user'@'localhost' IDENTIFIED BY 'crms_password_2024';
GRANT ALL PRIVILEGES ON crms_db.* TO 'crms_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### **2. Import Schema**

#### On macOS/Linux:
```bash
# Import the database setup
/Applications/XAMPP/xamppfiles/bin/mysql -u crms_user -pcrms_password_2024 crms_db < database-setup.sql
```

#### On Windows:
Open Command Prompt and run:
```bat
mysql -u crms_user -pcrms_password_2024 crms_db < database-setup.sql
```

## **🔗 Access Points**

| Service | URL/Command | Credentials |
|---------|-------------|-------------|
| **phpMyAdmin** | `http://localhost/phpmyadmin` | root (no password) |
| **MySQL CLI** | `/Applications/XAMPP/xamppfiles/bin/mysql -u crms_user -p crms_db` | crms_user / crms_password_2024 |
| **CRMS App** | `http://localhost:3000` | admin / admin123 |

## **📊 Database Info**

- **Database**: `crms_db`
- **Username**: `crms_user`
- **Password**: `crms_password_2024`
- **Host**: `localhost`
- **Port**: `3306`

## **👤 Default Users**

| Username | Password | Role |
|----------|----------|------|
| `admin` | `admin123` | ADMIN |
| `officer1` | `admin123` | OFFICER |
| `analyst1` | `admin123` | ANALYST |

## **⚙️ Application Configuration**

Update `backend/src/main/resources/application.properties`:

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

## **🔧 Useful Commands**

### **XAMPP Management**
```bash
# Start XAMPP
sudo /Applications/XAMPP/xamppfiles/xampp start

# Stop XAMPP
sudo /Applications/XAMPP/xamppfiles/xampp stop

# Check status
sudo /Applications/XAMPP/xamppfiles/xampp status

# Restart services
sudo /Applications/XAMPP/xamppfiles/xampp restart
```

### **Database Management**
```bash
# Backup database
/Applications/XAMPP/xamppfiles/bin/mysqldump -u crms_user -pcrms_password_2024 crms_db > backup.sql

# Restore database
/Applications/XAMPP/xamppfiles/bin/mysql -u crms_user -pcrms_password_2024 crms_db < backup.sql

# Reset database
/Applications/XAMPP/xamppfiles/bin/mysql -u crms_user -pcrms_password_2024 crms_db < database-setup.sql
```

### **Quick Tests**
```bash
# Test connection
/Applications/XAMPP/xamppfiles/bin/mysql -u crms_user -pcrms_password_2024 crms_db -e "SELECT 'Connected!' as status;"

# Check users
/Applications/XAMPP/xamppfiles/bin/mysql -u crms_user -pcrms_password_2024 crms_db -e "SELECT username, full_name FROM users;"

# Check crime reports
/Applications/XAMPP/xamppfiles/bin/mysql -u crms_user -pcrms_password_2024 crms_db -e "SELECT title, status FROM crime_reports;"
```

## **🚨 Troubleshooting**

### **MySQL Won't Start**
```bash
# Check if port 3306 is in use
sudo lsof -i :3306

# Kill conflicting process
sudo kill -9 <PID>

# Check MySQL error log
tail -f /Applications/XAMPP/xamppfiles/var/mysql/error.log
```

### **Permission Issues**
```bash
# Fix XAMPP permissions
sudo chmod -R 755 /Applications/XAMPP/xamppfiles/
sudo chown -R daemon:daemon /Applications/XAMPP/xamppfiles/var/mysql/
```

### **Can't Connect to Database**
```bash
# Test root connection
/Applications/XAMPP/xamppfiles/bin/mysql -u root

# Reset user if needed
DROP USER 'crms_user'@'localhost';
CREATE USER 'crms_user'@'localhost' IDENTIFIED BY 'crms_password_2024';
GRANT ALL PRIVILEGES ON crms_db.* TO 'crms_user'@'localhost';
FLUSH PRIVILEGES;
```

## **✅ Success Checklist**

- [ ] XAMPP MySQL service is running
- [ ] Database `crms_db` exists
- [ ] User `crms_user` has privileges
- [ ] All tables are created (12 tables)
- [ ] Sample data is loaded (5 users, 5 reports, 5 cases)
- [ ] Application properties are configured
- [ ] Backend can connect to database
- [ ] Frontend can access backend API

## **🎯 Next Steps**

1. **Start Backend**: Run Spring Boot application
2. **Start Frontend**: Run React application (`npm start`)
3. **Access CRMS**: Open `http://localhost:3000`
4. **Login**: Use `admin` / `admin123`

---

**🎉 Your CRMS is ready to run with XAMPP!** 