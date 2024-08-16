import React, { useState } from 'react';
import PasswordCustomizer from '../components/PasswordCustomizer';

// Initial state for password options
const initialPasswordOptions = {
  length: 20,
  includeUppercase: true,
  includeLowercase: false,
  includeNumbers: true,
  includeSymbols: true,
  startWithLetter: true,
  noSimilar: true,
  noDuplicate: true,
  noSequential: false,
};

const HomeScreen = () => {
  // Initialize state for password options
  const [passwordOptions, setPasswordOptions] = useState(initialPasswordOptions);

  // Function to handle changes in password options
  const handlePasswordOptionsChange = (changes) => {
    setPasswordOptions(prevOptions => ({
      ...prevOptions,
      ...changes,
    }));
  };

  return (
    <div style={{ padding: '2rem' }}>
      
      {/* Pass the state and handler to PasswordCustomizer */}
      <PasswordCustomizer
        {...passwordOptions}
        onChange={handlePasswordOptionsChange}
      />
    </div>
  );
};

export default HomeScreen;
