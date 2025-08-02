# 🚨 CRITICAL SECURITY FIX GUIDE

## Issue
GitGuardian detected leaked credentials in your repository:
- MongoDB URI (database connection string)
- SMTP credentials (email password)

## IMMEDIATE ACTIONS

### 1. Revoke Compromised Credentials

#### MongoDB Atlas:
1. Go to MongoDB Atlas dashboard
2. Navigate to Database Access
3. Edit your database user
4. **Reset the password immediately**
5. Update the connection string in Render

#### Gmail App Password:
1. Go to Google Account settings
2. Navigate to Security → 2-Step Verification
3. Click "App passwords"
4. **Revoke the compromised app password**
5. Generate a new app password
6. Update in Render environment variables

### 2. Update Render Environment Variables

Go to your Render dashboard and update these variables:
```
MONGODB_URI=<new-mongodb-connection-string>
EMAIL_USER=social.maiya@gmail.com
EMAIL_PASS=<new-gmail-app-password>
NODE_ENV=production
```

### 3. Remove Sensitive Data from Git History

#### Option A: Using BFG Repo-Cleaner (Recommended)
```bash
# Download BFG
wget https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar

# Create a backup
git clone --mirror git@github.com:Vinayram467/canva-wordpress-refresh-1.git

# Run BFG to remove sensitive files
java -jar bfg-1.14.0.jar --delete-files .env canva-wordpress-refresh-1.git

# Clean up
cd canva-wordpress-refresh-1.git
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push to update remote
git push --force
```

#### Option B: Manual Cleanup
```bash
# Remove sensitive files from git history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env backend/.env backend/email-config.txt" \
  --prune-empty --tag-name-filter cat -- --all

# Force push
git push origin --force --all
```

### 4. Add to .gitignore

Make sure these files are in your `.gitignore`:
```
.env
*.env
backend/.env
backend/email-config.txt
config.js
secrets.json
```

### 5. Test Email Functionality

After updating credentials:
1. Deploy the updated backend
2. Test the email endpoints:
   - `https://canva-wordpress-refresh.onrender.com/api/test-email/connection`
   - `https://canva-wordpress-refresh.onrender.com/api/test-email/test`

### 6. Security Best Practices

#### Environment Variables:
- Never commit `.env` files
- Use environment variables for all secrets
- Rotate credentials regularly

#### Code Security:
- Use `.gitignore` for sensitive files
- Review commits before pushing
- Use pre-commit hooks to check for secrets

#### Monitoring:
- Enable GitGuardian alerts
- Monitor for credential leaks
- Set up security scanning

## Expected Results

After fixing:
1. ✅ No more GitGuardian alerts
2. ✅ Email functionality working
3. ✅ Secure credential management
4. ✅ Forms sending emails properly

## Verification Steps

1. **Check GitGuardian**: No more alerts
2. **Test Email**: Send test email from website
3. **Check Logs**: Verify email delivery in Render logs
4. **Security Scan**: Run security audit on repository

## Emergency Contacts

If credentials are still compromised:
- **MongoDB**: Contact Atlas support
- **Gmail**: Contact Google support
- **Render**: Contact Render support 