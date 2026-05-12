import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View, FlatList, Dimensions, Image, ScrollView } from "react-native";
import { ProductListComponent } from "./productListComponent";
import { connect } from "react-redux";
import HeaderComponent from "../../../hoc/headerComponent";
import HOCComponent from "../../../hoc/hocComponent";
import fonts from "../../../assets/fonts/fonts";
import colors from "../../../assets/appColor/colors";
import { normalize } from "../../../utils/normalize";
import SearchComponent from "../../../component/SearchComponent";
import ProdcutItem from "./prodcutItem";
import { containsDisplayNameWith, groupByInvoice, groupByPartnerId, groupByState } from "../../jobber/utils/utils";
import { drop_down } from "../../../utils/images";
//
const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);
//
class ProductList extends ProductListComponent {
    render() {
        return (
            <HOCComponents title="FG Receive" isBack={true} onPress={() => { this.props.navigation.goBack() }}>
                <View style={{ flex: 1, alignItems: "flex-start", alignItems: "center", backgroundColor: colors.WHITE }}>
                    <SearchComponent
                        onChangeText={(text) => {
                            //
                            const filteredData = this.state.masterQCData.filter(item =>
                                item.name?.toLowerCase().includes(text.toLowerCase()) ||
                                containsDisplayNameWith(item, text));
                            //
                            this.setState({
                                searchText: text,
                                qcData: filteredData,
                                filterData: [],
                                isFilter: false
                            })
                        }}
                        isFilter={this.state.isFilter}
                        onFilterPress={() => {
                            this.props.navigation.navigate('FilterOption', {
                                filterData: ["Group By State"],
                                onApplyFilter: (props, item) => {
                                    //
                                    let grouped = {};
                                    //
                                    if (props == 0) {
                                        grouped = groupByState(this.state.masterQCData);
                                        this.setState({
                                            searchText: item,
                                            filterData: grouped,
                                            qcData: [],
                                            isFilter: true
                                        })
                                    } else if (props == -2) {
                                        this.setState({
                                            searchText: '',
                                            qcData: this.state.masterQCData,
                                            filterData: [],
                                            c: false,
                                        })
                                    } else {

                                        grouped = groupByInvoice(this.state.masterQCData);

                                        this.setState({
                                            searchText: item,
                                            filterData: grouped,
                                            qcData: [],
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
                        // <ScrollView>
                        <FlatList
                            scrollEnabled={true}
                            style={{ flex: 1, marginTop: 10 }}
                            key={this.state.selectdIndex}
                            extraData={this.state.selectdIndex}
                            data={Object.entries(this.state.filterData)}
                            contentContainerStyle={{ flexGrow: 1 }}
                            renderItem={({ items, index }) => {
                                const [key, value] = Object.entries(this.state.filterData)[index]
                                return (
                                    <View style={{ marginBottom: 10 }}>
                                        {/* <View style={{ width: "90%", flexDirection: 'row', justifyContent: "space-between", paddingVertical: 10 }}>
                                            <Text
                                                style={{

                                                    fontFamily: fonts.POPPINS_REGULAR,
                                                    fontWeight: '500',
                                                    fontSize: normalize(16),
                                                    color: colors.BLACK_SHADE_03
                                                }}>
                                                {`${key.toUpperCase()} (${value.length})`}
                                            </Text>
                                        </View> */}
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (this.state.selectdIndex === index) {
                                                    this.setState({
                                                        selectdIndex: -1
                                                    })
                                                } else {
                                                    this.setState({
                                                        selectdIndex: index
                                                    })
                                                }

                                            }}
                                            style={{ flexDirection: "row", backgroundColor: colors.GRAY_SHADE_01, padding: 10, justifyContent: "space-between", width: '100%' }}>
                                            <Text
                                                style={{
                                                    fontFamily: fonts.POPPINS_REGULAR,
                                                    fontWeight: '800',
                                                    fontSize: normalize(16),
                                                    color: colors.BLACK_SHADE_03,
                                                }}>

                                                {`${key.toUpperCase()} (${value.length})`}
                                            </Text>
                                            <Image source={drop_down} style={{ width: 25, height: 25, transform: [{ rotate: (this.state.selectdIndex === index) ? "0deg" : "180deg" }], }} />
                                        </TouchableOpacity>
                                        {
                                            (this.state.selectdIndex === index) &&
                                            <FlatList
                                                scrollEnabled={false}
                                                //style={{ flex: 1 }}
                                                contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
                                                data={value}
                                                renderItem={({ item }) => {
                                                    return <ProdcutItem
                                                        item={item}
                                                        onRowClick={(data) => {
                                                            this.props.navigation.navigate('ProductDetail', { data })
                                                        }}
                                                    />;
                                                }} />
                                        }
                                    </View>
                                )
                            }} />

                        // </ScrollView>
                    }
                    {
                        (this.state.qcData.length > 0) ?
                            <FlatList
                                style={{ flex: 1 }}
                                contentContainerStyle={{ paddingBottom: 20 }}
                                data={this.state.qcData}
                                renderItem={({ item }) => {
                                    return <ProdcutItem
                                        item={item}
                                        onRowClick={(data) => {
                                            //alert('test')
                                            this.props.navigation.navigate('ProductDetail', { data })
                                        }}
                                    />;
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
                    {/* <TouchableOpacity
                        onPress={() => {
                                this.getQCProductData()
                        }}
                        style={{ flexDirection: "row", backgroundColor: colors.GRAY_SHADE_01, padding: 10, justifyContent: "space-between", width: '100%' }}>
                        <Text
                            style={{
                                fontFamily: fonts.POPPINS_REGULAR,
                                fontWeight: '800',
                                fontSize: normalize(16),
                                color: colors.BLACK_SHADE_03,
                            }}>

                            {`NEXT`}
                        </Text>
                    </TouchableOpacity> */}
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

export default connect(ProductListComponent.mapStateToProps, ProductListComponent.mapDispatchToProps)(ProductList);