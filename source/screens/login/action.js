import { USER_LOGIN_REQ, USER_PROCESS_REQ } from "./type";
//
export const getUserLogin = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: USER_LOGIN_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})
//
export const getuserProcessInfo = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: USER_PROCESS_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})