// controllers/passwordController.js
const { CustomError } = require('../middlewares/errorHandlerMiddleware'); // Import the CustomError class
const asyncHandler = require('express-async-handler'); // Import asyncHandler library
const generatePassword = require('../utils/generatePassword');
const evaluatePasswordComplexity = require('../utils/evaluatePasswordComplexity')


// Sample controller function to get a password
const getPassword =asyncHandler(async (req, res) => {
    
    const { length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, startWithLetter, noSimilar, noDuplicate, noSequential } = req.query;

    const options = {
        length: parseInt(length, 10) || 12,
        includeUppercase: includeUppercase === 'true',
        includeLowercase: includeLowercase === 'true',
        includeNumbers: includeNumbers === 'true',
        includeSymbols: includeSymbols === 'true',
        startWithLetter: startWithLetter === 'true',
        noSimilar: noSimilar === 'true',
        noDuplicate: noDuplicate === 'true',
        noSequential: noSequential === 'true'
    };

    

    try{
        // Generate password and evaluate its complexity
        const password = generatePassword(options);
        const complexity = evaluatePasswordComplexity(password, options);

        res.json({
            success: true,
            message: "Password generated",
            password,
            complexity,
        });
    }catch(error){
        // Wrap the caught error into a CustomError and pass the original message
        throw new CustomError(error.message, 400);
    }
}) ;

module.exports = {
    getPassword
};
