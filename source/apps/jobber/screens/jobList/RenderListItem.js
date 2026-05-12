import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image
} from "react-native";
import fonts from "../../../../assets/fonts/fonts";
import colors from "../../../../assets/appColor/colors";
import { normalize, updateDateFormat } from "../../../../utils/normalize";
import { logo } from "../../../../utils/images";
import { IMAGE_URL } from "../../../../services/api-end-points";
//
const RenderListItem = ({ item, onRowClick }) => {

    const { image, jobber_plan_id, textile_ledger_id, partner_id, state, bom_id, id, issue_qty, invoice_status, start_date, rate, partner_id_lc_method } = item;
    //console.log(JSON.stringify(item));

    const invoicedLabel = ['Waiting Invoices', 'Invoice Received']
    return (
        <TouchableOpacity
            onPress={() => { onRowClick(id) }}
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
                alignItems: "center"
            }}>
            {/* {
                image ?
                    <Image source={{ uri: `data:image/png;base64,${image}` }} style={{ width: 80, height: 80 }} resizeMode="contain" />
                    :
                    <Image source={logo} style={{ width: 80, height: 80 }} resizeMode="contain" />
            } */}
            {/* <Image source={{ uri: `http://113.20.19.105:8069/web/image/textile.ledger/${id}/bom_image_id` }} style={{ width: 80, height: 80 }} resizeMode="contain" />
            <View style={{ marginLeft: 5, flex: 1 }}>
                <Text
                    style={{
                        fontFamily: fonts.POPPINS_REGULAR,
                        fontWeight: '500',
                        fontSize: normalize(12),
                        color: colors.WHITE,
                        flexWrap: "wrap"
                    }}>
                    {jobber_plan_id?.display_name}
                </Text>
                <Text
                    style={{
                        fontFamily: fonts.POPPINS_REGULAR,
                        fontWeight: '500',
                        fontSize: normalize(12),
                        color: colors.WHITE,
                        flexWrap: "wrap"
                    }}>
                    {textile_ledger_id?.display_name}
                </Text>
                <Text
                    style={{
                        fontFamily: fonts.POPPINS_REGULAR,
                        fontWeight: '500',
                        fontSize: normalize(12),
                        color: colors.WHITE,
                        flexWrap: "wrap"
                    }}>
                    {bom_id?.display_name}
                </Text>
                <Text
                    style={{
                        fontFamily: fonts.POPPINS_REGULAR,
                        fontWeight: '500',
                        fontSize: normalize(12),
                        color: colors.WHITE,
                        flexWrap: "wrap"
                    }}>
                    {state?.toUpperCase() + " " + (invoice_status === 'to invoice' ? invoicedLabel[0] : invoicedLabel[1])}
                </Text>
            </View> */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Image source={{ uri: `${IMAGE_URL()}/web/image/textile.ledger/${id}/bom_image_id` }} style={{ aspectRatio: 0.6, width: Dimensions.get('window').width / 3.2 }} resizeMode="contain" />
                <View style={{ flex: 3, marginHorizontal: 8 }}>
                    <Text
                        style={{
                            fontFamily: fonts.POPPINS_REGULAR,
                            fontWeight: '400',
                            fontSize: normalize(15),
                            color: colors.WHITE,
                            flexWrap: "wrap"

                        }}>
                        {`${updateDateFormat(start_date)}    ${jobber_plan_id?.display_name}`}
                    </Text>
                    <Text
                        style={{
                            fontFamily: fonts.POPPINS_REGULAR,
                            fontWeight: '400',
                            fontSize: normalize(15),
                            color: colors.WHITE,
                            flexWrap: "wrap",
                            marginVertical:3

                        }}>
                        {`${textile_ledger_id?.display_name}`}
                    </Text>
                    {/* <Text
                        style={{
                            fontFamily: fonts.POPPINS_REGULAR,
                            fontWeight: '400',
                            fontSize: normalize(15),
                            color: colors.WHITE,
                            flexWrap: "wrap"

                        }}>
                        {`${textile_ledger_id?.display_name}`}
                    </Text> */}
                    <Text
                        style={{
                            fontFamily: fonts.POPPINS_REGULAR,
                            fontWeight: '400',
                            fontSize: normalize(15),
                            color: colors.WHITE,
                            flexWrap: "wrap"

                        }}>
                        {`${bom_id?.display_name}`}
                    </Text>
                    <Text
                        style={{
                            fontFamily: fonts.POPPINS_REGULAR,
                            fontWeight: '400',
                            fontSize: normalize(15),
                            color: colors.WHITE,
                            flexWrap: "wrap",
                            marginVertical:3

                        }}>
                        {`LC Method: ${partner_id_lc_method ? partner_id_lc_method?.toUpperCase() : ''}`}
                    </Text>
                    <Text
                        style={{
                            fontFamily: fonts.POPPINS_REGULAR,
                            fontWeight: '400',
                            fontSize: normalize(15),
                            color: colors.WHITE,
                            flexWrap: "wrap"

                        }}>
                        {`\u20B9 ${parseFloat(rate.toString()).toFixed(2)}   QTY: ${issue_qty} `}
                    </Text>

                    <Text
                        style={{
                            fontFamily: fonts.POPPINS_REGULAR,
                            fontWeight: '400',
                            fontSize: normalize(15),
                            color: colors.WHITE,
                            flexWrap: "wrap",
                            marginVertical:3

                        }}>
                        {state?.toUpperCase() + "  " + (invoice_status === 'to invoice' ? invoicedLabel[0] : invoicedLabel[1])}
                    </Text>

                    {/* <Text
                        style={{
                            fontFamily: fonts.POPPINS_REGULAR,
                            fontWeight: '400',
                            fontSize: normalize(15),
                            color: textColor,
                            flexWrap: "wrap"

                        }}>
                        {`${updateDateFormat(date)}`}
                    </Text>
                    <Text
                        style={{
                            fontFamily: fonts.POPPINS_REGULAR,
                            fontWeight: '400',
                            fontSize: normalize(15),
                            color: textColor,
                            flexWrap: "wrap"

                        }}>
                        {`${plan_id?.display_name}`}
                    </Text>
                    <Text
                        style={{
                            fontFamily: fonts.POPPINS_REGULAR,
                            fontWeight: '400',
                            fontSize: normalize(15),
                            color: textColor,
                            flexWrap: "wrap"

                        }}>
                        {`${job_issue_id?.display_name}`}
                    </Text>
                    <Text
                        style={{
                            fontFamily: fonts.POPPINS_REGULAR,
                            fontWeight: '400',
                            fontSize: normalize(15),
                            color: textColor,
                            flexWrap: "wrap"

                        }}>
                        {`${code}`}
                    </Text>
                    <Text
                        style={{
                            fontFamily: fonts.POPPINS_REGULAR,
                            fontWeight: '400',
                            fontSize: normalize(15),
                            color: textColor,
                            flexWrap: "wrap"

                        }}>
                        {`\u20B9 ${parseFloat(total_amount.toString()).toFixed(2)}  QTY: ${total_received_qty}`}
                    </Text>
                    <Text
                        style={{
                            fontFamily: fonts.POPPINS_REGULAR,
                            fontWeight: '400',
                            fontSize: normalize(15),
                            color: textColor,
                            flexWrap: "wrap"

                        }}>
                        {`${state.toUpperCase()}`}
                    </Text> */}

                </View>
            </View>
        </TouchableOpacity>
    );
};

const areEqual = (prevProps, nextProps) =>
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.state === nextProps.item.state;

export default React.memo(RenderListItem, areEqual);