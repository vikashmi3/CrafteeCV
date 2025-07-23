def validate_resume_data(data):
    """Validate resume data."""
    errors = []
    
    # Check if required fields are present
    if not data.get('title'):
        errors.append('Resume title is required')
    
    if not data.get('data'):
        errors.append('Resume data is required')
    else:
        # Validate personal info
        personal_info = data.get('data', {}).get('personalInfo', {})
        if not personal_info.get('firstName'):
            errors.append('First name is required')
        if not personal_info.get('lastName'):
            errors.append('Last name is required')
        if not personal_info.get('email'):
            errors.append('Email is required')
    
    # Check template
    if not data.get('template'):
        errors.append('Template is required')
    
    return errors

def validate_user_data(data, is_registration=False):
    """Validate user data."""
    errors = []
    
    # Check if required fields are present
    if not data.get('email'):
        errors.append('Email is required')
    
    if is_registration and not data.get('password'):
        errors.append('Password is required')
    elif is_registration and len(data.get('password', '')) < 6:
        errors.append('Password must be at least 6 characters')
    
    return errors