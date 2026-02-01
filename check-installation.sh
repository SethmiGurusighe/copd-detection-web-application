#!/bin/bash
# ================================================================
# Check if all required software is installed
# ================================================================

echo ""
echo "Checking for required software..."
echo ""

missing=0

# Check Node.js
echo "Checking Node.js..."
if command -v node &> /dev/null; then
    echo "   ✓ Node.js found: $(node --version)"
else
    echo "   ✗ Node.js NOT found - Download: https://nodejs.org/"
    missing=1
fi

echo ""

# Check npm
echo "Checking npm..."
if command -v npm &> /dev/null; then
    echo "   ✓ npm found: $(npm --version)"
else
    echo "   ✗ npm NOT found - Install Node.js first"
    missing=1
fi

echo ""

# Check MySQL
echo "Checking MySQL..."
if command -v mysql &> /dev/null; then
    echo "   ✓ MySQL found: $(mysql --version)"
else
    echo "   ✗ MySQL NOT found - Download: https://dev.mysql.com/downloads/mysql/"
    missing=1
fi

echo ""

# Check PHP
echo "Checking PHP..."
if command -v php &> /dev/null; then
    echo "   ✓ PHP found: $(php --version | head -n 1)"
else
    echo "   ✗ PHP NOT found - Use XAMPP: https://www.apachefriends.org/"
    missing=1
fi

echo ""
echo "================================================================"
echo ""

if [ $missing -eq 0 ]; then
    echo "✓ All required software is installed!"
    echo ""
    echo "You can now run: ./setup.sh"
    echo ""
else
    echo "✗ Some software is missing!"
    echo ""
    echo "Please read: INSTALLATION_PREREQUISITES.md"
    echo ""
fi
