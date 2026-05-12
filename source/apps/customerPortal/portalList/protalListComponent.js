import React, { Component } from 'react';
import { getCustomerPortalData } from './request';
import { getCustomerPortal } from '../action';
//
class ProtalListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            productData: [],
            masterProductData: [],
            isFilter: false,
            searchText: ""
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({
                isLoading: true
            }, () => {
                this.getCustomerPortalFun()
            })
        })
    }

    getCustomerPortalFun = () => {
        this.props.getCustomerPortal({
            reqData: JSON.stringify(getCustomerPortalData(this.props.userData.uid)),
            onSuccessResponse: ((response) => {
                this.setState({
                    isLoading: false
                })
                if (response?.length > 0) {
                    this.setState({
                        productData: response?.records,
                        masterProductData: JSON.parse(JSON.stringify(response?.records))
                    })
                } else {
                    this.setState({
                        productData: []
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

    static mapStateToProps = (state) => {
        return {
            userData: state.StackReducer.userData,
            userProcess: state.StackReducer.userProcess
        }
    }

    static mapDispatchToProps = {
        getCustomerPortal: getCustomerPortal
    }

}

export { ProtalListComponent };