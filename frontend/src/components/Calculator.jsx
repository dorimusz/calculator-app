import React, { useState } from 'react';
import http from 'axios';
import '../styles/Calculator.css';
import Numbers from '../components/Numbers';
import ErrorMessage from './ErrorMessage';
import Memory from './Memory';
import { addNums, substractNums, multiplyNums, divNums } from "../utils/operators";
const backendURL = 'http://localhost:4000/api';


const Calculator = () => {
    const [error, setError] = useState(null);

    const [secondaryDisp, setSecondaryDisp] = useState("")
    const [result, setResult] = useState(""); //display

    const [number, setNumber] = useState("");
    const [prevNumber, setPrevNumber] = useState("");
    const [operator, setOperator] = useState(null);
    const operators = ['+', '-', '*', '/', '.'];

    const [memory, setMemory] = useState([]);

    const handleClick = (clickedButton) => {
        if ((operators.includes(clickedButton) && number === 0) || (operators.includes(clickedButton) && operators.includes(number.slice(-1)))) return; //cannot start with operator, operator cannot be the last clicked button

        setNumber(number + clickedButton);
        setResult(number + clickedButton);

        //if there's previous number, set the result:
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
                result = addNums(prevNumber, number)
                break;
            }
            case "-": {
                result = substractNums(prevNumber, number);
                break;
            }
            case "*": {
                result = multiplyNums(prevNumber, number);
                break;
            }
            case "/": {
                result = divNums(prevNumber, number)
                break;
            }
            default: {
                console.log("Called with unknown operator "); //default not really necessary in this case
            }
        }
        setResult(result)
        setSecondaryDisp(prevNumber + operator + number)
    }

    const clearAll = () => {
        setOperator(null);
        setNumber("");
        setPrevNumber("");
        setResult("");
        setSecondaryDisp("")
    }

    const saveMem = async () => {
        const response = await http.post(`${backendURL}/memory`, {
            calculation: secondaryDisp + '=' + result,
        })
        if (response.status !== 200) setError("something went wrong")
        if (response.status === 200) console.log("saved successfully");

        setNumber("");
    }

    const getMem = async () => {
        try {
            const response = await http.get(`${backendURL}/memory`)
            setMemory(response.data)

        } catch (error) {
            setError("Try again later!")
        }

    }

    return (
        <>
            <div className='calculator'>
                <div className='display'>
                    <p>{secondaryDisp || '...'}</p>
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
                        <button onClick={getMem} className='saveBtn'>MEM</button>
                    </div>
                </div>
            </div>

            {memory ? memory.map((mem, i) => <Memory memory={mem} key={i} />) : ""}

            <ErrorMessage error={error} />
        </>
    )
}

export default Calculator