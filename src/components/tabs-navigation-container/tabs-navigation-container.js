import React from 'react';
import {
  Text, TouchableOpacity, View, StyleSheet, Platform, useWindowDimensions,
} from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
/* eslint-disable no-nested-ternary */
const TabsNavigationContainer = ({ state, descriptors, navigation }) => {
  const { width, height } = useWindowDimensions();
  return (
    <View>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const Icon = options.tabBarIcon;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          return (
            <TouchableOpacity
              key={label}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tab}
            >
              <Icon color={isFocused ? options.tabBarActiveTintColor : options.tabBarInactiveTintColor} />
              <Text style={{ ...{ color: isFocused ? options.tabBarActiveTintColor : options.tabBarInactiveTintColor }, ...styles.label }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {Platform.OS === 'ios' && width < height && <View style={styles.bottomContainer} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 80,
    backgroundColor: colors.bgPrimary,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.mainGrey,
  },
  bottomContainer: {
    backgroundColor: colors.bgPrimary,
    height: 35,
  },
  label: {
    marginTop: 13,
    fontSize: 10,
    fontFamily: fonts.primaryBold,
    textTransform: 'uppercase',
  },
  tab: {
    alignItems: 'center',
    width: 70,
  },
});

export default TabsNavigationContainer;
