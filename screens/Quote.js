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
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import Loader from '../Components/Loader';
export default function Quote() {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryTitle, iconName } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const parseQuotes = (text) => {
  const cleanText = text.replace(/^[^"]*?(?=\*\*|["A-Za-z])/g, '').trim();

  let quotes = [];

  if (cleanText.includes('||')) {
    quotes = cleanText.split('||').map(q =>
      q.replace(/\*\*/g, '').replace(/^"+|"+$/g, '').trim()
    );
  } else {
    quotes = cleanText
      .split(/\n+/)
      .map(q => q.replace(/\*\*/g, '').replace(/^"+|"+$/g, '').trim())
      .filter(q => q.length > 0);
  }

  return quotes;
};


  const fetchQuotes = async () => {
    try {
      setLoading(true);
      setError(null);

const prompt = `Respond with exactly 4 one-line quotes in the style of ${categoryTitle.replace(' Quotes', '')}. No introductions, no formatting, no asterisks. Separate each quote using double pipe characters (||). Example: Quote 1 || Quote 2 || Quote 3 || Quote 4`;

     const response = await axios.post(
  'https://openrouter.ai/api/v1/chat/completions',
  {
    model: 'meta-llama/llama-3-8b-instruct',
    messages: [
  {
    role: 'system',
    content: `You are a quote generator. Only output 4 one-line quotes separated by double pipe characters (||). Do not include any headings, explanations, or markdown.`,
  },
  {
    role: 'user',
    content: prompt,
  },
],
    max_tokens: 100,
    temperature: 1.0,
  },
  {
    headers: {
      Authorization: 'Bearer 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', // your actual key
      'Content-Type': 'application/json',
    },
  }
);
      const rawText = response.data.choices[0].message.content;

const quotesArray = parseQuotes(rawText);

if (!quotesArray.length) {
  throw new Error('No valid quotes returned');
}
setQuotes(quotesArray);

    } catch (err) {
      console.error('OpenRouter error:', err.response?.data || err.message);
      setError("You're out of quota or the model failed. Showing fallback quotes.");
      setQuotes([
        "I don't follow trends, I set them.",
        "Confidence isn't optional, it's required.",
        "Be the headline, not the footnote.",
        "Speak like the world listens."
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
<Loader/>
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
<Loader/>
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
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {quotes.slice(1).map((item, index) => (
                  <Animatable.View 
                   animation="slideInRight"  easing="ease-in-out"  duration={400} delay={index * 20}
                    key={index}
                    className="bg-neutral-900 p-4 rounded-lg w-64 border border-neutral-800 mr-3"
                  >
                    <Text className="text-neutral-300 italic">"{item}"</Text>
                  </Animatable.View>
                ))}
              </ScrollView>
            </View>
          )}
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
