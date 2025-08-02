# Backend Test Guide

## Issue
When visiting `https://canva-wordpress-refresh.onrender.com`, you get "Route not found" error.

## Quick Tests

### 1. Test Root Endpoint
Visit: `https://canva-wordpress-refresh.onrender.com/`
Expected: JSON response with API information

### 2. Test Health Endpoint
Visit: `https://canva-wordpress-refresh.onrender.com/api/health`
Expected: JSON response with health status

### 3. Test Simple Endpoint
Visit: `https://canva-wordpress-refresh.onrender.com/test`
Expected: JSON response with test message

## Debugging Steps

### 1. Check Render Logs
1. Go to your Render dashboard
2. Click on your backend service
3. Go to "Logs" tab
4. Look for any error messages

### 2. Check Environment Variables
Make sure these are set in Render:
- `MONGODB_URI` - Your MongoDB connection string
- `EMAIL_USER` - Your Gmail address
- `EMAIL_PASS` - Your Gmail app password
- `NODE_ENV` - Should be `production`

### 3. Test Local Backend
If you want to test locally:
```bash
cd backend
npm start
```
Then visit: `http://localhost:3001/`

### 4. Check MongoDB Connection
The logs should show:
- "Connected to MongoDB successfully"
- If not, check your `MONGODB_URI`

## Common Issues

### 1. MongoDB Connection Failed
- Check if `MONGODB_URI` is set correctly
- Make sure MongoDB Atlas allows connections from Render
- Check if the connection string is valid

### 2. Environment Variables Missing
- All required env vars must be set in Render
- Check the Render dashboard → Environment section

### 3. Port Issues
- Render automatically sets `PORT` environment variable
- Backend should listen on `0.0.0.0` (already configured)

### 4. Route Issues
- All routes are prefixed with `/api/`
- Root route `/` should work now
- Health check at `/api/health`

## Expected Behavior

After fixing:
1. `https://canva-wordpress-refresh.onrender.com/` should return API info
2. `https://canva-wordpress-refresh.onrender.com/api/health` should return health status
3. Forms should submit successfully
4. Emails should be sent

## Next Steps

1. Deploy the updated backend
2. Test the endpoints above
3. Check Render logs for any errors
4. Test the forms on your frontend 