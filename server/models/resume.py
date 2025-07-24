from datetime import datetime
import uuid

class Resume:
    """Resume model for database operations."""
    
    def __init__(self, user_id, title, data, template, id=None, created_at=None, updated_at=None):
        self.id = id or str(uuid.uuid4())
        self.user_id = user_id
        self.title = title
        self.data = data
        self.template = template
        self.created_at = created_at or datetime.utcnow()
        self.updated_at = updated_at or datetime.utcnow()
    
    def to_dict(self):
        """Convert resume object to dictionary."""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'data': self.data,
            'template': self.template,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
    @classmethod
    def from_dict(cls, data):
        """Create resume object from dictionary."""
        return cls(
            id=data.get('id'),
            user_id=data.get('user_id'),
            title=data.get('title'),
            data=data.get('data'),
            template=data.get('template'),
            created_at=data.get('created_at'),
            updated_at=data.get('updated_at')
        )