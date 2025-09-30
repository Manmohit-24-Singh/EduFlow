import React, { useState } from 'react';
import courseImage from '../images/course1.jpg';

function CourseItem({ course, onEnroll }) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div 
      className="course-item"
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
    >
      <img src={courseImage} alt={course.name} className="course-img" />
      <div className="course-info">
        <h3>{course.name}</h3>
        <p>Instructor: {course.instructor}</p>
        {showDescription && (
          <p className="course-description">{course.description}</p>
        )}
        <button 
          onClick={() => onEnroll(course)} 
          className="enroll-btn"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
}

export default CourseItem;