import React, {useEffect, useState} from 'react';
import { StyleSheet, StatusBar, Dimensions, Text, View } from 'react-native';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {RNHoleView} from 'react-native-hole-view';


const Barcodescanner = ({navigation}) => {
    const devices = useCameraDevices();
    const device = devices.back;
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [frameProcessor, barcodes] = useScanBarcodes([
        BarcodeFormat.ALL_FORMATS,
    ]);

    const [hasPermission, setHasPermission] = useState(false);
    const [isScanned, setIsScanned] = useState(false);

    useEffect(() => {
        checkCameraPermission();
    }, []);
    
    const checkCameraPermission = async () => {
        const status = await Camera.getCameraPermissionStatus();
        setHasPermission(status === 'authorized');
    };
    
    useEffect(() => {
        toggleActiveState();
        return () => {
          barcodes;
        };
    }, [barcodes]);

    const toggleActiveState = async () => {
        if (barcodes && barcodes.length > 0 && isScanned === false) {
          setIsScanned(true);
          barcodes.forEach(async (scannedBarcode) => {
            if (scannedBarcode.rawValue !== '') {
                navigation.navigate('Ronda', scannedBarcode.rawValue);
            }
          });
        }
    };

   
      
    return(
        (device != null &&
            hasPermission) ? (
                <>
                    <StatusBar barStyle="light-content" backgroundColor="#000000" />
                    <Camera
                        style={StyleSheet.absoluteFill}
                        device={device}
                        isActive={!isScanned}
                        frameProcessor={frameProcessor}
                        frameProcessorFps={5}
                        audio={false}
                    />
                    <RNHoleView
                        holes={[
                        {
                            x: 50,
                            y: (windowHeight / 2) - ((windowWidth - 50) / 2),
                            width: windowWidth - 100,
                            height: windowWidth - 100,
                            borderRadius: 10,
                        },
                        ]}
                        style={styles.rnholeView}
                    />
                </>
            ) : 
            <View style={styles.noPermissionView}>
                <Text>Please enable camera permission inside the app settings</Text>
               
            </View>
    )
}

// Styles:
const styles = StyleSheet.create({
    noPermissionView:{
        alignItems: 'center',
        marginTop: 40
    },
    rnholeView: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
});

export default Barcodescanner;