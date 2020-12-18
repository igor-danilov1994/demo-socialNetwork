import React, {Suspense} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Misic";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {initializeApp} from "./redux/appReducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Route} from "react-router-dom";
import {compose} from "redux";
import Preloader from "./components/Common/Preloader/Preloader";
import {withSuspense} from "./HOC/withSuspense";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));// Ленивая загрузка
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));// Ленивая загрузка


class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs'
                           render= {withSuspense(DialogsContainer)}
                    />

                    <Route path='/profile/:userId?'
                           render= {withSuspense(ProfileContainer)}
                    />
                    <Route path='/users' render={() => < UsersContainer/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                    <Route path='/Login' render={() => <LoginPage/>}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})


export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);
