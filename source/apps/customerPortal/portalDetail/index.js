import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View, FlatList, Dimensions, Image, ScrollView, StyleSheet } from "react-native";
import { PortalDetailComponent } from "./portalDetailComponent";
import { connect } from "react-redux";
import HeaderComponent from "../../../hoc/headerComponent";
import HOCComponent from "../../../hoc/hocComponent";
import colors from "../../../assets/appColor/colors";
import fonts from "../../../assets/fonts/fonts";
import { normalize } from "../../../utils/normalize";
import { document, drop_down, player } from "../../../utils/images";
import { IMAGE_URL } from "../../../services/api-end-points";
import { FILE_TYPE, getFileType } from "../../../utils/utils";


//
const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);
//

const CustomerPortalSelectionView = (props) => {
    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, alignItems: "center", padding: 10 }}>
            <View style={{ padding: 10, borderWidth: 0.5, borderColor: colors.BLACK_SHADE_03, backgroundColor: colors.WHITE, borderRadius: 5, elevation: 5 }}>
                <Text
                    style={{
                        width: Dimensions.get('window').width - 50,
                        fontFamily: fonts.POPPINS_REGULAR,
                        fontWeight: '800',
                        fontSize: normalize(14),
                        color: colors.BLACK_SHADE_02,
                        textAlign: "left",
                        marginBottom: 15
                    }}>
                    {props?.displayName}
                </Text>
                <View style={{ flexDirection: "row", width: '96%', alignItems: "center" }}>
                    <Image source={{ uri: props.imageURL }} style={{ flex: 1, height: 150 }} resizeMode="contain" />
                    <View style={{ flex: 2.5, marginLeft: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", width: '90%' }}>
                            <Text
                                style={{
                                    flex: 1,
                                    fontFamily: fonts.POPPINS_REGULAR,
                                    fontWeight: '500',
                                    fontSize: normalize(12),
                                    color: colors.GRAY_SHADE_LIGHT,
                                    padding: 3
                                }}>

                                {`Top: \n`}
                                <Text
                                    style={{
                                        flexWrap: 'wrap',
                                        textAlign: "left",
                                        fontFamily: fonts.POPPINS_REGULAR,
                                        fontWeight: '800',
                                        fontSize: normalize(14),
                                        color: colors.BLACK_SHADE_03,
                                        padding: 3
                                    }}>
                                    {props.topValue}
                                </Text>
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", width: '90%' }}>
                            <Text
                                style={{
                                    flex: 1,
                                    fontFamily: fonts.POPPINS_REGULAR,
                                    fontWeight: '500',
                                    fontSize: normalize(12),
                                    color: colors.GRAY_SHADE_LIGHT,
                                    padding: 3
                                }}>

                                {`Bottom:\n`}
                                <Text
                                    style={{
                                        flexWrap: 'wrap',
                                        textAlign: "left",
                                        fontFamily: fonts.POPPINS_REGULAR,
                                        fontWeight: '800',
                                        fontSize: normalize(14),
                                        color: colors.BLACK_SHADE_03,
                                        padding: 3
                                    }}>
                                    {props.bottomValue}
                                </Text>
                            </Text>

                        </View>
                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", width: '90%' }}>
                            <Text
                                style={{
                                    flex: 1,
                                    fontFamily: fonts.POPPINS_REGULAR,
                                    fontWeight: '500',
                                    fontSize: normalize(12),
                                    color: colors.GRAY_SHADE_LIGHT,
                                    padding: 3
                                }}>

                                {`Dupatta:\n`}
                                <Text
                                    style={{
                                        flexWrap: 'wrap',
                                        textAlign: "left",
                                        fontFamily: fonts.POPPINS_REGULAR,
                                        fontWeight: '800',
                                        fontSize: normalize(14),
                                        color: colors.BLACK_SHADE_03,
                                        padding: 3
                                    }}>
                                    {props.dupattaValue}
                                </Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, width: '96%', marginTop: 15 }}>
                <AttachmentDataView {...props} />
            </View>
        </ScrollView>
    );
};

