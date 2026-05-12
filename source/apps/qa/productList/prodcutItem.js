import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image
} from "react-native";
import colors from "../../../assets/appColor/colors";
import fonts from "../../../assets/fonts/fonts";
import { normalize, updateDateFormat } from "../../../utils/normalize";
import { IMAGE_URL } from "../../../services/api-end-points";
//
const ProdcutItem = ({ item, onRowClick }) => {
    const { id, date, code, jobber_id, job_issue_id, plan_id, next_mrp_bom_process_id, next_job_issue_id, state, total_amount, total_received_qty, current_process_id } = item;
    const textColor = (state?.toLowerCase() === "done") ? colors.LIGHT_GRAY : colors.WHITE

    return (
        <TouchableOpacity
            activeOpacity={(state.toLowerCase() === "done") ? 1 : 0}
            onPress={() => { onRowClick(item) }}
            style={{
                width: Dimensions.get('window').width - 20,
                marginVertical: 5,
                backgroundColor: (state?.toLowerCase() === "done") ? '#2E929845' : '#2E9298',
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
                alignSelf: "center"
            }}>
            <View style={{ marginLeft: 5, flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Image source={{ uri: `${IMAGE_URL()}/web/image/order.receive/${id}/image_id` }} style={{ aspectRatio: 0.6, width: Dimensions.get('window').width / 3.2 }} resizeMode="contain" />
                    <View style={{ flex: 3, marginHorizontal: 8 }}>
                        <Text
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
                            {`${current_process_id?.display_name?.match(/(?<=\[).*?(?=\])/g)}`}
                        </Text>
                        <Text
                            style={{
                                fontFamily: fonts.POPPINS_REGULAR,
                                fontWeight: '400',
                                fontSize: normalize(15),
                                color: textColor,
                                flexWrap: "wrap"

                            }}>
                            {`QTY: ${total_received_qty}`}
                        </Text>
                        {/* {`\\** \u20B9 ${parseFloat(total_amount?.toString()).toFixed(2)}  `} */}
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
                            {`${next_mrp_bom_process_id?.display_name}`}
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
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const areEqual = (prevProps, nextProps) =>
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.state === nextProps.item.state;

export default React.memo(ProdcutItem, areEqual);