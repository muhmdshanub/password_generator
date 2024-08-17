// utils/passwordUtils.js

// Function to evaluate the complexity of a generated password
const evaluatePasswordComplexity = (password, options) => {
    const { length, includeUppercase, includeLowercase, includeNumbers, includeSymbols } = options;
    
    let complexity = 'Too Easy';

    // Basic length-based complexity
    if (length < 8) {
        complexity = 'Too Easy';
    } else if (length >= 8 && length < 12) {
        complexity = 'Easy';
    } else if (length >= 12 && length < 16) {
        complexity = 'Good';
    } else if (length >= 16 && length < 20) {
        complexity = 'Great';
    } else if (length >= 20) {
        complexity = 'Hard to Crack';
    }

    // Additional checks based on character types
    let typeCount = 0;
    if (includeUppercase) typeCount++;
    if (includeLowercase) typeCount++;
    if (includeNumbers) typeCount++;
    if (includeSymbols) typeCount++;

    // Adjust complexity based on character type inclusion
    if (typeCount === 4) {
        if (length >= 20) {
            complexity = 'Very Strong';
        } else if (length >= 16) {
            complexity = 'Strong';
        } else {
            complexity = 'Good';
        }
    } else if (typeCount === 3) {
        if (length >= 16) {
            complexity = 'Good';
        } else if (length >= 12) {
            complexity = 'Moderate';
        } else {
            complexity = 'Weak';
        }
    } else if (typeCount === 2) {
        if (length >= 12) {
            complexity = 'Moderate';
        } else {
            complexity = 'Weak';
        }
    } else {
        if (length >= 12) {
            complexity = 'Weak';
        } else {
            complexity = 'Very Weak';
        }
    }

    return complexity;
};


module.exports = evaluatePasswordComplexity;