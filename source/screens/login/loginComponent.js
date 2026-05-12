import React, { Component } from 'react';
import { getUserLogin, getuserProcessInfo } from './action';
import { changeStack, userDataReq, userProcessDataReq } from '../../navigation/action';
import { userProcess } from './request';
import stacks from "../../navigation/stackEnum";
import Share from "react-native-share";
import { AppState, Alert } from 'react-native';


class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            appState: AppState.currentState
        }
        this.numbers = [
            '919998145156',
            '919228242834'
        ];
    }

    componentDidMount() {
        this.subscription = AppState.addEventListener(
            'change',
            this.handleAppStateChange,
        );
        this._unsubscribe = this.props.navigation.addListener('focus', () => {

        })
    }

    fetchUserProcessData = (setFieldValue, userResponse) => {
        //
        const { uid, partner_id } = userResponse;
        //
        this.props.getuserProcessInfo({
            reqData: JSON.stringify(userProcess(uid, partner_id)),
            onSuccessResponse: ((response) => {
                // //
                // console.log(JSON.stringify(response.headers.get("set-cookie")));
                // debugger;
                // //
                setFieldValue('isLoading', false);
                //
                if (response?.records?.length > 0) {
                    this.props.userDataReq({ userData: userResponse })
                    this.props.userProcessDataReq({ userProcess: response?.records[0] })
                    this.props.changeStack({ stack_name: stacks.JOBBER_STACK })
                }
                //
            }),
            onErrorResponse: (error => {
                setFieldValue('isLoading', false);
            })
        })
    }

    componentWillUnmount() {
        if (this.subscription) {
            this.subscription.remove();
        }
    }
    handleAppStateChange = nextState => {
        this.setState({ appState: nextState });
    };
    // delay helper
    delay = ms => new Promise(res => setTimeout(res, ms));

    waitForReturnToApp = () => {
        return new Promise(resolve => {
            const check = AppState.addEventListener(
                'change',
                nextState => {
                    if (nextState === 'active') {
                        check.remove();
                        resolve(true);
                    }
                },
            );
        });
    };
    shareToWhatsApp = async number => {
        try {

            const isInstalled = await Share.isPackageInstalled(
                'com.whatsapp',
            );

            console.log('installed', isInstalled);

            if (!isInstalled?.isInstalled) {
                alert('WhatsApp not installed');
                return;
            }
            await Share.shareSingle({
                social: Share.Social.WHATSAPP,
                whatsAppNumber: number,
                url: 'https://picsum.photos/200/300',
                message: 'Hello test message',
                subject: 'Hello test',
            });
            // await Share.shareSingle({
            //     social: Share.Social.WHATSAPP,

            //     whatsAppNumber: number,

            //     message: 'Hello test message',

            //     urls: [
            //         'file:///storage/emulated/0/Download/image1.jpg',
            //     ],

            //     failOnCancel: false,
            // });

        } catch (e) {
            console.log('ERROR', e);
        }
    };

    sendAllMessages = async () => {
        try {
            
            for (let i = 0; i < this.numbers.length; i++) {
                const number = this.numbers[i];

                await this.shareToWhatsApp(number);

                await this.waitForReturnToApp();

                await this.delay(2000);
            }

            Alert.alert('Done', 'All messages completed');
        } catch (e) {
            console.log('Final error', e);
        }
    };

    static mapStateToProps = (state) => {
        return {
        }
    }

    static mapDispatchToProps = {
        getUserLogin: getUserLogin,
        changeStack: changeStack,
        userDataReq: userDataReq,
        userProcessDataReq: userProcessDataReq,
        getuserProcessInfo: getuserProcessInfo
    }

}

export { LoginComponent };