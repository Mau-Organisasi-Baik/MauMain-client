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
import { LoginContext } from '../context/AuthContext';
import {useContext} from 'react'
import { Explore } from '../screens/Explore';

export const StackNavigator = () => {
  const Stack = createStackNavigator()
  const { isLoggedIn, userRole } = useContext(LoginContext)
  console.log(userRole, 'loxx');
  return (
      <Stack.Navigator>
        {isLoggedIn ? (<>
        {/* Di StackScreen MainScreen nanti dimainin perkondisian
        di componentnya kalau si user ini admin atau engga */}
        <Stack.Screen 
          name='Main Screen'
          component={userRole === 'player' ? MyTabs : AdminBottomTab}
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
            </>)
            : (<>
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
            </>)
          }
      </Stack.Navigator>
  );
}