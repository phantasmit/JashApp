import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import fonts from "../../../../assets/fonts/fonts";
import colors from "../../../../assets/appColor/colors";
import { normalize } from "../../../../utils/normalize";
//
const JobListItem = ({ item, onRowClick }) => {
  const { id, job_color_index_line_ids, name, partner_id, jobber_plan_id,
    jobber_plan_product_id, bom_id, date, fg_issue_qty, state,
    partner_id_rate, total_amount } = item;
  const textColor = (state.toLowerCase() === "done") ? colors.LIGHT_GRAY : colors.WHITE

  return (
    <TouchableOpacity
      activeOpacity={(state.toLowerCase() === "done") ? 1 : 0}
      onPress={() => {
        // if (!(state.toLowerCase() === "done")) {
        //   // this.props.navigation.replace('JobFrom', { formId: parseInt(id), lineId: parseInt(job_color_index_line_ids[0]) })
        //   onRowClick({ formId: parseInt(id), lineId: parseInt(job_color_index_line_ids[0]) })
        // }
         onRowClick({ formId: parseInt(id), lineId: parseInt(job_color_index_line_ids[0]) })
        //navigation.replace('JobFrom', { formId: parseInt(id), lineId: parseInt(job_color_index_line_ids[0]) })
      }}
      style={{
        width: Dimensions.get('window').width - 20,
        marginVertical: 5,
        backgroundColor: (state.toLowerCase() === "done") ? '#2E929845' : '#2E9298',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        flexDirection: "row",
        alignItems: "center"
      }}>
      <View style={{ marginLeft: 5, flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text
              style={{
                fontFamily: fonts.POPPINS_REGULAR,
                fontWeight: '200',
                fontSize: normalize(8),
                color: textColor,
                flexWrap: "wrap"

              }}>
              {'Job No'}
            </Text>
            <Text
              style={{
                fontFamily: fonts.POPPINS_REGULAR,
                fontWeight: '800',
                fontSize: normalize(14),
                color: (state.toLowerCase() === "done") ? colors.BLACK_SHADE_03 : '#FFFF99',
                flexWrap: "wrap"

              }}>
              {name}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: fonts.POPPINS_REGULAR,
                fontWeight: '200',
                fontSize: normalize(8),
                color: textColor,
                flexWrap: "wrap"

              }}>
              {'Plan Name'}
            </Text>
            <Text
              style={{
                fontFamily: fonts.POPPINS_REGULAR,
                fontWeight: '800',
                fontSize: normalize(14),
                color: (state.toLowerCase() === "done") ? colors.BLACK_SHADE_03 : '#FFFF99',
                flexWrap: "wrap"
              }}>
              {jobber_plan_id?.display_name}
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontFamily: fonts.POPPINS_REGULAR,
              fontWeight: '200',
              fontSize: normalize(8),
              color: textColor,
              flexWrap: "wrap"

            }}>
            {'Jobber'}
          </Text>
          <Text
            style={{
              fontFamily: fonts.POPPINS_REGULAR,
              fontWeight: '500',
              fontSize: normalize(12),
              color: textColor,
              flexWrap: "wrap"
            }}>
            {partner_id?.display_name}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: fonts.POPPINS_REGULAR,
              fontWeight: '200',
              fontSize: normalize(8),
              color: textColor,
              flexWrap: "wrap"

            }}>
            {'Product Name'}
          </Text>
          <Text
            style={{
              fontFamily: fonts.POPPINS_REGULAR,
              fontWeight: '500',
              fontSize: normalize(12),
              color: textColor,
              flexWrap: "wrap"
            }}>
            {jobber_plan_product_id?.display_name}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: fonts.POPPINS_REGULAR,
              fontWeight: '200',
              fontSize: normalize(8),
              color: textColor,
              flexWrap: "wrap"

            }}>
            {'Process'}
          </Text>
          <Text
            style={{
              fontFamily: fonts.POPPINS_REGULAR,
              fontWeight: '500',
              fontSize: normalize(12),
              color: textColor,
              flexWrap: "wrap"
            }}>
            {bom_id?.display_name}
          </Text>
        </View>

        {/** */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text
              style={{
                fontFamily: fonts.POPPINS_REGULAR,
                fontWeight: '200',
                fontSize: normalize(8),
                color: textColor,
                flexWrap: "wrap"

              }}>
              {'Jobber Rate'}
            </Text>
            <Text
              style={{
                fontFamily: fonts.POPPINS_REGULAR,
                fontWeight: '500',
                fontSize: normalize(12),
                color: textColor,
                flexWrap: "wrap"
              }}>
              {partner_id_rate}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: fonts.POPPINS_REGULAR,
                fontWeight: '200',
                fontSize: normalize(8),
                color: textColor,
                flexWrap: "wrap"

              }}>
              {'Total Amount'}
            </Text>
            <Text
              style={{
                fontFamily: fonts.POPPINS_REGULAR,
                fontWeight: '500',
                fontSize: normalize(12),
                color: textColor,
                flexWrap: "wrap"
              }}>
              {`${total_amount}`}
            </Text>

          </View>

        </View>
        {/** */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: fonts.POPPINS_REGULAR,
                fontWeight: '200',
                fontSize: normalize(8),
                color: textColor,
                flexWrap: "wrap"

              }}>
              {'Date'}
            </Text>
            <Text
              style={{
                fontFamily: fonts.POPPINS_REGULAR,
                fontWeight: '500',
                fontSize: normalize(12),
                color: textColor,
                flexWrap: "wrap"
              }}>
              {date}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: fonts.POPPINS_REGULAR,
                fontWeight: '200',
                fontSize: normalize(8),
                color: textColor,
                flexWrap: "wrap"

              }}>
              {'FG issue Quantity'}
            </Text>
            <Text
              style={{
                fontFamily: fonts.POPPINS_REGULAR,
                fontWeight: '500',
                fontSize: normalize(12),
                color: textColor,
                flexWrap: "wrap"
              }}>
              {`${fg_issue_qty}`}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: fonts.POPPINS_REGULAR,
                fontWeight: '200',
                fontSize: normalize(8),
                color: textColor,
                flexWrap: "wrap"

              }}>
              {'State'}
            </Text>
            <Text
              style={{
                fontFamily: fonts.POPPINS_REGULAR,
                fontWeight: '800',
                fontSize: normalize(12),
                color: (state.toLowerCase() === "done") ? colors.BLACK_SHADE_03 : '#FFFF99',
                flexWrap: "wrap"
              }}>
              {state.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const areEqual = (prevProps, nextProps) =>
  prevProps.item.id === nextProps.item.id &&
  prevProps.item.state === nextProps.item.state;

export default React.memo(JobListItem, areEqual);