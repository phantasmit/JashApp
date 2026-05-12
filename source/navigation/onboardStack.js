import { createNativeStackNavigator } from "@react-navigation/native-stack";
//
import Splash from "../screens/splash";
import Login from "../screens/login";
//
const Stack = createNativeStackNavigator();
//
const OnBoardStack = () => {
    return (
        <Stack.Navigator
            hideNavbar={true}
            initialRouteName="Splash"
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                cardStyle: { backgroundColor: 'transparent' },
                cardOverlayEnabled: true,
            }}
        >
            <Stack.Group>
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Login" component={Login} />
            </Stack.Group>
        </Stack.Navigator>
    )
}
//
export { OnBoardStack };