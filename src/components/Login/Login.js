import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../Common/FormsControl/FormsControl";
import {maxlengthCreator, required} from "../../utils/validators/validation";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import style from "../Common/FormsControl/FormControls.module.css"
import {login} from "../../redux/authReducer";

const LoginForm = ({handleSubmit, error}) => {

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name={"email"} placeholder={"Email"} component={Input} validate={[required, maxLength30]}/>
            </div>
            <div>
                <Field name={"password"} placeholder={"Password"} component={Input} validate={[required, maxLength30]}/>
            </div>
            <div className={style.check}>
                <Field type={"checkbox"} name={"name"} placeholder={"placeholder"} component={Input} validate={[required, maxLength30]}/>
                remember Me
            </div>
            {/* {createField("email", "Email", {Input}, [required, maxLength30])}*/}
            {/*{createField("password", "Password", {Input}, [required, maxLength30])}*/}
            {/* {createField("rememberMe", null, {Input}, [required, maxLength30], {type: "checkbox"}, "remember me")}*/}
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


const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }
    if (props.isAuth) {
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