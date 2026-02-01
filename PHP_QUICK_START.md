# COPD System - PHP Backend with MySQL Quick Start

## What's Changed?
✅ **Node.js/Express** → **PHP REST API**
✅ **MongoDB** → **MySQL Database**
✅ **React Frontend** → **Unchanged** (ready to connect)

## Quick Setup (5 minutes)

### Step 1: Create MySQL Database

**Using MySQL Command Line:**
```bash
mysql -u root -p < php-api/config/schema.sql
```

**Or MySQL Workbench:**
1. Open MySQL Workbench
2. File → Open SQL Script → `php-api/config/schema.sql`
3. Click the lightning bolt icon to execute

### Step 2: Configure Database Connection

Edit `php-api/config/config.php`:
```php
define('DB_HOST', 'localhost');        // Your MySQL host
define('DB_USER', 'root');             // Your MySQL user
define('DB_PASSWORD', '');             // Your MySQL password (if any)
define('DB_NAME', 'copd_detection');   // Database name (leave as is)
```

### Step 3: Start PHP API Server

```bash
cd php-api
php -S localhost:8000
```

Server running at: **http://localhost:8000**

### Step 4: Test the API

```bash
# Health check
curl http://localhost:8000/

# Register a user
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"staff_id":"TEST001","email":"test@example.com","password":"pass","role":"assistant","full_name":"Test"}'
```

### Step 5: Run Frontend (in new terminal)

```bash
cd frontend
npm install
npm run dev
```

Frontend will open at: **http://localhost:5173**

## Database Credentials (Sample)

After running schema.sql, you'll have:

| Role | Staff ID | Email | Password |
|------|----------|-------|----------|
| Doctor | DOC001 | doctor@example.com | password |
| Assistant | ASS001 | assistant@example.com | password |
| Patient | PAT001 | patient@example.com | password |

Use Staff ID + Password to login

## Project Structure

```
COPD1/
├── php-api/                    ← NEW: PHP Backend
│   ├── config/
│   │   ├── config.php         ← Database config
│   │   ├── Database.php       ← MySQL connection
│   │   ├── cors.php           ← CORS headers
│   │   └── schema.sql         ← Database schema
│   ├── controllers/
│   │   ├── AuthController.php ← Login/Register
│   │   └── AssistantController.php ← Dashboard
│   ├── models/
│   │   ├── User.php           ← User operations
│   │   ├── Patient.php        ← Patient operations
│   │   └── Appointment.php    ← Appointment operations
│   ├── middleware/
│   │   └── Auth.php           ← JWT verification
│   ├── routes/
│   │   └── Router.php         ← Route handler
│   ├── index.php              ← API entry point
│   ├── .env                   ← Configuration
│   └── .htaccess              ← URL rewriting
│
├── frontend/                  ← React Frontend (unchanged)
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── services/apiService.js ← Uses API_BASE_URL
│   └── .env                   ← UPDATED: http://localhost:8000
│
└── backend/                   ← OLD: Node.js (not needed)
```

## API Endpoints

### Authentication
```
POST   /auth/register              ← Create new user
POST   /auth/login                 ← Login user
GET    /auth/me                    ← Get current user
```

### Assistant Operations
```
GET    /assistant/dashboard        ← Dashboard stats
GET    /assistant/appointments     ← List appointments
POST   /assistant/appointments     ← Create appointment
PUT    /assistant/appointments/:id ← Update appointment
GET    /assistant/patients         ← List patients
GET    /assistant/patients/:id     ← Get patient details
```

## Troubleshooting

### MySQL not found
```bash
# On Windows, add MySQL to PATH or use full path
C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql -u root -p < schema.sql
```

### PHP command not found
```bash
# On Windows, add PHP to PATH or use full path
C:\xampp\php\php -S localhost:8000
# OR use XAMPP/WAMP Apache server
```

### CORS Errors
✅ Already configured in `php-api/config/cors.php`
✅ Frontend .env points to correct PHP server

### 404 on API calls
- Ensure PHP server is running at `http://localhost:8000`
- Check frontend .env has correct API URL
- Verify .htaccess is in place for URL rewriting

## Database Management

**View Database:**
```bash
mysql -u root -p
USE copd_detection;
SHOW TABLES;
SELECT * FROM users;
```

**Reset Database:**
```bash
mysql -u root -p < php-api/config/schema.sql
```

## Production Deployment

Before deploying to production:

1. **Security**
   - Change JWT_SECRET in `config/config.php`
   - Set APP_ENV to 'production'
   - Use HTTPS only
   - Restrict database user permissions

2. **Performance**
   - Use Apache/Nginx instead of PHP built-in server
   - Enable PHP opcache
   - Set up database connection pooling

3. **Database**
   - Create database backups
   - Enable query logging
   - Create indexes on frequently queried columns

## Support

For detailed setup, see [php-api/SETUP.md](php-api/SETUP.md)

For full project documentation, see [README.md](README.md)
