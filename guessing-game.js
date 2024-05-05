// Importing necessary module
const readline = require('readline');

// Creating an interface for input and output using readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Define the randomInRange function
function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialise secret number with a random value
let secretNumber;

// Defining the checkGuess function
// Initialise number of attempts
let numAttempts = 5;

function checkGuess(guess) {
    if (guess > secretNumber) {
        console.log('Too high.');
    } else if (guess < secretNumber) {
        console.log('Too low.');
    } else {
        console.log('Correct! You Win!');
        return true;
    }

    // Decrement number of attempts after each incorrect guess
    numAttempts--;

    // Check if out of attempts
    if (numAttempts === 0) {
        console.log('You Lose.');
        rl.close();
        return true;
    }
    return false;
}

// Defining the askGuess function
function askGuess() {
    rl.question('Enter a guess: ', (guess) => {
        // Converting user's guess to a number
        let numGuess = Number(guess);

        // Checking the guess
        if (checkGuess(numGuess)) {
            rl.close();
        } else {
            askGuess(); // Asking for another guess if previous was incorrect
        }
    });
}

// Defining the askRange function
function askRange() {
    rl.question('Enter a min number: ', (min) => {
        rl.question('Enter a max number: ', (max) => {
            // Converting to min and max numbers
            let numMin = Number(min);
            let numMax = Number(max);

            // Setting the secretNumber randomly within the specified range
            secretNumber = randomInRange(numMin, numMax);
            console.log(`I'm thinking of a number between ${numMin} and ${numMax}...`);

            // Starting the game
            askGuess();
        });
    });
}

// Call askRange to begin the game
askRange();
