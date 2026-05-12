
import { delay, takeEvery, takeLatest, put, call } from "redux-saga/effects";
import {
    JOB_FORM_REQ, COMPUTE_ALLOCATION_REQ,
    UPDATE_STATE_REQ, LINE_DATA_REQ, FG_RECEIVE_DATA_REQ,
    FG_RECEIVE_ID_REQ, JOBBER_ASSIGN_REQ
} from "./type";
import { HTTP_METHODS } from "../../../../services/api-constants";
import { request } from "../../../../services/services";
import {
    JOB_FORM_API,
    COMPUTE_ALLOCATION_API,
    UPDATE_STATE_API,
    FG_RECEIVE_DATA_API,
    SUBMIT_JOBBER_ASSIGNER_API
} from "../../../../services/api-end-points";


//JOB Form Watcher
function* jobFormDataWatcher(action) {
    yield call(jobFormDataRequest, action);
}

export function* jobFormDataRequest(action) {

    try {
        const result = yield call(() =>
            request(JOB_FORM_API(), HTTP_METHODS.POST, action.payload.reqData)
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

//Line Data Watcher
function* lineDataWatcher(action) {
    yield call(lineDataRequest, action);
}

export function* lineDataRequest(action) {

    try {
        const result = yield call(() =>
            request(JOB_FORM_API(), HTTP_METHODS.POST, action.payload.reqData)
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

//Compute Allocation Watcher
function* computeAllocationWatcher(action) {
    yield call(computeAllocationRequest, action);
}

export function* computeAllocationRequest(action) {

    try {
        const result = yield call(() =>
            request(COMPUTE_ALLOCATION_API(), HTTP_METHODS.POST, action.payload.reqData)
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
//Update State Watcher
function* updateStateWatcher(action) {
    yield call(updateStateRequest, action);
}

export function* updateStateRequest(action) {

    try {
        const result = yield call(() =>
            request(UPDATE_STATE_API(), HTTP_METHODS.POST, action.payload.reqData)
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
//Get FG Receive Info
function* getFGReceiveDataWatcher(action) {
    yield call(getFGReceiveDataRequest, action);
}

export function* getFGReceiveDataRequest(action) {

    try {
        const result = yield call(() =>
            request(FG_RECEIVE_DATA_API(), HTTP_METHODS.POST, action.payload.reqData)
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
//Get FG Receive ids
function* getFGReceiveIdatcher(action) {
    yield call(getFGReceiveIdRequest, action);
}

export function* getFGReceiveIdRequest(action) {

    try {
        const result = yield call(() =>
            request(FG_RECEIVE_DATA_API(), HTTP_METHODS.POST, action.payload.reqData)
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
//Update Jobber Assign ID
function* submitJobberAssignWatcher(action) {
    yield call(submitJobberAssignRequest, action);
}

export function* submitJobberAssignRequest(action) {

    try {
        const result = yield call(() =>
            request(SUBMIT_JOBBER_ASSIGNER_API(), HTTP_METHODS.POST, action.payload.reqData)
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
export function* jobFormSaga() {
    yield takeLatest(JOB_FORM_REQ, jobFormDataWatcher);
    yield takeLatest(LINE_DATA_REQ, lineDataWatcher);
    yield takeLatest(COMPUTE_ALLOCATION_REQ, computeAllocationWatcher);
    yield takeLatest(UPDATE_STATE_REQ, updateStateWatcher);
    yield takeLatest(FG_RECEIVE_DATA_REQ, getFGReceiveDataWatcher);
    yield takeLatest(FG_RECEIVE_ID_REQ, getFGReceiveIdatcher);
    yield takeLatest(JOBBER_ASSIGN_REQ, submitJobberAssignWatcher);
}