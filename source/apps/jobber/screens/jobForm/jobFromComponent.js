import React, { Component } from 'react';
import { getJobFormData, computeApplication, updateState, getLineData, getFGReceiveData, getReceiveId, jobberAssignData } from './action';
import { updateProductionQty } from '../../utils/action';
import { jobFormDataRequest, getLineDataRequest, getFGReceiveRequest, updateQtyRequestData, updateActionReceiveRequestData } from './requestData';
import { updateDateFormat } from '../../../../utils/normalize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


class JobFromComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobFormDetails: [],
            jobLineId: [],
            totalQty: 0,
            formId: 0,
            lineId: 0,
            formState: '',
            isLoading: false,
            isError: false,
            isFGReceivedPopup: false,
            fgReceiveId: 0,
            isPopupOpen: false,
            jobAssignError: false,
            previousJobError: false,
            jobFormData: {},
            jobFormColorIndexData: {},
            isImageView: false,
            expanded: false,
            selectedParentIndex: -1,
            selectedChildIndex: -1,
            selectedRowIndex: -1,
            form_id: -1,
            seleteImageId: -1,
            endPoint: '',
            fgReceiveStateData: {}
        }
        this.imageData = "";
        this.imageTabData = "";
        this.qcParamAttachArray = [];
        this.computeAllocationCount = 0;
        this.selectedImage = ""
    }

    componentDidMount() {
        this.updateStateFunc("compute_allocation")
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            //
            AsyncStorage.getItem('fgReceiveState').then((value) => {
                if (value !== null) {
                    this.setState({
                        fgReceiveStateData: JSON.parse(value)
                    })
                }
            })
            //
            this.setState({
                isLoading: true,
                formId: this.props.route.params.formId,
                lineId: this.props.route.params.lineId,
                isPopupOpen: false,
                fgReceiveId: 0
            }, () => {
                if (!this.state.isPopupOpen)
                    this.jobFormDataFun()
            })
        })
    }

    jobFormDataFun = () => {
        this.props.getJobFormData({
            reqData: JSON.stringify(jobFormDataRequest(this.props.userData.uid, this.state.formId)),
            onSuccessResponse: ((response) => {

                if (response.length > 0) {
                    if (response[0]?.partner_ids.includes(this.props.userData.partner_id)) {
                        try {
                            const tempFinalData = {}
                            const tempJobFormData = [];
                            const tempMasterPlanData = [];
                            const tempAllocatedData = [];
                            const tempFGReceived = [];
                            const tempColorIndexData = [];
                            const tempQCParameter = [];
                            const tempImages = [];
                            const tempProductionRule = [];


                            const tempForData = [];
                            //tempJobFormData.push({ '': response[0]?.name })
                            tempForData.push({ 'Jobber': response[0]?.partner_id?.display_name })
                            tempForData.push({ 'LC method': response[0]?.partner_id_lc_method })
                            tempForData.push({ 'Production Start Date': updateDateFormat(response[0]?.start_date) })
                            tempForData.push({ 'Production End Date': updateDateFormat(response[0]?.done_date) })
                            tempForData.push({ 'Duration': response[0]?.duration })
                            tempForData.push({ 'Next Job Issue': response[0]?.next_job_issue_id?.display_name })
                            tempForData.push({ 'Date': updateDateFormat(response[0]?.date) })
                            tempForData.push({ 'Due Date': response[0]?.due_date ? updateDateFormat(response[0]?.due_date) : '' })
                            //tempForData.push({ 'Image': '' })
                            //
                            tempJobFormData.push(tempForData)
                            //
                            this.imageData = response[0]?.image;
                            this.imageTabData = response[0]?.bom_image_id;
                            //
                            tempFinalData['1'] = {
                                'title': response[0]?.name,
                                'isSelect': false,
                                'data': tempJobFormData
                            }
                            //jobber_plan_detail_id
                            response[0]?.jobber_plan_detail_id?.map((item, index) => {
                                const tempData = [];
                                //
                                tempData.push({ 'Job Plan': item?.jobber_plan_id?.display_name })
                                tempData.push({ 'Process': item?.bom_id?.display_name })
                                tempData.push({ 'Finished': item?.finished_goods_id?.display_name })
                                tempData.push({ 'Jobber Rate': item?.rate })
                                tempData.push({ 'LC Method': item?.labour_charges })
                                tempData.push({ 'Allocated Quantity': item?.allocated_qty })
                                tempData.push({ 'FG Issued Qty': item?.issue_qty })
                                tempData.push({ 'Receive Qty': item?.receive_qty })
                                //
                                tempMasterPlanData.push(tempData)
                            })
                            tempFinalData['2'] = {
                                'title': 'Master Plan',
                                'isSelect': false,
                                'data': tempMasterPlanData
                            }
                            //jobber_plan_detail_id
                            response[0]?.jobber_allocation_detail_ids?.map((item, index) => {
                                const tempData = [];
                                //
                                tempData.push({ 'Job Plan': item?.jobber_plan_ids?.display_name })
                                tempData.push({ 'Product': item?.product_id?.display_name })
                                tempData.push({ 'Reference': item?.reference })
                                tempData.push({ 'Quantity': item?.comp_qty })
                                tempData.push({ 'Lots Visible': item?.lots_visible })
                                tempData.push({ 'UOM': item?.uom_id?.display_name })
                                tempData.push({ 'Required Qty': item?.req_qty })
                                tempData.push({ 'Allocated Qty': item?.allocation_qty })
                                //
                                tempAllocatedData.push(tempData)
                            })
                            tempFinalData['3'] = {
                                'title': 'Allocated',
                                'isSelect': false,
                                'data': tempAllocatedData
                            }
                            //order_receive_line_ids
                            response[0]?.order_receive_line_ids?.map((item, index) => {
                                const tempData = [];
                                //
                                tempData.push({ 'Date': updateDateFormat(item?.date) })
                                tempData.push({ 'Receive Order': item?.order_rec_id?.display_name })
                                tempData.push({ 'Product': item?.product_id?.display_name })
                                tempData.push({ 'Issue Qty': item?.qty })
                                tempData.push({ 'Receive Qty': item?.receive_qty })
                                //
                                tempFGReceived.push(tempData)
                            })
                            tempFinalData['4'] = {
                                'title': 'FG Received',
                                'isSelect': false,
                                'data': tempFGReceived
                            }
                            //job_color_index_line_ids
                            response[0]?.job_color_index_line_ids?.map((item, index) => {
                                const tempData = [];
                                //
                                tempData.push({ 'Process': item?.bom_id?.display_name })
                                tempData.push({ 'Reference': item?.color_index_reference })
                                tempData.push({ 'Product': item?.product_id?.display_name })
                                tempData.push({ 'Color Tag': item?.color_tag_id?.display_name })
                                tempData.push({ 'Production Qty': item?.production_qty })
                                tempData.push({ 'Final Pcs Qty': item?.final_piece_qty })
                                tempData.push({ 'Average Qty': item?.average_qty })
                                tempData.push({ 'Quantity': item?.qty_onhand })
                                tempData.push({ 'Required Qty': item?.req_quantity })
                                //
                                tempColorIndexData.push(tempData)
                            })
                            tempFinalData['5'] = {
                                'title': 'Color Index Report',
                                'isSelect': false,
                                'data': tempColorIndexData
                            }
                            //qc_para_process_line_ids
                            response[0]?.qc_para_process_line_ids?.map((item, index) => {
                                const tempData = [];
                                //
                                this.qcParamAttachArray.push(item?.id)
                                //
                                tempData.push({ 'Process': item?.bom_id?.display_name })
                                tempData.push({ 'Attachment': "" })
                                tempData.push({ 'Type': item?.type_id?.display_name })
                                tempData.push({ 'Attribute': item?.attribute_id?.display_name })
                                tempData.push({ 'Value': item?.attribute_value })
                                tempData.push({ 'Approved': item?.approved })
                                //tempData.push({ 'Order Issue': item?.average_qty })
                                //
                                tempQCParameter.push(tempData)
                            })
                            tempFinalData['6'] = {
                                'title': 'QC Parameter',
                                'isSelect': false,
                                'data': tempQCParameter
                            }
                            //bom_image_id
                            if (response[0]?.bom_image_id) {
                                tempFinalData['7'] = {
                                    'title': 'Images',
                                    'isSelect': false,
                                    'data': JSON.parse(JSON.stringify([[{ "Image_tab": "" }]]))
                                }
                            }

                            this.setState({
                                form_id: response[0]?.id,
                                jobFormData: tempFinalData,
                                jobLineId: response[0]?.job_color_index_line_ids,
                                formState: response[0]?.state,
                                isLoading: false,
                                isError: false
                            })
                            // setTimeout(async () => {
                            //     try {
                            //         if (response[0]?.job_color_index_line_ids.length > 0) {
                            //             this.getLineData(response[0]?.job_color_index_line_ids).then((value) => {
                            //                 this.imageData = response[0]?.bom_image_id;
                            //                 this.setState({
                            //                     jobFormData: response[0],
                            //                     jobFormColorIndexData: value,
                            //                     formState: response[0]?.state,
                            //                     jobLineId: value,
                            //                     isLoading: false,
                            //                     isError: false
                            //                 })
                            //             }).catch(e => {
                            //                 alert('Error to fetch record')
                            //                 this.setState({
                            //                     isLoading: false,
                            //                     isError: true
                            //                 })
                            //             })
                            //         } else {
                            //             this.computeAllocationCount += 1
                            //             if (this.computeAllocationCount == 2) {
                            //                 this.setState({
                            //                     isLoading: false,
                            //                     isError: true
                            //                 }, () => {
                            //                     alert('Something wrong')
                            //                     //this.computeAllocationCount = 0
                            //                 })
                            //             } else {
                            //                 this.updateStateFunc("compute_allocation")
                            //             }

                            //         }
                            //     } catch (error) {
                            //         this.setState({
                            //             isLoading: false,
                            //             isError: true
                            //         })
                            //     }
                            // }, 1000);
                        } catch (error) {
                            this.setState({
                                isLoading: false,
                                isError: true
                            })
                        }
                    } else {
                        alert('job is not assign to you')
                        this.setState({
                            isLoading: false,
                            isError: false,
                            previousJobError: true
                        })
                    }
                }
            }),
            onErrorResponse: (error => {
                if ('message' in error) {
                    alert(error?.message)
                }
                this.setState({
                    isLoading: false,
                    isError: true
                })
            })
        })
        // const response = mockJobFromData;
        // if (response.length > 0) {
        //     if (response[0]?.partner_ids.includes(this.props.userData.partner_id)) {
        //         // console.log(JSON.stringify(response));
        //         // debugger;
        //         try {
        //             const tempFinalData = {}
        //             const tempJobFormData = [];
        //             const tempMasterPlanData = [];
        //             const tempAllocatedData = [];
        //             const tempFGReceived = [];
        //             const tempColorIndexData = [];
        //             const tempQCParameter = [];
        //             const tempImages = [];
        //             const tempProductionRule = [];


        //             const tempForData = [];
        //             //tempJobFormData.push({ '': response[0]?.name })
        //             tempForData.push({ 'Jobber': response[0]?.partner_id?.display_name })
        //             tempForData.push({ 'LC method': response[0]?.partner_id_lc_method })
        //             tempForData.push({ 'Production Start Date': updateDateFormat(response[0]?.start_date) })
        //             tempForData.push({ 'Production End Date': updateDateFormat(response[0]?.done_date) })
        //             tempForData.push({ 'Duration': response[0]?.duration })
        //             tempForData.push({ 'Next Job Issue': response[0]?.next_job_issue_id?.display_name })
        //             tempForData.push({ 'Date': updateDateFormat(response[0]?.date) })
        //             tempForData.push({ 'Due Date': response[0]?.due_date ? updateDateFormat(response[0]?.due_date) : '' })
        //             //tempForData.push({ 'Image': '' })
        //             //
        //             tempJobFormData.push(tempForData)
        //             //
        //             this.imageData = response[0]?.image;
        //             this.imageTabData = response[0]?.bom_image_id;
        //             //
        //             tempFinalData['1'] = {
        //                 'title': response[0]?.name,
        //                 'isSelect': false,
        //                 'data': tempJobFormData
        //             }
        //             //jobber_plan_detail_id
        //             response[0]?.jobber_plan_detail_id?.map((item, index) => {
        //                 const tempData = [];
        //                 //
        //                 tempData.push({ 'Job Plan': item?.jobber_plan_id?.display_name })
        //                 tempData.push({ 'Process': item?.bom_id?.display_name })
        //                 tempData.push({ 'Finished': item?.finished_goods_id?.display_name })
        //                 tempData.push({ 'Jobber Rate': item?.rate })
        //                 tempData.push({ 'LC Method': item?.labour_charges })
        //                 tempData.push({ 'Allocated Quantity': item?.allocated_qty })
        //                 tempData.push({ 'FG Issued Qty': item?.issue_qty })
        //                 tempData.push({ 'Receive Qty': item?.receive_qty })
        //                 //
        //                 tempMasterPlanData.push(tempData)
        //             })
        //             tempFinalData['2'] = {
        //                 'title': 'Master Plan',
        //                 'isSelect': false,
        //                 'data': tempMasterPlanData
        //             }
        //             //jobber_plan_detail_id
        //             response[0]?.jobber_allocation_detail_ids?.map((item, index) => {
        //                 const tempData = [];
        //                 //
        //                 tempData.push({ 'Job Plan': item?.jobber_plan_ids?.display_name })
        //                 tempData.push({ 'Product': item?.product_id?.display_name })
        //                 tempData.push({ 'Reference': item?.reference })
        //                 tempData.push({ 'Quantity': item?.comp_qty })
        //                 tempData.push({ 'Lots Visible': item?.lots_visible })
        //                 tempData.push({ 'UOM': item?.uom_id?.display_name })
        //                 tempData.push({ 'Required Qty': item?.req_qty })
        //                 tempData.push({ 'Allocated Qty': item?.allocation_qty })
        //                 //
        //                 tempAllocatedData.push(tempData)
        //             })
        //             tempFinalData['3'] = {
        //                 'title': 'Allocated',
        //                 'isSelect': false,
        //                 'data': tempAllocatedData
        //             }
        //             //order_receive_line_ids
        //             response[0]?.order_receive_line_ids?.map((item, index) => {
        //                 const tempData = [];
        //                 //
        //                 tempData.push({ 'Date': updateDateFormat(item?.date) })
        //                 tempData.push({ 'Receive Order': item?.order_rec_id?.display_name })
        //                 tempData.push({ 'Product': item?.product_id?.display_name })
        //                 tempData.push({ 'Issue Qty': item?.qty })
        //                 tempData.push({ 'Receive Qty': item?.receive_qty })
        //                 //
        //                 tempFGReceived.push(tempData)
        //             })
        //             tempFinalData['4'] = {
        //                 'title': 'FG Received',
        //                 'isSelect': false,
        //                 'data': tempFGReceived
        //             }
        //             //job_color_index_line_ids
        //             response[0]?.job_color_index_line_ids?.map((item, index) => {
        //                 const tempData = [];
        //                 //
        //                 tempData.push({ 'Process': item?.bom_id?.display_name })
        //                 tempData.push({ 'Reference': item?.color_index_reference })
        //                 tempData.push({ 'Product': item?.product_id?.display_name })
        //                 tempData.push({ 'Color Tag': item?.color_tag_id?.display_name })
        //                 tempData.push({ 'Production Qty': item?.production_qty })
        //                 tempData.push({ 'Final Pcs Qty': item?.final_piece_qty })
        //                 tempData.push({ 'Average Qty': item?.average_qty })
        //                 tempData.push({ 'Quantity': item?.qty_onhand })
        //                 tempData.push({ 'Required Qty': item?.req_quantity })
        //                 //
        //                 tempColorIndexData.push(tempData)
        //             })
        //             tempFinalData['5'] = {
        //                 'title': 'Color Index Report',
        //                 'isSelect': false,
        //                 'data': tempColorIndexData
        //             }
        //             //qc_para_process_line_ids
        //             response[0]?.qc_para_process_line_ids?.map((item, index) => {
        //                 const tempData = [];
        //                 //
        //                 if (item?.attachment_id) {
        //                     this.qcParamAttachArray.push(item?.attachment_id)
        //                 }
        //                 //
        //                 tempData.push({ 'Process': item?.bom_id?.display_name })
        //                 tempData.push({ 'Attachment': "" })
        //                 tempData.push({ 'Type': item?.type_id?.display_name })
        //                 tempData.push({ 'Attribute': item?.attribute_id?.display_name })
        //                 tempData.push({ 'Value': item?.attribute_value })
        //                 tempData.push({ 'Approved': item?.approved })
        //                 //tempData.push({ 'Order Issue': item?.average_qty })
        //                 //
        //                 tempQCParameter.push(tempData)
        //             })
        //             tempFinalData['6'] = {
        //                 'title': 'QC Parameter',
        //                 'isSelect': false,
        //                 'data': tempQCParameter
        //             }
        //             //bom_image_id
        //             // response[0]?.bom_image_ids?.map((item, index) => {
        //             //     const tempData = [];
        //             //     //
        //             //     //tempData.push({ 'Process': item?.bom_id?.display_name })
        //             //     //
        //             //     tempImages.push(tempData)
        //             // })
        //             // this.imageTabData = response[0]?.bom_image_id;
        //             // const tempImageData = [];
        //             // tempImageData.push({ 'Image_tab': "" })
        //             // tempImages.push(tempImageData)
        //             // console.log(JSON.stringify(tempImages));
        //             // debugger;
        //             if (response[0]?.bom_image_id) {
        //                 tempFinalData['7'] = {
        //                     'title': 'Images',
        //                     'isSelect': false,
        //                     'data': JSON.parse(JSON.stringify([[{ "Image_tab": "" }]]))
        //                 }
        //             }

        //             this.setState({
        //                 jobFormData: tempFinalData,
        //                 isLoading: false,
        //                 isError: false
        //             })
        //             // setTimeout(async () => {
        //             //     try {
        //             //         if (response[0]?.job_color_index_line_ids.length > 0) {
        //             //             this.getLineData(response[0]?.job_color_index_line_ids).then((value) => {
        //             //                 this.imageData = response[0]?.bom_image_id;
        //             //                 this.setState({
        //             //                     jobFormData: response[0],
        //             //                     jobFormColorIndexData: value,
        //             //                     formState: response[0]?.state,
        //             //                     jobLineId: value,
        //             //                     isLoading: false,
        //             //                     isError: false
        //             //                 })
        //             //             }).catch(e => {
        //             //                 alert('Error to fetch record')
        //             //                 this.setState({
        //             //                     isLoading: false,
        //             //                     isError: true
        //             //                 })
        //             //             })
        //             //         } else {
        //             //             this.computeAllocationCount += 1
        //             //             if (this.computeAllocationCount == 2) {
        //             //                 this.setState({
        //             //                     isLoading: false,
        //             //                     isError: true
        //             //                 }, () => {
        //             //                     alert('Something wrong')
        //             //                     //this.computeAllocationCount = 0
        //             //                 })
        //             //             } else {
        //             //                 this.updateStateFunc("compute_allocation")
        //             //             }

        //             //         }
        //             //     } catch (error) {
        //             //         this.setState({
        //             //             isLoading: false,
        //             //             isError: true
        //             //         })
        //             //     }
        //             // }, 1000);
        //         } catch (error) {
        //             this.setState({
        //                 isLoading: false,
        //                 isError: true
        //             })
        //         }
        //     } else {
        //         alert('job is not assign to you')
        //         this.setState({
        //             isLoading: false,
        //             isError: false,
        //             previousJobError: true
        //         })
        //     }
        // }
    }

    // getLineData = (lineID) => {
    //     return new Promise((resolve, reject) => {
    //         this.props.getJobFormData({
    //             reqData: JSON.stringify(getLineDataRequest(this.props.userData.uid, lineID)),
    //             onSuccessResponse: (response => {
    //                 if (response.length > 0) {
    //                     resolve(response);
    //                 } else {
    //                     reject(response);
    //                 }

    //             }),
    //             onErrorResponse: (error => {
    //                 if ('message' in error) {
    //                     alert(error?.message)
    //                 }
    //                 reject(error);
    //             })
    //         })
    //     })

    // }

    getFGReceiveIdFun = (fgReceiveId = 0) => {
        this.props.getFGReceiveData({
            reqData: JSON.stringify(getFGReceiveRequest(this.props.userData.uid, fgReceiveId)),
            onSuccessResponse: (response => {
                if (response.length > 0) {
                    const { order_receive_color_index_ids = [], id } = response[0];
                    this.props.navigation.navigate('FGReceiveQuantity', {
                        productData: order_receive_color_index_ids,
                        onReceiveCall: (productData) => {
                            this.setState({
                                isLoading: true
                            }, () => {
                                this.props.updateProductionQty({
                                    reqData: JSON.stringify(updateQtyRequestData(this.props.userData.uid, fgReceiveId, productData)),
                                    onSuccessResponse: (response => {
                                        setTimeout(() => {
                                            this.props.updateState({
                                                reqData: JSON.stringify(updateActionReceiveRequestData(this.props.userData.uid, fgReceiveId)),
                                                onSuccessResponse: (response => {
                                                    this.state.fgReceiveStateData[this.state.form_id] = "update"
                                                    AsyncStorage.setItem('fgReceiveState', JSON.stringify(this.state.fgReceiveStateData))
                                                    this.setState({
                                                        formState: 'done',
                                                        isPopupOpen: false,
                                                        isLoading: false,
                                                        fgReceiveId: 0
                                                    })
                                                }),
                                                onErrorResponse: (error => {
                                                    if ('message' in error) {
                                                        alert(error?.message)
                                                    }
                                                    this.setState({
                                                        isLoading: false,
                                                        isPopupOpen: false,
                                                        fgReceiveId: 0
                                                    })
                                                })
                                            })
                                        }, 1500);
                                    }),
                                    onErrorResponse: (error => { })
                                })
                            })
                        }
                    })
                }
            }),
            onErrorResponse: (error => {
                if ('message' in error) {
                    alert(error?.message)
                }
                this.setState({
                    isLoading: false
                })
            })
        })
    }



    updateStateFunc = (methodName, modelName = "textile.ledger", isPopup = false,) => {
        this.setState({
            isLoading: true
        }, () => {
            if (methodName === 'btn_fg_receive') {
                if (this.state.form_id in this.state.fgReceiveStateData) {
                    Alert.alert(
                        'Resubmit Confirmation',
                        'You have already submitted. Do you want to resubmit again?',
                        [
                            {
                                text: 'Cancel',
                                onPress: () => {
                                    this.setState({
                                        isLoading: false
                                    })
                                },
                                style: 'cancel',
                            },
                            {
                                text: 'Yes',
                                onPress: () => {
                                    this.props.updateState({
                                        reqData: JSON.stringify({
                                            "jsonrpc": "2.0",
                                            "method": "call",
                                            "id": this.props.userData.uid,
                                            "params": {
                                                "model": modelName,
                                                "method": methodName,
                                                "args": [[(this.state.fgReceiveId == 0) ? this.state.form_id : this.state.fgReceiveId]],
                                                "kwargs": {},
                                            }
                                        }),
                                        onSuccessResponse: (response => {
                                            setTimeout(() => {
                                                if ('btn_material_received' === methodName) {
                                                    //
                                                    this.assignUserForJobFun()
                                                    //
                                                    setTimeout(() => {
                                                        if (isPopup) {
                                                            this.setState({
                                                                fgReceiveId: response?.res_id
                                                            }, () => {
                                                                this.getFGReceiveIdFun(response?.res_id)
                                                            })
                                                        } else {
                                                            this.jobFormDataFun()
                                                        }
                                                    }, 1500);
                                                } else {
                                                    if (isPopup) {
                                                        this.setState({
                                                            fgReceiveId: response?.res_id
                                                        }, () => {
                                                            this.getFGReceiveIdFun(response?.res_id)
                                                        })
                                                    } else {
                                                        this.jobFormDataFun()
                                                    }
                                                }
                                            }, 1500)
                                        }),
                                        onErrorResponse: (error => {
                                            if ('message' in error) {
                                                alert(error?.message)
                                            }
                                            this.setState({
                                                isLoading: false
                                            })
                                        })
                                    })
                                },
                            },
                        ],
                        { cancelable: false }
                    )
                } else {
                    this.props.updateState({
                        reqData: JSON.stringify({
                            "jsonrpc": "2.0",
                            "method": "call",
                            "id": this.props.userData.uid,
                            "params": {
                                "model": modelName,
                                "method": methodName,
                                "args": [[(this.state.fgReceiveId == 0) ? this.state.formId : this.state.fgReceiveId]],
                                "kwargs": {},
                            }
                        }),
                        onSuccessResponse: (response => {
                            setTimeout(() => {
                                if ('btn_material_received' === methodName) {
                                    //
                                    this.assignUserForJobFun()
                                    //
                                    setTimeout(() => {
                                        if (isPopup) {
                                            this.setState({
                                                fgReceiveId: response?.res_id
                                            }, () => {
                                                this.getFGReceiveIdFun(response?.res_id)
                                            })
                                        } else {
                                            this.jobFormDataFun()
                                        }
                                    }, 1500);
                                } else {
                                    if (isPopup) {
                                        this.setState({
                                            fgReceiveId: response?.res_id
                                        }, () => {
                                            this.getFGReceiveIdFun(response?.res_id)
                                        })
                                    } else {
                                        this.jobFormDataFun()
                                    }
                                }
                            }, 1500)
                        }),
                        onErrorResponse: (error => {
                            if ('message' in error) {
                                alert(error?.message)
                            }
                            this.setState({
                                isLoading: false
                            })
                        })
                    })
                }
            } else {
                this.props.updateState({
                    reqData: JSON.stringify({
                        "jsonrpc": "2.0",
                        "method": "call",
                        "id": this.props.userData.uid,
                        "params": {
                            "model": modelName,
                            "method": methodName,
                            "args": [[(this.state.fgReceiveId == 0) ? this.state.formId : this.state.fgReceiveId]],
                            "kwargs": {},
                        }
                    }),
                    onSuccessResponse: (response => {
                        setTimeout(() => {
                            if ('btn_material_received' === methodName) {
                                //
                                this.assignUserForJobFun()
                                //
                                setTimeout(() => {
                                    if (isPopup) {
                                        this.setState({
                                            fgReceiveId: response?.res_id
                                        }, () => {
                                            this.getFGReceiveIdFun(response?.res_id)
                                        })
                                    } else {
                                        this.jobFormDataFun()
                                    }
                                }, 1500);
                            } else {
                                if (isPopup) {
                                    this.setState({
                                        fgReceiveId: response?.res_id
                                    }, () => {
                                        this.getFGReceiveIdFun(response?.res_id)
                                    })
                                } else {
                                    this.jobFormDataFun()
                                }
                            }
                        }, 1500)
                    }),
                    onErrorResponse: (error => {
                        if ('message' in error) {
                            alert(error?.message)
                        }
                        this.setState({
                            isLoading: false
                        })
                    })
                })
            }
        })
    }

    assignUserForJobFun = () => {
        this.props.jobberAssignData({
            reqData: JSON.stringify({
                "jsonrpc": "2.0",
                "method": "call",
                "id": this.props.userData.uid,
                "params": {
                    "model": "textile.ledger",
                    "method": "write",
                    "args": [[this.state.formId], { "partner_id": this.props.userData.partner_id }],
                    "kwargs": {}
                }
            }),
            onSuccessResponse: (response => {

            }),
            onErrorResponse: (error => {
            })
        })
        //

    }

    static mapStateToProps = (state) => {
        return {
            userData: state.StackReducer.userData
        }
    }

    static mapDispatchToProps = {
        getJobFormData: getJobFormData,
        computeApplication: computeApplication,
        updateState: updateState,
        getLineData: getLineData,
        getFGReceiveData: getFGReceiveData,
        getReceiveId: getReceiveId,
        updateProductionQty: updateProductionQty,
        jobberAssignData: jobberAssignData
    }

}

export { JobFromComponent };