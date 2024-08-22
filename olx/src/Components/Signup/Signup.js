import React, { useState, useContext } from 'react';

import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';



export default function Signup() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPinCode] = useState('');


  const { auth,db } = useContext(FirebaseContext);


  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        return updateProfile(result.user, { displayName: username })
          .then(() => {
            // After updating the profile, add the user data to Firestore
            return addDoc(collection(db, 'users'), {
              id: result.user.uid,
              username: username,
              email: email,
              phone: phone,
              address:address,
              pincode:pincode
            });
          });
      })
      .then(() => {
        console.log('User profile updated and data added to Firestore successfully');
        navigate('/login'); // Redirect to login page
      })
      .catch((error) => {
        console.error('Error creating user or adding data to Firestore:', error.message);
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            onBlur={() => {
              if (phone.length !== 10) {
                alert('Pone Number must be exactly 10 digits long');
              }
            }}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            onBlur={() => {
              if (password.length < 6) {
                alert('Password must be  6 digits long or more');
              }
            }}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Address</label>
          <br />
          <input
            className="input"
            type="text"
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
            id="fname"
            name="address"
            defaultValue="House Number,city,district"
          />
          <label htmlFor="pincode">Pin Code</label>
            <br />
            <input
              className="input"
              type="number"
              id="pincode"
              value={pincode}
              onChange={(e) => setPinCode(e.target.value)}
              onBlur={() => {
                if (pincode.length !== 6) {
                  alert('Pin Code must be exactly 6 digits long');
                }
              }}
              name="pincode"
            />
          <br />
          <button>Signup</button>
        </form>
        <br/>
        <a href='/login' class="center-link">Login</a>
        </div>
    </div>
  );
}
