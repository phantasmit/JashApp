import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductionQty } from './action';

export const jobberActionFunction = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { uid = 0 } = useSelector(state => state.StackReducer.userData)

    /**
     * 
     * @param {*} requestData 
     */
    const updateQty = async (requestData, promiseFunction) => {
        try {
            const result = await promiseFunction(requestData);
            return result;
        } catch (err) {
            throw err;
        }
    };

    const callUpdateQtyAPI = (requestData) => {
        const { formId, lineId, qty, selectedLineId, jobColorIndexLineDataArray } = requestData;
        // const jobColorIndexLineDataArray = [[1, selectedLineId, { "production_qty": qty }]];
        // lineId.map((item) => {
        //     jobColorIndexLineDataArray.push([1, item, { "production_qty": 0 }])
        // })
        return new Promise((resolve, reject) => {

            dispatch(updateProductionQty({
                reqData: JSON.stringify({
                    "jsonrpc": "2.0",
                    "method": "call",
                    "id": uid,
                    "params": {
                        "model": "textile.ledger",
                        "method": "write",
                        "args": [
                            [formId],
                            {
                                "job_color_index_line_ids": jobColorIndexLineDataArray//[[1, selectedLineId, { "production_qty": qty }]]
                            }
                        ],
                        "kwargs": {}
                    }
                }),
                onSuccessResponse: (response => {
                    resolve(response);

                }),
                onErrorResponse: (error => {
                    reject(error);
                })
            }))
        });
    };

    return {
        updateQty,
        callUpdateQtyAPI
    };
}