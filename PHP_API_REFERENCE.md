# PHP API - Complete File Reference

## Directory Structure

```
php-api/
├── config/
│   ├── config.php           - Main configuration (DB credentials, JWT settings)
│   ├── Database.php         - MySQL connection class
│   ├── cors.php             - CORS headers middleware
│   └── schema.sql           - MySQL database schema for import
│
├── models/
│   ├── User.php             - User database operations
│   ├── Patient.php          - Patient database operations
│   └── Appointment.php      - Appointment database operations
│
├── controllers/
│   ├── AuthController.php   - Authentication (register, login, getCurrentUser)
│   └── AssistantController.php - Assistant operations (dashboard, appointments, patients)
│
├── middleware/
│   └── Auth.php             - JWT token verification and generation
│
├── routes/
│   └── Router.php           - Route handler and API endpoint mapping
│
├── index.php                - Main API entry point
├── .env                     - Environment configuration (backup)
├── .htaccess                - Apache URL rewriting configuration
├── SETUP.md                 - Detailed setup instructions
└── README.md               - API documentation
```

## File Descriptions

### Config Files

#### `config/config.php`
- Database connection settings (host, user, password, database)
- JWT configuration and expiration time
- Application settings (name, environment)
- CORS allowed origins list
- Contains constants used throughout the application

#### `config/Database.php`
- MySQLi connection class
- Handles database connection/disconnection
- Implements connection pool pattern
- Returns mysqli connection object

#### `config/cors.php`
- Handles CORS headers for cross-origin requests
- Allows frontend (localhost:5173) to access API
- Sets security headers (Content-Type, Authorization)
- Handles preflight OPTIONS requests

#### `config/schema.sql`
- MySQL DDL (Data Definition Language)
- Creates `copd_detection` database
- Creates 3 tables: `users`, `patients`, `appointments`
- Includes indexes and foreign keys
- Contains sample data for testing

### Model Files

#### `models/User.php`
Methods:
- `register()` - Create new user with password hashing
- `login()` - Authenticate user and return user data
- `getUserById($id)` - Fetch user by ID
- `emailExists()` - Check if email is registered
- `staffIdExists($staff_id)` - Check if staff ID is in use

Database table: `users`
- id, staff_id, role, full_name, email, phone, password, nic, place_of_work, is_active, timestamps

#### `models/Patient.php`
Methods:
- `getAll()` - Fetch all patients with doctor info
- `getById($id)` - Get specific patient
- `countTotal()` - Count total patients
- `create()` - Create new patient record

Database table: `patients`
- id, user_id, age, gender, medical_history, status, assigned_doctor, timestamps

#### `models/Appointment.php`
Methods:
- `getAll()` - Fetch all appointments
- `getTodayAppointments()` - Get today's appointments
- `countPending()` - Count pending appointments
- `create()` - Create new appointment
- `update($id, $status, $notes)` - Update appointment

Database table: `appointments`
- id, patient_id, doctor_id, appointment_date, status, notes, timestamps

### Controller Files

#### `controllers/AuthController.php`
Handles authentication:
- `register($data)` - User registration
  - Input: staff_id, email, password, role, full_name, phone, nic, place_of_work
  - Output: user id, staff_id, email, role
  - Returns: 201 Created or 400 Bad Request

- `login($data)` - User login
  - Input: staff_id, password
  - Output: user object + JWT token
  - Returns: 200 OK, 401 Unauthorized, or 400 Bad Request

- `getCurrentUser()` - Get authenticated user
  - Requires: Valid JWT token in Authorization header
  - Output: User object
  - Returns: 200 OK or 401 Unauthorized

#### `controllers/AssistantController.php`
Handles dashboard and data operations:
- `getDashboard()` - Get statistics
  - Output: total_patients, pending_appointments, total_appointments, completion_rate
  - Requires: Authentication

- `getAppointments()` - List all appointments
  - Output: Array of appointment objects with patient and doctor names

- `createAppointment($data)` - Create appointment
  - Input: patient_id, doctor_id, appointment_date, notes
  - Output: appointment id

- `updateAppointment($id, $data)` - Update appointment status
  - Input: id, status, notes
  - Updates: appointment status and notes

- `getPatients()` - List all patients
  - Output: Array of patient objects

- `getPatient($id)` - Get specific patient
  - Input: patient id
  - Output: Patient object with associated user data

### Middleware Files

#### `middleware/Auth.php`
JWT authentication handler:
- `verifyToken()` - Verify incoming JWT token
  - Checks Authorization header
  - Validates token signature
  - Checks token expiration
  - Returns: Decoded payload or error

- `decodeToken($token)` - Decode and verify JWT
  - Validates token structure (3 parts)
  - Verifies HMAC SHA256 signature
  - Checks expiration timestamp
  - Returns: Payload array

