// controllers/passwordController.js
const { CustomError } = require('../middlewares/errorHandlerMiddleware'); // Import the CustomError class
const asyncHandler = require('express-async-handler'); // Import asyncHandler library

// Sample controller function to get a password
const getPassword =asyncHandler(async (req, res) => {
    // For now, we'll just send a sample response

    console.log(req.query.error_test)
    if(req.query.error_test === 'true'){
        console.log('enetred here')
        throw new CustomError("test error success", 400); // Use CustomError here
    }

    res.json({
        message: "Password generation endpoint is working!",
        examplePassword: "SamplePassword123!"
    });
}) ;

module.exports = {
    getPassword
};
