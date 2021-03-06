import React, { useState } from 'react'
import styled from 'styled-components'

const TextField = ({
    fullWidth = false, width = 340, disabled = false,
    label, name, value, handleChange, 
    inputMode='text', ignoreReg=/\*/
}) => {
    const [focus, setFocus] = useState(false)
    const [notEmpty, setNotEmpty] = useState(value !== '')

    return (
        <TextFieldRoot width={width} fullWidth={fullWidth} >
            <Label focus={focus} notEmpty={notEmpty} >{label}</Label>
            <Input
                inputMode={inputMode} disabled={disabled}
                onFocus={() => setFocus(true)} onBlur={()=>setFocus(false)}
                name={name} value={value} onChange={(e) => {
                    if (!e.target.value.match(ignoreReg)) {
                        if (handleChange) {
                            handleChange(e)
                        }
                        setNotEmpty(e.target.value !== '')
                    }
                }}
            />
        </TextFieldRoot>
    )
}

export default TextField

const TextFieldRoot = styled.div`
    width: ${props => props.fullWidth || props.width > window.innerWidth
        ? '-webkit-fill-available'
        : props.width+'px'
    };
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 10px;
`
const Input = styled.input`
    outline: none; appearance: none;
    width: -webkit-fill-available;
    position: static;
    padding: 15px;
    border: 1px solid #969696;
    border-radius: 5px;
    color: #3C3C3C;
    background-color: ${({ disabled }) => disabled ? '#E2E2E2' : 'inherit'};
    font-size: 18px; 
    :focus {
        padding: 14px;
        border: 2px solid royalblue;
        border-radius: 5px;
    }
`
const Label = styled.label`
    pointer-events: none;
    position: absolute;
    top: ${props => props.focus || props.notEmpty ? '-10px' : 'auto' };
    margin: 0 10px; padding: 0 5px;
    background-color: white;
    color: ${props => props.focus ? 'royalblue' : '#717171'};
    font-size: ${props => props.focus || props.notEmpty ? 14 : 18 }px;
    transition: all 0.25s;
`