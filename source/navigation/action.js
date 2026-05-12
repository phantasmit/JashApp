import { CHANGE_STACK_REQ, USER_DATA_REQ, LOGOUT, USER_DATA_PROCESS_REQ } from "./types";
//
export const changeStack = (payload = {}) => ({
    type: CHANGE_STACK_REQ,
    ...payload
})
export const userDataReq = (payload = {}) => ({
    type: USER_DATA_REQ,
    ...payload
})
export const userProcessDataReq = (payload = {}) => ({
    type: USER_DATA_PROCESS_REQ,
    ...payload
})
export const doLogout = () => ({
    type: LOGOUT,
});