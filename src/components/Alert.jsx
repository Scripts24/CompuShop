import React from 'react'

export const Alert = ({ message }) => {

    return (
        <div className='container-alert'>
            <span>{message}</span>
        </div>
    )
}

export default Alert