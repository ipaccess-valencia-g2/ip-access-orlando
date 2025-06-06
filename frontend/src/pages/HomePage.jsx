import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/HomePage.css';
import myImage from '../assets/abc.jpg';
import { Button, ButtonRadio, ButtonToggle } from '../components/common';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <img src={myImage} alt="My Description" />
      <Button 
        style={{ display: 'block', margin: '20px auto' }} 
        onClick={() => navigate('/register')}
      >
        Get Started
      </Button>
    </div>
  );
};

export default HomePage;
