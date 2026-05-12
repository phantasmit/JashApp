import React, { Component } from 'react';
import { getJobListData } from './action';
import { getJobFormData } from '../jobForm/action';
import { jobList } from './request';

class JobListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobListData: [],
            isLoading: false,
            job_color_index_line_ids: [],
            masterPlanData: [],
            filterData: [],
            isFilter: false,
            searchText: ""
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({
                jobListData: [],
                isLoading: true,
                job_color_index_line_ids: [],
                masterPlanData: [],
                filterData: [],
                isFilter: false,
                searchText: ""
            }, () => {
                this.getJobListDataFun()
            })
        })
    }

    getJobListDataFun = () => {
        console.log(JSON.stringify(jobList(this.props.userData.uid, this.props.userData.partner_id)));
        debugger;
        this.props.getJobListData({

            reqData: JSON.stringify(jobList(this.props.userData.uid, this.props.userData.partner_id)),
            onSuccessResponse: ((response) => {
                if (response?.records?.length > 0) {
                    // console.log(JSON.stringify(response?.records));
                    // debugger;
                    //alert(this.props.userData.partner_id)
                    //const tempData = response?.records.filter(item => (item.partner_id?.id === this.props.userData.partner_id && ['material_received', 'production_start', 'production_end', 'ready'].includes(item?.state)))
                    //const tempData = response?.records.filter(item => (item.partner_id?.id === this.props.userData.partner_id))
                    const sortedData = response?.records.sort((a, b) => {
                        if (a.state === 'done' && b.state !== 'done') return 1;
                        if (a.state !== 'done' && b.state === 'done') return -1;
                        return 0; // no change in order if both are same
                    });
                    this.setState({
                        jobListData: sortedData,
                        masterPlanData: JSON.parse(JSON.stringify(sortedData)),
                        isLoading: false
                    })
                } else {
                    this.setState({
                        jobListData: [],
                        isLoading: false
                    })
                }
            }),
            onErrorResponse: (error => {
                if ('message' in error) {
                    alert(error?.message)
                }
                this.setState({
                    jobListData: [],
                    isLoading: false
                })
            })
        })
    }

    // jobFormDataFun = (formId) => {
    //     this.props.getJobFormData({
    //         reqData: JSON.stringify({
    //             "jsonrpc": "2.0",
    //             "method": "call",
    //             "id": this.props.userData.uid,
    //             "params": {
    //                 "model": "textile.ledger",
    //                 "method": "read",
    //                 "args": [[formId]],
    //                 "kwargs": {},
    //                 "context": {
    //                     "lang": "en_US",
    //                     "tz": "Europe/Brussels",
    //                     "uid": 1
    //                 }
    //             }
    //         }),
    //         onSuccessResponse: ((response) => {
    //             if (response.length > 0) {
    //                 const {
    //                     job_color_index_line_ids = []
    //                 } = response[0];
    //                 if (job_color_index_line_ids.length == 1) {
    //                     this.setState({
    //                         isLoading: false
    //                     }, () => {
    //                         this.props.navigation.replace('JobFrom', { formId: parseInt(formId), lineId: parseInt(job_color_index_line_ids[0]) })
    //                     })
    //                 } else {
    //                     setTimeout(() => {
    //                         this.getColorLineData(job_color_index_line_ids, formId)
    //                     }, 1000)
    //                 }
    //             }
    //         }),
    //         onErrorResponse: (error => {
    //             if ('message' in error) {
    //                 alert(error?.message)
    //             }
    //             this.setState({
    //                 isLoading: false,
    //                 isError: true
    //             })
    //         })
    //     })
    // }

    // getColorLineData = (job_color_index_line_ids, formId) => {

    //     this.props.getJobFormData({
    //         reqData: JSON.stringify({
    //             "id": this.props.userData.uid,
    //             "jsonrpc": "2.0",
    //             "method": "call",
    //             "params": {
    //                 "model": "color.index.report.line",
    //                 "method": "read",
    //                 "args": [job_color_index_line_ids],
    //                 "kwargs": {}
    //             }
    //         }),
    //         onSuccessResponse: ((response) => {
    //             if (response.length > 0) {
    //                 this.setState({
    //                     isLoading: false
    //                 }, () => {
    //                     this.props.navigation.navigate('ColorLineModal', {
    //                         colorIndexData: response,
    //                         onPress: ((lineId) => {
    //                             setTimeout(() => {
    //                                 this.props.navigation.replace('JobFrom', { formId: parseInt(formId), lineId: parseInt(lineId) })
    //                             }, 500);

    //                         })
    //                     })
    //                 })
    //                 // this.props.navigation.navigate('ColorLineModal', {
    //                 //     colorIndexData: response[0],
    //                 //     onPress: ((lineId) => {
    //                 //         this.props.navigation.replace('JobFrom', { formId: parseInt(formId), lineId: parseInt(lineId) })
    //                 //     })
    //                 // })
    //             }
    //         }),
    //         onErrorResponse: (error => {
    //             if ('message' in error) {
    //                 alert(error?.message)
    //             }
    //             this.setState({
    //                 isLoading: false,
    //                 isError: true
    //             })
    //         })
    //     })
    // }

    static mapStateToProps = (state) => {
        return {
            userData: state.StackReducer.userData
        }
    }

    static mapDispatchToProps = {
        getJobListData: getJobListData,
        getJobFormData: getJobFormData
    }

}

export { JobListComponent };