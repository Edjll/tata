import './form-input.css';
import React, {FormEvent, useEffect, useState} from "react";
import {FormInputType} from "./form-input-type";

interface FormInputProps {
    title: string
    value: string
    inputHandler: Function
    type?: FormInputType,
    error?: string
}

export const FormInput = ({title, value, inputHandler, type = FormInputType.TEXT, error}: FormInputProps) => {
    const classList = ['form-input'];
    const [active, setActive] = useState(false);
    const ref = React.createRef<HTMLLabelElement>();

    const documentClickEventListener = (e: MouseEvent): void => {
        const target = e.target as HTMLElement;
        if (target.closest('.form-input') !== ref.current && active) {
            setActive(false);
        }
    }

    const innerInputHandler = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        inputHandler(target.value);
    }

    useEffect(() => {
        document.addEventListener('click', documentClickEventListener);
        return () => {
            document.removeEventListener('click', documentClickEventListener);
        }
    });

    if (active)
        classList.push('form-input_active');

    if (value !== '')
        classList.push('form-input_filled');

    return (
        <label className={classList.join(' ')} onClick={() => setActive(true)} ref={ref}>
            <span className={'form-input__title'}>{title}</span>
            <input
                type={type}
                className={'form-input__input'}
                value={value}
                onInput={innerInputHandler}
            />
            {
                error !== undefined
                    ?   <div className={'form-input__error'}>
                            <div className={'form-input__error__icon'}>⨉</div>
                            <div className={'form-input__error__text'}>{error}</div>
                        </div>
                    :   null
            }
            <fieldset className={'form-input__fieldset'}>
                <legend className={'form-input__fieldset__legend'}>{title}</legend>
            </fieldset>
        </label>
    )
}