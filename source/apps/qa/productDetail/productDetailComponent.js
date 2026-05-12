
import React, { Component } from 'react';
import { getJobFormData, updateState } from '../../jobber/screens/jobForm/action';
import { buttonActionRequest, checkBoxActionRequest, jobFormRequest } from './requestData';
import { updateDateFormat } from '../../../utils/normalize';
import { enableFreeze } from 'react-native-screens';
//
class ProductDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qcFormDetail: {},
            receiveOrderData: [],
            allocationLineData: [],
            colorIndexReportData: [],
            isLoading: false,
            qcData: [],
            masterQCData: [],
            processData: [],
            currentState: "",
            qcParameterData: [],
            qcParameterCheckData: [],
            isReceiveOrder: false,
            isColorIndexReport: false,
            isQCParameter: false,
            form_id: -1
        }
        this.imageData = ""
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        }, () => {
            this.getJobFormData()
        })
    }

    getJobFormData = () => {
        //this.props.route.params.data?.id
        //parseInt(2651)
        this.props.getJobFormData({
            reqData: JSON.stringify(jobFormRequest(this.props.userData.uid, parseInt(this.props.route.params.data?.id))),
            onSuccessResponse: ((response) => {
                if (response.length > 0) {
                    //
                    const tempQCFormData = [];
                    const tempReceiveOrderData = [];
                    const tempColorIndexReportData = [];
                    const tempQcParameterData = [];
                    const tempQcParameterCheckData = [];
                    //
                    // console.log(JSON.stringify(response));
                    // debugger;
                    this.imageData = response[0]?.image_id;
                    //
                    tempQCFormData.push({ 'Job Name': response[0]?.code })
                    tempQCFormData.push({ 'Jobber': response[0]?.jobber_id?.display_name })
                    tempQCFormData.push({ 'Next Activty Process': response[0]?.next_mrp_bom_process_id?.display_name })
                    tempQCFormData.push({ 'Next Job Issue': response[0]?.next_job_issue_id?.display_name })
                    tempQCFormData.push({ 'Date': updateDateFormat(response[0]?.date) })
                    //
                    const { receive_order_line, order_receive_color_index_ids, qc_para_process_line_ids } = response[0]
                    receive_order_line.map((item, index) => {
                        const tempData = []
                        tempData.push({ 'Job Issue': item?.job_issue_id?.display_name })
                        tempData.push({ 'Plan': item?.plan_id?.display_name })
                        tempData.push({ 'Process': item?.bom_id?.display_name })
                        tempData.push({ 'Product': item?.product_id?.display_name })
                        tempData.push({ 'Jobber rate': item?.rate })
                        tempData.push({ 'Issue Qty': item?.qty })
                        tempData.push({ 'Receive Qty': item?.receive_qty })
                        //
                        tempReceiveOrderData.push(tempData)
                    })
                    //
                    order_receive_color_index_ids.map((item, index) => {
                        const tempData = []
                        tempData.push({ 'id': item?.id })
                        tempData.push({ 'Product': item?.product_id?.display_name })
                        tempData.push({ 'Color Tag': item?.color_tag_id?.display_name })
                        tempData.push({ 'Receive Qty': item?.receive_qty })
                        tempData.push({ 'Attachment': item?.attachment_id })
                        //
                        tempColorIndexReportData.push(tempData)
                    })
                    //
                    qc_para_process_line_ids.map((item, index) => {
                        const tempData = []
                        const tempCheckData = []
                        //
                        tempCheckData.push({ 'id': item?.id })
                        tempCheckData.push({ 'Approved': item?.approved })
                        tempCheckData.push({ 'orderReceiveId': item?.order_receive_id?.id })
                        //
                        tempData.push({ 'Process': item?.bom_id?.display_name })
                        tempData.push({ 'Type': item?.type_id?.display_name })
                        tempData.push({ 'Attribute': item?.attribute_id?.display_name })
                        tempData.push({ 'Value': item?.attribute_value })
                        tempData.push({ 'Approved': item?.approved })
                        //
                        tempQcParameterCheckData.push(tempCheckData)
                        tempQcParameterData.push(tempData)
                        //
                    })
                    //
                    this.setState({
                        form_id: response[0]?.id,
                        qcFormDetail: tempQCFormData,
                        receiveOrderData: tempReceiveOrderData,
                        colorIndexReportData: tempColorIndexReportData,
                        qcParameterData: tempQcParameterData,
                        qcParameterCheckData: tempQcParameterCheckData,
                        isLoading: false,
                        currentState: response[0]?.state
                    })
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
    }
    //
    updateStateFunc = (methodName, modelName = "textile.ledger", isPopup = false,) => {
        this.setState({
            isLoading: true
        }, () => {
            this.props.updateState({
                reqData: JSON.stringify(buttonActionRequest(this.props.userData.uid, methodName, this.props.route.params.data?.id)),
                onSuccessResponse: (response => {
                    this.getJobFormData()
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
        })
    }
    //
    onClickCheckUpdate = (qcParamData) => {
        //
        const id = qcParamData.find(item => item.id)?.id;
        const orderReceiveId = qcParamData.find(item => item.orderReceiveId)?.orderReceiveId;
        //
        this.setState({
            isLoading: true
        }, () => {
            this.props.updateState({
                reqData: JSON.stringify(checkBoxActionRequest(this.props.userData.uid, orderReceiveId, id, true)),
                onSuccessResponse: (response => {
                    this.setState({
                        isLoading: false
                    })
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
        })
    }
    //
    static mapStateToProps = (state) => {
        return {
            userData: state.StackReducer.userData,
            userProcess: state.StackReducer.userProcess

        }
    }

    static mapDispatchToProps = {
        getJobFormData: getJobFormData,
        updateState: updateState
    }

}

export { ProductDetailComponent };




