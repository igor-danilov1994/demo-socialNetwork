import * as React from "react";
import styles from "./FormControls.module.css";
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import style from "./FormControls.module.css";
import {FieldValidatorType} from "../../../utils/validators/validation";


type FormControlPropsType = {
    children: React.ReactNode,
    meta: WrappedFieldMetaProps,
}

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}): JSX.Element => {
    const hasError = touched && error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>

    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props): JSX.Element => {
    const {input, meta, ...restProps} = props;
    /*const {input, meta, child, ...restProps} = props;*/
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps} />
        </FormControl>
    )
};

export const Input: React.FC<WrappedFieldProps> = (props): JSX.Element => {
    const {input, meta, ...restProps} = props;
    /* const {input, meta, child, ...restProps} = props;*/
    return (
        <FormControl {...props}>
            <input {...input} {...restProps} />
        </FormControl>
    )
};


export function createField<FormKeysType extends string>(
    type: 'checkbox' | 'email' | 'password' | null,
    name: FormKeysType,
    validate: FieldValidatorType[],
    component: React.FC<WrappedFieldProps> | React.Component | React.FC | WrappedFieldProps,
    placeholder: string | undefined,
    text = '',
): JSX.Element {

    return (
        <div className={style.check}>
            <Field
                placeholder={placeholder}
                name={name}
                validate={validate}
                type={type}
                component={component}
            />{text}
        </div>
    )
}
