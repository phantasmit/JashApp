import React, { useState } from 'react';
import { useCameraDevice, useCodeScanner } from 'react-native-vision-camera'
import { Camera } from 'react-native-vision-camera'
import { View, Vibration, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const frameSize = width * 0.7;
const frameTop = (height - frameSize) / 2;
const frameLeft = (width - frameSize) / 2;


const CameraWrapper = (props) => {

    const [scanned, setScanned] = useState(false);


    const scanArea = {
        x: frameLeft / width,
        y: frameTop / height,
        width: frameSize / width,
        height: frameSize / height,
    };
    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            //console.log(`Scanned ${codes.length} codes:`, codes);
            if (codes.length > 0) {
                setScanned(true);
                setTimeout(() => {
                    setScanned(false);
                }, 1000);

                Vibration.vibrate();
                props.codeScan(codes)
                //console.log('Scanned:', codes);
            }
        },
    });
    const device = useCameraDevice('back');

    if (!device) return null;

    return (
        <View style={styles.container}>
            <Camera
                style={{ flex: 1 }}
                device={device}
                isActive={true}
                codeScanner={!scanned ? codeScanner : undefined}
                torch={'off'}
                enableZoomGesture={false}
                scanArea={scanArea}
            />
            <View
                style={[
                    styles.frame,
                    { top: frameTop-50, left: frameLeft, width: frameSize, height: frameSize },
                ]}

            >
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
            </View>
        </View>
    )


};

const BORDER_WIDTH = 4;
const CORNER_SIZE = 30;

const styles = StyleSheet.create({
    container: { flex: 1 },
    frame: {
        position: 'absolute',
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

export default CameraWrapper;