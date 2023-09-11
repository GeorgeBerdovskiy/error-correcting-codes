import React, { Component } from 'react';
import './rsarray.css';
import {
    generateRandomArrayBlock,
    findSmallestPrimeGreaterOrEqual,
    encodeRandomNumbers,
    introduceErrorsToCodeword,
    calculateNoise,
    introduceRandomError,
    decodeCodeword,
    printMatrix,  
} from './rsgame'; // Import the necessary functions for RS code


class Matrix extends Component {
  constructor() {
    super();
    this.state = {
      randomNumbers: [],
      originalNumbers: [],
      smallestPrime: 0,
      codeword: [],
      receivedCodeword: [],
      noise: [],
      decodedArray: [],
    };
  }

  render() {
    const {
      randomNumbers,
      originalNumbers,
      smallestPrime,
      codeword,
      receivedCodeword,
      noise,
      decodedArray,
    } = this.state;

    return (
      <div>
        <h2>Matrix Display</h2>
        <div>
          <p>Original Numbers:</p>
          <div className="matrix">
            {originalNumbers.map((number, index) => (
              <span key={index}>{`[${number}] `}</span>
            ))}
          </div>
        </div>
        <div>
          <p>Random Numbers:</p>
          <div className="matrix">
            {randomNumbers.map((number, index) => (
              <span key={index}>{`[${number}] `}</span>
            ))}
          </div>
        </div>
        <div>
          <p>Encoded Codeword:</p>
          <div className="matrix">
            {codeword.map((number, index) => (
              <span key={index}>{`[${number}] `}</span>
            ))}
          </div>
        </div>
        <div>
          <p>Received Codeword:</p>
          <div className="matrix">
            {receivedCodeword.map((number, index) => (
              <span key={index}>{`[${number}] `}</span>
            ))}
          </div>
        </div>
        <div>
          <p>Noise Added:</p>
          <div className="matrix">
            {noise.map((number, index) => (
              <span key={index}>{`[${number}] `}</span>
            ))}
          </div>
        </div>
        <div>
          <p>Decoded Array:</p>
          <div className="matrix">
            {decodedArray.map((number, index) => (
              <span key={index}>{`[${number}] `}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Matrix;
