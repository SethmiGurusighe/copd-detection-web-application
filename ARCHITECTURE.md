# System Architecture & API Flow

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Client (React Browser)                    │
│              http://localhost:5173                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Pages: Home, Login, Register, Dashboard             │   │
│  │  Components: Navbar, Sidebar                         │   │
│  │  Storage: localStorage (token, user)                 │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕ (REST API)
                        Axios Calls
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Node.js)                         │
│              http://localhost:5000                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Express Server                                      │   │
│  │  ├── Routes (authRoutes, assistantRoutes)            │   │
│  │  ├── Controllers (authController, assistantController)  │
│  │  ├── Models (User, Patient, Appointment)             │   │
│  │  ├── Middleware (auth, errorHandler)                 │   │
│  │  └── Config (database connection)                    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕
                      Mongoose ODM
┌─────────────────────────────────────────────────────────────┐
│                  MongoDB Database                            │
│         mongodb://localhost:27017                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Collections:                                        │   │
│  │  ├── users (doctor, assistant, patient)              │   │
│  │  ├── patients                                        │   │
│  │  └── appointments                                    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Authentication Flow

```
1. User opens http://localhost:5173
           ↓
2. Home page with three role options
           ↓
3. User clicks "Assistant Login/Register"
           ↓
4. Redirects to /assistant/login
           ↓
   ┌─────────────────────────────────────┐
   │ New User? → Click "Register here"   │
   │              ↓                       │
   │         /assistant/register         │
   │              ↓                       │
   │         Fill registration form      │
   │              ↓                       │
   │    POST /api/auth/register          │
   │         ↓            ↓              │
   │      Success     Error shown        │
   │         ↓                            │
   │    Redirect to dashboard            │
   └─────────────────────────────────────┘
   │ Existing User? → Enter credentials │
   │                  ↓                  │
   │          POST /api/auth/login       │
   │         ↓            ↓              │
   │      Success     Error shown        │
   │         ↓                            │
   │  Get JWT token from backend         │
   │         ↓                            │
   │  Store token in localStorage        │
   │         ↓                            │
   │  Redirect to /assistant/dashboard   │
   └─────────────────────────────────────┘
           ↓
5. Dashboard loads with user data
           ↓
6. All subsequent requests include
   Authorization: Bearer <token>
           ↓
7. Backend verifies token in auth middleware
           ↓
8. Process request and return data
```

## 📡 API Endpoints & Flow

### Registration Flow
```
POST /api/auth/register
├── Input: fullName, email, password, confirmPassword, role, staffId, nic, phone, placeOfWork
├── Processing:
│   ├── Validate input
│   ├── Check if email exists
│   ├── Hash password with bcrypt
│   ├── Create new User document
│   └── Generate JWT token
└── Response: { success: true, token, user }
```

### Login Flow
```
POST /api/auth/login
├── Input: staffId/email, password, role
├── Processing:
│   ├── Find user by staffId or email
│   ├── Compare password with bcrypt
│   ├── If match, generate JWT token
│   └── Return token and user info
└── Response: { success: true, token, user }
```

### Protected Routes (Require Token)
```
GET /api/assistant/dashboard
├── Middleware: auth (checks Authorization header)
├── Extract user ID from token
├── Query database for statistics
└── Response: { totalPatients, todayAppointments, ... }

GET /api/assistant/appointments
├── Verify token
├── Query all appointments
└── Response: { data: [...appointments] }

GET /api/assistant/patients
├── Verify token
├── Query all patients with related data
└── Response: { data: [...patients] }
```

## 🔒 Security Implementation

### Password Security
- Passwords hashed with bcrypt (10 salt rounds)
- Never stored in plain text
- Comparison done safely with bcrypt.compare()

### Token Security
- JWT tokens with expiration (7 days)
- Secret key stored in environment variables
- Token validated on every protected route
- Signed with HS256 algorithm

### CORS Protection
- Only requests from `http://localhost:5173` allowed
- Other origins blocked
- Credentials enabled

### Error Handling
- Global error handler middleware
- Validation errors returned clearly
- No sensitive data in error messages
- Proper HTTP status codes

## 📊 Data Flow Example

### Complete Authentication & Dashboard Load

```
1. Frontend (Home.jsx)
   └─ User clicks "Assistant"
      └─ navigate('/assistant/login')

2. Frontend (AssistantLogin.jsx)
   └─ User enters staffId & password
      └─ handleSubmit()
         └─ authAPI.login(data)
            └─ POST /api/auth/login

3. Backend (authController.js)
   └─ login controller receives request
      └─ Find user by staffId
      └─ Compare password
      └─ Generate token
      └─ Response: { token, user }

4. Frontend (AssistantLogin.jsx)
   └─ Receive response
      └─ localStorage.setItem('token', token)
      └─ localStorage.setItem('user', user)
      └─ navigate('/assistant/dashboard')

5. Frontend (AssistantDashboard.jsx)
   └─ useEffect runs on mount
      └─ Check token exists
      └─ fetchDashboard()
         └─ assistantAPI.getDashboard()
            └─ GET /api/assistant/dashboard
            └─ Header: Authorization: Bearer <token>

6. Backend Middleware (auth.js)
   └─ Check Authorization header
      └─ Extract token
      └─ Verify token
      └─ Attach user to req.user
      └─ Next middleware/controller

7. Backend (assistantController.js)
   └─ getDashboard controller
      └─ Query: Count patients
      └─ Query: Appointments for today
      └─ Query: Count pending appointments
      └─ Response: { data: {...statistics} }

8. Frontend (AssistantDashboard.jsx)
   └─ Receive response
      └─ setDashboardData(response.data.data)
      └─ Render dashboard with statistics
      └─ Display appointments table
```

## 🚀 Deployment Architecture (Production)

```
┌─────────────────────────────────────┐
│      Vercel/Netlify/AWS             │
│  (Frontend - React Build)           │
│  - Optimized bundle                 │
│  - CDN delivery                     │
└─────────────────────────────────────┘
           ↕ (HTTPS)
┌─────────────────────────────────────┐
│   Heroku/Railway/AWS EC2            │
│  (Backend - Node.js)                │
│  - Production environment           │
│  - Load balancer                    │
│  - Auto-scaling                     │
└─────────────────────────────────────┘
           ↕
┌─────────────────────────────────────┐
│   MongoDB Atlas Cloud               │
│  - Managed database                 │
│  - Backups & replication            │
│  - Security & encryption            │
└─────────────────────────────────────┘
```
