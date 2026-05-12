import { createNativeStackNavigator } from "@react-navigation/native-stack";
//
import ProductList from "../apps/qa/productList";
import ProductDetail from "../apps/qa/productDetail";
//
const Stack = createNativeStackNavigator();
//
const QAStack = () => {
    return (
        <Stack.Group>
            <Stack.Screen name="ProductList" component={ProductList} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
        </Stack.Group>
    )
}
//
export { QAStack };