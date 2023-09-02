import React, { useEffect, useState } from 'react'

const Repitition = () => {
    const [message, setMessage] = useState("");
    const [codeword, setCodeword] = useState("");

    function encode() {
        setCodeword(message);
    }

    return(
        <div>
            <p>Enter any message using the binary alphabet and we will use <b>triple repitition</b> to encode it.</p>

            <div className='field-and-button'>
                <input className='mono' type="text" value={message} onChange={e => setMessage(e.target.value)}/>
                <button className='standard' onClick={encode}>Encode</button>
            </div>

            <div>
                <span className='larger-result mono'>
                    <span style={{ textDecoration: "underline" }}>{ codeword }</span>
                    <span>{ ` ${codeword} ` }</span>
                    <span>{ codeword }</span>
                </span>
            </div>
        </div>
    )
}

export default Repitition;