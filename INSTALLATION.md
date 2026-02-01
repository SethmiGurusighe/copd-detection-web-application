# 🎯 STEP-BY-STEP INSTALLATION & SETUP

## ✅ Pre-Installation Checklist

- [ ] Node.js installed (v16+)
- [ ] npm working
- [ ] MongoDB installed OR MongoDB Atlas account
- [ ] All files downloaded
- [ ] Terminal/Command Prompt ready

---

## 📋 Installation Steps

### STEP 1: Prepare MongoDB

#### Option A: Local MongoDB (Windows)
1. Download from: https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB starts as service automatically
4. Verify: Open Command Prompt, type `mongod`
   - Should see: `Waiting for connections on port 27017`

#### Option B: MongoDB Atlas (Cloud) ⭐ Recommended
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Create user credentials
5. Get connection string
6. Copy connection string
7. Update in `backend/.env` as `MONGODB_URI`

#### Verify MongoDB is running:
```bash
mongod
# Should see:
# [connection] connection accepted from 127.0.0.1:12345
```
✅ Keep this terminal open

---

### STEP 2: Backend Installation

**Terminal 1 (New):**

```bash
# Navigate to backend
cd C:\Users\DELL\Desktop\COPD1\backend

# Install dependencies
npm install
```

Expected output:
```
added 100+ packages in 30s
```

### Step 2.1: Configure Backend

Edit `C:\Users\DELL\Desktop\COPD1\backend\.env`

**For Local MongoDB:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/copd_detection
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

**For MongoDB Atlas:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/copd_detection
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

### Step 2.2: Start Backend

In Terminal 1:
```bash
npm run dev
```

Expected output:
```
✓ MongoDB Connected: localhost
✓ Server running on http://localhost:5000
✓ Environment: development
```

✅ **Backend is running!**
Keep this terminal open.

---

### STEP 3: Frontend Installation

**Terminal 2 (New):**

```bash
# Navigate to frontend
cd C:\Users\DELL\Desktop\COPD1\frontend

# Install dependencies
npm install
```

Expected output:
```
added 200+ packages in 1m
```

### Step 3.1: Verify Frontend Configuration

File: `C:\Users\DELL\Desktop\COPD1\frontend\.env`

Should contain:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=COPD Detection
```

✅ No changes needed (default is correct)

### Step 3.2: Start Frontend

In Terminal 2:
```bash
npm run dev
```

Expected output:
```
VITE v4.2.0  ready in 523 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

✅ **Frontend is running!**

---

## 🎉 Access Application

### Open in Browser

**URL:** http://localhost:5173

You should see:
- COPD Detection header
- Logo with doctor icon
- Three role cards: Doctor, Assistant, Patient
- Professional blue styling

### If You See Blank Page

1. Open DevTools: Press F12
2. Check Console tab for errors
3. Try these fixes:
   - Hard refresh: Ctrl+Shift+R
   - Clear localStorage: `localStorage.clear()`
   - Restart both servers

---

## 🧪 Test Workflow

### Step 1: Register New Assistant

1. Click **"Assistant"** card
2. Click **"Login / Register"**
3. Click **"Register here"**
4. Fill the form:
   ```
   Staff ID: S001
   Full Name: Test Assistant
   Email: test@example.com
   Phone: 0712345678
   NIC: 123456789
   Place of Work: Test Hospital
   Password: password123
   Confirm Password: password123
   ```
5. Check checkbox: "I confirm that..."
6. Click **"REGISTER ASSISTANT ACCOUNT"**

Expected: Redirected to dashboard automatically

### Step 2: View Dashboard

You should see:
- "Welcome, Test Assistant" in top right
- Three stat cards:
  - Total Patients: 0
  - Today's Appointments: 0
  - Pending: 0
- Sidebar with: Dashboard, Appointments, Patients
- Empty appointments table

### Step 3: Navigate

1. Click **"Appointments"** in sidebar
   - Shows empty appointments list
2. Click **"Patients"** in sidebar
   - Shows empty patients list
3. Click **"Dashboard"** in sidebar
   - Back to main dashboard
4. Click **"Logout"** button
   - Returns to home page

### Step 4: Test Login

1. On home page, click **"Assistant"**
2. Enter:
   - Staff ID: S001
   - Password: password123
3. Click **"LOGIN"**
4. Should login successfully

✅ **Application is working!**

---

## 📊 Optional: Add Test Data

### Method 1: Using Seed Script

