# 🚀 AlgoFlow Backend Deployment Guide

This guide will help you deploy the AlgoFlow Flask backend to AWS with PostgreSQL database.

## 📋 Prerequisites

Before you start, make sure you have:

1. **AWS CLI** installed and configured
   ```bash
   aws configure
   ```

2. **Elastic Beanstalk CLI** installed
   ```bash
   pip install awsebcli
   ```

3. **Docker** (optional, for local testing)

## 🏗️ Architecture Overview

```
Frontend (React) → API Gateway → Elastic Beanstalk (Flask) → RDS (PostgreSQL)
```

## 🚀 Step-by-Step Deployment

### Step 1: Set Up Security Groups

First, create the necessary security groups:

```bash
cd backend
./setup-security-group.sh
```

This will create:
- RDS security group (allows PostgreSQL access from EC2)
- EC2 security group (allows HTTP/HTTPS from internet)

### Step 2: Create RDS Database

Set up your PostgreSQL database:

```bash
# Update the security group ID in setup-rds.sh first
./setup-rds.sh
```

This will create:
- PostgreSQL RDS instance
- Database with proper security settings
- Connection credentials

### Step 3: Deploy Backend to Elastic Beanstalk

Deploy your Flask application:

```bash
./deploy.sh
```

This will:
- Initialize Elastic Beanstalk
- Create the application environment
- Deploy your code
- Set up environment variables

### Step 4: Configure Environment Variables

After deployment, set your database URL:

```bash
# Get the connection string from rds-credentials.txt
eb setenv DATABASE_URL="postgresql://username:password@your-rds-endpoint:5432/algoflow"
```

### Step 5: Initialize Database

Run database migrations:

```bash
eb ssh
python -c "from app import app, db; app.app_context().push(); db.create_all()"
```

## 🔧 Local Development Setup

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp env.example .env
```

Edit `.env` with your local settings:

```env
SECRET_KEY=your-local-secret-key
JWT_SECRET_KEY=your-local-jwt-key
DATABASE_URL=sqlite:///algoflow.db
FLASK_ENV=development
FLASK_DEBUG=True
```

### 3. Run Locally

```bash
python app.py
```

Your API will be available at `http://localhost:5000`

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/user/profile` - Get user profile (requires JWT)

### Progress Tracking
- `POST /api/progress/update` - Update learning progress
- `GET /api/activities` - Get user activities

### Health Check
- `GET /api/health` - API health status

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - Bcrypt for password security
- **CORS Protection** - Configured for frontend access
- **Environment Variables** - Sensitive data in env vars
- **Database Encryption** - RDS encryption at rest

## 📈 Monitoring & Logs

### View Logs
```bash
eb logs
```

### Monitor Health
```bash
eb health
```

### Check Status
```bash
eb status
```

## 🛠️ Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check security group rules
   - Verify DATABASE_URL format
   - Ensure RDS instance is running

2. **Deployment Failed**
   - Check Elastic Beanstalk logs
   - Verify all dependencies in requirements.txt
   - Check environment variables

3. **CORS Issues**
   - Verify CORS settings in app.py
   - Check frontend URL configuration

### Useful Commands

```bash
# View detailed logs
eb logs --all

# Restart application
eb restart

# Update environment variables
eb setenv KEY=value

# SSH into instance
eb ssh

# Check application health
curl https://your-app-url.elasticbeanstalk.com/api/health
```

## 💰 Cost Optimization

### Development Environment
- Use `t3.micro` instances
- Single RDS instance (no Multi-AZ)
- Minimal storage allocation

### Production Environment
- Use `t3.small` or larger instances
- Multi-AZ RDS for high availability
- Enable automated backups
- Set up CloudWatch monitoring

## 🔄 CI/CD Pipeline (Optional)

For automated deployments, you can set up:

1. **GitHub Actions** for automatic deployment
2. **AWS CodePipeline** for full CI/CD
3. **Docker containers** for consistent deployments

## 📞 Support

If you encounter issues:

1. Check the logs: `eb logs`
2. Verify AWS permissions
3. Check security group configurations
4. Ensure all environment variables are set

## 🎉 Success!

Once deployed, your API will be available at:
`https://your-app-name.region.elasticbeanstalk.com`

Test it with:
```bash
curl https://your-app-url/api/health
```

You should see:
```json
{
  "status": "healthy",
  "message": "AlgoFlow API is running! 🦉",
  "timestamp": "2024-01-01T00:00:00.000000"
}
```
