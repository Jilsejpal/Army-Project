import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Image,
  SafeAreaView,
  TextInput,
} from 'react-native';

const AddText = () => {
  const [textStyles, setTextStyles] = useState({
    left: 0,
    top: 0,
  });
  const textInputRef = useRef(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      setTextStyles(prevStyles => ({
        left: prevStyles.left + gesture.dx,
        top: prevStyles.top + gesture.dy,
      }));
    },
  });

  const handleTextInputPress = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{height: 500, width: 500, paddingTop: 50, position: 'relative'}}
        source={require('../../assets/images/map.jpg')}
      />
      <View
        style={[styles.textInputContainer, textStyles]}
        {...panResponder.panHandlers}
        // onLayout={handleLayout}
        onTouchEnd={handleTextInputPress}>
        <TextInput
          ref={textInputRef}
          style={styles.textInput}
          placeholder="Type here..."
          onChangeText={text => console.log(text)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  textInputContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  textInput: {
    height: 40,
    fontSize: 16,
  },
});

export default AddText;
