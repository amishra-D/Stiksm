import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import HomePage from './HomePage';
import SettingsPage from './SettingsPage';
import Chatsec from './Chatsec';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const renderScene = SceneMap({
  first: HomePage,
  second: Chatsec,
  third: SettingsPage,
});

const routes = [
  { key: 'first', title: 'Home',icon:<Feather name="home" color="#000" size={24} /> },
  { key: 'second', title: 'Chat',icon:<MaterialCommunityIcons name="chat-outline" color="#000" size={24} /> },
  { key: 'third', title: 'Settings',icon:<SimpleLineIcons name="settings" color="#000" size={24} /> },
];

export default function Navigation() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: 'black' }}
      labelStyle={{ color: 'white' }}
    />
  );

  return (
<SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-black py-5" edges={['right', 'left']}>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
    </SafeAreaView>
        </SafeAreaProvider>
  );
}