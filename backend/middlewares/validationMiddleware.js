const { validationResult } = require('express-validator');
const { CustomError } = require('./errorHandlerMiddleware'); // Adjust path as necessary

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Collect validation errors and log them
        console.log(req.query); // Assuming you're validating query params
        console.log(JSON.stringify(errors.array()));

        // Wrap errors in a CustomError for consistency with your existing error handling
        const errorMessage = errors.array().map(error => error.msg).join(', ');
        throw new CustomError(errorMessage, 400);
    }
    next();
};

module.exports = validate;
