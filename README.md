# Crime Report Management System (CRMS)

> **Instant One-Command Setup:**
> The project now runs out-of-the-box with an embedded H2 database (MySQL compatible) and pre-seeded sample data. No manual MySQL installation or database import is required!
> 
> Simply run:
> ```bash
> ./start.sh
> ```
> or
> ```bash
> npm start
> ```

---

A secure, centralized digital platform for Law Enforcement agencies to log crime reports, manage investigation cases, communicate securely across agencies, and generate crime analytics.

---

## 🏗️ Architecture

- **Backend**: Java 25 Spring Boot 3.2.5 with JPA / Hibernate & Spring Security
- **Frontend**: ReactJS 18 with Material-UI (MUI)
- **Security**: JWT Authentication with Role-Based Access Control (RBAC) & CORS preflight handling
- **Database**: Embedded H2 Database (MySQL Mode, zero configuration required) / Optional external MySQL 8.0 support

---

## 🚀 Key Features & Modules

1. **Authentication & Authorization** - JWT login with roles (`ADMIN`, `OFFICER`, `ANALYST`).
2. **Crime Reporting** - Submit, track, update, and manage crime incident reports.
3. **Case Management** - Create investigation cases, assign officers, add investigation notes, and resolve cases.
4. **Analytics & Dashboard** - System metrics, resolution statistics, category breakdowns, and monthly crime trends.
5. **Inter-Agency Communication** - Direct messaging and compose modules between officers, analysts, and admins.
6. **Master Data Management** - Users, departments, police jurisdictions, and crime categories.
7. **Admin Panel** - Full user access management, role configuration, department assignment, and system stats.
8. **Audit Logging** - Activity tracking and compliance audit trails.

---

## 🔑 Default Login Credentials

| Role | Username | Password | Full Name | Access Level |
| :--- | :--- | :--- | :--- | :--- |
| **System Administrator** | `admin` | `admin123` | System Administrator | Full Admin Dashboard & User Management |
| **Police Officer** | `officer1` | `admin123` | Inspector Rajesh Kumar | Crime Reports, Cases & Messaging |
| **Crime Analyst** | `analyst1` | `admin123` | Data Analyst Amit Patel | Analytics, Reports & Cases |

---

## ⚡ Quick Start

### 1. One-Command Launch (Recommended)

From the root directory, simply run:
```bash
./start.sh
```
or
```bash
npm start
```

This will automatically:
- Start the Spring Boot backend on port **8081**.
- Start the React frontend on port **3000**.
- Initialize the embedded H2 database and populate initial sample data.

---

### 2. Accessing the Application

- **Frontend App**: [http://localhost:3000](http://localhost:3000) (or via Network IP on port `3000`)
- **Backend API**: `http://localhost:8081/api`
- **H2 DB Console**: `http://localhost:8081/h2-console`
  - **JDBC URL**: `jdbc:h2:mem:crms_db`
  - **Username**: `sa`
  - **Password**: *(leave blank)*

---

## 🛠️ Manual Setup

If you prefer to start the backend and frontend separately:

### Backend:
```bash
cd backend
mvn spring-boot:run
```

### Frontend:
```bash
cd frontend
npm install
npm start
```

---

## 💾 Optional MySQL Configuration

By default, the application runs using the zero-config embedded H2 database. To switch to a standalone MySQL database server:

1. Edit `backend/src/main/resources/application.properties`:
```properties
# Uncomment MySQL configuration and comment out H2 lines
spring.datasource.url=jdbc:mysql://localhost:3306/crms_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=crms_user
spring.datasource.password=crms_password_2024
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

2. Run the included SQL initialization script `database-setup.sql` in your MySQL database.

---

## 📁 Project Structure

```
CRMS/
├── backend/                          # Spring Boot Backend
│   ├── src/main/java/com/crms/
│   │   ├── auth/                     # Authentication & DTOs
│   │   ├── user/                     # User management
│   │   ├── role/                     # Role management
│   │   ├── crime/                    # Crime reporting & categories
│   │   ├── case_management/          # Case management
│   │   ├── analytics/                # Analytics and metrics
│   │   ├── message/                  # Inter-agency messaging
│   │   ├── department/               # Department management
│   │   ├── jurisdiction/             # Jurisdiction management
│   │   ├── audit/                    # Audit logging
│   │   ├── file/                     # File management
│   │   ├── config/                   # Spring Security & CORS config
│   │   ├── security/                 # JwtFilter & EntryPoint
│   │   └── util/                     # JwtUtil helper
│   └── src/main/resources/
│       ├── application.properties    # Backend configuration
│       └── data.sql                  # Seed data script
├── frontend/                         # ReactJS Frontend
│   ├── src/
│   │   ├── components/              # Navbar & reusable UI
│   │   ├── pages/                   # LoginPage, Dashboard, Reports, Cases, etc.
│   │   ├── services/                # API client & services (axios)
│   │   └── utils/                   # Utility helpers
│   └── package.json
├── database-setup.sql                # Standalone MySQL setup script
├── start.sh                          # One-click startup script
├── package.json                      # Root npm launcher script
└── README.md
```

---

## 🔒 Security & CORS Features

- **JWT Authentication**: Secured stateless token-based authentication.
- **CORS & Preflight Handling**: Native preflight OPTIONS handling for smooth cross-origin and network IP access.
- **Password Security**: Passwords stored using BCrypt hashing.
- **Jackson Proxy Protection**: Configured `@JsonIgnoreProperties` on entity models to prevent lazy serialization issues.

---

## 📝 License & Purpose

This project is developed for educational and skill development purposes.

## 🤝 Support

For technical questions or feedback, connect on [LinkedIn](https://www.linkedin.com/in/ravindra-kumar-suthar-882ravi/).
