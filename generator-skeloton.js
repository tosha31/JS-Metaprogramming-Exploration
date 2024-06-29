const readline = require('readline-sync');
const fs = require('fs');
const path = require('path');
// will update to ESM later

// Define functions for each choice
const actions = {
    A: () => console.log('Loading files for choice A...'),
    B: () => console.log('Loading dependencies for choice B...'),
    C: () => console.log('Executing task for choice C...'),
    D: () => console.log('Running process for choice D...')
};

// Create a proxy to handle dynamic method invocation
const proxy = new Proxy(actions, {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        } else {
            throw new Error(`Choice ${prop} is not valid.`);
        }
    }
});

// Function to prompt user and execute the corresponding action
function executeChoice() {
    const choice = readline.question('Type A for choice A, B for choice B, C for choice C, D for choice D: ').toUpperCase();

    try {
        proxy[choice]();
    } catch (error) {
        console.error(error.message);
    }
}

// Execute the choice
executeChoice();