- `generateToken($user_id, $role)` - Create new JWT token
  - Creates header, payload, signature
  - Sets expiration time (7 days)
  - Returns: Complete JWT token string

- `error($code, $message)` - Format error response
  - Sets HTTP status code
  - Returns: Error JSON

### Routes File

#### `routes/Router.php`
Handles API routing:
- Maps URL paths to controller methods
- Parses query parameters
- Handles HTTP methods (GET, POST, PUT, DELETE)
- Dispatches to appropriate controller
- Routes include:

Authentication Routes:
- POST /auth/register
- POST /auth/login
- GET /auth/me

Assistant Routes:
- GET /assistant/dashboard
- GET /assistant/appointments
- POST /assistant/appointments
- PUT /assistant/appointments/:id
- GET /assistant/patients
- GET /assistant/patients/:id

### Main Entry Point

#### `index.php`
Application entry point:
1. Loads configuration files
2. Loads database connection
3. Loads middleware (Auth, CORS)
4. Loads models (User, Patient, Appointment)
5. Loads controllers (AuthController, AssistantController)
6. Loads router
7. Initializes database connection
8. Routes incoming requests
9. Returns JSON response
10. Handles exceptions

### Configuration Files

#### `.htaccess`
Apache configuration:
- Enables mod_rewrite for clean URLs
- Rewrites all requests to index.php
- Adds security headers
- Denies access to config files

#### `.env`
Environment variables (for reference):
- Database credentials
- Server configuration
- JWT secret
- App settings
- Frontend URL

## API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

HTTP Status Codes:
- 200 OK - Successful GET/PUT
- 201 Created - Successful POST
- 400 Bad Request - Invalid input
- 401 Unauthorized - Invalid/missing token
- 404 Not Found - Resource not found
- 500 Internal Server Error - Server error

## Database Relationships

```
users (1) ──→ (many) patients (1) ──→ (many) appointments
            ↓
        patients.assigned_doctor
            ↓
        users (doctor role)
```

Foreign Keys:
- `patients.user_id` → `users.id`
- `patients.assigned_doctor` → `users.id`
- `appointments.patient_id` → `users.id`
- `appointments.doctor_id` → `users.id`

## Security Features

1. **Password Hashing**: bcrypt (PASSWORD_BCRYPT)
2. **JWT Tokens**: HMAC SHA256 with 7-day expiration
3. **CORS**: Restricted to frontend domain
4. **SQL Injection Prevention**: Prepared statements
5. **Input Validation**: Required field checks
6. **Error Handling**: Exception catching
7. **Security Headers**: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection

## Testing with cURL

### Prerequisites
- PHP Server running: `http://localhost:8000`
- MySQL database created and populated

### Test Commands

```bash
# 1. Register new user
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"staff_id":"TEST001","email":"test@test.com","password":"pass123","role":"assistant","full_name":"Test User"}'

# 2. Login (get token)
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"staff_id":"ASS001","password":"password"}'

# 3. Get current user (use token from login)
curl -H "Authorization: Bearer TOKEN_HERE" \
  http://localhost:8000/auth/me

# 4. Get dashboard stats
curl -H "Authorization: Bearer TOKEN_HERE" \
  http://localhost:8000/assistant/dashboard

# 5. Get all appointments
curl -H "Authorization: Bearer TOKEN_HERE" \
  http://localhost:8000/assistant/appointments

# 6. Create appointment
curl -X POST http://localhost:8000/assistant/appointments \
  -H "Authorization: Bearer TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"patient_id":3,"doctor_id":1,"appointment_date":"2024-01-15 10:00:00","notes":"Check-up"}'

# 7. Get all patients
curl -H "Authorization: Bearer TOKEN_HERE" \
  http://localhost:8000/assistant/patients
```

## Performance Considerations

1. **Database Indexes**: Created on email, staff_id, role, foreign keys
2. **Prepared Statements**: Prevent SQL injection and improve performance
3. **Connection Pooling**: MySQLi connection reuse
4. **Token Expiration**: 7 days to balance security and UX
5. **CORS Caching**: Preflight requests cached by browser

## Future Enhancements

1. Add pagination to list endpoints
2. Implement rate limiting
3. Add request logging and monitoring
4. Create API documentation (Swagger/OpenAPI)
5. Add email verification
6. Implement password reset
7. Add role-based access control (RBAC)
8. Create audit logs
9. Add file upload for patient records
10. Implement real-time notifications

---

**File Count**: 18 files
**Total Lines**: ~1,500 lines of PHP code
**Database Tables**: 3
**API Endpoints**: 9
**Authentication**: JWT Token-based
**Database**: MySQL 5.7+
