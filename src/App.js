import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './HomePage';
import CoursesPage from './CoursesPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';  
import './App.css';

function App() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('enrolledCourses');
    if (saved) {
      setEnrolledCourses(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Homepage enrolledCourses={enrolledCourses} />}
        />

        <Route
          path="/courses"
          element={
            <CoursesPage
              enrolledCourses={enrolledCourses}
              setEnrolledCourses={setEnrolledCourses}
            />
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;