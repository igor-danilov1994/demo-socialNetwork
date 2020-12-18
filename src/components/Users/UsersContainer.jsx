import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {
    follow,
    requestUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleFollowingProgress, unfollow,
} from "../../redux/usersReducer";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize, getToggleFollowingProgress,
    getTotalUsersCount, getUsers,
} from "../../redux/user-selector";

class UsersComponent extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
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

let mapStateToProps = (state) => {

    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        toggleFollowingProgress: getToggleFollowingProgress(state),
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps,
        {follow, unfollow, setCurrentPage,
            setTotalUsersCount, toggleFollowingProgress,
            getUsers: requestUsers}),
)(UsersComponent);



