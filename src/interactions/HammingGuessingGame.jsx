import React, { useEffect, useState } from 'react'
import './HammingTable.css';

const HammingGuessingGame = (props) => {
console.log(props)

const [matrix, setMatrix] = useState(
    Array.from({ length: 4 }, () => Array(4).fill(0))
  );

    return(
        <div>
            <p>Can you guess which bit is incorrect?</p>

            <table style={{ margin: "0 auto" }}>
                <tbody>
                {matrix.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                    {row.map((cell, columnIndex) => (
                        <td key={columnIndex}>
                        <button
                            onClick={() => handleClick(rowIndex, columnIndex)}
                        >
                            {cell}
                        </button>
                        </td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>

            <button className='standard' style={{ display: "block", margin: "0 auto", marginTop: "16px" }}>Check</button>
        </div>
    )
}

export default HammingGuessingGame;