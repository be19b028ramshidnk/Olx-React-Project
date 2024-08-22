import React, {useContext, useState} from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/Context';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';



function Header() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext);
  const auth = getAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
        navigate('/login'); // Redirect to login page

      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  const handleLoginClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      // Toggle the dropdown if the user is logged in
      setDropdownOpen(!dropdownOpen);
    }
  };
  const handleSellClick = () => {
    navigate('/create');
  };
  const Hometo=()=>{
    navigate('/')
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div  className="brandName" onClick={Hometo} style={{ cursor: 'pointer' }}>
          <OlxLogo ></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
        <span onClick={handleLoginClick} style={{ cursor: 'pointer' }}>
        {user ? `Welcome ${user.displayName}` : 'Login'}
      </span>
      {user && dropdownOpen && (
        <div className="dropdown">
          <span onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span>
        </div>
        )}

        </div>


        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={handleSellClick} style={{ cursor: 'pointer' }}>
              SELL
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
