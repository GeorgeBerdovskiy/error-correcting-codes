import React, { useEffect, useState } from 'react'
import HammingGuessingGame from './interactions/HammingGuessingGame'
import Repitition from './interactions/Repitition'

const Interaction = (props) => {
    console.log(props)
    switch (props.props.key) {
        case "4":
            return <HammingGuessingGame></HammingGuessingGame>
        case "2":
            return <Repitition></Repitition>
        case "5":
            return <rsgame></rsgame>
        default:
            return <>Not found :(</>
    }
}

export default Interaction;
