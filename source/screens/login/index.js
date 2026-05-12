import React from "react";
import { Image, View } from "react-native";
import { LoginComponent } from "./loginComponent";
import { connect } from "react-redux";
import { logo_transparent } from "../../utils/images";
import colors from "../../assets/appColor/colors";
import { Formik } from 'formik';
import OutLinedTextInput from "../../component/OutLinedTextInput";
import ButtonLoader from "../../component/ButtonLoader";
import loginSchema from './validation';
import stacks from "../../navigation/stackEnum";

class Login extends LoginComponent {


    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.WHITE }}>
                <Image source={logo_transparent} style={{ width: '40%', height: '25%' }} resizeMode="contain" />
                <Formik
                    initialValues={{ emailId: '', password: '', isLoading: false }}
                    validationSchema={loginSchema()}
                    validateOnChange={true}
                    validateOnBlur={true}
                    onSubmit={(values, { setErrors, setSubmitting, setFieldValue }) => {
                        setFieldValue('isLoading', true);
                        this.props.getUserLogin({
                            reqData: JSON.stringify({
                                "jsonrpc": "2.0",
                                "method": "call",
                                "id": 0,
                                "params": {
                                    "db": "db_production_21_07_25",//"db_production_21_07_25",//"db_test",//"db_production",//"db_live_gst",
                                    "login": values.emailId,
                                    "password": values.password,
                                    "context": {}
                                }
                            }),
                            onSuccessResponse: (response => {
                                this.props.userDataReq({ userData: response })
                                setTimeout(() => {
                                    this.fetchUserProcessData(setFieldValue, response)
                                }, 2000);
                                // setFieldValue('isLoading', false);
                                // this.props.userDataReq({ userData: response })
                                // this.props.changeStack({ stack_name: stacks.JOBBER_STACK })
                            }),
                            onErrorResponse: (error => {
                                setFieldValue('isLoading', false);
                                if ('message' in error) {
                                    alert(error?.message)
                                }
                            })
                        })
                    }}>
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors }) => (
                        <>
                            <OutLinedTextInput
                                style={{ width: '90%', height: 45 }}
                                errorStyle={{ width: '95%', height: errors.emailId ? undefined : 0 }}
                                label="Email"
                                placeholder='Please enter email-id'
                                value={values.emailId}
                                onChangeText={handleChange('emailId')}
                                visible={true}
                                containterStyle={{ width: '100%', alignItems: 'center', flexDirection: 'column' }}
                                error={errors.emailId}
                            />
                            <OutLinedTextInput
                                style={{ marginTop: 5, width: '90%', height: 45 }}
                                errorStyle={{ width: '95%', height: errors.password ? undefined : 0 }}
                                label="Password"
                                placeholder='Please enter password'
                                value={values.password}
                                onChangeText={handleChange('password')}
                                visible={true}
                                containterStyle={{ width: '100%', alignItems: 'center', flexDirection: 'column' }}
                                error={errors.password}

                            />
                            <ButtonLoader
                                onPress={handleSubmit}
                                loaderStyle={{ width: '90%', backgroundColor: colors.APP_BG_COLOR, borderRadius: 10 }}
                                style={{ width: '90%', backgroundColor: colors.APP_BG_COLOR, borderRadius: 10 }}
                                title="SUBMIT"
                                isLoading={values.isLoading}
                            />
                        </>
                    )}
                </Formik>
                {/* <ButtonLoader
                    onPress={() => { this.sendAllMessages() }}
                    loaderStyle={{ width: '90%', backgroundColor: colors.APP_BG_COLOR, borderRadius: 10 }}
                    style={{ width: '90%', backgroundColor: colors.APP_BG_COLOR, borderRadius: 10 }}
                    title="SUBMIT"
                    isLoading={false}
                /> */}
            </View>
        )
    }
}

export default connect(LoginComponent.mapStateToProps, LoginComponent.mapDispatchToProps)(Login);