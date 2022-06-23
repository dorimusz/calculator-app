import React from 'react'

const Calculator = () => {
    const createNumbers = () => {
        const numbers = [];

        for (let i = 1; i < 10; i++) {
            numbers.push(<button key={i}>{i}</button>)
        }

        return numbers;
    }
    return (
        <div className='calculator'>
            <div className='display'>
                <span className='displayOnTheGo'>(0)</span>0
            </div>

            <div className='operators'>
                <button>C</button>
                <button>+</button>
                <button>-</button>
                <button>*</button>
                <button>/</button>
                <button>=</button>
            </div>

            <div className='numbers'>
                {createNumbers()}
                <button className='decimal'>.</button>
                <button>0</button>
            </div>

            <div className='calcMemory'>
                <button>SAVE</button>
                <button>MEM</button>
            </div>

        </div>
    )
}

export default Calculator