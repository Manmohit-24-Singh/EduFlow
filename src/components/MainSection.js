import React, { useEffect, useState } from 'react';
import courseImage from '../images/course1.jpg';

function MainSection() {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [featuredTestimonials, setFeaturedTestimonials] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/courses')
      .then(response => response.json())
      .then(data => {
        const shuffledCourses = [...data].sort(() => 0.5 - Math.random());
        setFeaturedCourses(shuffledCourses.slice(0, 3));
      })
      .catch(error => console.error('Error fetching courses:', error));

    fetch('http://127.0.0.1:8000/testimonials')
      .then(response => response.json())
      .then(data => {
        const shuffledTestimonials = [...data].sort(() => 0.5 - Math.random());
        setFeaturedTestimonials(shuffledTestimonials.slice(0, 2));
      })
      .catch(error => console.error('Error fetching testimonials:', error));
  }, []);

  const renderStars = (rating) => {
    const fullStars = '★'.repeat(Math.floor(rating));
    const emptyStars = '☆'.repeat(5 - Math.ceil(rating));
    return fullStars + emptyStars;
  };

  return (
    <main className="main-section">
      {/* About LMS Section */}
      <section className="about-section">
        <h2>About Our Learning Management System</h2>
        <p>
          Our LMS provides a comprehensive platform for online learning, offering a wide range 
          of courses across various disciplines. With interactive content, expert instructors, 
          and flexible learning paths, we help students achieve their educational goals.
        </p>
      </section>

      {/* Featured Courses Section */}
      <section className="courses-section">
        <h2>Featured Courses</h2>
        <div className="courses-grid">
          {featuredCourses.map((course) => (
            <div key={course.id} className="course-card">
              <img 
                src={courseImage}
                alt={course.name} 
                className="course-image" 
              />
              <h3>{course.name}</h3>
              <p>Instructor: {course.instructor}</p>
              <p>Duration: {course.duration}</p>
              <p className="course-description">{course.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Students Say</h2>
        <div className="testimonials-grid">
          {featuredTestimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="stars">{renderStars(testimonial.rating)}</div>
              <p className="review">"{testimonial.review}"</p>
              <p className="student-name">- {testimonial.studentName}</p>
              <p className="course-name">Course: {testimonial.courseName}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default MainSection;