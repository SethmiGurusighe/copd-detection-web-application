# 🚀 QUICK START GUIDE

## Step 1: Start MongoDB
```bash
# Windows - Open Command Prompt
mongod

# Or use MongoDB Atlas (Cloud):
# Update MONGODB_URI in backend/.env with your Atlas connection string
```

## Step 2: Start Backend

Open a terminal and run:
```bash
cd backend
npm install
npm run dev
```

Expected output:
```
✓ MongoDB Connected: localhost
✓ Server running on http://localhost:5000
✓ Environment: development
```

## Step 3: Start Frontend

Open another terminal and run:
```bash
cd frontend
npm install
npm run dev
```

Expected output:
```
VITE v4.2.0  ready in 523 ms

➜  Local:   http://localhost:5173/
```

## Step 4: Access the Application

Open your browser and go to: **http://localhost:5173**

## Step 5: Test the Workflow

1. **Click "Assistant" on home page**
2. **Click "Login / Register"**
3. **Select "Register here"**
4. **Fill the registration form:**
   - Staff ID: S001
   - Full Name: Test Assistant
   - Email: test@example.com
   - Phone: 0712345678
   - NIC: 123456789
   - Place of Work: Test Hospital
   - Password: password123
   - Confirm Password: password123
   - Accept policies checkbox
5. **Click "REGISTER ASSISTANT ACCOUNT"**
6. **You'll be redirected to Dashboard**
7. **View appointments and patient data**

## API Testing with Postman/Thunder Client

### Register Assistant
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "role": "assistant",
  "fullName": "Test Assistant",
  "email": "test@example.com",
  "staffId": "S001",
  "nic": "123456789",
  "phone": "0712345678",
  "placeOfWork": "Test Hospital",
  "password": "password123",
  "confirmPassword": "password123"
}
```

### Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "staffId": "S001",
  "password": "password123",
  "role": "assistant"
}
```

### Get Dashboard (with token)
```
GET http://localhost:5000/api/assistant/dashboard
Headers:
  Authorization: Bearer <token_from_login>
```

## Common Issues & Solutions

### Issue: Cannot connect to MongoDB
**Solution:**
- Make sure MongoDB is running: `mongod`
- Or use MongoDB Atlas cloud
- Update `MONGODB_URI` in backend/.env

### Issue: Frontend shows blank page
**Solution:**
- Check browser console for errors (F12)
- Make sure backend is running
- Clear localStorage: `localStorage.clear()`

### Issue: API calls return 401 Unauthorized
**Solution:**
- Token might be expired
- Log in again
- Check if token is in localStorage

### Issue: Ports already in use
**Solution:**
```bash
# Find process on port 5000
netstat -ano | findstr :5000

# Kill process (Windows)
taskkill /PID <PID> /F
```

## Next Steps

1. Add Doctor and Patient login pages
2. Create test data in MongoDB
3. Add appointment management
4. Implement file uploads
5. Add email notifications
6. Deploy to production

## Support

For detailed API documentation, see README.md
For troubleshooting, see README.md "Troubleshooting" section
