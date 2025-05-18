import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css';
import models from '../../modelData/models';

const TopBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const getContextInfo = () => {
    const match = location.pathname.match(/\/users\/(\w+)/);
    if (!match) return '';
    
    const user = models.userModel(match[1]);
    return user ? `${user.first_name} ${user.last_name}` : '';
  };

  return (
    <AppBar className="cs142-topbar-appBar" position="absolute">
      <Toolbar>
        <Button 
          color="inherit"
          onClick={() => navigate('/')}
          style={{ marginRight: '20px' }}
        >
          Home
        </Button>
        <Typography variant="h5" color="inherit" style={{ flexGrow: 1 }}>
          CAODUY_B22DCCN150
        </Typography>
        <Typography variant="h5" color="inherit" style={{ marginRight: '20px' }}>
          {getContextInfo()}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;