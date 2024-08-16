import React from 'react';
import { Box, Paper, Typography, TextField, FormControlLabel, Switch, Button, styled } from '@mui/material';

// Styled Paper for the container
const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 600,
  margin: 'auto',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

// Styled Box for spacing
const SpacingBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
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
  onChange
}) => {

  const handleLengthChange = (event) => {
    onChange({ length: event.target.value });
  };

  const handleSwitchChange = (key) => (event) => {
    onChange({ [key]: event.target.checked });
  };

  return (
    <CustomPaper elevation={3}>
      <Typography variant="h6" gutterBottom>
        Customize Your Password
      </Typography>

      <SpacingBox>
        <Typography variant="subtitle1">Password Length</Typography>
        <TextField
          type="number"
          value={length}
          onChange={handleLengthChange}
          inputProps={{ min: 1, max: 128 }}
          fullWidth
        />
      </SpacingBox>

      <SpacingBox>
        <FormControlLabel
          control={<Switch checked={includeUppercase} onChange={handleSwitchChange('includeUppercase')} />}
          label="Uppercase Letters"
        />
        <FormControlLabel
          control={<Switch checked={includeLowercase} onChange={handleSwitchChange('includeLowercase')} />}
          label="Lowercase Letters"
        />
        <FormControlLabel
          control={<Switch checked={includeNumbers} onChange={handleSwitchChange('includeNumbers')} />}
          label="Numbers"
        />
        <FormControlLabel
          control={<Switch checked={includeSymbols} onChange={handleSwitchChange('includeSymbols')} />}
          label="Symbols"
        />
      </SpacingBox>

      <SpacingBox>
        <FormControlLabel
          control={<Switch checked={startWithLetter} onChange={handleSwitchChange('startWithLetter')} />}
          label="Start With Letter"
        />
        <FormControlLabel
          control={<Switch checked={noSimilar} onChange={handleSwitchChange('noSimilar')} />}
          label="No Similar"
        />
        <FormControlLabel
          control={<Switch checked={noDuplicate} onChange={handleSwitchChange('noDuplicate')} />}
          label="No Duplicate"
        />
        <FormControlLabel
          control={<Switch checked={noSequential} onChange={handleSwitchChange('noSequential')} />}
          label="No Sequential"
        />
      </SpacingBox>

      <Button variant="contained" color="primary">
        Generate Password
      </Button>
    </CustomPaper>
  );
};

export default PasswordCustomizer;
