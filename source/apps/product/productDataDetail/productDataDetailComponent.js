import React, { Component } from 'react';
import { getProductData, getThreadData } from '../action';
import { productDetailRequest, threadRequest } from './request';
import { IMAGE_URL } from '../../../services/api-end-points';
//
class ProductDataDetailComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            productData: {},
            attachmentData: [],
            downloadsData: [],
            productInfoData: [],
            isProductInfo: false,
            isAttchment: false
        }
        this.whatsAppMessage = ""
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({
                isLoading: true
            }, () => {
                this.productDetailData()
            })
        })
    }

    productDetailData = () => {
        this.props.getProductData({
            reqData: JSON.stringify(productDetailRequest(this.props.userData.uid, this.props.route.params.id)),
            onSuccessResponse: ((response) => {
                if (response?.length > 0) {
                    //
                    const tempProductInfoData = [];
                    //
                    tempProductInfoData.push({ 'Name': response[0]?.name })
                    tempProductInfoData.push({ 'Top': response[0]?.additional_field_one?.display_name })
                    tempProductInfoData.push({ 'Bottom': response[0]?.additional_field_two?.display_name })
                    tempProductInfoData.push({ 'Duppata': response[0]?.additional_field_three?.display_name })
                    tempProductInfoData.push({ 'Price': response[0]?.list_price })
                    //
                    this.whatsAppMessage = `${response[0]?.name}\n\nTop: ${response[0]?.additional_field_one?.display_name}\nBottom: ${response[0]?.additional_field_two?.display_name}\nDupatta: ${response[0]?.additional_field_three?.display_name}\n\n\u20B9${response[0]?.list_price}`;
                    //
                    this.setState({
                        productData: response[0],
                        productInfoData: tempProductInfoData
                    }, () => {
                        setTimeout(() => {
                            this.productThreadData()
                        }, 1500)
                    })
                } else {

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

    productThreadData = () => {
        this.props.getThreadData({
            reqData: JSON.stringify(threadRequest(this.props.userData.uid, this.props.route.params.id)),
            onSuccessResponse: ((response) => {
                console.log(JSON.stringify(response?.['ir.attachment']));
                debugger;
                const tempData = JSON.parse(JSON.stringify(response?.['ir.attachment']));
                // const downloadData = [];
                // tempData.forEach((item) => {
                //     if (item.mimetype.toLowerCase().includes('video')) {
                //         downloadData.push({
                //             url: `${IMAGE_URL()}/web/content/${item.id}?filename=${item.filename}&unique=${item.checksum}&download=true`,
                //             filename: item.filename
                //         })
                //     } else if (item.mimetype.toLowerCase().includes('image')) {
                //         downloadData.push({
                //             url: `${IMAGE_URL()}/web/image/${item.id}`,
                //             filename: item.filename
                //         })
                //     } else {

                //     }
                // });
                this.setState({
                    attachmentData: tempData,
                    // downloadsData: downloadData,
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
    }
    
    sendMessage = async (messages = "", imageUr = "") => {
        try {
            const response = await fetch(
                'https://us-central1-jash-odoo-app.cloudfunctions.net/sendMessage',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mobileNumbers: ['917984186244',"919998145156"],
                        message: messages,
                        image: "",//'https://tinyurl.com/jrka8h22'
                    }),
                }
            );
            // const data = await response.json();
            // alert('test2')
            // console.log('Response:', data);
        } catch (error) {
            //alert('test3')
            console.error('API Error:', error);
        }
    };
    static mapStateToProps = (state) => {
        return {
            userData: state.StackReducer.userData,
            userProcess: state.StackReducer.userProcess
        }
    }

    static mapDispatchToProps = {
        getThreadData: getThreadData,
        getProductData: getProductData
    }

}

export { ProductDataDetailComponent };