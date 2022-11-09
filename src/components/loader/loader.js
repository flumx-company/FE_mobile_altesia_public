import React from 'react';
import {
  StyleSheet, View, Animated, Easing,
} from 'react-native';
import { useSelector } from 'react-redux';
import colors from '../../constants/colors';
import getIsLoading from '../../redux/global/seletors';
import PreloaderTriangleIcon from '../icons/preloader-triangle-icon';

const Loader = () => {
  const spinValue = new Animated.Value(0);
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      },
    ).start();
  }, [fadeAnim]);

  Animated.loop(
    Animated.timing(
      spinValue,
      {
        toValue: 1,
        duration: 600,
        easing: Easing.linear,
        useNativeDriver: true,
      },
    ),
  ).start();

  const greenTriangleTranslateX = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0', '-40'],
  });

  const greenTriangleTranslateY = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0', '70'],
  });

  const orangeTriangleTranslateX = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0', '80'],
  });

  const blueTriangleTranslateX = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0', '-40'],
  });

  const blueTriangleTranslateY = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0', '-70'],
  });

  const orangeTriangleStyles = {
    transform: [{ translateX: orangeTriangleTranslateX }], position: 'absolute', top: 56, left: 48,
  };

  const greenTriangleStyles = {
    transform: [{ translateX: greenTriangleTranslateX, translateY: greenTriangleTranslateY }], position: 'absolute', top: 56, right: 48,
  };

  const blueTriangleStyles = {
    transform: [{ translateX: blueTriangleTranslateX, translateY: blueTriangleTranslateY }], position: 'absolute', bottom: 56, right: 88,
  };

  const isLoading = useSelector(getIsLoading);
  return isLoading && (
    <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
      <View style={styles.triangleContainer}>
        <Animated.View style={orangeTriangleStyles}>
          <PreloaderTriangleIcon color={colors.triangleOrange} />
        </Animated.View>
        <Animated.View style={greenTriangleStyles}>
          <PreloaderTriangleIcon color={colors.triangleGreen} />
        </Animated.View>
        <Animated.View style={blueTriangleStyles}>
          <PreloaderTriangleIcon color={colors.triangleBlue} />
        </Animated.View>
      </View>
    </Animated.View>
  );
};
export default Loader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgLoader,
  },
  triangleContainer: {
    height: 200,
    width: 200,
  },
});
