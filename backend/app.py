from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import os
import sys
import tempfile
import subprocess
from pathlib import Path
from dotenv import load_dotenv

# Add the CLI tool to the path
cli_path = Path(__file__).parent.parent / "algoflow-cli"
sys.path.insert(0, str(cli_path))

try:
    from utils import load_problems, get_problem
    from grader import grade
except ImportError:
    print("Warning: CLI tools not available")
    load_problems = None
    get_problem = None
    grade = None

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configuration - the magic happens here! ✨
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-change-this-in-production')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///algoflow.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-change-this')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)

# Initialize extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)  # Allow frontend to talk to backend

# Database Models - where we store all the user data! 🗄️
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    
    # Relationships - users can have progress and activities
    progress = db.relationship('UserProgress', backref='user', lazy=True, uselist=False)
    activities = db.relationship('UserActivity', backref='user', lazy=True)
    
    def __repr__(self):
        return f'<User {self.email}>'

class UserProgress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    completed_algorithms = db.Column(db.Text, default='[]')  # JSON string of algorithm IDs
    solved_problems = db.Column(db.Text, default='[]')  # JSON string of problem IDs
    total_study_time = db.Column(db.Integer, default=0)  # in minutes
    current_streak = db.Column(db.Integer, default=0)
    longest_streak = db.Column(db.Integer, default=0)
    last_activity_date = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class UserActivity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    activity_type = db.Column(db.String(50), nullable=False)  # 'algorithm', 'problem', 'study_session'
    activity_name = db.Column(db.String(200), nullable=False)
    score = db.Column(db.Integer, default=0)
    time_spent = db.Column(db.Integer, default=0)  # in minutes
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# API Routes - the endpoints that make everything work! 🚀

@app.route('/api/health', methods=['GET'])
def health_check():
    """Simple health check - is our API alive? 💓"""
    return jsonify({
        'status': 'healthy',
        'message': 'AlgoFlow API is running! 🦉',
        'timestamp': datetime.utcnow().isoformat()
    })

