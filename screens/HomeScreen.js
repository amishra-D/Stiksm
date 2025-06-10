import React from 'react';
import { View, Text, Pressable } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24 }}>Home Screen</Text>

      <Pressable onPress={() => navigation.navigate('Login')} style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18, color: 'blue' }}>Go to Login</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Signup')} style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18, color: 'blue' }}>Go to Signup</Text>
      </Pressable>
    </View>
  );
}
