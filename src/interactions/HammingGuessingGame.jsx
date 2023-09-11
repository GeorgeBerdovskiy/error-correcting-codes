import React, { useEffect, useState } from 'react';
import './HammingTable.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  printMatrix,
  generateRandomHammingBlock,
  introduceRandomError,
} from './hamming';

// Function to perform parity check for odd columns
const parityCheckForEvenColumns = (matrix) => {
  let totalEvenColumnOddOnes = 0;

  for (let i = 0; i < 8; ++i) {
    totalEvenColumnOddOnes += matrix[2 * i + 1];
  }

  // If the total number of ones in odd columns is odd, there's an error
  return totalEvenColumnOddOnes % 2 === 1;
};

// Function to perform parity check for the right-hand side
const parityCheckForRightSide = (matrix) => {
  let totalRHSOddOnes = 0;

  for (let i = 0; i < 4; ++i) {
    totalRHSOddOnes += matrix[i * 4 + 2]; // Add the value at positions (2, 6, 10, 14) on the right-hand side
    totalRHSOddOnes += matrix[i * 4 + 3]; // Add the value at positions (3, 7, 11, 15) on the right-hand side
  }

  // If the total number of ones in right-hand side odd positions is odd, there's an error
  return totalRHSOddOnes % 2 === 1;
};

// Function to perform parity check for even rows
const parityCheckForEvenRows = (matrix) => {
  let evenRowOnes = 0;

  for (let i = 4; i < 8; ++i) {
    evenRowOnes += matrix[i]; // Add the value at positions (4, 5, 6, 7) in the first even row
    evenRowOnes += matrix[i + 8]; // Add the value at positions (12, 13, 14, 15) in the second even row
  }

  // If the total number of ones in even rows is odd, there's an error
  return evenRowOnes % 2 === 1;
};

// Function to perform parity check for the bottom row
const parityCheckForBottomRow = (matrix) => {
  let totalBottomRowOnes = 0;

  for (let i = 8; i < 16; ++i) {
    totalBottomRowOnes += matrix[i]; // Add the value at positions (8, 9, 10, 11, 12, 13, 14, 15) in the bottom row
  }

  // If the total number of ones in the bottom row is odd, there's an error
  return totalBottomRowOnes % 2 === 1;
};

