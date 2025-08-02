# Security Implementation for Maiya Hospital Email System

## 🔒 Security Features Implemented

### 1. **Input Validation & Sanitization**
- **XSS Protection**: Removes dangerous HTML/JavaScript content
- **SQL Injection Prevention**: Input sanitization and parameterized queries
- **Content Filtering**: Blocks malicious scripts and dangerous content
- **Length Limits**: Prevents oversized inputs (max 1000 characters per field)

### 2. **Rate Limiting**
- **General API**: 100 requests per 15 minutes per IP
- **Email Endpoints**: 10 email requests per 15 minutes per IP
- **Prevents**: Spam, DoS attacks, brute force attempts

### 3. **Email Security**
- **Domain Validation**: Only allows trusted email domains
- **Content Scanning**: Blocks emails with malicious content
- **Size Limits**: Maximum 1MB email size
- **Recipient Limits**: Maximum 2 recipients per email
- **Timeout Protection**: 30-second email sending timeout

### 4. **Network Security**
- **CORS Protection**: Restricts cross-origin requests
- **Security Headers**: Comprehensive HTTP security headers
- **HSTS**: Forces HTTPS connections
- **Content Security Policy**: Prevents XSS and injection attacks

### 5. **Request Security**
- **Request Size Limits**: Maximum 1MB per request
- **Field Count Limits**: Maximum 50 fields per form
- **Input Validation**: Real-time validation of all inputs
- **Error Handling**: Secure error messages (no sensitive data leakage)

### 6. **Monitoring & Logging**
- **Request Logging**: All requests logged with timestamps
- **Security Monitoring**: Tracks suspicious activities
- **Rate Limit Tracking**: Monitors blocked requests
- **Performance Monitoring**: Response time tracking

## 🛡️ Security Configurations

### Allowed Email Domains
```javascript
['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com']
```

### Blocked Content Patterns
```javascript
['script', 'javascript:', 'onload', 'onerror', 'eval', 'expression', 'vbscript:', 'data:']
```

### Rate Limiting Rules
- **API Requests**: 100 per 15 minutes
- **Email Requests**: 10 per 15 minutes
- **Request Size**: 1MB maximum
- **Field Count**: 50 maximum per form

## 🔍 Security Endpoints

### Health Check
```
GET /api/health
```
Returns system status and security statistics.

### Security Stats
```
GET /api/security/stats
```
Returns detailed security monitoring data.

## 📧 Email Security Features

### 1. **Secure Email Templates**
- **HTML Sanitization**: All user data sanitized before email generation
- **Content Security**: CSP headers in email HTML
- **XSS Protection**: Script tags and dangerous content removed
- **Responsive Design**: Mobile-friendly email templates

### 2. **Email Validation**
- **Format Validation**: Proper email format checking
- **Domain Validation**: Only trusted domains allowed
- **Content Scanning**: Malicious content detection
- **Size Validation**: Email size limits enforced

### 3. **Email Rate Limiting**
- **Per-User Limits**: 50 emails per hour per user
- **Daily Limits**: 200 emails per day per user
- **Global Limits**: System-wide email limits
- **Timeout Protection**: 30-second sending timeout

## 🚨 Security Monitoring

### Suspicious Activity Detection
- **Rate Limit Violations**: Tracks blocked requests
- **Content Violations**: Logs blocked content attempts
- **Email Abuse**: Monitors email sending patterns
- **Request Patterns**: Analyzes request behavior

### Security Logging
```javascript
{
  timestamp: "2024-01-01T12:00:00.000Z",
  method: "POST",
  url: "/api/appointments",
  status: 429,
  duration: "150ms",
  userAgent: "Mozilla/5.0...",
  ip: "192.168.1.1"
}
```

## 🔧 Security Middleware

### 1. **Input Validation Middleware**
- Validates all form inputs
- Sanitizes user data
- Checks for malicious content
- Enforces field limits

### 2. **Rate Limiting Middleware**
- Applies rate limits to all endpoints
- Tracks request patterns
- Blocks abusive requests
- Provides retry information

### 3. **Security Headers Middleware**
- Sets comprehensive security headers
- Prevents XSS attacks
- Enforces HTTPS
- Controls content loading

## 📊 Security Statistics

The system tracks:
- **Blocked Requests**: Number of security violations
- **Rate Limited Requests**: Number of rate limit violations
- **Suspicious Activities**: List of suspicious behaviors
- **Email Statistics**: Email sending patterns

## 🛠️ Security Best Practices

### 1. **Environment Variables**
- All sensitive data stored in `.env` file
- No hardcoded credentials
- Secure configuration management

### 2. **Error Handling**
- No sensitive data in error messages
- Secure error logging
- Production-safe error responses

### 3. **Database Security**
- Parameterized queries
- Input sanitization
- Connection security
- Timeout protection

### 4. **Email Security**
- SMTP over TLS
- Secure authentication
- Content validation
- Rate limiting

## 🔐 Security Checklist

- [x] Input validation and sanitization
- [x] Rate limiting implementation
- [x] XSS protection
- [x] CORS configuration
- [x] Security headers
- [x] Email content filtering
- [x] Request size limits
- [x] Error handling
- [x] Logging and monitoring
- [x] Domain validation
- [x] Content security policy
- [x] HTTPS enforcement
- [x] Timeout protection
- [x] Suspicious activity detection

## 🚀 Deployment Security

### Production Checklist
- [ ] Use HTTPS in production
- [ ] Set up proper CORS origins
- [ ] Configure environment variables
- [ ] Set up monitoring and alerting
- [ ] Regular security updates
- [ ] Backup and recovery procedures
- [ ] Access control and authentication
- [ ] SSL/TLS certificate management

## 📞 Security Contact

For security issues or questions:
- **Email**: security@maiyahospital.com
- **Emergency**: +91 98450 12345
- **Admin**: social.maiya@gmail.com

---

**Last Updated**: January 2024
**Version**: 1.0.0
**Security Level**: High 