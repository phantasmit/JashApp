import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View, FlatList, Dimensions, Image, ScrollView } from "react-native";
import { ProductDataDetailComponent } from "./productDataDetailComponent";
import { connect } from "react-redux";
import HeaderComponent from "../../../hoc/headerComponent";
import HOCComponent from "../../../hoc/hocComponent";
import colors from "../../../assets/appColor/colors";
import { IMAGE_URL } from "../../../services/api-end-points";
import fonts from "../../../assets/fonts/fonts";
import { normalize } from "../../../utils/normalize";
import { download, drop_down, player } from "../../../utils/images";
import { PermissionsAndroid } from 'react-native';
import { processDownloadShareCleanup, shareAsCollage } from "../../../utils/processDownloadShareCleanup";
//
const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);
//
class ProductDataDetail extends ProductDataDetailComponent {
    render() {
        const { id = -1 } = this.state.productData;
        return (
            <HOCComponents title="Products" isBack={true} onPress={() => { this.props.navigation.goBack() }}>
                <View style={{ flex: 1, alignItems: "flex-start", alignItems: "center", backgroundColor: colors.WHITE }}>
                    {/* <Image source={{ uri: `${IMAGE_URL()}/web/image/product.template/${id}/image_1024` }}
                        style={{ width: 320, height: 320 }} resizeMode="contain" /> */}
                    {
                        this.state.isLoading ?
                            <View style={{ width: "100%", height: '100%', position: 'absolute', backgroundColor: "#00000089", alignItems: "center", justifyContent: "center" }}>
                                <ActivityIndicator size="large" color={colors.WHITE} />
                            </View>
                            :
                            <>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            isProductInfo: !this.state.isProductInfo
                                        })
                                    }}
                                    style={{ flexDirection: "row", backgroundColor: colors.GRAY_SHADE_01, padding: 10, justifyContent: "space-between", width: '95%', marginVertical: 10 }}>
                                    <Text
                                        style={{
                                            fontFamily: fonts.POPPINS_REGULAR,
                                            fontWeight: '800',
                                            fontSize: normalize(16),
                                            color: colors.BLACK_SHADE_03,
                                        }}>

                                        {`Product Info`}
                                    </Text>
                                    <Image source={drop_down} style={{ width: 25, height: 25, transform: [{ rotate: this.state.isProductInfo ? "0deg" : "180deg" }], }} />
                                </TouchableOpacity>
                                {
                                    (!this.state.isLoading && this.state.isProductInfo) &&
                                    this.state.productInfoData.map((item, index) => {
                                        return (
                                            <View style={{ flexDirection: 'row', borderTopWidth: (index === 0) ? 1 : 0, borderLeftWidth: 1, borderRightWidth: 1, borderBottomWidth: 1, borderColor: colors.BLACK_SHADE_03, alignItems: "center", justifyContent: "center", width: '90%' }}>
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
                                                <View style={{ width: 1, height: "100%", backgroundColor: colors.BLACK_SHADE_03 }} />
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
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            isAttchment: !this.state.isAttchment
                                        })
                                    }}
                                    style={{ flexDirection: "row", backgroundColor: colors.GRAY_SHADE_01, padding: 10, justifyContent: "space-between", width: '95%' }}>
                                    <Text
                                        style={{
                                            fontFamily: fonts.POPPINS_REGULAR,
                                            fontWeight: '800',
                                            fontSize: normalize(16),
                                            color: colors.BLACK_SHADE_03,
                                        }}>

                                        {`Attachment Data`}
                                    </Text>
                                    <Image source={drop_down} style={{ width: 25, height: 25, transform: [{ rotate: this.state.isAttchment ? "0deg" : "180deg" }], }} />
                                </TouchableOpacity>
                                {
                                    (!this.state.isLoading && this.state.isAttchment && (this.state.attachmentData.length > 0)) &&
                                    <View style={{ flex: 1, width: '100%', marginBottom: 10 }}>
                                        <FlatList
                                            data={this.state.attachmentData}
                                            renderItem={({ item, index }) => {

                                                const { mimetype = "", id, filename = "", checksum = "" } = item;
                                                //console.log(`${IMAGE_URL()}/web/content/${id}?filename=${filename}&unique=${checksum}&download=true`);
                                                //                         const isLastItem = index === data.length - 1;
                                                // const isOdd = data.length % NUM_COLUMNS !== 0;
                                                //console.log(`=== ${IMAGE_URL()}/web/image/${id}`);

                                                return (
                                                    <View style={{
                                                        width: "48%",
                                                        backgroundColor: '#ddd',
                                                        padding: 10,
                                                        borderRadius: 10,
                                                        marginBottom: 10,
                                                        //flex: 1,
                                                        alignItems: 'center',
                                                        marginHorizontal: 5,
                                                    }}>
                                                        {
                                                            (mimetype.toLowerCase().includes('image')) ?
                                                                <Image source={{ uri: `${IMAGE_URL()}/web/image/${id}` }}
                                                                    style={{ width: '100%', height: 160 }} resizeMode="contain" />
                                                                : (mimetype.toLowerCase().includes('video')) ?
                                                                    <TouchableOpacity onPress={() => {
                                                                        // PermissionsAndroid.request(
                                                                        //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                                                                        // ).then(() => {
                                                                        //     alert('test Download video from here')
                                                                        //     console.log(`${IMAGE_URL()}/web/content/${id}?filename=${filename}&unique=${checksum}&download=true`);
                                                                        // });

                                                                        // PermissionsAndroid.requestMultiple([
                                                                        //     PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                                                                        //     PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
                                                                        // ]).then(async () => {
                                                                        //     await processDownloadShareCleanup(this.state.downloadsData);
                                                                        // });
                                                                        // try {
                                                                        //     PermissionsAndroid.request(
                                                                        //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                                                                        //     ).then(async () => {
                                                                        //         const message = `Sunhera-01\n\nTop: Jaam Sartin-2.50*\nBottom: Rayon-2.50*\nDupatta: Gajji Silk Digital\n\n\u20B9605.00`;
                                                                        //         await shareAsCollage(this.state.downloadsData, message);
                                                                        //     });
                                                                        //     // return granted === PermissionsAndroid.RESULTS.GRANTED;
                                                                        // } catch (err) {
                                                                        //     // console.warn(err);
                                                                        //     // return false;
                                                                        // }

                                                                        // const items = [
                                                                        //     { url: "https://example.com/image1.jpg" },
                                                                        //     { url: "https://example.com/video1.mp4" },
                                                                        //     { url: "https://example.com/image2.png" },
                                                                        // ];



                                                                    }}>
                                                                        <View style={{ flexDirection: "row", width: "90%" }}>
                                                                            <Image source={player} style={{ width: 25, height: 25 }} />
                                                                            <View>
                                                                                <Text style={{ marginLeft: 5 }}>{filename}</Text>
                                                                                <Image source={download} style={{ width: 25, height: 25, alignSelf: "flex-end" }} />
                                                                            </View>
                                                                        </View>
                                                                    </TouchableOpacity>

                                                                    :
                                                                    null
                                                        }

                                                    </View>
                                                )
                                            }}
                                            numColumns={2}
                                            style={{ width: "95%" }}
                                            contentContainerStyle={{ padding: 10, width: '100%' }}
                                            showsVerticalScrollIndicator={false}
                                        />
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.sendMessage(this.whatsAppMessage)
                                            }}
                                            style={{ width: '90%', alignSelf: "center", height: 65, backgroundColor: colors.APP_BG_COLOR, borderRadius: 10, marginTop: 10, alignItems: "center", justifyContent: "center" }}>
                                            <Text
                                                style={{
                                                    fontFamily: fonts.POPPINS_REGULAR,
                                                    fontWeight: '500',
                                                    fontSize: normalize(18),
                                                    color: colors.WHITE,
                                                    marginLeft: 15
                                                }}>
                                                {`Send Message To WhatsApp`}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </>
                    }

                </View>
            </HOCComponents>
        )
    }
}

export default connect(ProductDataDetailComponent.mapStateToProps, ProductDataDetailComponent.mapDispatchToProps)(ProductDataDetail);