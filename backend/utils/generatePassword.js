// Character sets with similar characters


const crypto = require('crypto');


const upperCharsWithSimilar = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

const lowerCharsWithSimilar = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

const numCharsWithSimilar = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
];

const symbolCharsSets = [
    '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '|', ';', ':', ',', '.', '<', '>', '/', '?', '`', '~'
];

// Character sets without similar characters
const upperCharsWithoutSimilar = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];
const lowerCharsWithoutSimilar = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];
const numCharsWithoutSimilar = [
    '2', '3', '4', '5', '6', '7', '8', '9'
];

// Cryptographically secure shuffle function
const secureShuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a cryptographically secure random index
        const j = crypto.randomInt(0, i + 1);

        // Swap elements at indices i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};


// Function for inserting required chars into the password array
const insertRequiredChars = (password, requiredChars, insertedPositions) => {
    const length = password.length;

    for (let i = 0; i < requiredChars.length; i++) {
        const char = requiredChars[i];

        if (insertedPositions.size === length) {
            // Stop further processing as the password is fully filled
            break;
        }

        let position;

        // Find a random position that is not already used
        do {
            position = crypto.randomInt(0, length); // Get a secure random position
        } while (insertedPositions.has(position)); // Keep trying until you find an unused position

        // Insert the required character at the selected position
        password[position] = char;

        // Mark this position as used
        insertedPositions.add(position);
    }
};


const addElementsToPassword = (password, availableChars, options, insertedPositions) => {
    const { noDuplicate, noSequential, length } = options;

    // Loop through each position in the password array
    for (let i = 0; i < length; i++) {
        // Check if the password is already fully filled
        if (insertedPositions.size === length) {
            break;
        }

        // Skip if the current position is already filled
        if (password[i] !== undefined) {
            continue;
        }

        let char;

        do {
            // Select a random character from the available characters using crypto
            char = availableChars[crypto.randomInt(0, availableChars.length)];

            // Check if noDuplicate is true
            if (noDuplicate && password.includes(char)) {
                char = null; // Reset char if it already exists in the password
            }

            // Check if noSequential is true
            if (noSequential && char !== null) {
                const prevChar = i > 0 ? password[i - 1] : null;
                const nextChar = i < length - 1 ? password[i + 1] : null;

                // Ensure the character is not adjacent to the previous or next character in the availableChars
                const prevIndex = prevChar ? availableChars.indexOf(prevChar) : -1;
                const nextIndex = nextChar ? availableChars.indexOf(nextChar) : -1;
                const charIndex = availableChars.indexOf(char);

                const isAdjacent = 
                    // Check if the selected character is directly adjacent to prevChar or nextChar
                    (prevChar && prevIndex !== -1 && prevIndex + 1 === charIndex) ||
                    (nextChar && nextIndex !== -1 && nextIndex - 1 === charIndex) ||
                    // Check if the selected character is adjacent to a character that comes before prevChar
                    (prevChar && prevIndex > 0 && availableChars[prevIndex - 1] === char) ||
                    // Check if the selected character is adjacent to a character that comes after nextChar
                    (nextChar && nextIndex < availableChars.length - 1 && availableChars[nextIndex + 1] === char);

                if (isAdjacent) {
                    char = null; // Reset char if it's adjacent to another character in the availableChars
                }
            }

        } while (char === null); // Continue until a valid character is found

        // Place the valid character in the password array
        password[i] = char;
        insertedPositions.add(i);
    }
};


const generatePassword = (options) => {

    const {
        length,
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols,
        startWithLetter,
        noSimilar,
        noDuplicate,
        noSequential
    } = options;

    

    try{
        if(!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols){
            throw new Error("Not enough characters to generate a password.");
        }
    
        
        if (length < 1 || length > 50) {
            throw new Error("Length must be between 1 and 50.");
        }
    
        let upperChars = includeUppercase ? (noSimilar ? upperCharsWithoutSimilar : upperCharsWithSimilar) : [];
        let lowerChars = includeLowercase ? (noSimilar ? lowerCharsWithoutSimilar : lowerCharsWithSimilar) : [];
        let numChars = includeNumbers ? (noSimilar ? numCharsWithoutSimilar : numCharsWithSimilar) : [];
        let symbolChars = includeSymbols ? symbolCharsSets : [];
    
        const charsCount = upperChars.length + lowerChars.length + numChars.length + symbolChars.length;
    
        if(noDuplicate === true && length > charsCount){
            
            throw new Error("Length must be less than or equal to the number of unique characters.");
        }
    
        // Initialize a fixed-size array for the password
        let password = new Array(length);
        let insertedPositions = new Set([]);
    
        if (startWithLetter) {
            if (upperChars.length === 0 && lowerChars.length === 0) {
                throw new Error("Cannot start with a letter when no uppercase or lowercase letters are included.");
            }
    
            // Randomly select a starting letter from upper or lower case
            const allLetters = [...upperChars, ...lowerChars];
            const startingChar = allLetters[Math.floor(Math.random() * allLetters.length)];
            
            // push password with the starting letter
             password[0] = startingChar;
             insertedPositions.add(0);
    
             if(insertedPositions.size === length){
                return password.join('')
             }
            
        }
    
        // Check if we need to include at least one of each character type
        let requiredChars = [];
    
        if(includeUppercase && !upperChars.includes(password[0])){
            requiredChars.push(upperChars[Math.floor(Math.random() * upperChars.length)]);
        } 
        if(includeLowercase && !lowerChars.includes(password[0])){
             requiredChars.push(lowerChars[Math.floor(Math.random() * lowerChars.length)])
        };
        if(includeNumbers){
            requiredChars.push(numChars[Math.floor(Math.random() * numChars.length)])
        }
        if(includeSymbols){
            requiredChars.push(symbolCharsSets[Math.floor(Math.random() * symbolCharsSets.length)]);
        }
    
        requiredChars = secureShuffle(requiredChars)
        //inserting the required Chars element into password array
    
        //calling the function to insert minimum required characters to password array
        insertRequiredChars(password, requiredChars, insertedPositions);
    
    
        // Check if the password is fully filled
        if (insertedPositions.size === length) {
            return password.join('');
        }
    
         // Add remaining elements to the password array
         addElementsToPassword(password, [...upperChars, ...lowerChars, ...numChars, ...symbolChars], {
            noDuplicate,
            noSequential,
            length
        }, insertedPositions);
    
        // Return the generated password as a string
        return password.join('');
    }catch (error) {
        // Handle error here if needed, or rethrow it
        throw new Error(error.message);
    }


}

module.exports = generatePassword;