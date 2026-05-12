import React, { Component } from 'react';
import { getQAProductListReqData } from './action';
import { productList } from './requestData';
import { getJobFormData } from '../../jobber/screens/jobForm/action';
import { ScreenOptions } from '../../../utils/utils';
//
class ProductListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            qcData: [],
            masterQCData: [],
            processData: [],
            filterData: [],
            isFilter: false,
            searchText: "",
            selectdIndex: -1,
            offsetVal: 0,
            countLimit: 80
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            if (!this.state.isFilter) {
                const tempProcessData = this.props.userProcess?.qc_code_ids?.map(item => item.display_name);
                this.setState({
                    processData: tempProcessData,
                    isLoading: true
                }, () => {
                    this.getQCProductData()
                })
            }
        })
    }
    getQCProductData = () => {
        this.props.getQAProductListReqData({
            reqData: JSON.stringify(productList(this.props.userData.uid)),
            onSuccessResponse: ((response) => {
                const statePriority = {
                    draft: 1,
                    in_qc: 2,
                    qc_approved: 3
                };
                const filterData = response?.records.filter(items =>
                    this.state.processData.some(item => {
                        return items.current_process_id ? items.current_process_id.display_name.includes(item) : false
                    }))
                if (response?.records?.length > 0) {
                    const sorted = filterData.sort(
                        (a, b) => statePriority[a.state] - statePriority[b.state]
                    );
                    this.setState({
                        qcData: sorted,
                        masterQCData: JSON.parse(JSON.stringify(sorted)),
                        isLoading: false
                    })
                } else {
                    this.setState({
                        qcData: [],
                        masterQCData: [],
                        isLoading: false
                    })
                }

            }),
            onErrorResponse: (error => {
                if ('message' in error) {
                    alert(error?.message)
                }
                this.setState({
                    qcData: [],
                    masterQCData: [],
                    isLoading: false
                })
            })
        })
    }
    static mapStateToProps = (state) => {
        return {
            userData: state.StackReducer.userData,
            userProcess: state.StackReducer.userProcess
        }
    }

    static mapDispatchToProps = {
        getQAProductListReqData: getQAProductListReqData,
        getJobFormData: getJobFormData
    }

}

export { ProductListComponent };