# CRMS Backend (Spring Boot 3.2.5)

This is the backend for the Crime Report Management System (CRMS), built with Java 25, Spring Boot 3.2.5, Spring Security (JWT), and Hibernate JPA.

## Modules
- Authentication & Authorization (`/api/auth`)
- Crime Reporting (`/api/reports`, `/api/categories`)
- Case Management (`/api/cases`)
- Analytics & Dashboard (`/api/analytics`)
- Inter-Agency Communication (`/api/messages`)
- Master Data Management (`/api/departments`, `/api/roles`, `/api/jurisdictions`)
- User & Admin Management (`/api/users`)
- Audit & Log (`/api/audit`)

## Out-of-the-Box Database
Runs automatically with an in-memory H2 database (MySQL compatibility mode) populated via `data.sql`.

## Running Backend
```bash
mvn spring-boot:run
```
Backend will run on port `8081`.