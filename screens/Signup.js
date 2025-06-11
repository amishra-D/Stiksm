import { View, Text, TextInput, Pressable } from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Signup() {
  return (
    <SafeAreaProvider>
    <View className="flex-1 w-full items-center bg-[#f8f9fa]">
      <LinearGradient
        colors={['#ddff00', '#a2d400']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="w-full h-1/3 justify-center items-center"
        style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
      >
        <View className="flex flex-row items-center">
          <Ionicons size={40} name="football" color="#1a1a1a" />
          <Text className="text-5xl font-extrabold text-black ml-2">SticksGasm</Text>
        </View>
        <Text className="text-lg text-gray-700 mt-2">Join the ultimate sports experience</Text>
      </LinearGradient>

      <View className="w-full h-2/3 bg-black rounded-t-[40px] px-8 pt-12 -mt-10 shadow-lg">
        <Text className="text-3xl font-bold mb-6 text-center text-gray-400">Create Account</Text>

        <View className="flex-row items-center w-full h-14 px-4 mb-4 bg-gray-100 rounded-xl">
          <MaterialIcons name="person" size={22} color="#6b7280" />
          <TextInput
            className="flex-1 ml-3 text-base text-gray-800"
            placeholder="Full Name"
            placeholderTextColor="#9ca3af"
            autoCapitalize="words"
          />
        </View>

        <View className="flex-row items-center w-full h-14 px-4 mb-4 bg-gray-100 rounded-xl">
          <MaterialIcons name="email" size={22} color="#6b7280" />
          <TextInput
            className="flex-1 ml-3 text-base text-gray-800"
            placeholder="Email"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="flex-row items-center w-full h-14 px-4 mb-4 bg-gray-100 rounded-xl">
          <FontAwesome name="lock" size={22} color="#6b7280" />
          <TextInput
            className="flex-1 ml-3 text-base text-gray-800"
            placeholder="Password"
            placeholderTextColor="#9ca3af"
            secureTextEntry
          />
        </View>

        <View className="flex-row items-center w-full h-14 px-4 mb-6 bg-gray-100 rounded-xl">
          <FontAwesome name="lock" size={22} color="#6b7280" />
          <TextInput
            className="flex-1 ml-3 text-base text-gray-800"
            placeholder="Confirm Password"
            placeholderTextColor="#9ca3af"
            secureTextEntry
          />
        </View>

        <Pressable 
          className="w-full h-14 bg-[#ddff00] rounded-xl items-center justify-center shadow-sm mb-5"
          style={({ pressed }) => ({
            opacity: pressed ? 0.8 : 1,
            transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }]
          })}
        >
          <Text className="text-black text-lg font-bold">Sign Up</Text>
        </Pressable>

        <Text className="text-gray-500 text-xs text-center mb-6">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </Text>

        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="mx-4 text-gray-400">or</Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>

        <View className="flex-row justify-center space-x-4">
          <Pressable className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
            <FontAwesome name="google" size={20} color="#DB4437" />
          </Pressable>
          <Pressable className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
            <FontAwesome name="facebook" size={20} color="#4267B2" />
          </Pressable>
          <Pressable className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
            <FontAwesome name="apple" size={20} color="#000000" />
          </Pressable>
        </View>

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-500">Already have an account? </Text>
          <Pressable>
            <Text className="text-[#ddff00] font-bold">Login</Text>
          </Pressable>
        </View>
      </View>
    </View>
    </SafeAreaProvider>
  );
}