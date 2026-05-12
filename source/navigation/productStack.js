import { createNativeStackNavigator } from "@react-navigation/native-stack";
//
import ProductData from "../apps/product/productData";
import ProductDataDetail from "../apps/product/productDataDetail";
//
const Stack = createNativeStackNavigator();
//
const ProductStack = () => {
    return (
        <Stack.Group>
            <Stack.Screen name="ProductData" component={ProductData} />
            <Stack.Screen name="ProductDataDetail" component={ProductDataDetail} />
        </Stack.Group>
    )
}
//
export { ProductStack };