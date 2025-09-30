import React, { useState } from 'react';
import AuthMessage from './AuthMessage';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Basic validation
    if (!formData.username || !formData.password) {
      setStatus({ type: 'error', message: 'Both username and password are required' });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setStatus({ 
        type: 'success', 
        message: 'Login successful! Redirecting...' 
      });
      
      // Store student ID in localStorage
      localStorage.setItem('studentId', data.student_id);
      
      // Redirect to courses page
      navigate('/courses');
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.message || 'Invalid username or password' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={isSubmitting ? 'loading' : ''}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>

          <div className="form-footer">
            <a href="#forgot-password">Forgot Password?</a>
            <p>Don't have an account? <a href="/signup">Sign up</a></p>
          </div>
        </form>

        <div className="message-container">
          <AuthMessage status={status} />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;