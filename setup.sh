#!/bin/bash
# ================================================================
# COPD Detection System - Complete Setup Script (Linux/Mac)
# ================================================================
# This script sets up the entire system:
# 1. Checks for required software
# 2. Installs Node.js modules
# 3. Creates MySQL database
# 4. Configures everything
# 5. Starts all services
# ================================================================

set -e

cd "$(dirname "$0")"

echo ""
echo "================================================================"
echo "    COPD Detection System - Full Setup"
echo "================================================================"
echo ""

# Check for Node.js
echo "[1/5] Checking for Node.js..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is NOT installed"
    echo "Install with: brew install node (Mac) or apt-get install nodejs (Linux)"
    exit 1
fi
echo "[OK] Node.js found: $(node --version)"

# Check for MySQL
echo ""
echo "[2/5] Checking for MySQL..."
if ! command -v mysql &> /dev/null; then
    echo "ERROR: MySQL is NOT installed"
    echo "Install with: brew install mysql (Mac) or apt-get install mysql-server (Linux)"
    exit 1
fi
echo "[OK] MySQL found: $(mysql --version)"

# Install Node.js modules
echo ""
echo "[3/5] Installing Node.js modules (npm)..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo "node_modules already exist, skipping npm install"
fi
cd ..

# Create MySQL Database
echo ""
echo "[4/5] Creating MySQL database..."
echo "Enter your MySQL root password (press Enter if none):"
read -s MYSQL_PASSWORD

if [ -z "$MYSQL_PASSWORD" ]; then
    mysql -u root < php-api/config/schema.sql
else
    mysql -u root -p"$MYSQL_PASSWORD" < php-api/config/schema.sql
fi

echo ""
echo "================================================================"
echo "    ✓ Setup Complete!"
echo "================================================================"
echo ""
echo "Your system is now ready to use!"
echo ""
echo "To start the COPD system:"
echo ""
echo "Terminal 1 - Start PHP API Server:"
echo "   cd php-api"
echo "   php -S localhost:8000"
echo ""
echo "Terminal 2 - Start React Frontend:"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "Then open: http://localhost:5173"
echo ""
echo "Default Login Credentials:"
echo "   Staff ID: ASS001"
echo "   Password: password"
echo ""
echo "================================================================"
echo ""
