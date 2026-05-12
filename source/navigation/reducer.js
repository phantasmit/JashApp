import { CHANGE_STACK_RES, USER_DATA_RES, USER_DATA_PROCESS_RES } from "./types";
import stacks from "./stackEnum";

const initialState = {
    stack_name: stacks.ON_BOARD_STACK,
    userData: {},
    userProcess: {}
}

const StackReducer = (state = initialState, action) => {

    switch (action.type) {
        case CHANGE_STACK_RES:
            return Object.assign({}, state, {
                stack_name: action.payload
            })
        case USER_DATA_RES:
            return Object.assign({}, state, {
                userData: action.payload
            })
        case USER_DATA_PROCESS_RES:
            return Object.assign({}, state, {
                userProcess: action.payload
            })
        default:
            return state;
    }
}

export default StackReducer;