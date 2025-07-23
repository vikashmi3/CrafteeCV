from flask import Blueprint, request, jsonify
from utils.auth import token_required
from utils.db import get_resume_by_id, get_resumes_by_user, save_resume, delete_resume

# Create Blueprint
resume_bp = Blueprint('resume', __name__)

@resume_bp.route('/', methods=['POST'])
@token_required
def create_resume():
    """Create a new resume."""
    try:
        data = request.json
        user_id = request.user_id
        
        # Validate request data
        if not data or not data.get('title') or not data.get('data'):
            return jsonify({'success': False, 'message': 'Missing required fields'}), 400
        
        # Add user_id to resume data
        data['user_id'] = user_id
        
        # Save resume to database
        resume_id = save_resume(data)
        
        if resume_id:
            return jsonify({
                'success': True, 
                'message': 'Resume created successfully',
                'id': resume_id
            })
        else:
            return jsonify({'success': False, 'message': 'Failed to create resume'}), 500
    
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@resume_bp.route('/<resume_id>', methods=['GET'])
@token_required
def get_resume(resume_id):
    """Get a resume by ID."""
    try:
        user_id = request.user_id
        
        # Get resume from database
        resume = get_resume_by_id(resume_id)
        
        if not resume:
            return jsonify({'success': False, 'message': 'Resume not found'}), 404
        
        # Check if user owns the resume
        if resume.get('user_id') != user_id:
            return jsonify({'success': False, 'message': 'Unauthorized access'}), 403
        
        return jsonify({'success': True, 'data': resume})
    
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@resume_bp.route('/<resume_id>', methods=['PUT'])
@token_required
def update_resume(resume_id):
    """Update a resume."""
    try:
        data = request.json
        user_id = request.user_id
        
        # Validate request data
        if not data:
            return jsonify({'success': False, 'message': 'No data provided'}), 400
        
        # Get resume from database
        resume = get_resume_by_id(resume_id)
        
        if not resume:
            return jsonify({'success': False, 'message': 'Resume not found'}), 404
        
        # Check if user owns the resume
        if resume.get('user_id') != user_id:
            return jsonify({'success': False, 'message': 'Unauthorized access'}), 403
        
        # Update resume data
        data['id'] = resume_id
        data['user_id'] = user_id
        
        # Save updated resume
        updated_id = save_resume(data)
        
        if updated_id:
            return jsonify({
                'success': True, 
                'message': 'Resume updated successfully',
                'id': updated_id
            })
        else:
            return jsonify({'success': False, 'message': 'Failed to update resume'}), 500
    
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@resume_bp.route('/<resume_id>', methods=['DELETE'])
@token_required
def delete_resume_by_id(resume_id):
    """Delete a resume."""
    try:
        user_id = request.user_id
        
        # Get resume from database
        resume = get_resume_by_id(resume_id)
        
        if not resume:
            return jsonify({'success': False, 'message': 'Resume not found'}), 404
        
        # Check if user owns the resume
        if resume.get('user_id') != user_id:
            return jsonify({'success': False, 'message': 'Unauthorized access'}), 403
        
        # Delete resume
        if delete_resume(resume_id):
            return jsonify({'success': True, 'message': 'Resume deleted successfully'})
        else:
            return jsonify({'success': False, 'message': 'Failed to delete resume'}), 500
    
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@resume_bp.route('/', methods=['GET'])
@token_required
def get_user_resumes():
    """Get all resumes for a user."""
    try:
        user_id = request.user_id
        
        # Get resumes from database
        resumes = get_resumes_by_user(user_id)
        
        return jsonify({'success': True, 'data': resumes})
    
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500