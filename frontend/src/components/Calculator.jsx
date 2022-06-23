import React, { useState } from 'react'
import '../styles/Calculator.css'

const Calculator = () => {
    const [result, setResult] = useState("");
    const [calculation, setCalculation] = useState("");
    const operators = ['+', '-', '*', '/', '.']

    const createNumbers = () => {
        const numbers = [];

        for (let i = 1; i < 10; i++) {
            numbers.push(<button onClick={() => updateDisplay(i)} key={i}>{i}</button>)
        }
        return numbers;
    };

    const updateDisplay = (clickedButton) => {
        console.log(calculation);
        console.log(clickedButton);

        if ((operators.includes(clickedButton) && calculation === "") || (operators.includes(clickedButton) && operators.includes(calculation.slice(-1)))) return;

        setCalculation(calculation + clickedButton);
    }
    return (
        <div className='calculator'>
            <div className='display'>
                <p className='displayOnTheGo'>(0)</p>
                {calculation || "0"}
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