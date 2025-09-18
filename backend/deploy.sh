#!/bin/bash

# AWS Deployment Script for AlgoFlow Backend 🚀
# This script deploys the Flask backend to AWS using Elastic Beanstalk

set -e  # Exit on any error

echo "🚀 Starting AlgoFlow Backend Deployment to AWS..."

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Please install it first:"
    echo "   https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

# Check if EB CLI is installed
if ! command -v eb &> /dev/null; then
    echo "❌ Elastic Beanstalk CLI not found. Please install it first:"
    echo "   pip install awsebcli"
    exit 1
fi

# Set variables
APP_NAME="algoflow-backend"
ENVIRONMENT_NAME="algoflow-prod"
REGION="us-east-1"

echo "📋 Configuration:"
echo "   App Name: $APP_NAME"
echo "   Environment: $ENVIRONMENT_NAME"
echo "   Region: $REGION"

# Initialize EB if not already done
if [ ! -f ".elasticbeanstalk/config.yml" ]; then
    echo "🔧 Initializing Elastic Beanstalk..."
    eb init $APP_NAME --region $REGION --platform "Python 3.11"
fi

# Create environment if it doesn't exist
echo "🌍 Creating/updating environment..."
eb create $ENVIRONMENT_NAME --instance-type t3.micro --single-instance

# Set environment variables
echo "⚙️ Setting environment variables..."
eb setenv SECRET_KEY="$(openssl rand -base64 32)"
eb setenv JWT_SECRET_KEY="$(openssl rand -base64 32)"
eb setenv FLASK_ENV="production"
eb setenv FLASK_DEBUG="False"

# Deploy the application
echo "🚀 Deploying application..."
eb deploy

# Get the URL
echo "✅ Deployment complete!"
echo "🌐 Your API is available at:"
eb status | grep "CNAME"

echo ""
echo "🎉 AlgoFlow Backend is now live on AWS!"
echo "📚 Next steps:"
echo "   1. Set up RDS PostgreSQL database"
echo "   2. Update DATABASE_URL environment variable"
echo "   3. Test your API endpoints"
echo "   4. Update frontend to use the new API URL"
