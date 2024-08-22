import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
  const { auth} = useContext(FirebaseContext);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successfully signed in
        alert('User logged in:', userCredential.user);
        navigate('/'); // Redirect to dashboard or any other page
      })
      .catch((error) => {
        console.error('Error logging in:', error.message);
        // Optionally, set an error state and display an error message to the user
      });
  };

  return (
    <div className="login-container">
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt=''></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a href='/signup'>Signup</a>
      </div>
    </div>
  );
}

export default Login;
