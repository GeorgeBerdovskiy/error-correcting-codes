// Program that implements a hamming block of size 4x4 that uses parity checks in order to correct errors

function binaryToDecimal(binaryArray) 
{
  let decimalValue = 0;
  const size = binaryArray.length;

  for (let i = 0; i < size; ++i) 
  {
      decimalValue += binaryArray[i] * Math.pow(2, size - 1 - i);
  }

  return decimalValue;
}

function fixedHammingCode(hammingBlock, positionOfError) 
{
  hammingBlock[positionOfError] = !hammingBlock[positionOfError]; // Flip the bit at the specified position
  return hammingBlock;
}

function printMatrix(array) 
{
  for (let i = 0; i < array.length; ++i) 
  {
    if (i % 4 === 0 && i > 0) {
      console.log();
    }

    if (i < 3 || i === 4 || i === 8) {
      process.stdout.write("[" + (array[i] ? '1' : '0') + "] ");
    } else {
      process.stdout.write(" " + (array[i] ? '1' : '0') + "  ");
    }
  }
  console.log();
}

function zeroCheck(hammingBlock) 
{
  // Calculate the total number of ones in the Hamming block (excluding the parity bit at position 0)
  let totalOnes = 0;
  for (let i = 1; i < 16; ++i) 
  {
      totalOnes += hammingBlock[i];
  }

  const expectedParityBit = totalOnes % 2 === 0 ? 0 : 1;

  // Check if the calculated parity bit matches the expected parity bit
  if (hammingBlock[0] !== expectedParityBit) 
  {
      console.log("Error detected in the parity bit at position 0!");
      hammingBlock[0] = expectedParityBit;
  }
  return hammingBlock;
}

function parityCheck(hammingBlock) 
{
  let answersToParityChecks = [];

  // Check for errors in odd columns
  let totalOddColumnOddOnes = 0;
  for (let i = 0; i < 8; ++i) 
  {
    totalOddColumnOddOnes += hammingBlock[2 * i + 1];
  }
  
  // Check if the total number of ones in odd columns is odd
  if (totalOddColumnOddOnes % 2 === 1) {
    console.log("Error detected in odd columns!");
    answersToParityChecks.push(1); // Odd number of ones
  } else {
    console.log("No error detected in odd columns.");
    answersToParityChecks.push(0); // Even number of ones
  }

  // Check for errors on the right-hand side
  let totalRHSOnes = 0;
  for (let i = 0; i < 4; ++i)
  {
    totalRHSOnes += hammingBlock[i * 4 + 2]; // 2, 6, 10, 14
  }
  for (let i = 0; i < 4; ++i)
  {
    totalRHSOnes += hammingBlock[i * 4 + 3]; // 3, 7, 11, 15
  }
  // Check if the total number of ones on the right side is odd
  if (totalRHSOnes % 2 === 1) {
    console.log("Error detected on the right-hand side!");
    answersToParityChecks.push(1); // Odd number of ones on the right side
  } else {
    console.log("No error detected on the right-hand side.");
    answersToParityChecks.push(0); // Even number of ones on the right side
  }
  

  // Check for even in odd rows
  let evenRowOddOnes = 0;
  for (let i = 4; i < 8; ++i) 
  {
    evenRowOddOnes += hammingBlock[i]; // 4,5,6,7
    evenRowOddOnes += hammingBlock[i + 8]; //12,13,14,15
  }

  // Check if the total number of ones in odd rows is odd
  if (evenRowOddOnes % 2 === 1) {
    console.log("Error detected in the even rows!");
    answersToParityChecks.push(1); // Odd number of ones in odd rows
  } else {
    console.log("No error detected on the even rows.");
    answersToParityChecks.push(0); // Even number of ones in odd rows
  }

  // Check for errors in the bottom row
  let totalBottomRowOnes = 0;
  for (let i = 8; i < 16; ++i) 
  {
    totalBottomRowOnes += hammingBlock[i];
  }
  
  // Check if the total number of ones in the bottom row is odd
  if (totalBottomRowOnes % 2 === 1) 
  {
    console.log("Error detected in the bottom row!");
    answersToParityChecks.push(1); // Odd number of ones in the bottom row
  } 
  else 
  {
    console.log("No error detected in the bottom row.");
    answersToParityChecks.push(0); // Even number of ones in the bottom row
  }  

  const size = answersToParityChecks.length;
  const invertedAnswers = answersToParityChecks.slice().reverse();

  let noErrors = true;
  for (let bit of answersToParityChecks) 
  {
    if (bit !== 0) 
    {
      noErrors = false;
      break;
    }
  }
  console.log ("Original parity check answers: ")
  console.log(answersToParityChecks.join(" "));

  if (noErrors) 
  {
    console.log("No error detected OR there is an error at position 0");
  } 
  else 
  {
    console.log("Inverted answer, AKA, where the error is: ");
    console.log(invertedAnswers.join(" "));
    const positionOfError = binaryToDecimal(invertedAnswers);
    console.log("Position of the error is at: " + positionOfError);
    // Correct the error in the Hamming block
    hammingBlock[positionOfError] = !hammingBlock[positionOfError];
  }

  return hammingBlock;
}

