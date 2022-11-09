import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeMain from '../screens/home-screen/home-main';
import HomeRequestFeature from '../screens/home-screen/home-request-feature';
import routes from '../routes';
import HomeRequestResponse from '../screens/home-screen/home-request-response';

const HomeNavigation = () => {
  const Stack = createStackNavigator();
  const screenOptions = {
    headerShown: false,
  };
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={routes.home.homeMain} component={HomeMain} />
      <Stack.Screen name={routes.home.homeRequestFeature} component={HomeRequestFeature} />
      <Stack.Screen name={routes.home.homeRequestRespond} component={HomeRequestResponse} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
