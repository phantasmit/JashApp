import { TouchableOpacity, Image, Text, View, ActivityIndicator } from 'react-native';
import { normalize } from '../utils/normalize';
import colors from '../assets/appColor/colors';
import fonts from '../assets/fonts/fonts';
//
const ButtonLoader = (props) => {

    return (
        <>
            {
                {
                    true:
                        <View style={[{ width: '85%', alignItems: 'center', justifyContent: 'center', height: 50, marginVertical: 20 }, props.loaderStyle]}>
                            <ActivityIndicator size="small" color={colors.WHITE} style={{ position: 'absolute' }} />
                        </View>,
                    false:
                        <TouchableOpacity
                            onPress={props.onPress}
                            style={[{ width: '85%',alignItems: 'center', justifyContent: 'center', height: 50, marginVertical: 20 }, props.style]}>
                            <Text style={[{
                                fontFamily: fonts.POPPINS_REGULAR,
                                fontWeight: '700',
                                fontSize: normalize(14),
                                color: colors.WHITE,
                                position: 'absolute'
                            }, props.textStyle]}>
                                {props.title}
                            </Text>
                        </TouchableOpacity>
                }[props.isLoading]
            }
        </>
    )
}

export default ButtonLoader;