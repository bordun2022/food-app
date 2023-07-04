import React from 'react';
import classes from '../UI/Input.module.css'

const Input = React.forwardRef((props, ref) => {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} id={props.input.id} {...props.input}></input> 
        </div>
    )
}); // використано оператор поширення spread ... оскільки він дозволить включити 
// в інпутс усі key-values pairs скільки б їх там не було. Якщо в об'єкті інпутсу є id, то ми 
// можемо не додавати id={props.input.id} до inputs, а просто залишити {...props.input}
export default Input;