import React, { Component } from 'react';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { PermissionsAndroid, Platform } from 'react-native';
import { getLineId } from './action';

class ScanComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {

        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.requestCameraPermission()
        })
    }

    requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'App needs camera access to scan QR codes',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
            const result = await request(PERMISSIONS.IOS.CAMERA);
            return result === RESULTS.GRANTED;
        }
    };

    static mapStateToProps = (state) => {
        return {
            userData: state.StackReducer.userData,
            userProcess: state.StackReducer.userProcess
        }
    }

    static mapDispatchToProps = {
        getLineId: getLineId
    }

}

export { ScanComponent };