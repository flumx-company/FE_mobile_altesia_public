import React, { useRef } from 'react';
import {
  ScrollView, useWindowDimensions, StyleSheet, SafeAreaView, View, Platform, StatusBar,
} from 'react-native';
import colors from '../../constants/colors';
import FixedBtn from '../buttons/fixed-btn/fixed-btn';

const ScreenContainer = ({
  children,
  fullWidth = false,
  withScroll = true,
  withFixedBtn = false,
  typeFixedBtn = 'plus',
  handleFixedBtn = () => {},
  handleScroll = () => {},
}) => {
  const { width, height } = useWindowDimensions();
  const scrollRef = useRef(null);

  const outsideContainerStyles = {
    ...styles.container,
    width,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  };

  const insideContainer = {
    ...styles.scrollContainer,
    width: fullWidth ? width : width - 30,
  };

  const withScrollContainer = {
    ...styles.scrollContainer,
    width: fullWidth ? width : width - 30,
  };

  return (
    <SafeAreaView style={outsideContainerStyles}>
      {withScroll
        ? (
          <ScrollView
            contentContainerStyle={width < height ? withScrollContainer : styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            ref={scrollRef}
          >
            {children}
          </ScrollView>
        ) : (
          <View style={insideContainer}>
            {children}
          </View>
        )}
      {withFixedBtn && <FixedBtn onPress={typeFixedBtn === 'arrowTop' ? handleScroll : handleFixedBtn} type={typeFixedBtn} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    alignItems: 'center',
    backgroundColor: colors.bgPrimary,
  },
  scrollContainer: {
    alignItems: 'center',
    minHeight: '100%',
  },
});

export default ScreenContainer;
