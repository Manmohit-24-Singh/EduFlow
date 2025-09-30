import React, { useState, useEffect } from 'react';
import CourseItem from './CourseItem';

function CourseCatalog({ studentId, onEnrollSuccess }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/courses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleEnroll = (course) => {
    if (!studentId) {
      console.error('Please log in to enroll in courses');
      return;
    }

    fetch(`http://127.0.0.1:8000/enroll/${studentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(course)
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === "Course enrolled successfully") {
        onEnrollSuccess();
      } else {
        console.error(data.message);
      }
    })
    .catch(error => {
      console.error('Error enrolling in course:', error);
    });
  };

  return (
    <div className="course-catalog">
      <h2>Available Courses</h2>
      <div className="courses-grid">
        {courses.map(course => (
          <CourseItem 
            key={course.id} 
            course={course} 
            onEnroll={handleEnroll} 
          />
        ))}
      </div>
    </div>
  );
}

export default CourseCatalog;