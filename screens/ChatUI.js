import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar 
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function ChatUI() {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryTitle } = route.params;
  
  const [messages, setMessages] = useState([
    { id: 1, text: 'Welcome to your private conversation.', sender: 'system' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        sender: 'user',
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      
      setTimeout(() => {
        const replyMessage = {
          id: messages.length + 2,
          text: 'Your message has been received.',
          sender: 'system',
        };
        setMessages(prev => [...prev, replyMessage]);
      }, 1500);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-black" edges={['top']}>
        <StatusBar barStyle="light-content" />
        
        <View className="flex-row items-center justify-between p-6">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="p-1"
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          
          <Text className="text-white text-xl font-light tracking-tight">
            {categoryTitle.toUpperCase()}
          </Text>
          
          <View className="w-6" />
        </View>
        
        <ScrollView 
          className="flex-1 px-6"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View 
              key={message.id} 
              className={`mb-6 ${message.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <View className={`px-4 py-3 rounded-lg 
                ${message.sender === 'user' ? 'bg-white' : 'bg-neutral-800 border border-neutral-700'}`}
              >
                <Text className={message.sender === 'user' ? 'text-black' : 'text-neutral-300'}>
                  {message.text}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
        
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="absolute bottom-0 left-0 right-0 bg-black px-6 pb-10 pt-4 border-t border-neutral-800"
        >
          <View className="flex-row items-center">
            <TextInput
              placeholder="Type message..."
              placeholderTextColor="#555"
              className="flex-1 text-white border-b border-neutral-700 pb-3 pr-10"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSend}
              selectionColor="#fff"
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity
              onPress={handleSend}
              className="absolute right-0 bottom-3"
              disabled={!inputText.trim()}
            >
              <Ionicons 
                name="arrow-up-circle" 
                size={28} 
                color={inputText.trim() ? "white" : "#333"} 
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}