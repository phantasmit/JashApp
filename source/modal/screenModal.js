//
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Text, Dimensions, Linking, Pressable, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import colors from '../assets/appColor/colors';
import fonts from '../assets/fonts/fonts';
import { check_radio, close, drop_down, uncheck_radio } from '../utils/images';
import ButtonLoader from '../component/ButtonLoader';
import { normalize } from '../utils/normalize';
import { ScreenOptions } from '../utils/utils';
//
function ScreenModal(props) {
    //
    const navigation = useNavigation();
    const dispatch = useDispatch();
    //
    useEffect(() => {

    }, []);
    //
    const screenData = [
        {
            "screenOption": ScreenOptions.JOBBER,
            'title': 'Jobber',
            'screen': 'jobber'
        },
        {
            "screenOption": ScreenOptions.QC_CHECK,
            'title': 'QC Check',
            'screen': 'qc_check'
        }
    ]
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
                    <View style={{ width: '100%', alignItems: 'center', paddingBottom: 10, }}>
                        <Text
                            style={{
                                fontFamily: fonts.POPPINS_REGULAR,
                                fontWeight: '800',
                                textAlign: "center",
                                width: "100%",
                                fontSize: normalize(18),
                                color: colors.BLACK_SHADE_03,
                            }}>
                            {`Scan Option`}
                        </Text>
                        {
                            screenData.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={
                                            () => {
                                                navigation.goBack()
                                                navigation.navigate('Scan', { "screenOption": item?.screenOption })
                                            }
                                        }
                                        style={{ width: "100%", padding: 10, marginTop: 5, borderBottomWidth: 0.65, borderBottomColor: colors.GRAY_SHADE }}>
                                        <View style={{ flexDirection: "row", alignItems: "center", width: "90%", margin: 5 }}>
                                            <Text
                                                style={{
                                                    fontFamily: fonts.POPPINS_REGULAR,
                                                    fontWeight: '500',
                                                    textAlign: "left",
                                                    width: "100%",
                                                    fontSize: normalize(15),
                                                    color: colors.BLACK_SHADE_03,
                                                }}>
                                                {item?.title}
                                            </Text>
                                            <Image source={drop_down} style={{ width: 25, height: 25, transform: [{ rotate: '270deg' }] }} />
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }

                    </View>
                </View>
            </View>
        </>
    )
}
//
export default ScreenModal;