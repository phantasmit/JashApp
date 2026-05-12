import { delay, takeEvery, takeLatest, put, call } from "redux-saga/effects";
import { USER_LOGIN_REQ, USER_PROCESS_REQ } from "./type";
import { LOGIN_API, USER_PROCESS_API } from "../../services/api-end-points";
import { HTTP_METHODS } from "../../services/api-constants";
import { request } from "../../services/services";
import { USER_INFO_RES } from "../../navigation/types";

//User Login Watcher
function* userLoginWatcher(action) {
    yield call(userLoginRequest, action);
}

export function* userLoginRequest(action) {

    try {
        const result = yield call(() =>
            request(LOGIN_API(), HTTP_METHODS.POST, action.payload.reqData)
        );
        if (result.response.status == 200) {
            if ('error' in result?.response?.data) {
                action.payload.onError(result?.response?.data?.error?.data);

            } else {
                action.payload.onSuccess(result?.response?.data?.result);
            }
        } else {
            action.payload.onError(result?.response);
        }
    } catch (error) {
        action.payload.onError(error);
    }
}
//User Process Watcher
function* userProcessWatcher(action) {
    yield call(userProcessRequest, action);
}

export function* userProcessRequest(action) {

    try {
        const result = yield call(() =>
            request(USER_PROCESS_API(), HTTP_METHODS.POST, action.payload.reqData)
        );
        if (result.response.status == 200) {
            if ('error' in result?.response?.data) {
                action.payload.onError(result?.response?.data?.error?.data);
            } else {
                action.payload.onSuccess(result?.response?.data?.result);
            }
        } else {
            action.payload.onError(result?.response);
        }
    } catch (error) {
        action.payload.onError(error);
    }
}
//
export function* loginSaga() {
    yield takeLatest(USER_LOGIN_REQ, userLoginWatcher);
    yield takeLatest(USER_PROCESS_REQ, userProcessWatcher);
}