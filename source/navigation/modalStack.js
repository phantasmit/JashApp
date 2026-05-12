import { CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack';
import UpdateQuantity from '../modal/updateQuantity';
import FGReceiveQuantity from '../modal/fgReceiveQuantity';
import ColorLineModal from '../modal/colorLineModal';
import FilterOption from '../modal/filterOption';
import ScreenModal from '../modal/screenModal';
import ImageViewModal from '../modal/imageViewModal';

const ModalStack = (Stack) => {
    return (
        <Stack.Group
            screenOptions={{
                headerShown: false,
                presentation: 'transparentModal',
                gestureEnable: true
            }}
        >

            <Stack.Screen name="UpdateQuantity" component={UpdateQuantity}
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animationEnabled: true,
                    contentStyle: {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    },
                    gestureEnabled: true,
                }} />

            <Stack.Screen name="FGReceiveQuantity" component={FGReceiveQuantity}
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animationEnabled: true,
                    contentStyle: {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    },
                    gestureEnabled: true,
                }} />
            <Stack.Screen name="ColorLineModal" component={ColorLineModal}
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animationEnabled: true,
                    contentStyle: {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    },
                    gestureEnabled: true,
                }} />
            <Stack.Screen name="FilterOption" component={FilterOption}
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animationEnabled: true,
                    contentStyle: {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    },
                    gestureEnabled: true,
                }} />
            <Stack.Screen name="ScreenModal" component={ScreenModal}
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animationEnabled: true,
                    contentStyle: {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    },
                    gestureEnabled: true,
                }} />
            <Stack.Screen name="ImageViewModal" component={ImageViewModal}
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animationEnabled: true,
                    contentStyle: {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    },
                    gestureEnabled: true,
                }} />

        </Stack.Group>
    )
}

export { ModalStack };