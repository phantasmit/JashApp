import { delay, takeEvery, takeLatest, put, call } from "redux-saga/effects";
import { GET_LINE_ID_REQ } from "./type";
import { GET_LINE_ID_API } from "../../services/api-end-points";
import { HTTP_METHODS } from "../../services/api-constants";
import { request } from "../../services/services";

//Search Line ID
function* lineIdWatcher(action) {
    yield call(lineIdRequest, action);
}

export function* lineIdRequest(action) {

    try {
        const result = yield call(() =>
            request(GET_LINE_ID_API(), HTTP_METHODS.POST, action.payload.reqData)
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
export function* scanSaga() {
    yield takeLatest(GET_LINE_ID_REQ, lineIdWatcher);

}