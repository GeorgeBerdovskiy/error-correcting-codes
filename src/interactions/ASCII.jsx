import React, { useEffect, useState } from 'react';

import './HammingTable.css';
import './ASCII.css';

const ASCII = () => {
    const [message, setMessage] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
	const [decoded, setDecoded] = useState("");

	function getRandomAsciiCharacter() {
		const randomCharCode = Math.floor(Math.random() * (127 - 32)) + 32;
		const randomCharacter = String.fromCharCode(randomCharCode);
		return randomCharacter;
	}

	function generateMessage() {
		let input = getRandomAsciiCharacter();

		console.log(input)

		let result = input.charCodeAt(0).toString(2);

		let pendingMessage = []
		for (let character of result) {
			pendingMessage.push(Number(character));
		}

		if (pendingMessage.length < 8) {
			while (pendingMessage.length < 7) {
				pendingMessage = [0].concat(pendingMessage);
			}

			// Calculate parity bit
			let runningParity = pendingMessage[0];

			for (let i = 1; i < pendingMessage.length; i++) {
				runningParity += pendingMessage[i];
			}

			pendingMessage = [runningParity % 2].concat(pendingMessage);
		}

		setMessage(pendingMessage);
	}

	function flipBit(index) {
		let temp = JSON.parse(JSON.stringify(message));
		temp[index] = (message[index] === 0) ? 1 : 0;
		setMessage(temp);
	}

	useEffect(() => {
		generateMessage();
	}, []);

	useEffect(() => {
		let temp = JSON.parse(JSON.stringify(message));

		let parityBit = temp[0]

		let runningParity = temp[1]

		for (let i = 2; i < temp.length; i++) {
			runningParity += temp[i];
		}

		console.log("CHECKING PARITY");
		console.log(temp);
		console.log(parityBit)
		console.log(runningParity % 2)

		if (parityBit === runningParity % 2) {
			temp[0] = (temp[0] === 1) ? 0 : 1;

			setDecoded(String.fromCharCode(parseInt(temp.join(""), 2)));
		} else {
			setDecoded("Invalid code.")
		}
	}, [message]);

	function handleRandomizeClick() {
		generateMessage();
	}

    return(
        <div>
            <p>The following byte represents an ASCII character. Press any bit and see what happens! The <b>parity bit</b> is highlighted.</p>

			<table>
				<td>
					<tr>
						<button style={{ backgroundColor: "rgba(255, 165, 2, 0.25)" }} onClick={() => flipBit(0)}>
							{ message[0] }
						</button>

						<button onClick={() => flipBit(1)}>
							{ message[1] }
						</button>

						<button onClick={() => flipBit(2)}>
							{ message[2] }
						</button>

						<button onClick={() => flipBit(3)}>
							{ message[3] }
						</button>

						<button onClick={() => flipBit(4)}>
							{ message[4] }
						</button>

						<button onClick={() => flipBit(5)}>
							{ message[5] }
						</button>

						<button onClick={() => flipBit(6)}>
							{ message[6] }
						</button>

						<button onClick={() => flipBit(7)}>
							{ message[7] }
						</button>
					</tr>
				</td>
			</table>

			<div>
			<p>The decoded character is...</p>

                <span className='larger-result mono'>
                    <span>{ decoded }</span>
                </span>
            </div>

			<button className='standard' style={{ margin: "0 auto", display: "block", marginTop: "16px" }} onClick={handleRandomizeClick}>Randomize</button>
        </div>
    )
}

export default ASCII;