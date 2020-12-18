import React from 'react';
import Friends from "./Friends";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};


const FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(Friends);

export default FriendsContainer;
