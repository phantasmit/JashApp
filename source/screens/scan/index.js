import React from "react";
import { View } from "react-native";
import { ScanComponent } from "./scanComponent";
import { connect } from "react-redux";
import CameraWrapper from "../../utils/CameraWrapper";
import HeaderComponent from "../../hoc/headerComponent";
import HOCComponent from "../../hoc/hocComponent";
import { ScreenOptions } from "../../utils/utils";

const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);

class Scan extends ScanComponent {
    render() {
        return (
            <HOCComponents
                onPress={() => {
                    this.props.navigation.goBack()
                }}
                isBack={true}
                title="Scan QR"
            >
                <View style={{ flex: 1 }}>
                    <CameraWrapper
                        codeScan={(scanned) => {
                            // console.log(JSON.stringify(scanned));
                            // debugger;
                            if (scanned.length > 0) {
                                //this.props.navigation.replace('PlanList', { planId: parseInt(20)})
                                //
                                const inputString = scanned[0]?.value
                                //
                                const planMatchId = inputString.match(/Plan_id:\s*(\d+)/);
                                const planId = planMatchId && planMatchId[1];
                                //    
                                const { screenOption } = this.props.route.params;
                                if (this.props.userProcess?.is_qc_approver && screenOption == ScreenOptions.QC_CHECK) {
                                    this.props.navigation.navigate('ProductList', { "planId": parseInt(planId) })
                                } else if (this.props.userProcess?.jobber && screenOption == ScreenOptions.JOBBER) {
                                    this.props.navigation.replace('PlanList', { planId: parseInt(planId) })
                                } else {
                                    if (this.props.userProcess?.is_qc_approver) {
                                        this.props.navigation.navigate('ProductList', { "planId": parseInt(planId) })
                                    } else if (this.props.userProcess?.jobber) {
                                        this.props.navigation.replace('PlanList', { planId: parseInt(planId) })
                                    }
                                }
                                //this.props.navigation.replace('PlanList', { planId: parseInt(planId) })
                                // const activeMatchId = inputString.match(/Actve id:\s*(\d+)/);
                                // const lineMatchId = inputString.match(/Line id:\s*(\d+)/);
                                // //console.log(lineMatchId);
                                // if (activeMatchId) {
                                //     const activeId = activeMatchId && activeMatchId[1];
                                //     const lineId = lineMatchId && lineMatchId[1];
                                //     //this.props.navigation.replace('JobFrom', { formId: parseInt(activeId), lineId: parseInt(lineId) })
                                //     this.props.navigation.replace('PlanList', { planId: parseInt(20), formId: parseInt(activeId), lineId: parseInt(lineId) })
                                // } else {
                                //     alert('Active ID not found')
                                //     console.log("Active ID not found.");
                                // }
                            }
                        }}
                    />
                </View>
            </HOCComponents>
        )
    }
}

export default connect(ScanComponent.mapStateToProps, ScanComponent.mapDispatchToProps)(Scan);