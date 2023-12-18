import { createStackNavigator } from '@react-navigation/stack';
import AuthForm from '../screens/auth/AuthForm';
import { GetStarted } from '../screens/auth/GetStarted';
import { ReservationCard } from '../screens/player/ReservationCard';
import { MyTabs } from './BottomTabNavigator';
import { ReserveField } from '../screens/player/ReserveField';
import ChatComponent from '../screens/player/Chat';
import { AdminBottomTab } from './AdminBottomTab';
import { AdminScheduleForm } from '../screens/admin/AdminScheduleForm';
import { AdminDetailReservation } from '../screens/admin/AdminDetailReservation';
import { LoginContext } from '../context/AuthContext';
import {useContext} from 'react'


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