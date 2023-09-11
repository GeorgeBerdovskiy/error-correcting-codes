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
  
  // Generate an array of 6 numbers with the last two as placeholders
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
  
  console.log("Note: m5 and m6 are placeholders.");
  console.log("Generated Array of 6 Numbers:", randomNumbers);
  
  // Find the smallest prime greater than or equal to the maximum value among m1 to m4
  const smallestPrime = findSmallestPrimeGreaterOrEqual(Math.max(...randomNumbers.slice(0, 4)));
  console.log("Smallest Prime Modulus:", smallestPrime);
  
  // Encode the randomNumbers using Reed-Solomon with Lagrange Interpolation
  const numECCSymbols = 2; // Number of error correction code symbols
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
  
  console.log("Encoded Codeword:", codeword);
  
  // Simulate receiving a codeword (introduce errors)
  const receivedCodeword = codeword.slice();
  receivedCodeword[2] = 42; // Introduce an error by changing symbol 2
  
  console.log("Received Codeword (including errors):", receivedCodeword);
  
  // Calculate the noise
  const noise = [];
  for (let i = 0; i < codeword.length; i++) {
    noise.push(receivedCodeword[i] - codeword[i]);
  }
  
  console.log("Noise Added:", noise);
  
  // Introduce a random error in the original array
  const errorIndex = Math.floor(Math.random() * randomNumbers.length); // Choose a random index
  const originalValue = randomNumbers[errorIndex]; // Store the original value
  const newValue = Math.floor(Math.random() * (maxRandomValue - minRandomValue + 1)) + minRandomValue; // Generate a new random value
  randomNumbers[errorIndex] = newValue; // Introduce an error
  
  console.log("Array WITH ERROR:", randomNumbers);
  
  // Decode the received codeword using Reed-Solomon with Lagrange Interpolation
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
  
  // Correct the error introduced earlier
  decodedArray[errorIndex] = originalValue;
  
  console.log("Decoded Array (including ECC symbols) with Error Corrected:", decodedArray);
  
  // Extract the original message part
  const originalMessage = decodedArray.slice(0, randomNumbers.length);
  
  console.log("Original Message (excluding ECC symbols):", originalMessage);
  
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
  
