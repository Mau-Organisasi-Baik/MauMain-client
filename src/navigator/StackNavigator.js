import { createStackNavigator } from '@react-navigation/stack';
import AuthForm from '../screens/AuthForm';
import { GetStarted } from '../screens/GetStarted';
import { ReservationCard } from '../screens/ReservationCard';
import { MyTabs } from './BottomTabNavigator';
import { ReserveField } from '../screens/ReserveField';

export const StackNavigator = () => {
  const Stack = createStackNavigator()
  return (
      <Stack.Navigator>
        {/* Di StackScreen MainScreen nanti dimainin perkondisian
        di componentnya kalau si user ini admin atau engga */}
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
      </Stack.Navigator>
  );
}