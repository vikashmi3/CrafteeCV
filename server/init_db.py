import os
from pymongo import MongoClient
from werkzeug.security import generate_password_hash
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get MongoDB connection string from environment variable
MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/')
DB_NAME = os.environ.get('DB_NAME', 'resume_builder')

def init_db():
    """Initialize database with sample data."""
    try:
        # Connect to MongoDB
        client = MongoClient(MONGO_URI)
        db = client[DB_NAME]
        
        # Clear existing data
        db.users.drop()
        db.resumes.drop()
        
        # Create sample user
        sample_user = {
            'email': 'user@example.com',
            'password': generate_password_hash('password123'),
            'name': 'Sample User',
        }
        
        user_id = db.users.insert_one(sample_user).inserted_id
        
        # Create sample resume
        sample_resume = {
            'title': 'My Sample Resume',
            'user_id': str(user_id),
            'template': 'modern',
            'data': {
                'personalInfo': {
                    'firstName': 'John',
                    'lastName': 'Doe',
                    'email': 'john.doe@example.com',
                    'phone': '(123) 456-7890',
                    'address': '123 Main St',
                    'city': 'Anytown',
                    'state': 'CA',
                    'zipCode': '12345',
                    'objective': 'Experienced software developer seeking challenging opportunities.'
                },
                'education': [
                    {
                        'id': '1',
                        'institution': 'University of Example',
                        'degree': 'Bachelor of Science',
                        'fieldOfStudy': 'Computer Science',
                        'startDate': '2016-09-01',
                        'endDate': '2020-05-31',
                        'gpa': '3.8',
                        'description': 'Dean\'s List, Computer Science Club'
                    }
                ],
                'experience': [
                    {
                        'id': '1',
                        'company': 'Tech Company Inc.',
                        'position': 'Software Developer',
                        'location': 'San Francisco, CA',
                        'startDate': '2020-06-01',
                        'endDate': '',
                        'current': True,
                        'description': '- Developed web applications using React and Node.js\n- Implemented RESTful APIs\n- Collaborated with cross-functional teams'
                    }
                ],
                'skills': [
                    {
                        'id': '1',
                        'name': 'JavaScript',
                        'level': 'Advanced'
                    },
                    {
                        'id': '2',
                        'name': 'React',
                        'level': 'Intermediate'
                    },
                    {
                        'id': '3',
                        'name': 'Node.js',
                        'level': 'Intermediate'
                    }
                ],
                'projects': [
                    {
                        'id': '1',
                        'title': 'Personal Portfolio',
                        'description': 'A responsive portfolio website showcasing my projects and skills.',
                        'technologies': 'HTML, CSS, JavaScript',
                        'link': 'https://example.com/portfolio'
                    }
                ]
            }
        }
        
        db.resumes.insert_one(sample_resume)
        
        print("Database initialized with sample data.")
    
    except Exception as e:
        print(f"Error initializing database: {e}")

if __name__ == '__main__':
    init_db()