@app.route('/api/auth/register', methods=['POST'])
def register():
    """Create a new user account - welcome to the family! 🎉"""
    try:
        data = request.get_json()
        
        # Validate input data
        if not data or not data.get('email') or not data.get('password') or not data.get('name'):
            return jsonify({'error': 'Missing required fields'}), 400
        
        email = data['email'].lower().strip()
        password = data['password']
        name = data['name'].strip()
        
        # Check if user already exists
        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'Email already registered'}), 400
        
        # Create new user
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(email=email, name=name, password_hash=password_hash)
        
        db.session.add(new_user)
        db.session.commit()
        
        # Create initial progress record
        progress = UserProgress(user_id=new_user.id)
        db.session.add(progress)
        db.session.commit()
        
        # Generate JWT token
        access_token = create_access_token(identity=new_user.id)
        
        return jsonify({
            'message': 'User created successfully! 🎉',
            'user': {
                'id': new_user.id,
                'email': new_user.email,
                'name': new_user.name
            },
            'access_token': access_token
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Registration failed', 'details': str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    """Log in existing user - welcome back! 👋"""
    try:
        data = request.get_json()
        
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password required'}), 400
        
        email = data['email'].lower().strip()
        password = data['password']
        
        # Find user
        user = User.query.filter_by(email=email).first()
        
        if not user or not bcrypt.check_password_hash(user.password_hash, password):
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Update last login
        user.last_login = datetime.utcnow()
        db.session.commit()
        
        # Generate JWT token
        access_token = create_access_token(identity=user.id)
        
        return jsonify({
            'message': 'Login successful! 🎉',
            'user': {
                'id': user.id,
                'email': user.email,
                'name': user.name
            },
            'access_token': access_token
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Login failed', 'details': str(e)}), 500

@app.route('/api/user/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """Get current user's profile and progress 📊"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Get progress data
        progress = user.progress
        if not progress:
            progress = UserProgress(user_id=user.id)
            db.session.add(progress)
            db.session.commit()
        
        import json
        completed_algorithms = json.loads(progress.completed_algorithms)
        solved_problems = json.loads(progress.solved_problems)
        
        return jsonify({
            'user': {
                'id': user.id,
                'email': user.email,
                'name': user.name,
                'created_at': user.created_at.isoformat(),
                'last_login': user.last_login.isoformat() if user.last_login else None
            },
            'progress': {
                'completed_algorithms': completed_algorithms,
                'solved_problems': solved_problems,
                'total_study_time': progress.total_study_time,
                'current_streak': progress.current_streak,
                'longest_streak': progress.longest_streak,
                'last_activity_date': progress.last_activity_date.isoformat() if progress.last_activity_date else None
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to get profile', 'details': str(e)}), 500

@app.route('/api/progress/update', methods=['POST'])
@jwt_required()
def update_progress():
    """Update user's learning progress - keep going! 💪"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        if not data or not data.get('activity_type'):
            return jsonify({'error': 'Activity type required'}), 400
        
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        progress = user.progress
        if not progress:
            progress = UserProgress(user_id=user.id)
            db.session.add(progress)
        
        import json
        
        # Update based on activity type
        activity_type = data['activity_type']
        
        if activity_type == 'algorithm':
            algorithm_id = data.get('algorithm_id')
            if algorithm_id:
                completed = json.loads(progress.completed_algorithms)
                if algorithm_id not in completed:
                    completed.append(algorithm_id)
                    progress.completed_algorithms = json.dumps(completed)
        
        elif activity_type == 'problem':
            problem_id = data.get('problem_id')
            if problem_id:
                solved = json.loads(progress.solved_problems)
                if problem_id not in solved:
                    solved.append(problem_id)
                    progress.solved_problems = json.dumps(solved)
        
        elif activity_type == 'study_session':
            time_spent = data.get('time_spent', 0)
            progress.total_study_time += time_spent
        
        # Update streak
        today = datetime.utcnow().date()
        if progress.last_activity_date:
            last_date = progress.last_activity_date.date()
            if today == last_date:
                # Same day, no change
                pass
            elif (today - last_date).days == 1:
                # Consecutive day
                progress.current_streak += 1
            else:
                # Streak broken
                progress.current_streak = 1
        else:
            progress.current_streak = 1
        
        progress.longest_streak = max(progress.longest_streak, progress.current_streak)
        progress.last_activity_date = datetime.utcnow()
        
        # Create activity record
        activity = UserActivity(
            user_id=user_id,
            activity_type=activity_type,
            activity_name=data.get('activity_name', ''),
            score=data.get('score', 0),
            time_spent=data.get('time_spent', 0)
        )
        db.session.add(activity)
        
        db.session.commit()
        
        return jsonify({
            'message': 'Progress updated successfully! 🎉',
            'progress': {
                'completed_algorithms': json.loads(progress.completed_algorithms),
                'solved_problems': json.loads(progress.solved_problems),
                'total_study_time': progress.total_study_time,
                'current_streak': progress.current_streak,
                'longest_streak': progress.longest_streak
            }
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update progress', 'details': str(e)}), 500

@app.route('/api/activities', methods=['GET'])
@jwt_required()
def get_activities():
    """Get user's recent activities - see how awesome you are! 📈"""
    try:
        user_id = get_jwt_identity()
        limit = request.args.get('limit', 10, type=int)
        
        activities = UserActivity.query.filter_by(user_id=user_id)\
            .order_by(UserActivity.created_at.desc())\
            .limit(limit).all()
        
        return jsonify({
            'activities': [{
                'id': activity.id,
                'type': activity.activity_type,
                'name': activity.activity_name,
                'score': activity.score,
                'time_spent': activity.time_spent,
                'created_at': activity.created_at.isoformat()
            } for activity in activities]
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to get activities', 'details': str(e)}), 500

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'cli_available': load_problems is not None and get_problem is not None and grade is not None
    }), 200

# Debug endpoint to check users
@app.route('/api/debug/users', methods=['GET'])
def debug_users():
    """Debug endpoint to check registered users"""
    try:
        users = User.query.all()
        return jsonify({
            'total_users': len(users),
            'users': [{
                'id': user.id,
                'email': user.email,
                'name': user.name,
                'created_at': user.created_at.isoformat() if user.created_at else None,
                'last_login': user.last_login.isoformat() if user.last_login else None
            } for user in users]
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# API endpoint for running code with CLI tool
@app.route('/api/run-code', methods=['POST'])
def run_code():
    """Run code using the AlgoFlow CLI tool"""
    try:
        if not load_problems or not get_problem or not grade:
            return jsonify({'error': 'CLI tools not available'}), 500
        
        data = request.get_json()
        code = data.get('code', '')
        algorithm = data.get('algorithm', '')
        problem_id = data.get('problemId', 1)
        
        if not code or not algorithm:
            return jsonify({'error': 'Missing code or algorithm parameter'}), 400
        
        # Load problems
        problems = load_problems()
        
        # Get the specific problem
        problem = get_problem(problems, algorithm, problem_id)
        if not problem:
            return jsonify({'error': f'Problem {problem_id} not found for {algorithm}'}), 404
        
        # Create a temporary file with the user's code
        with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as temp_file:
            temp_file.write(code)
            temp_file_path = temp_file.name
        
        try:
            # Create a simple solve function wrapper
            def solve_wrapper(input_data):
                # Import the user's code
                import importlib.util
                spec = importlib.util.spec_from_file_location("user_solution", temp_file_path)
                user_module = importlib.util.module_from_spec(spec)
                spec.loader.exec_module(user_module)
                
                # Call the solve function
                if hasattr(user_module, 'solve'):
                    return user_module.solve(input_data)
                else:
                    raise AttributeError("No 'solve' function found in your code")
            
            # Grade the solution
            results = grade(solve_wrapper, problem, solution_file=temp_file_path)
            
            return jsonify({"results": results}), 200
            
        finally:
            # Clean up temporary file
            if os.path.exists(temp_file_path):
                os.unlink(temp_file_path)
                
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Database initialization - create tables if they don't exist
@app.before_first_request
def create_tables():
    """Create database tables - the foundation of our app! 🏗️"""
    db.create_all()
    print("Database tables created successfully! 🎉")

# WSGI entry point for Elastic Beanstalk
application = app

if __name__ == '__main__':
    # Development server - for local testing
    app.run(debug=True, host='0.0.0.0', port=5000)
