import React from 'react';
import { Grid, Typography, Paper, IconButton, Tooltip, styled, Box } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const PasswordResultContainer = styled(Paper)(({ theme }) => ({
  padding: '0px',
  backgroundColor: theme.palette.grey[100],
  minHeight: 100,
  maxWidth: 600,
  margin: 'auto',
  overflow: 'hidden',
  marginTop: '2rem',
  alignItems:'center',
  alignContent:'center'
}));

const PasswordText = styled(Box)(({ theme }) => ({
  whiteSpace: 'nowrap',
  overflowX: 'auto', // Enable horizontal scrolling
  textOverflow: 'ellipsis',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.grey[200], // Subtle background color
  padding: theme.spacing(1),
  boxShadow: 'inset 0px -2px 4px rgba(0, 0, 0, 0.1)', // Negative elevation
  borderRadius: theme.shape.borderRadius,
  '&::-webkit-scrollbar': {
    height: '8px',
    backgroundColor:'#ffffff',
    
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.grey[400],
    borderRadius: '2px',
    backgroundColor:'#217DBF'
  },
}));

// Color mapping based on password complexity levels
const complexityColors = {
    'Too Easy': '#ff4d4f', // Strong Red
    'Weak': '#ff7f50',     // Coral
    'Very Weak': '#ffcc00', // Yellow
    'Moderate': '#ffa500',  // Darker Yellow/Orange
    'Good': '#90ee90',      // Light Green
    'Great': '#32cd32',     // LimeGreen
    'Strong': '#228b22',    // ForestGreen
    'Very Strong': '#006400', // DarkGreen
    'Hard to Crack': '#004d00', // Very Dark Green
  };

const PasswordResult = ({ password, complexity }) => {

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
  };

  // Get the corresponding color based on the complexity
  const complexityColor = complexityColors[complexity] || '#000000'; 

  return (
    <PasswordResultContainer>
      <Grid container alignItems="center" >
        {/* Password Complexity Indicator */}
        <Grid item xs={3} sm={3} alignItems="center" >
          <Typography variant="subtitle1" color={complexityColor} textAlign="center">
            {complexity}
          </Typography>
        </Grid>

        {/* Password Display */}
        <Grid item xs={7} sm={7}>
          <PasswordText>
            <Typography variant="h6" title={password} sx={{ whiteSpace: 'nowrap' }}>
              {password}
            </Typography>
          </PasswordText>
        </Grid>

        {/* Copy to Clipboard Button */}
        <Grid item xs={2} sm={2} textAlign="center">
          <Tooltip title="Copy to clipboard">
            <IconButton onClick={handleCopy} size="medium">
              <ContentCopyIcon sx={{ fontSize: '28px' }} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </PasswordResultContainer>
  );
};

export default PasswordResult;
