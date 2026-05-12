import { GET_LINE_ID_REQ } from "./type";
//
export const getLineId = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: GET_LINE_ID_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})