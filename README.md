
# Crime Report Management System (CRMS)

> **Note:**
> This project was developed on macOS (Apple Silicon), but it is cross-platform and should work on Windows and Linux as well. Ensure you have compatible versions of Java, Node.js, and MySQL for your operating system. For Apple Silicon (M1/M2/M3) users, use Homebrew or official ARM builds for best compatibility.
> 
> **Windows Users:**
> - Use Command Prompt or PowerShell for commands.
> - Use `mvnw.cmd` instead of `mvn` if you want to use the Maven wrapper.
> - Use `npm.cmd` instead of `npm` if you encounter issues.
> - Install Java, Node.js, and MySQL using official Windows installers.
> - For MySQL, you can use MySQL Workbench or XAMPP for easy setup.

A secure, centralized digital platform exclusively designed for Indian government crime investigation and intelligence agencies such as the Police, CBI, CID, and RAW, to streamline the reporting, sharing, and analysis of criminal data nationwide.

## 🏗️ Architecture

- **Backend**: Java Spring Boot with MySQL
- **Frontend**: ReactJS with Material-UI
- **Security**: JWT-based authentication with role-based access control
- **Database**: MySQL with comprehensive schema for all modules

## 🚀 Features

### Core Modules
1. **Authentication & Authorization** - Secure login with role-based access
2. **Crime Reporting** - Log detailed crime incidents with file attachments
3. **Case Management** - Create, assign, update, and close cases
4. **Search & Filter** - Quick location of reports and cases
5. **Analytics & Dashboard** - Crime trends, heatmaps, and resolution rates
6. **Inter-Agency Communication** - Secure messaging between agencies
7. **Master Data Management** - Users, departments, jurisdictions, categories
8. **Audit & Log** - Activity tracking and compliance
9. **Admin Panel** - User management and system oversight
10. **File Management** - Secure file uploads and PDF exports

### Security Features
- JWT-based authentication
- Role-based access control (ADMIN, OFFICER, ANALYST)
- End-to-end encryption for messages
- Audit logging for compliance
- No public access - agency-only system

## 📋 Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher


## 🛠️ Setup Instructions

### 1. Database Setup
```sql
-- Create database
CREATE DATABASE crms_db;
USE crms_db;

-- Run the schema.sql file in backend/src/main/resources/
```


### 2. Backend Setup

#### On macOS/Linux:
```bash
cd backend
# Update application.properties with your MySQL credentials
# Edit: spring.datasource.username and spring.datasource.password
mvn spring-boot:run
```

#### On Windows:
```bat
cd backend
REM Update application.properties with your MySQL credentials
REM Edit: spring.datasource.username and spring.datasource.password
mvnw.cmd spring-boot:run
```


### 3. Frontend Setup

#### On macOS/Linux:
```bash
cd frontend
npm install
npm start
```

#### On Windows:
```bat
cd frontend
npm.cmd install
npm.cmd start
```

## 🔧 Configuration

### Backend Configuration
Update `backend/src/main/resources/application.properties`:
```properties
# MySQL Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/crms_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=your_username
spring.datasource.password=your_password

# JWT Configuration
crms.jwt.secret=your_jwt_secret_key
crms.jwt.expiration=86400000
```

### Frontend Configuration
Update API base URL in `frontend/src/services/api.js` if needed:
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

## 📁 Project Structure

```
CRMS/
├── backend/                          # Spring Boot Backend
│   ├── src/main/java/com/crms/
│   │   ├── auth/                     # Authentication module
│   │   ├── user/                     # User management
│   │   ├── role/                     # Role management
│   │   ├── crime/                    # Crime reporting
│   │   ├── case_management/          # Case management
│   │   ├── analytics/                # Analytics and dashboard
│   │   ├── message/                  # Inter-agency messaging
│   │   ├── admin/                    # Admin panel
│   │   ├── audit/                    # Audit logging
│   │   ├── file/                     # File management
│   │   ├── config/                   # Configuration
│   │   ├── security/                 # Security configuration
│   │   └── util/                     # Utilities
│   └── src/main/resources/
│       ├── application.properties    # Application configuration
│       └── schema.sql               # Database schema
├── frontend/                         # ReactJS Frontend
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   ├── pages/                   # Main application pages
│   │   ├── services/                # API service calls
│   │   └── utils/                   # Utility functions
│   └── package.json
└── README.md
```

## 🔐 Authentication

The system uses JWT-based authentication with the following roles:
- **ADMIN**: Full system access, user management, analytics
- **OFFICER**: Crime reporting, case management, messaging
- **ANALYST**: Analytics, reporting, case viewing

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Crime Reports
- `GET /api/reports` - List crime reports
- `POST /api/reports` - Create new report
- `GET /api/reports/{id}` - Get report details
- `PUT /api/reports/{id}` - Update report

### Cases
- `GET /api/cases` - List cases
- `POST /api/cases` - Create new case
- `GET /api/cases/{id}` - Get case details
- `PUT /api/cases/{id}` - Update case

### Analytics
- `GET /api/analytics/dashboard` - Dashboard data
- `GET /api/analytics/trends` - Crime trends
- `GET /api/analytics/heatmap` - Crime heatmap

### Admin
- `GET /api/admin/users` - List users
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/{id}` - Update user

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
mvn clean package
java -jar target/crms-backend-1.0.0.jar
```

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the build folder to your web server
```

## 🔒 Security Considerations

- All endpoints require authentication except `/api/auth/login`
- Role-based access control implemented
- JWT tokens expire after 24 hours
- Passwords are encrypted using BCrypt
- Audit logging for all sensitive operations
- No public access - agency-only system

## 📝 License

This project is developed for Indian government agencies and is not open to the public.

## 🤝 Support

For technical support or questions, please contact the development team.

---

**Note**: This is a secure, government-grade system designed for law enforcement agencies. All access is restricted to authorized personnel only. 