@echo off
REM ================================================================
REM COPD Detection System - Complete Setup Script
REM ================================================================
REM This script sets up the entire system:
REM 1. Checks for required software
REM 2. Installs Node.js modules
REM 3. Creates MySQL database
REM 4. Configures everything
REM 5. Starts all services
REM ================================================================

setlocal enabledelayedexpansion
cd /d "%~dp0"

echo.
echo ================================================================
echo    COPD Detection System - Full Setup
echo ================================================================
echo.

REM Check for Node.js
echo [1/5] Checking for Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is NOT installed
    echo Please download and install from: https://nodejs.org/
    echo After installation, run this script again
    pause
    exit /b 1
)
echo [OK] Node.js found: 
node --version

REM Check for MySQL
echo.
echo [2/5] Checking for MySQL...
mysql --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: MySQL is NOT installed
    echo Please download and install from: https://dev.mysql.com/downloads/mysql/
    echo After installation, run this script again
    pause
    exit /b 1
)
echo [OK] MySQL found:
mysql --version

REM Check for PHP
echo.
echo [3/5] Checking for PHP...
php --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: PHP is NOT installed
    echo Option 1: Download XAMPP from https://www.apachefriends.org/
    echo Option 2: Download PHP from https://windows.php.net/download/
    echo After installation, run this script again
    pause
    exit /b 1
)
echo [OK] PHP found:
php --version

REM Install Node.js modules
echo.
echo [4/5] Installing Node.js modules (npm)...
cd frontend
if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: npm install failed
        pause
        exit /b 1
    )
) else (
    echo node_modules already exist, skipping npm install
)
cd ..

REM Create MySQL Database
echo.
echo [5/5] Creating MySQL database...
echo.
echo Enter your MySQL root password (press Enter if none):
set /p MYSQL_PASSWORD=

if "%MYSQL_PASSWORD%"=="" (
    mysql -u root < php-api\config\schema.sql
) else (
    mysql -u root -p%MYSQL_PASSWORD% < php-api\config\schema.sql
)

if errorlevel 1 (
    echo ERROR: Database import failed
    echo Make sure MySQL is running
    pause
    exit /b 1
)

echo.
echo ================================================================
echo    ✓ Setup Complete!
echo ================================================================
echo.
echo Your system is now ready to use!
echo.
echo To start the COPD system:
echo.
echo Terminal 1 - Start PHP API Server:
echo   cd php-api
echo   php -S localhost:8000
echo.
echo Terminal 2 - Start React Frontend:
echo   cd frontend
echo   npm run dev
echo.
echo Then open: http://localhost:5173
echo.
echo Default Login Credentials:
echo   Staff ID: ASS001
echo   Password: password
echo.
echo ================================================================
echo.
pause
