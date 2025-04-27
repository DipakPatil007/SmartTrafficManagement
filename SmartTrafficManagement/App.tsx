import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

// Screens
import HomeScreen from './screens/Home/HomeScreen';
import SpeedDetectionScreen from './screens/SpeedDetection/SpeedDetectionScreen';
import RouteScreen from './screens/Route/RouteScreen';
import SettingsScreen from './screens/Settings/SettingsScreen';
import LoginScreen from './screens/Login/LoginScreen';
import SignupScreen from './screens/Login/SignupScreen';

// Botttom tab navigator to handle the navigation
const Tab = createBottomTabNavigator();
// Stack navigator to handle screens
const Stack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator()

function SpeedDetectionStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SpeedDetectionMain"
        component={SpeedDetectionScreen}
        options={{ headerTitle: 'Speed Detection' }}
      />
    </Stack.Navigator>
  );
}

function RouteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RouteMain"
        component={RouteScreen}
        options={{ headerTitle: 'Route Suggestion' }}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'help-circle-outline'; // Default icon

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'SpeedDetection') {
            iconName = focused ? 'speedometer' : 'speedometer-outline';
          } else if (route.name === 'Route') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="SpeedDetection"
        component={SpeedDetectionStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Route"
        component={RouteStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

// Old code to do this navigation flow 
// export default function App() {
//   return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         <MainTabs />
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// }

// New App component with Login and Signup 
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="LoginScreen">
          <RootStack.Screen name="LoginScreen" component={LoginScreen} />
          <RootStack.Screen name="SignupScreen" component={SignupScreen} />
          <RootStack.Screen name="MainTabs" component={MainTabs} />
        </RootStack.Navigator>
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  );
}