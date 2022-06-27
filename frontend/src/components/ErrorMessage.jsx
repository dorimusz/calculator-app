import React from 'react'

const ErrorMessage = (props) => {
    let error = props.error;

    return (
        <div>{error ? <p>{error}</p> : null}</div>
    )
}

export default ErrorMessage