import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;

    switch(props.elementType) {
        case('input'):
            inputElement = <input
                className={classes.InputElement}
                placeholder={props.placeholderText}
                onChange={props.changed}
                value={props.value}/>
            break;
        default:
            inputElement = <input
                className={classes.InputElement}
                placeholder={props.placeholderText}
                onChange={props.changed}/>
    };

    return (
        <div className={classes.Input}>
            {inputElement}
        </div>
    );
};

export default input;