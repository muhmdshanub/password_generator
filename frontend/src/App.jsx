import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./components/Header"; // Import the header component

const App = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden', // Prevent horizontal overflow
      }}
    >
      <Header /> {/* Add header at the top */}
      <Box
        component="main"
        sx={{
          flex: 1,
          padding: 2, // Add padding around the content
          overflowY: 'auto', // Ensure content is scrollable if it overflows
          width: '100%', // Ensure full width
          marginTop: 8, // Ensure content does not overlap with header
          boxSizing: 'border-box', // Include padding and border in element's total width and height
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default App;
