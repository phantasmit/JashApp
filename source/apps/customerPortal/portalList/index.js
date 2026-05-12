import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View, FlatList, Dimensions, Image, ScrollView } from "react-native";
import { ProtalListComponent } from "./protalListComponent";
import { connect } from "react-redux";
import HeaderComponent from "../../../hoc/headerComponent";
import HOCComponent from "../../../hoc/hocComponent";
import colors from "../../../assets/appColor/colors";
import fonts from "../../../assets/fonts/fonts";
import { normalize } from "../../../utils/normalize";
import { drop_down } from "../../../utils/images";
import SearchView from "../../../utils/SearchView";
//
const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);
//
class ProtalList extends ProtalListComponent {
    render() {
        return (
            <HOCComponents title="Customer Portal" isBack={true} onPress={() => { this.props.navigation.goBack() }}>
                <View style={{ flex: 1, alignItems: "flex-start", alignItems: "center", backgroundColor: colors.WHITE }}>
                    <SearchView
                        onChangeText={(text) => {
                            this.setState({
                                searchText: text
                            }, () => {
                                const filtered = this.state.masterProductData.filter(item =>
                                    item.name.toLowerCase().includes(text.toLowerCase())
                                );
                                //
                                this.setState({
                                    productData:filtered
                                })
                                //
                            })
                        }}

                        search={this.state.searchText}
                    ></SearchView>
                    {
                        (this.state.productData.length > 0) ?
                            <FlatList
                                style={{ flex: 1 }}
                                contentContainerStyle={{ paddingBottom: 20 }}
                                data={this.state.productData}
                                renderItem={({ item }) => {
                                    const { id, name } = item;
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.props.navigation.navigate('PortalDetail', { portalId: id })
                                            }}
                                            style={{
                                                width: Dimensions.get('window').width - 20,
                                                marginVertical: 5,
                                                backgroundColor: '#2E9298',
                                                borderRadius: 10,
                                                padding: 10,
                                                shadowColor: '#000000',
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 3
                                                },
                                                shadowRadius: 5,
                                                shadowOpacity: 1.0,
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: 'space-between'
                                            }}>
                                            <Text style={{
                                                fontFamily: fonts.POPPINS_REGULAR,
                                                fontWeight: '400',
                                                width:'90%',
                                                fontSize: normalize(15),
                                                color: colors.WHITE,
                                                flexWrap: "wrap"
                                            }}>{name}</Text>
                                            <Image source={drop_down} style={{ width: 25, height: 25, tintColor: colors.WHITE, transform: [{ rotate: "270deg" }] }} />
                                        </TouchableOpacity>
                                    );
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

export default connect(ProtalListComponent.mapStateToProps, ProtalListComponent.mapDispatchToProps)(ProtalList);