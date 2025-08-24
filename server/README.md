# Algo Spark Backend

A simple Express.js backend for tracking user analytics and contact form submissions for the Algo Spark algorithm learning platform.

## Features

- **User Tracking**: Track unique users and their page views
- **Page View Analytics**: Monitor which pages are most popular
- **Contact Form Tracking**: Track contact form submissions
- **Real-time Analytics**: Get live analytics data via REST API
- **Health Monitoring**: Health check endpoint for monitoring

## Setup

1. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Start the Server**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

3. **Environment Variables**
   Create a `.env` file (optional):
   ```env
   PORT=3001
   NODE_ENV=development
   ```

## API Endpoints

### Analytics Tracking
- `POST /api/track/pageview` - Track a page view
- `POST /api/contact` - Track contact form submission

### Analytics Data
- `GET /api/analytics` - Get dashboard analytics data
- `GET /api/analytics/users` - Get detailed user data

### Health & Monitoring
- `GET /api/health` - Health check endpoint

## Usage Examples

### Track Page View
```javascript
fetch('http://localhost:3001/api/track/pageview', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-User-ID': 'user_123'
  },
  body: JSON.stringify({
    page: '/contact',
    referrer: '/',
    userAgent: navigator.userAgent
  })
});
```

### Track Contact Submission
```javascript
fetch('http://localhost:3001/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-User-ID': 'user_123'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Question about algorithms',
    message: 'I have a question about...'
  })
});
```

### Get Analytics Data
```javascript
fetch('http://localhost:3001/api/analytics')
  .then(response => response.json())
  .then(data => console.log(data));
```

## Data Structure

The backend stores data in memory (for production, use a database):

### Users
```javascript
{
  id: "user_123",
  firstVisit: "2024-01-01T00:00:00.000Z",
  lastVisit: "2024-01-01T12:00:00.000Z",
  pageViews: 5,
  userAgent: "Mozilla/5.0...",
  lastContact: "2024-01-01T10:00:00.000Z" // optional
}
```

### Page Views
```javascript
{
  id: "view_456",
  userId: "user_123",
  page: "/contact",
  referrer: "/",
  timestamp: "2024-01-01T12:00:00.000Z",
  userAgent: "Mozilla/5.0..."
}
```

### Contact Submissions
```javascript
{
  id: "contact_789",
  userId: "user_123",
  name: "John Doe",
  email: "john@example.com",
  subject: "Question about algorithms",
  message: "I have a question about...",
  timestamp: "2024-01-01T10:00:00.000Z"
}
```

## Production Considerations

1. **Database**: Replace in-memory storage with a proper database (PostgreSQL, MongoDB, etc.)
2. **Authentication**: Add API key authentication for analytics endpoints
3. **Rate Limiting**: Implement rate limiting to prevent abuse
4. **Data Retention**: Implement data retention policies
5. **Monitoring**: Add proper logging and monitoring
6. **CORS**: Configure CORS for your production domain

## Development

The server runs on port 3001 by default. Make sure your frontend is configured to connect to this port for analytics tracking.

For development, the frontend should be running on `http://localhost:5173` (Vite default) and the backend on `http://localhost:3001`.
