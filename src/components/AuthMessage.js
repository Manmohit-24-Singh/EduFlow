import React from 'react';
import '../App.css';

function AuthMessage({ status }) {
  if (!status || !status.type) return null;

  return (
    <div className={`message-box ${status.type}`}>
      {status.message.split('\n').map((line, i) => (
        <p key={i} className="message-line">{line}</p>
      ))}
    </div>
  );
}

export default AuthMessage;