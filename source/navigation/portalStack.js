import { createNativeStackNavigator } from "@react-navigation/native-stack";
//
import ProtalList from "../apps/customerPortal/portalList";
import PortalDetail from "../apps/customerPortal/portalDetail";
//
const Stack = createNativeStackNavigator();
//
const PortalStack = () => {
    return (
        <Stack.Group>
            <Stack.Screen name="PortalList" component={ProtalList} />
            <Stack.Screen name="PortalDetail" component={PortalDetail} />
        </Stack.Group>
    )
}
//
export { PortalStack };