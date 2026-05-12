//
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Text, Dimensions, Linking, Pressable, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import colors from '../assets/appColor/colors';
import fonts from '../assets/fonts/fonts';
import { check_radio, close, uncheck_radio } from '../utils/images';
import ButtonLoader from '../component/ButtonLoader';
import { normalize } from '../utils/normalize';
//
function FilterOption(props) {
    //
    const [isSelect, setSelect] = useState(-1);
    const [optionName, setOptionName] = useState('');
    //
    const navigation = useNavigation();
    const dispatch = useDispatch();
    //
    useEffect(() => {

    }, []);
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
                        {
                            //["Group By Jobber", "Group By State", "Group By Invoices"]
                            props.route.params.filterData.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSelect(index)
                                            setOptionName(item)
                                        }}
                                        style={{ flexDirection: "row", width: "90%", margin: 5 }}>
                                        <Image source={(isSelect == index) ? check_radio : uncheck_radio} tintColor={colors.GRAY_SHADE} style={{ width: 25, height: 25, marginRight: 5 }} />
                                        <Text
                                            style={{
                                                fontFamily: fonts.POPPINS_REGULAR,
                                                fontWeight: '500',
                                                textAlign: "left",
                                                width: "100%",
                                                fontSize: normalize(15),
                                                color: colors.BLACK_SHADE_03,
                                            }}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                        <View style={{ flexDirection: "row", width: "90%", justifyContent: "space-between" }}>
                            <ButtonLoader
                                onPress={() => {
                                    props.route.params.onApplyFilter(-2, '')
                                    navigation.goBack()
                                }}
                                loaderStyle={{ width: '45%', backgroundColor: colors.GRAY_SHADE_01, borderRadius: 10 }}
                                style={{ width: '45%', backgroundColor: colors.GRAY_SHADE_01, borderRadius: 10 }}
                                textStyle={{ color: colors.BLACK_SHADE_03 }}
                                title="Clear Filter"
                                isLoading={false}
                            />
                            <ButtonLoader
                                onPress={() => {
                                    props.route.params.onApplyFilter(isSelect, optionName)
                                    navigation.goBack()
                                }}
                                loaderStyle={{ width: '45%', backgroundColor: colors.APP_BG_COLOR, borderRadius: 10 }}
                                style={{ width: '45%', backgroundColor: colors.APP_BG_COLOR, borderRadius: 10 }}
                                title="Apply"
                                isLoading={false}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}
//
export default FilterOption;