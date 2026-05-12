import { UPDATE_PRODUCTION_QTY_REQ } from "./types";
//
export const updateProductionQty = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: UPDATE_PRODUCTION_QTY_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})