import { CUSTOMER_PORTAL_REQ, CUSTOMER_PORTAL_DETAIL_REQ } from "./type";
//
export const getCustomerPortal = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: CUSTOMER_PORTAL_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})
//
export const getCustomerPortalDetail = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: CUSTOMER_PORTAL_DETAIL_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})