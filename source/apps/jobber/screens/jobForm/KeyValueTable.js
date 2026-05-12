import React from "react";
import { View, Text } from "react-native";
import colors from "../../../../assets/appColor/colors";
import fonts from "../../../../assets/fonts/fonts";
import { formatValue } from "../../utils/utils";
import { normalize, updateDateFormat } from "../../../../utils/normalize";
//
export default function KeyValueTable({ data, keyMapping }) {
    const keysInOrder = Object.keys(keyMapping);
    return (
        <View style={{ borderWidth: 0.5, width: '100%', borderColor: colors.BLACK_SHADE_03 }}>
            {
                keysInOrder.map((key, index) => {
                    if (!(key in data)) return null; // skip if not in data
                    //const [key, value] = item;
                    const value = data[key];
                    return (
                        <View key={index + key.toString()} style={{ flexDirection: 'row', borderTopWidth: (index == 0) ? 0 : 0.5, borderTopColor: colors.BLACK_SHADE_03, alignItems: "center", justifyContent: "center" }}>
                            <Text
                                style={{
                                    flex: 1,
                                    fontFamily: fonts.POPPINS_REGULAR,
                                    fontWeight: '500',
                                    fontSize: normalize(14),
                                    color: colors.GRAY_SHADE_LIGHT,
                                    padding: 3
                                }}>

                                {`${keyMapping[key]} :`}
                            </Text>
                            <View style={{ width: 0.5, height: "100%", backgroundColor: colors.BLACK_SHADE_03 }} />
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
                                {
                                    (key == 'date') ? updateDateFormat(formatValue(value)) : (key == 'start_date' || key == 'done_date') ? updateDateFormat(formatValue(value), true) : formatValue(value)
                                }
                            </Text>
                        </View>

                    )
                })
            }
        </View>
    )
}