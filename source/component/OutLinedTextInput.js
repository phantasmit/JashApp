import { TextInput, HelperText } from 'react-native-paper';
import { Text, Image,View } from 'react-native';
import { normalize } from '../utils/normalize';
import colors from '../assets/appColor/colors';
import fonts from '../assets/fonts/fonts';
//
const OutLinedTextInput = (props) => {

    return (
        <View style={[{flexDirection:props.isColumn?'column':'row'},props.containterStyle]}>
            <TextInput
                label={
                    <Text style={{
                        backgroundColor: colors.WHITE,
                        fontFamily: fonts.POPPINS_REGULAR,
                        fontWeight: '400',
                        fontSize: normalize(12),
                        color: colors.LIGHT_GRAY
                    }}>
                        {`   ${props.label}  `}
                    </Text>
                }
                value={props.value}
                onChangeText={props.onChangeText}
                onBlur={props.onBlur}
                onPress={props.onPress}
                mode='outlined'
                disabled={props.disabled}
                editable={props.editable}
                autoCapitalize='none'
                placeholder={props.placeholder}
                multiline={props.multiline}
                maxLength={props.maxLength}
                onKeyPress={props.onKeyPress}
                keyboardType={props.keyboardType}
                style={[
                    {
                        color: colors.LIGHT_BLACK,
                        backgroundColor: 'transparent',
                        width: '80%',
                        fontFamily: fonts.POPPINS_REGULAR,
                        fontWeight: '400',
                        fontSize: normalize(12),
                    }, props.style]}
                outlineStyle={{
                    borderRadius: 10,
                    borderColor: colors.TEXT_BORDER_COLOR,
                    borderWidth: 1
                }}
                secureTextEntry={props.secureTextEntry}
                underlineColorAndroid='transparent'
                inputMode={props.inputMode} 
                right={
                    <TextInput.Icon
                        onPress={props.onPress}
                        color="transparent"
                        style={{ activeOpacity: 1 }}
                        icon={() => {
                            return <Image tintColor={colors.GRAY_SHADE_LIGHT} activeOpacity={1.0} source={props.rightIcon} resizeMode='contain' style={{ width: 16, height: 16, marginTop: 16 }} />
                        }}
                    />
                }
            />
            {
                props.visible &&
                <HelperText style={[{ width: '85%', alignSelf: 'center', color:props.disabled?'transparent': colors.LIGHT_RED, fontFamily: fonts.POPPINS_REGULAR, fontWeight: '400', fontSize: normalize(10),flexWrap:"wrap" }, props.errorStyle]} type="error" visible={props.visible}>
                    {props.error}
                </HelperText>
            }

        </View>
    )
}

export default OutLinedTextInput;