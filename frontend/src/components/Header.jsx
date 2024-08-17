import React from "react";
import { AppBar, Toolbar, Typography, styled } from "@mui/material";

// Styled AppBar with responsive height and padding using vh and rem
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  minHeight: '12vh', // Minimum height of the AppBar
  padding: '0 1.5rem', // Padding relative to root font size
  backgroundColor: '#217DBF',
  maxHeight: 'fit-content',
  paddingTop:'3rem',

  [theme.breakpoints.down('sm')]: {
    minHeight: '11vh', // Smaller height for smaller screens
    padding: '0 1rem', // Smaller padding
  },

  [theme.breakpoints.between('sm', 'md')]: {
    minHeight: '13vh',
    padding: '0 1.25rem',
  },

  [theme.breakpoints.up('md')]: {
    minHeight: '15vh',
    padding: '0 2rem',
  },
}));

// Styled Toolbar with vertical alignment
const StyledToolbar = styled(Toolbar)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column', // Stack items vertically
  justifyContent: 'center',
  alignItems: 'stretch',
});

// Container for left-aligned and right-aligned typography
const HeaderContent = styled('div')({
  display: 'flex',
  flexDirection: 'column', // Stack items vertically
  width: '100%',
  height: '100%',
  paddingTop: '1.5rem',
});

const LeftTypography = styled(Typography)({
  textAlign: 'left',
  width: '100%', // Full width for left alignment
});

const RightTypography = styled(Typography)({
  textAlign: 'right',
  width: '100%', // Full width for right alignment
});

const Header = () => {
  return (
    <StyledAppBar position="sticky" elevation={3}>
      <StyledToolbar>
        <HeaderContent>
          {/* Left-aligned heading */}
          <LeftTypography variant="h5">
            Password Generator
          </LeftTypography>

          {/* Right-aligned subheading */}
          <RightTypography variant="subtitle1">
            Secure random easy-to-use passwords.
          </RightTypography>
        </HeaderContent>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
