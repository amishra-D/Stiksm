import React from 'react';
import { ScrollView, StatusBar, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const quoteCategories = [
  {
    title: "Kanye West Would Say",
    icon: "musical-notes",
  },
  {
    title: "Andrew Tate Would Say",
    icon: "car-sport",
  },
  {
    title: "Elon Musk Would Say",
    icon: "rocket",
  },
  {
    title: "Jordan Peterson Would Say",
    icon: "book",
  },
  {
    title: "Ben Shapiro Would Say",
    icon: "megaphone",
  },
  {
    title: "Matt Walsh Would Say",
    icon: "mic",
  },
  {
    title: "Donald Trump Would Say",
    icon: "flag",
  },
  {
    title: "Joe Rogan Would Say",
    icon: "fitness",
  }
];

export default function HomePage() {
    const navigation = useNavigation();
    const handleCategoryPress = (category) => {
    navigation.navigate('Quote', { 
      categoryTitle: category.title,
      iconName: category.icon
    });
  };
  return (
    <>
        <View className="p-6 flex-row items-center justify-between border-b border-neutral-800">
          <Text className="text-white text-2xl font-light tracking-tight">Quote Collections</Text>
          <TouchableOpacity className="p-2">
            <Ionicons name="search-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          className="px-5 pb-8 mt-1"
          showsVerticalScrollIndicator={false}
        >
          {quoteCategories.map((category, index) => (
            <TouchableOpacity
              key={`category-${index}`}
              activeOpacity={0.9}
              className="mb-4"
              onPress={()=>handleCategoryPress(category)}
            >
              <View className="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900/50">
                <LinearGradient
                  colors={['rgba(23,23,23,0.8)', 'rgba(38,38,38,0.6)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="h-32"
                >
                  <View className="flex-1 p-5 justify-between">
                    <View className="flex-row items-center">
                      <View className="bg-neutral-800 p-3 rounded-lg border border-neutral-700">
                        <Ionicons name={category.icon} size={20} color="#a3a3a3" />
                      </View>
                      <Text className="text-neutral-100 text-lg font-medium ml-3">
                        {category.title}
                      </Text>
                    </View>
                    
                    <View className="flex-row justify-between items-center mt-4">
                      <View className="bg-neutral-800/50 px-3 py-1 rounded-full border border-neutral-700">
                        <Text className="text-neutral-300 text-xs font-medium">
                          50+ quotes
                        </Text>
                      </View>
                      <View className="bg-neutral-800 p-2 rounded-full">
                        <Ionicons name="chevron-forward" size={16} color="#a3a3a3" />
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
</>
  );
}