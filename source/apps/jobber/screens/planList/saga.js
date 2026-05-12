
import { delay, takeEvery, takeLatest, put, call } from "redux-saga/effects";
import { PLAN_LIST_REQ } from "./type";
import { HTTP_METHODS } from "../../../../services/api-constants";
import { request } from "../../../../services/services";
import { PLAN_LIST_DATA_API } from "../../../../services/api-end-points";


//Plan List  Watcher
function* planListDataWatcher(action) {
    yield call(planListDataRequest, action);
}

export function* planListDataRequest(action) {

    try {
        const result = yield call(() =>
            request(PLAN_LIST_DATA_API(), HTTP_METHODS.POST, action.payload.reqData)
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
export function* planListSaga() {
    yield takeLatest(PLAN_LIST_REQ, planListDataWatcher);
}