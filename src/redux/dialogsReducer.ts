import {InferActionsTypes} from "./redux-store";

type DialogType = {
    id: number,
    name: string
}

type MassageType = {
    id: number,
    message: string
}

type InitStateType = typeof initState
type ActionsType = InferActionsTypes<typeof actions>

const initState = {
    dialogs: [
        {id: 1, name: "Dmitry"},
        {id: 2, name: "Andrey"},
        {id: 3, name: "Sveta"},
        {id: 4, name: "Nikita"},
        {id: 5, name: "Valera"},
        {id: 6, name: "Victor"},
    ] as DialogType[],
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "How is you itKamasutra"},
        {id: 3, message: "Yo"},
        {id: 4, message: "Yo"},
        {id: 5, message: "Yo"},
        {id: 6, message: "Yo"},
    ] as MassageType[]
}


export const dialogsReducer = (state = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case "SEND_MESSAGE":
            const body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            };
        default:
            return state;
    }
}

export const actions = {
    sendMessageCreator: (newMessageBody: string) => ({type: 'SEND_MESSAGE', newMessageBody} as const )
};
