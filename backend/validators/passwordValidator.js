// Validation chain for query parameters
const {  query } = require('express-validator');

const validatePasswordParams = [
    query('length')
        .optional()
        .isInt({ min: 1, max: 50 }).withMessage('Length must be between 1 and 50'),
    query('includeUppercase')
        .optional()
        .isBoolean().withMessage('includeUppercase must be a boolean'),
    query('includeLowercase')
        .optional()
        .isBoolean().withMessage('includeLowercase must be a boolean'),
    query('includeNumbers')
        .optional()
        .isBoolean().withMessage('includeNumbers must be a boolean'),
    query('includeSymbols')
        .optional()
        .isBoolean().withMessage('includeSymbols must be a boolean'),
    query('startWithLetter')
        .optional()
        .isBoolean().withMessage('startWithLetter must be a boolean'),
    query('noSimilar')
        .optional()
        .isBoolean().withMessage('noSimilar must be a boolean'),
    query('noDuplicate')
        .optional()
        .isBoolean().withMessage('noDuplicate must be a boolean'),
    query('noSequential')
        .optional()
        .isBoolean().withMessage('noSequential must be a boolean')
];

module.exports ={
    validatePasswordParams,
}