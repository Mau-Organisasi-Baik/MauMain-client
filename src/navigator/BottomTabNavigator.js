import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Explore } from '../screens/Explore';
import SignInScreen from '../screens/LoginScreen';
import { Button } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import CategoryFilter from '../components/CategoryFilter';
import ChatComponent from '../screens/Chat';

const Tab = createBottomTabNavigator();

const exploreOpt = {
  headerTitle: () => null,
  tabBarIcon: ({ focused, color, size }) => {
    let iconName = focused ? 'search' : 'search-outline'; 
    return <Ionicons name={iconName} size={size} color={color} />;
  },
  headerRight : () => {
    return (<>
    <CategoryFilter/>
    </>)
  }
}

export const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
      name="Explore"
      component={Explore}
      options={exploreOpt}
      />

      <Tab.Screen 
       name="Inbox"
       component={ChatComponent}
       options={{
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = focused ? 'file-tray' : 'file-tray-outline'; // Use the appropriate icon names
          // You can return any component that you like here
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      }} />
      <Tab.Screen 
       name="Profile"
       component={SignInScreen}
       options={{
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = focused ? 'person' : 'person-outline'; // Use the appropriate icon names
          // You can return any component that you like here
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      }} />
    </Tab.Navigator>
  );
}

