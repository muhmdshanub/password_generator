import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const App = () => {
  return (
    <Box sx={{ p: 2, minHeight: '100vh' }}>
      {/* This is where the routed components will be rendered */}
      <Outlet />
    </Box>
  );
};

export default App;
