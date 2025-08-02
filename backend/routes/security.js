const express = require('express');
const router = express.Router();
const { securityMonitor } = require('../security/securityMiddleware');

// Admin-only security stats endpoint
router.get('/stats', (req, res) => {
  // In production, add proper admin authentication
  const adminKey = req.headers['x-admin-key'];
  if (process.env.NODE_ENV === 'production' && adminKey !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const stats = securityMonitor.getStats();
  res.json({
    timestamp: new Date().toISOString(),
    stats,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Security alerts endpoint
router.get('/alerts', (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (process.env.NODE_ENV === 'production' && adminKey !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  res.json({
    timestamp: new Date().toISOString(),
    suspiciousActivities: securityMonitor.suspiciousActivities.slice(-50), // Last 50 activities
    totalBlocked: securityMonitor.blockedRequests,
    totalRateLimited: securityMonitor.rateLimitedRequests
  });
});

// Security health check
router.get('/health', (req, res) => {
  res.json({
    status: 'secure',
    timestamp: new Date().toISOString(),
    securityFeatures: {
      rateLimiting: true,
      inputSanitization: true,
      corsProtection: true,
      securityHeaders: true,
      xssProtection: true,
      csrfProtection: true
    }
  });
});

module.exports = router; 