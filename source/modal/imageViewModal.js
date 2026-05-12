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
function ImageViewModal(props) {
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
                        <View style={{ flex: 1, backgroundColor: "red" }}></View>
                    </View>
                </View>
            </View>
        </>
    )
}
//
export default ImageViewModal;