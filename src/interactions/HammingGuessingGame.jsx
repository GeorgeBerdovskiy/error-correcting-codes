import React, { useEffect, useState } from 'react';
import './HammingTable.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  printMatrix,
  generateRandomHammingBlock,
  introduceRandomError,
  binaryToDecimal,
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
  const [matrix, setMatrix] = useState([]);
  const [originalErrorPosition, setOriginalErrorPosition] = useState(-1);
  const [incorrectBlock, setIncorrectBlock] = useState([]);

  const generateNewIncorrectBlock = () => {
    const hammingBlock = generateRandomHammingBlock();
    console.log('Original Hamming Block:');
    printMatrix(hammingBlock);

    const incorrectBlock = introduceRandomError(hammingBlock);
    console.log('Incorrect Hamming Block:');
    printMatrix(incorrectBlock);

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

    const errorPosition = parseInt(
      errorArray.map((bit) => (bit === 0 ? 1 : 0)).join(''),
      2
    );
    setOriginalErrorPosition(errorPosition);
    setIncorrectBlock(incorrectBlock);
    return incorrectBlock;
  };

  useEffect(() => {
    setMatrix(generateNewIncorrectBlock());
  }, []);

  const handleRandomizeClick = () => {
    setMatrix(generateNewIncorrectBlock());
  };

  const handleClick = (rowIndex, columnIndex) => {
    let errorPosition = [];
  
    // Check parity checks
    if (parityCheckForEvenColumns(matrix)) {
      errorPosition.push(1);
    } else if (!parityCheckForEvenColumns(matrix)) {
      errorPosition.push(0);
    }
    if (parityCheckForRightSide(matrix)) {
      errorPosition.push(1);
    } else if (!parityCheckForRightSide(matrix)) {
      errorPosition.push(0);
    }
    if (parityCheckForEvenRows(matrix)) {
      errorPosition.push(1);
    } else if (!parityCheckForEvenRows(matrix)) {
      errorPosition.push(0);
    }
    if (parityCheckForBottomRow(matrix)) {
      errorPosition.push(1);
    } else if (!parityCheckForBottomRow(matrix)) {
      errorPosition.push(0);
    }
  
    const invertedError = errorPosition.slice().reverse();
  
    let noErrors = true;
    for (let bit of errorPosition) {
      if (bit !== 0) {
        noErrors = false;
        break;
      }
    }
  
    let positionOfError = -1;
  
    if (noErrors == false) {
      positionOfError = binaryToDecimal(invertedError);
    }
  
    const clickedBit = matrix[rowIndex * 4 + columnIndex];
  
    if (clickedBit === incorrectBlock[positionOfError]) {
      toast.success('You got it right!', { position: toast.POSITION.TOP_CENTER });
    } 
    else 
    {
      console.log('Error Position:', positionOfError);
      if (clickedBit !== incorrectBlock[positionOfError]) {
        toast.error(`Incorrect!`, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else 
      {
        toast.error('Incorrect!', { position: toast.POSITION.TOP_CENTER });
      }
  
      // Provide hints based on parity checks
      const hints = [];
  
      if (errorPosition[0] === 1) {
        hints.push('Error detected in even columns!');
      }
      if (errorPosition[1] === 1) {
        hints.push('Error detected on the right-hand side!');
      }
      if (errorPosition[2] === 1) {
        hints.push('Error detected in the even rows!');
      }
      if (errorPosition[3] === 1) {
        hints.push('Error detected in the bottom row!');
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
      {renderTable()}
      <ToastContainer /> {/* Place the ToastContainer here */}
    </div>
  );
};

export default HammingGuessingGame;
