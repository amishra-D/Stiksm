import React, { useState, useRef } from 'react';
import { Animated, Easing, View, StyleSheet, Text,TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';

const data = [
  { title: "Kanye West", icon: "musical-notes" },
  { title: "Andrew Tate", icon: "car-sport" },
  { title: "Elon Musk", icon: "rocket" },
  { title: "Jordan Peterson", icon: "book" },
  { title: "Ben Shapiro", icon: "megaphone" },
  { title: "Matt Walsh", icon: "mic" },
  { title: "Donald Trump", icon: "flag" },
  { title: "Joe Rogan", icon: "fitness" },
];

const Chatsec = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const handleFocus = () => {
    setIsFocus(true);
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    setIsFocus(false);
    Animated.timing(rotateAnim, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const renderItem = (item, index, isSelected) => {
    return (
      <View
        style={[
          styles.item,
          isSelected && styles.selectedItem
        ]}
      >
        <Ionicons
          name={item.icon}
          size={20}
          color="white"
          style={styles.itemIcon}
        />
        <Text style={styles.itemText}>{item.title}</Text>
        {isSelected && (
          <Ionicons
            name="checkmark"
            size={20}
            color="#3B82F6"
            style={styles.checkIcon}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Chat With</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && styles.focusedDropdown]}
        containerStyle={styles.dropdownContainer} 
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        search
        maxHeight={300}
        labelField="title"
        valueField="title"
        placeholder={!isFocus ? "Select a personality" : "..."}
        searchPlaceholder="Search personalities..."
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={item => {
          setValue(item.title);
          handleBlur();
        }}
        renderLeftIcon={() => (
          <Ionicons
            name="people"
            size={20}
            color={isFocus ? '#3B82F6' : '#9CA3AF'}
            style={styles.icon}
          />
        )}
        renderRightIcon={() => (
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <Ionicons
              name="chevron-down"
              size={16}
              color={isFocus ? '#3B82F6' : '#9CA3AF'}
            />
          </Animated.View>
        )}
        renderItem={renderItem}
        dropdownMenuStyle={styles.dropdownMenuStyle}
        itemContainerStyle={styles.itemContainer}
        itemTextStyle={styles.itemText}
        activeColor="black"
        searchQuery={(keyword, labelValue) =>
          labelValue.toLowerCase().includes(keyword.toLowerCase())
        }
      />
      <TouchableOpacity
                   className="bg-neutral-800 px-6 py-4 rounded-lg border border-neutral-700 active:bg-neutral-700 mt-10"
                   activeOpacity={0.7}
                 >
                   <Text className="text-neutral-300 font-medium text-md">Proceed</Text>
                 </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 24,
    alignItems: 'center',
    justifyContent:'center'
  },
  headerText: {
    alignContent:'flex-start',
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  dropdown: {
    width: '100%',
    height: 50,
    borderColor: '#374151',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#111827',
  },
  focusedDropdown: {
    borderColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  placeholderStyle: {
    color: '#9CA3AF',
    fontSize: 16,
  },
  selectedTextStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  dropdownContainer: {
    backgroundColor: 'black',
    borderRadius: 12,
    borderColor: '#374151',
    borderWidth: 1,
  },
  dropdownMenuStyle: {
    backgroundColor: 'black',
    borderColor: '#374151',
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 8,
  },
  itemContainer: {
    backgroundColor: 'black',
    borderRadius: 8,
  },
  inputSearchStyle: {
    height: 40,
    color: 'white',
    fontSize: 16,
    backgroundColor: 'black',
    borderRadius: 8,
    borderBottomWidth: 0,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 12,
  },
  item: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  selectedItem: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  itemIcon: {
    marginRight: 12,
    color: '#9CA3AF',
  },
  itemText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  checkIcon: {
    marginLeft: 'auto',
  },
});

export default Chatsec;