```bash
# In backend folder
cd backend
node seed.js
```

Expected output:
```
✓ Connected to MongoDB
✓ Created test assistant
✓ Created test doctor
✓ Created test patients
✓ Created patient records
✓ Created appointments

✅ Database seeding completed!

Test credentials:
Staff ID: S001
Password: password123
```

### Method 2: Manual Testing with Postman

1. Download Postman: https://www.postman.com/downloads/
2. Import API collection (or create manually)
3. Test endpoints

See **README.md** for API examples.

---

## 🛠️ Verify Everything Works

### Backend Health Check
Open: http://localhost:5000/api/health

Expected response:
```json
{
  "success": true,
  "message": "Backend is running"
}
```

### MongoDB Connection Check
In Terminal 1 (Backend):
- Should show: `✓ MongoDB Connected`

### Frontend Build Check
In Terminal 2 (Frontend):
- Should show: `VITE v4.2.0 ready in 523 ms`

### Network Check
1. Open DevTools (F12)
2. Go to Network tab
3. Refresh page
4. Should see:
   - HTML file loads
   - JS bundles load
   - CSS files load
   - No 404 errors

### API Request Check
1. In DevTools Network tab
2. Go to Assistant → Register
3. Fill form and submit
4. Should see:
   - POST request to `/api/auth/register`
   - Status: 201 Created
   - Response includes token

✅ **All systems working!**

---

## 🚀 What's Next?

### To Stop Servers
```bash
Terminal 1: Press Ctrl+C
Terminal 2: Press Ctrl+C
```

### To Start Again
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2 (new terminal)
cd frontend && npm run dev
```

### To Use One-Click Start (Windows)
```bash
# Double-click
start.bat
```

This opens two new terminals automatically.

---

## ⚠️ Common Installation Issues

### Issue: `npm install` fails

**Error:** `npm ERR! code ERESOLVE`

**Solution:**
```bash
npm install --legacy-peer-deps
```

### Issue: MongoDB won't start

**Error:** `mongod: command not found`

**Solution:**
- Check if MongoDB is installed: `mongod --version`
- Use MongoDB Atlas instead (cloud version)

### Issue: Port already in use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find process
netstat -ano | findstr :5000

# Kill process (Windows)
taskkill /PID <PID> /F
```

### Issue: CORS error in browser

**Error:** `Access to XMLHttpRequest blocked by CORS`

**Solution:**
1. Make sure backend is running
2. Check CORS_ORIGIN in `.env` matches frontend URL
3. Restart backend

### Issue: Cannot connect to API

**Error:** `Cannot reach http://localhost:5000`

**Solution:**
1. Check backend is running
2. Check port 5000 is not blocked
3. Verify `.env` configurations
4. Restart backend

---

## 🔑 Default Test Credentials

After setup, you can use:

**Staff ID:** S001  
**Password:** password123

Or register new accounts anytime.

---

## 📝 Installation Checklist

- [ ] Node.js installed
- [ ] npm working
- [ ] MongoDB running (local or Atlas)
- [ ] Backend folder exists
- [ ] Frontend folder exists
- [ ] Backend `.env` configured
- [ ] Frontend `.env` verified
- [ ] `npm install` in backend - success
- [ ] `npm install` in frontend - success
- [ ] Backend server starts: `npm run dev`
- [ ] Frontend server starts: `npm run dev`
- [ ] Browser opens: http://localhost:5173
- [ ] Home page displays 3 role options
- [ ] Can register as Assistant
- [ ] Can login to dashboard
- [ ] Can navigate between pages
- [ ] Can logout

---

## ✨ Congratulations!

You now have a fully functional full-stack medical support system running locally!

### Next Steps:
1. Review the code
2. Test all features
3. Customize for your needs
4. Add more features
5. Deploy to production

See **README.md** and **DEVELOPER_GUIDE.md** for more information.

---

## 📞 Need Help?

### Common Resources
- Backend issues: Check `backend/.env` and `backend/src/index.js`
- Frontend issues: Check browser DevTools (F12)
- API issues: Check network tab for responses
- Database issues: Check MongoDB connection string

### Documentation
- Full setup: `README.md`
- Developer guide: `DEVELOPER_GUIDE.md`
- API docs: `README.md` (API section)
- Architecture: `ARCHITECTURE.md`

### Terminal Shortcuts
```bash
# Stop server
Ctrl+C

# Restart
npm run dev

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules && npm install
```

---

**Installation Complete! 🎉**

You're ready to start building!
