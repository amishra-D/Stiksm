import React, { useRef, useEffect } from 'react';
import { Text, View, Animated, StyleSheet } from 'react-native';

export default function Loader() {
  const dot1 = useRef(new Animated.Value(1)).current;
  const dot2 = useRef(new Animated.Value(1)).current;
  const dot3 = useRef(new Animated.Value(1)).current;
  const dot4 = useRef(new Animated.Value(1)).current;
  const dot5 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = (dot, delay) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1.5,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          
        ])
      );
    };

    const anim1 = pulse(dot1, 0);
    const anim2 = pulse(dot2, 120);
    const anim3 = pulse(dot3, 200);
    const anim4 = pulse(dot4, 300);
    const anim5 = pulse(dot5, 400);

    anim1.start();
    anim2.start();
    anim3.start();
    anim4.start();
    anim5.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
      anim4.stop();
      anim5.stop();

    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.dot, 
          { transform: [{ scale: dot1 }] }
        ]} 
      />
      <Animated.View 
        style={[
          styles.dot, 
          { transform: [{ scale: dot2 }] }
        ]} 
      />
      <Animated.View 
        style={[
          styles.dot, 
          { transform: [{ scale: dot3 }] }
        ]} 
      />
      <Animated.View 
        style={[
          styles.dot, 
          { transform: [{ scale: dot4 }] }
        ]} 
      />
      <Animated.View 
        style={[
          styles.dot, 
          { transform: [{ scale: dot5 }] }
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 12,
  },
  dot: {
    width: 4,
    height: 24,
    backgroundColor: '#adff2f',
  },
});