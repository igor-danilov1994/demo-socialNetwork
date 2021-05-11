import profileReducer, {addNewPostTextActionCreator} from "./profileReducerе";

test('new post should be added', () => {



    const action = addNewPostTextActionCreator("it-incubator.com")

    const initState = {
        posts: [
            {id: "1", massage: "How are you", likesCount: 2},
            {id: "2", massage: "It my first post", likesCount: 23},
            {id: "3", massage: "It my first post", likesCount: 23},
            {id: "4", massage: "It my first post", likesCount: 23},
        ]
    };

    const newState = profileReducer({state: initState}, {action})

    expect(newState.posts.length).toBe(5);

});