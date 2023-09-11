// Function to find the smallest prime number greater than a given value
function findSmallestPrimeGreaterThan(value) {
    let num = value + 1;
    while (true) {
      if (isPrime(num)) {
        return num;
      }
      num++;
    }
  }
  
  function lagrangeInterpolation(numbers, modulus) {
    const x1 = numbers[0];
    const x2 = numbers[1];
    const x3 = numbers[2];
    const x4 = numbers[3];
  
    // Calculate the Lagrange interpolation equation with the provided modulus
    const equation = `(x - ${x2}) * (x - ${x3}) * (x - ${x4}) / ((${x1} - ${x2}) * (${x1} - ${x3}) * (${x1} - ${x4}) * (${x2} - ${x3}) * (${x2} - ${x4}) * (${x3} - ${x4})) % ${modulus}`;
    return equation;
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
  
  // Function to evaluate an equation with 'i' as a variable and handle modular arithmetic
  function evaluateEquation(equation, i, modulus) {
    try {
      // Parse the equation, replacing 'x' with 'i'
      const parsedEquation = equation.replace(/x/g, i.toString());
  
      // Evaluate the parsed equation
      let result = eval(parsedEquation);
  
      // Ensure the result is positive by taking the modulus
      result = (result % modulus + modulus) % modulus;
  
      return result;
    } catch (error) {
      console.error("Error evaluating equation:", error);
      return null;
    }
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
  
  // Print a note that m5 and m6 are placeholders
  console.log("Note: m5 and m6 are placeholders.");
  
  // Find the smallest prime greater than m1 through m4
  const smallestPrime = findSmallestPrimeGreaterThan(Math.max(...randomNumbers.slice(0, 4)));
  
  // Calculate the Lagrange interpolation equation with the modulus found
  const interpolationEquation = lagrangeInterpolation(randomNumbers, smallestPrime);
  
  // Output the original array
  console.log(`Generated Array of 6 Numbers: ${randomNumbers}`);
  console.log(`Lagrange Interpolation Equation: ${interpolationEquation}`);
  console.log(`Smallest Prime Modulus: ${smallestPrime}`);
  
  // Add noise to the array
  console.log("Input successfully encoded, let's add noise!");
  for (let i = 0; i < 1; i++) {
    const randomIndex = Math.floor(Math.random() * 4); // Only randomize m1 to m4
    const newValue = Math.floor(Math.random() * (maxRandomValue - minRandomValue + 1)) + minRandomValue;
    randomNumbers[randomIndex] = newValue;
  }
  
  // Output the modified array after adding noise
  console.log(`Output After Adding Noise: ${randomNumbers}`);
  
  // Function to correct errors using Reed-Solomon encoding
  function correctErrorsWithReedSolomon(randomNumbers, interpolationEquation, smallestPrime) {
    const correctedArray = randomNumbers.slice(); // Copy the array
  
    // Correct errors in the array
    for (let i = 4; i < 6; i++) {
      const expectedValue = evaluateEquation(interpolationEquation, i, smallestPrime);
      correctedArray[i] = Math.round(expectedValue); // Use regular numbers
    }
  
    return correctedArray;
  }
  
  console.log("Correcting the Errors with Reed-Solomon Encoding:");
  
  // Correct errors in the array
  const correctedArray = correctErrorsWithReedSolomon(randomNumbers, interpolationEquation, smallestPrime);
  
  // Output the corrected array
  console.log(`Corrected Array excluding last two placeholder indices: ${correctedArray}`);


  
  
  