
import { delay, takeEvery, takeLatest, put, call } from "redux-saga/effects";
import { PRODUCT_DATA_REQ, THREAD_DATA_REQ } from "./type";
import { PRODUCT_DATA_API, THREAD_DATA_API } from "../../services/api-end-points";
import { request } from "../../services/services";
import { HTTP_METHODS } from "../../services/api-constants";

//Prodcut Data Watcher
function* productDataWatcher(action) {
    yield call(productDataRequest, action);
}

export function* productDataRequest(action) {

    try {
        const result = yield call(() =>
            request(PRODUCT_DATA_API(), HTTP_METHODS.POST, action.payload.reqData)
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

//Thread Data Watcher
function* threadDataWatcher(action) {
    yield call(threadDataRequest, action);
}

export function* threadDataRequest(action) {

    try {
        const result = yield call(() =>
            request(THREAD_DATA_API(), HTTP_METHODS.POST, action.payload.reqData)
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
export function* ProductDataSaga() {
    yield takeLatest(PRODUCT_DATA_REQ, productDataWatcher);
    yield takeLatest(THREAD_DATA_REQ, threadDataWatcher);
}