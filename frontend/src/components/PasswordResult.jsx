import React, { useState } from 'react';
import { Grid, Typography, Paper, IconButton, Tooltip, styled, Box, Snackbar } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MuiAlert from '@mui/material/Alert';

const PasswordResultContainer = styled(Paper)(({ theme }) => ({
  padding: '0px',
  backgroundColor: theme.palette.grey[100],
  minHeight: 100,
  maxWidth: 600,
  margin: 'auto',
  overflow: 'hidden',
  marginTop: '2rem',
  alignItems: 'center',
  alignContent: 'center'
}));

const PasswordText = styled(Box)(({ theme }) => ({
  whiteSpace: 'nowrap',
  overflowX: 'auto',
  textOverflow: 'ellipsis',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.grey[200],
  padding: theme.spacing(1),
  boxShadow: 'inset 0px -2px 4px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.shape.borderRadius,
  '&::-webkit-scrollbar': {
    height: '8px',
    backgroundColor: '#ffffff',
  },
  '&::-webkit-scrollbar-thumb': {
    
    borderRadius: '2px',
    backgroundColor: '#217DBF'
  },
}));

const complexityColors = {
  'Too Easy': '#ff4d4f',
  'Weak': '#ff7f50',
  'Very Weak': '#ffcc00',
  'Moderate': '#ffa500',
  'Good': '#90ee90',
  'Great': '#32cd32',
  'Strong': '#228b22',
  'Very Strong': '#006400',
  'Hard to Crack': '#004d00',
};

const PasswordResult = ({ password, complexity }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const complexityColor = complexityColors[complexity] || '#000000';

  return (
    <PasswordResultContainer>
      <Grid container alignItems="center">
        <Grid item xs={3} sm={3} alignItems="center">
          <Typography variant="subtitle1" color={complexityColor} textAlign="center">
            {complexity}
          </Typography>
        </Grid>

        <Grid item xs={7} sm={7}>
          <PasswordText>
            <Typography variant="h6" title={password} sx={{ whiteSpace: 'nowrap' }}>
              {password}
            </Typography>
          </PasswordText>
        </Grid>

        <Grid item xs={2} sm={2} textAlign="center">
          <Tooltip title="Copy to clipboard">
            <IconButton onClick={handleCopy} size="medium">
              <ContentCopyIcon sx={{ fontSize: '28px' }} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Password copied!
        </MuiAlert>
      </Snackbar>
    </PasswordResultContainer>
  );
};

export default PasswordResult;
