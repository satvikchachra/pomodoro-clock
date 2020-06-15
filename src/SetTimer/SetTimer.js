import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

const SetTimer = (props) => {
    return (
        <div className="timer-container">
            <h3>{props.title}</h3>
            <div className="set-timer-flex actions-wrapper">
                <button onClick={props.handleDecrease}><FontAwesomeIcon icon={faMinus} /></button>
                <span>{props.count}</span>
                <button onClick={props.handleIncrease}><FontAwesomeIcon icon={faPlus} /></button>
            </div>
        </div>
    )
}

export default SetTimer;