function parityCheckForOriginalBlock(hammingBlock) {
  let answersToParityChecks = [];
  let totalOnes = 0;
  for (let i = 0; i < 16; ++i) {
    totalOnes += hammingBlock[i];
  }

  // Set parity bit at position 0 to ensure an even total number of 1's
  if (totalOnes % 2 !== 0) {
    hammingBlock[0] = 1;
  } else {
    hammingBlock[0] = 0;
  }

  // Check to see if there's an odd parity (error) in the odd columns
  let totalEvenColumnOddOnes = 0;
  let errorOddColumns;
  for (let i = 0; i < 8; ++i) {
    totalEvenColumnOddOnes += hammingBlock[2 * i + 1]; // Add the value at odd column positions (1, 5, 9, 13, 3, 7, 11, 15)
  }

  // If total number of ones in odd columns is odd, there's an error
  errorOddColumns = totalEvenColumnOddOnes % 2 === 1;

  if (errorOddColumns) {
    answersToParityChecks.push(1); // Add error status
  } else {
    answersToParityChecks.push(0); // Add no error status
  }

  // Check to see if there's an odd parity (error) on the right-hand side
  let totalRHSOddOnes = 0;
  let errorRHS;
  for (let i = 0; i < 4; ++i) {
    totalRHSOddOnes += hammingBlock[i * 4 + 2]; // Add the value at positions (2, 6, 10, 14) on the right-hand side
    totalRHSOddOnes += hammingBlock[i * 4 + 3]; // Add the value at positions (3, 7, 11, 15) on the right-hand side
  }

  // If total number of ones in right-hand side odd positions is odd, there's an error
  errorRHS = totalRHSOddOnes % 2 === 1;

  if (errorRHS) {
    answersToParityChecks.push(1);
  } else {
    answersToParityChecks.push(0);
  }

  // Check to see if there's an odd parity (error) on the even rows
  let evenRowOnes = 0;
  let evenRows;
  for (let i = 4; i < 8; ++i) {
    evenRowOnes += hammingBlock[i]; // Add the value at positions (4, 5, 6, 7) in the first even row
    evenRowOnes += hammingBlock[i + 8]; // Add the value at positions (12, 13, 14, 15) in the second even row
  }

  // If total number of ones in even rows is odd, there's an error
  evenRows = evenRowOnes % 2 === 1;

  if (evenRows) {
    answersToParityChecks.push(1);
  } else {
    answersToParityChecks.push(0);
  }

  // Check to see if there's an odd parity (error) in the bottom row
  let totalBottomRowOnes = 0;
  let bottomRows;
  for (let i = 8; i < 16; ++i) {
    totalBottomRowOnes += hammingBlock[i]; // Add the value at positions (8, 9, 10, 11, 12, 13, 14, 15) in the bottom row
  }
  // If total number of ones in the bottom row is odd, there's an error
  bottomRows = totalBottomRowOnes % 2 === 1;

  if (bottomRows) {
    answersToParityChecks.push(1);
  } else {
    answersToParityChecks.push(0);
  }

  const size = answersToParityChecks.length;
  const invertedAnswers = answersToParityChecks.slice().reverse();

  let noErrors = true;
  for (let bit of answersToParityChecks) {
    if (bit !== 0) {
      noErrors = false;
      break;
    }
  }

  if (noErrors === false) {
    let positionOfError = binaryToDecimal(invertedAnswers);
    hammingBlock = fixedHammingCode(hammingBlock, positionOfError);
  }
  return hammingBlock;
}


function generateRandomHammingBlock() {
  let hammingBlock = new Array(16).fill(0); // 4x4 matrix, Hamming(15,11) code

  // Generate random data bits
  for (let i = 3; i < 16; ++i) {
      hammingBlock[i] = Math.floor(Math.random() * 2);
  }

  // Calculate parity bits
  hammingBlock[1] = hammingBlock[3] ^ hammingBlock[5] ^ hammingBlock[7] ^ hammingBlock[9] ^ hammingBlock[11] ^ hammingBlock[13] ^ hammingBlock[15];
  hammingBlock[2] = hammingBlock[3] ^ hammingBlock[6] ^ hammingBlock[7] ^ hammingBlock[10] ^ hammingBlock[11] ^ hammingBlock[14] ^ hammingBlock[15];
  hammingBlock[4] = hammingBlock[5] ^ hammingBlock[6] ^ hammingBlock[7] ^ hammingBlock[12] ^ hammingBlock[13] ^ hammingBlock[14] ^ hammingBlock[15];

  hammingBlock = parityCheckForOriginalBlock(hammingBlock);
  hammingBlock = zeroCheck(hammingBlock);

  return hammingBlock;
}


function introduceRandomError(originalBlock) 
{
  const modifiedBlock = [...originalBlock];
  const randomPosition = Math.floor(Math.random() * originalBlock.length);
  modifiedBlock[randomPosition] = !modifiedBlock[randomPosition]; // Flip the bit
  return modifiedBlock;
}

console.log("Generating a 4x4 matrix...");
const hammingBlock = generateRandomHammingBlock();
console.log("Your block is equal to:");
printMatrix(hammingBlock);
console.log();

let errorCode = introduceRandomError(hammingBlock); 
console.log("Your block of code was unfortunately interrupted by noise. Here is your new block of code:");
printMatrix(errorCode);
console.log();

errorCode = parityCheck(errorCode); // Reassign 'errorCode'
errorCode = zeroCheck(errorCode);   // Reassign 'errorCode'
printMatrix(errorCode);
