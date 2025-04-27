import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SpeedDetectionScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedSpeed, setDetectedSpeed] = useState<number | null>(null);
  
  // Mock function to simulate speed detection
  // In a real app, this would use TensorFlow.js for computer vision
  const detectSpeed = () => {
    setIsDetecting(true);
    
    // Simulate processing delay
    setTimeout(() => {
      // Generate random speed between 20 and 80 km/h
      const speed = Math.floor(Math.random() * 60) + 20;
      setDetectedSpeed(speed);
      setIsDetecting(false);
    }, 2000);
  };
  
  if (!permission) {
    // Camera permissions are still loading
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>
            We need camera permission to detect vehicle speeds
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        {/* Overlay UI */}
        <View style={styles.overlay}>
          {/* Speed detection frame */}
          <View style={styles.detectionFrame}>
            {detectedSpeed !== null && (
              <View style={styles.speedDisplay}>
                <Text style={styles.speedText}>{detectedSpeed}</Text>
                <Text style={styles.speedUnit}>km/h</Text>
              </View>
            )}
          </View>
          
          {/* Controls */}
          <View style={styles.controlsContainer}>
            <TouchableOpacity 
              style={styles.controlButton}
              onPress={toggleCameraFacing}
            >
              <Ionicons name="camera-reverse" size={24} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.detectButton,
                isDetecting && styles.detectingButton
              ]}
              onPress={detectSpeed}
              disabled={isDetecting}
            >
              {isDetecting ? (
                <Text style={styles.detectButtonText}>Detecting...</Text>
              ) : (
                <Text style={styles.detectButtonText}>Detect Speed</Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.controlButton}
              onPress={() => Alert.alert('Info', 'Point camera at moving vehicles to detect their speed')}
            >
              <Ionicons name="information-circle" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  detectionFrame: {
    flex: 1,
    margin: 40,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speedDisplay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  speedText: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  speedUnit: {
    color: 'white',
    fontSize: 18,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detectButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  detectingButton: {
    backgroundColor: '#FF9500',
  },
  detectButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});