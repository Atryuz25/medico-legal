# Medico-Legal Application

A web application for managing medical and legal records with role-based access control.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (v6 or higher)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd medico-legal
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the `backend` directory with the following content:
     ```
     MONGODB_URI=mongodb://localhost:27017/medico_legal
     JWT_SECRET=your_secure_jwt_secret
     PORT=3001
     ```

4. **Start MongoDB**
   - Make sure MongoDB is installed and running on your system

5. **Start the backend server**
   ```bash
   # On Windows
   start-backend.bat
   
   # Or manually
   cd backend
   npm start
   ```

6. **Access the application**
   - Open `index.html` in your browser or use a local server
   - The application will be available at `http://localhost:3000`

## Project Structure

- `/backend` - Node.js/Express backend
  - `/models` - Database models
  - `/routes` - API routes
  - `server.js` - Main server file
- `/html` - Frontend HTML files
- `/css` - CSS stylesheets
- `/js` - Client-side JavaScript

## Features

- User registration and authentication
- Role-based access control (Admin, Medical, Legal, Patient)
- Secure JWT-based authentication
- Responsive design

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login

## License

This project is licensed under the MIT License.
