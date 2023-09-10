import React, { useEffect, useState } from 'react';
import './HammingTable.css';
import {
  printMatrix,
  generateRandomHammingBlock,
  introduceRandomError,
} from './hamming'; // Import the necessary functions
// work on hints and making og hamming block always correct

const HammingGuessingGame = () => {
  const [matrix, setMatrix] = useState([]); // Initialize matrix as an empty array
  const [guess, setGuess] = useState(Array.from({ length: 16 }, () => 0));

  useEffect(() => {
    // Generate a random Hamming block
    const hammingBlock = generateRandomHammingBlock();
    console.log('Original Hamming Block:');
    printMatrix(hammingBlock);

    // Introduce an error to create an incorrect Hamming block
    const incorrectBlock = introduceRandomError(hammingBlock);
    console.log('Incorrect Hamming Block:');
    printMatrix(incorrectBlock);

    // Set the matrix state to the incorrect matrix
    setMatrix(incorrectBlock);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleClick = (rowIndex, columnIndex) => {
    // Clone the current guess array to avoid mutating state directly
    const newGuess = [...guess];
  
    // Toggle the bit (0 to 1 or 1 to 0) when clicked
    newGuess[rowIndex * 4 + columnIndex] = newGuess[rowIndex * 4 + columnIndex] === 0 ? 1 : 0;
  
    // Update the guess state
    setGuess(newGuess);
  
    // Check if the clicked bit is correct or incorrect
    const clickedBit = matrix[rowIndex * 4 + columnIndex];
    if (clickedBit === newGuess[rowIndex * 4 + columnIndex]) {
      // Bit is correct
      console.log('Correct!');
    } else {
      // Bit is incorrect
      console.log('Incorrect!');
  
      // Provide a hint based on the answers to parity checks
      const hints = [];
  
      // Check parity checks and add hints
      if (parityCheckForOddColumns(matrix)) {
        hints.push('Error detected in odd columns!');
      }
      if (parityCheckForRightSide(matrix)) {
        hints.push('Error detected on the right-hand side!');
      }
      if (parityCheckForEvenRows(matrix)) {
        hints.push('Error detected in the even rows!');
      }
      if (!parityCheckForBottomRow(matrix)) {
        hints.push('No error detected in the bottom row.');
      }
  
      // Display hints to the player
      if (hints.length > 0) {
        console.log('Hints:');
        hints.forEach((hint) => console.log(hint));
      }
    }
  
    // Update the matrix state with the corrected guess
    const newMatrix = [...matrix];
    newMatrix[rowIndex * 4 + columnIndex] = newGuess[rowIndex * 4 + columnIndex];
    setMatrix(newMatrix);
  };
  
  console.log('Matrix is:');
  printMatrix(matrix);

  const renderTable = () => {
    if (matrix.length === 0) {
      return null; // Return null if the matrix is empty
    }

    const tableRows = [];
    for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
      const rowCells = [];
      for (let colIndex = 0; colIndex < 4; colIndex++) {
        const cellValue = matrix[rowIndex * 4 + colIndex];
        const renderedValue = cellValue ? 1 : 0; // Convert boolean to integer
        rowCells.push(
          <td key={colIndex}>
            <button
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              {renderedValue}
            </button>
          </td>
        );
      }
      tableRows.push(<tr key={rowIndex}>{rowCells}</tr>);
    }
    return (
      <table style={{ margin: '0 auto' }}>
        <tbody>{tableRows}</tbody>
      </table>
    );
  };

  return (
    <div>
      <p>Can you guess which bit is incorrect?</p>
      {renderTable()}
    </div>
  );
};

export default HammingGuessingGame;
