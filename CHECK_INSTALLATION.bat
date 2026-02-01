@echo off
REM ================================================================
REM Check if all required software is installed
REM ================================================================

echo.
echo Checking for required software...
echo.

setlocal enabledelayedexpansion

set missing=0

REM Check Node.js
echo Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo   ✗ Node.js NOT found - Download: https://nodejs.org/
    set missing=1
) else (
    echo   ✓ Node.js found
    node --version
)

echo.

REM Check npm
echo Checking npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo   ✗ npm NOT found - Install Node.js first
    set missing=1
) else (
    echo   ✓ npm found
    npm --version
)

echo.

REM Check MySQL
echo Checking MySQL...
mysql --version >nul 2>&1
if errorlevel 1 (
    echo   ✗ MySQL NOT found - Download: https://dev.mysql.com/downloads/mysql/
    set missing=1
) else (
    echo   ✓ MySQL found
    mysql --version
)

echo.

REM Check PHP
echo Checking PHP...
php --version >nul 2>&1
if errorlevel 1 (
    echo   ✗ PHP NOT found - Use XAMPP: https://www.apachefriends.org/
    set missing=1
) else (
    echo   ✓ PHP found
    php --version | findstr /R "^PHP"
)

echo.
echo ================================================================
echo.

if !missing! equ 0 (
    echo ✓ All required software is installed!
    echo.
    echo You can now run: SETUP_COMPLETE.bat
    echo.
) else (
    echo ✗ Some software is missing!
    echo.
    echo Please read: INSTALLATION_PREREQUISITES.md
    echo.
)

pause
