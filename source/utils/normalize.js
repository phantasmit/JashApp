import { Dimensions, Platform, PixelRatio } from 'react-native';
import moment from "moment";

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))// - 2
  }
}


export function updateDateFormat(date, isTimeFormatReuire = false) {
  const formattedDate = moment(date).format(`DD/MM/YYYY${isTimeFormatReuire ? ' hh:mm:ss' : ''}`);
  return formattedDate;
}