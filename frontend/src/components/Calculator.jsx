import React, { useState } from 'react';
import http from 'axios';
import '../styles/Calculator.css';
import Numbers from '../components/Numbers';
import ErrorMessage from './ErrorMessage';
// import { calc } from "../utils/calculation";
const backendURL = 'http://localhost:4000/api';


const Calculator = () => {
    // const { addNums, subtractNums, multiplyNums, divNums } = calc();
    const [error, setError] = useState(null);

    const [secondaryDisp, setSecondaryDisp] = useState("")
    const [result, setResult] = useState(""); //display

    const [number, setNumber] = useState("");
    const [prevNumber, setPrevNumber] = useState("");
    const [operator, setOperator] = useState(null);
    const operators = ['+', '-', '*', '/', '.'];

    const handleClick = (clickedButton) => {
        if ((operators.includes(clickedButton) && number === 0) || (operators.includes(clickedButton) && operators.includes(number.slice(-1)))) return; //cannot start with operator, operator cannot be the last clicked button

        setNumber(number + clickedButton);
        setResult(number + clickedButton);

        if (prevNumber !== "") return setResult(prevNumber + operator + clickedButton);
    }

    const handleOperator = (clickedButton) => {
        if (operator !== null) return;
        setPrevNumber(number);
        setNumber("");
        setOperator(clickedButton)
        setResult(number + clickedButton)
    }

    const equalsTo = () => {
        let result = 0;

        switch (operator) {
            case "+": {
                result = parseFloat(prevNumber) + parseFloat(number);
                break;
            }
            case "-": {
                result = parseFloat(prevNumber) - parseFloat(number);
                break;
            }
            case "*": {
                result = parseFloat(prevNumber) * parseFloat(number);
                break;
            }
            case "/": {
                result = parseFloat(prevNumber) / parseFloat(number)
                break;
            }
            default: {
                console.log("Called with unknown operator ");
            }
        }
        setResult(result)
        setSecondaryDisp(prevNumber + operator + number)
    }

    const clearAll = () => {
        setOperator(null);
        setNumber("");
        setPrevNumber("");
        setResult("")
    }

    const saveMem = async () => {
        console.log();
        const response = await http.post(`${backendURL}/memory`, {
            calculation: secondaryDisp + '=' + result,
            timestamp: "time"
        })
        if (response.status !== 200) setError("something went wrong")

        setNumber("");
    }

    return (
        <>
            <div className='calculator'>
                <div className='display'>
                    <p>{secondaryDisp || '(0)'}</p>
                    <p>{result || '0'}</p>

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