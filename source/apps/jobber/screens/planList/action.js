import { PLAN_LIST_REQ } from "./type";
//
export const getPlanData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: PLAN_LIST_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})