const ProductPortalSelectionView = (props) => {
    const productDataKeys = Object.keys(props.productData);
    return (
        <FlatList
            style={{ flex: 1, width: '100%' }}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20, marginTop: 15, alignItems: "center" }}
            data={productDataKeys}
            renderItem={({ item }) => {
                //const { id, image_url, product_id, x_studio_top, x_studio_bottom, x_studio_dupatta } = item;
                console.log(JSON.stringify(props.productData[item].lineData));
                const { id, image_url, product_id, x_studio_top, x_studio_bottom, x_studio_dupatta } = props.productData[item].lineData;
                const attachmentData = props.productData[item].attachmentData
                console.log(JSON.stringify(attachmentData));
                //debugger;
                return (
                    <View style={{ marginBottom: 15, padding: 10, borderWidth: 0.25, borderColor: colors.BLACK_SHADE_03, backgroundColor: colors.WHITE, borderRadius: 5, elevation: 5, }}>
                        <Text
                            style={{
                                fontFamily: fonts.POPPINS_REGULAR,
                                fontWeight: '800',
                                fontSize: normalize(14),
                                color: colors.BLACK_SHADE_02,
                                textAlign: "left",
                                marginBottom: 15
                            }}>
                            {product_id?.display_name}
                        </Text>
                        <View style={{ flexDirection: "row", width: Dimensions.get('window').width - 30, alignItems: "center" }}>

                            <Image source={{ uri: image_url }} style={{ flex: 1, height: 150 }} resizeMode="contain" />
                            {/* <Image source={{ uri: `${IMAGE_URL()}/web/image/customer.portal.line/${id}/image` }} style={{ flex: 1, height: 150 }} resizeMode="contain" /> */}
                            <View style={{ flex: 2.5, marginLeft: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", width: '90%' }}>
                                    <Text
                                        style={{
                                            flex: 1,
                                            fontFamily: fonts.POPPINS_REGULAR,
                                            fontWeight: '500',
                                            fontSize: normalize(12),
                                            color: colors.GRAY_SHADE_LIGHT,
                                            padding: 3
                                        }}>

                                        {`Top: \n`}
                                        <Text
                                            style={{
                                                flexWrap: 'wrap',
                                                textAlign: "left",
                                                fontFamily: fonts.POPPINS_REGULAR,
                                                fontWeight: '800',
                                                fontSize: normalize(14),
                                                color: colors.BLACK_SHADE_03
                                            }}>
                                            {x_studio_top?.display_name}
                                        </Text>
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", width: '90%' }}>
                                    <Text
                                        style={{
                                            flex: 1,
                                            fontFamily: fonts.POPPINS_REGULAR,
                                            fontWeight: '500',
                                            fontSize: normalize(12),
                                            color: colors.GRAY_SHADE_LIGHT,
                                            padding: 3
                                        }}>

                                        {`Bottom:\n`}
                                        <Text
                                            style={{
                                                flexWrap: 'wrap',
                                                textAlign: "left",
                                                fontFamily: fonts.POPPINS_REGULAR,
                                                fontWeight: '800',
                                                fontSize: normalize(14),
                                                color: colors.BLACK_SHADE_03
                                            }}>
                                            {x_studio_bottom?.display_name}
                                        </Text>
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", width: '90%' }}>
                                    <Text
                                        style={{
                                            flex: 1,
                                            fontFamily: fonts.POPPINS_REGULAR,
                                            fontWeight: '500',
                                            fontSize: normalize(12),
                                            color: colors.GRAY_SHADE_LIGHT,
                                            padding: 3
                                        }}>

                                        {`Dupatta:\n`}
                                        <Text
                                            style={{
                                                flexWrap: 'wrap',
                                                textAlign: "left",
                                                fontFamily: fonts.POPPINS_REGULAR,
                                                fontWeight: '800',
                                                fontSize: normalize(14),
                                                color: colors.BLACK_SHADE_03
                                            }}>
                                            {x_studio_dupatta?.display_name}
                                        </Text>
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", marginTop: 10, flexWrap: "wrap" }}>
                            {
                                attachmentData.map((item, index) => {
                                    const { mimetype, id } = item;
                                    return <View style={{ marginRight: 5, marginBottom: 5 }}>
                                        {
                                            (mimetype.toLowerCase().includes('image')) &&
                                            <Image source={{ uri: `${IMAGE_URL()}/web/image/${id}` }}
                                                style={{ width: 100, height: 100 }} resizeMode="contain" />
                                        }
                                    </View>
                                })
                            }
                        </View>
                    </View>
                )
            }} />
    );
};



const AttachmentDataView = (props) => {
    const formatData = (data, numColumns) => {
        const fullRows = Math.floor(data.length / numColumns);
        let lastRowItems = data.length - fullRows * numColumns;

        while (lastRowItems !== 0 && lastRowItems !== numColumns) {
            data.push({ key: `blank-${lastRowItems}`, empty: true });
            lastRowItems++;
        }

        return data;
    };
    return (
        <FlatList
            data={formatData(props.attachmentData, 3)}
            numColumns={3}
            scrollEnabled={false}
            renderItem={({ item }) => {
                const { mimetype, id, filename } = item;
                if (item.empty) {
                    return <View style={[styles.itemContainer, { backgroundColor: 'transparent' }]} />;
                }

                return (
                    <View style={[styles.itemContainer]}>
                        {
                            {
                                "image": <Image source={{ uri: `https://jashsuits.com/web/content/${id}` }} style={{ width: 100, height: 100, }} resizeMode="contain" />,
                                "video": <View style={{ width: 100, height: 100 }}>
                                    <Image source={player} style={{ width: 25, height: 25 }} />
                                    <Text style={{ marginLeft: 5 }}>{filename}</Text>
                                </View>,
                                "document": <View style={{ width: 100, height: 100 }}>
                                    <Image source={document} style={{ width: 25, height: 25 }} />
                                    <Text style={{ marginLeft: 5 }}>{filename}</Text>
                                </View>,
                            }[getFileType(mimetype)]
                        }

                    </View>
                );
            }}
        />
    );
};

