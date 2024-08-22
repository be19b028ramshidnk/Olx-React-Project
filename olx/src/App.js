import React, {useEffect, useContext} from 'react';
import './App.css';
import Home from './Pages/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import { AuthContext} from './store/Context';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Create from './Pages/Create';
import View from './Pages/ViewPost';
import  { PostProvider } from './store/PostContext';




function App() {
  const { setUser } = useContext(AuthContext);
  const auth = getAuth(); // Initialize Firebase Auth


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [setUser, auth]);
  return (
    <div>
      <PostProvider>
      <Router>
      <Routes>
      <Route excat path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create" element={<Create />} />
      <Route path="/view" element={<View />} />




    </Routes>
    </Router>
    </PostProvider>
    </div>
    
    
    
  );
}

export default App;
