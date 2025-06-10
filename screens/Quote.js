import React, { useState, useEffect, useRef } from 'react';
import {
  ScrollView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = "AIzaSyC1JNXkeNAM01sWKScft6be1ZmLUznzWlg";

export default function Quote() {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryTitle, iconName } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      setError(null);

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      const prompt = `Generate 4 short, single-line quotes in the style of ${categoryTitle.replace(' Quotes', '')}. Separate them with "||"`;

      const result = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      });

      const response = await result.response;
      const text = response.text();

      const quotesArray = text.split("||").map(q => q.trim()).filter(q => q.length > 0);

      if (!quotesArray.length) {
        throw new Error("No quotes returned");
      }

      setQuotes(quotesArray);
    } catch (err) {
      console.error("Error fetching quotes:", err);
      setError("You're out of free quota or the model is unavailable. Try again later.");
      setQuotes([
        "Sample quote 1",
        "Sample quote 2",
        "Sample quote 3",
        "Sample quote 4"
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewQuote = () => {
    fetchQuotes();
  };

  useEffect(() => {
    fetchQuotes();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  if (loading && quotes.length === 0) {
    return (
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-neutral-950 justify-center items-center">
          <ActivityIndicator size="large" color="#a3a3a3" />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        className="flex-1 bg-neutral-950"
        edges={['top']}
        style={{ paddingTop: StatusBar.currentHeight }}
      >
        <Animated.View className="flex-1 p-6" style={{ opacity: fadeAnim }}>
          <View className="flex-row items-center mb-8">
            <View className="bg-neutral-800 p-3 rounded-lg mr-4 border border-neutral-700">
              <Ionicons name={iconName} size={24} color="#a3a3a3" />
            </View>
            <Text className="text-neutral-100 text-2xl font-light tracking-tight">
              {categoryTitle}
            </Text>
          </View>

          <LinearGradient
            colors={['rgba(38,38,38,0.7)', 'rgba(23,23,23,0.9)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="p-6 rounded-xl border border-neutral-800 mb-8 min-h-40"
          >
            {loading ? (
              <View className="flex-1 justify-center items-center">
                <ActivityIndicator color="#a3a3a3" />
              </View>
            ) : error ? (
              <Text className="text-neutral-300">{error}</Text>
            ) : (
              <>
                <Text className="text-neutral-200 text-2xl mb-6 font-light italic leading-relaxed">
                  "{quotes[0]}"
                </Text>
                <View className="border-t border-neutral-800 pt-4">
                  <Text className="text-neutral-500 text-sm">
                    — {categoryTitle.replace(' Quotes', '')}
                  </Text>
                </View>
              </>
            )}
          </LinearGradient>

          <View className="flex-row justify-center gap-4 mb-6">
            <TouchableOpacity
              className="bg-neutral-800 px-6 py-4 rounded-lg border border-neutral-700 active:bg-neutral-700"
              activeOpacity={0.7}
              onPress={handleNewQuote}
              disabled={loading}
            >
              <Text className="text-neutral-300 font-medium">
                {loading ? 'Loading...' : 'Another One'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-neutral-800 px-6 py-4 rounded-lg border border-neutral-700 active:bg-neutral-700"
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('Chat', {
                  categoryTitle,
                  iconName,
                });
              }}
            >
              <Text className="text-neutral-300 font-medium">
                Converse with {categoryTitle.split(' ')[0]}
              </Text>
            </TouchableOpacity>
          </View>

          {quotes.length > 1 && (
            <View className="mt-8 border-t border-neutral-800 pt-6">
              <Text className="text-neutral-400 mb-4">
                More from {categoryTitle.replace(' Quotes', '')}
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-3">
                {quotes.slice(1).map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    className="bg-neutral-900 p-4 rounded-lg w-64 border border-neutral-800"
                    activeOpacity={0.8}
                  >
                    <Text className="text-neutral-300 italic">"{item}"</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
