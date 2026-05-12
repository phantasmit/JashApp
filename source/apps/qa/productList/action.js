import { QA_PRODUCT_LIST_REQ } from "./type";
//
export const getQAProductListReqData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: QA_PRODUCT_LIST_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})