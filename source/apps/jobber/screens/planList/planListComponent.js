import React, { Component } from 'react';
import { planRequest } from './request';
import { getPlanData } from './action';

class PlanListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            processData: [],
            planData: [],
            masterPlanData: [],
            filterData: [],
            isFilter: false,
            searchText: ""
        }
    }

    componentDidMount() {
        //
        const tempProcessData = this.props.userProcess?.code_ids?.map(item => item.display_name);
        // console.log(JSON.stringify(this.props.userData.partner_id));
        // debugger;
        //
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({
                processData: tempProcessData,
                isLoading: true,
                planData: [],
                masterPlanData: [],
                filterData: [],
                isFilter: false,
                searchText: ""
            }, () => {
                this.getPlanListData()
            })
        })

    }

    getPlanListData = () => {
        // console.log(JSON.stringify(this.props.route.params));
        // debugger;
        // alert(''+this.props.route.params.planId)
        this.props.getPlanData({
            reqData: JSON.stringify(planRequest(this.props.userData.uid, this.props.route.params.planId)),
            onSuccessResponse: ((response) => {

                if (response?.records?.length > 0) {
                    const filterData = response?.records.filter(items => this.state.processData.some(item => items.bom_id.display_name.includes(item)))
                    const filterSortData = filterData.filter(item => item.state === 'draft' || item.partner_id.id === this.props.userData.partner_id)
                    const sortedData = filterSortData.sort((a, b) => {
                        if (a.state === 'done' && b.state !== 'done') return 1;
                        if (a.state !== 'done' && b.state === 'done') return -1;
                        return 0; // no change in order if both are same
                    });
                    this.setState({
                        planData: sortedData,
                        masterPlanData: JSON.parse(JSON.stringify(sortedData)),
                        isLoading: false
                    })
                } else {
                    this.setState({
                        planData: [],
                        masterPlanData: [],
                        isLoading: false
                    })
                }
            }),
            onErrorResponse: (error => {
                if ('message' in error) {
                    alert(error?.message)
                }
                this.setState({
                    planData: [],
                    masterPlanData: [],
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
        getPlanData: getPlanData
    }

}

export { PlanListComponent };