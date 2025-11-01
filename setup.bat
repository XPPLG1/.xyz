@echo off
echo ========================================
echo   SETUP CLASS WEBSITE - AUTOMATED
echo ========================================
echo.

echo [1/4] Checking Node.js...
node -v >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo OK: Node.js is installed
node -v
echo.

echo [2/4] Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)
echo OK: Dependencies installed
echo.

echo [3/4] Checking MySQL...
echo Please make sure MySQL is running and database is created!
echo Run these SQL commands in MySQL:
echo.
echo   CREATE DATABASE IF NOT EXISTS class_website;
echo   USE class_website;
echo   [Then import database.sql]
echo.
pause
echo.

echo [4/4] Setup complete!
echo.
echo ========================================
echo   NEXT STEPS:
echo ========================================
echo 1. Edit server.js - update database credentials
echo 2. Create database and import database.sql
echo 3. Run: npm start
echo 4. Open: http://localhost:3000
echo.
echo ========================================
pause

