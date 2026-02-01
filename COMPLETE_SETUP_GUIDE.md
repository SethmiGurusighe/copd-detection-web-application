# 🔧 COPD System - Complete Installation & Setup Guide

## ⚠️ IMPORTANT: You Need to Install Software First

Your Windows computer is currently missing the required software. I've created **automatic setup scripts**, but you need to install the prerequisites first.

---

## 📥 STEP 1: Install Required Software (One-Time Only)

### Three things to install:

#### 1️⃣ **Node.js** (for React Frontend + npm)
- **Download**: https://nodejs.org/
- **Choose**: LTS version (Long Term Support)
- **Install**: Run installer, accept all defaults
- **After installing**: Restart your computer
- **Verify**: Open PowerShell and run:
  ```
  node --version
  npm --version
  ```
  Should show: `v18.x.x` and `v9.x.x`

#### 2️⃣ **MySQL** (for Database)
**Option A: XAMPP (EASIEST & RECOMMENDED)**
- **Download**: https://www.apachefriends.org/
- **Install**: Apache ✓ + MySQL ✓ + PHP ✓
- **Launch**: Start XAMPP Control Panel
- **Enable**: Click "Start" for Apache and MySQL
- **Verify**: Should see "running" status

**Option B: MySQL Standalone**
- **Download**: https://dev.mysql.com/downloads/mysql/
- **Install**: Run installer
- **Verify**: Open PowerShell and run:
  ```
  mysql --version
  ```

#### 3️⃣ **PHP** (for API Backend)
**If you installed XAMPP**: ✓ Already included!

**If installing separately**:
- **Download**: https://windows.php.net/download/
- **Extract**: To `C:\php`
- **Add to PATH**: See Windows instructions below
- **Verify**: Open PowerShell and run:
  ```
  php --version
  ```

---

## ✅ STEP 2: Verify Installation

After installing all three, open PowerShell and run my verification script:

```
cd C:\Users\DELL\Desktop\COPD1
.\CHECK_INSTALLATION.bat
```

Should show:
```
✓ Node.js found: v18.x.x
✓ npm found: v9.x.x
✓ MySQL found: ...
✓ PHP found: PHP 7.4...
```

If any show ✗, go back and install that software.

---

## 🚀 STEP 3: Run Automatic Setup

Once everything is installed, run:

```
cd C:\Users\DELL\Desktop\COPD1
.\SETUP_COMPLETE.bat
```

This script automatically:
1. ✓ Verifies all software installed
2. ✓ Runs `npm install` (creates node_modules with all React dependencies)
3. ✓ Creates MySQL database
4. ✓ Imports all tables and sample data
5. ✓ Configures everything

---

## ▶️ STEP 4: Start the System

After setup completes, you'll need **TWO terminal windows**:

### Terminal Window 1: Start PHP API Server
```bash
cd C:\Users\DELL\Desktop\COPD1\php-api
php -S localhost:8000
```

You should see:
```
Development Server started at http://localhost:8000
Listening on http://localhost:8000
```

### Terminal Window 2: Start React Frontend
```bash
cd C:\Users\DELL\Desktop\COPD1\frontend
npm run dev
```

You should see:
```
Local:   http://localhost:5173/
```

---

## 🌐 STEP 5: Open in Browser

Open your web browser to: **http://localhost:5173**

You should see the COPD Detection System home page!

---

## 🔐 STEP 6: Login

Click "Assistant" and login with:
- **Staff ID**: `ASS001`
- **Password**: `password`

You should see the dashboard with appointments and patient statistics!

---

## 📊 What Gets Created

### node_modules (created by npm install)
```
frontend/
└── node_modules/         ← ~400 MB (React + dependencies)
    ├── react/
    ├── react-router-dom/
    ├── axios/
    ├── ... (and 500+ other packages)
```

### MySQL Database (created by schema.sql import)
```
copd_detection database
├── users table
│   ├── 3 sample users (doctor, assistant, patient)
│   └── 10+ columns (id, staff_id, email, password, etc.)
├── patients table
│   ├── 1 sample patient
│   └── 8+ columns (id, user_id, age, gender, etc.)
└── appointments table
    ├── 2 sample appointments
    └── 7+ columns (id, patient_id, doctor_id, date, etc.)
```

### Configured Files
```
frontend/.env          ← Already points to PHP API
php-api/config.php     ← Already configured for MySQL
```

---

## 🛠️ What Each Setup Script Does

### `SETUP_COMPLETE.bat` (Windows)
```
[1/5] Check Node.js
[2/5] Check MySQL
[3/5] Check PHP
[4/5] npm install (creates node_modules)
[5/5] mysql import (creates database)
```

