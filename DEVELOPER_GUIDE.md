# 📚 COMPLETE DEVELOPER GUIDE

## Table of Contents
1. [Project Overview](#project-overview)
2. [Setup Instructions](#setup-instructions)
3. [Project Structure](#project-structure)
4. [Running the Application](#running-the-application)
5. [API Documentation](#api-documentation)
6. [Frontend Components](#frontend-components)
7. [Database Models](#database-models)
8. [Authentication Flow](#authentication-flow)
9. [Troubleshooting](#troubleshooting)
10. [Production Deployment](#production-deployment)

---

## Project Overview

**COPD Detection System** is a full-stack medical support application for managing patients, appointments, and doctors.

### Tech Stack
- **Frontend**: React 18 + Vite + Axios
- **Backend**: Node.js + Express + MongoDB
- **Database**: MongoDB (local or Atlas)
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Pure CSS

### Features
- User registration and authentication
- Role-based access (Doctor, Assistant, Patient)
- Appointment management
- Patient management
- Dashboard with statistics
- Secure API with JWT tokens

---

## Setup Instructions

### Prerequisites
- Node.js v16+ ([Download](https://nodejs.org))
- MongoDB ([Local](https://www.mongodb.com/try/download/community) or [Atlas Cloud](https://www.mongodb.com/cloud/atlas))
- npm or yarn
- Git (optional)

### Backend Setup

1. **Navigate to backend folder**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create/verify .env file**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/copd_detection
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

4. **Start MongoDB** (if local)
```bash
mongod
```

5. **Start backend server**
```bash
npm run dev
```

### Frontend Setup

1. **Navigate to frontend folder** (in new terminal)
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Verify .env file**
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=COPD Detection
```

4. **Start frontend dev server**
```bash
npm run dev
```

### Verify Installation

- Backend: http://localhost:5000/api/health
- Frontend: http://localhost:5173

---

## Project Structure

```
COPD1/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── assistantController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Patient.js
│   │   │   └── Appointment.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── assistantRoutes.js
│   │   └── index.js
│   ├── .env
│   ├── package.json
│   └── seed.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── AssistantLogin.jsx
│   │   │   ├── AssistantRegister.jsx
│   │   │   ├── AssistantDashboard.jsx
│   │   │   ├── Appointments.jsx
│   │   │   └── Patients.jsx
│   │   ├── services/
│   │   │   └── apiService.js
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   ├── layout.css
│   │   │   ├── forms.css
│   │   │   └── home.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── .env
│   └── package.json
│
├── README.md (Full documentation)
├── QUICK_START.md (Quick setup guide)
├── ARCHITECTURE.md (System architecture)
├── TESTING.md (Testing guide)
├── start.sh (Linux/Mac starter)
└── start.bat (Windows starter)
```

---

## Running the Application

### Option 1: Manual (Recommended for Development)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Option 2: Batch Script (Windows)
```bash
start.bat
```

### Option 3: Shell Script (Linux/Mac)
```bash
chmod +x start.sh
./start.sh
```

### Using Docker (Optional)

**Docker Compose** (create `docker-compose.yml`):
```yaml
version: '3.8'
services:
  mongo:
    image: mongo:5.0
    ports:
      - "27017:27017"
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - mongo
  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
```

```bash
docker-compose up
```

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. Register
```http
POST /auth/register
Content-Type: application/json

{
  "role": "assistant|doctor|patient",
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "staffId": "S001" (assistant only),
  "nic": "123456789",
  "phone": "0712345678",
  "placeOfWork": "Hospital Name"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64abc123...",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "assistant"
  }
}
```

#### 2. Login
```http
POST /auth/login
Content-Type: application/json

{
  "staffId": "S001",
  "password": "password123",
  "role": "assistant"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64abc123...",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "assistant"
  }
}
```

#### 3. Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "64abc123...",
    "staffId": "S001",
    "role": "assistant",
    "fullName": "John Doe",
    "email": "john@example.com",
    ...
  }
}
```

### Assistant Endpoints (Protected)

All require: `Authorization: Bearer <token>`

#### 4. Get Dashboard
```http
GET /assistant/dashboard
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalPatients": 124,
    "todayAppointments": 9,
    "pendingAppointments": 3,
    "appointmentsList": [...]
  }
}
```

#### 5. Get Appointments
```http
GET /assistant/appointments
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64abc123...",
      "patientId": {
        "_id": "...",
        "fullName": "Patient Name",
        "email": "patient@example.com"
      },
      "doctorId": {
        "_id": "...",
        "fullName": "Dr. Name",
        "email": "doctor@example.com"
      },
      "appointmentDate": "2026-02-01T10:00:00.000Z",
      "status": "pending",
      "notes": "Follow-up"
    }
  ]
}
```

#### 6. Create Appointment
```http
POST /assistant/appointments
Authorization: Bearer <token>
Content-Type: application/json

{
  "patientId": "64abc123...",
  "doctorId": "64abc124...",
  "appointmentDate": "2026-02-15T10:00:00Z",
  "notes": "COPD screening"
}
```

#### 7. Update Appointment
```http
PUT /assistant/appointments/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed|cancelled|scheduled",
  "notes": "Updated notes"
}
```

#### 8. Get Patients
```http
GET /assistant/patients
Authorization: Bearer <token>
```

---

## Frontend Components

### App.jsx
Main router component that sets up all routes.

```javascript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/assistant/login" element={<AssistantLogin />} />
  <Route path="/assistant/register" element={<AssistantRegister />} />
  <Route path="/assistant/dashboard" element={<AssistantDashboard />} />
  ...
</Routes>
```

### Home.jsx
Landing page with three role options.
- Doctor card with login/register
- Assistant card with login/register
- Patient card with login only

### AssistantLogin.jsx
Login form for existing assistants.
- Staff ID input
- Password input
- Error handling
- "Not Registered?" link to registration

### AssistantRegister.jsx
Registration form for new assistants.
- Personal profile section
- Contact information section
- Account security section
- Validation and error handling
- Auto-redirect to dashboard after success

### AssistantDashboard.jsx
Main dashboard after login.
- Statistics cards (total patients, today's appointments, pending)
- Appointments table
- Sidebar navigation
- Protected route (requires token)

### Navbar.jsx
Top navigation bar.
- Shows app name
- Shows logged-in user
- Logout button

### Sidebar.jsx
Left sidebar navigation.
- Dashboard link
- Appointments link
- Patients link
- Active state highlighting

---

## Database Models

### User Schema
```javascript
{
  staffId: String (unique, sparse),
  role: 'doctor' | 'assistant' | 'patient',
  fullName: String (required),
  email: String (unique, required),
  phone: String,
  password: String (hashed, required),
  nic: String (unique, sparse),
  placeOfWork: String,
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Patient Schema
```javascript
{
  userId: ObjectId (ref: User),
  age: Number,
  gender: 'male' | 'female' | 'other',
  medicalHistory: String,
  status: 'active' | 'inactive' | 'discharged',
  assignedDoctor: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Appointment Schema
```javascript
{
  patientId: ObjectId (ref: User, required),
  doctorId: ObjectId (ref: User, required),
  appointmentDate: Date (required),
  status: 'scheduled' | 'completed' | 'cancelled' | 'pending',
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Authentication Flow

```
1. User Registration
   ├─ User fills form
   ├─ POST /api/auth/register
   ├─ Backend hashes password with bcrypt
   ├─ Saves to MongoDB
   ├─ Generates JWT token
   └─ Returns token & user data

2. User Login
   ├─ User enters credentials
   ├─ POST /api/auth/login
   ├─ Backend finds user
   ├─ Compares password (bcrypt)
   ├─ Generates JWT token
   └─ Returns token & user data

3. Token Storage
   ├─ Frontend saves token to localStorage
   ├─ Saves user info to localStorage
   └─ Ready for authenticated requests

4. Protected Route Access
   ├─ Frontend checks localStorage for token
   ├─ If missing, redirect to login
   ├─ If exists, attach to Authorization header
   └─ Send request: Authorization: Bearer <token>

5. Backend Verification
   ├─ Middleware checks Authorization header
   ├─ Extracts token
   ├─ Verifies signature with JWT secret
   ├─ Extracts user ID from token
   ├─ Attaches user to request object
   └─ Proceeds to controller

6. Logout
   ├─ Frontend removes token from localStorage
   ├─ Frontend removes user from localStorage
   └─ Redirect to home page
```

---

## Troubleshooting

### MongoDB Connection Issues

**Error:** `MongoDB Connection Error: connect ECONNREFUSED`

**Solutions:**
1. Start MongoDB locally:
   ```bash
   mongod
   ```
2. Or use MongoDB Atlas:
   - Create account at https://www.mongodb.com/cloud/atlas
   - Create cluster
   - Get connection string
   - Update `MONGODB_URI` in backend/.env

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution (Windows):**
```bash
# Find PID using port 5000
netstat -ano | findstr :5000

# Kill process
taskkill /PID <PID> /F
```

**Solution (Mac/Linux):**
```bash
# Find process
lsof -i :5000

# Kill process
kill -9 <PID>
```

### CORS Error

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solutions:**
1. Verify backend is running
2. Check `CORS_ORIGIN` matches frontend URL
3. Make sure frontend is at `http://localhost:5173`
4. Restart backend after .env changes

### Token Issues

**Error:** `401 Invalid token`

**Solutions:**
1. Log in again to get new token
2. Clear localStorage:
   ```javascript
   localStorage.clear()
   ```
3. Verify token in Network tab
4. Check JWT secret is same in .env

### API Not Responding

**Error:** `Cannot reach API` or `Connection refused`

**Solutions:**
1. Verify backend is running: `npm run dev`
2. Check port 5000 is accessible
3. Verify API URL in frontend `.env`
4. Check firewall settings
5. Restart backend

### Blank Frontend Page

**Error:** White screen with no content

**Solutions:**
1. Open browser console (F12)
2. Check for errors
3. Check if backend is running
4. Clear browser cache
5. Hard refresh (Ctrl+Shift+R)

### Dependencies Not Installing

**Error:** `npm ERR! code ERESOLVE`

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Install with legacy peer deps
npm install --legacy-peer-deps
```

---

## Production Deployment

### Backend Deployment (Heroku Example)

1. **Add Procfile** in backend/:
```
web: npm start
```

2. **Add start script** in backend/package.json:
```json
"scripts": {
  "start": "node src/index.js",
  "dev": "nodemon src/index.js"
}
```

3. **Deploy:**
```bash
heroku login
heroku create copd-detection-api
git push heroku main
```

### Frontend Deployment (Vercel Example)

1. **Add build script** in frontend/package.json:
```json
"scripts": {
  "build": "vite build"
}
```

2. **Deploy:**
```bash
npm install -g vercel
vercel
```

### Environment Variables (Production)

**Backend .env:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/copd_detection
NODE_ENV=production
JWT_SECRET=<generate-random-secret>
JWT_EXPIRE=7d
CORS_ORIGIN=https://your-frontend-domain.com
```

**Frontend .env.production:**
```env
VITE_API_BASE_URL=https://your-backend-api.com/api
VITE_APP_NAME=COPD Detection
```

### Security Checklist

- [ ] JWT secret is strong (30+ chars random)
- [ ] Database backups enabled
- [ ] SSL/HTTPS enabled
- [ ] CORS properly configured
- [ ] Environment variables set
- [ ] Error logging enabled
- [ ] Rate limiting configured
- [ ] Input validation enabled
- [ ] HTTPS redirects enabled

---

## Support & Resources

- **Express**: https://expressjs.com/
- **React**: https://react.dev/
- **MongoDB**: https://docs.mongodb.com/
- **Vite**: https://vitejs.dev/
- **JWT**: https://jwt.io/
- **Axios**: https://axios-http.com/

---

**Last Updated:** February 2026
**Version:** 1.0.0
**Maintainer:** Your Name
