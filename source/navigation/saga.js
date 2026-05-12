import { takeLatest, put, call } from "redux-saga/effects";
import { CHANGE_STACK_REQ, CHANGE_STACK_RES, USER_DATA_REQ, USER_DATA_RES, LOGOUT_RES, LOGOUT, USER_DATA_PROCESS_RES, USER_DATA_PROCESS_REQ } from "./types";

//Update Application Stack watcher
function* updateStackWatcher(action) {
    yield call(updateStackRequest, action)
}

export function* updateStackRequest(action) {
    yield put({
        type: CHANGE_STACK_RES,
        payload: action.stack_name
    })
}


//Set User Data after login
function* setUserDataWatcher(action) {
    yield call(setUserDataRequest, action)
}

export function* setUserDataRequest(action) {
    yield put({
        type: USER_DATA_RES,
        payload: action.userData
    })
}

function* logoutWatcher(action) {
    yield call(logout_saga, action)
}

export function* logout_saga() {
    try {
        yield put({
            type: LOGOUT_RES,
            payload: {}
        })
    } catch (error) {
        console.log("logout saga error", error);
    }
}

//Set User Process Data after login
function* setUserProcessDataWatcher(action) {
    yield call(setUserProcessDataRequest, action)
}

export function* setUserProcessDataRequest(action) {
    yield put({
        type: USER_DATA_PROCESS_RES,
        payload: action.userProcess
    })
}

export function* navigationSaga() {
    yield takeLatest(CHANGE_STACK_REQ, updateStackWatcher);
    yield takeLatest(USER_DATA_REQ, setUserDataWatcher);
    yield takeLatest(LOGOUT, logoutWatcher);
    yield takeLatest(USER_DATA_PROCESS_REQ, setUserProcessDataWatcher);
}