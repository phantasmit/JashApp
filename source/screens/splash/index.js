import React from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { SplashComponent } from "./splashComponent";
import { connect } from "react-redux";
import CameraWrapper from "../../utils/CameraWrapper";
import { logo_transparent } from "../../utils/images";
import colors from "../../assets/appColor/colors";

class Splash extends SplashComponent {


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white',alignItems:"center",justifyContent:"center"}}>
                {/* <CameraWrapper/> */}
                <Image source={logo_transparent} style={{ width: '80%', height: '80%' }} resizeMode="contain" />
                <ActivityIndicator color={colors.APP_BG_COLOR} size='large'/>
            </View>
        )
    }
}

export default connect(SplashComponent.mapStateToProps, SplashComponent.mapDispatchToProps)(Splash);