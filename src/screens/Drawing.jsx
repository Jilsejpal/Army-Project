import React, {useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Svg, {Path} from 'react-native-svg';

const DrawingCanvas = () => {
  const [drawing, setDrawing] = useState('');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(5);
  const pathRef = useRef(null);

  const handleGestureEvent = ({nativeEvent}) => {
    const {translationX, translationY, state} = nativeEvent;
    if (state === 4) {
      return;
    }
    const prevD = pathRef.current ? pathRef.current.attributes.d.value : '';
    const d =
      prevD === ''
        ? `M ${translationX} ${translationY}`
        : `${prevD} L ${translationX} ${translationY}`;
    setDrawing(d);
    pathRef.current.setNativeProps({d: d});
  };

  const handleClear = () => {
    setDrawing('');
  };

  const handleUndo = () => {
    const parts = drawing.split('L');
    parts.pop();
    setDrawing(parts.join('L'));
  };

  const handleStrokeColor = color => {
    setStrokeColor(color);
  };

  const handleStrokeWidth = width => {
    setStrokeWidth(width);
  };

  return (
    <View style={styles.container}>
      <View style={styles.canvasContainer}>
        <Svg style={styles.canvas} height="100%" width="100%">
          <Path
            d={drawing}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            ref={pathRef}
            fill="none"
          />
        </Svg>
      </View>
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={handleClear} style={styles.button}>
          <View style={styles.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleUndo} style={styles.button}>
          <View style={styles.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleStrokeColor('#000000')}
          style={[styles.button, styles.colorButtonBlack]}
        />
        <TouchableOpacity
          onPress={() => handleStrokeColor('#ff0000')}
          style={[styles.button, styles.colorButtonRed]}
        />
        <TouchableOpacity
          onPress={() => handleStrokeColor('#00ff00')}
          style={[styles.button, styles.colorButtonGreen]}
        />
        <TouchableOpacity
          onPress={() => handleStrokeColor('#0000ff')}
          style={[styles.button, styles.colorButtonBlue]}
        />
        <TouchableOpacity
          onPress={() => handleStrokeWidth(5)}
          style={styles.button}>
          <View style={styles.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleStrokeWidth(10)}
          style={styles.button}>
          <View style={styles.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleStrokeWidth(20)}
          style={styles.button}>
          <View style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
      <PanGestureHandler onGestureEvent={handleGestureEvent}>
        <View style={styles.gestureHandler} />
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  canvasContainer: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    overflow: 'hidden',
  },
  canvas: {
    width: '100%',
    height: '100%',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  colorButtonBlack: {
    backgroundColor: '#000000',
  },
  colorButtonRed: {
    backgroundColor: '#ff0000',
  },
  colorButtonGreen: {
    backgroundColor: '#00ff00',
  },
  colorButtonBlue: {
    backgroundColor: '#0000ff',
  },
  gestureHandler: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default DrawingCanvas;
