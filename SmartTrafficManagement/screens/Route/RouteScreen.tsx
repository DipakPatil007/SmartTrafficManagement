import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Polyline } from 'react-native-maps';

export default function RouteScreen() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [routeFound, setRouteFound] = useState(false);

  // Mock initial region (San Francisco), set this default route
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Mock route coordinates
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  // Mock function to find route
  // In a real app, this would call the OpenStreetMap API
  const findRoute = () => {
    if (!origin || !destination) {
      alert('Please enter both origin and destination');
      return;
    }

    setIsSearching(true);

    // Simulate API call delay
    setTimeout(() => {
      // Mock route data (simple route in San Francisco)
      const mockRoute = [
        { latitude: 37.78825, longitude: -122.4324 },
        { latitude: 37.79825, longitude: -122.4224 },
        { latitude: 37.80825, longitude: -122.4124 },
        { latitude: 37.81825, longitude: -122.4024 },
      ];

      setRouteCoordinates(mockRoute);
      setRouteFound(true);
      setIsSearching(false);

      // Update map region to show the route
      setRegion({
        latitude: 37.80325,
        longitude: -122.4174,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0221,
      });
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="location" size={20} color="#007AFF" />
          <TextInput
            style={styles.input}
            placeholder="Enter starting point"
            value={origin}
            onChangeText={setOrigin}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="navigate" size={20} color="#FF3B30" />
          <TextInput
            style={styles.input}
            placeholder="Enter destination"
            value={destination}
            onChangeText={setDestination}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.searchButton,
            isSearching && styles.searchingButton
          ]}
          onPress={findRoute}
          disabled={isSearching}
        >
          {isSearching ? (
            <Text style={styles.searchButtonText}>Searching...</Text>
          ) : (
            <Text style={styles.searchButtonText}>Find Route</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={region}
        >
          {routeFound && (
            <>
              <Marker
                coordinate={routeCoordinates[0]}
                title="Start"
                pinColor="#007AFF"
              />
              <Marker
                coordinate={routeCoordinates[routeCoordinates.length - 1]}
                title="Destination"
                pinColor="#FF3B30"
              />
              <Polyline
                coordinates={routeCoordinates}
                strokeColor="#007AFF"
                strokeWidth={4}
              />
            </>
          )}
        </MapView>
      </View>

      {routeFound && (
        <View style={styles.routeInfoContainer}>
          <View style={styles.routeInfoItem}>
            <Ionicons name="time-outline" size={20} color="#007AFF" />
            <Text style={styles.routeInfoText}>15 min</Text>
          </View>
          <View style={styles.routeInfoItem}>
            <Ionicons name="speedometer-outline" size={20} color="#007AFF" />
            <Text style={styles.routeInfoText}>5.2 km</Text>
          </View>
          <View style={styles.routeInfoItem}>
            <Ionicons name="car-outline" size={20} color="#007AFF" />
            <Text style={styles.routeInfoText}>Light traffic</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  searchingButton: {
    backgroundColor: '#999',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  routeInfoContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    justifyContent: 'space-around',
  },
  routeInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeInfoText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
  },
});