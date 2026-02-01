# COPD Detection System - Complete Setup Guide

This is a production-ready full-stack application with React frontend and Node.js backend.

## 📁 Folder Structure

```
COPD1/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js    # Authentication logic
│   │   │   └── assistantController.js
│   │   ├── middleware/
│   │   │   ├── auth.js              # JWT verification
│   │   │   └── errorHandler.js      # Global error handling
│   │   ├── models/
│   │   │   ├── User.js              # User schema
│   │   │   ├── Patient.js           # Patient schema
│   │   │   └── Appointment.js       # Appointment schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js        # Auth endpoints
│   │   │   └── assistantRoutes.js   # Assistant endpoints
│   │   └── index.js                 # Main server file
│   ├── .env                         # Environment variables
│   ├── .env.example                 # Example env file
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx           # Top navigation
    │   │   └── Sidebar.jsx          # Left sidebar
    │   ├── pages/
    │   │   ├── Home.jsx             # Landing page
    │   │   ├── AssistantLogin.jsx   # Login page
    │   │   ├── AssistantRegister.jsx # Register page
    │   │   ├── AssistantDashboard.jsx # Dashboard
    │   │   ├── Appointments.jsx     # Appointments list
    │   │   └── Patients.jsx         # Patients list
    │   ├── services/
    │   │   └── apiService.js        # Axios API calls
    │   ├── styles/
    │   │   ├── global.css           # Global styles
    │   │   ├── layout.css           # Layout styles
    │   │   ├── forms.css            # Form styles
    │   │   └── home.css             # Home page styles
    │   ├── App.jsx                  # Main component
    │   └── main.jsx                 # Entry point
    ├── .env                         # Environment variables
    ├── .env.example                 # Example env file
    ├── vite.config.js               # Vite configuration
    ├── index.html                   # HTML template
    └── package.json
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or Atlas cloud)
- npm or yarn

### Backend Setup

1. **Install backend dependencies:**
```bash
cd backend
npm install
```

2. **Configure environment variables:**
   - Open `.env` and update MongoDB URI if needed
   - Default: `mongodb://localhost:27017/copd_detection`

3. **Start the backend server:**
```bash
npm run dev
```
   Backend runs on: `http://localhost:5000`

### Frontend Setup

1. **Install frontend dependencies:**
```bash
cd frontend
npm install
```

2. **Start the frontend development server:**
```bash
npm run dev
```
   Frontend runs on: `http://localhost:5173`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Assistant Features
- `GET /api/assistant/dashboard` - Dashboard statistics
- `GET /api/assistant/appointments` - Get all appointments
- `POST /api/assistant/appointments` - Create appointment
- `PUT /api/assistant/appointments/:id` - Update appointment
- `GET /api/assistant/patients` - Get all patients

## 🔐 Database Models

### User Model
```javascript
{
  staffId: String (unique for assistant),
  role: 'doctor' | 'assistant' | 'patient',
  fullName: String,
  email: String (unique),
  phone: String,
  password: String (hashed),
  nic: String (unique),
  placeOfWork: String,
  isActive: Boolean
}
```

### Patient Model
```javascript
{
  userId: ObjectId (ref: User),
  age: Number,
  gender: 'male' | 'female' | 'other',
  medicalHistory: String,
  status: 'active' | 'inactive' | 'discharged',
  assignedDoctor: ObjectId (ref: User)
}
```

### Appointment Model
```javascript
{
  patientId: ObjectId (ref: User),
  doctorId: ObjectId (ref: User),
  appointmentDate: Date,
  status: 'scheduled' | 'completed' | 'cancelled' | 'pending',
  notes: String
}
```

## 🔑 Test Credentials

### Assistant Login
- Staff ID: S001
- Email: test@assistant.com
- Password: password123

Register new assistant: Use the registration form

## 🛠️ API Integration Examples

### Login Request
```javascript
POST /api/auth/login
{
  "staffId": "S001",
  "password": "password123",
  "role": "assistant"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...mongodb_id...",
    "fullName": "Assistant Name",
    "email": "email@example.com",
    "role": "assistant"
  }
}
```

### Get Dashboard Data
```javascript
GET /api/assistant/dashboard
Headers: {
  Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Response:
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

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: MongoDB Connection Error: connect ECONNREFUSED
```
**Solution:**
- Make sure MongoDB is running: `mongod`
- Or use MongoDB Atlas: Update `MONGODB_URI` in `.env`
- Default: `mongodb://localhost:27017/copd_detection`

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Backend has CORS enabled by default
- Make sure frontend URL matches `CORS_ORIGIN` in `.env`
- Frontend should be `http://localhost:5173`
- Backend should be `http://localhost:5000`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process
taskkill /PID <PID> /F
```

### Token Expired
```
Invalid token
```
**Solution:**
- Log in again
- Token is stored in localStorage
- Logout clears token: `localStorage.removeItem('token')`

### Cannot Find Module
```
Error: Cannot find module 'axios'
```
**Solution:**
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Make sure you're in correct directory (backend or frontend)

## 📝 Common Commands

### Backend
```bash
# Development
npm run dev

# Production
npm start

# Install dependencies
npm install
```

### Frontend
```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install dependencies
npm install
```

## 🔄 Workflow

1. **User opens home page** → `http://localhost:5173`
2. **Selects Assistant** → Redirects to `/assistant/login`
3. **New user registers** → `/assistant/register` → API POST to backend
4. **Login successful** → Token saved to localStorage → Redirect to dashboard
5. **Dashboard displays** → Fetches data from `/api/assistant/dashboard`
6. **Can navigate** → Appointments, Patients, Profile

## 📦 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/copd_detection
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=COPD Detection
```

## 🚀 Production Deployment

### Backend (Node.js)
```bash
# Build
npm install --production

# Run
npm start
```

### Frontend (React)
```bash
# Build
npm run build

# Output in dist/ folder - deploy to Netlify, Vercel, or static hosting
```

## 📖 Additional Resources

- Express Documentation: https://expressjs.com/
- React Documentation: https://react.dev/
- MongoDB Documentation: https://docs.mongodb.com/
- Vite Documentation: https://vitejs.dev/
- Axios Documentation: https://axios-http.com/

## 🎯 Next Steps

1. ✅ Install and run backend
2. ✅ Install and run frontend
3. ✅ Register a new assistant
4. ✅ Login and view dashboard
5. ✅ Test all API endpoints
6. ✅ Customize for production
