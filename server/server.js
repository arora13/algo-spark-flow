const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// In-memory storage (in production, use a database)
let analytics = {
  users: new Map(),
  impressions: [],
  pageViews: new Map(),
  contactSubmissions: []
};

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://algo-spark.com'],
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());

// Helper function to get user ID from request
const getUserId = (req) => {
  let userId = req.headers['x-user-id'];
  if (!userId) {
    userId = uuidv4();
    req.headers['x-user-id'] = userId;
  }
  return userId;
};

// Track page view
app.post('/api/track/pageview', (req, res) => {
  try {
    const { page, referrer, userAgent } = req.body;
    const userId = getUserId(req);
    const timestamp = new Date().toISOString();
    
    // Track user
    if (!analytics.users.has(userId)) {
      analytics.users.set(userId, {
        id: userId,
        firstVisit: timestamp,
        lastVisit: timestamp,
        pageViews: 0,
        userAgent: userAgent
      });
    } else {
      const user = analytics.users.get(userId);
      user.lastVisit = timestamp;
      user.pageViews += 1;
    }
    
    // Track page view
    const pageView = {
      id: uuidv4(),
      userId,
      page,
      referrer,
      timestamp,
      userAgent
    };
    
    analytics.impressions.push(pageView);
    
    // Track page-specific views
    if (!analytics.pageViews.has(page)) {
      analytics.pageViews.set(page, 0);
    }
    analytics.pageViews.set(page, analytics.pageViews.get(page) + 1);
    
    res.json({ 
      success: true, 
      userId,
      message: 'Page view tracked successfully' 
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to track page view' 
    });
  }
});

// Track contact form submission
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const userId = getUserId(req);
    const timestamp = new Date().toISOString();
    
    const contactSubmission = {
      id: uuidv4(),
      userId,
      name,
      email,
      subject,
      message,
      timestamp
    };
    
    analytics.contactSubmissions.push(contactSubmission);
    
    // Update user data
    if (analytics.users.has(userId)) {
      const user = analytics.users.get(userId);
      user.lastContact = timestamp;
    }
    
    res.json({ 
      success: true, 
      message: 'Contact submission tracked successfully' 
    });
  } catch (error) {
    console.error('Error tracking contact submission:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to track contact submission' 
    });
  }
});

// Get analytics dashboard data
app.get('/api/analytics', (req, res) => {
  try {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Filter recent data
    const recentImpressions = analytics.impressions.filter(
      imp => new Date(imp.timestamp) > last24Hours
    );
    
    const recentContacts = analytics.contactSubmissions.filter(
      contact => new Date(contact.timestamp) > last7Days
    );
    
    // Calculate metrics
    const totalUsers = analytics.users.size;
    const totalImpressions = analytics.impressions.length;
    const totalContacts = analytics.contactSubmissions.length;
    
    // Page view breakdown
    const pageViewsBreakdown = Object.fromEntries(analytics.pageViews);
    
    // Recent activity
    const recentActivity = [
      ...recentImpressions.map(imp => ({
        type: 'pageview',
        page: imp.page,
        timestamp: imp.timestamp
      })),
      ...recentContacts.map(contact => ({
        type: 'contact',
        name: contact.name,
        subject: contact.subject,
        timestamp: contact.timestamp
      }))
    ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 20);
    
    const dashboardData = {
      overview: {
        totalUsers,
        totalImpressions,
        totalContacts,
        recentImpressions: recentImpressions.length,
        recentContacts: recentContacts.length
      },
      pageViews: pageViewsBreakdown,
      recentActivity,
      timestamp: now.toISOString()
    };
    
    res.json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    console.error('Error getting analytics:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get analytics data' 
    });
  }
});

// Get detailed user data
app.get('/api/analytics/users', (req, res) => {
  try {
    const users = Array.from(analytics.users.values()).map(user => ({
      ...user,
      pageViews: user.pageViews || 0
    }));
    
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Error getting user data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get user data' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!' 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Endpoint not found' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Algo Spark Backend running on port ${PORT}`);
  console.log(`📊 Analytics endpoints available at http://localhost:${PORT}/api`);
  console.log(`💚 Health check at http://localhost:${PORT}/api/health`);
});

module.exports = app;
