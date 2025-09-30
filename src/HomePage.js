import React from 'react';
import Header from './components/Header';
import MainSection from './components/MainSection';
import Footer from './components/Footer';
import './App.css';

function Homepage({ enrolledCourses }) {
  const studentId = 1; 
  return (
    <div className="homepage">
      <Header />
      <MainSection enrolledCourses={enrolledCourses} />
      <Footer />
    </div>
  );
}

export default Homepage;
