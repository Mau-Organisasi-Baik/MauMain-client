import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Explore } from '../screens/player/Explore';

import { Ionicons } from '@expo/vector-icons';

import { Inbox } from '../screens/player/Inbox';
import { Profile } from '../screens/player/Profile';


const Tab = createBottomTabNavigator();

export const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
      name="Explore"
      component={Explore}
      options={{
        headerShown: false
      }}
      />

      <Tab.Screen 
       name="Inbox"
       component={Inbox}
       options={{
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = focused ? 'file-tray' : 'file-tray-outline'; 
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      }} />
      <Tab.Screen 
       name="Profile"
       component={Profile}
       options={{
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      }} />
    </Tab.Navigator>
  );
}

