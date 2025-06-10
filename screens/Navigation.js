import React, { Component } from 'react'
import { ScrollView, StatusBar, View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
export default function Navigation() {
    return (
      
        <View className="bg-neutral-800 p-4 flex-row justify-around">
          <TouchableOpacity className="items-center">
            <Ionicons name="home" size={24} color="white" />
            <Text className="text-white text-xs mt-1">Home</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <Ionicons name="star" size={24} color="gray" />
            <Text className="text-gray-400 text-xs mt-1">Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <Ionicons name="settings" size={24} color="gray" />
            <Text className="text-gray-400 text-xs mt-1">Settings</Text>
          </TouchableOpacity>
        </View>
    )
  }
