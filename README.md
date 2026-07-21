# 🏥 Hospital Appointment Management System

A modern Hospital Appointment Management System built with **React**, **ASP.NET Core Web API**, and **SQL Server**. The system streamlines hospital operations by allowing administrators, doctors, and patients to manage appointments efficiently through a secure, role-based platform.

---

## 📌 Overview

The Hospital Appointment Management System is a full-stack web application designed to simplify hospital administration. It provides secure authentication, appointment scheduling, doctor management, patient management, and department management using a responsive and user-friendly interface.

The application uses JWT authentication and Role-Based Authorization to ensure that every user can only access features assigned to their role.

---

## ✨ Features

### 🔐 Authentication
- Secure Login
- JWT Authentication
- Role-Based Authorization
- Protected Routes
- Automatic Session Handling

### 👨‍💼 Administrator
- Dashboard Overview
- Manage Users
- Manage Departments
- Manage Doctors
- Manage Patients
- Manage Appointments
- Activate or Deactivate Users

### 👨‍⚕️ Doctor
- View Assigned Appointments
- Manage Appointment Status
- View Patient Information

### 🧑‍🦱 Patient
- Book Appointments
- View Appointment History
- Update Personal Information

---

# 🛠 Technology Stack

## Frontend

- React
- React Router
- Axios
- Tailwind CSS
- Lucide React
- Vite

## Backend

- ASP.NET Core Web API
- ADO.NET
- JWT Authentication
- Dependency Injection
- Repository Pattern
- Service Layer Architecture

## Database

- SQL Server

---

# 📁 Project Structure

```
HospitalAppointmentReact
│
├── public/
│
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── constants/
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md
```

---

# 🔑 User Roles

| Role | Description |
|-------|-------------|
| Admin | Full system management |
| Doctor | Manage appointments and patients |
| Patient | Book and manage appointments |

---

# 📷 Application Modules

- Authentication
- Dashboard
- User Management
- Department Management
- Doctor Management
- Patient Management
- Appointment Management
- Profile Management

---

# 🚀 Getting Started

## Prerequisites

Install the following software before running the project.

- Node.js (18 or later)
- npm
- Visual Studio 2022
- SQL Server
- Git

---

# Clone the Repository

```bash
git clone https://github.com/your-username/HospitalAppointmentReact.git
```

Move into the project folder.

```bash
cd HospitalAppointmentReact
```

---

# Install Dependencies

```bash
npm install
```

---

# Configure Environment Variables

Create a `.env` file in the project root.

Example:

```env
VITE_API_BASE_URL=https://localhost:7200/api
```

> Make sure the backend API is running before starting the frontend.

---

# Start the Development Server

```bash
npm run dev
```

The application will run at

```
http://localhost:5173
```

---

# Backend Requirements

The frontend communicates with an ASP.NET Core Web API.

Required backend features include:

- JWT Authentication
- SQL Server Database
- CRUD APIs
- Role-Based Authorization

Example API URL

```
https://localhost:7200/api
```

---

# Authentication Flow

1. User logs in.
2. Backend validates credentials.
3. JWT token is generated.
4. Token is stored in Local Storage.
5. Axios automatically includes the token in every protected request.
6. Role-based navigation is enabled.

---

# Security

- JWT Authentication
- Protected API Routes
- Password Hashing
- Role-Based Access Control
- Secure HTTP Requests
- Authentication Middleware

---

# API Communication

Axios is used to communicate with the backend.

Example endpoints include:

```
POST   /Users/login
POST   /Users/register

GET    /Users/all
GET    /Doctors/all
GET    /Patients/all
GET    /Departments/all
GET    /Appointments/all

POST   /Doctors
PUT    /Doctors/update
DELETE /Doctors/delete/{id}
```

---

# Screenshots

You can add screenshots inside a folder named:

```
screenshots/
```

Example

```
screenshots/login.png
screenshots/dashboard.png
screenshots/doctors.png
screenshots/patients.png
```


---

# License

This project was developed for educational purposes.


