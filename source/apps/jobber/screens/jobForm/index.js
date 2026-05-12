import React, { useState } from "react";
import { ActivityIndicator, TouchableOpacity, Image, ScrollView, Text, View, Pressable, StyleSheet, Dimensions } from "react-native";
import { JobFromComponent } from "./jobFromComponent";
import { connect } from "react-redux";
import colors from "../../../../assets/appColor/colors";
import HeaderComponent from "../../../../hoc/headerComponent";
import HOCComponent from "../../../../hoc/hocComponent";
import ButtonLoader from "../../../../component/ButtonLoader";
import fonts from "../../../../assets/fonts/fonts";
import { normalize } from "../../../../utils/normalize";
import Base64Image from "../../../../utils/Base64Image";
import { JOBSTATE } from "../../utils/jobState";
import { formatValue } from "../../utils/utils";
import { colorIndexKeyMapping, jobFormKeyMapping } from "./requestData";
import KeyValueTable from "./KeyValueTable";
import { close, drop_down } from "../../../../utils/images";
import { IMAGE_URL } from "../../../../services/api-end-points";
//
const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);
//
const renderRowData = (qcParamAttachArray, imageTabData, onImageSelect, onTextPress, expanded, rowIndex, selectedParentIndex, selectedChildIndex, selectedRowIndex, form_id, value, clickEvent) => {
    return (
        <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
            <TouchableOpacity
                onPress={() => {
                    clickEvent()

                }}
                style={{ flexDirection: "row", backgroundColor: colors.GRAY_SHADE_01, padding: 10, justifyContent: "space-between", width: '100%' }}>
                <Text
                    style={{
                        fontFamily: fonts.POPPINS_REGULAR,
                        fontWeight: '800',
                        fontSize: normalize(16),
                        color: colors.BLACK_SHADE_03,
                    }}>

                    {value?.title}
                </Text>
                <Image source={drop_down} style={{ width: 25, height: 25, transform: [{ rotate: value?.isSelect ? "0deg" : "180deg" }], }} />
            </TouchableOpacity>
            {
                value?.isSelect &&

                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={{ borderWidth: 1, borderColor: colors.BLACK_SHADE_03 }}>
                    <View style={{ flexDirection: "column" }}>
                        {value?.data.map((item, index) => {
                            return (
                                <View style={{ borderBottomWidth: (index === (value?.data.length - 1)) ? 0 : 1, borderBottomColor: colors.BLACK_SHADE_03 }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", }}>
                                        {
                                            (index === 0) && item.map((items, indexs) => {
                                                if (Object.keys(items)[0].toLowerCase() === 'image_tab')
                                                    return null;
                                                else
                                                    return (

                                                        <View style={{ width: 120, height: 50, flex: 1, alignItems: "center", justifyContent: "center", borderRightColor: colors.BLACK_SHADE_03, borderRightWidth: (indexs === (item.length - 1)) ? 0 : 1, borderBottomColor: colors.BLACK_SHADE_03, borderBottomWidth: 1 }}>
                                                            <Text style={{ flexWrap: 'wrap', textAlign: "center", fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(14), color: colors.BLACK_SHADE_03, }}>{Object.keys(items)[0]}</Text>
                                                        </View>
                                                    )
                                            })
                                        }
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", }}>
                                        {
                                            item.map((items, indexs) => {
                                                if (Object.keys(items)[0].toLowerCase() === 'image_tab')
                                                    return (
                                                        <TouchableOpacity
                                                            onPress={() => onImageSelect(`textile.ledger/${form_id}/bom_image_id`)}
                                                            style={{ width: 150, height: 150, alignSelf: "center" }}>
                                                            {
                                                                imageTabData &&
                                                                <Image source={{ uri: `${IMAGE_URL()}/web/image/textile.ledger/${form_id}/bom_image_id` }} style={{ width: 150, height: 150, }} resizeMode="contain" />
                                                            }
                                                        </TouchableOpacity>
                                                    )
                                                else
                                                    return (
                                                        <View style={{ width: 120, height: 50, borderRightColor: colors.BLACK_SHADE_03, borderRightWidth: (indexs === (item.length - 1)) ? 0 : 1, alignItems: "center", justifyContent: "center" }}>
                                                            {
                                                                Object.keys(items)[0].toLowerCase() === 'attachment' ?
                                                                    <TouchableOpacity onPress={() => onImageSelect(`qc.para.process/${qcParamAttachArray[index]}/attachment_id`)} >
                                                                        <Image source={{ uri: `${IMAGE_URL()}/web/image/qc.para.process/${qcParamAttachArray[index]}/attachment_id` }} style={{ width: 120, height: 30 }} resizeMode="contain" />
                                                                    </TouchableOpacity>
                                                                    :
                                                                    <TouchableOpacity onPress={() => onTextPress(rowIndex, index, indexs)} >
                                                                        <Text
                                                                            ellipsizeMode="tail"
                                                                            numberOfLines={2}
                                                                            style={{
                                                                                flexWrap: 'wrap',
                                                                                textAlign: "center",
                                                                                fontFamily: fonts.POPPINS_REGULAR,
                                                                                fontWeight: '500',
                                                                                fontSize: normalize(12),
                                                                                color: colors.BLACK_SHADE_03,
                                                                            }}>
                                                                            {Object.values(items)[0].toString()}
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                            }
                                                            {
                                                                (expanded &&
                                                                    (index === selectedChildIndex) &&
                                                                    (rowIndex === selectedParentIndex) &&
                                                                    (indexs === selectedRowIndex)) &&
                                                                <Text style={{
                                                                    position: 'absolute',
                                                                    backgroundColor: 'white',
                                                                    padding: 5,
                                                                    bottom: 0,
                                                                    fontFamily: fonts.POPPINS_REGULAR,
                                                                    fontWeight: '500',
                                                                    fontSize: normalize(12),
                                                                    color: colors.BLACK_SHADE_03,
                                                                }}>
                                                                    {Object.values(items)[0].toString()}
                                                                </Text>
                                                            }
                                                            {/*  */}
                                                        </View>
                                                    )
                                            })

                                        }
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            }
        </View>
    )
}
//
class JobFrom extends JobFromComponent {


    render() {
        return (
            <>
                <HOCComponents
                    onPress={() => {
                        this.props.navigation.goBack()
                    }}
                    isBack={true}
                    title="JOB Form"
                >
                    <ScrollView nestedScrollEnabled contentContainerStyle={{ padding: 10, paddingBottom: 80 }}>
                        {
                            this.imageData &&
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        isImageView: true,
                                        seleteImageId: this.state.form_id,
                                        endPoint: `textile.ledger/${this.state.form_id}/bom_image_id`
                                    })
                                }}
                            >
                                <Image source={{ uri: `${IMAGE_URL()}/web/image/textile.ledger/${this.state.form_id}/bom_image_id` }} style={{ aspectRatio: 1.5 }} resizeMode="contain" />
                            </TouchableOpacity>
                        }
                        {
                            Object.entries(this.state.jobFormData).map(([key, value], index) => {
                                if (value.data.length > 0) {
                                    return renderRowData(
                                        this.qcParamAttachArray,
                                        this.imageTabData,
                                        ((endPoint) => {
                                            this.setState({
                                                isImageView: true,
                                                endPoint: endPoint
                                            })
                                        }),
                                        ((index, indexs, rowIndex) => {
                                            this.setState({
                                                expanded: !this.state.expanded,
                                                selectedParentIndex: index,
                                                selectedChildIndex: indexs,
                                                selectedRowIndex: rowIndex
                                            }, () => {
                                                setTimeout(() => {
                                                    this.setState({
                                                        expanded: !this.state.expanded,
                                                        selectedParentIndex: -1,
                                                        selectedChildIndex: -1,
                                                        selectedRowIndex: -1
                                                    })
                                                }, 500)
                                            })
                                        }),
                                        this.state.expanded,
                                        index,
                                        this.state.selectedParentIndex,
                                        this.state.selectedChildIndex,
                                        this.state.selectedRowIndex,
                                        this.state.form_id,
                                        value,
                                        () => {
                                            this.state.jobFormData[key.toString()].isSelect = !this.state.jobFormData[key.toString()].isSelect
                                            this.setState({
                                                jobFormData: this.state.jobFormData
                                            })
                                        })
                                } else {
                                    return null
                                }
                            })
                        }
                    </ScrollView>
                    {
                        this.state.isLoading &&
                        <View style={{ width: "100%", height: '100%', position: 'absolute', backgroundColor: "#00000089", alignItems: "center", justifyContent: "center" }}>
                            <ActivityIndicator size="large" color={colors.WHITE} />
                        </View>
                    }
                    {
                        (this.state.jobLineId.length > 0 && this.state.formState === "draft") ?
                            <View style={{ flexDirection: 'row', width: "100%", alignItems: "center", justifyContent: "center" }}>
                                <ButtonLoader
                                    onPress={() => {
                                        this.props.navigation.navigate('UpdateQuantity', {
                                            'lineId': this.state.jobLineId,
                                            'selectedLineId': this.state.lineId,
                                            'qty': this.state.totalQty,
                                            'formId': this.state.form_id
                                        })
                                    }}
                                    loaderStyle={{ height: 45, width: '45%', backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, alignSelf: 'center', marginRight: 20, marginTop: 20 }}
                                    style={{ height: 45, width: '45%', backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, alignSelf: 'center', marginRight: 20, marginTop: 20 }}
                                    title="Pick Up Quantity"
                                    isLoading={false}
                                />
                                <ButtonLoader
                                    onPress={() => { this.updateStateFunc("btn_ready_to_issue") }}
                                    loaderStyle={{ height: 45, width: '45%', backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, alignSelf: 'center', marginTop: 20 }}
                                    style={{ height: 45, width: '45%', backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, alignSelf: 'center', marginTop: 20 }}
                                    title="Ready To Issue"
                                    isLoading={false}
                                />
                            </View>
                            :
                            (this.state.formState && this.state.formState !== "done") &&
                            <ButtonLoader
                                onPress={() => { this.updateStateFunc(JOBSTATE[this.state.formState].action, JOBSTATE[this.state.formState].modelName, JOBSTATE[this.state.formState]?.ispopUp) }}
                                loaderStyle={{ height: 45, backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, alignSelf: 'center', marginRight: 20, marginTop: 20 }}
                                style={{ height: 45, backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, alignSelf: 'center', marginRight: 20, marginTop: 20 }}
                                title={JOBSTATE[this.state.formState].title}
                                isLoading={false}
                            />
                    }
                </HOCComponents>
                {this.state.isImageView &&
                    <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height, position: 'absolute', backgroundColor: '#00000089' }}>
                        <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'transparent' }]}
                            onPress={() => {
                                this.setState({
                                    isImageView: false,
                                    seleteImageId: -1,
                                    endPoint: ''
                                })
                            }}
                        />
                        <View style={[{ width: '100%', alignItems: "center", justifyContent: "center", },]}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        isImageView: false,
                                        seleteImageId: -1,
                                        endPoint: ''
                                    })
                                }} style={{ position: 'absolute', top: 0, right: 0, margin: 20 }}>
                                <Image source={close} resizeMode="contain" tintColor={'#FFFFFF'} style={{ width: 22, height: 22 }} />
                            </TouchableOpacity>
                            <View style={{ width: '100%', alignItems: 'center', paddingBottom: 10, }}>
                                <View style={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}>
                                    <Image source={{ uri: `${IMAGE_URL()}/web/image/${this.state.endPoint}` }} style={{ height: "85%", aspectRatio: 0.9 }} resizeMode="contain" />
                                </View>
                            </View>
                        </View>
                    </View>
                }
            </>
        )
    }
}

export default connect(JobFromComponent.mapStateToProps, JobFromComponent.mapDispatchToProps)(JobFrom);