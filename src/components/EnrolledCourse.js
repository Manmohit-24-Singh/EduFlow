import React from 'react';

function EnrolledCourse({ course, onDrop }) {
  return (
    <div className="enrolled-course">
      <div className="course-details">
        <h4>{course.name}</h4>
        <p>Credit Hours: {course.creditHours || 3}</p>
      </div>
      <button 
      onClick={() => onDrop(course.id)} 
      className="drop-btn"
      >
      Drop Course
      </button>
    </div>
  );
}

export default EnrolledCourse;