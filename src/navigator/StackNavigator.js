import { createStackNavigator } from '@react-navigation/stack';
import AuthForm from '../screens/AuthForm';
import { GetStarted } from '../screens/GetStarted';
import { ReservationCard } from '../screens/ReservationCard';
import { MyTabs } from './BottomTabNavigator';
import { ReserveField } from '../screens/ReserveField';
import ChatComponent from '../screens/Chat';
import { AdminBottomTab } from './AdminBottomTab';
import { AdminScheduleForm } from '../screens/AdminScheduleForm';
import { AdminDetailReservation } from '../screens/AdminDetailReservation';

export const StackNavigator = () => {
  const Stack = createStackNavigator()
  return (
      <Stack.Navigator>
        {/* Di StackScreen MainScreen nanti dimainin perkondisian
        di componentnya kalau si user ini admin atau engga */}
          <Stack.Screen 
            name='Admin Screen'
            component={AdminBottomTab}
            options={{
              headerShown: false,
            }}
            />
        <Stack.Screen 
          name='Main Screen'
          component={MyTabs}
          options={{
            headerShown: false,
          }}
          />
        <Stack.Screen 
          name='Login'
          component={AuthForm}
          options={{
            headerShown: false,
          }}
          />
          <Stack.Screen 
            name='Get Started'
            component={GetStarted}
            />
          <Stack.Screen 
            name='Register'
            component={AuthForm}
            options={{
              headerShown: false,
            }}
            />
          <Stack.Screen 
            name='Reservation Card'
            component={ReservationCard}
            />
          <Stack.Screen 
            name='Reservation Room'
            component={ReserveField}
            />
          <Stack.Screen 
            name='Chat'
            component={ChatComponent}
            />
          <Stack.Screen 
            name='ScheduleForm'
            component={AdminScheduleForm}
            options={{
              title:'Schedule Form'
            }}
            />
          <Stack.Screen 
            name='AdminDetailReservation'
            component={AdminDetailReservation}
            options={{
              headerTitle: "Detail Reservation"
            }}
            />
      </Stack.Navigator>
  );
}