const HammingGuessingGame = () => {
  const [matrix, setMatrix] = useState([]); // Initialize matrix as an empty array
  const [guess, setGuess] = useState(Array.from({ length: 16 }, () => 0));
  const [originalErrorPosition, setOriginalErrorPosition] = useState(-1); // Store the original error position

  // Function to generate a new incorrect block
  const generateNewIncorrectBlock = () => {
    const hammingBlock = generateRandomHammingBlock();
    console.log('Original Hamming Block:');
    printMatrix(hammingBlock);

    // Introduce an error to create an incorrect Hamming block
    const incorrectBlock = introduceRandomError(hammingBlock);
    console.log('Incorrect Hamming Block:');
    printMatrix(incorrectBlock);

    // Calculate and store the original error position
    const errorArray = [];
    if (parityCheckForEvenColumns(incorrectBlock)) {
      errorArray.push(1);
    } else {
      errorArray.push(0);
    }
    if (parityCheckForRightSide(incorrectBlock)) {
      errorArray.push(1);
    } else {
      errorArray.push(0);
    }
    if (parityCheckForEvenRows(incorrectBlock)) {
      errorArray.push(1);
    } else {
      errorArray.push(0);
    }
    if (parityCheckForBottomRow(incorrectBlock)) {
      errorArray.push(1);
    } else {
      errorArray.push(0);
    }

    // Invert the error array and translate to decimal
    const errorPosition = parseInt(
      errorArray.map((bit) => (bit === 0 ? 1 : 0)).join(''),
      2
    );
    setOriginalErrorPosition(errorPosition);

    return incorrectBlock;
  };

  useEffect(() => {
    // Initialize matrix with a new incorrect block on mount
    setMatrix(generateNewIncorrectBlock());
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleRandomizeClick = () => {
    // Generate and set a new incorrect block when the button is clicked
    setMatrix(generateNewIncorrectBlock());
  };

  const handleClick = (rowIndex, columnIndex) => {
    // Toggle the bit in the guess array
    const newGuess = [...guess];
    newGuess[rowIndex * 4 + columnIndex] =
      newGuess[rowIndex * 4 + columnIndex] === 0 ? 1 : 0;
  
    // Update the matrix state with the new guess
    const newMatrix = [...matrix];
    newMatrix[rowIndex * 4 + columnIndex] =
      newGuess[rowIndex * 4 + columnIndex];
  
    setGuess(newGuess);
    setMatrix(newMatrix);
  
    // Check if the clicked bit is correct or incorrect
    const clickedBit = matrix[rowIndex * 4 + columnIndex];
    if (clickedBit === newGuess[rowIndex * 4 + columnIndex]) {
      // Bit is correct
      console.log('Bit is correct');
      toast.success('Correct!', { position: toast.POSITION.TOP_CENTER });
    } else {
      // Bit is incorrect
      console.log('Bit is incorrect');
  
      // Initialize error position to -1
      let errorPosition = -1;
  
      // Check parity checks
      if (parityCheckForEvenColumns(newMatrix)) {
        errorPosition = 1;
      }
      if (parityCheckForRightSide(newMatrix)) {
        errorPosition = 2;
      }
      if (parityCheckForEvenRows(newMatrix)) {
        errorPosition = 3;
      }
      if (parityCheckForBottomRow(newMatrix)) {
        errorPosition = 4;
      }
  
      // Check for the 0th bit if all parity checks are correct
      if (errorPosition === -1) 
      {
          errorPosition = 0;
      }
  
      console.log('Error Position:', errorPosition);
      if (errorPosition !== -1) {
        toast.error(`Incorrect! Error Position: ${errorPosition}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error('Incorrect!', { position: toast.POSITION.TOP_CENTER });
      }
  
      // Provide hints based on parity checks
      const hints = [];
  
      if (errorPosition === 1) {
        hints.push('Error detected in odd columns!');
      }
      if (errorPosition === 2) {
        hints.push('Error detected on the right-hand side!');
      }
      if (errorPosition === 3) {
        hints.push('Error detected in the even rows!');
      }
      if (errorPosition === 4) {
        hints.push('Error detected in the bottom row!');
      }
      if (errorPosition === 0) {
        hints.push('Error detected in the 0th bit!');
      }
  
      // Display hints as notifications
      if (hints.length > 0) {
        hints.forEach((hint) =>
          toast.info(hint, { position: toast.POSITION.TOP_CENTER })
        );
      }
    }
  };

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
            <button onClick={() => handleClick(rowIndex, colIndex)}>
              {renderedValue}
            </button>
          </td>
        );
      }
      tableRows.push(<tr key={rowIndex}>{rowCells}</tr>);
    }

    // Define styles for the centered rectangle
    const centerStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '20px', // Adjust margin as needed
      background: '#f0f0f0', // Background color
      border: '2px solid #000', // Border styling
      borderRadius: '5px', // Rounded corners
      padding: '10px', // Padding for the rectangle
    };

    // Include the "Randomize" button within the centered rectangle
    const randomizeButtonStyle = {
      padding: '5px 10px', // Padding for the button
      border: 'none', // Remove border
      background: 'transparent', // Transparent background
      cursor: 'pointer', // Cursor style
      marginLeft: '-5px', // Add negative left margin to shift the button slightly to the left
      display: 'flex', // Use flexbox for centering
      alignItems: 'center', // Center vertically
      justifyContent: 'center', // Center horizontally
      textAlign: 'center', // Center the text within the button
    };

    const randomizeButton = (
      <div style={centerStyle} onClick={handleRandomizeClick}>
        <button style={randomizeButtonStyle}>Randomize</button>
      </div>
    );

    // Add the centered rectangle with the button to the last row
    tableRows.push(
      <tr key="randomize">
        <td colSpan="4" style={{ textAlign: 'center' }}>
          {randomizeButton}
        </td>
      </tr>
    );

    return (
      <table style={{ margin: '0 auto' }}>
        <tbody>{tableRows}</tbody>
      </table>
    );
  };

  return (
    <div>
      <p>Can you guess which bit is incorrect?</p>
      <p>Click any of the bits to flip them.</p>
      {renderTable()}
      <ToastContainer /> {/* Place the ToastContainer here */}
    </div>
  );
};

export default HammingGuessingGame;
