// src/SignupPage.js
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import RegForm from './components/RegForm';

function SignupPage() {
  return (
    <div>
      <Header />
      <h2 className="header-form">Sign Up</h2>
      <RegForm />
      <Footer />
    </div>
  );
}

export default SignupPage;