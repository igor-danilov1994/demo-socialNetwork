const SEND_MESSAGE = "SEND_MESSAGE";

type DialogType = {
    id: number,
    name: string
}

type MassageType = {
    id: number,
    message: string
}

const initState = {
    dialogs: [
        {id: 1, name: "Dmitry"},
        {id: 2, name: "Andrey"},
        {id: 3, name: "Sveta"},
        {id: 4, name: "Nikita"},
        {id: 5, name: "Valera"},
        {id: 6, name: "Victor"},
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "How is you itKamasutra"},
        {id: 3, message: "Yo"},
        {id: 4, message: "Yo"},
        {id: 5, message: "Yo"},
        {id: 6, message: "Yo"},
    ] as Array<MassageType>
}

type InitStateType = typeof initState

export const dialogsReducer = (state = initState, action: any): InitStateType => {
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

type sendMessageCreatorType = {
    type: typeof SEND_MESSAGE,
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): sendMessageCreatorType => ({type: SEND_MESSAGE, newMessageBody});
