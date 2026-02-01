@echo off
REM Start both backend and frontend automatically for Windows

echo Starting COPD Detection System...
echo.

REM Start backend in new window
echo Starting backend server...
start cmd /k "cd backend && npm run dev"

REM Wait a moment
timeout /t 3 /nobreak

REM Start frontend in new window
echo Starting frontend server...
start cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are starting...
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:5000
echo.
pause
