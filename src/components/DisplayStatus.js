import React from 'react';

function DisplayStatus({ type, message }) {
  if (!type || !message) return null; 

  const statusClass = type === 'success' ? 'status-success' : 'status-error';

  return (
    <div className={`status-message ${statusClass}`}>
      {message}
    </div>
  );
}

export default DisplayStatus;