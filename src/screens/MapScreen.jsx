import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {Canvas, Circle, Paint, Group} from '@shopify/react-native-skia';

const width = 256;
const height = 256;

const MapScreen = () => {
  const r = width / 6;
  return (
    <SafeAreaView>
      <Canvas style={{width, height}}>
        <Group color="lightblue">
          {/* <Circle cx={r} cy={r} r={r} /> */}
          <Group style="stroke" strokeWidth={10}>
            <Circle cx={3 * r} cy={3 * r} r={r} />
          </Group>
        </Group>
      </Canvas>
    </SafeAreaView>
  );
};

export default MapScreen;
