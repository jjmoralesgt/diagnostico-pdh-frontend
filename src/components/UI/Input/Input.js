import React, { useRef, useImperativeHandle } from "react";

const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef();
    const activate = () => {
        inputRef.current.focus();
    };

    useImperativeHandle(ref, () => {
        return {
            focus: activate
        };
    })

    return (
        <div
            /*className={`${classes.control} ${props.IsValid === false ? classes.invalid : ''
                }`}*/
            className="mb-3"
        >
            <label htmlFor={props.input.id} className="form-label">{props.label}</label>
            <input 
                className="form-control"                    
                {...props.input}
            />
        </div>
    );
});

export default Input;