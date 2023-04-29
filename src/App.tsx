import {View, Text} from 'react-native';
import React from 'react';
import MapScreen from './screens/MapScreen';
import Draggable from './screens/Draggable';
import AddText from './screens/AddText';
import DrawingCanvas from './screens/Drawing';
import Drawing from './screens/Drawing';

const App = () => {
  return (
    <View>
      <Draggable />
      {/* <Drawing /> */}
    </View>
  );
};

export default App;
