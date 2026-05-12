import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { DashboardComponent } from "./dashboardComponent";
import { connect } from "react-redux";
import HeaderComponent from "../../../../hoc/headerComponent";
import HOCComponent from "../../../../hoc/hocComponent";
import colors from "../../../../assets/appColor/colors";
import fonts from "../../../../assets/fonts/fonts";
import { normalize } from "../../../../utils/normalize";
import { ScreenOptions } from "../../../../utils/utils";

const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);


class Dashboard extends DashboardComponent {


    render() {
        return (
            <HOCComponents title="Dashbaord">
                <View style={{ flex: 1, alignItems: "flex-start", alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={() => {
                            //this.props.navigation.navigate('PlanList', { planId: parseInt(454) })
                            if (this.props.userProcess?.is_qc_approver && this.props.userProcess?.jobber) {
                                this.props.navigation.navigate('ScreenModal')
                            } else {
                                this.props.navigation.navigate('Scan', { "screenOption": ScreenOptions.NOT_SELECTED })
                            }
                            //this.props.navigation.replace('PlanList', { planId: parseInt(197)})
                        }}
                        style={{ width: '90%', height: 65, backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, marginTop: 10, alignItems: "center", justifyContent: "center" }}>
                        <Text
                            style={{
                                fontFamily: fonts.POPPINS_REGULAR,
                                fontWeight: '500',
                                fontSize: normalize(18),
                                color: colors.WHITE,
                                marginLeft: 15
                            }}>
                            {'Scan QR CODE'}
                        </Text>
                    </TouchableOpacity>
                    {
                        this.props.userProcess?.jobber &&
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('JobList')
                            }}
                            style={{ width: '90%', height: 65, backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, marginTop: 10, alignItems: "center", justifyContent: "center" }}>
                            <Text
                                style={{
                                    fontFamily: fonts.POPPINS_REGULAR,
                                    fontWeight: '500',
                                    fontSize: normalize(18),
                                    color: colors.WHITE,
                                    marginLeft: 15
                                }}>
                                {'Job List'}
                            </Text>
                        </TouchableOpacity>
                    }
                    {/* <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('ProductData')
                        }}
                        style={{ width: '90%', height: 65, backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, marginTop: 10, alignItems: "center", justifyContent: "center" }}>
                        <Text
                            style={{
                                fontFamily: fonts.POPPINS_REGULAR,
                                fontWeight: '500',
                                fontSize: normalize(18),
                                color: colors.WHITE,
                                marginLeft: 15
                            }}>
                            {'Product List'}
                        </Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('PortalList')
                        }}
                        style={{ width: '90%', height: 65, backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, marginTop: 10, alignItems: "center", justifyContent: "center" }}>
                        <Text
                            style={{
                                fontFamily: fonts.POPPINS_REGULAR,
                                fontWeight: '500',
                                fontSize: normalize(18),
                                color: colors.WHITE,
                                marginLeft: 15
                            }}>
                            {'Customer Portal'}
                        </Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        onPress={() => {
                        }}
                        style={{ width: '90%', height: 65, backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, marginTop: 10, alignItems: "center", justifyContent: "center" }}>
                        <Text
                            style={{
                                fontFamily: fonts.POPPINS_REGULAR,
                                fontWeight: '500',
                                fontSize: normalize(18),
                                color: colors.WHITE,
                                marginLeft: 15
                            }}>
                            {''}
                        </Text>
                    </TouchableOpacity> */}
                    {
                        this.props.userProcess?.is_qc_approver &&
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('ProductList', { "planId": ScreenOptions.NOT_SELECTED })
                            }}
                            style={{ width: '90%', height: 65, backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, marginTop: 10, alignItems: "center", justifyContent: "center" }}>
                            <Text
                                style={{
                                    fontFamily: fonts.POPPINS_REGULAR,
                                    fontWeight: '500',
                                    fontSize: normalize(18),
                                    color: colors.WHITE,
                                    marginLeft: 15
                                }}>
                                {'QC Verify'}
                            </Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity
                        onPress={() => {
                            this.props.doLogout()
                        }}
                        style={{ width: '90%', height: 65, backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, marginTop: 10, alignItems: "center", justifyContent: "center" }}>
                        <Text
                            style={{
                                fontFamily: fonts.POPPINS_REGULAR,
                                fontWeight: '500',
                                fontSize: normalize(18),
                                color: colors.WHITE,
                                marginLeft: 15
                            }}>
                            {'Log Out'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </HOCComponents>
        )
    }
}

export default connect(DashboardComponent.mapStateToProps, DashboardComponent.mapDispatchToProps)(Dashboard);