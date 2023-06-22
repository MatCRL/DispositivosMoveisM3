import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  TouchableOpacity,
  Text,
} from "react-native";
import Svg, { G, Path } from "react-native-svg";
import { PinchGestureHandler, State } from "react-native-gesture-handler";

export const MapView = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [scale, setScale] = useState(1);
  const baseScale = useRef(new Animated.Value(1)).current;
  const pinchScale = useRef(new Animated.Value(1)).current;
  const zoom = useRef(new Animated.Value(1)).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();
    },
    onPanResponderTerminate: () => {
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();
    },
    onPanResponderGrant: () => {
      pan.setValue({ x: 0, y: 0 });
    },
  });

  const onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: pinchScale } }],
    { useNativeDriver: false }
  );

  const onPinchHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const currentScale = scale * event.nativeEvent.scale;
      setScale(currentScale);

      const diffScale = currentScale / scale;
      const offsetX = (1 - diffScale) * (event.nativeEvent.x - 150);
      const offsetY = (1 - diffScale) * (event.nativeEvent.y - 150);

      Animated.parallel([
        Animated.timing(pan.x, {
          toValue: -offsetX,
          useNativeDriver: false,
        }),
        Animated.timing(pan.y, {
          toValue: -offsetY,
          useNativeDriver: false,
        }),
      ]).start();

      pinchScale.setValue(1);
    }
  };

  const scaleAndPan = Animated.multiply(baseScale, pinchScale);

  const handleZoomIn = () => {
    setScale(scale + 0.1);
  };

  const handleZoomOut = () => {
    setScale(scale - 0.1);
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleZoomIn}>
          <Text style={styles.buttonText}>Zoom In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleZoomOut}>
          <Text style={styles.buttonText}>Zoom Out</Text>
        </TouchableOpacity>
      </View> */}
      <PinchGestureHandler
        onGestureEvent={onPinchGestureEvent}
        onHandlerStateChange={onPinchHandlerStateChange}
      >
        <Animated.View
          style={[
            styles.svgContainer,
            {
              transform: [
                { translateX: pan.x },
                { translateY: pan.y },
                { scale: scaleAndPan },
              ],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <Svg width={300} height={300}>
            <G>
              <Path
                d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
                fill="none"
                stroke="black"
                strokeWidth="5"
              />
            </G>
          </Svg>
        </Animated.View>
      </PinchGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  svgContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 16,
  },
  button: {
    backgroundColor: "#ccc",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
});
