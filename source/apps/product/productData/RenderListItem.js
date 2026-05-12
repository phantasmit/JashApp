import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image
} from "react-native";
import fonts from "../../../assets/fonts/fonts";
import colors from "../../../assets/appColor/colors";
import { IMAGE_URL } from "../../../services/api-end-points";
import { normalize } from "../../../utils/normalize";
//
const RenderListItem = ({ item, onRowClick }) => {

    const { id, name, product_document_count, state } = item;
    console.log(JSON.stringify(item));

    return (
        <TouchableOpacity
            onPress={() => { onRowClick(id) }}
            style={{
                width: Dimensions.get('window').width - 20,
                marginVertical: 5,
                backgroundColor: '#2E9298',
                borderRadius: 10,
                padding: 10,
                shadowColor: '#000000',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 5,
                shadowOpacity: 1.0,
                flexDirection: "row",
                alignItems: "center"
            }}>

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Image source={{ uri: `${IMAGE_URL()}/web/image/product.template/${id}/image_1024` }} style={{ aspectRatio: 0.6, width: Dimensions.get('window').width / 3.2 }} resizeMode="contain" />
                <View style={{ flex: 3, marginHorizontal: 8 }}>
                    <Text
                        style={{
                            fontFamily: fonts.POPPINS_REGULAR,
                            fontWeight: '400',
                            fontSize: normalize(15),
                            color: colors.WHITE,
                            flexWrap: "wrap"

                        }}>
                        {name}
                    </Text>
                    <Text
                        style={{
                            fontFamily: fonts.POPPINS_REGULAR,
                            fontWeight: '400',
                            fontSize: normalize(15),
                            color: colors.WHITE,
                            flexWrap: "wrap"

                        }}>
                        {`Document : ${product_document_count}`}
                    </Text>
                    <Text
                        style={{
                            fontFamily: fonts.POPPINS_REGULAR,
                            fontWeight: '400',
                            fontSize: normalize(15),
                            color: colors.WHITE,
                            flexWrap: "wrap"

                        }}>
                        {state.toUpperCase()}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const areEqual = (prevProps, nextProps) =>
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.state === nextProps.item.state;

export default React.memo(RenderListItem, areEqual);