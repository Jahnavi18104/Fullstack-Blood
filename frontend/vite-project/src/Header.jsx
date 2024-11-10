
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Header.css';
// import logo from './wt.png';

// const Header = () => {
//   return (
//     <header className="header">
//       <nav>
//         <div className="logo-container">
//           <Link to="/">
//             <img src={logo} alt="Blood Bank Logo" className="logo" />
//           </Link>
//         </div>
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/about-us">About Us</Link></li>
//           <li><Link to="/donor">Donor</Link></li>
//           <li><Link to="/recipients">Recipients</Link></li>
//           <li><Link to="/blood-availability">Blood Availability</Link></li>
//           <li><Link to="/contact-us">Contact Us</Link></li>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './wt.png';

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const LoginModal = () => setShowLogin(!showLogin);
  const SignupModal = () => {
    setShowSignup(!showSignup);
    setSignupSuccess(false); 
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setSignupSuccess(true); 
    setTimeout(() => {
      setShowSignup(false); // Close modal after 2 seconds
    }, 2000); // Adjust time as needed
  };

  return (
    <header className="header">
      <nav>
        <div className="logo-container">
          
            <img src={logo} alt="Blood Bank Logo" className="logo" />
          
        </div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/donor">Donor</Link></li>
          <li><Link to="/recipients">Recipients</Link></li>
          <li><Link to="/blood-availability">Blood Availability</Link></li>
          <li><Link to="/contact-us">Contact Us</Link></li>
        </ul>
        <div className="auth-buttons">
          <button onClick={LoginModal}>Login</button>
          <button onClick={SignupModal}>Sign Up</button>
        </div>
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={LoginModal}>&times;</span>
            <h2>Login</h2>
            <form name="loginForm" className="auth-form">
              <label>Email:</label>
              <input type="email" name="loginEmail" placeholder="Enter your email" required />
              <label>Password:</label>
              <input type="password" name="loginPassword" placeholder="Enter your password" required />
              <button type="submit" className="auth-button">Login</button>
            </form>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={SignupModal}>&times;</span>
            <h2>Sign Up</h2>
            {!signupSuccess ? (
              <form name="signupForm" className="auth-form" onSubmit={handleSignupSubmit}>
                <label>Username:</label>
                <input type="text" name="signupUsername" placeholder="Enter your username" required />
                <label>Email:</label>
                <input type="email" name="signupEmail" placeholder="Enter your email" required />
                <label>Password:</label>
                <input type="password" name="signupPassword" placeholder="Enter your password" required />
                <button type="submit" className="auth-button">Sign Up</button>
              </form>
            ) : (
              <p className="success-message">You are successfully signed up!</p>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
