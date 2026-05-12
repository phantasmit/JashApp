import React, { PureComponent, Component } from "react";
import { TouchableOpacity, Image, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import colors from "../assets/appColor/colors";
import fonts from "../assets/fonts/fonts";
import { normalize } from "../utils/normalize";
import { left_arrow } from "../utils/images";

const HeaderComponent = WrappedComponent => {
    //
    class Wrapped extends PureComponent {



        render() {
            const { children, ...props } = this.props;
            return (
                <>
                    <View style={[{ flexDirection: 'row', padding: 15, alignItems: "center", justifyContent: 'flex-start' }, styles.box]}>
                        {props.isBack &&
                            <TouchableOpacity
                                hitSlop={{ width: 50, height: 50, top: 10, bottom: 10 }}
                                onPress={props.onPress}>
                                <Image source={left_arrow} tintColor={colors.BLACK_SHADE_03} style={{ marginBottom: 5 }} resizeMode="contain" />
                            </TouchableOpacity>
                        }

                        <Text
                            style={{
                                fontFamily: fonts.POPPINS_REGULAR,
                                fontWeight: '500',
                                fontSize: normalize(16),
                                color: colors.BLACK_SHADE_03,
                                marginLeft: 15
                            }}>
                            {props.title}
                        </Text>
                    </View>

                    <SafeAreaView style={[styles.safeViewStyle]}>
                        <WrappedComponent {...props}>
                            {children}
                        </WrappedComponent>
                    </SafeAreaView>
                </>
            )
        }
    }
    return Wrapped;
};

const styles = StyleSheet.create({
    safeViewStyle: {
        marginTop: 1,
        flex: 1,
        backgroundColor: '#FAFAFA'
    },
    box: {
        backgroundColor: colors.WHITE,
        //padding: 20,
        //borderRadius: 10,

        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        //shadowRadius: 4,
        elevation: 5
    },
})

export default HeaderComponent;