import React from "react";

const SEND_MESSAGE = "SEND_MESSAGE";


let initState = {
    dialogs: [
        {
            id: "1",
            name: "Dmitry",
            avatar: <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSq_I0JFO2DxoAV3J-sI7ajtx0qW0Q5neaY_A&usqp=CAU"
                alt="avatar"/>,
        },
        {
            id: "2",
            name: "Andrey",
            avatar: <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSq_I0JFO2DxoAV3J-sI7ajtx0qW0Q5neaY_A&usqp=CAU"
                alt="avatar"/>,
        },
        {
            id: "3",
            name: "Sveta",
            avatar: <img
                src="data:image/jpeg;base64,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"
                alt="avatar"/>,
        },
        {
            id: "4",
            name: "Nikita",
            avatar: <img
                src="data:image/jpeg;base64,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"
                alt="avatar"/>,
        },
        {
            id: "5",
            name: "Valera",
            avatar: <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSq_I0JFO2DxoAV3J-sI7ajtx0qW0Q5neaY_A&usqp=CAU"
                alt="avatar"/>,
        },
        {
            id: "6",
            name: "Victor",
            avatar: <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTDIaRmGVHzVDwMDipCkv_sNOKuRbXa4ZOZZQ&usqp=CAU"
                alt="avatar"/>,
        },
    ],
    messages: [
        {id: "1", message: "Hi"},
        {id: "2", message: "How is you it_kamasutra"},
        {id: "3", message: "Yo"},
        {id: "4", message: "Yo"},
        {id: "5", message: "Yo"},
        {id: "6", message: "Yo"},
    ]
}


const dialogsReducer = (state = initState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            };
        default:
            return state;
    }
}



export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody});

export default dialogsReducer;