import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from '../routes';
import OpportunitiesMain from '../screens/opportunities-screen/opportunities-main';
import OpportunitiesSentAlerts from '../screens/opportunities-screen/opportunities-sent-alerts';
import OpportunitiesCreateAlert from '../screens/opportunities-screen/opportunities-create-alert';
import OpportunitiesAlertResponds from '../screens/opportunities-screen/opportunities-alert-responds';

const LoginRouting = () => {
  const Stack = createStackNavigator();
  const screenOptions = {
    headerShown: false,
  };
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={routes.opportunities.opportunitiesMain} component={OpportunitiesMain} />
      <Stack.Screen name={routes.opportunities.opportunitiesSentAlerts} component={OpportunitiesSentAlerts} />
      <Stack.Screen name={routes.opportunities.opportunitiesCreateAlert} component={OpportunitiesCreateAlert} />
      <Stack.Screen name={routes.opportunities.opportunitiesAlertResponds} component={OpportunitiesAlertResponds} />
    </Stack.Navigator>
  );
};

export default LoginRouting;
