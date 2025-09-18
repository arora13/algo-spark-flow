#!/bin/bash

# AWS RDS Setup Script for AlgoFlow Database 🗄️
# This script creates a PostgreSQL RDS instance for the backend

set -e  # Exit on any error

echo "🗄️ Setting up AWS RDS PostgreSQL for AlgoFlow..."

# Configuration
DB_INSTANCE_ID="algoflow-db"
DB_NAME="algoflow"
DB_USERNAME="algoflow_admin"
DB_PASSWORD="$(openssl rand -base64 32)"
DB_INSTANCE_CLASS="db.t3.micro"
DB_ENGINE="postgres"
DB_ENGINE_VERSION="15.4"
REGION="us-east-1"
VPC_SECURITY_GROUP_ID="sg-xxxxxxxxx"  # You'll need to create this

echo "📋 Database Configuration:"
echo "   Instance ID: $DB_INSTANCE_ID"
echo "   Database Name: $DB_NAME"
echo "   Username: $DB_USERNAME"
echo "   Instance Class: $DB_INSTANCE_CLASS"
echo "   Engine: $DB_ENGINE $DB_ENGINE_VERSION"
echo "   Region: $REGION"

# Create RDS instance
echo "🚀 Creating RDS instance..."
aws rds create-db-instance \
    --db-instance-identifier $DB_INSTANCE_ID \
    --db-instance-class $DB_INSTANCE_CLASS \
    --engine $DB_ENGINE \
    --engine-version $DB_ENGINE_VERSION \
    --master-username $DB_USERNAME \
    --master-user-password $DB_PASSWORD \
    --allocated-storage 20 \
    --storage-type gp2 \
    --db-name $DB_NAME \
    --vpc-security-group-ids $VPC_SECURITY_GROUP_ID \
    --backup-retention-period 7 \
    --multi-az \
    --storage-encrypted \
    --region $REGION

echo "⏳ Waiting for RDS instance to be available..."
aws rds wait db-instance-available \
    --db-instance-identifier $DB_INSTANCE_ID \
    --region $REGION

# Get the endpoint
ENDPOINT=$(aws rds describe-db-instances \
    --db-instance-identifier $DB_INSTANCE_ID \
    --region $REGION \
    --query 'DBInstances[0].Endpoint.Address' \
    --output text)

echo "✅ RDS instance created successfully!"
echo "🌐 Database Endpoint: $ENDPOINT"
echo "🔑 Database Password: $DB_PASSWORD"

# Create connection string
CONNECTION_STRING="postgresql://$DB_USERNAME:$DB_PASSWORD@$ENDPOINT:5432/$DB_NAME"

echo ""
echo "📝 Next Steps:"
echo "1. Update your Elastic Beanstalk environment variable:"
echo "   eb setenv DATABASE_URL=\"$CONNECTION_STRING\""
echo ""
echo "2. Test the connection:"
echo "   psql \"$CONNECTION_STRING\""
echo ""
echo "3. Run database migrations:"
echo "   python -c \"from app import app, db; app.app_context().push(); db.create_all()\""

# Save credentials to file (be careful with this!)
echo "💾 Saving credentials to rds-credentials.txt..."
cat > rds-credentials.txt << EOF
Database Endpoint: $ENDPOINT
Database Name: $DB_NAME
Username: $DB_USERNAME
Password: $DB_PASSWORD
Connection String: $CONNECTION_STRING
EOF

echo "🔒 Credentials saved to rds-credentials.txt"
echo "⚠️  IMPORTANT: Keep this file secure and don't commit it to git!"
