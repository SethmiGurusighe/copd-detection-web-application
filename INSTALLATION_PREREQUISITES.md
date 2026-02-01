# ================================================================
# COPD Detection System - Installation Prerequisites
# ================================================================

## REQUIRED SOFTWARE

You need to install these three tools BEFORE running the setup script:

### 1. Node.js + npm
   Download: https://nodejs.org/
   - Choose LTS version
   - Run installer
   - Verify: `node --version` and `npm --version`

### 2. MySQL Server
   Download: https://dev.mysql.com/downloads/mysql/
   
   OR use XAMPP (includes PHP + MySQL + Apache):
   Download: https://www.apachefriends.org/
   - Much easier for beginners!
   
   Verify: `mysql --version`

### 3. PHP 7.4+
   Option A (EASIEST): Use XAMPP
   Option B: Download https://windows.php.net/download/
   
   Verify: `php --version`

## ================================================================

## STEP 1: Install Node.js

1. Go to: https://nodejs.org/
2. Download LTS version
3. Run installer (accept all defaults)
4. Restart your computer
5. Open PowerShell and run:
   ```
   node --version
   npm --version
   ```
   Should show version numbers

## ================================================================

## STEP 2: Install MySQL + PHP (Choose One)

### Option A: XAMPP (RECOMMENDED - Easiest)
1. Download: https://www.apachefriends.org/
2. Run installer
3. Choose:
   - Apache ✓
   - MySQL ✓
   - PHP ✓
4. Click Install
5. Start XAMPP Control Panel
6. Click "Start" next to Apache and MySQL

### Option B: Install Separately
1. Download MySQL: https://dev.mysql.com/downloads/mysql/
   - Run installer
   - Accept defaults
   - MySQL will run as Windows Service

2. Download PHP: https://windows.php.net/download/
   - Extract to C:\php
   - Add to system PATH

## ================================================================

## STEP 3: Verify Everything Works

Open PowerShell and run:

```
node --version
npm --version
mysql --version
php --version
```

If all show version numbers ✓, you're ready!

If any show "not found" or error, reinstall that tool.

## ================================================================

## STEP 4: Run Setup Script

Open PowerShell, navigate to project:

```
cd C:\Users\DELL\Desktop\COPD1
.\SETUP_COMPLETE.bat
```

The script will:
1. ✓ Check for all required software
2. ✓ Run `npm install` in frontend (creates node_modules)
3. ✓ Create MySQL database
4. ✓ Configure everything
5. ✓ Tell you how to start the system

## ================================================================

## STEP 5: Start the System

After setup completes, open TWO PowerShell windows:

**Window 1:**
```
cd C:\Users\DELL\Desktop\COPD1\php-api
php -S localhost:8000
```

**Window 2:**
```
cd C:\Users\DELL\Desktop\COPD1\frontend
npm run dev
```

Open browser: http://localhost:5173

Login:
- Staff ID: ASS001
- Password: password

## ================================================================

## Troubleshooting

### "node is not recognized"
- Node.js not installed or not in PATH
- Reinstall from https://nodejs.org/
- Restart computer after install

### "mysql is not recognized"
- MySQL not installed or not in PATH
- Install XAMPP or MySQL from https://dev.mysql.com/
- Make sure MySQL service is running

### "php is not recognized"
- PHP not installed
- Use XAMPP (easier) or download PHP
- Add PHP folder to Windows PATH

### "npm install fails"
- Make sure Node.js is installed
- Delete node_modules folder and try again
- Try: `npm install --verbose` to see detailed errors

### Database import fails
- Make sure MySQL is running
- Check MySQL root password is correct
- Try importing manually in MySQL Workbench

## ================================================================

## Getting Help

1. Read: START_HERE_PHP.md
2. Read: PHP_QUICK_START.md
3. Read: PHP_INSTALLATION.md
4. Check: VERIFICATION_CHECKLIST.md

All documentation files are in the root folder.

## ================================================================
