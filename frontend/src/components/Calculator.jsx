import React, { useState } from 'react'
import '../styles/Calculator.css'

const Calculator = () => {
    const [result, setResult] = useState("");
    const [display, setDisplay] = useState("");

    const createNumbers = () => {
        const numbers = [];

        for (let i = 1; i < 10; i++) {
            numbers.push(<button onClick={() => updateDisplay(i)} key={i}>{i}</button>)
        }

        return numbers;
    };

    const updateDisplay = (clickedButton) => {
        setDisplay(display + clickedButton);
        console.log(display);
        console.log(clickedButton);
    }
    return (
        <div className='calculator'>
            <div className='display'>
                <p className='displayOnTheGo'>(0)</p>
                {display || "0"}
            </div>

            <div className='operators'>
                <button>C</button>
                <button onClick={() => updateDisplay('+')}>+</button>
                <button onClick={() => updateDisplay('-')}>-</button>
                <button onClick={() => updateDisplay('*')}>*</button>
                <button onClick={() => updateDisplay('/')}>/</button>
                <button>=</button>
            </div>

            <div className='numbers'>
                {createNumbers()}
                <button onClick={() => updateDisplay('.')}>.</button>
                <button onClick={() => updateDisplay('0')}>0</button>
            </div>

            <div className='calcMemory'>
                <button>SAVE</button>
                <button>MEM</button>
            </div>

        </div>
    )
}

export default Calculator