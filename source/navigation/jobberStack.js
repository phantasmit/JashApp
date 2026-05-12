import { createNativeStackNavigator } from "@react-navigation/native-stack";
//
import Dashboard from "../apps/jobber/screens/dashbaord";
import JobFrom from "../apps/jobber/screens/jobForm";
import Scan from "../screens/scan";
import JobList from "../apps/jobber/screens/jobList";
import PlanList from "../apps/jobber/screens/planList";
//
import { ModalStack } from "./modalStack";
import { QAStack } from "./qaStack";
import { ProductStack } from "./productStack";
import { PortalStack } from "./portalStack";
//
const Stack = createNativeStackNavigator();
//
const JobberStack = () => {
    return (
        <Stack.Navigator
            hideNavbar={true}
            initialRouteName="Dashboard"
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                cardStyle: { backgroundColor: 'transparent' },
                cardOverlayEnabled: true,
            }}
        >
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="JobFrom" component={JobFrom} />
            <Stack.Screen name="Scan" component={Scan} />
            <Stack.Screen name="JobList" component={JobList} />
            <Stack.Screen name="PlanList" component={PlanList} />
            {
                QAStack()
            }
            {
                ProductStack()
            }
            {
                PortalStack()
            }
            {
                ModalStack(Stack)
            }
        </Stack.Navigator>
    )
}
//
export { JobberStack };