import React from 'react';
import { Box, Grid, Paper, Typography, TextField, FormControlLabel, Switch, Button, Divider, Slider, Tooltip, IconButton, styled } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import GradientCircularProgress from './GradientCircularProgress';

// Styled Paper for the container
const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 600,
  margin: 'auto',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(0.5),
  },
}));

// Styled Box for spacing
const SpacingBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

// Styled TextField with limited width
const CustomTextField = styled(TextField)(({ theme }) => ({
  maxWidth: '120px', // Adjust the width as needed
}));

const PasswordCustomizer = ({
  length,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols,
  startWithLetter,
  noSimilar,
  noDuplicate,
  noSequential,
  onChange,
  isLoading,
  handleGeneratePassword,
}) => {
  const handleLengthChange = (event) => {
    let newLength = parseInt(event.target.value, 10);
    if (newLength < 1) newLength = 1;
    if (newLength > 50) newLength = 50;
    onChange({ length: newLength });
  };

  const handleSwitchChange = (key) => (event) => {
    // Auto-disable startWithLetter if both uppercase and lowercase are disabled
    if ((key === 'includeUppercase' || key === 'includeLowercase') && !event.target.checked) {
      
      if ((!includeUppercase || !includeLowercase) && (key === 'includeLowercase' || key === 'includeUppercase')) {
        onChange({ startWithLetter: false });
      }
    }
    
    // Automatically handle setting state for switches
    onChange({ [key]: event.target.checked });
  };

  const handleSliderChange = (event, newValue) => {
    if (newValue < 1) newValue = 1;
    if (newValue > 50) newValue = 50;
    onChange({ length: newValue });
  };

  // Tooltips content for each switch
  const tooltips = {
    includeUppercase: 'Include uppercase letters (e.g. A, B, C)',
    includeLowercase: 'Include lowercase letters (e.g. a, b, c)',
    includeNumbers: 'Include numbers (e.g. 0, 1, 2)',
    includeSymbols: 'Include symbols (e.g. @, #, $)',
    startWithLetter: 'Start the password with a letter',
    noSimilar: 'Exclude similar characters (e.g. I, l, 1, O, 0)',
    noDuplicate: 'Disallow duplicate characters',
    noSequential: 'Disallow sequential characters (e.g. 123, abc)',
  };

  return (
    <CustomPaper elevation={3}>
      <Typography variant="h6" gutterBottom>
        Customize Your Password
      </Typography>

      {/* Horizontal line */}
      <Divider sx={{ mb: 2 }} />

      {/* Length Input */}
      <SpacingBox>
        <Typography variant="subtitle1">Password Length</Typography>
        <Grid
          container
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} sm="auto" container justifyContent="center">
            <CustomTextField
              type="number"
              value={length}
              onChange={handleLengthChange}
              inputProps={{ min: 1, max: 50 }}
            />
          </Grid>
          <Grid item xs={12} sm container justifyContent="center">
            <Slider
              value={length}
              onChange={handleSliderChange}
              min={1}
              max={50}
              sx={{ 
                width: {
                  xs: '150px',  // Width for extra-small screens
                  sm: '250px',  // Width for small screens and up
                }
              }}
            />
          </Grid>
        </Grid>
      </SpacingBox>

      {/* Switches */}
      <SpacingBox>
        <Grid
          container
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="flex-start"
          justifyContent="center"
          sx={{
            width: {
              xs: '70%', // Width for small screens
              sm: 'auto' // Auto width for larger screens
            },
            margin: {
              xs: 'auto', // Center horizontally on small screens
              sm: 'initial' // Default margin for larger screens
            }
          }}
        >
          {Object.keys(tooltips).map((key) => (
            <Grid item xs={12} sm={6} key={key}>
              <FormControlLabel
                control={
                  <Switch
                    checked={eval(key)} // Dynamically get value from props
                    onChange={handleSwitchChange(key)}
                    disabled={key === 'startWithLetter' && (!includeUppercase && !includeLowercase)} // Disable based on condition
                  />
                }
                label={
                  <Box display="flex" alignItems="center">
                    {key.replace(/([A-Z])/g, ' $1').trim()} {/* Convert camelCase to readable format */}
                    <Tooltip title={tooltips[key]}>
                      <IconButton size="small" sx={{ ml: 1 }}>
                        <HelpOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                }
                sx={{ display: 'flex', alignItems: 'center' }}
              />
            </Grid>
          ))}
        </Grid>
      </SpacingBox>

      <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" disabled={isLoading} onClick={handleGeneratePassword}>
          {isLoading ? <GradientCircularProgress /> : "Generate Password"}
        </Button>
      </Box>
    </CustomPaper>
  );
};

export default PasswordCustomizer;
