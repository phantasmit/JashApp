import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View, FlatList, Dimensions, ScrollView } from "react-native";
import { JobListComponent } from "./jobListComponent";
import { connect } from "react-redux";
import HeaderComponent from "../../../../hoc/headerComponent";
import HOCComponent from "../../../../hoc/hocComponent";
import colors from "../../../../assets/appColor/colors";
import fonts from "../../../../assets/fonts/fonts";
import { normalize } from "../../../../utils/normalize";
import Base64Image from "../../../../utils/Base64Image";
import { logo } from "../../../../utils/images";
import SearchComponent from "../../../../component/SearchComponent";
import RenderListItem from "./RenderListItem";
import { containsDisplayNameWith, groupByInvoice, groupByPartnerId, groupByState } from "../../utils/utils";

const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);


class JobList extends JobListComponent {
    render() {
        return (
            <HOCComponents title="Job List" isBack={true} onPress={() => { this.props.navigation.goBack() }}>
                <View style={{ flex: 1, alignItems: "flex-start", alignItems: "center", backgroundColor: colors.WHITE }}>
                    <SearchComponent
                        onChangeText={(text) => {
                            //
                            const filteredData = this.state.masterPlanData.filter(item =>
                                item.name?.toLowerCase().includes(text.toLowerCase()) ||
                                containsDisplayNameWith(item, text));
                            //
                            this.setState({
                                searchText: text,
                                jobListData: filteredData,
                                filterData: [],
                                isFilter: false
                            })
                        }}
                        isFilter={this.state.isFilter}
                        onFilterPress={() => {
                            this.props.navigation.navigate('FilterOption', {
                                filterData: ["Group By Jobber", "Group By State", "Group By Invoices"],
                                onApplyFilter: (props, item) => {
                                    //
                                    let grouped = {};
                                    //
                                    if (props == 0 || props == 1) {
                                        grouped = (props == 0) ? groupByPartnerId(this.state.masterPlanData) : groupByState(this.state.masterPlanData);
                                        this.setState({
                                            searchText: item,
                                            filterData: grouped,
                                            jobListData: [],
                                            isFilter: true
                                        })
                                    } else if (props == -2) {
                                        this.setState({
                                            searchText: '',
                                            jobListData: this.state.masterPlanData,
                                            filterData: [],
                                            isFilter: false,
                                        })
                                    } else {
                                        // console.log(JSON.stringify(props));
                                        // console.log(JSON.stringify(item));
                                        grouped = groupByInvoice(this.state.masterPlanData);
                                        // console.log(JSON.stringify(grouped));
                                        // debugger;
                                        //props
                                        this.setState({
                                            searchText: item,
                                            filterData: grouped,
                                            jobListData: [],
                                            isFilter: true
                                        })
                                        return;
                                    }
                                }
                            })

                        }}
                        search={this.state.searchText}
                    />
                    {
                        (this.state.isFilter && Object.keys(this.state.filterData).length > 0) &&
                        <ScrollView>
                            {Object.entries(this.state.filterData).map(([key, value]) => {
                                return (
                                    <>
                                        <View style={{ width: "90%", flexDirection: 'row', justifyContent: "space-between", paddingVertical: 10 }}>
                                            <Text
                                                style={{

                                                    fontFamily: fonts.POPPINS_REGULAR,
                                                    fontWeight: '500',
                                                    fontSize: normalize(16),
                                                    color: colors.BLACK_SHADE_03
                                                }}>
                                                {`${key.toUpperCase()} (${value.length})`}
                                            </Text>
                                        </View>
                                        <FlatList
                                            scrollEnabled={false}
                                            style={{ flex: 1 }}
                                            contentContainerStyle={{ paddingBottom: 20 }}
                                            data={value}
                                            renderItem={({ item }) => {
                                                return <RenderListItem
                                                    item={item}
                                                    onRowClick={(id) => {
                                                        this.props.navigation.replace('JobFrom', { formId: parseInt(item.id), lineId: parseInt(-1) })
                                                        //this.props.navigation.navigate('JobFrom', data)
                                                        //this.props.navigation.replace('JobFrom', { formId: parseInt(id), lineId: parseInt(-1) })
                                                        // this.setState({
                                                        //     isLoading: true
                                                        // }, () => {
                                                        //     this.jobFormDataFun(id)
                                                        // })
                                                    }} />;
                                            }} />
                                    </>
                                )
                            })}
                        </ScrollView>
                    }
                    {
                        (this.state.jobListData.length > 0) ?
                            <FlatList
                                style={{ flex: 1 }}
                                contentContainerStyle={{ paddingBottom: 20 }}
                                data={this.state.jobListData}
                                renderItem={({ item }) => {
                                    return <RenderListItem
                                        item={item}
                                        onRowClick={(id) => {
                                            this.props.navigation.replace('JobFrom', { formId: parseInt(item.id), lineId: parseInt(-1) })
                                            //                                             {
                                            //   "formId": item.id,
                                            //   "lineId": 12491
                                            // }
                                            //this.props.navigation.replace('JobFrom', { formId: parseInt(id), lineId: parseInt(-1) })
                                            // this.setState({
                                            //     isLoading: true
                                            // }, () => {
                                            //     this.jobFormDataFun(id)
                                            // })
                                        }} />;
                                }} /> :
                            ((!this.state.isLoading && !this.state.isFilter) && <Text
                                style={{
                                    marginVertical: 30,
                                    textAlign: "left",
                                    fontFamily: fonts.POPPINS_REGULAR,
                                    fontWeight: '500',
                                    fontSize: normalize(16),
                                    color: colors.BLACK_SHADE_03
                                }}>
                                {`No Record Found`}
                            </Text>)

                    }
                    {
                        this.state.isLoading &&
                        <View style={{ width: "100%", height: '100%', position: 'absolute', backgroundColor: "#00000089", alignItems: "center", justifyContent: "center" }}>
                            <ActivityIndicator size="large" color={colors.WHITE} />
                        </View>
                    }
                </View>
            </HOCComponents>
        )
    }
}

export default connect(JobListComponent.mapStateToProps, JobListComponent.mapDispatchToProps)(JobList);