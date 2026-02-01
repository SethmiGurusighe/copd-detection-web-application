# PHP API Installation & Deployment Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation Steps](#installation-steps)
3. [Database Setup](#database-setup)
4. [Configuration](#configuration)
5. [Testing](#testing)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have installed:

- **PHP 7.4 or higher**
  - Check: `php --version`
  - Required extensions: `mysqli`, `json`
  
- **MySQL/MariaDB 5.7+**
  - Check: `mysql --version`
  - MySQL Workbench (optional)
  
- **Node.js & npm** (for React frontend)
  - Check: `node --version && npm --version`

- **Git** (optional)
  - Check: `git --version`

### Verify PHP Extensions

```bash
# Check installed extensions
php -m

# Look for: mysqli, json, curl, openssl
```

If `mysqli` is missing, install it:
- **Windows**: Download PHP with MySQLi or install PECL extension
- **Linux/Mac**: `php-mysql` package via package manager

## Installation Steps

### 1. Download Project Files

```bash
# Navigate to your projects directory
cd C:\Users\DELL\Desktop

# Files already exist in: COPD1/
cd COPD1
```

### 2. Verify Directory Structure

```bash
# Check PHP API files exist
dir php-api
# Should show: config, controllers, middleware, models, routes, index.php, .env, .htaccess
```

### 3. Configure Database Connection

Edit **`php-api/config/config.php`**:

```php
define('DB_HOST', 'localhost');        // MySQL host
define('DB_USER', 'root');             // MySQL username
define('DB_PASSWORD', '');             // MySQL password
define('DB_NAME', 'copd_detection');   // Database name
define('JWT_SECRET', 'change_this_in_production');  // Security key
```

**Windows/XAMPP Users:** If using XAMPP, your MySQL host is usually `localhost` and user is `root` with no password.

## Database Setup

### Option A: MySQL Command Line (Recommended)

```bash
# Navigate to php-api directory
cd php-api

# Import schema
mysql -u root -p < config/schema.sql

# You'll be prompted for MySQL password (leave blank if none)
```

### Option B: MySQL Workbench GUI

1. Open **MySQL Workbench**
2. Connect to your MySQL server
3. Go to **File → Open SQL Script**
4. Select **`php-api/config/schema.sql`**
5. Click the **lightning bolt icon** to execute
6. Verify tables created: Right-click connection → **Refresh** → **Schemas → copd_detection**

### Option C: Command Line (Step by Step)

```bash
# Connect to MySQL
mysql -u root -p

# Paste these commands:
CREATE DATABASE copd_detection;
USE copd_detection;

# Then copy-paste entire contents of config/schema.sql
# Or use: source path/to/schema.sql;
```

### Verify Database Setup

```bash
mysql -u root -p
USE copd_detection;
SHOW TABLES;
SELECT COUNT(*) FROM users;  # Should show 3 sample users
```

## Configuration

### Environment Variables

Copy configuration from **`php-api/config/config.php`** (already set):

```php
// Database
DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = ''
DB_NAME = 'copd_detection'

// JWT
JWT_SECRET = 'change_in_production'
JWT_EXPIRE = 604800  // 7 days

// App
APP_ENV = 'development'
APP_NAME = 'COPD Detection System'
```

### Frontend Configuration

**`frontend/.env`** already configured:

```
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=COPD Detection
```

(Updated from old Node.js URL: `http://localhost:5000/api`)

## Testing

### Step 1: Start PHP Server

**Open PowerShell/Command Prompt:**

```bash
# Navigate to php-api directory
cd C:\Users\DELL\Desktop\COPD1\php-api

# Start PHP server
php -S localhost:8000
```

You should see:
```
Development Server started at http://localhost:8000
Listening on http://localhost:8000
```

### Step 2: Test API Endpoints

**Open a new PowerShell/Command Prompt window:**

#### Test 1: Health Check
```bash
curl http://localhost:8000/
```

#### Test 2: Register User
```bash
curl -X POST http://localhost:8000/auth/register `
  -H "Content-Type: application/json" `
  -d '{
    "staff_id":"NEWUSER001",
    "email":"newuser@test.com",
    "password":"testpass123",
    "role":"assistant",
    "full_name":"New User"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 4,
    "staff_id": "NEWUSER001",
    "email": "newuser@test.com",
    "role": "assistant"
  }
}
```

#### Test 3: Login
```bash
curl -X POST http://localhost:8000/auth/login `
  -H "Content-Type: application/json" `
  -d '{"staff_id":"ASS001","password":"password"}'
```

Expected response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {...},
    "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  }
}
```

**Save the token for next test!**

#### Test 4: Get Current User
```bash
# Replace YOUR_TOKEN with token from login response
curl -H "Authorization: Bearer YOUR_TOKEN" `
  http://localhost:8000/auth/me
```

#### Test 5: Get Dashboard Stats
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" `
  http://localhost:8000/assistant/dashboard
```

#### Test 6: Get Appointments
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" `
  http://localhost:8000/assistant/appointments
```

### Step 3: Test Frontend

**Open new PowerShell/Command Prompt:**

```bash
# Navigate to frontend
cd C:\Users\DELL\Desktop\COPD1\frontend

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

You should see:
```
  VITE v... ready in ... ms

  ➜  Local:   http://localhost:5173/
```

**Open browser to: http://localhost:5173**

1. Click "Assistant" on home page
2. Login with: **Staff ID: `ASS001`** | **Password: `password`**
3. You should see the dashboard

## Deployment

### Development Server (Testing)

Already configured - PHP built-in server is fine for development.

### Production Server (Real Deployment)

#### Option 1: XAMPP/WAMP (Windows)

1. Copy `php-api` folder to `C:\xampp\htdocs\copd-api`
2. Start Apache in XAMPP Control Panel
3. API available at: `http://localhost/copd-api`
4. Update frontend .env: `VITE_API_BASE_URL=http://localhost/copd-api`

#### Option 2: Linux/Apache Server

```bash
# Copy to web root
sudo cp -r php-api /var/www/html/copd-api
sudo chown -R www-data:www-data /var/www/html/copd-api

# Enable mod_rewrite (if not enabled)
sudo a2enmod rewrite
sudo systemctl restart apache2
```

#### Option 3: Docker Deployment

```dockerfile
# Dockerfile
FROM php:7.4-apache
RUN docker-php-ext-install mysqli json
COPY php-api /var/www/html
RUN a2enmod rewrite
EXPOSE 80
```

```bash
# Build and run
docker build -t copd-api .
docker run -p 80:80 copd-api
```

### Security Checklist

Before production deployment:

- [ ] Change `JWT_SECRET` to strong random string
- [ ] Set `APP_ENV` to 'production'
- [ ] Set `APP_DEBUG` to 'false'
- [ ] Enable HTTPS (SSL certificate)
- [ ] Restrict MySQL user permissions
- [ ] Remove sample users from database
- [ ] Set strong MySQL password
- [ ] Configure proper error logging
- [ ] Set up database backups
- [ ] Add rate limiting
- [ ] Enable CORS properly for your domain

## Troubleshooting

### MySQL Connection Error

**Error:** "Database Connection Failed"

**Solution:**
```bash
# Check MySQL is running
# Windows: Services → MySQL80
# Or restart: net start MySQL80

# Verify credentials in config/config.php
# Test connection:
mysql -u root -p
```

### PHP Command Not Found

**Error:** `'php' is not recognized`

**Solution:**
```bash
# Add PHP to PATH or use full path
# Windows XAMPP:
C:\xampp\php\php -S localhost:8000

# Or use XAMPP Apache (easier)
```

### Port 8000 Already in Use

**Error:** "Address already in use"

**Solution:**
```bash
# Use different port
php -S localhost:9000

# Update frontend .env:
VITE_API_BASE_URL=http://localhost:9000

# Or find and stop process using port 8000
# Windows:
netstat -ano | findstr :8000
taskkill /PID [PID] /F
```

### 404 Not Found Errors

**Error:** API endpoints return 404

**Solutions:**
1. Ensure PHP server running: `http://localhost:8000` responds
2. Check `.htaccess` exists in `php-api/`
3. Verify route paths in `Router.php`
4. Try accessing: `http://localhost:8000/` (should work)

### CORS Errors in Browser

**Error:** "No 'Access-Control-Allow-Origin' header"

**Solution:** Already configured in `php-api/config/cors.php` for `localhost:5173`

**For different frontend port, edit:**
```php
define('ALLOWED_ORIGINS', array(
    'http://localhost:5173',
    'http://localhost:3000',  // Add your port here
));
```

### JWT Token Errors

**Error:** "Invalid token" or "Token expired"

**Solution:**
1. Token expires after 7 days - login again
2. Ensure `Authorization: Bearer TOKEN` header format
3. Check `JWT_SECRET` is same in config

### Database Not Found

**Error:** "Database 'copd_detection' doesn't exist"

**Solution:**
```bash
# Create database
mysql -u root -p < php-api/config/schema.sql

# Or manually:
mysql -u root -p
CREATE DATABASE copd_detection;
USE copd_detection;
source config/schema.sql;
```

### Slow Performance

**Solutions:**
1. Enable PHP opcache: `php -d opcache.enable=1 -S localhost:8000`
2. Create database indexes (schema includes them)
3. Add pagination to get endpoints
4. Use caching headers

## Quick Commands Reference

```bash
# Start PHP API
cd php-api && php -S localhost:8000

# Start React Frontend
cd frontend && npm run dev

# Create database
mysql -u root -p < php-api/config/schema.sql

# Reset database (delete all data)
mysql -u root -p -e "DROP DATABASE copd_detection;" && \
mysql -u root -p < php-api/config/schema.sql

# Test API
curl http://localhost:8000/

# Monitor MySQL
mysql -u root -p -e "SHOW PROCESSLIST;"
```

## Next Steps

1. ✅ PHP API installed and configured
2. ✅ MySQL database created
3. ✅ Test endpoints working
4. ✅ Frontend configured
5. 📍 **Current:** Development/testing phase
6. → Deploy to production server
7. → Set up automated backups
8. → Configure monitoring/logging

## Support

- See **[README.md](../README.md)** for general help
- See **[DEVELOPER_GUIDE.md](../DEVELOPER_GUIDE.md)** for API documentation
- See **[php-api/SETUP.md](../php-api/SETUP.md)** for detailed setup

---

**Last Updated:** 2024
**PHP Version:** 7.4+
**MySQL Version:** 5.7+
