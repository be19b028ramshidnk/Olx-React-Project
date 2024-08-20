import './App.css';
import Home from './Pages/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'



function App() {
  return (
    <div>
      <Router>
      <Routes>
      <Route excat path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

    </Routes>
    </Router>
    </div>
    
    
    
  );
}

export default App;
