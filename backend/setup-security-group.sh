#!/bin/bash

# AWS Security Group Setup Script for AlgoFlow 🔒
# This script creates the necessary security groups for RDS and EC2

set -e  # Exit on any error

echo "🔒 Setting up AWS Security Groups for AlgoFlow..."

# Configuration
REGION="us-east-1"
VPC_ID=$(aws ec2 describe-vpcs --filters "Name=is-default,Values=true" --query 'Vpcs[0].VpcId' --output text --region $REGION)

echo "📋 Configuration:"
echo "   Region: $REGION"
echo "   VPC ID: $VPC_ID"

# Create security group for RDS
echo "🗄️ Creating RDS security group..."
RDS_SG_ID=$(aws ec2 create-security-group \
    --group-name algoflow-rds-sg \
    --description "Security group for AlgoFlow RDS database" \
    --vpc-id $VPC_ID \
    --region $REGION \
    --query 'GroupId' \
    --output text)

echo "✅ RDS Security Group created: $RDS_SG_ID"

# Create security group for EC2/Elastic Beanstalk
echo "🖥️ Creating EC2 security group..."
EC2_SG_ID=$(aws ec2 create-security-group \
    --group-name algoflow-ec2-sg \
    --description "Security group for AlgoFlow EC2 instances" \
    --vpc-id $VPC_ID \
    --region $REGION \
    --query 'GroupId' \
    --output text)

echo "✅ EC2 Security Group created: $EC2_SG_ID"

# Add rules to RDS security group (allow PostgreSQL from EC2)
echo "🔧 Adding rules to RDS security group..."
aws ec2 authorize-security-group-ingress \
    --group-id $RDS_SG_ID \
    --protocol tcp \
    --port 5432 \
    --source-group $EC2_SG_ID \
    --region $REGION

# Add rules to EC2 security group (allow HTTP/HTTPS from anywhere)
echo "🔧 Adding rules to EC2 security group..."
aws ec2 authorize-security-group-ingress \
    --group-id $EC2_SG_ID \
    --protocol tcp \
    --port 80 \
    --cidr 0.0.0.0/0 \
    --region $REGION

aws ec2 authorize-security-group-ingress \
    --group-id $EC2_SG_ID \
    --protocol tcp \
    --port 443 \
    --cidr 0.0.0.0/0 \
    --region $REGION

# Allow SSH access (optional, for debugging)
aws ec2 authorize-security-group-ingress \
    --group-id $EC2_SG_ID \
    --protocol tcp \
    --port 22 \
    --cidr 0.0.0.0/0 \
    --region $REGION

echo "✅ Security group rules added successfully!"

# Save security group IDs to file
echo "💾 Saving security group IDs to security-groups.txt..."
cat > security-groups.txt << EOF
RDS Security Group ID: $RDS_SG_ID
EC2 Security Group ID: $EC2_SG_ID
VPC ID: $VPC_ID
Region: $REGION
EOF

echo "🔒 Security groups setup complete!"
echo "📝 Security group IDs saved to security-groups.txt"
echo ""
echo "📋 Next steps:"
echo "1. Update setup-rds.sh with RDS security group ID: $RDS_SG_ID"
echo "2. Update deploy.sh with EC2 security group ID: $EC2_SG_ID"
echo "3. Run setup-rds.sh to create the database"
echo "4. Run deploy.sh to deploy the application"
