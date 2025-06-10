import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import './global.css';

import Home from './screens/HomeScreen.js';
import Login from './screens/Login.js'
import Signup from './screens/Signup.js'
import HomePage from './screens/HomePage.js'
import Navigation from './screens/Navigation.js';
import  Quote  from './screens/Quote.js';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}  />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}  />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}  />
        <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }}  />
        <Stack.Screen name="Quote" component={Quote} options={{ headerShown: false }}  />
      </Stack.Navigator>
      <Navigation></Navigation>
    </NavigationContainer>
  );
}
