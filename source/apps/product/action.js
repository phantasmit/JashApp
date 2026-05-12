import { PRODUCT_DATA_REQ, THREAD_DATA_REQ } from "./type";
//
export const getProductData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: PRODUCT_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})
//
export const getThreadData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: THREAD_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})