class PortalDetail extends PortalDetailComponent {
    render() {
        return (
            <HOCComponents title="Customer Portal Detail" isBack={true} onPress={() => { this.props.navigation.goBack() }}>
                <View style={{ flex: 1, alignItems: "flex-start", alignItems: "center", backgroundColor: colors.WHITE }}>
                    {
                        (this.state.selectedModeType.toLowerCase() == "customer") ?
                            <View style={{
                                width: "100%",
                                padding: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Text
                                    style={{
                                        fontFamily: fonts.POPPINS_REGULAR,
                                        fontWeight: '800',
                                        fontSize: normalize(14),
                                        color: colors.BLACK_SHADE_02,
                                        textAlign: "left"
                                    }}>
                                    Total Customers :
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: fonts.POPPINS_REGULAR,
                                        fontWeight: '800',
                                        fontSize: normalize(14),
                                        color: colors.BLACK_SHADE_02,
                                        textAlign: "right"
                                    }}>
                                    {this.state.totalUser}
                                </Text>
                            </View> :
                            <>
                                <View style={{
                                    width: "100%",
                                    padding: 10,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Text
                                        style={{
                                            fontFamily: fonts.POPPINS_REGULAR,
                                            fontWeight: '800',
                                            fontSize: normalize(14),
                                            color: colors.BLACK_SHADE_02,
                                            textAlign: "left"
                                        }}>
                                        CustomerName :
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: fonts.POPPINS_REGULAR,
                                            fontWeight: '800',
                                            fontSize: normalize(14),
                                            color: colors.BLACK_SHADE_02,
                                            textAlign: "right"
                                        }}>
                                        {this.state.customerName}
                                    </Text>
                                </View>

                                <View style={{
                                    width: "100%",
                                    padding: 10,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Text
                                        style={{
                                            fontFamily: fonts.POPPINS_REGULAR,
                                            fontWeight: '800',
                                            fontSize: normalize(14),
                                            color: colors.BLACK_SHADE_02,
                                            textAlign: "left"
                                        }}>
                                        Total Product :
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: fonts.POPPINS_REGULAR,
                                            fontWeight: '800',
                                            fontSize: normalize(14),
                                            color: colors.BLACK_SHADE_02,
                                            textAlign: "right"
                                        }}>
                                        {Object.keys(this.state.productData).length}
                                    </Text>
                                </View>
                            </>
                    }
                    {
                        !this.state.isLoading &&
                        {
                            "product": <ProductPortalSelectionView {...this.state} />,
                            "customer": <CustomerPortalSelectionView {...this.state} />
                        }[this.state.selectedModeType.toLowerCase()]
                    }
                    {/* <View style={{ flex: 1, width: Dimensions.get('window').width - 40, marginTop: 15 }}>
                        <AttachmentDataView {...this.state} />
                    </View> */}
                    {
                        this.state.isLoading &&
                        <View style={{ width: "100%", height: '100%', position: 'absolute', backgroundColor: "#00000089", alignItems: "center", justifyContent: "center" }}>
                            <ActivityIndicator size="large" color={colors.WHITE} />
                        </View>
                    }
                </View>

                {
                    (!this.state.isLoading && this.state.isActive) &&
                    <TouchableOpacity
                        onPress={() => {
                            if (!this.state.isSending) {
                                this.setState({
                                    isSending: true,
                                    //isActive:false
                                }, () => {
                                    this.storeDateTime()
                                    //this.sendMessage()
                                })
                            }
                        }}
                        activeOpacity={this.state.isSending ? 1 : 0}
                        style={{
                            position: "absolute", bottom: 0, marginBottom: 20,
                            width: '90%', alignSelf: "center", paddingVertical: 10, backgroundColor: this.state.isSending ? colors.GRAY_SHADE : colors.APP_BG_COLOR, borderRadius: 10, marginTop: 10, alignItems: "center", justifyContent: "center"
                        }}>
                        <Text
                            style={{
                                fontFamily: fonts.POPPINS_REGULAR,
                                fontWeight: '500',
                                fontSize: normalize(14),
                                color: colors.WHITE,
                                textAlign: "center"
                            }}>
                            {`Send Message To WhatsApp`}
                        </Text>
                    </TouchableOpacity>
                }
            </HOCComponents >
        )
    }
}


const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,              // equal width
        margin: 5,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
    },
});


export default connect(PortalDetailComponent.mapStateToProps, PortalDetailComponent.mapDispatchToProps)(PortalDetail);