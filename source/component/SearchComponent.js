

import { View, Image, TextInput, TouchableOpacity } from "react-native";
import { normalize } from '../utils/normalize';
import colors from '../assets/appColor/colors';
import fonts from '../assets/fonts/fonts';
import { filter, search } from "../utils/images";
//
const SearchComponent = (props) => {

    return (
        <View
            style={{
                backgroundColor: 'white',
                width: '90%',
                height: 50,
                alignSelf: "center",
                marginTop: 10,
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                borderWidth: 1
            }}>
            <Image source={search} resizeMode="contain" tintColor={colors.BLACK_SHADE_03} style={{ width: 15, height: 15 }} />
            <TextInput
                placeholderTextColor={colors.GRAY_SHADE_LIGHT}
                style={{
                    height: 45,
                    flex: 1,
                    marginHorizontal: 10,
                    borderWidth: 0,
                    padding: 5,
                    paddingTop: 15,
                    fontFamily: fonts.POPPINS_REGULAR,
                    fontSize: 14,
                    color: colors.GRAY_SHADE_LIGHT
                }}
                editable={!props.isFilter}
                onChangeText={props.onChangeText}
                placeholder="search here"
                value={props.search}
            />
            <TouchableOpacity onPress={props.onFilterPress}>
                <Image source={filter} resizeMode="contain" style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
        </View>
    )
}

export default SearchComponent;