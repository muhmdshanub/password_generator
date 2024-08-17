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

const UPPER_WITH_SIMILAR_COUNT = 26;
const LOWER_WITH_SIMILAR_COUNT = 26;
const NUM_WITH_SIMILAR_COUNT = 10;
const SYMBOL_COUNT = 29; // Adjust based on your symbol set length

const UPPER_WITHOUT_SIMILAR_COUNT = 23;
const LOWER_WITHOUT_SIMILAR_COUNT = 23;
const NUM_WITHOUT_SIMILAR_COUNT = 8;

const HomeScreen = () => {
  // Initialize state for password options
  const [passwordOptions, setPasswordOptions] = useState(initialPasswordOptions);
  const [generatePassword, { data, isLoading, isError, isSuccess, error }] = useLazyGeneratePasswordQuery();

  const [errorFlag, setErrorFlag] = useState('');
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  useEffect(()=>{
    if(isError && error){
      setErrorDialogOpen(true);
      setErrorFlag(error?.data?.message || 'Failed to generate password.')
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

  /// Function to trigger the password generation
const handleGeneratePassword = async () => {
  const { includeUppercase, includeLowercase, includeNumbers, includeSymbols, noSimilar, noDuplicate, length } = passwordOptions;

  // Initialize the possible character count to 0
  let possibleCharCount = 0;

  if(!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols){
    setErrorDialogOpen(true);
    setErrorFlag('Please select atleast one character types.');
    return
  }

  // Calculate the total possible character count based on user selections
  if (includeUppercase) {
    possibleCharCount += noSimilar ? UPPER_WITHOUT_SIMILAR_COUNT : UPPER_WITH_SIMILAR_COUNT;
  }
  if (includeLowercase) {
    possibleCharCount += noSimilar ? LOWER_WITHOUT_SIMILAR_COUNT : LOWER_WITH_SIMILAR_COUNT;
  }
  if (includeNumbers) {
    possibleCharCount += noSimilar ? NUM_WITHOUT_SIMILAR_COUNT : NUM_WITH_SIMILAR_COUNT;
  }
  if (includeSymbols) {
    possibleCharCount += SYMBOL_COUNT; // Symbols don't have a similar option
  }

  // If noDuplicate is selected, check if the possible character count is sufficient
  if (noDuplicate && length > possibleCharCount) {
    
    setErrorDialogOpen(true);
    setErrorFlag('Please select more character types.');
    return
    
  }
  
  // Proceed with the password generation if validation passes
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

      

      {(!!isError || !!errorDialogOpen) && (
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
