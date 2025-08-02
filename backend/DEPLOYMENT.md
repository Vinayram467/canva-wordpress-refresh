# 🚀 Render Deployment Guide for Maiya Hospital Backend

## 📋 Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **MongoDB Atlas Account**: Sign up at [mongodb.com/atlas](https://mongodb.com/atlas)
3. **Gmail Account**: For email functionality
4. **GitHub Repository**: Your code should be in a Git repository

## 🔧 Step 1: MongoDB Atlas Setup

### 1.1 Create MongoDB Atlas Cluster
1. Log into MongoDB Atlas
2. Create a new project (if needed)
3. Build a new cluster (Free tier is fine for testing)
4. Choose your preferred cloud provider and region

### 1.2 Configure Database Access
1. Go to **Database Access** in the left sidebar
2. Click **Add New Database User**
3. Create a username and password (save these!)
4. Set privileges to **Read and write to any database**
5. Click **Add User**

### 1.3 Configure Network Access
1. Go to **Network Access** in the left sidebar
2. Click **Add IP Address**
3. For development: Click **Allow Access from Anywhere** (0.0.0.0/0)
4. For production: Add your Render IP ranges

### 1.4 Get Connection String
1. Go to **Database** in the left sidebar
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `maiya-hospital`

**Example Connection String:**
```
mongodb+srv://username:password@cluster.mongodb.net/maiya-hospital?retryWrites=true&w=majority
```

## 🔧 Step 2: Gmail Setup for Email

### 2.1 Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Navigate to **Security**
3. Enable **2-Step Verification**

### 2.2 Generate App Password
1. In Security settings, go to **App passwords**
2. Select **Mail** as the app
3. Generate the password
4. Save this password (you'll need it for environment variables)

## 🔧 Step 3: Render Deployment

### 3.1 Connect Your Repository
1. Log into Render
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Select the repository containing your backend code

### 3.2 Configure Build Settings
```
Name: maiya-hospital-backend
Environment: Node
Build Command: npm install
Start Command: npm start
```

### 3.3 Set Environment Variables
In Render dashboard, go to **Environment** tab and add these variables:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/maiya-hospital?retryWrites=true&w=majority
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=social.maiya@gmail.com
EMAIL_PASS=your-gmail-app-password
ADMIN_EMAIL=social.maiya@gmail.com
HOSPITAL_NAME=Maiya Multi Speciality Hospital
```

### 3.4 Update CORS Origins
Replace `your-app-name.onrender.com` in the CORS configuration with your actual Render URL.

## 🔧 Step 4: Frontend Configuration

### 4.1 Update API Base URL
In your frontend code, update the API base URL to your Render URL:

```javascript
// In your frontend API configuration
const API_BASE_URL = 'https://your-app-name.onrender.com/api';
```

### 4.2 Update CORS Origins
Make sure your frontend domain is included in the CORS allowed origins.

## 🔧 Step 5: Testing Deployment

### 5.1 Health Check
Test your deployment by visiting:
```
https://your-app-name.onrender.com/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Maiya Hospital API is running securely",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "security": {
    "blockedRequests": 0,
    "rateLimitedRequests": 0,
    "suspiciousActivities": 0
  }
}
```

### 5.2 Test Email Functionality
Use the test email endpoint:
```
POST https://your-app-name.onrender.com/api/test-email/test
```

## 🔧 Step 6: Production Optimizations

### 6.1 Enable Auto-Deploy
1. In Render dashboard, go to **Settings**
2. Enable **Auto-Deploy** for automatic deployments

### 6.2 Set Up Monitoring
1. Enable **Logs** in Render dashboard
2. Monitor your application performance
3. Set up alerts for errors

### 6.3 Database Monitoring
1. In MongoDB Atlas, go to **Metrics**
2. Monitor your database performance
3. Set up alerts for high usage

## 🔧 Step 7: Security Checklist

### 7.1 Environment Variables
- [ ] All sensitive data is in environment variables
- [ ] No hardcoded credentials in code
- [ ] Production database connection string is secure

### 7.2 CORS Configuration
- [ ] Only allowed origins are configured
- [ ] Frontend domain is included
- [ ] No wildcard origins in production

### 7.3 Rate Limiting
- [ ] Rate limits are appropriate for production
- [ ] Email rate limits are stricter
- [ ] API rate limits are reasonable

### 7.4 Email Security
- [ ] Gmail app password is configured
- [ ] Email templates are sanitized
- [ ] Rate limiting is enabled for emails

## 🔧 Step 8: Troubleshooting

### Common Issues

#### 1. **Database Connection Failed**
- Check MongoDB Atlas network access
- Verify connection string format
- Ensure database user has correct permissions

#### 2. **Email Not Sending**
- Verify Gmail app password
- Check email environment variables
- Test email configuration

#### 3. **CORS Errors**
- Update allowed origins in backend
- Check frontend domain is included
- Verify HTTPS/HTTP protocol

#### 4. **Rate Limiting Issues**
- Check rate limit configuration
- Monitor request patterns
- Adjust limits if needed

### Debug Commands

#### Check Logs
```bash
# In Render dashboard, go to Logs tab
# Monitor real-time logs for errors
```

#### Test Database Connection
```bash
# Use MongoDB Compass or mongo shell
# Test connection with your connection string
```

#### Test Email Configuration
```bash
# Use the test email endpoint
curl -X POST https://your-app-name.onrender.com/api/test-email/test
```

## 🔧 Step 9: Maintenance

### Regular Tasks
1. **Monitor Logs**: Check Render logs regularly
2. **Database Backups**: MongoDB Atlas handles this automatically
3. **Security Updates**: Keep dependencies updated
4. **Performance Monitoring**: Monitor API response times

### Backup Strategy
1. **Code**: Use Git for version control
2. **Database**: MongoDB Atlas automatic backups
3. **Environment Variables**: Document all variables
4. **Configuration**: Keep configuration files in repository

## 📞 Support

If you encounter issues:
1. Check Render logs first
2. Verify environment variables
3. Test endpoints individually
4. Contact support with specific error messages

---

**Last Updated**: January 2024
**Version**: 1.0.0
**Environment**: Production (Render + MongoDB Atlas) 