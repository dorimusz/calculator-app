import React from 'react'
import '../styles/Display.css';

const Display = (props) => {

    return (
        <div className='display'>
            <div className='dispContent'>
                <p className='result secondaryResult'>{props.secondaryDisp || ''}</p>
                <p className='result'>{props.result || '0'}</p>
            </div>
        </div>
    )
}

export default Display