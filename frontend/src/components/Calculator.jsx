import React, { useState } from 'react';
import http from 'axios';
import '../styles/Calculator.css';
import Numbers from '../components/Numbers';
import ErrorMessage from './ErrorMessage';
import { calc } from "../utils/calculation";
const backendURL = 'http://localhost:4000/api';


const Calculator = () => {
    // const { addNums, subtractNums, multiplyNums, divNums } = calc();
    // const [resultDisp, setResultDisp] = useState("");
    const [error, setError] = useState(null);

    const [calculation, setCalculation] = useState("")
    const [number, setNumber] = useState(""); //display
    const [prevNumber, setPrevNumber] = useState(0);
    const [operator, setOperator] = useState();
    const operators = ['+', '-', '*', '/', '.'];

    const handleClick = (clickedButton) => {
        if ((operators.includes(clickedButton) && number === 0) || (operators.includes(clickedButton) && operators.includes(number.slice(-1)))) return; //cannot start with operator, operator cannot be the last clicked button

        setNumber(number + clickedButton)
    }

    const handleOperator = (clickedButton) => {
        setPrevNumber(number);
        setNumber(number + clickedButton);
        setOperator(clickedButton)

    }

    const equalsTo = () => {
        let result = 0;

        switch (operator) {
            case "+": {
                result = parseFloat(prevNumber) + parseFloat(number)
                break;
            }
            case "-": {

                break;
            }
            case "*": {

                break;
            }
            case "/": {

                break;
            }
            default: { //kinda same as if-else's else
                console.log("Called with unknown operator ");
            }
        }
        setNumber(result)
    }

    const clearAll = () => {
        setNumber("");
    }

    const saveMem = async () => {
        const response = await http.post(`${backendURL}/memory`, {
            result: number,
            timestamp: "time"
        })
        if (response.status !== 200) setError("something went wrong")

        setNumber("");
        // setResultDisp("");
    }

    return (
        <>
            <div className='calculator'>
                <div className='display'>
                    {/* <p>{resultDisp || '(0)'}</p> */}
                    <p>{number || '0'}</p>

                </div>

                <div className='calculator-grid'>
                    <div className='numbers'>
                        <Numbers handleClick={handleClick} />
                        <button onClick={() => handleClick('.')}>.</button>
                        <button onClick={() => handleClick('0')}>0</button>
                        <button onClick={equalsTo}>=</button>
                    </div>

                    <div className='operators'>
                        <button onClick={() => handleOperator('+')}>+</button>
                        <button onClick={() => handleOperator('-')}>-</button>
                        <button onClick={() => handleOperator('*')}>*</button>
                        <button onClick={() => handleOperator('/')}>/</button>
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