### `setup.sh` (Linux/Mac)
Same as above but for Unix systems

### `CHECK_INSTALLATION.bat` (Windows)
Verifies all software before running setup

### `check-installation.sh` (Linux/Mac)
Same as above but for Unix systems

---

## 📋 Complete Checklist

**Before Setup:**
- [ ] Downloaded Node.js from nodejs.org
- [ ] Downloaded MySQL (or XAMPP)
- [ ] Downloaded PHP (or included in XAMPP)
- [ ] Installed all three
- [ ] Restarted computer
- [ ] Ran CHECK_INSTALLATION.bat (all ✓)

**During Setup:**
- [ ] Ran SETUP_COMPLETE.bat
- [ ] Entered MySQL root password when asked
- [ ] Setup completed successfully

**After Setup:**
- [ ] Terminal 1: Started PHP API server
- [ ] Terminal 2: Started React frontend
- [ ] Browser: Opened http://localhost:5173
- [ ] Login: Used ASS001 / password
- [ ] Dashboard: Loaded successfully

**Success!** ✓

---

## 🆘 Troubleshooting

### Problem: "node is not recognized"
**Cause:** Node.js not installed or not in PATH
**Fix:** 
1. Download Node.js: https://nodejs.org/
2. Run installer
3. Restart computer
4. Run CHECK_INSTALLATION.bat again

### Problem: "mysql is not recognized"
**Cause:** MySQL not installed or not in PATH
**Fix:**
1. Option A: Use XAMPP (easier) - https://www.apachefriends.org/
2. Option B: Download MySQL - https://dev.mysql.com/downloads/mysql/
3. Ensure MySQL service is running

### Problem: "php is not recognized"
**Cause:** PHP not installed
**Fix:**
1. Use XAMPP (includes everything) - https://www.apachefriends.org/
2. Or download PHP separately: https://windows.php.net/download/

### Problem: npm install fails
**Cause:** Node.js issues or network problem
**Fix:**
1. Delete `frontend/node_modules` folder
2. Run `npm install` again in frontend folder
3. If still fails, try: `npm install --verbose` to see errors

### Problem: Database import fails
**Cause:** MySQL not running or wrong password
**Fix:**
1. Start MySQL (via XAMPP or Services)
2. Run setup script again
3. Enter correct MySQL root password
4. Or manually import: `mysql -u root -p < php-api/config/schema.sql`

### Problem: API can't connect to database
**Cause:** Database not created or config wrong
**Fix:**
1. Check MySQL is running
2. Verify database exists: `mysql -u root -p -e "SHOW DATABASES;"`
3. Check credentials in `php-api/config/config.php`

### Problem: React won't start
**Cause:** npm not installed or Node.js issue
**Fix:**
1. Check: `npm --version`
2. Delete `node_modules` and `package-lock.json`
3. Run: `npm install`

### Problem: Port 8000 already in use
**Cause:** Another application using port
**Fix:**
1. Use different port: `php -S localhost:9000`
2. Update frontend .env: `VITE_API_BASE_URL=http://localhost:9000`

---

## 📞 Quick Reference

| Tool | Check | Install |
|------|-------|---------|
| Node.js | `node --version` | https://nodejs.org/ |
| npm | `npm --version` | (comes with Node.js) |
| MySQL | `mysql --version` | https://dev.mysql.com/downloads/ |
| PHP | `php --version` | https://windows.php.net/ or XAMPP |

---

## 🎯 Summary

1. **Install** Node.js, MySQL, PHP (XAMPP easiest)
2. **Run** `CHECK_INSTALLATION.bat` to verify
3. **Run** `SETUP_COMPLETE.bat` to automate everything
4. **Start** PHP server in Terminal 1
5. **Start** React in Terminal 2
6. **Open** browser to http://localhost:5173
7. **Login** with ASS001 / password
8. **Done!** ✓

---

## 📚 More Help

- **Quick Start**: [PHP_QUICK_START.md](PHP_QUICK_START.md)
- **Detailed Setup**: [PHP_INSTALLATION.md](PHP_INSTALLATION.md)
- **API Reference**: [PHP_API_REFERENCE.md](PHP_API_REFERENCE.md)
- **Prerequisites**: [INSTALLATION_PREREQUISITES.md](INSTALLATION_PREREQUISITES.md)

---

**Current Status**: 
- ❌ Software not installed
- ⏳ Ready for installation
- 🔧 Setup scripts created and waiting

**Next Step**: Install the three required tools, then run the setup scripts! 🚀
