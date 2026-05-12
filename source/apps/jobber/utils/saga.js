
import { delay, takeEvery, takeLatest, put, call } from "redux-saga/effects";
import { UPDATE_PRODUCTION_QTY_REQ } from "./types";
import { HTTP_METHODS } from "../../../services/api-constants";
import { request } from "../../../services/services";
import { QTY_UPDATE_API } from "../../../services/api-end-points";

//Update Production Qty
function* updateProductionWatcher(action) {
    yield call(updateProductionRequest, action);
}

export function* updateProductionRequest(action) {

    try {
        const result = yield call(() =>
            request(QTY_UPDATE_API(), HTTP_METHODS.POST, action.payload.reqData)
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
export function* jobberSaga() {
    yield takeLatest(UPDATE_PRODUCTION_QTY_REQ, updateProductionWatcher);

}