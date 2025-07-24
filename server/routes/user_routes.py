from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from utils.auth import generate_token, token_required
from utils.db import users

# Create Blueprint
user_bp = Blueprint('user', __name__)

@user_bp.route('/register', methods=['POST'])
def register():
    """Register a new user."""
    try:
        data = request.json
        
        # Validate request data
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'success': False, 'message': 'Missing required fields'}), 400
        
        # Check if user already exists
        existing_user = users.find_one({'email': data['email']})
        if existing_user:
            return jsonify({'success': False, 'message': 'Email already registered'}), 409
        
        # Hash password
        hashed_password = generate_password_hash(data['password'])
        
        # Create user
        user = {
            'email': data['email'],
            'password': hashed_password,
            'name': data.get('name', ''),
        }
        
        # Save user to database
        result = users.insert_one(user)
        user_id = str(result.inserted_id)
        
        # Generate token
        token = generate_token(user_id)
        
        return jsonify({
            'success': True,
            'message': 'User registered successfully',
            'token': token,
            'user': {
                'id': user_id,
                'email': user['email'],
                'name': user['name']
            }
        })
    
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@user_bp.route('/login', methods=['POST'])
def login():
    """Login a user."""
    try:
        data = request.json
        
        # Validate request data
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'success': False, 'message': 'Missing required fields'}), 400
        
        # Find user
        user = users.find_one({'email': data['email']})
        
        # Check if user exists and password is correct
        if not user or not check_password_hash(user['password'], data['password']):
            return jsonify({'success': False, 'message': 'Invalid email or password'}), 401
        
        # Generate token
        user_id = str(user['_id'])
        token = generate_token(user_id)
        
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'token': token,
            'user': {
                'id': user_id,
                'email': user['email'],
                'name': user.get('name', '')
            }
        })
    
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@user_bp.route('/profile', methods=['GET'])
@token_required
def get_profile():
    """Get user profile."""
    try:
        user_id = request.user_id
        
        # Find user
        user = users.find_one({'_id': user_id})
        
        if not user:
            return jsonify({'success': False, 'message': 'User not found'}), 404
        
        return jsonify({
            'success': True,
            'user': {
                'id': str(user['_id']),
                'email': user['email'],
                'name': user.get('name', '')
            }
        })
    
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@user_bp.route('/profile', methods=['PUT'])
@token_required
def update_profile():
    """Update user profile."""
    try:
        user_id = request.user_id
        data = request.json
        
        # Validate request data
        if not data:
            return jsonify({'success': False, 'message': 'No data provided'}), 400
        
        # Find user
        user = users.find_one({'_id': user_id})
        
        if not user:
            return jsonify({'success': False, 'message': 'User not found'}), 404
        
        # Update user data
        update_data = {}
        if 'name' in data:
            update_data['name'] = data['name']
        
        if update_data:
            users.update_one({'_id': user_id}, {'$set': update_data})
        
        return jsonify({
            'success': True,
            'message': 'Profile updated successfully'
        })
    
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500