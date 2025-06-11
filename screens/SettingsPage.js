import { Text, View, TouchableOpacity, Image, Alert, ToastAndroid, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const settingsopt =
  [
    {
      title: "Personalization",
      description: "Customize the experience to suit your style, preferences, and workflow.",
      icon: "code-download",
    },
    {
      title: "Data Control",
      description: "Manage how your data is collected, stored, and shared across the platform.",
      icon: "calendar",
    },
    {
      title: "Voice",
      description: "Enable voice input and commands for a hands-free, conversational interface.",
      icon: "recording",
    },
    {
      title: "Analytics",
      description: "Gain insights through real-time data and usage analytics to track performance.",
      icon: "analytics",
    },
    {
      title: "Language Support",
      description: "Use the platform in multiple languages for a more accessible experience.",
      icon: "globe",
    },
    {
      title: "About",
      description: "Learn more about the mission, team, and story behind the platform.",
      icon: "book",
    },
    {
      title: "Help",
      description: "Get support, access FAQs, and troubleshoot issues with our help resources.",
      icon: "help-circle",
    },
    {
      title: "About",
      description: "Discover our values, background, and what drives our innovation.",
      icon: "book",
    }
  ]

export default function SettingsPage() {
  return (
    <View className='flex flex-col justify-center items-center px-3'>
      <View className='flex flex-col justify-center items-center w-full gap-0.5'>
        <Image
          className="w-24 h-24 mt-2 rounded-full mb-2"
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }} />

        <Text className="text-white text-2xl font-bold">Username</Text>
        <Text className="text-gray-400 text-md">Useremail@gmail.com</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          Alert.alert("Logged Out")
          ToastAndroid.show("Logged Out", ToastAndroid.SHORT)
        }}
        className="bg-gray-200 py-3 mt-3 w-full rounded-xl"
        activeOpacity={0.8}>
        <Text className='text-black font-bold text-xl text-center'> Logout </Text>
      </TouchableOpacity>
      <ScrollView className='w-full'>
        <View className='py-2 px-5 border-t-[0.5px] border-gray-500 w-full mt-8 flex flex-col gap-4 items-start'>
          {settingsopt.map((opt, idx) => {
            return (<TouchableOpacity className="w-full  flex flex-row gap-6 items-center py-4"
              key={idx}
              activeOpacity={0.6}>
              <Ionicons className='self-start' name={opt.icon} size={20} color="#a3a3a3" />
              <View className="flex-1 flex-col">
                <Text className="text-white text-xl font-normal">{opt.title}</Text>
                <Text className="text-[#a3a3a3] text-base font-normal">{opt.description}</Text>
              </View>
            </TouchableOpacity>)
          })}
        </View>
      </ScrollView>
    </View>
  )
}
