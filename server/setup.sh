#!/bin/bash

echo "🚀 Setting up Algo Spark Backend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🎯 To start the backend server:"
    echo "   npm run dev    # Development mode with auto-restart"
    echo "   npm start      # Production mode"
    echo ""
    echo "📊 The server will run on http://localhost:3001"
    echo "🔍 Health check: http://localhost:3001/api/health"
    echo ""
    echo "💡 Make sure your frontend is configured to connect to this backend!"
else
    echo "❌ Failed to install dependencies. Please check your internet connection and try again."
    exit 1
fi
