import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Smart Traffic Management</Text>
          <Text style={styles.subtitle}>Monitor and optimize your travel</Text>
        </View>

        <View style={styles.featuresContainer}>
          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigation.navigate('SpeedDetection')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="speedometer" size={32} color="#4CAF50" />
            </View>
            <Text style={styles.featureTitle}>Speed Detection</Text>
            <Text style={styles.featureDescription}>
              Detect vehicle speeds using camera and computer vision
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigation.navigate('Route')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="map" size={32} color="#2196F3" />
            </View>
            <Text style={styles.featureTitle}>Route Suggestion</Text>
            <Text style={styles.featureDescription}>
              Get optimal routes based on current traffic conditions
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Traffic Statistics</Text>
          <View style={styles.statsCard}>
            <Text style={styles.statsText}>No data available yet</Text>
            <Text style={styles.statsSubtext}>
              Use the speed detection feature to start collecting data
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  featuresContainer: {
    padding: 15,
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  statsContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  statsText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statsSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
});