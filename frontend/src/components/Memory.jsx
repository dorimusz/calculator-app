import React from 'react'
import '../styles/Memory.css';

const Memory = ({ memory }) => {

    return (
        <div className='memory'>
            {memory.calculation}
        </div>
    )
}

export default Memory