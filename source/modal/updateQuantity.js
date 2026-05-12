//
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Text, Pressable, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import colors from '../assets/appColor/colors';
import fonts from '../assets/fonts/fonts';
import { close } from '../utils/images';
import ButtonLoader from '../component/ButtonLoader';
import OutLinedTextInput from '../component/OutLinedTextInput';
import { Formik, FieldArray } from 'formik';
import * as Yup from "yup";
import { normalize } from '../utils/normalize';
import { jobberActionFunction } from '../apps/jobber/utils/jobberActionFunction';

//
function UpdateQuantity(props) {
    //
    const { updateQty, callUpdateQtyAPI } = jobberActionFunction();
    const lineData = props.route.params.lineId;
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
                        <Formik
                            initialValues={{
                                lineProducts: lineData.map((item) => ({
                                    quantity: item.production_qty?.toString() || "0", // default input value
                                    final_piece_qty: item.final_piece_qty || 0,
                                    id: item.id
                                })), isLoading: false
                            }}
                            validationSchema={Yup.object().shape({
                                lineProducts: Yup.array().of(
                                    Yup.object().shape({
                                        quantity: Yup.number()
                                            .transform((value, originalValue) => {
                                                const parsed = parseInt(originalValue, 10);
                                                return isNaN(parsed) ? NaN : parsed;
                                            })
                                            .typeError('Quantity must be a number')
                                            .required('Quantity is required')
                                            .min(-1, 'Quantity must be greater than 0')
                                            .max(
                                                Yup.ref("final_piece_qty"),
                                                ({ max }) => `Quantity cannot exceed ${max}`
                                            ),
                                        final_piece_qty: Yup.number().required(),
                                        //.max(final_piece_qty, `Quantity cannot exceed ${final_piece_qty}`)
                                    }))
                            })}
                            validateOnChange={true}
                            validateOnBlur={true}
                            onSubmit={async (values, { setErrors, setSubmitting, setFieldValue }) => {
                                setFieldValue('isLoading', true);
                                const jobColorIndexLineData = []
                                for (let i = 0; i < values?.lineProducts.length; i++) {
                                    const { quantity, id } = values?.lineProducts[i];
                                    jobColorIndexLineData.push([1, id, { "production_qty": parseInt(quantity) }])
                                }
                                // console.log(JSON.stringify(jobColorIndexLineData));
                                // debugger;
                                //[[1, selectedLineId, { "production_qty": qty }]]
                                //
                                // updateQty({
                                //     formId: props.route.params.formId,
                                //     lineId: props.route.params.lineId[0],
                                //     qty: parseInt(values.quantity)
                                // }, new Promise()
                                //     .then(data => {
                                //         console.log(JSON.stringify(data));
                                //         debugger;
                                //     })
                                //     .catch(error => {
                                //         console.log(JSON.stringify(error));
                                //         debugger;
                                //     })
                                // )
                                try {
                                    const response = await updateQty({
                                        formId: props.route.params.formId,
                                        selectedLineId: props.route.params.selectedLineId,
                                        lineId: props.route.params.lineId,
                                        qty: parseInt(values.quantity),
                                        jobColorIndexLineDataArray: jobColorIndexLineData
                                    },
                                        callUpdateQtyAPI
                                    );
                                    setFieldValue('isLoading', false);
                                    navigation.goBack()
                                    console.log('Update response:', response);
                                } catch (error) {
                                    setFieldValue('isLoading', false);
                                    console.error('Update failed:', error);
                                }
                                //
                            }}>
                            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors }) => (
                                <>
                                    <ScrollView
                                        style={{
                                            height: Dimensions.get('window').width / 1.2, width: '100%'
                                        }}
                                        contentContainerStyle={{ alignItems: "center" }}
                                    >
                                        <FieldArray name="lineProducts">
                                            {() => (
                                                <>
                                                    {
                                                        lineData.map((item, index) => {
                                                            const { final_piece_qty = 0, receive_qty = 0, product_id = {}, color_tag_id = {}, is_bom_primary = false } = item;
                                                            return (
                                                                <View style={{ borderWidth: 1, margin: 5, borderColor: 'black', width: "95%" }}>
                                                                    <Text
                                                                        style={{
                                                                            textAlign: "left",
                                                                            width: '90%',
                                                                            fontFamily: fonts.POPPINS_REGULAR,
                                                                            fontWeight: '200',
                                                                            fontSize: normalize(12),
                                                                            color: colors.BLACK_SHADE_03,
                                                                            marginVertical: 10,
                                                                            paddingLeft: 3
                                                                        }}>
                                                                        {`Product: `}
                                                                        <Text style={{ fontWeight: '800' }}>{product_id?.display_name}</Text>
                                                                    </Text>
                                                                    <Text
                                                                        style={{
                                                                            textAlign: "left",
                                                                            width: '90%',
                                                                            fontFamily: fonts.POPPINS_REGULAR,
                                                                            fontWeight: '200',
                                                                            fontSize: normalize(12),
                                                                            color: colors.BLACK_SHADE_03,
                                                                            paddingLeft: 3
                                                                        }}>
                                                                        {`Color Tag: `}
                                                                        <Text style={{ fontWeight: '800' }}>{color_tag_id?.display_name}</Text>
                                                                    </Text>
                                                                    <View style={{ flexDirection: "row", marginTop: 10, width: "100%", paddingHorizontal: 5, alignItems: "center", justifyContent: "space-between" }}>
                                                                        <OutLinedTextInput
                                                                            isColumn={true}
                                                                            style={{ width: Dimensions.get('window').width / 2.25, height: 45 }}
                                                                            errorStyle={{ width: Dimensions.get('window').width / 2.25, height: (errors?.lineProducts && errors?.lineProducts?.[index]?.quantity) ? undefined : 0 }}
                                                                            label="Final Pcs Qty"
                                                                            value={final_piece_qty.toString()}
                                                                            disabled={true}
                                                                            visible={true}
                                                                            editable={false}
                                                                            error={`${errors?.lineProducts?.[index]?.quantity}`}
                                                                        />
                                                                        <OutLinedTextInput
                                                                            isColumn={true}
                                                                            keyboardType="numeric"
                                                                            style={{ width: Dimensions.get('window').width / 2.25, height: 45 }}
                                                                            errorStyle={{ width: Dimensions.get('window').width / 2.25, height: (errors?.lineProducts && errors?.lineProducts?.[index]?.quantity) ? undefined : 0 }}
                                                                            label="Producton Qty"
                                                                            placeholder='Please enter  quantity'
                                                                            value={values.lineProducts[index].quantity}
                                                                            onChangeText={handleChange(`lineProducts[${index}].quantity`)}
                                                                            visible={true}
                                                                            editable={is_bom_primary}
                                                                            error={`${errors?.lineProducts?.[index]?.quantity}`}
                                                                        />
                                                                    </View>
                                                                </View>
                                                            )
                                                        })
                                                    }
                                                </>
                                            )}
                                        </FieldArray>
                                    </ScrollView>

                                    <ButtonLoader
                                        onPress={handleSubmit}
                                        loaderStyle={{ width: '90%', backgroundColor: colors.APP_BG_COLOR, borderRadius: 10 }}
                                        style={{ width: '90%', backgroundColor: errors.quantity ? colors.GRAY_SHADE_LIGHT : colors.APP_BG_COLOR, borderRadius: 10 }}
                                        title="Update Quantity"
                                        isLoading={values.isLoading}
                                    />
                                </>
                            )}
                        </Formik>
                    </View>
                </View>
            </View>
        </>
    )
}
//
export default UpdateQuantity;