import profileReducer, {addNewPostTextActionCreator} from "./profileReducer";
import React from 'react';

test('new post should be added', () => {
    // 1 Test data
    let action = addNewPostTextActionCreator("it-incubator.com")

    let state = {
        posts: [
            {id: "1", massage: "How are you", likesCount: 2},
            {id: "2", massage: "It my first post", likesCount: 23},
            {id: "3", massage: "It my first post", likesCount: 23},
            {id: "4", massage: "It my first post", likesCount: 23},
        ]
    };
//2 action
    let newState = profileReducer({state}, {action})

    //3 expectation
    expect(newState.posts.length).toBe(5);

});