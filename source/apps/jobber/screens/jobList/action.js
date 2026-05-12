import { JOB_LIST_REQ } from "./type";
//
export const getJobListData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: JOB_LIST_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})