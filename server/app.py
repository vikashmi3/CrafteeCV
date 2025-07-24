import os
from flask import Flask, jsonify
from flask_cors import CORS
from routes.resume_routes import resume_bp
from routes.user_routes import user_bp
from config.config import config

def create_app(config_name='default'):
    """Create Flask application."""
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(config[config_name])
    
    # Enable CORS
    CORS(app)
    
    # Register blueprints
    app.register_blueprint(resume_bp, url_prefix='/api/resumes')
    app.register_blueprint(user_bp, url_prefix='/api/users')
    
    # Health check route
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({"status": "ok"})
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'success': False, 'message': 'Resource not found'}), 404
    
    @app.errorhandler(500)
    def server_error(error):
        return jsonify({'success': False, 'message': 'Internal server error'}), 500
    
    return app

if __name__ == '__main__':
    # Get environment from environment variable or default to development
    env = os.environ.get('FLASK_ENV', 'development')
    app = create_app(env)
    
    # Get port from environment variable or default to 5000
    port = int(os.environ.get('PORT', 5000))
    
    # Run app
    app.run(host='0.0.0.0', port=port)