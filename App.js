import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import './global.css';

import Home from './screens/HomeScreen.js';
import Login from './screens/Login.js'
import Signup from './screens/Signup.js'
import HomePage from './screens/HomePage.js'
import Navigation from './screens/Navigation.js';
import  Quote  from './screens/Quote.js';
import  ChatUI  from './screens/ChatUI.js';
import SettingsPage from './screens/SettingsPage.js';
import Chatsec from './screens/Chatsec.js';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}  />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}  />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}  />
                <Stack.Screen name="Chatsec" component={Chatsec} options={{ headerShown: false }}  />
        <Stack.Screen name="SettingsPage" component={SettingsPage} options={{ headerShown: false }}  />
 <Stack.Screen 
          name="App" 
          component={Navigation}  // This renders HomePage, Chatsec, SettingsPage in tabs
          options={{ headerShown: true, headerTintColor:'black' }} 
        />
        <Stack.Screen name="Quote" component={Quote} options={{ headerShown: false }}  />
          <Stack.Screen name="Chat" component={ChatUI} options={{ headerShown: false }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
