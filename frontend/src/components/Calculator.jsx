import React, { useState } from 'react'
import '../styles/Calculator.css'

const Calculator = () => {
    const [resultDisp, setResultDisp] = useState("");
    const [calculation, setCalculation] = useState("");
    const operators = ['+', '-', '*', '/', '.']

    const createNumbers = () => {
        const numbers = [];

        for (let i = 1; i < 10; i++) {
            numbers.push(<button onClick={() => updateResultDisp(i.toString())} key={i}>{i}</button>)
        }
        return numbers;
    };

    const updateResultDisp = (clickedButton) => {
        // console.log(calculation);
        // console.log(clickedButton);

        if ((operators.includes(clickedButton) && calculation === "") || (operators.includes(clickedButton) && operators.includes(calculation.slice(-1)))) return;

        setCalculation(calculation + clickedButton);

        if (!operators.includes(clickedButton)) {
            setResultDisp(eval(calculation + clickedButton).toString())
        }
    }

    const equalsTo = () => {
        setCalculation(eval(calculation).toString())
    }
    return (
        <div className='calculator'>
            <div className='display'>
                {/* {resultDisp ? <p className='displayOnTheGo'>{resultDisp}</p> : ''} */}
                <p>{resultDisp || '...'}</p>
                <p>{calculation || "0"}</p>

            </div>

            <div className='calculatorBody'>
                <div className='operators'>
                    <button>C</button>
                    <button onClick={() => updateResultDisp('+')}>+</button>
                    <button onClick={() => updateResultDisp('-')}>-</button>
                    <button onClick={() => updateResultDisp('*')}>*</button>
                    <button onClick={() => updateResultDisp('/')}>/</button>
                    <button onClick={equalsTo}>=</button>
                </div>

                <div className='numbers'>
                    {createNumbers()}
                    <button onClick={() => updateResultDisp('.')}>.</button>
                    <button onClick={() => updateResultDisp('0')}>0</button>
                </div>

                <div className='calcMemory'>
                    <button>SAVE</button>
                    <button>MEM</button>
                </div>
            </div>
        </div>
    )
}

export default Calculator