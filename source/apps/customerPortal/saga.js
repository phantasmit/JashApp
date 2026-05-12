
import { delay, takeEvery, takeLatest, put, call } from "redux-saga/effects";
import { CUSTOMER_PORTAL_REQ, CUSTOMER_PORTAL_DETAIL_REQ } from "./type";
import { CUSTOMER_PORTAL_API, CUSTOMER_PORTAL_DETAIL_API } from "../../services/api-end-points";
import { request } from "../../services/services";
import { HTTP_METHODS } from "../../services/api-constants";

//Customer Portal Data Watcher
function* customerPortalDataWatcher(action) {
    yield call(customerPortalDataRequest, action);
}

export function* customerPortalDataRequest(action) {

    try {
        const result = yield call(() =>
            request(CUSTOMER_PORTAL_API(), HTTP_METHODS.POST, action.payload.reqData)
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
//Customer Portal Detail Data Watcher
function* customerPortalDetailDataWatcher(action) {
    yield call(customerPortalDetailDataRequest, action);
}

export function* customerPortalDetailDataRequest(action) {

    try {
        const result = yield call(() =>
            request(CUSTOMER_PORTAL_DETAIL_API(), HTTP_METHODS.POST, action.payload.reqData)
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
export function* CustomerPortalSaga() {
    yield takeLatest(CUSTOMER_PORTAL_REQ, customerPortalDataWatcher);
    yield takeLatest(CUSTOMER_PORTAL_DETAIL_REQ, customerPortalDetailDataWatcher);
}