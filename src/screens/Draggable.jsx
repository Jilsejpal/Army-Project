import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Image,
  SafeAreaView,
  TextInput,
} from 'react-native';

const Circle = () => {
  const [circleStyles, setCircleStyles] = useState({
    left: 300,
    top: 730,
  });

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      setCircleStyles(prevStyles => ({
        left: prevStyles.left + gesture.dx,
        top: prevStyles.top + gesture.dy,
      }));
    },
  });

  return (
    <View style={[styles.circle, circleStyles]} {...panResponder.panHandlers} />
  );
};

const AddText = () => {
  const [textStyles, setTextStyles] = useState({
    left: 30,
    top: 30,
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

const Draggable = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          height: 700,
          width: 500,
          position: 'relative',
        }}
        source={require('../../assets/images/map.jpg')}
      />
      <AddText />
      <AddText />
      <AddText />
      <Circle />
      <Circle />
      <Circle />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'red',
    position: 'absolute',
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

export default Draggable;
