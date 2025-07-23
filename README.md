# Resume Builder

A responsive web application for creating professional resumes with real-time preview and PDF export functionality.

## Features

- Form-based resume input (Personal Info, Education, Experience, Skills, Projects)
- Live preview panel that updates as you type
- Multiple resume templates (Modern, Classic, Minimal)
- Download resume as PDF
- User authentication and profile management
- Save and manage multiple resumes
- Responsive design for mobile and desktop

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Flask (Python)
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **PDF Export**: html2canvas, jsPDF
- **Containerization**: Docker, Docker Compose

## Project Structure

```
resume-builder/
├── client/                 # React frontend
│   ├── public/             # Public assets
│   └── src/
│       ├── components/     # React components
│       │   └── resume/     # Resume-specific components
│       │       └── templates/ # Resume templates
│       ├── context/        # React context providers
│       ├── pages/          # Page components
│       └── utils/          # Utility functions
├── server/                 # Flask backend
│   ├── config/             # Configuration files
│   ├── models/             # Data models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── uploads/            # File uploads directory
│   ├── app.py              # Main application file
│   ├── Dockerfile          # Docker configuration for backend
│   └── requirements.txt    # Python dependencies
└── docker-compose.yml      # Docker Compose configuration
```

## Setup Instructions

### Prerequisites

- Node.js and npm
- Python 3.7+
- MongoDB (or Docker for containerized setup)

### Frontend Setup

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the client directory:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```
   npm start
   ```

### Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Create a `.env` file in the server directory:
   ```
   FLASK_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/
   DB_NAME=resume_builder
   JWT_SECRET=your-secret-key-change-in-production
   SECRET_KEY=another-secret-key-change-in-production
   ```

6. Initialize the database with sample data (optional):
   ```
   python init_db.py
   ```

7. Start the Flask server:
   ```
   python app.py
   ```

### Docker Setup (Alternative)

1. Make sure Docker and Docker Compose are installed on your system.

2. Build and start the containers:
   ```
   docker-compose up --build
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## API Endpoints

### Authentication

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Resumes

- `GET /api/resumes` - Get all resumes for the authenticated user
- `POST /api/resumes` - Create a new resume
- `GET /api/resumes/:id` - Get a specific resume
- `PUT /api/resumes/:id` - Update a resume
- `DELETE /api/resumes/:id` - Delete a resume

## Deployment

### Frontend Deployment

The React frontend can be deployed to services like Netlify, Vercel, or AWS Amplify:

1. Build the production version:
   ```
   cd client
   npm run build
   ```

2. Deploy the `build` directory to your hosting service.

### Backend Deployment

The Flask backend can be deployed to services like Heroku, AWS Elastic Beanstalk, or Google Cloud Run:

1. Using Docker (recommended):
   ```
   docker build -t resume-builder-backend ./server
   ```

2. Deploy the Docker image to your cloud provider.

### Database Deployment

For MongoDB, you can use MongoDB Atlas (cloud service) or set up your own MongoDB server.

## License

MIT# resume-builder
