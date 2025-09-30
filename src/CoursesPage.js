import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CourseCatalog from './components/CourseCatalog';
import EnrollmentList from './components/EnrollmentList';
import './App.css';

function CoursesPage() {
  const [studentId, setStudentId] = useState(null);
  const [refreshEnrollment, setRefreshEnrollment] = useState(0);

  useEffect(() => {
    // In a real app, you would get this from your auth system
    setStudentId(1); // Assuming the admin user with ID 1 is logged in
  }, []);

  const handleEnrollSuccess = () => {
    setRefreshEnrollment(prev => prev + 1); // Trigger refresh
  };

  return (
    <div className="courses-page">
      <Header />
      <div className="content">
        <CourseCatalog 
          studentId={studentId} 
          onEnrollSuccess={handleEnrollSuccess} 
        />
        {studentId && (
          <EnrollmentList 
            studentId={studentId} 
            key={refreshEnrollment} // This forces remount on change
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default CoursesPage;