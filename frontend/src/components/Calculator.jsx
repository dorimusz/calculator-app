import React, { useState } from 'react'
import '../styles/Calculator.css'
import Numbers from '../components/Numbers'

const Calculator = () => {
    const [resultDisp, setResultDisp] = useState("");
    const [calculation, setCalculation] = useState("");
    const operators = ['+', '-', '*', '/', '.']

    const updateResultDisp = (clickedButton) => {
        if ((operators.includes(clickedButton) && calculation === "") || (operators.includes(clickedButton) && operators.includes(calculation.slice(-1)))) return;

        setCalculation(calculation + clickedButton);

        if (!operators.includes(clickedButton)) {
            setResultDisp(eval(calculation + clickedButton).toString())
        }
    }

    const equalsTo = () => {
        setCalculation(eval(calculation).toString())
    }

    const clearAll = () => {
        setCalculation("");
        setResultDisp("");
    }


    return (
        <div className='calculator'>
            <div className='display'>
                {/* {resultDisp ? <p className='displayOnTheGo'>{resultDisp}</p> : ''} */}
                <p>{resultDisp || '...'}</p>
                <p>{calculation || "0"}</p>

            </div>

            <div className='calculator-grid'>
                <div className='numbers'>
                    {/* {createNumbers()} */}
                    <Numbers updateResultDisp={updateResultDisp} />
                    <button onClick={() => updateResultDisp('.')}>.</button>
                    <button onClick={() => updateResultDisp('0')}>0</button>
                    <button onClick={equalsTo}>=</button>
                </div>

                <div className='operators'>
                    <button onClick={() => updateResultDisp('+')}>+</button>
                    <button onClick={() => updateResultDisp('-')}>-</button>
                    <button onClick={() => updateResultDisp('*')}>*</button>
                    <button onClick={() => updateResultDisp('/')}>/</button>
                    <button onClick={() => clearAll()}>C</button>
                </div>


                <div className='memory'>
                    <button className='saveBtn'>SAVE</button>
                    <button className='saveBtn'>MEM</button>
                </div>
            </div>
        </div>
    )
}

export default Calculator