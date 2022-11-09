import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CommunityGeneral from '../screens/community-screens/community-general';
import CommunityCategory from '../screens/community-screens/community-category';
import CommunityIssue from '../screens/community-screens/community-issue';
import CommunityCreateIssue from '../screens/community-screens/community-create-issue';
import CommunityRespondIssue from '../screens/community-screens/community-respond-issue';
import routes from '../routes';

const CommunityNavigation = () => {
  const Stack = createStackNavigator();
  const screenOptions = {
    headerShown: false,
  };
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={routes.community.communityGeneral} component={CommunityGeneral} />
      <Stack.Screen name={routes.community.communityCategory} component={CommunityCategory} />
      <Stack.Screen name={routes.community.communityIssue} component={CommunityIssue} />
      <Stack.Screen name={routes.community.communityCreateIssue} component={CommunityCreateIssue} />
      <Stack.Screen name={routes.community.communityRespondIssue} component={CommunityRespondIssue} />
    </Stack.Navigator>
  );
};

export default CommunityNavigation;
