import React, { Component } from 'react';
import { doLogout, userProcessDataReq } from '../../../../navigation/action';
import { getuserProcessInfo } from '../../../../screens/login/action';
import { userProcess } from '../../../../screens/login/request';

class DashboardComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isClickable: false
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            // console.log(JSON.stringify(this.props.userProcess));
            // // this.props.userProcess?.is_qc_approver
            const { uid, partner_id } = this.props.userData;
            //
            this.props.getuserProcessInfo({
                reqData: JSON.stringify(userProcess(uid, partner_id)),
                onSuccessResponse: ((response) => {
                    if (response?.records?.length > 0) {
                        this.props.userProcessDataReq({ userProcess: response?.records[0] })
                    }
                    //
                }),
                onErrorResponse: (error => {
                    setFieldValue('isLoading', false);
                })
            })
            // this.props.navigation.navigate('UpdateQuantity', {
            //     'lineId': [
            //         {
            //             "id": 12591,
            //             "bom_id": [
            //                 1615,
            //                 "[Mandi New] Mandi Pcs"
            //             ],
            //             "date": "2025-08-31",
            //             "jobber_plan_id": false,
            //             "color_index_reference": "Stitched Top Pcs",
            //             "product_id": [
            //                 3634,
            //                 "[STP] Stitched Top Pcs"
            //             ],
            //             "color_tag_id": [
            //                 2,
            //                 "Blue"
            //             ],
            //             "production_qty": 100,
            //             "average_qty": 1,
            //             "qty_onhand": 200,
            //             "req_quantity": 100,
            //             "balance": 100,
            //             "min_qty": 0,
            //             "max_qty": 0,
            //             "textile_ledger_id": [
            //                 3153,
            //                 "JOB/2025/03040"
            //             ],
            //             "issued_qty": 100,
            //             "stock_lot_color_index_ids": [
            //                 28715,
            //                 28716,
            //                 28717,
            //                 28718,
            //                 28719
            //             ],
            //             "final_piece_qty": 100,
            //             "product_color_index_number": 1,
            //             "is_lot_checked": false,
            //             "is_bom_primary": true,
            //             "is_windo_open": false,
            //             "display_name": "color.index.report.line,12591",
            //             "create_uid": [
            //                 2,
            //                 "Jitendra R Hirdani"
            //             ],
            //             "create_date": "2025-08-31 14:31:14",
            //             "write_uid": [
            //                 2,
            //                 "Jitendra R Hirdani"
            //             ],
            //             "write_date": "2025-08-31 14:58:19",
            //             "qr_code": "iVBORw0KGgoAAAANSUhEUgAAAKsAAACrAQAAAAAxk1G0AAADLUlEQVR4nO2XMY7cNhSGf44m4DQrzaZbgGsK8Am20wILcFztOWIfwKNN4yZDqUs14xMk59iOAxiQq+wJFuBEAtyK2oYDUHopXMZOILYJywfiAx//Xz+fGOEb67T4VhX4r5QdY+Wq+3heutWobzEc2WI+hFFgTrjNeOmTxdP1mlM/FwJyRpQ+gCPzrfOyblCSjeiSsq58DD/d5yk+pf+6+zvl7DFPkX/8/LzgYhsHUXbgcs2hH/NfVqwCVfMhxJbA+CcwcPFixHBm67mQJTICvekOf3z6/dz8dkaqaHY7oF5BU9hxCx6YF8xbNl+d9Ehr8Et/p03+ftNdZHk6/yTUgBFVRSiNzbwFWpp7EhBRS74lb0vf9iDX2Gw+xHmgsNoIZgIziWtEBGSCnJQAt+Bg3mYmiWinR9gCWZNMEJpE1gQ9F7IE81/WIFpIRuMPb+yPZfduvmMv7q8dXT/ADgDAHziGCLPxxPlkUmBN2CqkkLPvZIH05qxXzz//GlIs03N4Z45VRChRUvsA2NInFagqwmzbg3plUy73Ciio9tCNdBEQLh1ZbWTFLaMQ55MJgELpLYDMywpitk9AZKQzYBS0aWsja8Js2y8wFGOFQAwDrrQ+9Z/FP+3+TjlFou9fE+UpOm2AonsbIzFYQ5UC0E4KW8y/2AUubmm8XbLHZI+rxdFmzXkdY3uRKmgje9XWJpkQZr+AoL6QkwrgdCAwErpBhMSOxLagQyOYt9oH5mMgE4hM0F46EwDZI8on6lpvOrc67gFG48GECImJEmoSoqRuLBS2EXkC6jm2HJlpyWNX2K2KS/t2z0XKseNUG+kaEfGMvpgr55KqwIBR63F/Y3cR3w7/8vB0crUAOm1snb2OGPzow/iqoPKDTYs7us1Lf5rmqzOBJlDFbebtVsmeR2UsD7oJgAD/KnFyiJkKqC8kkdDGpsqyqGRzjO2f7GFjB56/RY6oZGMUhpvuxXQp6NIABWKSzYiygTYCsOACiDEbgPQc6vtmKnLmUFJbRU3UtOEHfwdgxy1wmg0BOQolSfJgPjAjpyJEqENsSZtntqIeSaVOC76cPZ+w/38k/7b+ApUk9RNwabfEAAAAAElFTkSuQmCC"
            //         },
            //         {
            //             "id": 12592,
            //             "bom_id": [
            //                 1615,
            //                 "[Mandi New] Mandi Pcs"
            //             ],
            //             "date": "2025-08-31",
            //             "jobber_plan_id": false,
            //             "color_index_reference": "Stitched Top Pcs",
            //             "product_id": [
            //                 3634,
            //                 "[STP] Stitched Top Pcs"
            //             ],
            //             "color_tag_id": [
            //                 1,
            //                 "Red"
            //             ],
            //             "production_qty": 100,
            //             "average_qty": 1,
            //             "qty_onhand": 200,
            //             "req_quantity": 100,
            //             "balance": 100,
            //             "min_qty": 0,
            //             "max_qty": 0,
            //             "textile_ledger_id": [
            //                 3153,
            //                 "JOB/2025/03040"
            //             ],
            //             "issued_qty": 100,
            //             "stock_lot_color_index_ids": [
            //                 28720,
            //                 28721
            //             ],
            //             "final_piece_qty": 100,
            //             "product_color_index_number": 2,
            //             "is_lot_checked": false,
            //             "is_bom_primary": true,
            //             "is_windo_open": false,
            //             "display_name": "color.index.report.line,12592",
            //             "create_uid": [
            //                 2,
            //                 "Jitendra R Hirdani"
            //             ],
            //             "create_date": "2025-08-31 14:31:14",
            //             "write_uid": [
            //                 2,
            //                 "Jitendra R Hirdani"
            //             ],
            //             "write_date": "2025-08-31 14:58:19",
            //             "qr_code": "iVBORw0KGgoAAAANSUhEUgAAAKsAAACrAQAAAAAxk1G0AAADKUlEQVR4nO1XvW7kNhD+uFqAaU7ylQZ45r5COjowQHd+jkse4LQGArjST9KkWuUeIH6PdDRggNv5CQLQkQCXkXQNBXA1Ke66MxKQbTIlQXz45puZj0NGeCWeN6+dAv+V44mx5uHUADNODbbzA9vEgoAmCiVosgEgMmCWJnLRBB92BW1/u94x/+6WUwPWJGU5scDM44cbl2Ob/+vtr2MLAAUN78/EgIHunDjGg4AmCnvvmBW1BbOiTtKE2BZPVyUwQ5TAvLCz+HQKAn03YBlyvDTc/agpIZ0RgpnsAAChgihV38WnU5h+1eeTd1D42fcXx8sxnsmqHPPIFU2GVi4q7Vg8E9bJ8Sn8YIZ79e5WZRtkTUKJjagJlXLMhgqCmRQmdP2yZ/S2y5pvt1D9yuWa0myCGVcpatCTCdB9G8sEtOp+5LKjfvKCETU8SwCZLAqfNVweEGovJ+P28SCjpo5ErkKlkCu5oqcEJiRKRa2lzoico/Dxmmzw5pv+AsOby4Hu3KzkeBRVvCl98mzEFbPntzxbF/yKYY4vMVnZ+myEYN5Vuicb6oQSA8wDXADUWWoQX+INZsjxiHIZarud7naMUMZrUphTo/uGi3lZ1mXA8XSRoAnJUaPwoTauINmSiB5A0AgAyDXAaeUogRQ/MfKgA/s9G5ftTwrQNCY4m0bJXaX61vQrBPNImJ1V0aplZ/sRqHR2SJsd43IlV0Wtl2RFzlP8hIxsbci52xvZcCIf/wKCVg1oanhG1tUkOytTQBStKhTeQTtGsuFpmoS9pdb0rZcr3D6JCZlsMn3DAQ5GNGoZzWQDujmd8avChP0UKmzv8dzED+CM7LA8vr/c3mNorx2WPnrx2yBXf4xcfLTyr5tsPZ43x90/3X49aAUdFE1edj5ricjLhGYbeaipH3kAp1XLBqJIqA7RqL74SaXlRPEgnzdqYLoZZsj2l9PZMfszXlhGoehEYUTO2WZ5hMJ90n5SKlQqgLvaZmOSswHAk3zbvZDf0R4ffeKmVCJbEZghMiLnLuHxmijsSR54Tx4lHDOJGzVdP36P3QyX86sPd89nsemw/z+SX8XfPIsUol2I6lsAAAAASUVORK5CYII="
            //         },
            //         {
            //             "id": 12593,
            //             "bom_id": [
            //                 1615,
            //                 "[Mandi New] Mandi Pcs"
            //             ],
            //             "date": "2025-08-31",
            //             "jobber_plan_id": false,
            //             "color_index_reference": "Bottom Cutting Pcs",
            //             "product_id": [
            //                 3595,
            //                 "[BCP] Bottom Cutting Pcs"
            //             ],
            //             "color_tag_id": [
            //                 1,
            //                 "Red"
            //             ],
            //             "production_qty": 100,
            //             "average_qty": 1,
            //             "qty_onhand": 100,
            //             "req_quantity": 100,
            //             "balance": 0,
            //             "min_qty": 0,
            //             "max_qty": 0,
            //             "textile_ledger_id": [
            //                 3153,
            //                 "JOB/2025/03040"
            //             ],
            //             "issued_qty": 100,
            //             "stock_lot_color_index_ids": [
            //                 28722,
            //                 28723
            //             ],
            //             "final_piece_qty": 100,
            //             "product_color_index_number": 2,
            //             "is_lot_checked": false,
            //             "is_bom_primary": false,
            //             "is_windo_open": false,
            //             "display_name": "color.index.report.line,12593",
            //             "create_uid": [
            //                 2,
            //                 "Jitendra R Hirdani"
            //             ],
            //             "create_date": "2025-08-31 14:31:14",
            //             "write_uid": [
            //                 2,
            //                 "Jitendra R Hirdani"
            //             ],
            //             "write_date": "2025-08-31 14:58:19",
            //             "qr_code": "iVBORw0KGgoAAAANSUhEUgAAAKsAAACrAQAAAAAxk1G0AAADG0lEQVR4nO1XMY4bNxR91AigG89sygXopY7BAALGXe6RHMDSVlvNjOImlSY5gPce23EBAVTnExjghgJcBZhRGgqg5rlwOhsIhm3yS4J4eP99/vc/BfGdeFl87xT4rxyPQnTP1w4449pheX4Wi7kg4Mi0AUeXANJCOI70swk+ryq3/PB2JeKbe8kOosvK8owk7OHdT77EsvzX29/GEgBePxz+ulEnnPjg1XE+CDgybemFU62DcKrN0oRiieN6A5yhNsD5Im7mMyE5Gb+1aF0xxrQlOZcJOEAJW+wBIDVQGxP6+elU9vNU347Rw+B9DHfHH4eMdKIqgdJwtJykamovMh7bx/CnTL/Y06N5c2+KBYoup8SqdWiMFy41UMLOZwLSFSN178IuojGky6nOSCWcbww7BNqEOuzmg0ym2EvdM4xRCbKTxWyQBf7ub8N4Gl+tP7zyzWW1ffo0zBd2qEmq0qTGoDR6QsjQhFQw3Dn2VpUSVczRZJDsbdgj7E1CrWnnV2cBGDHItXC397KYLvgdp/N8UyoveoHD6xslnl4e5UEdb993s4WdABE9pALYO3bIKfEZejiuNpdT65bjw0oQm/lGXdlrV4dOqvPlMl1OOF7vcpxNDzWqmFrrK+odVUYDToCIKGtAcpLYADl+Ar3/mMRTMVyWvxqg5pDhJ/ZrF4edDROUiNhmWEEMO+rehQFo6mKf1TtjTI3hZLiLmk6VMqd36Ao6VUq/tbqTZJw/AcGpBmp2sqDzLXXvdA6I4WRSFT1qL6g7OV+TBcRv13tZ3B+L3VN9Fc+jXc/uYnC0xYDQSUBCkEOtM5jw4dNdva5s2o6pwfIRL10GkxgmEwagih512JuskVH71nHn9FSHSaYyw0/ACZwMx6j7WOxIRp1l1KllGGSC5FTrDqrKGRkczD9+0tR6ZA7IAGwtUPutJZ0SGS92AcFUSlVZVUqxuBxg8JjlJxugMQnSt64YMp0NkPqH/jPjilv8EbM2Jas2KCZ8/SCoUvo2Z8lJW+q9DIzYwAubuVHz7eFnrM7wpVy/e3i5mZuO+P8j+U18AbhoJ5ngI+bNAAAAAElFTkSuQmCC"
            //         }
            //     ],
            //     'selectedLineId': 12591,
            //     'qty': 100,
            //     'formId': 3153
            // })
        })

    }

    static mapStateToProps = (state) => {
        return {
            userData: state.StackReducer.userData,
            userProcess: state.StackReducer.userProcess
        }
    }

    static mapDispatchToProps = {
        doLogout: doLogout,
        getuserProcessInfo: getuserProcessInfo,
        userProcessDataReq: userProcessDataReq,
        getuserProcessInfo: getuserProcessInfo
    }

}

export { DashboardComponent };