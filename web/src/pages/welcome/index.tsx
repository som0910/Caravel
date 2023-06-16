import React from 'react';

const WelcomeMessage: React.FC = () => {
  return (
    <div className="welcome-message">
      <h1 className="welcome-heading">Welcome!</h1>
      <p className="welcome-text">Thank you for visiting our website.</p>
      <p className="welcome-text">Enjoy your read and have a wonderful day!</p>
      <style jsx>{`
        .welcome-message {
          background-color: #f5f5f5;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          
        }

        .welcome-heading {
          font-size: 28px;
          color: #333;
          margin-bottom: 10px;
        }

        .welcome-text {
          font-size: 18px;
          color: #666;
          margin-bottom: 5px;
        }
      `}</style>
    </div>
  );
};

export default WelcomeMessage;
