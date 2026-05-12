import React, { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { store, persistor } from "./source/store/configureStore";
import RouteContainer from "./source/navigation/route";
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import { View } from "react-native";
import colors from "./source/assets/appColor/colors";
import { decode, encode } from 'base-64';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

//
if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}
//
class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('#ffffff');

    }
    componentWillUnmount() {

    }
    //
    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <SafeAreaProvider>
                        {/* <SafeAreaView edges={["top", "bottom"]} style={{ backgroundColor: colors.WHITE }} /> */}
                        <SafeAreaView style={{ flex: 1, backgroundColor: colors.WHITE }} edges={["top", "left", "right", 'bottom']}>
                            <PaperProvider
                                settings={{
                                    rippleEffectEnabled: false
                                }}
                                theme={{
                                    ...DefaultTheme,
                                    colors: {
                                        ...DefaultTheme.colors,
                                        background: 'transparent',
                                    },
                                }}
                            >
                                <RouteContainer />
                            </PaperProvider>
                        </SafeAreaView>
                    </SafeAreaProvider>
                    {/* <SafeAreaView edges={["bottom"]} style={{ backgroundColor: colors.WHITE }} /> */}
                </PersistGate>
            </Provider>
        )
    }
}

export default App;