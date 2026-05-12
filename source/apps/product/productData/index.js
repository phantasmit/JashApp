import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View, FlatList, Dimensions, Image, ScrollView } from "react-native";
import { ProductDataComponent } from "./productDataComponent";
import { connect } from "react-redux";
import HeaderComponent from "../../../hoc/headerComponent";
import HOCComponent from "../../../hoc/hocComponent";
import colors from "../../../assets/appColor/colors";
import RenderListItem from "./RenderListItem";
import fonts from "../../../assets/fonts/fonts";
import { normalize } from "../../../utils/normalize";
//
const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);
//
class ProductData extends ProductDataComponent {
    render() {
        return (
            <HOCComponents title="Products" isBack={true} onPress={() => { this.props.navigation.goBack() }}>
                <View style={{ flex: 1, alignItems: "flex-start", alignItems: "center", backgroundColor: colors.WHITE }}>
                    {
                        (this.state.productData.length > 0) ?
                            <FlatList
                                style={{ flex: 1 }}
                                contentContainerStyle={{ paddingBottom: 20 }}
                                data={this.state.productData}
                                renderItem={({ item }) => {
                                    return <RenderListItem
                                        item={item}
                                        onRowClick={(id) => {
                                            this.props.navigation.navigate('ProductDataDetail', { 'id': id })
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

export default connect(ProductDataComponent.mapStateToProps, ProductDataComponent.mapDispatchToProps)(ProductData);