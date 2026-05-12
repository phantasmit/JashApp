import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View, FlatList, Dimensions, Image, ScrollView, Alert } from "react-native";
import { ProductDetailComponent } from "./productDetailComponent";
import { connect } from "react-redux";
import HeaderComponent from "../../../hoc/headerComponent";
import HOCComponent from "../../../hoc/hocComponent";
import fonts from "../../../assets/fonts/fonts";
import { normalize } from "../../../utils/normalize";
import colors from "../../../assets/appColor/colors";
import Base64Image from "../../../utils/Base64Image";
import ButtonLoader from "../../../component/ButtonLoader";
import { QC_JOBSTATE } from "../../jobber/utils/jobState";
import { check_square, drop_down, uncheck_square } from "../../../utils/images";
import { IMAGE_URL } from "../../../services/api-end-points";
//
const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);
//
class ProductDetail extends ProductDetailComponent {
    render() {
        return (
            <HOCComponents
                title="FG Receive"
                isBack={true}
                onPress={() => { this.props.navigation.goBack() }}
            >
                {/* <View style={{ flex: 1, alignItems: "flex-start", alignItems: "center", backgroundColor: colors.WHITE }}> */}
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
                    {/* {
                        this.imageData &&
                        <Base64Image base64={this.imageData} />
                    } */}
                    <Image source={{ uri: `${IMAGE_URL()}/web/image/order.receive/${this.state.form_id}/image_id` }} style={{ height: 250 }} resizeMode="contain" />
                    <View style={{ padding: 10 }}>
                        {
                            (this.state.qcFormDetail.length > 0) &&
                            <View style={{ borderWidth: 0.5, width: '100%', borderColor: colors.BLACK_SHADE_03 }}>
                                {
                                    this.state.qcFormDetail.map((item, index) => {
                                        return (
                                            <View style={{ flexDirection: 'row', borderTopWidth: (index == 0) ? 0 : 0.5, borderTopColor: colors.BLACK_SHADE_03, alignItems: "center", justifyContent: "center" }}>
                                                <Text
                                                    style={{
                                                        flex: 1,
                                                        fontFamily: fonts.POPPINS_REGULAR,
                                                        fontWeight: '500',
                                                        fontSize: normalize(14),
                                                        color: colors.GRAY_SHADE_LIGHT,
                                                        padding: 3
                                                    }}>

                                                    {`${Object.keys(item)[0]} :`}
                                                </Text>
                                                <View style={{ width: 0.5, height: "100%", backgroundColor: colors.BLACK_SHADE_03 }} />
                                                <Text
                                                    style={{
                                                        flexWrap: 'wrap',
                                                        flex: 2,
                                                        textAlign: "left",
                                                        fontFamily: fonts.POPPINS_REGULAR,
                                                        fontWeight: '500',
                                                        fontSize: normalize(16),
                                                        color: colors.BLACK_SHADE_03,
                                                        padding: 3
                                                    }}>
                                                    {Object.values(item)[0]}
                                                </Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        }
                    </View>
                    <View style={{ paddingHorizontal: 10 }}>
                        {
                            (this.state.receiveOrderData.length > 0) &&
                            <>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            isReceiveOrder: !this.state.isReceiveOrder
                                        })
                                    }}
                                    style={{ flexDirection: "row", backgroundColor: colors.GRAY_SHADE_01, padding: 10, justifyContent: "space-between", width: '100%' }}>
                                    <Text
                                        style={{
                                            fontFamily: fonts.POPPINS_REGULAR,
                                            fontWeight: '800',
                                            fontSize: normalize(16),
                                            color: colors.BLACK_SHADE_03,
                                        }}>

                                        {`Receive Order`}
                                    </Text>
                                    <Image source={drop_down} style={{ width: 25, height: 25, transform: [{ rotate: this.state.isReceiveOrder ? "0deg" : "180deg" }], }} />
                                </TouchableOpacity>
                                {
                                    this.state.isReceiveOrder &&
                                    <View style={{ borderWidth: 0.5, width: '100%', borderColor: colors.BLACK_SHADE_03 }}>
                                        <FlatList
                                            scrollEnabled={false}
                                            data={this.state.receiveOrderData}
                                            renderItem={(data, index) => {
                                                return (
                                                    <>
                                                        {
                                                            data?.item?.map((item, indexs) => {
                                                                console.log("This is new == " + JSON.stringify(item));

                                                                return (
                                                                    <View style={{ flexDirection: 'row', borderTopWidth: (index == 0) ? 0 : 0.5, borderTopColor: colors.BLACK_SHADE_03, alignItems: "center", justifyContent: "center" }}>
                                                                        <Text
                                                                            style={{
                                                                                flex: 1,
                                                                                fontFamily: fonts.POPPINS_REGULAR,
                                                                                fontWeight: '500',
                                                                                fontSize: normalize(14),
                                                                                color: colors.GRAY_SHADE_LIGHT,
                                                                                padding: 3
                                                                            }}>

                                                                            {`${Object.keys(item)[0]} :`}
                                                                        </Text>
                                                                        <View style={{ width: 0.5, height: "100%", backgroundColor: colors.BLACK_SHADE_03 }} />
                                                                        <Text
                                                                            style={{
                                                                                flexWrap: 'wrap',
                                                                                flex: 2,
                                                                                textAlign: "left",
                                                                                fontFamily: fonts.POPPINS_REGULAR,
                                                                                fontWeight: '500',
                                                                                fontSize: normalize(16),
                                                                                color: colors.BLACK_SHADE_03,
                                                                                padding: 3
                                                                            }}>
                                                                            {Object.values(item)[0]}
                                                                        </Text>
                                                                    </View>
                                                                )
                                                            })
                                                        }
                                                    </>
                                                )
                                            }}
                                        />
                                    </View>
                                }
                            </>
                        }
                    </View>
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        {
                            (this.state.qcParameterData.length > 0) &&
                            <>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            isQCParameter: !this.state.isQCParameter
                                        })
                                    }}
                                    style={{ flexDirection: "row", backgroundColor: colors.GRAY_SHADE_01, padding: 10, justifyContent: "space-between", width: '100%' }}>
                                    <Text
                                        style={{
                                            fontFamily: fonts.POPPINS_REGULAR,
                                            fontWeight: '800',
                                            fontSize: normalize(16),
                                            color: colors.BLACK_SHADE_03,
                                        }}>

                                        {`QC Parameter`}
                                    </Text>
                                    <Image source={drop_down} style={{ width: 25, height: 25, transform: [{ rotate: this.state.isQCParameter ? "0deg" : "180deg" }], }} />
                                </TouchableOpacity>
                                {
                                    this.state.isQCParameter &&
                                    <View style={{ borderWidth: 0.5, width: '100%', borderColor: colors.BLACK_SHADE_03 }}>
                                        <FlatList
                                            scrollEnabled={false}
                                            data={this.state.qcParameterData}
                                            renderItem={(data, index) => {
                                                return (
                                                    <>
                                                        {
                                                            data?.item?.map((item, indexs) => {
                                                                return (
                                                                    <View style={{ flexDirection: 'row', borderTopWidth: (indexs == 0) ? 0 : 0.5, borderTopColor: colors.BLACK_SHADE_03, alignItems: "center", justifyContent: "center" }}>
                                                                        <Text
                                                                            style={{
                                                                                flex: 1,
                                                                                fontFamily: fonts.POPPINS_REGULAR,
                                                                                fontWeight: '500',
                                                                                fontSize: normalize(14),
                                                                                color: colors.GRAY_SHADE_LIGHT,
                                                                                padding: 3
                                                                            }}>

                                                                            {`${Object.keys(item)[0]} :`}
                                                                        </Text>
                                                                        <View style={{ width: 0.5, height: "100%", backgroundColor: colors.BLACK_SHADE_03 }} />
                                                                        {
                                                                            (Object.keys(item)[0] === 'Approved') ?
                                                                                <TouchableOpacity
                                                                                    style={{ flex: 2, padding: 3 }}
                                                                                    activeOpacity={(this.state.currentState !== 'done') ? 0 : 1}
                                                                                    onPress={() => {
                                                                                        if (this.state.currentState !== 'done') {
                                                                                            this.onClickCheckUpdate(this.state.qcParameterCheckData[data?.index]);
                                                                                            this.state.qcParameterData[data?.index][indexs].Approved = !Object.values(item)[0]
                                                                                            this.setState({
                                                                                                qcParameterData: this.state.qcParameterData
                                                                                            })
                                                                                        }
                                                                                    }}>
                                                                                    <Image source={Object.values(item)[0] ? check_square : uncheck_square} style={{ width: 20, height: 20 }} />
                                                                                </TouchableOpacity>
                                                                                :
                                                                                <Text
                                                                                    style={{
                                                                                        flexWrap: 'wrap',
                                                                                        flex: 2,
                                                                                        textAlign: "left",
                                                                                        fontFamily: fonts.POPPINS_REGULAR,
                                                                                        fontWeight: '500',
                                                                                        fontSize: normalize(16),
                                                                                        color: colors.BLACK_SHADE_03,
                                                                                        padding: 3
                                                                                    }}>
                                                                                    {Object.values(item)[0]}
                                                                                </Text>
                                                                        }
                                                                    </View>
                                                                )
                                                            })
                                                        }
                                                    </>
                                                )
                                            }}
                                        />
                                    </View>
                                }
                            </>
                        }
                    </View>
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        {
                            (this.state.receiveOrderData.length > 0) &&
                            <>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            isColorIndexReport: !this.state.isColorIndexReport
                                        })
                                    }}
                                    style={{ flexDirection: "row", backgroundColor: colors.GRAY_SHADE_01, padding: 10, justifyContent: "space-between", width: '100%' }}>
                                    <Text
                                        style={{
                                            fontFamily: fonts.POPPINS_REGULAR,
                                            fontWeight: '800',
                                            fontSize: normalize(16),
                                            color: colors.BLACK_SHADE_03,
                                        }}>

                                        {`Color Index Report`}
                                    </Text>
                                    <Image source={drop_down} style={{ width: 25, height: 25, transform: [{ rotate: this.state.isColorIndexReport ? "0deg" : "180deg" }], }} />
                                </TouchableOpacity>
                                {
                                    this.state.isColorIndexReport &&
                                    <View style={{ borderWidth: 0.5, width: '100%', borderColor: colors.BLACK_SHADE_03 }}>
                                        <FlatList
                                            scrollEnabled={false}
                                            data={this.state.colorIndexReportData}
                                            renderItem={(data, index) => {
                                                return (
                                                    <>
                                                        {
                                                            data?.item?.map((item, indexs) => {
                                                                if (Object.keys(item)[0] !== 'id') {
                                                                    return (

                                                                        <View style={{ flexDirection: 'row', borderTopWidth: (index == 0) ? 0 : 0.5, borderTopColor: colors.BLACK_SHADE_03, alignItems: "center", justifyContent: "center" }}>
                                                                            <Text
                                                                                style={{
                                                                                    flex: 1,
                                                                                    fontFamily: fonts.POPPINS_REGULAR,
                                                                                    fontWeight: '500',
                                                                                    fontSize: normalize(14),
                                                                                    color: colors.GRAY_SHADE_LIGHT,
                                                                                    padding: 3
                                                                                }}>

                                                                                {`${Object.keys(item)[0]} :`}
                                                                            </Text>
                                                                            <View style={{ width: 0.5, height: "100%", backgroundColor: colors.BLACK_SHADE_03 }} />

                                                                            {
                                                                                (Object.keys(item)[0] === 'Attachment') ?
                                                                                    <Image source={{ uri: `http://113.20.19.105:8069/web/image/order.receive.color.index/${data?.item[0]?.id}/attachment_id` }} style={{ flex: 2, padding: 3, height: 150 }} resizeMode="contain" />
                                                                                    :
                                                                                    <Text
                                                                                        style={{
                                                                                            flexWrap: 'wrap',
                                                                                            flex: 2,
                                                                                            textAlign: "left",
                                                                                            fontFamily: fonts.POPPINS_REGULAR,
                                                                                            fontWeight: '500',
                                                                                            fontSize: normalize(16),
                                                                                            color: colors.BLACK_SHADE_03,
                                                                                            padding: 3
                                                                                        }}>
                                                                                        {Object.values(item)[0]}
                                                                                    </Text>
                                                                            }
                                                                            {/* <Text
                                                                                style={{
                                                                                    flexWrap: 'wrap',
                                                                                    flex: 2,
                                                                                    textAlign: "left",
                                                                                    fontFamily: fonts.POPPINS_REGULAR,
                                                                                    fontWeight: '500',
                                                                                    fontSize: normalize(16),
                                                                                    color: colors.BLACK_SHADE_03,
                                                                                    padding: 3
                                                                                }}>
                                                                                {Object.values(item)[0]}
                                                                            </Text> */}
                                                                        </View>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                    </>
                                                )
                                            }}
                                        />
                                    </View>
                                }
                            </>
                        }
                    </View>

                </ScrollView>
                {
                    (!this.state.isLoading && this.state.qcFormDetail.length > 0 && this.state.currentState !== 'done') &&
                    <View style={{ flexDirection: "row", position: 'absolute', bottom: 0 }}>
                        <ButtonLoader
                            onPress={() => {

                            }}
                            loaderStyle={{ height: 45, backgroundColor: colors.GRAY_SHADE_LIGHT, borderRadius: 10, alignSelf: 'center', marginHorizontal: 10 }}
                            style={{ height: 45, flex: 1, backgroundColor: colors.GRAY_SHADE_LIGHT, borderRadius: 10, alignSelf: 'center', padding: 10, marginHorizontal: 10 }}
                            title={`Reject`}
                            isLoading={false}
                        />
                        <ButtonLoader
                            onPress={() => {
                                if (this.state.qcParameterData.length > 0) {
                                    const tempData = this.state.qcParameterData.map(arr => arr.filter(x => x.Approved)).flat();
                                    if (this.state.currentState === "in_qc") {
                                        if (tempData.length > 0 && tempData.length == this.state.qcParameterData.length) {
                                            this.updateStateFunc(QC_JOBSTATE[this.state.currentState].action, QC_JOBSTATE[this.state.currentState].modelName, QC_JOBSTATE[this.state.currentState]?.ispopUp)
                                        } else {
                                            alert('please select all check')
                                        }
                                    } else {
                                        this.updateStateFunc(QC_JOBSTATE[this.state.currentState].action, QC_JOBSTATE[this.state.currentState].modelName, QC_JOBSTATE[this.state.currentState]?.ispopUp)
                                    }
                                } else {
                                    this.updateStateFunc(QC_JOBSTATE[this.state.currentState].action, QC_JOBSTATE[this.state.currentState].modelName, QC_JOBSTATE[this.state.currentState]?.ispopUp)
                                }
                            }}
                            loaderStyle={{ height: 45, width: '45%', backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, alignSelf: 'center', marginRight: 10 }}
                            style={{ height: 45, flex: 2, backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, alignSelf: 'center', padding: 10, marginRight: 10 }}
                            title={QC_JOBSTATE[this.state.currentState].title}
                            isLoading={false}
                        />
                    </View>
                }
                {
                    this.state.isLoading &&
                    <View style={{ width: "100%", height: '100%', position: 'absolute', backgroundColor: "#00000089", alignItems: "center", justifyContent: "center" }}>
                        <ActivityIndicator size="large" color={colors.WHITE} />
                    </View>
                }
                {/* </View> */}
            </HOCComponents>
        )
    }
}

export default connect(ProductDetailComponent.mapStateToProps, ProductDetailComponent.mapDispatchToProps)(ProductDetail);