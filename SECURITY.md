# 🔒 Security Documentation

## Overview
This document outlines the comprehensive security measures implemented in the Maiya Hospital website to prevent leaks, attacks, and ensure data protection.

## 🛡️ Security Features

### 1. **Input Validation & Sanitization**
- **XSS Prevention**: All user inputs are sanitized to remove HTML tags and dangerous scripts
- **SQL Injection Prevention**: Parameterized queries and input validation
- **Content Filtering**: Blocked words and dangerous patterns detection
- **Length Limits**: Maximum field lengths and request sizes enforced

### 2. **Rate Limiting**
- **API Rate Limiting**: 50 requests per 15 minutes per IP
- **Email Rate Limiting**: 5 email requests per 15 minutes per IP
- **Frontend Rate Limiting**: Client-side rate limiting for API calls

### 3. **CORS Protection**
- **Whitelist Origins**: Only allowed domains can access the API
- **Credentials Protection**: Secure cookie handling
- **Development vs Production**: Different CORS policies

### 4. **Security Headers**
- **Helmet.js**: Comprehensive security headers
- **Content Security Policy**: Strict CSP directives
- **HSTS**: HTTPS enforcement
- **X-Frame-Options**: Clickjacking protection
- **X-Content-Type-Options**: MIME type sniffing prevention

### 5. **Email Security**
- **Domain Validation**: Only allowed email domains accepted
- **Content Filtering**: Dangerous content blocked
- **Rate Limiting**: Email sending limits
- **Secure Templates**: Sanitized email templates

### 6. **Authentication & Authorization**
- **Admin Access Control**: Protected admin endpoints
- **Session Management**: Secure session handling
- **Token Validation**: CSRF token protection

### 7. **Monitoring & Logging**
- **Request Logging**: All requests logged with security data
- **Suspicious Activity Detection**: Automated threat detection
- **Security Dashboard**: Real-time security monitoring
- **Error Handling**: Secure error responses

## 🔧 Configuration

### Environment Variables
```bash
# Required for security
NODE_ENV=production
ADMIN_SECRET=your-secure-admin-secret
JWT_SECRET=your-jwt-secret
SESSION_SECRET=your-session-secret

# Email security
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@example.com

# Database security
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```

### Security Headers
```javascript
// Content Security Policy
contentSecurityPolicy: {
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'"],
  styleSrc: ["'self'", "'unsafe-inline'"],
  imgSrc: ["'self'", "data:", "https:"],
  connectSrc: ["'self'"],
  frameSrc: ["'none'"],
  objectSrc: ["'none'"]
}
```

## 🚨 Security Checklist

### Before Deployment
- [ ] All environment variables set securely
- [ ] Database credentials updated
- [ ] Email credentials updated
- [ ] Admin secrets configured
- [ ] CORS origins updated
- [ ] Rate limits configured
- [ ] Security headers enabled
- [ ] SSL/HTTPS enabled

### Regular Maintenance
- [ ] Update dependencies monthly
- [ ] Review security logs weekly
- [ ] Monitor suspicious activities
- [ ] Backup data regularly
- [ ] Test security features
- [ ] Update security policies

### Incident Response
- [ ] Monitor security alerts
- [ ] Block suspicious IPs
- [ ] Review access logs
- [ ] Update security measures
- [ ] Notify stakeholders
- [ ] Document incidents

## 🔍 Security Testing

### Manual Testing
```bash
# Test rate limiting
curl -X POST http://localhost:3001/api/appointments -H "Content-Type: application/json" -d '{}'

# Test CORS
curl -H "Origin: http://malicious-site.com" http://localhost:3001/api/health

# Test input sanitization
curl -X POST http://localhost:3001/api/messages -H "Content-Type: application/json" -d '{"message": "<script>alert(\"xss\")</script>"}'
```

### Automated Testing
```bash
# Run security tests
npm run test:security

# Run vulnerability scan
npm audit

# Run dependency check
npm audit fix
```

## 📊 Security Monitoring

### Dashboard Endpoints
- `GET /api/security/stats` - Security statistics
- `GET /api/security/alerts` - Security alerts
- `GET /api/security/health` - Security health check

### Log Monitoring
- Request logs with security data
- Suspicious activity detection
- Rate limiting violations
- CORS violations
- Input validation failures

## 🛠️ Security Tools

### Backend Security
- **Helmet.js**: Security headers
- **Express Rate Limit**: Rate limiting
- **CORS**: Cross-origin protection
- **Input Sanitization**: XSS prevention
- **Email Validation**: Email security

### Frontend Security
- **Input Validation**: Client-side validation
- **Rate Limiting**: API call limiting
- **CSRF Protection**: Token-based protection
- **XSS Prevention**: Content sanitization
- **Secure Storage**: LocalStorage protection

## 🚨 Emergency Procedures

### Credential Compromise
1. **Immediate Actions**:
   - Revoke compromised credentials
   - Update all passwords
   - Rotate API keys
   - Update environment variables

2. **Investigation**:
   - Review access logs
   - Check for data breaches
   - Identify attack vectors
   - Document incident

3. **Recovery**:
   - Deploy security updates
   - Monitor for suspicious activity
   - Update security measures
   - Notify stakeholders

### Data Breach
1. **Containment**:
   - Isolate affected systems
   - Block suspicious IPs
   - Disable compromised accounts
   - Backup critical data

2. **Assessment**:
   - Determine breach scope
   - Identify affected data
   - Assess damage impact
   - Document findings

3. **Recovery**:
   - Restore from backups
   - Implement additional security
   - Monitor for reoccurrence
   - Update incident response

## 📞 Security Contacts

- **Security Team**: security@maiyahospital.com
- **Emergency Contact**: +91-XXXXXXXXXX
- **Hosting Provider**: Render Support
- **Database Provider**: MongoDB Atlas Support

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Security Headers](https://securityheaders.com/)
- [Mozilla Security Guidelines](https://infosec.mozilla.org/guidelines/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

---

**Last Updated**: December 2024
**Version**: 1.0
**Maintained By**: Development Team 