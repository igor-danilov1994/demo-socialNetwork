import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../Common/FormsControl/FormsControl";
import {maxlengthCreator, required} from "../../utils/validators/validation";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import style from "../Common/FormsControl/FormControls.module.css"
import {login} from "../../redux/authReducer";
import {AppStateType} from "../../redux/redux-store";

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType>> = ({
                                                                         handleSubmit,
                                                                         error
                                                                     }): JSX.Element => {

    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>("email", "email", [required, maxLength30], Input, 'login')}
            {createField<LoginFormValuesTypeKeys>("password", "password", [required], Input, 'password')}
            {createField<LoginFormValuesTypeKeys>('checkbox', "rememberMe", [], Input, undefined, "remember me")}

            {error &&
            <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Log In</button>
            </div>
        </form>
    )
}

const maxLength30 = maxlengthCreator(30);

type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean
}
type LoginFormValuesTypeKeys = keyof LoginFormValuesType // получение ключей из LoginFormValuesType

const LoginReduxForm = reduxForm<LoginFormValuesType>({form: 'login'})(LoginForm);

export const Login = (): JSX.Element => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const dispatch = useDispatch()

    if (isAuth) {
        return <Redirect to={"/profile/"}/>
    }

    const onSubmitForm = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe))
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmitForm}/>
        </div>
    )
}


