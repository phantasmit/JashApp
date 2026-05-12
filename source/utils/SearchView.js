

import { View, Image, TextInput, TouchableOpacity } from "react-native";
import { search } from "./images";
import fonts from "../assets/fonts/fonts";
import colors from "../assets/appColor/colors";

//
const SearchView = (props) => {

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
                onChangeText={props.onChangeText}
                placeholder="search here"
                value={props.search}
            />
        </View>
    )
}

export default SearchView;