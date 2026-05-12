import React, { Component } from 'react';
import { getProductData } from '../action';
import { productRequest } from './request';
//
class ProductDataComponent extends Component {

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
            this.getProductData()
        })
    }

    getProductData = () => {
        this.props.getProductData({
            reqData: JSON.stringify(productRequest(this.props.userData.uid)),
            onSuccessResponse: ((response) => {
                //http://113.20.19.105:8069/web/image/product.template/5635/image_1024
                // console.log(JSON.stringify(response));
                // debugger;
                if (response?.records?.length > 0) {
                    this.setState({
                        productData: response?.records,
                        masterProductData: JSON.parse(JSON.stringify(response?.records)),
                        isLoading: false
                    })
                } else {
                    this.setState({
                        productData: [],
                        masterProductData: [],
                        isLoading: false
                    })
                }

            }),
            onErrorResponse: (error => {
                if ('message' in error) {
                    alert(error?.message)
                }
                this.setState({
                    productData: [],
                    masterProductData: [],
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
        getProductData: getProductData
    }

}

export { ProductDataComponent };