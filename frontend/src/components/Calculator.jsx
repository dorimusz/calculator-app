import React, { useState } from 'react'
import http from 'axios'
import '../styles/Calculator.css'
import Numbers from '../components/Numbers'
import ErrorMessage from './ErrorMessage';
const backendURL = 'http://localhost:4000/api'

const Calculator = () => {
    const [resultDisp, setResultDisp] = useState("");
    const [calculation, setCalculation] = useState("");
    const [error, setError] = useState(null);
    const operators = ['+', '-', '*', '/', '.'];

    const updateResultDisp = (clickedButton) => {
        if ((operators.includes(clickedButton) && calculation === "") || (operators.includes(clickedButton) && operators.includes(calculation.slice(-1)))) return;

        setCalculation(calculation + clickedButton);

        if (!operators.includes(clickedButton)) {
            setResultDisp(eval(calculation + clickedButton).toString())
        }
    }

    const equalsTo = () => {
        setResultDisp(calculation) //because save option
        setCalculation(eval(calculation).toString())
    }

    const clearAll = () => {
        setCalculation("");
        setResultDisp("");
    }

    const saveMem = async () => {
        const response = await http.post(`${backendURL}//addMem`, {
            //had to change the variables' value with the setter, bc after equation
            calculation: resultDisp,
            result: calculation,
            timestamp: "time"
        })
        console.log(response);
        if (response.status !== 200) setError("something went wrong")

        setCalculation("");
        setResultDisp("");
    }

    return (
        <>
            <div className='calculator'>
                <div className='display'>
                    {/* {resultDisp ? <p className='displayOnTheGo'>{resultDisp}</p> : ''} */}
                    <p>{resultDisp || '(0)'}</p>
                    <p>{calculation || '0'}</p>

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
                        <button onClick={saveMem} className='saveBtn'>SAVE</button>
                        <button className='saveBtn'>MEM</button>
                    </div>
                </div>
            </div>

            <ErrorMessage error={error} />
        </>
    )
}

export default Calculator