# EduFlow

A full-stack application for student enrollment and course management, featuring a modern React frontend and a robust Flask API backend.

## 📋 Overview

EduFlow simplifies the process of managing student enrollments and courses in educational institutions. Built with React and Flask, it provides an intuitive interface for administrators, instructors, and students to manage academic operations efficiently.

## ✨ Features

- **Student Management**: Add, view, and manage student profiles
- **Course Management**: Create and organize courses
- **Enrollment System**: Seamless student enrollment in courses
- **RESTful API**: Flask-powered backend for efficient data handling
- **Responsive UI**: Modern React interface for optimal user experience
- **Real-time Updates**: Dynamic data synchronization between frontend and backend

## 🛠️ Tech Stack

### Frontend
- **React** (v19.0.0) - UI framework
- **React Router DOM** (v7.4.0) - Navigation and routing
- **React Scripts** (v5.0.1) - Build tooling

### Backend
- **Flask** - Python web framework
- **Flask API** - RESTful API development

### Testing
- **Jest** - Testing framework
- **React Testing Library** - Component testing

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Python** (v3.7 or higher)
- **pip** - Python package manager

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Manmohit-24-Singh/EduFlow.git
cd EduFlow
```

### 2. Backend Setup (Flask)

```bash
# Install Python dependencies
pip install flask flask-cors

# Or if you have a requirements.txt
pip install -r requirements.txt
```

### 3. Frontend Setup (React)

```bash
# Install Node dependencies
npm install

# Install React Router DOM
npm install react-router-dom
```

## 🎯 Running the Application

**Important:** The Flask backend must be running before starting the React frontend.

### Step 1: Start the Flask Backend

```bash
# Run the Flask API server
python app.py
```

The backend server will start on `http://localhost:5000` (or the port specified in app.py)

### Step 2: Start the React Frontend

In a new terminal window:

```bash
# Start the React development server
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

## 📝 Available Scripts

### Frontend Scripts

#### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000). The page reloads automatically when you make changes.

#### `npm test`
Launches the test runner in interactive watch mode.

#### `npm run build`
Builds the app for production to the `build` folder. The build is optimized and minified for best performance.

#### `npm run eject`
**Note: This is a one-way operation!** Ejects from Create React App to give you full control over configuration files.

## 📂 Project Structure

```
EduFlow/
├── public/              # Static files
├── src/                 # React source files
│   ├── components/      # React components
│   ├── App.js          # Main App component
│   └── index.js        # Entry point
├── app.py              # Flask backend
├── package.json        # Node dependencies
└── README.md          # Project documentation
```

## 🔧 Configuration

### Backend Configuration
The Flask backend can be configured in `app.py`:
- Port number
- Database connections
- CORS settings
- API endpoints

### Frontend Configuration
React app settings can be modified in:
- `package.json` - Dependencies and scripts
- `src/App.js` - Main application logic
- Environment variables (create `.env` file)

## 🧪 Testing

Run the test suite:

```bash
npm test
```

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Deployment Options
- **Frontend**: Deploy to Vercel, Netlify, or GitHub Pages
- **Backend**: Deploy to Heroku, AWS, or DigitalOcean

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Manmohit Singh**
- GitHub: [@Manmohit-24-Singh](https://github.com/Manmohit-24-Singh)

## 🐛 Issues

Found a bug or have a feature request? Please open an issue on the [GitHub Issues](https://github.com/Manmohit-24-Singh/EduFlow/issues) page.

## 📞 Support

For support, please open an issue or contact the maintainer through GitHub.

---
