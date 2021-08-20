import React from 'react';
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";
import {Field, FormSubmitHandler, reduxForm, SubmitHandler} from "redux-form";
import {Textarea} from "../../Common/FormsControl/FormsControl";
import {PostType} from "../../../typs/typs";

type MyPostsPropsType = {
    posts: PostType[];
    addPost: (text: string) => void
}

export const MyPosts: React.FC<MyPostsPropsType> = React.memo(({posts, addPost,}): JSX.Element => {
    const postElements = posts
        .map(p => <Post key={p.id} message={p.massage} likesCount={p.likesCount}/>);

    const onAddPost = (values: any): void => {
        addPost(values.newPostText);
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

type AddNewPostFormPropsType = {
    handleSubmit: (event: any) => void
}

const AddNewPostForm: React.FC<AddNewPostFormPropsType> = ({handleSubmit,}) => {
    return (
        <form onSubmit={handleSubmit}>
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
