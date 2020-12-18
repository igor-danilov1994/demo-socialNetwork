import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../FormsControl/FormsControl";

const MyPosts = React.memo(props => {

    let postElements = props.posts
        .map(p => <Post message={p.massage} likesCount={p.likesCount}/>);

    const onAddPost = (values) => {
        props.addPost(values.newPostText);
    }


    return (
        <div>
            <h3>My Posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postElements}
            </div>
        </div>
    )
});


const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={Textarea} name={"newPostText"}
                />
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
}

const AddNewPostFormRedux = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm);

export default MyPosts;
