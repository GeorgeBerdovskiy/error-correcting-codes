import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './HammingTable.css';

import { generateRandomHammingBlock, introduceRandomError } from './hamming';

const HammingGuessingGame = () => {
	const [matrix, setMatrix] = useState([]);
	const [incorrectBlock, setIncorrectBlock] = useState([]);
  const [coloring, setColoring] = useState([0, 0]);

  function color(index) {
    switch (index) {
      case 1:
        return "rgba(46, 213, 115,0.25)";
      case 2:
        return "rgba(255, 99, 72,0.25)";
      default:
        return "clear";
    }
  }

  function generateBlock() {
    const originalBlock = generateRandomHammingBlock();
    const incorrectBlock = introduceRandomError(originalBlock);

    setMatrix(originalBlock);
    setIncorrectBlock(incorrectBlock);
  }

	useEffect(() => {
		generateBlock();
	}, []);

  useEffect(() => {
    setColoring([0, 0]);
  }, [matrix])

	function handleRandomizeClick() {
    setMatrix([]);

    setTimeout(() => {
      generateBlock();
    }, 0);
	}

	const handleClick = (rowIndex, columnIndex) => {
    let incorrectCopy = JSON.parse(JSON.stringify(incorrectBlock));
    incorrectCopy[rowIndex * 4 + columnIndex] = (incorrectCopy[rowIndex * 4 + columnIndex] === 0) ? 1 : 0;

    let correct = true;

    for (let i = 0; i < matrix.length; i++) {
      if (incorrectCopy[i] != matrix[i]) {
        correct = false;
        break;
      }
    }

    if (correct) {
      toast.success(`Correct!`, { position: toast.POSITION.TOP_CENTER });
      setColoring([rowIndex * 4 + columnIndex, 1]);
    } else {
      toast.error(`Incorrect - try again.`, { position: toast.POSITION.TOP_CENTER });
      setColoring([rowIndex * 4 + columnIndex, 2]);
    }
	};

	const renderTable = () => {
		if (incorrectBlock.length === 0) {
			return null; // Return null if the matrix is empty
		}

		const tableRows = [];
		for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
			const rowCells = [];
			for (let colIndex = 0; colIndex < 4; colIndex++) {
				const cellValue = incorrectBlock[rowIndex * 4 + colIndex];
				const renderedValue = cellValue ? 1 : 0; // Convert boolean to integer
				rowCells.push(
					<td key={colIndex}>
						<button style={{ backgroundColor: coloring[0] === rowIndex * 4 + colIndex ? color(coloring[1]) : "clear" }} onClick={() => handleClick(rowIndex, colIndex)}>
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
			{ renderTable() }
			<ToastContainer/>
			<button className='standard' style={{ margin: "0 auto", display: "block", marginTop: "16px" }} onClick={handleRandomizeClick}>Randomize</button>
		</div>
	);
};

export default HammingGuessingGame;
