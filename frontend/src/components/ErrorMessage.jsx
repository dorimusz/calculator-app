import React from 'react'
import('../styles/ErrorMessage.css')

const ErrorMessage = (props) => {
    let error = props.error;

    return (
        <div className='errMessage'>{error ? <p>{error}</p> : null}</div>
    )
}

export default ErrorMessage