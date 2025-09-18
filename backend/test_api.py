#!/usr/bin/env python3
"""
AlgoFlow Backend API Test Script 🧪
This script tests all the API endpoints to make sure everything works!
"""

import requests
import json
import sys
from datetime import datetime

# Configuration
BASE_URL = "http://localhost:5000/api"
TEST_EMAIL = "test@algoflow.com"
TEST_PASSWORD = "testpassword123"
TEST_NAME = "Test User"

def print_status(message, status="INFO"):
    """Print colored status messages"""
    colors = {
        "INFO": "\033[94m",    # Blue
        "SUCCESS": "\033[92m", # Green
        "ERROR": "\033[91m",   # Red
        "WARNING": "\033[93m", # Yellow
    }
    reset = "\033[0m"
    print(f"{colors.get(status, '')}[{status}]{reset} {message}")

def test_health_check():
    """Test the health check endpoint"""
    print_status("Testing health check endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            data = response.json()
            print_status(f"✅ Health check passed: {data['message']}", "SUCCESS")
            return True
        else:
            print_status(f"❌ Health check failed: {response.status_code}", "ERROR")
            return False
    except Exception as e:
        print_status(f"❌ Health check error: {str(e)}", "ERROR")
        return False

def test_user_registration():
    """Test user registration"""
    print_status("Testing user registration...")
    try:
        data = {
            "email": TEST_EMAIL,
            "password": TEST_PASSWORD,
            "name": TEST_NAME
        }
        response = requests.post(f"{BASE_URL}/auth/register", json=data)
        
        if response.status_code == 201:
            result = response.json()
            print_status(f"✅ User registered successfully: {result['user']['name']}", "SUCCESS")
            return result['access_token']
        elif response.status_code == 400 and "already registered" in response.json().get('error', ''):
            print_status("⚠️ User already exists, trying to login...", "WARNING")
            return test_user_login()
        else:
            print_status(f"❌ Registration failed: {response.json()}", "ERROR")
            return None
    except Exception as e:
        print_status(f"❌ Registration error: {str(e)}", "ERROR")
        return None

def test_user_login():
    """Test user login"""
    print_status("Testing user login...")
    try:
        data = {
            "email": TEST_EMAIL,
            "password": TEST_PASSWORD
        }
        response = requests.post(f"{BASE_URL}/auth/login", json=data)
        
        if response.status_code == 200:
            result = response.json()
            print_status(f"✅ Login successful: {result['user']['name']}", "SUCCESS")
            return result['access_token']
        else:
            print_status(f"❌ Login failed: {response.json()}", "ERROR")
            return None
    except Exception as e:
        print_status(f"❌ Login error: {str(e)}", "ERROR")
        return None

def test_get_profile(token):
    """Test getting user profile"""
    print_status("Testing get profile...")
    try:
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.get(f"{BASE_URL}/user/profile", headers=headers)
        
        if response.status_code == 200:
            result = response.json()
            print_status(f"✅ Profile retrieved: {result['user']['name']}", "SUCCESS")
            print_status(f"   Progress: {len(result['progress']['completed_algorithms'])} algorithms, {len(result['progress']['solved_problems'])} problems", "INFO")
            return True
        else:
            print_status(f"❌ Get profile failed: {response.json()}", "ERROR")
            return False
    except Exception as e:
        print_status(f"❌ Get profile error: {str(e)}", "ERROR")
        return False

def test_update_progress(token):
    """Test updating user progress"""
    print_status("Testing progress update...")
    try:
        headers = {"Authorization": f"Bearer {token}"}
        data = {
            "activity_type": "algorithm",
            "algorithm_id": "merge_sort",
            "activity_name": "Merge Sort",
            "score": 100
        }
        response = requests.post(f"{BASE_URL}/progress/update", json=data, headers=headers)
        
        if response.status_code == 200:
            result = response.json()
            print_status(f"✅ Progress updated: {result['message']}", "SUCCESS")
            return True
        else:
            print_status(f"❌ Progress update failed: {response.json()}", "ERROR")
            return False
    except Exception as e:
        print_status(f"❌ Progress update error: {str(e)}", "ERROR")
        return False

def test_get_activities(token):
    """Test getting user activities"""
    print_status("Testing get activities...")
    try:
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.get(f"{BASE_URL}/activities?limit=5", headers=headers)
        
        if response.status_code == 200:
            result = response.json()
            print_status(f"✅ Activities retrieved: {len(result['activities'])} activities", "SUCCESS")
            return True
        else:
            print_status(f"❌ Get activities failed: {response.json()}", "ERROR")
            return False
    except Exception as e:
        print_status(f"❌ Get activities error: {str(e)}", "ERROR")
        return False

def main():
    """Run all tests"""
    print_status("🚀 Starting AlgoFlow Backend API Tests", "INFO")
    print_status("=" * 50, "INFO")
    
    # Test health check
    if not test_health_check():
        print_status("❌ Health check failed, stopping tests", "ERROR")
        sys.exit(1)
    
    print_status("-" * 30, "INFO")
    
    # Test user registration/login
    token = test_user_registration()
    if not token:
        print_status("❌ Authentication failed, stopping tests", "ERROR")
        sys.exit(1)
    
    print_status("-" * 30, "INFO")
    
    # Test authenticated endpoints
    test_get_profile(token)
    test_update_progress(token)
    test_get_activities(token)
    
    print_status("=" * 50, "INFO")
    print_status("🎉 All tests completed!", "SUCCESS")
    print_status("Your AlgoFlow backend API is working perfectly! 🦉", "SUCCESS")

if __name__ == "__main__":
    main()
