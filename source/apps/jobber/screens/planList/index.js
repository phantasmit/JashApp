import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View, FlatList, Dimensions, Image, ScrollView } from "react-native";
import { PlanListComponent } from "./planListComponent";
import { connect } from "react-redux";
import HeaderComponent from "../../../../hoc/headerComponent";
import HOCComponent from "../../../../hoc/hocComponent";
import colors from "../../../../assets/appColor/colors";
import fonts from "../../../../assets/fonts/fonts";
import { normalize } from "../../../../utils/normalize";
import SearchComponent from "../../../../component/SearchComponent";
import { containsDisplayNameWith, groupByPartnerId, groupByState } from "../../utils/utils";
import JobListItem from "./JobListItem";
//
const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);
//
class PlanList extends PlanListComponent {
    render() {
        return (
            <HOCComponents title="Job List" isBack={true} onPress={() => { this.props.navigation.goBack() }}>
                <View style={{ flex: 1, alignItems: "flex-start", alignItems: "center", backgroundColor: colors.WHITE }}>
                    <SearchComponent
                        onChangeText={(text) => {
                            //
                            const filteredData = this.state.masterPlanData.filter(item =>
                                item.name?.toLowerCase().includes(text.toLowerCase()) ||
                                item.fg_issue_qty?.toString().includes(text) ||
                                containsDisplayNameWith(item, text));
                            //
                            this.setState({
                                searchText: text,
                                planData: filteredData,
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
                                            planData: [],
                                            isFilter: true
                                        })
                                    } else if (props == -2) {
                                        this.setState({
                                            searchText: '',
                                            planData: this.state.masterPlanData,
                                            filterData: [],
                                            isFilter: false,
                                        })
                                    } else {
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
                                                return <JobListItem item={item} onRowClick={(data) => {
                                                    // console.log('JSON.stringify(data) '+JSON.stringify(data));
                                                    // debugger;
                                                    this.props.navigation.navigate('JobFrom', data)
                                                    //this.props.navigation.navigate('JobFrom', data)
                                                }} />;
                                            }} />
                                    </>
                                )
                            })}
                        </ScrollView>

                    }
                    {
                        (this.state.planData.length > 0) ?
                            <FlatList
                                style={{ flex: 1 }}
                                contentContainerStyle={{ paddingBottom: 20 }}
                                data={this.state.planData}
                                renderItem={({ item }) => {
                                    return <JobListItem item={item} onRowClick={(data) => {
                                        // console.log('JSON.stringify(data) '+JSON.stringify(data));
                                        // debugger;
                                        this.props.navigation.navigate('JobFrom', data)
                                    }} />;
                                }} />
                            :
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

export default connect(PlanListComponent.mapStateToProps, PlanListComponent.mapDispatchToProps)(PlanList);