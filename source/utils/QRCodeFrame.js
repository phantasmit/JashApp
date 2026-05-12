import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const FRAME_SIZE = width * 0.7; // 70% of screen width

const QRCodeFrame = () => {
  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        {/* Corner markers */}
        {/* <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} /> */}
      </View>
    </View>
  );
};

const BORDER_WIDTH = 4;
const CORNER_SIZE = 30;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '25%', // vertical center-ish
    left: (width - FRAME_SIZE) / 2,
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frame: {
    width: '100%',
    height: '100%',
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
  },
  corner: {
    position: 'absolute',
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderColor: '#00FF00',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: BORDER_WIDTH,
    borderLeftWidth: BORDER_WIDTH,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: BORDER_WIDTH,
    borderRightWidth: BORDER_WIDTH,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: BORDER_WIDTH,
    borderLeftWidth: BORDER_WIDTH,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: BORDER_WIDTH,
    borderRightWidth: BORDER_WIDTH,
  },
});

export default QRCodeFrame;