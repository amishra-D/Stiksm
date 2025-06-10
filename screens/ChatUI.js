import React, { useState } from 'react'
import { ScrollView, StatusBar, View, Text, TouchableOpacity,TextInput } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


export default function ChatUI () {
  const navigation = useNavigation();
  const[chats,setchats]=useState({sender:'',chatcontent:''});
  const[istyping,setistyping]=useState(false)
   const route = useRoute();
    const { categoryTitle, iconName } = route.params;
    return (
        <SafeAreaProvider>
              <SafeAreaView className="flex-1 bg-neutral-950" edges={['top']} style={{ paddingTop: StatusBar.currentHeight }}>
      <View className='bg-neutral-950 flex flex-col items-center justify-center'>
<Text className='text-white font-medium text-2xl'>{categoryTitle.split(' ')[0]}</Text>
<View></View>
<TextInput placeholder='Enter a message' className='mb-40 '></TextInput>  
    </View>
      </SafeAreaView>
      </SafeAreaProvider>
    )
}
