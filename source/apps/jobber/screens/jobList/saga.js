
import { delay, takeEvery, takeLatest, put, call } from "redux-saga/effects";
import { HTTP_METHODS } from "../../../../services/api-constants";
import { request } from "../../../../services/services";
import { JOB_LIST_DATA_API } from "../../../../services/api-end-points";
import { JOB_LIST_REQ } from "./type";


//JOB List  Watcher
function* jobListDataWatcher(action) {
    yield call(jobListDataRequest, action);
}

export function*  jobListDataRequest(action) {
    try {
        const result = yield call(() =>
            request(JOB_LIST_DATA_API(), HTTP_METHODS.POST, action.payload.reqData)
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
export function* jobListSaga() {
    yield takeLatest(JOB_LIST_REQ, jobListDataWatcher);
}