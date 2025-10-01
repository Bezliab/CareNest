import {
  SafeAreaProvider,

} from 'react-native-safe-area-context';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import Dashboard from './src/screens/Dashboard';

const Stack = createNativeStackNavigator();
function App() {

  return (
    <SafeAreaProvider>
       <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="Dashboard" component={Dashboard} /> 
            </Stack.Navigator>
          </NavigationContainer>
    </SafeAreaProvider>
  );
}


export default App;