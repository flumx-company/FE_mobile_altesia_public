import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ProfileScreen from '../screens/profile-screen/profile-screen';
import EventsScreen from '../screens/events-screen/events-screen';
import CommunityNavigation from './community-navigation';
import LoginRouting from './loginSignUp-navigation';
import routes from '../routes';
import NavProfileIcon from '../components/icons/nav-profile-icon';
import NavOpportunitiesIcon from '../components/icons/nav-opportunities-icon';
import NavHomeIcon from '../components/icons/nav-home-icon';
import NavEventsIcon from '../components/icons/nav-events-icon';
import NavCommunityIcon from '../components/icons/nav-community-icon';
import colors from '../constants/colors';
import { getToken } from '../redux/auth/selectors';
import TabsNavigationContainer from '../components/tabs-navigation-container/tabs-navigation-container';
import HomeNavigation from './home-navigation';
import OpportunitiesNavigation from './opportunities-navigation';
import useGetTokenFromStorage from '../hooks/useGetTokenFromStorage/useGetTokenFromStorage';

const AppRouting = () => {
  const Tab = createBottomTabNavigator();

  const token = useSelector(getToken);

  // get token from storage
  useGetTokenFromStorage();

  const getFocusedIcon = (route, color) => {
    switch (route) {
      case routes.profile:
        return <NavProfileIcon color={color} />;
      case routes.opportunities.opportunities:
        return <NavOpportunitiesIcon color={color} />;
      case routes.home.home:
        return <NavHomeIcon color={color} />;
      case routes.events:
        return <NavEventsIcon color={color} />;
      case routes.community.community:
        return <NavCommunityIcon color={color} />;
      default:
        return <NavProfileIcon color={color} />;
    }
  };

  const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: colors.primaryActive,
    tabBarInactiveTintColor: colors.textPrimary,
    tabBarIcon: ({ color }) => getFocusedIcon(route.name, color),
  });

  return (
    <NavigationContainer>
      {
        token
          ? (
            <Tab.Navigator
              screenOptions={screenOptions}
              initialRouteName={routes.home.home}
              tabBar={(props) => <TabsNavigationContainer {...props} />}
            >
              <Tab.Screen name={routes.profile} component={ProfileScreen} />
              <Tab.Screen name={routes.opportunities.opportunities} component={OpportunitiesNavigation} />
              <Tab.Screen name={routes.home.home} component={HomeNavigation} />
              <Tab.Screen name={routes.events} component={EventsScreen} />
              <Tab.Screen name={routes.community.community} component={CommunityNavigation} />
            </Tab.Navigator>
          )
          : (
            <LoginRouting />
          )
      }
    </NavigationContainer>
  );
};

export default AppRouting;
