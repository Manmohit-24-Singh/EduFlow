import React, { useEffect, useState } from 'react';
import EnrolledCourse from './EnrolledCourse';

function EnrollmentList({ studentId }) {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [error, setError] = useState(null);

  const fetchEnrolledCourses = () => {
    fetch(`http://127.0.0.1:8000/student_courses/${studentId}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch enrolled courses');
        return response.json();
      })
      .then(data => {
        setEnrolledCourses(data);
        setError(null);
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error.message);
      });
  };

  useEffect(() => {
    if (studentId) fetchEnrolledCourses();
  }, [studentId]);

  const handleDrop = async (courseId) => {
    setError(null);
    
    try {
      const response = await fetch(`http://127.0.0.1:8000/drop/${studentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: courseId })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to drop course');
      }
  
      // Update local state immediately for better UX
      setEnrolledCourses(prevCourses => 
        prevCourses.filter(course => course.id !== courseId)
      );
      
    } catch (error) {
      console.error('Drop Error:', error);
      setError(error.message);
      // Re-fetch to ensure sync with server
      fetchEnrolledCourses();
    }
  };

  const totalCredits = enrolledCourses.reduce(
    (sum, course) => sum + (course.creditHours || 3), 0
  );

  return (
    <div className="enrollment-list">
      <h2>Your Enrollment List</h2>
      {error && (
        <div className="error-message" style={{ color: 'red', margin: '10px 0' }}>
          {error}
        </div>
      )}
      {enrolledCourses.length === 0 ? (
        <p>No courses enrolled yet.</p>
      ) : (
        <>
          {enrolledCourses.map(course => (
            <EnrolledCourse 
              key={course.id} 
              course={course} 
              onDrop={handleDrop} 
            />
          ))}
          <div className="total-credits">
            <strong>Total Credit Hours: {totalCredits}</strong>
          </div>
        </>
      )}
    </div>
  );
}

export default EnrollmentList;

