import os
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime

# Get MongoDB connection string from environment variable
MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/')
DB_NAME = os.environ.get('DB_NAME', 'resume_builder')

# Create MongoDB client
client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# Collections
resumes = db.resumes
users = db.users

def get_resume_by_id(resume_id):
    """Get resume by ID."""
    try:
        resume = resumes.find_one({'_id': ObjectId(resume_id)})
        if resume:
            resume['id'] = str(resume['_id'])
            del resume['_id']
        return resume
    except Exception as e:
        print(f"Error getting resume: {e}")
        return None

def get_resumes_by_user(user_id):
    """Get all resumes for a user."""
    try:
        user_resumes = list(resumes.find({'user_id': user_id}))
        for resume in user_resumes:
            resume['id'] = str(resume['_id'])
            del resume['_id']
        return user_resumes
    except Exception as e:
        print(f"Error getting user resumes: {e}")
        return []

def save_resume(resume_data):
    """Save or update a resume."""
    try:
        resume_id = resume_data.get('id')
        
        # Convert string ID to ObjectId for MongoDB
        if resume_id:
            # Update existing resume
            resume_data['updated_at'] = datetime.utcnow()
            result = resumes.update_one(
                {'_id': ObjectId(resume_id)},
                {'$set': resume_data}
            )
            return str(resume_id) if result.modified_count > 0 else None
        else:
            # Create new resume
            resume_data['created_at'] = datetime.utcnow()
            resume_data['updated_at'] = datetime.utcnow()
            result = resumes.insert_one(resume_data)
            return str(result.inserted_id)
    except Exception as e:
        print(f"Error saving resume: {e}")
        return None

def delete_resume(resume_id):
    """Delete a resume."""
    try:
        result = resumes.delete_one({'_id': ObjectId(resume_id)})
        return result.deleted_count > 0
    except Exception as e:
        print(f"Error deleting resume: {e}")
        return False