# Testing & Quality Assurance Guide

## 🧪 Manual Testing Checklist

### Frontend Testing

- [ ] Home Page
  - [ ] Three role buttons visible (Doctor, Assistant, Patient)
  - [ ] Buttons are clickable
  - [ ] Correct navigation on click
  - [ ] Styling matches screenshots
  - [ ] Responsive on mobile

- [ ] Assistant Login Page
  - [ ] Form displays correctly
  - [ ] Input validation works
  - [ ] "Not Registered?" link works
  - [ ] Error messages display on invalid login
  - [ ] Loading state shows during submit
  - [ ] Successful login redirects to dashboard

- [ ] Assistant Registration Page
  - [ ] All form fields appear
  - [ ] Form validation works
  - [ ] Password confirmation check
  - [ ] Checkbox required
  - [ ] Error handling for duplicate email
  - [ ] "Back to Login" link works
  - [ ] Successful registration redirects to dashboard

- [ ] Assistant Dashboard
  - [ ] Statistics cards display correctly
  - [ ] Appointments table shows data
  - [ ] Sidebar navigation works
  - [ ] Logout button works
  - [ ] Protected from unauthorized access

- [ ] Appointments Page
  - [ ] Displays list of appointments
  - [ ] Sorting works
  - [ ] Status badges show correctly
  - [ ] Dates formatted properly

- [ ] Patients Page
  - [ ] Displays list of patients
  - [ ] Patient information shows
  - [ ] Assigned doctors display

### Backend API Testing

#### 1. Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "role": "assistant",
    "fullName": "Test User",
    "email": "test@example.com",
    "staffId": "S002",
    "nic": "123456789",
    "phone": "0712345678",
    "placeOfWork": "Test Hospital",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

Expected: `{ "success": true, "token": "...", "user": {...} }`

#### 2. Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "staffId": "S002",
    "password": "password123",
    "role": "assistant"
  }'
```

Expected: `{ "success": true, "token": "...", "user": {...} }`

#### 3. Get Current User (Protected)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <your_token>"
```

Expected: `{ "success": true, "user": {...} }`

#### 4. Get Dashboard
```bash
curl -X GET http://localhost:5000/api/assistant/dashboard \
  -H "Authorization: Bearer <your_token>"
```

Expected: `{ "success": true, "data": { "totalPatients": 124, ... } }`

#### 5. Get Appointments
```bash
curl -X GET http://localhost:5000/api/assistant/appointments \
  -H "Authorization: Bearer <your_token>"
```

Expected: `{ "success": true, "data": [...] }`

#### 6. Get Patients
```bash
curl -X GET http://localhost:5000/api/assistant/patients \
  -H "Authorization: Bearer <your_token>"
```

Expected: `{ "success": true, "data": [...] }`

## 🔍 Browser DevTools Testing

### Console Checks
- [ ] No console errors
- [ ] No console warnings
- [ ] API calls logged correctly
- [ ] Token stored in localStorage

### Network Tab Checks
- [ ] All API requests return 200 OK
- [ ] CORS headers present
- [ ] Response times acceptable
- [ ] No failed requests

### Application Tab (Storage)
- [ ] Token saved after login
- [ ] User data saved after login
- [ ] localStorage cleared after logout

## 📱 Responsive Testing

- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Layout adjusts properly
- [ ] Touch interactions work

## ♿ Accessibility Testing

- [ ] Tab navigation works
- [ ] Form labels present
- [ ] Color contrast sufficient
- [ ] Alt text on images
- [ ] Error messages clear

## 🔐 Security Testing

- [ ] No credentials in console
- [ ] No tokens exposed
- [ ] CORS working correctly
- [ ] Unauthorized access blocked
- [ ] Password properly hashed
- [ ] SQL injection prevented (MongoDB injection)

## 🐛 Common Test Cases

### Test Case 1: New User Registration
1. Go to Home
2. Click Assistant
3. Click Register
4. Fill form with unique email
5. Submit
6. Verify redirect to dashboard

### Test Case 2: Existing User Login
1. Go to Home
2. Click Assistant
3. Enter credentials
4. Click Login
5. Verify dashboard loads

### Test Case 3: Invalid Login
1. Go to Home
2. Click Assistant
3. Enter wrong password
4. Click Login
5. Verify error message

### Test Case 4: Duplicate Email Registration
1. Go to Home
2. Click Assistant
3. Register with existing email
4. Verify error message
5. Verify back on registration page

### Test Case 5: Password Mismatch
1. Go to Home
2. Click Assistant
3. Register with non-matching passwords
4. Click Submit
5. Verify error shown

### Test Case 6: Protected Route Access
1. Go to /assistant/dashboard without token
2. Verify redirect to login

## 📊 Performance Testing

- [ ] Load time < 3 seconds
- [ ] API response < 500ms
- [ ] No memory leaks
- [ ] Smooth animations
- [ ] No lag on interaction

## 🗄️ Database Testing

### Verify Collections
```javascript
// Connect to MongoDB
use copd_detection

// Check users
db.users.find({})

// Check patients
db.patients.find({})

// Check appointments
db.appointments.find({})
```

### Test Data Integrity
- [ ] User passwords hashed
- [ ] Relationships correct (ObjectIds)
- [ ] Unique fields enforced
- [ ] No duplicate emails
- [ ] Timestamps created

## 📝 Test Report Template

```
Test Date: [DATE]
Tester: [NAME]
Environment: Development

RESULTS:
- Frontend: PASS/FAIL
- Backend: PASS/FAIL
- Database: PASS/FAIL
- Security: PASS/FAIL

ISSUES FOUND:
1. [Issue description]
   Severity: High/Medium/Low
   Status: Open/Fixed

PASS RATE: [X]%

NOTES:
[Any additional notes]
```

## 🚀 Deployment Testing

Before deploying to production:

- [ ] All tests pass
- [ ] No console errors
- [ ] Environment variables correct
- [ ] Database connected
- [ ] CORS configured
- [ ] Error handling works
- [ ] Logging enabled
- [ ] SSL/TLS ready
