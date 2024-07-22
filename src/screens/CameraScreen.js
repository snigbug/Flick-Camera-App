// screens/CameraScreen.js
import React, { useEffect, useState, useRef } from 'react';
import { View, Button, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useFrameProcessor } from 'react-native-vision-camera';
import { scanFaces } from 'vision-camera-face-detector';
import { runOnJS } from 'react-native-reanimated';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [faces, setFaces] = useState([]);
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.front;

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const detectedFaces = scanFaces(frame);
    runOnJS(setFaces)(detectedFaces);
  }, []);

  const takePicture = async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto();
      navigation.navigate('Feed', { photo: photo.path });
    }
  };


  return (
    <View style={styles.container}>
      {device && hasPermission && (
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
          frameProcessor={frameProcessor}
          frameProcessorFps={1}
        />
      )}
      {faces.map((face, index) => (
        <View
          key={index}
          style={[
            styles.faceBox,
            {
              top: face.bounds.y * screenHeight,
              left: face.bounds.x * screenWidth,
              width: face.bounds.width * screenWidth,
              height: face.bounds.height * screenHeight,
            },
          ]}
        />
      ))}
      <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
        <Text style={styles.captureButtonText}>Capture</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  faceBox: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 4,
  },
  captureButton: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    marginLeft: -50,
    width: 100,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonText: {
    fontSize: 16,
    color: 'black',
  },
});

export default CameraScreen;