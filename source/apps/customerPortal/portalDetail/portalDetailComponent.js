import React, { Component } from 'react';
import { customerPortalDetailReq } from './request';
import { getCustomerPortalDetail } from '../action';
import { IMAGE_URL, BASE_URL_DATA } from '../../../services/api-end-points';
import { getThreadData } from '../../product/action';
import { threadRequest } from '../../product/productDataDetail/request';
import firestore from '@react-native-firebase/firestore';

//
class PortalDetailComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            productData: [],
            masterProductData: [],
            isFilter: false,
            searchText: "",
            isSending: true,
            topValue: "",
            bottomValue: "",
            dupattaValue: "",
            imageId: 0,
            customerMobileNumbers: [],
            imageURL: "",
            selectedModeType: "",
            imageData: [],
            displayName: '',
            requestData: {},
            totalUser: 0,
            attachmentData: [],
            customerName: "",
            isActive: false
        }
        this.whatsAppMessage = ""
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({
                isLoading: true
            }, () => {
                this.getCustomerPortalDetailFun()
                this.checkTime()
            })
        })
    }

    getCustomerPortalDetailFun = () => {
        this.props.getCustomerPortalDetail({
            reqData: JSON.stringify(customerPortalDetailReq(this.props.userData.uid, this.props.route.params.portalId)),
            onSuccessResponse: ((response) => {
                this.setState({
                    isLoading: false
                })
                if (response?.length > 0) {
                    const modeType = response[0].mode_type_selection
                    if (modeType === 'customer') {
                        //
                        this.setState({
                            selectedModeType: response[0].mode_type_selection,
                            displayName: response[0]?.product_id?.display_name,
                            topValue: response[0]?.x_studio_top.display_name,
                            bottomValue: response[0]?.x_studio_bottom.display_name,
                            dupattaValue: response[0]?.x_studio_dupatta.display_name,
                            imageURL: response[0].customer_line_ids[0].image_url
                        }, () => {
                            if (response[0]?.type_selection === "multiple") {
                                this.productThreadData(response[0]?.product_template_id?.id, response[0])
                            } else {
                                const { product_id, x_studio_top, x_studio_bottom, x_studio_dupatta, customer_line_ids, pricelist_option } = response[0];
                                const textMessage = `${product_id?.display_name}\n\nTop: ${x_studio_top?.display_name || ''}\nBottom: ${x_studio_bottom?.display_name || ''}\nDupatta: ${x_studio_dupatta?.display_name || ''}`;
                                //
                                const result = {};
                                //
                                customer_line_ids.forEach(item => {
                                    if (!item.x_studio_mobile) return;

                                    const mobile = item.x_studio_mobile.replace(/\D/g, '');

                                    if (!result[mobile]) {
                                        result[mobile] = { image: [] };
                                    }
                                    result[mobile].image.push({
                                        image: item.image_url,
                                        text: textMessage + `${(pricelist_option.includes('with')) ? `\n\n\u20B9${item.price_unit}` : " "}`
                                    });
                                });
                                //
                                this.setState({
                                    isLoading: false,
                                    attachmentData: [],
                                    requestData: result,
                                    totalUser: Object.keys(result).length,
                                    isSending: !(Object.keys(result).length > 0),
                                })
                            }
                        })
                    } else {
                        this.setState({
                            selectedModeType: response[0].mode_type_selection
                        })
                        //    
                        if (response[0].line_ids.length > 0) {
                            const mobileNumber = response[0]?.x_studio_mobile ? [response[0]?.x_studio_mobile.replace(/[+\s]/g, '')] : "";
                            const result = {};
                            const tempProdcuctData = {};
                            if (!result[mobileNumber]) {
                                result[mobileNumber] = {
                                    image: []
                                };
                            }
                            (async () => {
                                //const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
                                //response[0].line_ids
                                for (var i = 0; i < response[0].line_ids.length; i++) {
                                    const item = response[0].line_ids[i]
                                    //
                                    tempProdcuctData[item.product_template_id.id] = {
                                        "lineData": item,
                                        "attachmentData": ""
                                    }
                                    if (!result[mobileNumber]) {
                                        result[mobileNumber] = {
                                            image: []
                                        };
                                    }
                                    const textMessage = `${item.product_id.display_name}\n\nTop: ${item.x_studio_top?.display_name || ''}\nBottom: ${item.x_studio_bottom?.display_name || ''}\nDupatta: ${item.x_studio_dupatta?.display_name || ''}`;
                                    // result[mobileNumber].image.push({
                                    //     image: item.image_url,
                                    //     text: (textMessage + `${(response[0].pricelist_option.includes('with')) ? `\n\n\u20B9${item.price_unit}` : " "}`)
                                    // });
                                    if (response[0]?.type_selection === "multiple") {
                                        //DO Function to wait ineer function to complete then start outerfunction.
                                        await this.getProductThreadData(result, mobileNumber, tempProdcuctData, item.product_template_id.id)
                                    }
                                    result[mobileNumber].image.splice(0, 0, {
                                        image: item.image_url,
                                        text: (textMessage + `${(response[0].pricelist_option.includes('with')) ? `\n\n\u20B9${item.price_unit}` : " "}`)
                                    });
                                    //await delay(1000);
                                }
                                // console.log(JSON.stringify(tempProdcuctData));
                                // debugger;
                                this.setState({
                                    customerName: response[0].partner_id?.display_name,
                                    productData: tempProdcuctData,//response[0].line_ids,
                                    customerMobileNumbers: mobileNumber ? [mobileNumber] : [],
                                    isLoading: false,
                                    attachmentData: [],
                                    requestData: result,
                                    totalUser: Object.keys(result).length,
                                    isSending: !(Object.keys(result).length > 0),
                                })
                            })();
                            // response[0].line_ids.forEach(item => {
                            //     const textMessage = `${item.product_id.display_name}\n\nTop: ${item.x_studio_top?.display_name || ''}\nBottom: ${item.x_studio_bottom?.display_name || ''}\nDupatta: ${item.x_studio_dupatta?.display_name || ''}`;
                            //     result[mobileNumber].image.push({
                            //         image: item.image_url,
                            //         text: (textMessage + `${(response[0].pricelist_option.includes('with')) ? `\n\n\u20B9${item.price_unit}` : " "}`)

                            //     });
                            //     if (response[0]?.type_selection === "multiple") {
                            //         //DO Function to wait ineer function to complete then start outerfunction.
                            //     }
                            // });

                        } else {
                            this.setState({
                                productData: [],
                                customerMobileNumbers: [],
                                isLoading: false,
                                attachmentData: [],
                                requestData: result,
                                totalUser: Object.keys(result).length,
                                isSending: !(Object.keys(result).length > 0),
                            })
                        }
                    }
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

    sendMessage = async (messages = "", imageUr = "") => {
        // console.log(JSON.stringify(this.state.requestData));
        // debugger;
        // return;

        try {
            await fetch(
                'https://us-central1-jash-odoo-app.cloudfunctions.net/sendMessage',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.state.requestData)
                }
            );
        } catch (error) {
            console.error('API Error:', error);
        }
    };

    getProductThreadData = async (result, mobile, tempProdcuctData, productId) => {
        return new Promise((resolve, reject) => {
            this.props.getThreadData({
                reqData: JSON.stringify(threadRequest(this.props.userData.uid, productId)),
                onSuccessResponse: ((response) => {
                    //
                    if (response?.['ir.attachment']) {
                        const attachmentData = JSON.parse(JSON.stringify(response?.['ir.attachment']));
                        tempProdcuctData[productId].attachmentData = attachmentData;
                        if (attachmentData.length > 0) {
                            const isImage = attachmentData.some(items => items.mimetype?.startsWith('image/'));
                            if (isImage) {
                                //
                                const images = attachmentData
                                    .filter(item => item.mimetype?.startsWith('image/'))
                                    .map((items, index) => ({
                                        image: `${BASE_URL_DATA()}/web/content/${items.id}?unique=${items.checksum}`,
                                        text: " ",
                                    }));
                                const videos = attachmentData
                                    .filter(item => item.mimetype?.startsWith('video/'))
                                    .map((items, index) => ({
                                        video: `${BASE_URL_DATA()}/web/content/${items.id}?unique=${items.checksum}`,
                                        text: " ",
                                    }));
                                const documents = attachmentData
                                    .filter(item => item.mimetype?.startsWith('application/'))
                                    .map((items, index) => ({
                                        document: `${BASE_URL_DATA()}/web/content/${items.id}?unique=${items.checksum}`,
                                        text: " ",
                                    }));
                                //    
                                if (images.length > 0) {
                                    result[mobile].image = images
                                }
                                if (videos.length > 0) {
                                    result[mobile].videos = videos
                                }
                                if (documents.length > 0) {
                                    result[mobile].document = documents
                                }
                            } else {
                                result[mobile].image.push({
                                    image: item.image_url,
                                    text: textMessage + `${(pricelist_option.includes('with')) ? `\n\n\u20B9${item.price_unit}` : " "}`
                                });
                                if (attachmentData.length > 0) {
                                    const videos = attachmentData
                                        .filter(item => item.mimetype?.startsWith('video/'))
                                        .map((items, index) => ({
                                            video: `${BASE_URL_DATA()}/web/content/${items.id}?unique=${items.checksum}`,
                                            text: " ",
                                        }));
                                    const documents = attachmentData
                                        .filter(item => item.mimetype?.startsWith('application/'))
                                        .map((items, index) => ({
                                            document: `${BASE_URL_DATA()}/web/content/${items.id}?unique=${items.checksum}`,
                                            text: " ",
                                        }));
                                    if (videos.length > 0) {
                                        result[mobile].videos = videos
                                    }
                                    if (documents.length > 0) {
                                        result[mobile].document = documents
                                    }
                                }
                            }

                        }
                    }
                    // IMPORTANT
                    resolve(response);
                }),
                onErrorResponse: (error => {
                    if ('message' in error) {
                        alert(error?.message)
                    }
                    reject(error);
                })
            })
        });
    }
    productThreadData = (productId, responseData) => {
        this.props.getThreadData({
            reqData: JSON.stringify(threadRequest(this.props.userData.uid, productId)),
            onSuccessResponse: ((response) => {
                console.log("response == " + JSON.stringify(response));
                if (response?.['ir.attachment']) {
                    const tempData = JSON.parse(JSON.stringify(response?.['ir.attachment']));
                    this.setWhatsAppDataForCustomer(responseData, tempData)
                } else {
                    this.setWhatsAppDataForCustomer(responseData, [])
                }
            }),
            onErrorResponse: (error => {
                if ('message' in error) {
                    alert(error?.message)
                }
                this.setWhatsAppDataForCustomer(responseData, [])
            })
        })
    }

    setWhatsAppDataForCustomer = (responseData, attachmentData) => {
        //
        const { product_id, x_studio_top, x_studio_bottom, x_studio_dupatta, customer_line_ids, pricelist_option } = responseData;
        const textMessage = `${product_id?.display_name}\n\nTop: ${x_studio_top?.display_name || ''}\nBottom: ${x_studio_bottom?.display_name || ''}\nDupatta: ${x_studio_dupatta?.display_name || ''}`;
        //
        const result = {};
        //
        customer_line_ids.forEach(item => {
            if (!item.x_studio_mobile) return;

            const mobile = item.x_studio_mobile.replace(/\D/g, '');

            if (!result[mobile]) {
                result[mobile] = { image: [] };
            }
            if (attachmentData.length > 0) {
                const isImage = attachmentData.some(items => items.mimetype?.startsWith('image/'));
                if (isImage) {
                    //
                    const images = attachmentData
                        .filter(item => item.mimetype?.startsWith('image/'))
                        .map((items, index) => ({
                            image: `${BASE_URL_DATA()}/web/content/${items.id}?unique=${items.checksum}`,
                            text: (index === 0) ? (textMessage + `${(pricelist_option.includes('with')) ? `\n\n\u20B9${item.price_unit}` : " "}`) : ' ',
                        }));
                    const videos = attachmentData
                        .filter(item => item.mimetype?.startsWith('video/'))
                        .map((items, index) => ({
                            video: `${BASE_URL_DATA()}/web/content/${items.id}?unique=${items.checksum}`,
                            text: " ",
                        }));
                    const documents = attachmentData
                        .filter(item => item.mimetype?.startsWith('application/'))
                        .map((items, index) => ({
                            document: `${BASE_URL_DATA()}/web/content/${items.id}?unique=${items.checksum}`,
                            text: " ",
                        }));
                    //    
                    if (images.length > 0) {
                        result[mobile].image = images
                    }
                    if (videos.length > 0) {
                        result[mobile].videos = videos
                    }
                    if (documents.length > 0) {
                        result[mobile].document = documents
                    }
                } else {
                    result[mobile].image.push({
                        image: item.image_url,
                        text: textMessage + `${(pricelist_option.includes('with')) ? `\n\n\u20B9${item.price_unit}` : " "}`
                    });
                    if (attachmentData.length > 0) {
                        const videos = attachmentData
                            .filter(item => item.mimetype?.startsWith('video/'))
                            .map((items, index) => ({
                                video: `${BASE_URL_DATA()}/web/content/${items.id}?unique=${items.checksum}`,
                                text: ' ',
                            }));
                        const documents = attachmentData
                            .filter(item => item.mimetype?.startsWith('application/'))
                            .map((items, index) => ({
                                document: `${BASE_URL_DATA()}/web/content/${items.id}?unique=${items.checksum}`,
                                text: " ",
                            }));
                        if (videos.length > 0) {
                            result[mobile].videos = videos
                        }
                        if (documents.length > 0) {
                            result[mobile].document = documents
                        }
                    }
                }

            } else {
                result[mobile].image.push({
                    image: item.image_url,
                    text: textMessage + `${(pricelist_option.includes('with')) ? `\n\n\u20B9${item.price_unit}` : " "}`
                });
            }
        });
        //
        this.setState({
            isLoading: false,
            attachmentData: attachmentData,
            requestData: result,
            totalUser: Object.keys(result).length,
            isSending: !(Object.keys(result).length > 0),
        })
    }

    // Always overwrite same document
    storeDateTime = async () => {
        try {
            const currentDate = new Date();

            await firestore()
                .collection('dateTimeLogs')
                .doc('currentTime') // ✅ fixed document ID
                .set({
                    timestamp: currentDate,
                    dateString: currentDate.toISOString(),
                    isUpdate: false
                });
            this.sendMessage()
            console.log('Date & Time updated successfully');
        } catch (error) {
            console.error('Error storing date & time:', error);
        }
    };

    // differenceInHours = configurable (default 1 hour)
    getDateTime = async (differenceInHours = 1) => {
        try {
            const doc = await firestore()
                .collection('dateTimeLogs')
                .doc('currentTime')
                .get();

            if (!doc.exists) {
                console.log('No data found');
                return true;
            }

            const data = doc.data();
            return data.isUpdate
            // // Firebase timestamp → JS Date
            // const storedTime = data.timestamp?.toDate
            //     ? data.timestamp.toDate()
            //     : new Date(data.timestamp);

            // const currentTime = new Date();

            // // Calculate difference in milliseconds
            // const diffMs = currentTime - storedTime;

            // // Convert hours → milliseconds
            // const allowedMs = differenceInHours * 60 * 60 * 1000;

            // // Return boolean
            // return diffMs >= allowedMs;

        } catch (error) {
            console.error('Error fetching date & time:', error);
            return false;
        }
    };



    checkTime = async () => {
        const TIME_LIMIT_HOURS = 1;
        const isExpired = await this.getDateTime(TIME_LIMIT_HOURS); // 1 hour

        if (isExpired) {
            console.log('More than 1 hour passed ✅');
            this.setState({
                isActive: true
            })
        } else {
            console.log('Still within 1 hour ❌');
            this.setState({
                isActive: false
            })
        }
    };

    static mapStateToProps = (state) => {
        return {
            userData: state.StackReducer.userData,
            userProcess: state.StackReducer.userProcess
        }
    }

    static mapDispatchToProps = {
        getCustomerPortalDetail: getCustomerPortalDetail,
        getThreadData: getThreadData
    }

}

export { PortalDetailComponent };