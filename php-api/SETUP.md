# COPD Detection System - PHP API Setup Instructions

## Prerequisites
- PHP 7.4 or higher
- MySQL/MariaDB 5.7 or higher
- MySQL Workbench (optional, for database management)
- A web server (Apache/Nginx)

## Setup Steps

### 1. Database Setup

#### Option A: Using MySQL Workbench
1. Open MySQL Workbench
2. Connect to your MySQL server
3. Go to File → Open SQL Script
4. Select `config/schema.sql` from this directory
5. Execute the script (Ctrl+Enter or click the lightning bolt icon)

#### Option B: Using MySQL Command Line
```bash
mysql -u root -p < config/schema.sql
```

#### Option C: Manual Setup
1. Open MySQL Workbench or command line
2. Create the database:
```sql
CREATE DATABASE copd_detection;
```
3. Copy and paste the contents of `config/schema.sql` and execute

### 2. PHP Configuration
1. Edit `config/config.php` and update:
   - `DB_HOST`: Your MySQL server host (default: localhost)
   - `DB_USER`: Your MySQL username (default: root)
   - `DB_PASSWORD`: Your MySQL password (if any)
   - `JWT_SECRET`: Change to a strong secret key for production

### 3. Copy Environment File
```bash
cp .env.example .env
```

### 4. Verify PHP Extensions
Ensure the following PHP extensions are enabled:
- mysqli or pdo_mysql
- json (usually enabled by default)

Check PHP extensions:
```bash
php -m | grep -i mysql
php -m | grep -i json
```

### 5. Set Directory Permissions (Linux/Mac only)
```bash
chmod 755 config
chmod 644 config/*.php
chmod 644 *.php
```

### 6. Start PHP Built-in Server
```bash
cd php-api
php -S localhost:8000
```

Server will be available at: http://localhost:8000

### 7. Update Frontend Configuration
Edit `frontend/.env` and set:
```
VITE_API_BASE_URL=http://localhost:8000
```

## Testing the API

### Test 1: Health Check
```bash
curl http://localhost:8000/
```

### Test 2: Register a new user
```bash
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "staff_id": "TEST001",
    "email": "test@example.com",
    "password": "password123",
    "role": "assistant",
    "full_name": "Test User"
  }'
```

### Test 3: Login
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "staff_id": "TEST001",
    "password": "password123"
  }'
```

### Test 4: Get current user
```bash
curl -X GET http://localhost:8000/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Troubleshooting

### MySQL Connection Error
- Ensure MySQL is running
- Verify credentials in `config/config.php`
- Check if database `copd_detection` exists

### CORS Issues
- Update `ALLOWED_ORIGINS` in `config/config.php` with your frontend URL
- Ensure frontend is running on the correct port

### 404 Not Found
- Check if `.htaccess` file exists and Apache `mod_rewrite` is enabled
- For development, use the PHP built-in server instead

### Permission Denied
- Ensure the web server user has read access to PHP files
- On Windows, this is usually not an issue

## Database Schema

### Users Table
- Stores user information (doctors, assistants, patients)
- Fields: id, staff_id, role, full_name, email, phone, password, nic, place_of_work, is_active

### Patients Table
- Stores patient records
- Fields: id, user_id, age, gender, medical_history, status, assigned_doctor

### Appointments Table
- Stores appointment data
- Fields: id, patient_id, doctor_id, appointment_date, status, notes

## API Endpoints

### Authentication
- POST /auth/register - Register new user
- POST /auth/login - Login user
- GET /auth/me - Get current user

### Assistant Dashboard
- GET /assistant/dashboard - Get dashboard stats
- GET /assistant/appointments - Get all appointments
- POST /assistant/appointments - Create appointment
- PUT /assistant/appointments/:id - Update appointment
- GET /assistant/patients - Get all patients
- GET /assistant/patients/:id - Get patient details

## Production Deployment

For production deployment:
1. Change `JWT_SECRET` to a strong random string
2. Set `APP_ENV` to 'production'
3. Set `APP_DEBUG` to 'false'
4. Use a reverse proxy (Nginx) in front of Apache
5. Enable HTTPS
6. Use environment variables instead of .env file
7. Set up proper error logging
8. Restrict database user permissions

## Support

For issues or questions, refer to the main README.md file in the project root.
