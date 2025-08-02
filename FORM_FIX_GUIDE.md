# Form Fix Guide

## Issue
The forms are not working - buttons don't respond and confirmation cards don't show.

## Root Cause
The API base URL is pointing to the wrong backend URL.

## Solution Steps

### 1. Update Your Backend URL
Edit `src/config/api.ts` and update the `PRODUCTION_URL` with your actual Render backend URL:

```typescript
PRODUCTION_URL: 'https://your-actual-backend-name.onrender.com/api'
```

### 2. Test API Connection
1. Go to the Contact page
2. You'll see an "API Connection Test" component
3. Click "Test Connection" to verify your backend is reachable
4. Check the browser console for detailed logs

### 3. Check Backend Status
Make sure your backend is running:
- If local: `cd backend && npm start`
- If on Render: Check the deployment logs

### 4. Verify Environment Variables
Create a `.env` file in the root directory:
```
VITE_API_URL=http://localhost:3001/api
```

For production, set:
```
VITE_API_URL=https://your-backend-name.onrender.com/api
```

### 5. Test Forms
After fixing the API URL:
1. Try submitting the Contact form
2. Try the Appointment Booking form
3. Check browser console for any errors

### 6. Common Issues

#### CORS Errors
- Backend is configured to allow all origins in development
- Check that your frontend URL is in the allowed origins list

#### Network Errors
- Verify your backend URL is correct
- Check if backend is running
- Ensure firewall/network allows the connection

#### Form Validation Errors
- Check that all required fields are filled
- Verify email format is correct
- Check for blocked content in form fields

### 7. Debug Steps
1. Open browser developer tools (F12)
2. Go to Console tab
3. Submit a form
4. Look for API call logs and any error messages
5. Check Network tab to see if requests are being made

### 8. Remove Test Component
Once everything is working, remove the ApiTest component from Contact.tsx:

```typescript
// Remove this import
import ApiTest from "@/components/ApiTest";

// Remove this section
<div className="lg:col-span-2 mb-8">
  <ApiTest />
</div>
```

## Expected Behavior
After fixing:
- Forms should submit successfully
- Confirmation cards should appear
- Toast notifications should show
- Console should show successful API calls
- Emails should be sent to both user and admin 