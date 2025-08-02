# 🧹 Repository Cleanup Guide

## ✅ Completed Actions

### 1. Removed Sensitive Files
- ✅ Deleted `backend/email-config.txt`
- ✅ Deleted `backend/email-test.js`
- ✅ Deleted `backend/test-routes.js`

### 2. Updated .gitignore
- ✅ Added comprehensive environment file patterns
- ✅ Added sensitive file patterns
- ✅ Added configuration file patterns

### 3. Created Safe Templates
- ✅ Created `backend/env-template.txt` (safe template)
- ✅ Created `cleanup-git-history.sh` (cleanup script)

## 🔄 Next Steps

### Step 1: Run Git History Cleanup

#### For Windows PowerShell:
```powershell
# Run the PowerShell script
.\cleanup-git-history.ps1
```

#### For Windows Command Prompt:
```cmd
# Run the batch file
cleanup-git-history.bat
```

#### For Linux/Mac:
```bash
# Make the script executable
chmod +x cleanup-git-history.sh

# Run the cleanup script
./cleanup-git-history.sh
```

### Step 2: Force Push to Remote

```bash
# Force push to update remote repository
git push origin --force --all
git push origin --force --tags
```

### Step 3: Update Environment Variables

1. **MongoDB Atlas**:
   - Reset database password
   - Update connection string in Render

2. **Gmail**:
   - Revoke compromised app password
   - Generate new app password
   - Update in Render environment variables

3. **Render Dashboard**:
   ```
   MONGODB_URI=<new-mongodb-connection-string>
   EMAIL_USER=social.maiya@gmail.com
   EMAIL_PASS=<new-gmail-app-password>
   NODE_ENV=production
   ```

### Step 4: Verify Cleanup

1. **Check GitGuardian**: No more alerts
2. **Test Backend**: Visit `https://canva-wordpress-refresh.onrender.com/`
3. **Test Email**: Use the API test endpoints
4. **Check Logs**: Verify no sensitive data in logs

## 🛡️ Security Best Practices

### Environment Variables
- ✅ Never commit `.env` files
- ✅ Use environment variables for all secrets
- ✅ Rotate credentials regularly

### Code Security
- ✅ Use `.gitignore` for sensitive files
- ✅ Review commits before pushing
- ✅ Use pre-commit hooks to check for secrets

### Monitoring
- ✅ Enable GitGuardian alerts
- ✅ Monitor for credential leaks
- ✅ Set up security scanning

## 📋 Checklist

- [ ] Run Git history cleanup script
- [ ] Force push to remote repository
- [ ] Reset MongoDB password
- [ ] Revoke Gmail app password
- [ ] Update Render environment variables
- [ ] Test backend functionality
- [ ] Test email functionality
- [ ] Verify no GitGuardian alerts
- [ ] Check Render logs for errors

## 🚨 Emergency Contacts

If issues persist:
- **MongoDB**: Contact Atlas support
- **Gmail**: Contact Google support
- **Render**: Contact Render support
- **GitGuardian**: Contact their support

## ✅ Expected Results

After cleanup:
1. ✅ No sensitive data in repository
2. ✅ No GitGuardian alerts
3. ✅ Secure credential management
4. ✅ Working email functionality
5. ✅ Clean Git history 