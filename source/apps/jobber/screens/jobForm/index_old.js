import React from "react";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
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
//
const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);
//
class JobFrom extends JobFromComponent {


    render() {
        return (
            <HOCComponents
                onPress={() => {
                    this.props.navigation.goBack()
                }}
                isBack={true}
                title="JOB Form"
            >
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                    {
                        this.imageData &&
                        <Base64Image base64={this.imageData} />
                    }
                    <View style={{ flex: 1, alignItems: "flex-start", padding: 10 }}>
                        {
                            Object.entries(this.state.jobFormData).length > 0 &&
                            <KeyValueTable
                                data={this.state.jobFormData}
                                keyMapping={jobFormKeyMapping}
                            />
                        }
                        {
                            this.state.jobFormColorIndexData.length > 0 &&
                            <>
                                <Text
                                    style={{
                                        flexWrap: 'wrap',
                                        textAlign: "left",
                                        fontFamily: fonts.POPPINS_REGULAR,
                                        fontWeight: '800',
                                        fontSize: normalize(18),
                                        color: colors.BLACK_SHADE_03,
                                        marginTop: 20,
                                        marginBottom: 5
                                    }}>
                                    {`Color Index Report`}
                                </Text>
                            </>
                        }
                        <FlatList
                            scrollEnabled={false}
                            style={{ flex: 1, width: "100%" }}
                            contentContainerStyle={{ paddingBottom: 20 }}
                            data={this.state.jobFormColorIndexData}
                            renderItem={({ item, index }) => {
                                return <View style={{ marginTop: (index == 0) ? 0 : 10 }}>
                                    <KeyValueTable
                                        data={item}
                                        keyMapping={colorIndexKeyMapping}
                                    />
                                </View>
                            }} />

                        {

                            (this.state.jobLineId.length > 0 && this.state.formState === "draft") ?
                                <View style={{ flexDirection: 'row' }}>
                                    <ButtonLoader
                                        onPress={() => {
                                            // console.log(JSON.stringify({
                                            //     'lineId': this.state.jobLineId.filter(item => item !== this.state.lineId),
                                            //     'selectedLineId': this.state.lineId,
                                            //     'qty': this.state.totalQty,
                                            //     'formId': this.state.formId
                                            // }));
                                            // debugger;
                                            // console.log(JSON.stringify(this.state.jobLineId));
                                            // console.log(JSON.stringify(this.state.lineId));
                                            // console.log(JSON.stringify(this.state.formId));
                                            // debugger;
                                            this.props.navigation.navigate('UpdateQuantity', {
                                                'lineId': this.state.jobLineId,
                                                'selectedLineId': this.state.lineId,
                                                'qty': this.state.totalQty,
                                                'formId': this.state.formId
                                            })
                                        }}
                                        loaderStyle={{ height: 45, width: '45%', backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, alignSelf: 'center', marginRight: 20, marginTop: 20 }}
                                        style={{ height: 45, width: '45%', backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, alignSelf: 'center', marginRight: 20, marginTop: 20 }}
                                        title="Pick Up Quantity"
                                        isLoading={false}
                                    />
                                    <ButtonLoader
                                        onPress={() => { this.updateStateFunc("btn_ready_to_issue") }}
                                        loaderStyle={{ height: 45, width: '45%', backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, alignSelf: 'center', marginRight: 20, marginTop: 20 }}
                                        style={{ height: 45, width: '45%', backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, alignSelf: 'center', marginRight: 20, marginTop: 20 }}
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
                            // <>
                            //     {(() => {
                            //         switch (this.state.formState) {
                            //             case 'draft':
                            //                 return <ButtonLoader
                            //                     onPress={() => { this.updateStateFunc("compute_allocation") }}
                            //                     loaderStyle={{ height: 45, width: '45%', backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, alignSelf: 'center', marginRight: 20, marginTop: 20 }}
                            //                     style={{ height: 45, width: '45%', backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, alignSelf: 'center', marginRight: 20, marginTop: 20 }}
                            //                     title="Compute Allocation"
                            //                     isLoading={false}
                            //                 />;
                            //             case 'ready_to_issue':
                            //                 return <ButtonLoader
                            //                     onPress={() => { this.updateStateFunc("btn_material_received") }}
                            //                     loaderStyle={{ height: 45, width: '65%', backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, alignSelf: 'center', marginRight: 20, marginTop: 20 }}
                            //                     style={{ height: 45, width: '65%', backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, alignSelf: 'center', marginRight: 20, marginTop: 20 }}
                            //                     title="Jobber Material Received"
                            //                     isLoading={false}
                            //                 />;
                            //             case 'material_received':
                            //                 return <ButtonLoader
                            //                     onPress={() => { this.updateStateFunc("btn_production_start") }}
                            //                     loaderStyle={{ height: 45, width: '45%', backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, alignSelf: 'center', marginRight: 20, marginTop: 20 }}
                            //                     style={{ height: 45, width: '45%', backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, alignSelf: 'center', marginRight: 20, marginTop: 20 }}
                            //                     title="Production Start"
                            //                     isLoading={false}
                            //                 />;
                            //             case 'production_start':
                            //                 return <ButtonLoader
                            //                     onPress={() => { this.updateStateFunc("btn_production_end") }}
                            //                     loaderStyle={{ height: 45, width: '45%', backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, alignSelf: 'center', marginRight: 20, marginTop: 20 }}
                            //                     style={{ height: 45, width: '45%', backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, alignSelf: 'center', marginRight: 20, marginTop: 20 }}
                            //                     title="Production End"
                            //                     isLoading={false}
                            //                 />;
                            //             case 'production_end':
                            //                 return null;
                            //             default:
                            //                 return null;
                            //         }
                            //     })()}
                            // </>
                        }
                        {
                            this.state.jobAssignError &&
                            <Text
                                style={{
                                    width: "100%",
                                    marginVertical: 30,
                                    textAlign: "center",
                                    fontFamily: fonts.POPPINS_REGULAR,
                                    fontWeight: '800',
                                    fontSize: normalize(16),
                                    color: colors.BLACK_SHADE_03
                                }}>
                                {`Job not assign to you.!`}
                            </Text>
                        }
                        {
                            this.state.previousJobError &&
                            <Text
                                style={{
                                    width: "100%",
                                    marginVertical: 30,
                                    textAlign: "center",
                                    fontFamily: fonts.POPPINS_REGULAR,
                                    fontWeight: '800',
                                    fontSize: normalize(16),
                                    color: colors.BLACK_SHADE_03
                                }}>
                                {`Previous job is not done.`}
                            </Text>
                        }
                    </View>
                </ScrollView>
                {
                    this.state.isLoading &&
                    <View style={{ width: "100%", height: '100%', position: 'absolute', backgroundColor: "#00000089", alignItems: "center", justifyContent: "center" }}>
                        <ActivityIndicator size="large" color={colors.WHITE} />
                    </View>
                }
            </HOCComponents>
        )
    }
}

export default connect(JobFromComponent.mapStateToProps, JobFromComponent.mapDispatchToProps)(JobFrom);