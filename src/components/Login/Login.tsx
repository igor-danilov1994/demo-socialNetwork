import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../Common/FormsControl/FormsControl";
import {maxlengthCreator, required} from "../../utils/validators/validation";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import style from "../Common/FormsControl/FormControls.module.css"
import {login} from "../../redux/authReducer";
import {AppStateType} from "../../redux/redux-store";

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = ({
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
            </div>
            }
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

type LoginPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
    isAuth: boolean,
}

type LoginFormOwnPropsType = {
    isAuth: boolean,
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({form: 'login'})(LoginForm);

const Login: React.FC<LoginPropsType> = (props): JSX.Element => {

    const onSubmitForm = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }
    if (props.isAuth) {
        return <Redirect to={"/profile/"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm isAuth={props.isAuth} onSubmit={onSubmitForm}/>
        </div>
    )
}

type MapStateToProps = {
    isAuth: boolean
}

const mapStateToProps = (state: AppStateType): MapStateToProps => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);

