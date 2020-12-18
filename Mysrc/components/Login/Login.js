import React from "react";
import {reduxForm} from "redux-form";
import {createField, Input} from "../FormsControl/FormsControl";
import {maxlengthCreator, required} from "../../utils/validators/validation";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import style from "../FormsControl/FormControls.module.css"
import {login} from "../../redux/authReducer";

const LoginForm = (handleSubmit, error) => {
    debugger
    return (
        <form onSubmit={handleSubmit}>
                { createField("email","Email", {Input}, [required, maxLength30] ) }
                { createField("password","Password", {Input}, [required, maxLength30] ) }
            <div className={style.check}>
                { createField("rememberMe",null, {Input}, [required, maxLength30], {type: "checkbox"}, "remember me" ) }

            </div>
            {error &&
                <div className={style.formSummaryError}>
                    {error}
                </div> }
            <div>
                <button>Log In</button>
            </div>
        </form>
    )
}

const maxLength30 = maxlengthCreator(30);


const Login = (props) => {
    debugger
    const onSubmit = (formData) => {
        debugger
        props.login(formData.email, formData.password, formData.rememberMe);
    }
    if (props.isAuth) {
        debugger
        return <Redirect to={"/profile/"}/>

    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}


const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);