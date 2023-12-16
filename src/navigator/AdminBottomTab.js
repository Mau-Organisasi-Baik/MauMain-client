import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import { Inbox } from '../screens/Inbox';
import { Profile } from '../screens/Profile';
import ChatComponent from '../screens/Chat';
import { AdminField } from '../screens/AdminField';
import { ScheduleCard } from '../screens/ScheduleCard';
import { AdminReservation } from '../screens/AdminReservation';



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
       component={ScheduleCard}
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
