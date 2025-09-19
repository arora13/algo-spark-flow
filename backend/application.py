from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime, timedelta

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = 'algoflow-super-secret-key-2024'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///algoflow.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'algoflow-jwt-secret-key-2024'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)

# Initialize extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)  # Added name field
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'name': self.name,
            'created_at': self.created_at.isoformat(),
            'last_login': self.last_login.isoformat() if self.last_login else None
        }

class Problem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    difficulty = db.Column(db.String(20), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'difficulty': self.difficulty,
            'category': self.category,
            'created_at': self.created_at.isoformat()
        }

class UserProgress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    completed_algorithms = db.Column(db.JSON, default=list)
    solved_problems = db.Column(db.JSON, default=list)
    total_study_time = db.Column(db.Integer, default=0)
    current_streak = db.Column(db.Integer, default=0)
    longest_streak = db.Column(db.Integer, default=0)
    last_activity_date = db.Column(db.DateTime)
    
    def to_dict(self):
        return {
            'completed_algorithms': self.completed_algorithms,
            'solved_problems': self.solved_problems,
            'total_study_time': self.total_study_time,
            'current_streak': self.current_streak,
            'longest_streak': self.longest_streak,
            'last_activity_date': self.last_activity_date.isoformat() if self.last_activity_date else None
        }

class UserActivity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    score = db.Column(db.Integer, default=0)
    time_spent = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
            'name': self.name,
            'score': self.score,
            'time_spent': self.time_spent,
            'created_at': self.created_at.isoformat()
        }

# Routes
@app.route('/')
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'AlgoFlow Backend is running!',
        'timestamp': datetime.utcnow().isoformat()
    })

@app.route('/api/health')
def api_health():
    return jsonify({
        'status': 'healthy',
        'message': 'AlgoFlow Backend is running!',
        'timestamp': datetime.utcnow().isoformat()
    })

# Authentication endpoints (matching frontend expectations)
@app.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        if not data or not data.get('email') or not data.get('password') or not data.get('name'):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Check if user already exists
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already exists'}), 400
        
        # Create new user
        password_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        user = User(
            username=data['email'],  # Use email as username
            email=data['email'],
            name=data['name'],
            password_hash=password_hash
        )
        
        db.session.add(user)
        db.session.commit()
        
        # Create access token
        access_token = create_access_token(identity=user.id)
        
        return jsonify({
            'message': 'User created successfully',
            'user': user.to_dict(),
            'access_token': access_token
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Missing email or password'}), 400
        
        user = User.query.filter_by(email=data['email']).first()
        
        if not user or not bcrypt.check_password_hash(user.password_hash, data['password']):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Update last login
        user.last_login = datetime.utcnow()
        db.session.commit()
        
        access_token = create_access_token(identity=user.id)
        
        return jsonify({
            'message': 'Login successful',
            'user': user.to_dict(),
            'access_token': access_token
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# User profile endpoint
@app.route('/api/user/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        user_id = get_jwt_identity()
        user = User.query.get_or_404(user_id)
        
        # Get or create user progress
        progress = UserProgress.query.filter_by(user_id=user_id).first()
        if not progress:
            progress = UserProgress(user_id=user_id)
            db.session.add(progress)
            db.session.commit()
        
        return jsonify({
            'user': user.to_dict(),
            'progress': progress.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Progress tracking endpoints
@app.route('/api/progress/update', methods=['POST'])
@jwt_required()
def update_progress():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        # Get or create user progress
        progress = UserProgress.query.filter_by(user_id=user_id).first()
        if not progress:
            progress = UserProgress(user_id=user_id)
            db.session.add(progress)
        
        # Update progress based on activity type
        if data.get('activity_type') == 'algorithm' and data.get('algorithm_id'):
            if data['algorithm_id'] not in progress.completed_algorithms:
                progress.completed_algorithms.append(data['algorithm_id'])
        
        elif data.get('activity_type') == 'problem' and data.get('problem_id'):
            if data['problem_id'] not in progress.solved_problems:
                progress.solved_problems.append(data['problem_id'])
        
        # Update study time
        if data.get('time_spent'):
            progress.total_study_time += data['time_spent']
        
        # Update streak (simple logic)
        progress.current_streak += 1
        if progress.current_streak > progress.longest_streak:
            progress.longest_streak = progress.current_streak
        
        progress.last_activity_date = datetime.utcnow()
        
        # Create activity record
        activity = UserActivity(
            user_id=user_id,
            type=data.get('activity_type', 'unknown'),
            name=data.get('activity_name', 'Unknown Activity'),
            score=data.get('score', 0),
            time_spent=data.get('time_spent', 0)
        )
        
        db.session.add(activity)
        db.session.commit()
        
        return jsonify({
            'message': 'Progress updated successfully',
            'progress': progress.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/activities', methods=['GET'])
@jwt_required()
def get_activities():
    try:
        user_id = get_jwt_identity()
        limit = request.args.get('limit', 10, type=int)
        
        activities = UserActivity.query.filter_by(user_id=user_id)\
            .order_by(UserActivity.created_at.desc())\
            .limit(limit).all()
        
        return jsonify({
            'activities': [activity.to_dict() for activity in activities]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/problems', methods=['GET'])
def get_problems():
    try:
        problems = Problem.query.all()
        return jsonify([problem.to_dict() for problem in problems]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Initialize database tables
def create_tables():
    with app.app_context():
        db.create_all()

# Create tables when the app starts
create_tables()

# WSGI entry point for Elastic Beanstalk
application = app

if __name__ == '__main__':
    app.run(debug=True)