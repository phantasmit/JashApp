//
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Text, ScrollView, Dimensions, Linking, Pressable, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import colors from '../assets/appColor/colors';
import fonts from '../assets/fonts/fonts';
import { close } from '../utils/images';
import { normalize } from '../utils/normalize';
//
function ColorLineModal(props) {
    //
    const navigation = useNavigation();
    const dispatch = useDispatch();
    //
    useEffect(() => {
    }, []);
    //
    return (
        <>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'transparent' }]} onPress={() => { navigation.goBack() }} />
                <View style={[
                    { backgroundColor: colors.WHITE, width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: "center", justifyContent: "center", paddingVertical: 20 },

                ]}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ top: -35, position: 'absolute' }}>
                        <Image source={close} resizeMode="contain" style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                    <View style={{ width: '100%', alignItems: 'center', padding: 10, }}>
                        <View style={{ width: '100%' }}>
                            <Text
                                style={{
                                    textAlign: "left",
                                    fontFamily: fonts.POPPINS_REGULAR,
                                    fontWeight: '500',
                                    fontSize: normalize(16),
                                    color: colors.BLACK_SHADE_03
                                }}>
                                {`Color Index Report`}
                            </Text>
                            <View style={{ width: '100%', flexDirection: "row", borderBottomWidth: 1, borderBottomColor: colors.BLACK_SHADE_03 }}>
                                <Text
                                    style={{
                                        flex: 1,
                                        textAlign: "center",
                                        fontFamily: fonts.POPPINS_REGULAR,
                                        fontWeight: '500',
                                        fontSize: normalize(14),
                                        color: colors.BLACK_SHADE_03
                                    }}>
                                    {`Id`}
                                </Text>
                                <Text
                                    style={{
                                        flex: 3,
                                        textAlign: "center",
                                        fontFamily: fonts.POPPINS_REGULAR,
                                        fontWeight: '500',
                                        fontSize: normalize(14),
                                        color: colors.BLACK_SHADE_03
                                    }}>
                                    {`Process`}
                                </Text>
                                <Text
                                    style={{
                                        flex: 1.5,
                                        textAlign: "center",
                                        fontFamily: fonts.POPPINS_REGULAR,
                                        fontWeight: '500',
                                        fontSize: normalize(14),
                                        color: colors.BLACK_SHADE_03
                                    }}>
                                    {`Color Tag`}
                                </Text>
                            </View>
                            {
                                props.route.params.colorIndexData.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                props.route.params.onPress(item?.id)
                                                navigation.goBack()
                                            }}
                                            style={{ width: '100%', marginTop: 5, paddingVertical: 15, flexDirection: "row" }}>
                                            <Text
                                                style={{
                                                    flex: 1,
                                                    textAlign: "center",
                                                    fontFamily: fonts.POPPINS_REGULAR,
                                                    fontWeight: '500',
                                                    fontSize: normalize(12),
                                                    color: colors.BLACK_SHADE_03
                                                }}>
                                                {item?.id}
                                            </Text>
                                            <Text
                                                style={{
                                                    flex: 3,
                                                    textAlign: "center",
                                                    fontFamily: fonts.POPPINS_REGULAR,
                                                    fontWeight: '500',
                                                    fontSize: normalize(12),
                                                    color: colors.BLACK_SHADE_03
                                                }}>
                                                {item?.bom_id[1]}
                                            </Text>
                                            <Text
                                                style={{
                                                    flex: 1.5,
                                                    textAlign: "center",
                                                    fontFamily: fonts.POPPINS_REGULAR,
                                                    fontWeight: '500',
                                                    fontSize: normalize(12),
                                                    color: colors.BLACK_SHADE_03
                                                }}>
                                                {item?.color_tag_id[1]}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}
//
export default ColorLineModal;