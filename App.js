import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LandingPage from "./src/screens/LandingScreen/LandingScreen";
import LoginScreen from "./src/screens/Loginscreen/LoginScreen";
import SignUpScreen from "./src/screens/SigninScreen/SignUpScreen";
import Dashboard from "./src/screens/Dashboard/Dashboard";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        {/* Hide header only on LandingPage */}
        <Stack.Screen 
          name="LandingPage" 
          component={LandingPage} 
          options={{ headerShown: false }}
        />

        {/* Keep header + automatic back button */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerTitle: "Login" }}
        />

        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen} 
          options={{ headerTitle: "Create Account" }}
        />

        <Stack.Screen 
          name="Dashboard" 
          component={Dashboard} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}