import React, { useState , useEffect} from 'react';
import PasswordCustomizer from '../components/PasswordCustomizer';
import { useLazyGeneratePasswordQuery } from '../slices/apiSlices/passwordApiSlice';
import ErrorAlertDialog from '../components/ErrorAlertDialog';
import PasswordResult from '../components/PasswordResult';

// Initial state for password options
const initialPasswordOptions = {
  length: 12,
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
  const [generatePassword, { data, isLoading, isError, isSuccess, error }] = useLazyGeneratePasswordQuery();

  const [errorFlag, setErrorFlag] = useState('');
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  useEffect(()=>{
    if(isError && error){
      setErrorDialogOpen(true);
      setErrorFlag(error?.message || 'Failed to generate password.')
      console.log(error)
    }
    
  },[isError, error])

  // Function to handle changes in password options
  const handlePasswordOptionsChange = (changes) => {
    setPasswordOptions(prevOptions => ({
      ...prevOptions,
      ...changes,
    }));
  };

  // Function to trigger the password generation
  const handleGeneratePassword = async () => {
    console.log('reached here')
    await generatePassword(passwordOptions);
  };

  const handleCloseErrorDialog = () => {
    setErrorDialogOpen(false);
    setErrorFlag('');
  };

  return (
    <div style={{ padding: '2rem' }}>
      {/* Pass the state and handler to PasswordCustomizer */}
      <PasswordCustomizer
        {...passwordOptions}
        isLoading={isLoading}
        onChange={handlePasswordOptionsChange}
        handleGeneratePassword={handleGeneratePassword}
      />

      

      {/* Display generated password or errors */}
      {isSuccess && (
        <PasswordResult password={data?.password} complexity={data?.complexity} />
      )}

      

      {!!isError && (
        <ErrorAlertDialog
        open={errorDialogOpen}
        handleClose={handleCloseErrorDialog}
        title="Error"
        message={errorFlag}
      />
      )}
    </div>
  );
};

export default HomeScreen;
