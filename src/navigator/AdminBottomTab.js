import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import { Schedules } from '../screens/admin/Schedules';
import { AdminReservation } from '../screens/admin/AdminReservation';

import { AdminField } from '../screens/admin/AdminField';



const Tab = createBottomTabNavigator();


export const AdminBottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
      name="Reservations"
      component={AdminReservation}
      options={{
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = focused ? 'list' : 'list-outline'; 
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      }}
      />

      <Tab.Screen 
       name="Schedules"
       component={Schedules}
       options={{
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = focused ? 'today' : 'today-outline'; 
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      }} />
      <Tab.Screen 
       name="My Field"
       component={AdminField}
       options={{
        // headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = focused ? 'golf' : 'golf-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      }} />
    </Tab.Navigator>
  );
}
