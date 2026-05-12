import {
    JOB_FORM_REQ, COMPUTE_ALLOCATION_REQ,
    UPDATE_STATE_REQ, FG_RECEIVE_DATA_REQ,
    FG_RECEIVE_ID_REQ, JOBBER_ASSIGN_REQ
} from "./type";
//
export const getJobFormData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: JOB_FORM_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})

export const computeApplication = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: COMPUTE_ALLOCATION_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})

export const updateState = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: UPDATE_STATE_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})

export const getLineData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: JOB_FORM_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})

export const getReceiveId = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: FG_RECEIVE_ID_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})

export const getFGReceiveData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: FG_RECEIVE_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})


export const jobberAssignData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: JOBBER_ASSIGN_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})