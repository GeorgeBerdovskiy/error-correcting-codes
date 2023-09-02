import React, { useEffect, useState } from 'react'
import HammingIntro from './interactions/HammingIntro'

const Interaction = (props) => {
    console.log(props)
    switch (props.props.key) {
        case "1":
            return <HammingIntro></HammingIntro>
        default:
            return <>Not found :(</>
    }
}

export default Interaction;