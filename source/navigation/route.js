import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { navigationRef } from "./RootNavigation";
import stacks from "./stackEnum";
import { OnBoardStack } from './onboardStack';
import { JobberStack } from './jobberStack';
//
const Stack = createNativeStackNavigator();
//
function RouteContainer() {
    const stackReducer = useSelector(state => state.StackReducer);
    
    return (
        <NavigationContainer
            ref={navigationRef}
        >
            {
                manageStack(stackReducer.stack_name)
            }
        </NavigationContainer>
    )
}

const manageStack = (stacks_option) => {
    switch (stacks_option) {
        case stacks.ON_BOARD_STACK:
            return OnBoardStack()
        case stacks.JOBBER_STACK:
            return JobberStack()
    }
}
//
export default RouteContainer;

// //
// const Stack = createNativeStackNavigator();
// //
// function RouteContainer() {
//     return (
//         <NavigationContainer
//             ref={navigationRef}
//         >
//             <Stack.Navigator
//                 hideNavbar={true}
//                 initialRouteName="Splash"
//                 screenOptions={{
//                     headerShown: false,
//                     gestureEnabled: false,
//                     cardStyle: { backgroundColor: 'transparent' },
//                     cardOverlayEnabled: true,
//                 }}
//             >
//                 <Stack.Group>
//                     <Stack.Screen name="Splash" component={Splash} />
//                     <Stack.Screen name="Login" component={Login} />
//                 </Stack.Group>
//             </Stack.Navigator>
//         </NavigationContainer>
//     )
// }

// export default RouteContainer;