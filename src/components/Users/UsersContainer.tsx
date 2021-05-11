import React from "react";
import {Users} from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {
    follow,
    requestUsers,
    unfollow,
} from "../../redux/usersReducer";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";
import {
    getAuthStatus,
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers,
} from "../../redux/user-selector";
import {UserType} from "../../typs/typs";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";

type MapStateToPropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    isAuth: boolean
    users: Array<UserType>
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

type OwnProps = {
    title: string
}

type UsersComponentPropsType = MapStateToPropsType & OwnProps & MapDispatchPropsType

class UsersComponent extends React.Component<UsersComponentPropsType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.getUsers(pageNumber, pageSize);
    }

    render() {

        return <>
            {this.props.isFetching ?
                <Preloader/> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
                isAuth={this.props.isAuth}

            />
        </>
    }


}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {

    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        isAuth: getAuthStatus(state)
    }
}

export default compose(
    withAuthRedirect,
    //<TStateProps = {}, TDispatchProps = {}, TOwnProps
    connect<MapStateToPropsType, MapDispatchPropsType, OwnProps, AppStateType>(
        mapStateToProps,
        {
            follow, unfollow, getUsers: requestUsers
        }),
)(UsersComponent);



