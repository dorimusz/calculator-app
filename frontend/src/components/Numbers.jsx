import React from 'react'

const Numbers = (props) => {
    console.log(props);
    let updateResultDisp = props.updateResultDisp;

    const createNumbers = () => {
        const numbers = [];

        for (let i = 1; i < 10; i++) {
            numbers.push(<button onClick={() => updateResultDisp(i.toString())} key={i}>{i}</button>)
        }
        return numbers;
    };

    return (
        <>
            {createNumbers()}
        </>
    )
}

export default Numbers