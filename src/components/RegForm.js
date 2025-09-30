import React, { useState, useEffect } from 'react';
import AuthMessage from './AuthMessage';
import '../App.css';

function RegForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [redirect, setRedirect] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const { username, email, password, confirmPassword } = formData;
    const errors = [];

    // Username validation
    if (!username) {
      errors.push('Invalid username (Reason: Username is required)');
    } else {
      if (username.length < 3 || username.length > 20) {
        errors.push('Invalid username (Reason: Must be between 3-20 characters)');
      }
      if (!/^[a-zA-Z]/.test(username)) {
        errors.push('Invalid username (Reason: Must start with a letter)');
      }
      if (!/^[a-zA-Z0-9-_]+$/.test(username)) {
        errors.push('Invalid username (Reason: Only letters, numbers, hyphens, underscores allowed)');
      }
    }

    if (!email) {
      errors.push('Invalid email (Reason: Email is required)');
    } else { 
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Invalid email (Reason: Must be valid format like user@example.com)');
      }
      if (/\s/.test(email)) {
        errors.push('Invalid email (Reason: Cannot contain spaces)');
      }
      if (!/\.(com|net|io)$/i.test(email)) {
        errors.push('Invalid email (Reason: Must end with .com, .net, or .io)');
      }
    }  

    // Password validation
    if (!password) {
      errors.push('Invalid password (Reason: Password is required)');
    } else {
      if (password.length < 8) {
        errors.push('Invalid password (Reason: Must be at least 8 characters)');
      }
      if (!/[A-Z]/.test(password)) {
        errors.push('Invalid password (Reason: Needs at least one uppercase letter)');
      }
      if (!/[a-z]/.test(password)) {
        errors.push('Invalid password (Reason: Needs at least one lowercase letter)');
      }
      if (!/[0-9]/.test(password)) {
        errors.push('Invalid password (Reason: Needs at least one number)');
      }
      if (!/[!@#$%^&*()\-_=+[\]{}|;:'",.<>?/`~]/.test(password)) {
        errors.push('Invalid password (Reason: Needs at least one special character)');
      }
      if (/\s/.test(password)) {
        errors.push('Invalid password (Reason: Cannot contain spaces)');
      }
    }

    // Confirm Password validation
    if (!confirmPassword) {
      errors.push('Passwords do not match (Reason: Please confirm your password)');
    } else if (confirmPassword !== password) {
      errors.push('Passwords do not match');
    }

    return errors;
  };

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
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setStatus({
        type: 'error',
        message: validationErrors.join('\n')
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          email: formData.email
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setStatus({ 
        type: 'success', 
        message: 'Registration successful! Redirecting to login...' 
      });
      setTimeout(() => setRedirect(true), 2000);
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.message || 'An error occurred. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (redirect) {
      window.location.href = '/login';
    }
  }, [redirect]);

  return (
    <div className="signup-page">
      <div className="signup-container">
        <form onSubmit={handleSubmit} className="signup-form" noValidate>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Sign Up'}
          </button>
        </form>
      </div>
      <div className="message-container">
        <AuthMessage status={status} />
      </div>
    </div>
  );
}

export default RegForm;