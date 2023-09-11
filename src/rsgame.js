// Function to find the smallest prime number greater than or equal to a given value
function findSmallestPrimeGreaterOrEqual(value) {
  let num = value;
  while (true) {
      num++;
      if (isPrime(num)) {
          return num;
      }
  }
}

// Function to check if a number is prime
function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  let i = 5;
  while (i * i <= num) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
      i += 6;
  }
  return true;
}

// Function to print a 1x6 matrix
function printMatrix(array) {
  let result = '';

  for (let i = 0; i < array.length; ++i) {
      if (i % 6 === 0 && i > 0) {
          result += '\n';
      }

      result += "[" + array[i] + "] ";

  }

  console.log(result);
}

// Helper function to calculate the modular inverse
function modInverse(a, m) {
  for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) {
          return x;
      }
  }
  return 1;
}

// Helper function to calculate Lagrange Interpolation
function lagrangeInterpolation(x, j, p) {
  let result = 1;
  for (let m = 0; m < randomNumbers.length; m++) {
      if (m !== j) {
          result *= (x - m) * modInverse(j - m, p);
          result %= p;
      }
  }
  return result;
}

function generateRandomArrayBlock(){
const minRandomValue = 0;
const maxRandomValue = 9;
const randomNumbers = [
  Math.floor(Math.random() * (maxRandomValue - minRandomValue + 1)) + minRandomValue, // Random value 1
  Math.floor(Math.random() * (maxRandomValue - minRandomValue + 1)) + minRandomValue, // Random value 2
  Math.floor(Math.random() * (maxRandomValue - minRandomValue + 1)) + minRandomValue, // Random value 3
  Math.floor(Math.random() * (maxRandomValue - minRandomValue + 1)) + minRandomValue, // Random value 4
  -1, // Placeholder for m5 (out of range)
  -1, // Placeholder for m6 (out of range)
];

return randomNumbers;

}

//  new code section to cleaniup 
// Function to encode the randomNumbers array
function encodeRandomNumbers(randomNumbers, numECCSymbols, smallestPrime) {
  const totalCodewordSize = randomNumbers.length + numECCSymbols;
  const codeword = [];

  for (let i = 0; i < totalCodewordSize; i++) {
    let value = 0;

    // Calculate the Reed-Solomon ECC symbols
    for (let j = 0; j < randomNumbers.length; j++) {
      if (randomNumbers[j] !== -1) {
        const term = randomNumbers[j] * modInverse(i, smallestPrime) * lagrangeInterpolation(i, j, smallestPrime);
        value += term;
      }
    }

    codeword.push(value % smallestPrime);
  }

  return codeword;
}

// Function to introduce errors to a codeword
function introduceErrorsToCodeword(codeword, errorIndex, errorValue) {
  const receivedCodeword = [...codeword];
  receivedCodeword[errorIndex] = errorValue;
  return receivedCodeword;
}

// Function to calculate the noise between two codewords
function calculateNoise(codeword, receivedCodeword) {
  const noise = [];
  for (let i = 0; i < codeword.length; i++) {
    noise.push(receivedCodeword[i] - codeword[i]);
  }
  //printMatrix(noise);
  return noise;
}

// Function to introduce a random error to the original array
function introduceRandomError(randomNumbers, minRandomValue, maxRandomValue) {
  
  const errorIndex = Math.floor(Math.random() * randomNumbers.length);
  const originalValue = randomNumbers[errorIndex];
  const newValue = Math.floor(Math.random() * (maxRandomValue - minRandomValue + 1)) + minRandomValue;
  randomNumbers[errorIndex] = newValue;
  //printMatrix(randomNumbers);
  return randomNumbers;
}

// Function to decode a codeword
function decodeCodeword(randomNumbers, receivedCodeword, smallestPrime) {
  const decodedArray = [];

  for (let i = 0; i < randomNumbers.length; i++) {
    if (randomNumbers[i] === -1) {
      let value = 0;

      // Calculate the Reed-Solomon ECC symbols
      for (let j = 0; j < receivedCodeword.length; j++) {
        const term = receivedCodeword[j] * lagrangeInterpolation(j, i, smallestPrime);
        value += term;
      }

      decodedArray.push(value % smallestPrime);
    } else {
      decodedArray.push(randomNumbers[i]);
    }
  }

  return decodedArray;
}

// Example usage:
// Generate an array of 6 numbers with the last two as placeholders
const minRandomValue = 0;
const maxRandomValue = 9;

console.log("Generating a 1x6 matrix...remember: m5,m6 are placeholders");
let randomNumbers = generateRandomArrayBlock();
//using print matrix
printMatrix(randomNumbers);
let randomnumbers = [...randomNumbers];

console.log();

// Find the smallest prime greater than or equal to the maximum value among m1 to m4
const smallestPrime = findSmallestPrimeGreaterOrEqual(Math.max(...randomNumbers.slice(0, 4)));
console.log("Smallest Prime Modulus:", smallestPrime);


// Encode the randomNumbers using Reed-Solomon with Lagrange Interpolation
const numECCSymbols = 2; // Number of error correction code symbols
const codeword = encodeRandomNumbers(randomNumbers, numECCSymbols, smallestPrime);

console.log("Encoded Codeword:", codeword);

const errorIndex = Math.floor(Math.random() * randomNumbers.length);
const errorValue = Math.floor(Math.random() * (maxRandomValue - minRandomValue + 1)) + minRandomValue;
const receivedCodeword = introduceErrorsToCodeword(codeword, errorIndex, errorValue);

console.log("Received Codeword (including errors):", receivedCodeword);

console.log("Noise Added ");
const noise = calculateNoise(codeword, receivedCodeword);
//printMatrix(noise);
//console.log();


console.log("Array WITH ERROR:");
randomNumbers = introduceRandomError(randomNumbers, minRandomValue, maxRandomValue);
printMatrix(randomNumbers);
console.log();

const decodedArray = decodeCodeword(randomNumbers, receivedCodeword, smallestPrime);
console.log("Decoded Array (including ECC symbols) with Error Corrected:");
printMatrix(randomnumbers)  ;
console.log();

